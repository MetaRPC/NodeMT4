// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var mt4$term$api$quote$history_pb = require('./mt4-term-api-quote-history_pb.js');
var google_api_annotations_pb = require('./google/api/annotations_pb.js');
var mrpc$mt4$error_pb = require('./mrpc-mt4-error_pb.js');

function serialize_mt4_term_api_QuoteHistoryBarsReply(arg) {
  if (!(arg instanceof mt4$term$api$quote$history_pb.QuoteHistoryBarsReply)) {
    throw new Error('Expected argument of type mt4_term_api.QuoteHistoryBarsReply');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_mt4_term_api_QuoteHistoryBarsReply(buffer_arg) {
  return mt4$term$api$quote$history_pb.QuoteHistoryBarsReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_mt4_term_api_QuoteHistoryBarsRequest(arg) {
  if (!(arg instanceof mt4$term$api$quote$history_pb.QuoteHistoryBarsRequest)) {
    throw new Error('Expected argument of type mt4_term_api.QuoteHistoryBarsRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_mt4_term_api_QuoteHistoryBarsRequest(buffer_arg) {
  return mt4$term$api$quote$history_pb.QuoteHistoryBarsRequest.deserializeBinary(new Uint8Array(buffer_arg));
}


// ============================================================================
// Quote history: the bars a chart is drawn from, for one symbol - returned by
// PAGE, oldest first. MetaTrader 4 keeps no tick history, so there is no
// Ticks call here; the MT5 API has one.
//
// Bars walks a time range forward. A page carries at most page_size bars and,
// when the range holds more, a next_page_token; passing that token back (same
// symbol, timeframe and range) returns the next page. An empty next_page_token
// means the range is exhausted. Tokens are opaque: a client stores and returns
// them, nothing else.
//
// History lives in the terminal and is fetched from the broker on demand. The
// first request for a symbol or a period the terminal has not loaded yet can
// take a few seconds, and when the broker has not delivered it within that
// time the call answers with an error whose error_code is
// QUOTE_HISTORY_NOT_READY - ask again a moment later.
//
// Every call needs the terminal id header ("id"), like every other call.
// ============================================================================
var QuoteHistoryService = exports.QuoteHistoryService = {
  // OHLC bars (candles) of one symbol and timeframe, oldest first, by page.
bars: {
    path: '/mt4_term_api.QuoteHistory/Bars',
    requestStream: false,
    responseStream: false,
    requestType: mt4$term$api$quote$history_pb.QuoteHistoryBarsRequest,
    responseType: mt4$term$api$quote$history_pb.QuoteHistoryBarsReply,
    requestSerialize: serialize_mt4_term_api_QuoteHistoryBarsRequest,
    requestDeserialize: deserialize_mt4_term_api_QuoteHistoryBarsRequest,
    responseSerialize: serialize_mt4_term_api_QuoteHistoryBarsReply,
    responseDeserialize: deserialize_mt4_term_api_QuoteHistoryBarsReply,
  },
};

exports.QuoteHistoryClient = grpc.makeGenericClientConstructor(QuoteHistoryService);
