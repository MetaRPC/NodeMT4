// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var mt4$term$api$account$helper_pb = require('./mt4-term-api-account-helper_pb.js');
var google_protobuf_timestamp_pb = require('google-protobuf/google/protobuf/timestamp_pb.js');
var google_api_annotations_pb = require('./google/api/annotations_pb.js');
var mrpc$mt4$error_pb = require('./mrpc-mt4-error_pb.js');

function serialize_mt4_term_api_AccountSummaryReply(arg) {
  if (!(arg instanceof mt4$term$api$account$helper_pb.AccountSummaryReply)) {
    throw new Error('Expected argument of type mt4_term_api.AccountSummaryReply');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_mt4_term_api_AccountSummaryReply(buffer_arg) {
  return mt4$term$api$account$helper_pb.AccountSummaryReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_mt4_term_api_AccountSummaryRequest(arg) {
  if (!(arg instanceof mt4$term$api$account$helper_pb.AccountSummaryRequest)) {
    throw new Error('Expected argument of type mt4_term_api.AccountSummaryRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_mt4_term_api_AccountSummaryRequest(buffer_arg) {
  return mt4$term$api$account$helper_pb.AccountSummaryRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_mt4_term_api_OpenedOrdersReply(arg) {
  if (!(arg instanceof mt4$term$api$account$helper_pb.OpenedOrdersReply)) {
    throw new Error('Expected argument of type mt4_term_api.OpenedOrdersReply');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_mt4_term_api_OpenedOrdersReply(buffer_arg) {
  return mt4$term$api$account$helper_pb.OpenedOrdersReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_mt4_term_api_OpenedOrdersRequest(arg) {
  if (!(arg instanceof mt4$term$api$account$helper_pb.OpenedOrdersRequest)) {
    throw new Error('Expected argument of type mt4_term_api.OpenedOrdersRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_mt4_term_api_OpenedOrdersRequest(buffer_arg) {
  return mt4$term$api$account$helper_pb.OpenedOrdersRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_mt4_term_api_OpenedOrdersTicketsReply(arg) {
  if (!(arg instanceof mt4$term$api$account$helper_pb.OpenedOrdersTicketsReply)) {
    throw new Error('Expected argument of type mt4_term_api.OpenedOrdersTicketsReply');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_mt4_term_api_OpenedOrdersTicketsReply(buffer_arg) {
  return mt4$term$api$account$helper_pb.OpenedOrdersTicketsReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_mt4_term_api_OpenedOrdersTicketsRequest(arg) {
  if (!(arg instanceof mt4$term$api$account$helper_pb.OpenedOrdersTicketsRequest)) {
    throw new Error('Expected argument of type mt4_term_api.OpenedOrdersTicketsRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_mt4_term_api_OpenedOrdersTicketsRequest(buffer_arg) {
  return mt4$term$api$account$helper_pb.OpenedOrdersTicketsRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_mt4_term_api_OrdersHistoryReply(arg) {
  if (!(arg instanceof mt4$term$api$account$helper_pb.OrdersHistoryReply)) {
    throw new Error('Expected argument of type mt4_term_api.OrdersHistoryReply');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_mt4_term_api_OrdersHistoryReply(buffer_arg) {
  return mt4$term$api$account$helper_pb.OrdersHistoryReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_mt4_term_api_OrdersHistoryRequest(arg) {
  if (!(arg instanceof mt4$term$api$account$helper_pb.OrdersHistoryRequest)) {
    throw new Error('Expected argument of type mt4_term_api.OrdersHistoryRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_mt4_term_api_OrdersHistoryRequest(buffer_arg) {
  return mt4$term$api$account$helper_pb.OrdersHistoryRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_mt4_term_api_SymbolParamsManyReply(arg) {
  if (!(arg instanceof mt4$term$api$account$helper_pb.SymbolParamsManyReply)) {
    throw new Error('Expected argument of type mt4_term_api.SymbolParamsManyReply');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_mt4_term_api_SymbolParamsManyReply(buffer_arg) {
  return mt4$term$api$account$helper_pb.SymbolParamsManyReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_mt4_term_api_SymbolParamsManyRequest(arg) {
  if (!(arg instanceof mt4$term$api$account$helper_pb.SymbolParamsManyRequest)) {
    throw new Error('Expected argument of type mt4_term_api.SymbolParamsManyRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_mt4_term_api_SymbolParamsManyRequest(buffer_arg) {
  return mt4$term$api$account$helper_pb.SymbolParamsManyRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_mt4_term_api_TickValueWithSizeReply(arg) {
  if (!(arg instanceof mt4$term$api$account$helper_pb.TickValueWithSizeReply)) {
    throw new Error('Expected argument of type mt4_term_api.TickValueWithSizeReply');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_mt4_term_api_TickValueWithSizeReply(buffer_arg) {
  return mt4$term$api$account$helper_pb.TickValueWithSizeReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_mt4_term_api_TickValueWithSizeRequest(arg) {
  if (!(arg instanceof mt4$term$api$account$helper_pb.TickValueWithSizeRequest)) {
    throw new Error('Expected argument of type mt4_term_api.TickValueWithSizeRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_mt4_term_api_TickValueWithSizeRequest(buffer_arg) {
  return mt4$term$api$account$helper_pb.TickValueWithSizeRequest.deserializeBinary(new Uint8Array(buffer_arg));
}


var AccountHelperService = exports.AccountHelperService = {
  // Some information about account
accountSummary: {
    path: '/mt4_term_api.AccountHelper/AccountSummary',
    requestStream: false,
    responseStream: false,
    requestType: mt4$term$api$account$helper_pb.AccountSummaryRequest,
    responseType: mt4$term$api$account$helper_pb.AccountSummaryReply,
    requestSerialize: serialize_mt4_term_api_AccountSummaryRequest,
    requestDeserialize: deserialize_mt4_term_api_AccountSummaryRequest,
    responseSerialize: serialize_mt4_term_api_AccountSummaryReply,
    responseDeserialize: deserialize_mt4_term_api_AccountSummaryReply,
  },
  // List of opened orders
openedOrders: {
    path: '/mt4_term_api.AccountHelper/OpenedOrders',
    requestStream: false,
    responseStream: false,
    requestType: mt4$term$api$account$helper_pb.OpenedOrdersRequest,
    responseType: mt4$term$api$account$helper_pb.OpenedOrdersReply,
    requestSerialize: serialize_mt4_term_api_OpenedOrdersRequest,
    requestDeserialize: deserialize_mt4_term_api_OpenedOrdersRequest,
    responseSerialize: serialize_mt4_term_api_OpenedOrdersReply,
    responseDeserialize: deserialize_mt4_term_api_OpenedOrdersReply,
  },
  // List of opened orders tickets
openedOrdersTickets: {
    path: '/mt4_term_api.AccountHelper/OpenedOrdersTickets',
    requestStream: false,
    responseStream: false,
    requestType: mt4$term$api$account$helper_pb.OpenedOrdersTicketsRequest,
    responseType: mt4$term$api$account$helper_pb.OpenedOrdersTicketsReply,
    requestSerialize: serialize_mt4_term_api_OpenedOrdersTicketsRequest,
    requestDeserialize: deserialize_mt4_term_api_OpenedOrdersTicketsRequest,
    responseSerialize: serialize_mt4_term_api_OpenedOrdersTicketsReply,
    responseDeserialize: deserialize_mt4_term_api_OpenedOrdersTicketsReply,
  },
  // Orders history with pagination and open date filters
ordersHistory: {
    path: '/mt4_term_api.AccountHelper/OrdersHistory',
    requestStream: false,
    responseStream: false,
    requestType: mt4$term$api$account$helper_pb.OrdersHistoryRequest,
    responseType: mt4$term$api$account$helper_pb.OrdersHistoryReply,
    requestSerialize: serialize_mt4_term_api_OrdersHistoryRequest,
    requestDeserialize: deserialize_mt4_term_api_OrdersHistoryRequest,
    responseSerialize: serialize_mt4_term_api_OrdersHistoryReply,
    responseDeserialize: deserialize_mt4_term_api_OrdersHistoryReply,
  },
  // Full information about exact symbol, or all symbols
symbolParamsMany: {
    path: '/mt4_term_api.AccountHelper/SymbolParamsMany',
    requestStream: false,
    responseStream: false,
    requestType: mt4$term$api$account$helper_pb.SymbolParamsManyRequest,
    responseType: mt4$term$api$account$helper_pb.SymbolParamsManyReply,
    requestSerialize: serialize_mt4_term_api_SymbolParamsManyRequest,
    requestDeserialize: deserialize_mt4_term_api_SymbolParamsManyRequest,
    responseSerialize: serialize_mt4_term_api_SymbolParamsManyReply,
    responseDeserialize: deserialize_mt4_term_api_SymbolParamsManyReply,
  },
  tickValueWithSize: {
    path: '/mt4_term_api.AccountHelper/TickValueWithSize',
    requestStream: false,
    responseStream: false,
    requestType: mt4$term$api$account$helper_pb.TickValueWithSizeRequest,
    responseType: mt4$term$api$account$helper_pb.TickValueWithSizeReply,
    requestSerialize: serialize_mt4_term_api_TickValueWithSizeRequest,
    requestDeserialize: deserialize_mt4_term_api_TickValueWithSizeRequest,
    responseSerialize: serialize_mt4_term_api_TickValueWithSizeReply,
    responseDeserialize: deserialize_mt4_term_api_TickValueWithSizeReply,
  },
};

exports.AccountHelperClient = grpc.makeGenericClientConstructor(AccountHelperService);
