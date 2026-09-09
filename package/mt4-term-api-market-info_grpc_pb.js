// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var mt4$term$api$market$info_pb = require('./mt4-term-api-market-info_pb.js');
var google_api_annotations_pb = require('./google/api/annotations_pb.js');
var google_protobuf_timestamp_pb = require('google-protobuf/google/protobuf/timestamp_pb.js');
var mrpc$mt4$error_pb = require('./mrpc-mt4-error_pb.js');

function serialize_mt4_term_api_QuoteHistoryReply(arg) {
  if (!(arg instanceof mt4$term$api$market$info_pb.QuoteHistoryReply)) {
    throw new Error('Expected argument of type mt4_term_api.QuoteHistoryReply');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_mt4_term_api_QuoteHistoryReply(buffer_arg) {
  return mt4$term$api$market$info_pb.QuoteHistoryReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_mt4_term_api_QuoteHistoryRequest(arg) {
  if (!(arg instanceof mt4$term$api$market$info_pb.QuoteHistoryRequest)) {
    throw new Error('Expected argument of type mt4_term_api.QuoteHistoryRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_mt4_term_api_QuoteHistoryRequest(buffer_arg) {
  return mt4$term$api$market$info_pb.QuoteHistoryRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_mt4_term_api_QuoteManyReply(arg) {
  if (!(arg instanceof mt4$term$api$market$info_pb.QuoteManyReply)) {
    throw new Error('Expected argument of type mt4_term_api.QuoteManyReply');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_mt4_term_api_QuoteManyReply(buffer_arg) {
  return mt4$term$api$market$info_pb.QuoteManyReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_mt4_term_api_QuoteManyRequest(arg) {
  if (!(arg instanceof mt4$term$api$market$info_pb.QuoteManyRequest)) {
    throw new Error('Expected argument of type mt4_term_api.QuoteManyRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_mt4_term_api_QuoteManyRequest(buffer_arg) {
  return mt4$term$api$market$info_pb.QuoteManyRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_mt4_term_api_QuoteReply(arg) {
  if (!(arg instanceof mt4$term$api$market$info_pb.QuoteReply)) {
    throw new Error('Expected argument of type mt4_term_api.QuoteReply');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_mt4_term_api_QuoteReply(buffer_arg) {
  return mt4$term$api$market$info_pb.QuoteReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_mt4_term_api_QuoteRequest(arg) {
  if (!(arg instanceof mt4$term$api$market$info_pb.QuoteRequest)) {
    throw new Error('Expected argument of type mt4_term_api.QuoteRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_mt4_term_api_QuoteRequest(buffer_arg) {
  return mt4$term$api$market$info_pb.QuoteRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_mt4_term_api_SymbolSelectReply(arg) {
  if (!(arg instanceof mt4$term$api$market$info_pb.SymbolSelectReply)) {
    throw new Error('Expected argument of type mt4_term_api.SymbolSelectReply');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_mt4_term_api_SymbolSelectReply(buffer_arg) {
  return mt4$term$api$market$info_pb.SymbolSelectReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_mt4_term_api_SymbolSelectRequest(arg) {
  if (!(arg instanceof mt4$term$api$market$info_pb.SymbolSelectRequest)) {
    throw new Error('Expected argument of type mt4_term_api.SymbolSelectRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_mt4_term_api_SymbolSelectRequest(buffer_arg) {
  return mt4$term$api$market$info_pb.SymbolSelectRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_mt4_term_api_SymbolsReply(arg) {
  if (!(arg instanceof mt4$term$api$market$info_pb.SymbolsReply)) {
    throw new Error('Expected argument of type mt4_term_api.SymbolsReply');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_mt4_term_api_SymbolsReply(buffer_arg) {
  return mt4$term$api$market$info_pb.SymbolsReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_mt4_term_api_SymbolsRequest(arg) {
  if (!(arg instanceof mt4$term$api$market$info_pb.SymbolsRequest)) {
    throw new Error('Expected argument of type mt4_term_api.SymbolsRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_mt4_term_api_SymbolsRequest(buffer_arg) {
  return mt4$term$api$market$info_pb.SymbolsRequest.deserializeBinary(new Uint8Array(buffer_arg));
}


var MarketInfoService = exports.MarketInfoService = {
  // Get quote
quote: {
    path: '/mt4_term_api.MarketInfo/Quote',
    requestStream: false,
    responseStream: false,
    requestType: mt4$term$api$market$info_pb.QuoteRequest,
    responseType: mt4$term$api$market$info_pb.QuoteReply,
    requestSerialize: serialize_mt4_term_api_QuoteRequest,
    requestDeserialize: deserialize_mt4_term_api_QuoteRequest,
    responseSerialize: serialize_mt4_term_api_QuoteReply,
    responseDeserialize: deserialize_mt4_term_api_QuoteReply,
  },
  // Latest quote for the specified symbol
quoteMany: {
    path: '/mt4_term_api.MarketInfo/QuoteMany',
    requestStream: false,
    responseStream: false,
    requestType: mt4$term$api$market$info_pb.QuoteManyRequest,
    responseType: mt4$term$api$market$info_pb.QuoteManyReply,
    requestSerialize: serialize_mt4_term_api_QuoteManyRequest,
    requestDeserialize: deserialize_mt4_term_api_QuoteManyRequest,
    responseSerialize: serialize_mt4_term_api_QuoteManyReply,
    responseDeserialize: deserialize_mt4_term_api_QuoteManyReply,
  },
  symbols: {
    path: '/mt4_term_api.MarketInfo/Symbols',
    requestStream: false,
    responseStream: false,
    requestType: mt4$term$api$market$info_pb.SymbolsRequest,
    responseType: mt4$term$api$market$info_pb.SymbolsReply,
    requestSerialize: serialize_mt4_term_api_SymbolsRequest,
    requestDeserialize: deserialize_mt4_term_api_SymbolsRequest,
    responseSerialize: serialize_mt4_term_api_SymbolsReply,
    responseDeserialize: deserialize_mt4_term_api_SymbolsReply,
  },
  quoteHistory: {
    path: '/mt4_term_api.MarketInfo/QuoteHistory',
    requestStream: false,
    responseStream: false,
    requestType: mt4$term$api$market$info_pb.QuoteHistoryRequest,
    responseType: mt4$term$api$market$info_pb.QuoteHistoryReply,
    requestSerialize: serialize_mt4_term_api_QuoteHistoryRequest,
    requestDeserialize: deserialize_mt4_term_api_QuoteHistoryRequest,
    responseSerialize: serialize_mt4_term_api_QuoteHistoryReply,
    responseDeserialize: deserialize_mt4_term_api_QuoteHistoryReply,
  },
  // Selects a symbol in the Market Watch window or removes a symbol from the window
// https://docs.mql4.com/marketinformation/symbolselect
symbolSelect: {
    path: '/mt4_term_api.MarketInfo/SymbolSelect',
    requestStream: false,
    responseStream: false,
    requestType: mt4$term$api$market$info_pb.SymbolSelectRequest,
    responseType: mt4$term$api$market$info_pb.SymbolSelectReply,
    requestSerialize: serialize_mt4_term_api_SymbolSelectRequest,
    requestDeserialize: deserialize_mt4_term_api_SymbolSelectRequest,
    responseSerialize: serialize_mt4_term_api_SymbolSelectReply,
    responseDeserialize: deserialize_mt4_term_api_SymbolSelectReply,
  },
};

exports.MarketInfoClient = grpc.makeGenericClientConstructor(MarketInfoService);
