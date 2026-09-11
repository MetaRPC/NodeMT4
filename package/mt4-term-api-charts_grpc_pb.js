// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var mt4$term$api$charts_pb = require('./mt4-term-api-charts_pb.js');
var google_api_annotations_pb = require('./google/api/annotations_pb.js');
var google_protobuf_timestamp_pb = require('google-protobuf/google/protobuf/timestamp_pb.js');
var mrpc$mt4$error_pb = require('./mrpc-mt4-error_pb.js');

function serialize_mt4_term_api_AttachEaReply(arg) {
  if (!(arg instanceof mt4$term$api$charts_pb.AttachEaReply)) {
    throw new Error('Expected argument of type mt4_term_api.AttachEaReply');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_mt4_term_api_AttachEaReply(buffer_arg) {
  return mt4$term$api$charts_pb.AttachEaReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_mt4_term_api_AttachEaRequest(arg) {
  if (!(arg instanceof mt4$term$api$charts_pb.AttachEaRequest)) {
    throw new Error('Expected argument of type mt4_term_api.AttachEaRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_mt4_term_api_AttachEaRequest(buffer_arg) {
  return mt4$term$api$charts_pb.AttachEaRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_mt4_term_api_GetEaLogsReply(arg) {
  if (!(arg instanceof mt4$term$api$charts_pb.GetEaLogsReply)) {
    throw new Error('Expected argument of type mt4_term_api.GetEaLogsReply');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_mt4_term_api_GetEaLogsReply(buffer_arg) {
  return mt4$term$api$charts_pb.GetEaLogsReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_mt4_term_api_GetEaLogsRequest(arg) {
  if (!(arg instanceof mt4$term$api$charts_pb.GetEaLogsRequest)) {
    throw new Error('Expected argument of type mt4_term_api.GetEaLogsRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_mt4_term_api_GetEaLogsRequest(buffer_arg) {
  return mt4$term$api$charts_pb.GetEaLogsRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

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

function serialize_mt4_term_api_GetRunningEasReply(arg) {
  if (!(arg instanceof mt4$term$api$charts_pb.GetRunningEasReply)) {
    throw new Error('Expected argument of type mt4_term_api.GetRunningEasReply');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_mt4_term_api_GetRunningEasReply(buffer_arg) {
  return mt4$term$api$charts_pb.GetRunningEasReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_mt4_term_api_GetRunningEasRequest(arg) {
  if (!(arg instanceof mt4$term$api$charts_pb.GetRunningEasRequest)) {
    throw new Error('Expected argument of type mt4_term_api.GetRunningEasRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_mt4_term_api_GetRunningEasRequest(buffer_arg) {
  return mt4$term$api$charts_pb.GetRunningEasRequest.deserializeBinary(new Uint8Array(buffer_arg));
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

function serialize_mt4_term_api_StopEaReply(arg) {
  if (!(arg instanceof mt4$term$api$charts_pb.StopEaReply)) {
    throw new Error('Expected argument of type mt4_term_api.StopEaReply');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_mt4_term_api_StopEaReply(buffer_arg) {
  return mt4$term$api$charts_pb.StopEaReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_mt4_term_api_StopEaRequest(arg) {
  if (!(arg instanceof mt4$term$api$charts_pb.StopEaRequest)) {
    throw new Error('Expected argument of type mt4_term_api.StopEaRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_mt4_term_api_StopEaRequest(buffer_arg) {
  return mt4$term$api$charts_pb.StopEaRequest.deserializeBinary(new Uint8Array(buffer_arg));
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
  attachEa: {
    path: '/mt4_term_api.Charts/AttachEa',
    requestStream: false,
    responseStream: false,
    requestType: mt4$term$api$charts_pb.AttachEaRequest,
    responseType: mt4$term$api$charts_pb.AttachEaReply,
    requestSerialize: serialize_mt4_term_api_AttachEaRequest,
    requestDeserialize: deserialize_mt4_term_api_AttachEaRequest,
    responseSerialize: serialize_mt4_term_api_AttachEaReply,
    responseDeserialize: deserialize_mt4_term_api_AttachEaReply,
  },
  getRunningEas: {
    path: '/mt4_term_api.Charts/GetRunningEas',
    requestStream: false,
    responseStream: false,
    requestType: mt4$term$api$charts_pb.GetRunningEasRequest,
    responseType: mt4$term$api$charts_pb.GetRunningEasReply,
    requestSerialize: serialize_mt4_term_api_GetRunningEasRequest,
    requestDeserialize: deserialize_mt4_term_api_GetRunningEasRequest,
    responseSerialize: serialize_mt4_term_api_GetRunningEasReply,
    responseDeserialize: deserialize_mt4_term_api_GetRunningEasReply,
  },
  getEaLogs: {
    path: '/mt4_term_api.Charts/GetEaLogs',
    requestStream: false,
    responseStream: false,
    requestType: mt4$term$api$charts_pb.GetEaLogsRequest,
    responseType: mt4$term$api$charts_pb.GetEaLogsReply,
    requestSerialize: serialize_mt4_term_api_GetEaLogsRequest,
    requestDeserialize: deserialize_mt4_term_api_GetEaLogsRequest,
    responseSerialize: serialize_mt4_term_api_GetEaLogsReply,
    responseDeserialize: deserialize_mt4_term_api_GetEaLogsReply,
  },
  stopEa: {
    path: '/mt4_term_api.Charts/StopEa',
    requestStream: false,
    responseStream: false,
    requestType: mt4$term$api$charts_pb.StopEaRequest,
    responseType: mt4$term$api$charts_pb.StopEaReply,
    requestSerialize: serialize_mt4_term_api_StopEaRequest,
    requestDeserialize: deserialize_mt4_term_api_StopEaRequest,
    responseSerialize: serialize_mt4_term_api_StopEaReply,
    responseDeserialize: deserialize_mt4_term_api_StopEaReply,
  },
};

exports.ChartsClient = grpc.makeGenericClientConstructor(ChartsService);
