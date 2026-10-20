# Errors

Every reply of the API carries either `data` or `error`; a refused request is an answer like any other (HTTP 200 on REST),
not a failed call.

Every call of `MT4Client` resolves with what the server answered or rejects:

- with an **`MrpcError`** when the API answered with an error: `err.code` is the error code, `err.message` the code and
  message, `err.error` the reply's whole `Error` (the fields below);
- with the **gRPC error** when the call failed (network, deadline, server down): `err.code` is the gRPC status number
  (`grpc.status.UNAVAILABLE`, `DEADLINE_EXCEEDED`, ...).

With the generated clients you get the reply itself: `reply.getError()` is set instead of `reply.getData()`.

## A refused order

```javascript
const { MrpcError } = require('@metarpc/nodemt4');

try {
  await client.orderSend({ symbol: 'EURUSD', cmd: 'BUY', lots: 0.001 });
} catch (err) {
  if (err instanceof MrpcError && err.error) {                  // the API answered with an error
    console.log(err.code);                                    // MQL4_EXECUTION_FAILED
    console.log(err.error.getMqlErrorIntCode());              // 131 (invalid trade volume)
    console.log(err.error.getMqlErrorDescription());          // invalid trade volume
  } else {
    throw err;                                                // the call failed: err.code is the gRPC status
  }
}
```

When the broker or the terminal refuses a trade request, the MT4 error is in `mql_error_int_code` / `mql_error_code` ([MqlErrorCode](../API_Reference/enums.md#mqlerrorcode): `131` invalid trade volume, `134` not enough money, `4220` symbol select error, ...), the error `type` is `MQL_EXECUTION` and `error_code` is `MQL4_EXECUTION_FAILED`.

## The error

[Error](../API_Reference/messages.md#error) has:

| Field | |
|---|---|
| `error_code` | what went wrong, e.g. `TERMINAL_INSTANCE_NOT_FOUND`; use it in your code |
| `error_message` | the same for people, with details |
| `type` | where it happened ([ErrorType](../API_Reference/enums.md#errortype)): `MRPC`, `MRPC_VALIDATION`, `MRPC_TIMEOUT`, `MQL_EXECUTION`, ... |
| `mql_error_code`, `mql_error_int_code`, `mql_error_description` | the MQL error of the terminal, when the terminal refused ([MqlErrorCode](../API_Reference/enums.md#mqlerrorcode)) |
| `command_type_name` | the terminal command that failed |

## Codes you will meet

| `error_code` | Meaning | What to do |
|---|---|---|
| `TERMINAL_INSTANCE_NOT_FOUND` | the terminal id is not a running terminal (never was, or stopped) | connect again |
| `MQL4_EXECUTION_FAILED` | the terminal refused the request: see the MQL fields | fix the request (volume, price, stops, ...) |
| `NO_CHARTS_OPENED_FOR_SYMBOLS` | a tick stream for symbols the terminal does not have | check the symbol names |

The codes of the limits (calls per minute, the order queue, tick streams) and of the API key:
[Errors & Limits](https://mrpc.pro/docs-legacy/mt4-client-api#errors-limits).
