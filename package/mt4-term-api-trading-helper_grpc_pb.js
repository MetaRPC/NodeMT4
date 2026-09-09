// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var mt4$term$api$trading$helper_pb = require('./mt4-term-api-trading-helper_pb.js');
var google_protobuf_timestamp_pb = require('google-protobuf/google/protobuf/timestamp_pb.js');
var google_api_annotations_pb = require('./google/api/annotations_pb.js');
var mrpc$mt4$error_pb = require('./mrpc-mt4-error_pb.js');

function serialize_mt4_term_api_OrderCloseByReply(arg) {
  if (!(arg instanceof mt4$term$api$trading$helper_pb.OrderCloseByReply)) {
    throw new Error('Expected argument of type mt4_term_api.OrderCloseByReply');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_mt4_term_api_OrderCloseByReply(buffer_arg) {
  return mt4$term$api$trading$helper_pb.OrderCloseByReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_mt4_term_api_OrderCloseByRequest(arg) {
  if (!(arg instanceof mt4$term$api$trading$helper_pb.OrderCloseByRequest)) {
    throw new Error('Expected argument of type mt4_term_api.OrderCloseByRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_mt4_term_api_OrderCloseByRequest(buffer_arg) {
  return mt4$term$api$trading$helper_pb.OrderCloseByRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_mt4_term_api_OrderCloseDeleteReply(arg) {
  if (!(arg instanceof mt4$term$api$trading$helper_pb.OrderCloseDeleteReply)) {
    throw new Error('Expected argument of type mt4_term_api.OrderCloseDeleteReply');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_mt4_term_api_OrderCloseDeleteReply(buffer_arg) {
  return mt4$term$api$trading$helper_pb.OrderCloseDeleteReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_mt4_term_api_OrderCloseDeleteRequest(arg) {
  if (!(arg instanceof mt4$term$api$trading$helper_pb.OrderCloseDeleteRequest)) {
    throw new Error('Expected argument of type mt4_term_api.OrderCloseDeleteRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_mt4_term_api_OrderCloseDeleteRequest(buffer_arg) {
  return mt4$term$api$trading$helper_pb.OrderCloseDeleteRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_mt4_term_api_OrderModifyReply(arg) {
  if (!(arg instanceof mt4$term$api$trading$helper_pb.OrderModifyReply)) {
    throw new Error('Expected argument of type mt4_term_api.OrderModifyReply');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_mt4_term_api_OrderModifyReply(buffer_arg) {
  return mt4$term$api$trading$helper_pb.OrderModifyReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_mt4_term_api_OrderModifyRequest(arg) {
  if (!(arg instanceof mt4$term$api$trading$helper_pb.OrderModifyRequest)) {
    throw new Error('Expected argument of type mt4_term_api.OrderModifyRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_mt4_term_api_OrderModifyRequest(buffer_arg) {
  return mt4$term$api$trading$helper_pb.OrderModifyRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_mt4_term_api_OrderSendReply(arg) {
  if (!(arg instanceof mt4$term$api$trading$helper_pb.OrderSendReply)) {
    throw new Error('Expected argument of type mt4_term_api.OrderSendReply');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_mt4_term_api_OrderSendReply(buffer_arg) {
  return mt4$term$api$trading$helper_pb.OrderSendReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_mt4_term_api_OrderSendRequest(arg) {
  if (!(arg instanceof mt4$term$api$trading$helper_pb.OrderSendRequest)) {
    throw new Error('Expected argument of type mt4_term_api.OrderSendRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_mt4_term_api_OrderSendRequest(buffer_arg) {
  return mt4$term$api$trading$helper_pb.OrderSendRequest.deserializeBinary(new Uint8Array(buffer_arg));
}


var TradingHelperService = exports.TradingHelperService = {
  // Send market or pending order
orderSend: {
    path: '/mt4_term_api.TradingHelper/OrderSend',
    requestStream: false,
    responseStream: false,
    requestType: mt4$term$api$trading$helper_pb.OrderSendRequest,
    responseType: mt4$term$api$trading$helper_pb.OrderSendReply,
    requestSerialize: serialize_mt4_term_api_OrderSendRequest,
    requestDeserialize: deserialize_mt4_term_api_OrderSendRequest,
    responseSerialize: serialize_mt4_term_api_OrderSendReply,
    responseDeserialize: deserialize_mt4_term_api_OrderSendReply,
  },
  // Modify market or pending order
orderModify: {
    path: '/mt4_term_api.TradingHelper/OrderModify',
    requestStream: false,
    responseStream: false,
    requestType: mt4$term$api$trading$helper_pb.OrderModifyRequest,
    responseType: mt4$term$api$trading$helper_pb.OrderModifyReply,
    requestSerialize: serialize_mt4_term_api_OrderModifyRequest,
    requestDeserialize: deserialize_mt4_term_api_OrderModifyRequest,
    responseSerialize: serialize_mt4_term_api_OrderModifyReply,
    responseDeserialize: deserialize_mt4_term_api_OrderModifyReply,
  },
  // Close market or pending order
orderCloseDelete: {
    path: '/mt4_term_api.TradingHelper/OrderCloseDelete',
    requestStream: false,
    responseStream: false,
    requestType: mt4$term$api$trading$helper_pb.OrderCloseDeleteRequest,
    responseType: mt4$term$api$trading$helper_pb.OrderCloseDeleteReply,
    requestSerialize: serialize_mt4_term_api_OrderCloseDeleteRequest,
    requestDeserialize: deserialize_mt4_term_api_OrderCloseDeleteRequest,
    responseSerialize: serialize_mt4_term_api_OrderCloseDeleteReply,
    responseDeserialize: deserialize_mt4_term_api_OrderCloseDeleteReply,
  },
  // Close market order with opposite market order
orderCloseBy: {
    path: '/mt4_term_api.TradingHelper/OrderCloseBy',
    requestStream: false,
    responseStream: false,
    requestType: mt4$term$api$trading$helper_pb.OrderCloseByRequest,
    responseType: mt4$term$api$trading$helper_pb.OrderCloseByReply,
    requestSerialize: serialize_mt4_term_api_OrderCloseByRequest,
    requestDeserialize: deserialize_mt4_term_api_OrderCloseByRequest,
    responseSerialize: serialize_mt4_term_api_OrderCloseByReply,
    responseDeserialize: deserialize_mt4_term_api_OrderCloseByReply,
  },
};

exports.TradingHelperClient = grpc.makeGenericClientConstructor(TradingHelperService);
