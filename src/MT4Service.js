"use strict";
/*
 * ════════════════════════════════════════════════════════════════════════════
 *  MT4Service — MID-LEVEL layer of @metarpc/nodemt4
 * ════════════════════════════════════════════════════════════════════════════
 *
 *  A friendly facade over `MT4Account`: plain arguments in, typed data-transfer
 *  objects out. It builds the protobuf requests, routes them through the raw
 *  layer, and maps the raw replies to the DTOs declared below — no protobuf in
 *  your code. For terse one-liners (balances, prices, market orders) use the
 *  high layer, `MT4Sugar`, which sits on top of this one.
 *
 *  Groups mirror MT4Account:
 *      1. Account information · 2. Orders & history · 3. Symbols & quotes
 *      4. Trading operations  · 5. Streaming
 *  plus the connection lifecycle and a few conveniences (ensureSymbol, lastBars,
 *  positions / pendingOrders) that the flat client used to expose.
 * ════════════════════════════════════════════════════════════════════════════
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.MT4Service = void 0;
const MT4Account_1 = require("./MT4Account");
const errors_1 = require("./errors");
// ════════════════════════════════════════════════════════════════════════════
/** TradeStats requests take the window start as an ISO-8601 UTC **string** (not a protobuf Timestamp). */
const toUtcIso = (d) => (d instanceof Date ? d : new Date(d)).toISOString();
class MT4Service {
    acc;
    constructor(acc) {
        this.acc = acc;
    }
    /** Build the whole stack (MT4Service → MT4Account) in one call. */
    static create(host = 'mt4.mrpc.pro', port = 443, apiKey = null, id = null) {
        return new MT4Service(new MT4Account_1.MT4Account(host, port, apiKey, id));
    }
    /** The raw `MT4Account` underneath, for the methods this facade does not wrap. */
    account() { return this.acc; }
    //#region Connection lifecycle
    /** Start (or re-attach to) a terminal. Short form `connect(login, password, server)` or a ConnectOptions object. */
    connect(loginOrOptions, password, server) {
        return this.acc.connect(loginOrOptions, password, server);
    }
    /** The terminal id for these credentials (defaults to the last connect()'s). */
    getId(user, password) { return this.acc.getId(user, password); }
    /** Re-run the last connect() (same id/name). */
    reconnect() { return this.acc.reconnect(); }
    /** Liveness probe: true when the terminal answers. */
    checkConnect() { return this.acc.checkConnect(); }
    isConnected() { return this.acc.isConnected(); }
    /** Stop the terminal on the gateway (`deleteTerminal` also deletes it) and close the channel. */
    disconnect(deleteTerminal = false) { return this.acc.disconnect(deleteTerminal); }
    /** Close the gRPC channel without touching the terminal. */
    close() { this.acc.close(); }
    //#endregion
    //#region 1. Account information
    /** AccountSummary → a typed AccountInfo (see the interface for where margin lives). */
    async getAccountInfo() {
        const data = await this.acc.accountSummary();
        if (!data)
            throw new errors_1.MrpcError('AccountSummary returned no data');
        const code = data.getAccountTradeMode ? Number(data.getAccountTradeMode()) : -1;
        return {
            login: Number(data.getAccountLogin()),
            currency: data.getAccountCurrency(),
            balance: data.getAccountBalance(),
            equity: data.getAccountEquity(),
            credit: data.getAccountCredit ? data.getAccountCredit() : 0,
            leverage: Number(data.getAccountLeverage()),
            name: data.getAccountUserName(),
            server: this.acc.serverName,
            company: data.getAccountCompanyName ? data.getAccountCompanyName() : '',
            tradeMode: MT4Account_1.MT4Account.tradeModeName(code),
            tradeModeCode: code,
            isInvestor: !!(data.getIsInvestor && data.getIsInvestor()),
            serverTime: (0, MT4Account_1.tsToSeconds)(data.getServerTime ? data.getServerTime() : null),
            utcServerShiftMinutes: data.getUtcServerTimeShiftMinutes ? Number(data.getUtcServerTimeShiftMinutes()) : 0,
        };
    }
    /** Aggregated trade statistics since `from` (UTC). Returns a typed TradeStats. */
    async getTradeStats(from) {
        const req = new MT4Account_1.TradeStatsPb.TradeStatsRequest();
        req.setFromUtc(toUtcIso(from));
        const data = await this.acc.tradeStats(req);
        return MT4Service.mapStats(data);
    }
    /** Stats + equity curve + the trades behind them (since `from`, UTC). */
    async getTradeStatsEquityHistory(from, excludeSameBars = false) {
        const req = new MT4Account_1.TradeStatsPb.TradeStatsEquityHistoryRequest();
        req.setFromUtc(toUtcIso(from));
        req.setExcludeSameBars(excludeSameBars);
        const data = await this.acc.tradeStatsEquityHistory(req);
        const stats = data.getStats ? MT4Service.mapStats(data.getStats()) : MT4Service.mapStats(data);
        const points = (data.getEquityHistory ? data.getEquityHistory() : data.getPointsList ? data : null);
        const list = points && points.getPointsList ? points.getPointsList() : (data.getPointsList ? data.getPointsList() : []);
        return { stats, equity: list.map(MT4Service.mapEquityPoint) };
    }
    /** The equity-curve points since `from` (UTC). `excludeSameBars` drops flat points. */
    async getEquityHistory(from, excludeSameBars = false) {
        const req = new MT4Account_1.TradeStatsPb.EquityHistoryRequest();
        req.setFromUtc(toUtcIso(from));
        req.setExcludeSameBars(excludeSameBars);
        const data = await this.acc.equityHistory(req);
        return (data ? data.getPointsList() : []).map(MT4Service.mapEquityPoint);
    }
    /** The best/worst unrealized P/L reached per open order since `from` (UTC). */
    async getTradeUnrealizedPl(from) {
        const req = new MT4Account_1.TradeStatsPb.TradeUnrealizedPLRequest();
        req.setFromUtc(toUtcIso(from));
        const data = await this.acc.tradeUnrealizedPl(req);
        return (data ? data.getExtremaList() : []).map((e) => e.toObject());
    }
    //#endregion
    //#region 2. Orders & history
    /** Every open market order and pending order (MT4 has no netting: one ticket per fill). */
    async openedOrders(sortType) {
        const req = new MT4Account_1.AccountHelperPb.OpenedOrdersRequest();
        if (sortType !== undefined)
            req.setSortType(sortType);
        const data = await this.acc.openedOrders(req);
        return (data ? data.getOrderInfosList() : []).map(MT4Service.mapOrderInfo);
    }
    /** Open market orders (types BUY/SELL), optionally only those carrying a given magic number. */
    async positions(magic) {
        const all = await this.openedOrders();
        return all.filter(o => (o.type === 0 || o.type === 1) && (magic === undefined || o.magic === magic));
    }
    /** Pending orders (types 2-5), optionally filtered by magic. */
    async pendingOrders(magic) {
        const all = await this.openedOrders();
        return all.filter(o => o.type >= 2 && (magic === undefined || o.magic === magic));
    }
    /** Just the ticket numbers of all open/pending orders. */
    async openedOrdersTickets() {
        const data = await this.acc.openedOrdersTickets();
        return (data ? data.getTicketsList() : []).map((t) => Number(t));
    }
    /**
     * Closed orders in a SERVER-time window (use MT4Account.serverDate() to build it from UTC).
     * opts.sort: EnumOrderHistorySortType (default HISTORY_SORT_BY_CLOSE_TIME_DESC = 3).
     */
    async ordersHistory(from, to, opts = {}) {
        const req = new MT4Account_1.AccountHelperPb.OrdersHistoryRequest();
        req.setInputSortMode(opts.sort !== undefined ? opts.sort : 3);
        req.setInputFrom((0, MT4Account_1.toTimestamp)(from));
        req.setInputTo((0, MT4Account_1.toTimestamp)(to));
        if (opts.page !== undefined)
            req.setPageNumber(opts.page);
        if (opts.perPage !== undefined)
            req.setItemsPerPage(opts.perPage);
        const data = await this.acc.ordersHistory(req);
        return {
            totalCount: data ? Number(data.getTotalCount()) : 0,
            orders: (data ? data.getOrdersInfoList() : []).map(MT4Service.mapOrderInfo),
        };
    }
    //#endregion
    //#region 3. Symbols & quotes
    /** Every symbol name the account can see (one cheap call). */
    async symbolList() {
        const data = await this.acc.symbols();
        return (data ? data.getSymbolnameinfosList() : []).map((s) => ({ name: s.getSymbolName(), index: Number(s.getSymbolIndex()) }));
    }
    /** Add (select=true) or remove a symbol from Market Watch. Idempotent. */
    async symbolSelect(symbol, select = true) {
        const req = new MT4Account_1.MarketInfoPb.SymbolSelectRequest();
        req.setSymbol(symbol);
        req.setSelect(select);
        const data = await this.acc.symbolSelect(req);
        return !!(data && data.getSuccess());
    }
    /** Current bid/ask of one symbol (the price source to use — SymbolParams.bid is stale). */
    async quote(symbol) {
        const req = new MT4Account_1.MarketInfoPb.QuoteRequest();
        req.setSymbol(symbol);
        const data = await this.acc.quote(req);
        if (!data)
            throw new errors_1.MrpcError(`Quote returned no data for ${symbol}`);
        return MT4Service.mapQuote(data);
    }
    /** Current bid/ask of several symbols in one call. */
    async quoteMany(symbols) {
        const req = new MT4Account_1.MarketInfoPb.QuoteManyRequest();
        req.setSymbolsList(symbols);
        const data = await this.acc.quoteMany(req);
        return (data ? data.getQuotesList() : []).map(MT4Service.mapQuote);
    }
    /** Contract specification of one symbol. */
    async symbolParams(symbol) {
        const req = new MT4Account_1.AccountHelperPb.SymbolParamsManyRequest();
        req.setSymbolName(symbol);
        const data = await this.acc.symbolParamsMany(req);
        const list = data ? data.getSymbolInfosList() : [];
        const hit = list.find((s) => s.getSymbolname() === symbol) || list[0];
        if (!hit)
            throw new errors_1.MrpcError(`SymbolParamsMany returned nothing for ${symbol}`);
        return MT4Service.mapSymbolParams(hit);
    }
    /** Contract specifications of every symbol (one call; bid fields are stale). */
    async symbolParamsAll() {
        const data = await this.acc.symbolParamsMany(new MT4Account_1.AccountHelperPb.SymbolParamsManyRequest(), 60000);
        return (data ? data.getSymbolInfosList() : []).map(MT4Service.mapSymbolParams);
    }
    /** Tick value / tick size / contract size for many symbols in one call (sizing). */
    async tickValueWithSize(symbols) {
        const req = new MT4Account_1.AccountHelperPb.TickValueWithSizeRequest();
        req.setSymbolNamesList(symbols);
        const data = await this.acc.tickValueWithSize(req);
        return (data ? data.getInfosList() : []).map((i) => ({
            symbol: i.getSymbolname(), tickValue: i.getTradetickvalue(), tickSize: i.getTradeticksize(), contractSize: i.getTradecontractsize(),
        }));
    }
    /** The broker server's timezone / UTC offset. */
    async getServerTimezone() {
        const data = await this.acc.serverTimezone();
        const secs = data && data.getUtcOffsetSeconds ? Number(data.getUtcOffsetSeconds()) : 0;
        return {
            server: data && data.getServer ? data.getServer() : '',
            source: data && data.getSource ? data.getSource() : '',
            utcOffsetSeconds: secs,
            utcOffsetMinutes: Math.round(secs / 60),
            validatedUtc: data && data.getValidatedUtc ? data.getValidatedUtc() : null,
        };
    }
    /**
     * Select the symbol and wait until it has a two-sided quote (a freshly selected symbol reports
     * bid=ask=0 for a few seconds). Returns the quote.
     */
    async ensureSymbol(symbol, waitMs = 10000) {
        await this.symbolSelect(symbol, true);
        const until = Date.now() + waitMs;
        let last = null;
        while (Date.now() < until) {
            try {
                last = await this.quote(symbol);
                if (last.bid > 0 && last.ask > 0)
                    return last;
            }
            catch { /* not synchronized yet */ }
            await new Promise(r => setTimeout(r, 500));
        }
        if (last)
            return last;
        throw new errors_1.MrpcError(`No quote for ${symbol} within ${waitMs} ms`);
    }
    /**
     * OHLC history in a SERVER-time window (seconds or Date, encoded as if UTC). Sorted ascending.
     * Timeframe: 'M1'..'MN1' or an ENUM_QUOTE_HISTORY_TIMEFRAME value.
     */
    async quoteHistory(symbol, timeframe, from, to) {
        const tf = typeof timeframe === 'number' ? timeframe : MT4Account_1.TIMEFRAMES[timeframe];
        if (tf === undefined)
            throw new errors_1.MrpcError(`Unknown timeframe ${timeframe}`);
        const req = new MT4Account_1.MarketInfoPb.QuoteHistoryRequest();
        req.setSymbol(symbol);
        req.setTimeframe(tf);
        req.setFromtime((0, MT4Account_1.toTimestamp)(from));
        req.setTotime((0, MT4Account_1.toTimestamp)(to));
        const data = await this.acc.quoteHistory(req);
        const bars = (data ? data.getHistoricalQuotesList() : []).map((b) => ({
            time: (0, MT4Account_1.tsToSeconds)(b.getTime()),
            open: b.getOpen(), high: b.getHigh(), low: b.getLow(), close: b.getClose(),
            tickVolume: Number(b.getTickVolume()), realVolume: Number(b.getRealVolume()), spread: Number(b.getSpread()),
        }));
        bars.sort((a, b) => a.time - b.time);
        return bars;
    }
    /**
     * Newest `count` bars. `utcServerShiftMinutes` comes from getAccountInfo(); the look-back
     * window is widened automatically (weekends) until enough bars come back.
     */
    async lastBars(symbol, timeframe, count, utcServerShiftMinutes = 0) {
        const tf = typeof timeframe === 'number' ? timeframe : MT4Account_1.TIMEFRAMES[timeframe];
        const minutesPerBar = [1, 5, 15, 30, 60, 240, 1440, 10080, 43200][tf] || 1;
        const serverNow = MT4Account_1.MT4Account.serverDate(new Date(), utcServerShiftMinutes);
        let lookbackMin = Math.max(count * minutesPerBar * 3, 3 * 1440);
        let bars = [];
        for (let attempt = 0; attempt < 4; attempt++) {
            const from = new Date(serverNow.getTime() - lookbackMin * 60000);
            const to = new Date(serverNow.getTime() + 3600000);
            bars = await this.quoteHistory(symbol, tf, from, to);
            if (bars.length >= count)
                break;
            lookbackMin *= 4;
        }
        return bars.slice(-count);
    }
    //#endregion
    //#region 4. Trading operations
    /**
     * Market or pending order. MT4 needs a request price: for market orders it is taken from quote()
     * when omitted. `slippage` is in points. Rejects with an MrpcError when the broker refuses
     * (mqlIntCode: 130 invalid stops, 131 invalid volume, 132 market closed, 134 no money, 138 requote).
     */
    async orderSend(req) {
        const type = MT4Account_1.MT4Account.orderType(req.cmd !== undefined ? req.cmd : req.action);
        const volume = req.lots !== undefined ? req.lots : req.volume;
        if (volume === undefined)
            throw new errors_1.MrpcError('orderSend needs lots');
        const magic = req.magicNumber !== undefined ? req.magicNumber : req.magic;
        let price = req.price;
        if (price === undefined && (type === MT4Account_1.ORDER_TYPES.BUY || type === MT4Account_1.ORDER_TYPES.SELL)) {
            const q = await this.quote(req.symbol);
            price = type === MT4Account_1.ORDER_TYPES.BUY ? q.ask : q.bid;
        }
        const grpcReq = new MT4Account_1.TradingHelperPb.OrderSendRequest();
        grpcReq.setSymbol(req.symbol);
        grpcReq.setOperationType(type);
        grpcReq.setVolume(volume);
        if (price !== undefined)
            grpcReq.setPrice(price);
        if (req.stopLoss !== undefined)
            grpcReq.setStoploss(req.stopLoss);
        if (req.takeProfit !== undefined)
            grpcReq.setTakeprofit(req.takeProfit);
        if (req.comment !== undefined)
            grpcReq.setComment(req.comment);
        if (req.slippage !== undefined)
            grpcReq.setSlippage(req.slippage);
        if (magic !== undefined)
            grpcReq.setMagicNumber(magic);
        if (req.expiration)
            grpcReq.setExpiration((0, MT4Account_1.toTimestamp)(req.expiration));
        const data = await this.acc.orderSend(grpcReq);
        if (!data)
            throw new errors_1.MrpcError('Order execution returned no data');
        const vol = data.getVolume();
        return {
            ticket: Number(data.getTicket()),
            errorCode: 0,
            lots: vol,
            volume: vol,
            price: data.getPrice(),
            comment: req.comment || '',
            openTime: (0, MT4Account_1.tsToSeconds)(data.getOpenTime ? data.getOpenTime() : null),
        };
    }
    /** Change SL/TP of an open order, or SL/TP/price/expiration of a pending order. Pass the full new values. */
    async orderModify(req) {
        const grpcReq = new MT4Account_1.TradingHelperPb.OrderModifyRequest();
        grpcReq.setOrderTicket(req.ticket);
        if (req.stopLoss !== undefined)
            grpcReq.setNewStopLoss(req.stopLoss);
        if (req.takeProfit !== undefined)
            grpcReq.setNewTakeProfit(req.takeProfit);
        if (req.price !== undefined)
            grpcReq.setNewPrice(req.price);
        if (req.expiration)
            grpcReq.setNewExpiration((0, MT4Account_1.toTimestamp)(req.expiration));
        const data = await this.acc.orderModify(grpcReq);
        if (!data)
            throw new errors_1.MrpcError('OrderModify returned no data');
        return { modified: !!data.getOrderWasModified() };
    }
    /**
     * Close a market order (fully, or partially with `volume`) or delete a pending order.
     * Price (bid for buys / ask for sells) and volume are looked up when omitted.
     */
    async orderClose(req) {
        let volume = req.volume !== undefined ? req.volume : req.lots;
        let price = req.price;
        let symbol = req.symbol;
        let type = req.type;
        if (volume === undefined || (price === undefined && (symbol === undefined || type === undefined))) {
            const o = (await this.openedOrders()).find(x => x.ticket === req.ticket);
            if (!o)
                throw new errors_1.MrpcError(`Ticket ${req.ticket} is not open`);
            if (volume === undefined)
                volume = o.lots;
            symbol = o.symbol;
            type = o.type;
        }
        if (price === undefined) {
            if (type === MT4Account_1.ORDER_TYPES.BUY || type === MT4Account_1.ORDER_TYPES.SELL) {
                const q = await this.quote(symbol);
                price = type === MT4Account_1.ORDER_TYPES.BUY ? q.bid : q.ask;
            }
            else {
                price = 0; // pending order delete
            }
        }
        const grpcReq = new MT4Account_1.TradingHelperPb.OrderCloseDeleteRequest();
        grpcReq.setOrderTicket(req.ticket);
        grpcReq.setLots(volume);
        grpcReq.setClosingPrice(price);
        if (req.slippage !== undefined)
            grpcReq.setSlippage(req.slippage);
        const data = await this.acc.orderCloseDelete(grpcReq);
        if (!data)
            throw new errors_1.MrpcError('OrderCloseDelete returned no data');
        return { mode: Number(data.getMode()), historyComment: data.getHistoryOrderComment ? data.getHistoryOrderComment() : '' };
    }
    /** Close an order by an opposite one on the same symbol. */
    async orderCloseBy(ticket, oppositeTicket) {
        const grpcReq = new MT4Account_1.TradingHelperPb.OrderCloseByRequest();
        grpcReq.setTicketToClose(ticket);
        grpcReq.setOppositeTicketClosingBy(oppositeTicket);
        const data = await this.acc.orderCloseBy(grpcReq);
        if (!data)
            throw new errors_1.MrpcError('OrderCloseBy returned no data');
        return { closePrice: data.getClosePrice(), profit: data.getProfit(), closeTime: (0, MT4Account_1.tsToSeconds)(data.getCloseTime()) };
    }
    //#endregion
    //#region 5. Streaming
    /**
     * Tick stream (OnSymbolTick). `onError` receives an error reply of the stream, its failure or its end
     * (not an unsubscribe); the caller re-subscribes after a transport error.
     */
    subscribeQuotes(symbols, callback, onError) {
        const req = new MT4Account_1.SubscriptionsPb.OnSymbolTickRequest();
        if (symbols && symbols.length > 0)
            req.setSymbolNamesList(symbols);
        return this.acc.onSymbolTick(req, (data) => {
            const t = data.getSymbolTick ? data.getSymbolTick() : null;
            if (!t)
                return;
            const timeUtc = (0, MT4Account_1.tsToMillis)(t.getTimeUtc ? t.getTimeUtc() : null) || Number(t.getTimeMscUtc ? t.getTimeMscUtc() : 0);
            const time = Number(t.getTimeMsc()) || (0, MT4Account_1.tsToMillis)(t.getTime()) || timeUtc;
            callback({
                symbol: t.getSymbol(), bid: t.getBid(), ask: t.getAsk(), last: t.getLast(),
                volume: Number(t.getVolume()), time, timeUtc: timeUtc || time,
            });
        }, onError);
    }
    /** OnTrade event stream: fills, modifications, closes. */
    subscribeTrades(callback, onError) {
        const req = new MT4Account_1.SubscriptionsPb.OnTradeRequest();
        return this.acc.onTrade(req, (data) => {
            const ev = data.getEventData ? data.getEventData() : null;
            callback({
                type: Number(data.getType()),
                newOrders: ev ? ev.getNewOrdersList().map(MT4Service.mapTradeOrder) : [],
                updatedOrders: ev ? ev.getUpdatedOrdersList().map((u) => ({ previous: MT4Service.mapTradeOrder(u.getPrevious()), current: MT4Service.mapTradeOrder(u.getCurrent()) })) : [],
                removedOrders: ev ? ev.getRemovedOrdersList().map(MT4Service.mapTradeOrder) : [],
                newHistoryOrders: ev ? ev.getNewHistoryOrdersList().map(MT4Service.mapTradeOrder) : [],
                account: MT4Service.mapStreamAccount(data.getAccountInfo ? data.getAccountInfo() : null),
            });
        }, onError);
    }
    /** Periodic snapshot of open orders with live profit + account info incl. margin (OnOpenedOrdersProfit). */
    subscribeOpenedOrdersProfit(intervalMs, callback, onError) {
        const req = new MT4Account_1.SubscriptionsPb.OnOpenedOrdersProfitRequest();
        req.setTimerPeriodMilliseconds(intervalMs);
        return this.acc.onOpenedOrdersProfit(req, (data) => callback({
            orders: data.getOpenedOrdersWithProfitUpdatedList().map((o) => ({
                ticket: Number(o.getTicket()), symbol: o.getSymbol(), type: Number(o.getType()), lots: o.getLots(), openPrice: o.getOpenPrice(),
                openTime: (0, MT4Account_1.tsToSeconds)(o.getOpenTime()), stopLoss: o.getStopLoss(), takeProfit: o.getTakeProfit(), profit: o.getOrderProfit(),
                swap: o.getSwap(), commission: o.getCommission(), comment: o.getComment(), magic: Number(o.getMagicNumber()),
            })),
            account: MT4Service.mapStreamAccount(data.getAccountInfo ? data.getAccountInfo() : null),
        }), onError);
    }
    /** Periodic list of open ticket numbers (OnOpenedOrdersTickets). */
    subscribeOpenedOrdersTickets(intervalMs, callback, onError) {
        const req = new MT4Account_1.SubscriptionsPb.OnOpenedOrdersTicketsRequest();
        req.setPullIntervalMilliseconds(intervalMs);
        return this.acc.onOpenedOrdersTickets(req, (data) => callback({
            positionTickets: data.getPositionTicketsList().map(Number),
            pendingTickets: data.getPendingOrderTicketsList().map(Number),
            serverTime: (0, MT4Account_1.tsToSeconds)(data.getServerTime()),
        }), onError);
    }
    /** Terminal connection-state events (OnConnectState): pause a strategy while the terminal is offline. */
    subscribeConnectState(callback, onError) {
        const Req = MT4Account_1.ConnectionPb.OnConnectStateRequest || MT4Account_1.ConnectionPb.ConnectStateRequest;
        return this.acc.onConnectState(new Req(), (data) => callback(data.toObject ? data.toObject() : data), onError);
    }
    //#endregion
    //#region mappers
    static mapQuote(q) {
        return {
            symbol: q.getSymbol(), bid: q.getBid(), ask: q.getAsk(), high: q.getHigh(), low: q.getLow(),
            time: (0, MT4Account_1.tsToSeconds)(q.getDateTime()),
        };
    }
    static mapSymbolParams(s) {
        return {
            name: s.getSymbolname(),
            description: s.getSymdescription(),
            digits: Number(s.getDigits()),
            point: s.getPoint(),
            spreadFloat: !!s.getSpreadfloat(),
            contractSize: s.getTradecontractsize(),
            volumeMin: s.getVolumemin(),
            volumeMax: s.getVolumemax(),
            volumeStep: s.getVolumestep(),
            volumeLimit: s.getVolumelimit(),
            stopsLevel: Number(s.getTradestopslevel()),
            freezeLevel: Number(s.getTradefreezelevel()),
            tickValue: s.getTradetickvalue(),
            tickSize: s.getTradeticksize(),
            swapLong: s.getSwaplong(),
            swapShort: s.getSwapshort(),
            swapMode: Number(s.getSwapmode()),
            currencyBase: s.getCurrencybase(),
            currencyProfit: s.getCurrencyprofit(),
            currencyMargin: s.getCurrencymargin(),
            tradeMode: Number(s.getTrademode()),
            tradeExeMode: Number(s.getTradeexemode()),
            tradeCalcMode: Number(s.getTradecalcmode()),
            marginInitial: s.getMargininitial(),
            marginMaintenance: s.getMarginmaintenance(),
            isSelected: !!s.getIsSelected(),
            visible: !!s.getVisible(),
            bid: s.getBid(),
            time: (0, MT4Account_1.tsToSeconds)(s.getTime()),
            path: s.getPath(),
        };
    }
    static mapOrderInfo(o) {
        const r = {
            ticket: Number(o.getTicket()),
            symbol: o.getSymbol(),
            type: Number(o.getOrderType()),
            lots: o.getLots(),
            openPrice: o.getOpenPrice(),
            openTime: (0, MT4Account_1.tsToSeconds)(o.getOpenTime()),
            stopLoss: o.getStopLoss(),
            takeProfit: o.getTakeProfit(),
            profit: o.getProfit(),
            swap: o.getSwap(),
            commission: o.getCommision ? o.getCommision() : 0, // (sic) proto field name
            comment: o.getComment(),
            magic: Number(o.getMagicNumber()),
            expiration: (0, MT4Account_1.tsToSeconds)(o.getExpirationTime ? o.getExpirationTime() : null),
            accountLogin: Number(o.getAccountLogin ? o.getAccountLogin() : 0),
        };
        if (o.getCloseTime) {
            r.closeTime = (0, MT4Account_1.tsToSeconds)(o.getCloseTime());
            r.closePrice = o.getClosePrice();
        }
        return r;
    }
    /** OrderInfo-like object carried by the OnTrade / OnOpenedOrdersProfit streams. */
    static mapTradeOrder(o) {
        return {
            ticket: Number(o.getTicket()), symbol: o.getSymbol(), type: Number(o.getType()), lots: o.getLots(),
            openPrice: o.getOpenPrice(), openTime: (0, MT4Account_1.tsToSeconds)(o.getOpenTime()), stopLoss: o.getStopLoss(), takeProfit: o.getTakeProfit(),
            profit: o.getOrderProfit(), swap: o.getSwap(), commission: o.getCommission(), comment: o.getComment(),
            magic: Number(o.getMagicNumber()), expiration: (0, MT4Account_1.tsToSeconds)(o.getExpiration()), accountLogin: Number(o.getAccountLogin ? o.getAccountLogin() : 0),
            closeTime: (0, MT4Account_1.tsToSeconds)(o.getCloseTime ? o.getCloseTime() : null), closePrice: o.getClosePrice ? o.getClosePrice() : 0,
        };
    }
    static mapStreamAccount(a) {
        return a ? {
            balance: a.getBalance(), credit: a.getCredit ? a.getCredit() : 0, equity: a.getEquity(), margin: a.getMargin(),
            freeMargin: a.getFreeMargin(), profit: a.getProfit(), marginLevel: a.getMarginLevel(), login: Number(a.getLogin ? a.getLogin() : 0),
        } : null;
    }
    static mapStats(d) {
        // scalar getter (NaN-safe: a non-number, e.g. an unset field, becomes 0)
        const n = (g) => {
            const v = d && typeof d[g] === 'function' ? d[g]() : undefined;
            return typeof v === 'number' && Number.isFinite(v) ? v : 0;
        };
        // best/worst trade are nested messages { tiket, date, profit } — take the profit
        const prof = (g) => {
            const m = d && typeof d[g] === 'function' ? d[g]() : undefined;
            return m && typeof m.getProfit === 'function' ? Number(m.getProfit()) || 0 : 0;
        };
        // averageWin/averageLost are { averagePips, averageUsd } — take the USD value
        const usd = (g) => {
            const m = d && typeof d[g] === 'function' ? d[g]() : undefined;
            return m && typeof m.getAverageUsd === 'function' ? Number(m.getAverageUsd()) || 0 : 0;
        };
        return {
            trades: n('getTrades'), profitability: n('getProfitability'), profitFactor: n('getProfitFactor'),
            expectancy: n('getExpectancy'), ghpr: n('getGhpr'), growthPercent: n('getGrowthPercent'),
            sharpeRatio: n('getSharpeRatio'), zScore: n('getZScore'), standardDeviation: n('getStandardDeviation'),
            pips: n('getPips'), lots: n('getLots'), deposits: n('getDeposits'), withdrawals: n('getWithdrawals'),
            commissions: n('getComissions'), bestTrade: prof('getBestTrade'), worstTrade: prof('getWorstTrade'),
            bestTradePips: prof('getBestTradePips'), worstTradePips: prof('getWorstTradePips'),
            averageWin: usd('getAverageWin'), averageLost: usd('getAverageLost'), averageTradeLength: n('getAverageTradeLength'),
            longsWon: n('getLongsWon'), shortsWon: n('getShortsWon'),
            maxBalanceDrawdownRaw: n('getMaxBalanceDrawdownRaw'), maxBalanceDrawdownRelative: n('getMaxBalanceDrawdownRelative'),
            maxEquityDrawdownRaw: n('getMaxEquityDrawdownRaw'), maxEquityDrawdownRelative: n('getMaxEquityDrawdownRelative'),
            markets: d && d.getMarketsList ? d.getMarketsList() : [],
        };
    }
    static mapEquityPoint(p) {
        return {
            time: (0, MT4Account_1.tsToSeconds)(p.getTime ? p.getTime() : null),
            timeUtc: (0, MT4Account_1.tsToMillis)(p.getTimeUtc ? p.getTimeUtc() : null),
            balance: p.getBalance(), equity: p.getEquity(),
            realizedPl: p.getRealizedPl ? p.getRealizedPl() : 0,
            unrealizedPl: p.getUnrealizedPl ? p.getUnrealizedPl() : 0,
            cashFlow: p.getCashFlow ? p.getCashFlow() : 0,
            balanceDrawdownRaw: p.getBalanceDrawdownRaw ? p.getBalanceDrawdownRaw() : 0,
            balanceDrawdownRelative: p.getBalanceDrawdownRelative ? p.getBalanceDrawdownRelative() : 0,
            equityDrawdownRaw: p.getEquityDrawdownRaw ? p.getEquityDrawdownRaw() : 0,
            equityDrawdownRelative: p.getEquityDrawdownRelative ? p.getEquityDrawdownRelative() : 0,
        };
    }
}
exports.MT4Service = MT4Service;
