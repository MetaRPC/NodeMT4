// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var mt4$term$api$charts_pb = require('./mt4-term-api-charts_pb.js');
var google_api_annotations_pb = require('./google/api/annotations_pb.js');
var mrpc$mt4$error_pb = require('./mrpc-mt4-error_pb.js');

function serialize_mt4_term_api_GetEaParamsReply(arg) {
  if (!(arg instanceof mt4$term$api$charts_pb.GetEaParamsReply)) {
    throw new Error('Expected argument of type mt4_term_api.GetEaParamsReply');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_mt4_term_api_GetEaParamsReply(buffer_arg) {
  return mt4$term$api$charts_pb.GetEaParamsReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_mt4_term_api_GetEaParamsRequest(arg) {
  if (!(arg instanceof mt4$term$api$charts_pb.GetEaParamsRequest)) {
    throw new Error('Expected argument of type mt4_term_api.GetEaParamsRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_mt4_term_api_GetEaParamsRequest(buffer_arg) {
  return mt4$term$api$charts_pb.GetEaParamsRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_mt4_term_api_OpenTerminalChartWithEaReply(arg) {
  if (!(arg instanceof mt4$term$api$charts_pb.OpenTerminalChartWithEaReply)) {
    throw new Error('Expected argument of type mt4_term_api.OpenTerminalChartWithEaReply');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_mt4_term_api_OpenTerminalChartWithEaReply(buffer_arg) {
  return mt4$term$api$charts_pb.OpenTerminalChartWithEaReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_mt4_term_api_OpenTerminalChartWithEaRequest(arg) {
  if (!(arg instanceof mt4$term$api$charts_pb.OpenTerminalChartWithEaRequest)) {
    throw new Error('Expected argument of type mt4_term_api.OpenTerminalChartWithEaRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_mt4_term_api_OpenTerminalChartWithEaRequest(buffer_arg) {
  return mt4$term$api$charts_pb.OpenTerminalChartWithEaRequest.deserializeBinary(new Uint8Array(buffer_arg));
}


var ChartsService = exports.ChartsService = {
  getEaParams: {
    path: '/mt4_term_api.Charts/GetEaParams',
    requestStream: false,
    responseStream: false,
    requestType: mt4$term$api$charts_pb.GetEaParamsRequest,
    responseType: mt4$term$api$charts_pb.GetEaParamsReply,
    requestSerialize: serialize_mt4_term_api_GetEaParamsRequest,
    requestDeserialize: deserialize_mt4_term_api_GetEaParamsRequest,
    responseSerialize: serialize_mt4_term_api_GetEaParamsReply,
    responseDeserialize: deserialize_mt4_term_api_GetEaParamsReply,
  },
  openTerminalChartWithEa: {
    path: '/mt4_term_api.Charts/OpenTerminalChartWithEa',
    requestStream: false,
    responseStream: false,
    requestType: mt4$term$api$charts_pb.OpenTerminalChartWithEaRequest,
    responseType: mt4$term$api$charts_pb.OpenTerminalChartWithEaReply,
    requestSerialize: serialize_mt4_term_api_OpenTerminalChartWithEaRequest,
    requestDeserialize: deserialize_mt4_term_api_OpenTerminalChartWithEaRequest,
    responseSerialize: serialize_mt4_term_api_OpenTerminalChartWithEaReply,
    responseDeserialize: deserialize_mt4_term_api_OpenTerminalChartWithEaReply,
  },
};

exports.ChartsClient = grpc.makeGenericClientConstructor(ChartsService);
