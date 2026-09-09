// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var mt4$term$api$subscriptions_pb = require('./mt4-term-api-subscriptions_pb.js');
var google_api_annotations_pb = require('./google/api/annotations_pb.js');
var google_protobuf_timestamp_pb = require('google-protobuf/google/protobuf/timestamp_pb.js');
var mrpc$mt4$error_pb = require('./mrpc-mt4-error_pb.js');

function serialize_mt4_term_api_OnOpenedOrdersProfitReply(arg) {
  if (!(arg instanceof mt4$term$api$subscriptions_pb.OnOpenedOrdersProfitReply)) {
    throw new Error('Expected argument of type mt4_term_api.OnOpenedOrdersProfitReply');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_mt4_term_api_OnOpenedOrdersProfitReply(buffer_arg) {
  return mt4$term$api$subscriptions_pb.OnOpenedOrdersProfitReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_mt4_term_api_OnOpenedOrdersProfitRequest(arg) {
  if (!(arg instanceof mt4$term$api$subscriptions_pb.OnOpenedOrdersProfitRequest)) {
    throw new Error('Expected argument of type mt4_term_api.OnOpenedOrdersProfitRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_mt4_term_api_OnOpenedOrdersProfitRequest(buffer_arg) {
  return mt4$term$api$subscriptions_pb.OnOpenedOrdersProfitRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_mt4_term_api_OnOpenedOrdersTicketsReply(arg) {
  if (!(arg instanceof mt4$term$api$subscriptions_pb.OnOpenedOrdersTicketsReply)) {
    throw new Error('Expected argument of type mt4_term_api.OnOpenedOrdersTicketsReply');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_mt4_term_api_OnOpenedOrdersTicketsReply(buffer_arg) {
  return mt4$term$api$subscriptions_pb.OnOpenedOrdersTicketsReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_mt4_term_api_OnOpenedOrdersTicketsRequest(arg) {
  if (!(arg instanceof mt4$term$api$subscriptions_pb.OnOpenedOrdersTicketsRequest)) {
    throw new Error('Expected argument of type mt4_term_api.OnOpenedOrdersTicketsRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_mt4_term_api_OnOpenedOrdersTicketsRequest(buffer_arg) {
  return mt4$term$api$subscriptions_pb.OnOpenedOrdersTicketsRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_mt4_term_api_OnSymbolTickReply(arg) {
  if (!(arg instanceof mt4$term$api$subscriptions_pb.OnSymbolTickReply)) {
    throw new Error('Expected argument of type mt4_term_api.OnSymbolTickReply');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_mt4_term_api_OnSymbolTickReply(buffer_arg) {
  return mt4$term$api$subscriptions_pb.OnSymbolTickReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_mt4_term_api_OnSymbolTickRequest(arg) {
  if (!(arg instanceof mt4$term$api$subscriptions_pb.OnSymbolTickRequest)) {
    throw new Error('Expected argument of type mt4_term_api.OnSymbolTickRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_mt4_term_api_OnSymbolTickRequest(buffer_arg) {
  return mt4$term$api$subscriptions_pb.OnSymbolTickRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_mt4_term_api_OnTradeReply(arg) {
  if (!(arg instanceof mt4$term$api$subscriptions_pb.OnTradeReply)) {
    throw new Error('Expected argument of type mt4_term_api.OnTradeReply');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_mt4_term_api_OnTradeReply(buffer_arg) {
  return mt4$term$api$subscriptions_pb.OnTradeReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_mt4_term_api_OnTradeRequest(arg) {
  if (!(arg instanceof mt4$term$api$subscriptions_pb.OnTradeRequest)) {
    throw new Error('Expected argument of type mt4_term_api.OnTradeRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_mt4_term_api_OnTradeRequest(buffer_arg) {
  return mt4$term$api$subscriptions_pb.OnTradeRequest.deserializeBinary(new Uint8Array(buffer_arg));
}


var SubscriptionServiceService = exports.SubscriptionServiceService = {
  // Streams real-time order/trade events.
// Requires 'id' header — use GetId to generate.
// Swagger does not support streaming — use /subscription-stream interactive viewer.
onTrade: {
    path: '/mt4_term_api.SubscriptionService/OnTrade',
    requestStream: false,
    responseStream: true,
    requestType: mt4$term$api$subscriptions_pb.OnTradeRequest,
    responseType: mt4$term$api$subscriptions_pb.OnTradeReply,
    requestSerialize: serialize_mt4_term_api_OnTradeRequest,
    requestDeserialize: deserialize_mt4_term_api_OnTradeRequest,
    responseSerialize: serialize_mt4_term_api_OnTradeReply,
    responseDeserialize: deserialize_mt4_term_api_OnTradeReply,
  },
  // Streams the tickets of currently opened orders as they change.
// Requires 'id' header — use GetId to generate.
// Swagger does not support streaming — use /subscription-stream interactive viewer.
onOpenedOrdersTickets: {
    path: '/mt4_term_api.SubscriptionService/OnOpenedOrdersTickets',
    requestStream: false,
    responseStream: true,
    requestType: mt4$term$api$subscriptions_pb.OnOpenedOrdersTicketsRequest,
    responseType: mt4$term$api$subscriptions_pb.OnOpenedOrdersTicketsReply,
    requestSerialize: serialize_mt4_term_api_OnOpenedOrdersTicketsRequest,
    requestDeserialize: deserialize_mt4_term_api_OnOpenedOrdersTicketsRequest,
    responseSerialize: serialize_mt4_term_api_OnOpenedOrdersTicketsReply,
    responseDeserialize: deserialize_mt4_term_api_OnOpenedOrdersTicketsReply,
  },
  // Streams the live profit of currently opened orders.
// Requires 'id' header — use GetId to generate.
// Swagger does not support streaming — use /subscription-stream interactive viewer.
onOpenedOrdersProfit: {
    path: '/mt4_term_api.SubscriptionService/OnOpenedOrdersProfit',
    requestStream: false,
    responseStream: true,
    requestType: mt4$term$api$subscriptions_pb.OnOpenedOrdersProfitRequest,
    responseType: mt4$term$api$subscriptions_pb.OnOpenedOrdersProfitReply,
    requestSerialize: serialize_mt4_term_api_OnOpenedOrdersProfitRequest,
    requestDeserialize: deserialize_mt4_term_api_OnOpenedOrdersProfitRequest,
    responseSerialize: serialize_mt4_term_api_OnOpenedOrdersProfitReply,
    responseDeserialize: deserialize_mt4_term_api_OnOpenedOrdersProfitReply,
  },
  // Streams real-time ticks for the given symbols.
// Requires 'id' header — use GetId to generate.
// Swagger does not support streaming — use /subscription-stream interactive viewer.
// [DefaultValues]
// {
//   "symbolNames": "EURUSD,BTCUSD"
// }
onSymbolTick: {
    path: '/mt4_term_api.SubscriptionService/OnSymbolTick',
    requestStream: false,
    responseStream: true,
    requestType: mt4$term$api$subscriptions_pb.OnSymbolTickRequest,
    responseType: mt4$term$api$subscriptions_pb.OnSymbolTickReply,
    requestSerialize: serialize_mt4_term_api_OnSymbolTickRequest,
    requestDeserialize: deserialize_mt4_term_api_OnSymbolTickRequest,
    responseSerialize: serialize_mt4_term_api_OnSymbolTickReply,
    responseDeserialize: deserialize_mt4_term_api_OnSymbolTickReply,
  },
};

exports.SubscriptionServiceClient = grpc.makeGenericClientConstructor(SubscriptionServiceService);
