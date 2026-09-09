// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var mt4$term$api$trade$stats_pb = require('./mt4-term-api-trade-stats_pb.js');
var google_protobuf_timestamp_pb = require('google-protobuf/google/protobuf/timestamp_pb.js');
var google_api_annotations_pb = require('./google/api/annotations_pb.js');
var mrpc$mt4$error_pb = require('./mrpc-mt4-error_pb.js');

function serialize_mt4_term_api_EquityHistoryReply(arg) {
  if (!(arg instanceof mt4$term$api$trade$stats_pb.EquityHistoryReply)) {
    throw new Error('Expected argument of type mt4_term_api.EquityHistoryReply');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_mt4_term_api_EquityHistoryReply(buffer_arg) {
  return mt4$term$api$trade$stats_pb.EquityHistoryReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_mt4_term_api_EquityHistoryRequest(arg) {
  if (!(arg instanceof mt4$term$api$trade$stats_pb.EquityHistoryRequest)) {
    throw new Error('Expected argument of type mt4_term_api.EquityHistoryRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_mt4_term_api_EquityHistoryRequest(buffer_arg) {
  return mt4$term$api$trade$stats_pb.EquityHistoryRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_mt4_term_api_TradeStatsEquityHistoryReply(arg) {
  if (!(arg instanceof mt4$term$api$trade$stats_pb.TradeStatsEquityHistoryReply)) {
    throw new Error('Expected argument of type mt4_term_api.TradeStatsEquityHistoryReply');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_mt4_term_api_TradeStatsEquityHistoryReply(buffer_arg) {
  return mt4$term$api$trade$stats_pb.TradeStatsEquityHistoryReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_mt4_term_api_TradeStatsEquityHistoryRequest(arg) {
  if (!(arg instanceof mt4$term$api$trade$stats_pb.TradeStatsEquityHistoryRequest)) {
    throw new Error('Expected argument of type mt4_term_api.TradeStatsEquityHistoryRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_mt4_term_api_TradeStatsEquityHistoryRequest(buffer_arg) {
  return mt4$term$api$trade$stats_pb.TradeStatsEquityHistoryRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_mt4_term_api_TradeStatsReply(arg) {
  if (!(arg instanceof mt4$term$api$trade$stats_pb.TradeStatsReply)) {
    throw new Error('Expected argument of type mt4_term_api.TradeStatsReply');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_mt4_term_api_TradeStatsReply(buffer_arg) {
  return mt4$term$api$trade$stats_pb.TradeStatsReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_mt4_term_api_TradeStatsRequest(arg) {
  if (!(arg instanceof mt4$term$api$trade$stats_pb.TradeStatsRequest)) {
    throw new Error('Expected argument of type mt4_term_api.TradeStatsRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_mt4_term_api_TradeStatsRequest(buffer_arg) {
  return mt4$term$api$trade$stats_pb.TradeStatsRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_mt4_term_api_TradeUnrealizedPLReply(arg) {
  if (!(arg instanceof mt4$term$api$trade$stats_pb.TradeUnrealizedPLReply)) {
    throw new Error('Expected argument of type mt4_term_api.TradeUnrealizedPLReply');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_mt4_term_api_TradeUnrealizedPLReply(buffer_arg) {
  return mt4$term$api$trade$stats_pb.TradeUnrealizedPLReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_mt4_term_api_TradeUnrealizedPLRequest(arg) {
  if (!(arg instanceof mt4$term$api$trade$stats_pb.TradeUnrealizedPLRequest)) {
    throw new Error('Expected argument of type mt4_term_api.TradeUnrealizedPLRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_mt4_term_api_TradeUnrealizedPLRequest(buffer_arg) {
  return mt4$term$api$trade$stats_pb.TradeUnrealizedPLRequest.deserializeBinary(new Uint8Array(buffer_arg));
}


var TradeStatsService = exports.TradeStatsService = {
  // Trading statistics calculated from order history and open orders
// [DefaultValues]
// {
//   "from": "2024-01-01T00:00:00"
// }
tradeStats: {
    path: '/mt4_term_api.TradeStats/TradeStats',
    requestStream: false,
    responseStream: false,
    requestType: mt4$term$api$trade$stats_pb.TradeStatsRequest,
    responseType: mt4$term$api$trade$stats_pb.TradeStatsReply,
    requestSerialize: serialize_mt4_term_api_TradeStatsRequest,
    requestDeserialize: deserialize_mt4_term_api_TradeStatsRequest,
    responseSerialize: serialize_mt4_term_api_TradeStatsReply,
    responseDeserialize: deserialize_mt4_term_api_TradeStatsReply,
  },
  // Trading statistics with equity history chart points
// [DefaultValues]
// {
//   "from": "2024-01-01T00:00:00",
//   "excludeSameBars": true
// }
tradeStatsEquityHistory: {
    path: '/mt4_term_api.TradeStats/TradeStatsEquityHistory',
    requestStream: false,
    responseStream: false,
    requestType: mt4$term$api$trade$stats_pb.TradeStatsEquityHistoryRequest,
    responseType: mt4$term$api$trade$stats_pb.TradeStatsEquityHistoryReply,
    requestSerialize: serialize_mt4_term_api_TradeStatsEquityHistoryRequest,
    requestDeserialize: deserialize_mt4_term_api_TradeStatsEquityHistoryRequest,
    responseSerialize: serialize_mt4_term_api_TradeStatsEquityHistoryReply,
    responseDeserialize: deserialize_mt4_term_api_TradeStatsEquityHistoryReply,
  },
  // Equity history curve points with drawdown calculation
// [DefaultValues]
// {
//   "from": "2024-10-01T00:00:00",
//   "excludeSameBars": true
// }
equityHistory: {
    path: '/mt4_term_api.TradeStats/EquityHistory',
    requestStream: false,
    responseStream: false,
    requestType: mt4$term$api$trade$stats_pb.EquityHistoryRequest,
    responseType: mt4$term$api$trade$stats_pb.EquityHistoryReply,
    requestSerialize: serialize_mt4_term_api_EquityHistoryRequest,
    requestDeserialize: deserialize_mt4_term_api_EquityHistoryRequest,
    responseSerialize: serialize_mt4_term_api_EquityHistoryReply,
    responseDeserialize: deserialize_mt4_term_api_EquityHistoryReply,
  },
  // Maximum and minimum unrealized profit/loss per trade
// [DefaultValues]
// {
//   "from": "2024-01-01T00:00:00"
// }
tradeUnrealizedPL: {
    path: '/mt4_term_api.TradeStats/TradeUnrealizedPL',
    requestStream: false,
    responseStream: false,
    requestType: mt4$term$api$trade$stats_pb.TradeUnrealizedPLRequest,
    responseType: mt4$term$api$trade$stats_pb.TradeUnrealizedPLReply,
    requestSerialize: serialize_mt4_term_api_TradeUnrealizedPLRequest,
    requestDeserialize: deserialize_mt4_term_api_TradeUnrealizedPLRequest,
    responseSerialize: serialize_mt4_term_api_TradeUnrealizedPLReply,
    responseDeserialize: deserialize_mt4_term_api_TradeUnrealizedPLReply,
  },
};

exports.TradeStatsClient = grpc.makeGenericClientConstructor(TradeStatsService);
