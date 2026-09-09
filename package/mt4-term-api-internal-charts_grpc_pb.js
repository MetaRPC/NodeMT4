// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var mt4$term$api$internal$charts_pb = require('./mt4-term-api-internal-charts_pb.js');

function serialize_mt4_term_api_ChartCloseReply(arg) {
  if (!(arg instanceof mt4$term$api$internal$charts_pb.ChartCloseReply)) {
    throw new Error('Expected argument of type mt4_term_api.ChartCloseReply');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_mt4_term_api_ChartCloseReply(buffer_arg) {
  return mt4$term$api$internal$charts_pb.ChartCloseReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_mt4_term_api_ChartCloseRequest(arg) {
  if (!(arg instanceof mt4$term$api$internal$charts_pb.ChartCloseRequest)) {
    throw new Error('Expected argument of type mt4_term_api.ChartCloseRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_mt4_term_api_ChartCloseRequest(buffer_arg) {
  return mt4$term$api$internal$charts_pb.ChartCloseRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_mt4_term_api_ChartOpenReply(arg) {
  if (!(arg instanceof mt4$term$api$internal$charts_pb.ChartOpenReply)) {
    throw new Error('Expected argument of type mt4_term_api.ChartOpenReply');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_mt4_term_api_ChartOpenReply(buffer_arg) {
  return mt4$term$api$internal$charts_pb.ChartOpenReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_mt4_term_api_ChartOpenRequest(arg) {
  if (!(arg instanceof mt4$term$api$internal$charts_pb.ChartOpenRequest)) {
    throw new Error('Expected argument of type mt4_term_api.ChartOpenRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_mt4_term_api_ChartOpenRequest(buffer_arg) {
  return mt4$term$api$internal$charts_pb.ChartOpenRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_mt4_term_api_CustomChartApplyTemplateReply(arg) {
  if (!(arg instanceof mt4$term$api$internal$charts_pb.CustomChartApplyTemplateReply)) {
    throw new Error('Expected argument of type mt4_term_api.CustomChartApplyTemplateReply');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_mt4_term_api_CustomChartApplyTemplateReply(buffer_arg) {
  return mt4$term$api$internal$charts_pb.CustomChartApplyTemplateReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_mt4_term_api_CustomChartApplyTemplateRequest(arg) {
  if (!(arg instanceof mt4$term$api$internal$charts_pb.CustomChartApplyTemplateRequest)) {
    throw new Error('Expected argument of type mt4_term_api.CustomChartApplyTemplateRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_mt4_term_api_CustomChartApplyTemplateRequest(buffer_arg) {
  return mt4$term$api$internal$charts_pb.CustomChartApplyTemplateRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_mt4_term_api_CustomChartOpenReply(arg) {
  if (!(arg instanceof mt4$term$api$internal$charts_pb.CustomChartOpenReply)) {
    throw new Error('Expected argument of type mt4_term_api.CustomChartOpenReply');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_mt4_term_api_CustomChartOpenReply(buffer_arg) {
  return mt4$term$api$internal$charts_pb.CustomChartOpenReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_mt4_term_api_CustomChartOpenRequest(arg) {
  if (!(arg instanceof mt4$term$api$internal$charts_pb.CustomChartOpenRequest)) {
    throw new Error('Expected argument of type mt4_term_api.CustomChartOpenRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_mt4_term_api_CustomChartOpenRequest(buffer_arg) {
  return mt4$term$api$internal$charts_pb.CustomChartOpenRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_mt4_term_api_CustomChartSaveTemplateReply(arg) {
  if (!(arg instanceof mt4$term$api$internal$charts_pb.CustomChartSaveTemplateReply)) {
    throw new Error('Expected argument of type mt4_term_api.CustomChartSaveTemplateReply');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_mt4_term_api_CustomChartSaveTemplateReply(buffer_arg) {
  return mt4$term$api$internal$charts_pb.CustomChartSaveTemplateReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_mt4_term_api_CustomChartSaveTemplateRequest(arg) {
  if (!(arg instanceof mt4$term$api$internal$charts_pb.CustomChartSaveTemplateRequest)) {
    throw new Error('Expected argument of type mt4_term_api.CustomChartSaveTemplateRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_mt4_term_api_CustomChartSaveTemplateRequest(buffer_arg) {
  return mt4$term$api$internal$charts_pb.CustomChartSaveTemplateRequest.deserializeBinary(new Uint8Array(buffer_arg));
}


var InternalChartsService = exports.InternalChartsService = {
  chartOpen: {
    path: '/mt4_term_api.InternalCharts/ChartOpen',
    requestStream: false,
    responseStream: false,
    requestType: mt4$term$api$internal$charts_pb.ChartOpenRequest,
    responseType: mt4$term$api$internal$charts_pb.ChartOpenReply,
    requestSerialize: serialize_mt4_term_api_ChartOpenRequest,
    requestDeserialize: deserialize_mt4_term_api_ChartOpenRequest,
    responseSerialize: serialize_mt4_term_api_ChartOpenReply,
    responseDeserialize: deserialize_mt4_term_api_ChartOpenReply,
  },
  chartClose: {
    path: '/mt4_term_api.InternalCharts/ChartClose',
    requestStream: false,
    responseStream: false,
    requestType: mt4$term$api$internal$charts_pb.ChartCloseRequest,
    responseType: mt4$term$api$internal$charts_pb.ChartCloseReply,
    requestSerialize: serialize_mt4_term_api_ChartCloseRequest,
    requestDeserialize: deserialize_mt4_term_api_ChartCloseRequest,
    responseSerialize: serialize_mt4_term_api_ChartCloseReply,
    responseDeserialize: deserialize_mt4_term_api_ChartCloseReply,
  },
  customChartOpen: {
    path: '/mt4_term_api.InternalCharts/CustomChartOpen',
    requestStream: false,
    responseStream: false,
    requestType: mt4$term$api$internal$charts_pb.CustomChartOpenRequest,
    responseType: mt4$term$api$internal$charts_pb.CustomChartOpenReply,
    requestSerialize: serialize_mt4_term_api_CustomChartOpenRequest,
    requestDeserialize: deserialize_mt4_term_api_CustomChartOpenRequest,
    responseSerialize: serialize_mt4_term_api_CustomChartOpenReply,
    responseDeserialize: deserialize_mt4_term_api_CustomChartOpenReply,
  },
  customChartSaveTemplate: {
    path: '/mt4_term_api.InternalCharts/CustomChartSaveTemplate',
    requestStream: false,
    responseStream: false,
    requestType: mt4$term$api$internal$charts_pb.CustomChartSaveTemplateRequest,
    responseType: mt4$term$api$internal$charts_pb.CustomChartSaveTemplateReply,
    requestSerialize: serialize_mt4_term_api_CustomChartSaveTemplateRequest,
    requestDeserialize: deserialize_mt4_term_api_CustomChartSaveTemplateRequest,
    responseSerialize: serialize_mt4_term_api_CustomChartSaveTemplateReply,
    responseDeserialize: deserialize_mt4_term_api_CustomChartSaveTemplateReply,
  },
  customChartApplyTemplate: {
    path: '/mt4_term_api.InternalCharts/CustomChartApplyTemplate',
    requestStream: false,
    responseStream: false,
    requestType: mt4$term$api$internal$charts_pb.CustomChartApplyTemplateRequest,
    responseType: mt4$term$api$internal$charts_pb.CustomChartApplyTemplateReply,
    requestSerialize: serialize_mt4_term_api_CustomChartApplyTemplateRequest,
    requestDeserialize: deserialize_mt4_term_api_CustomChartApplyTemplateRequest,
    responseSerialize: serialize_mt4_term_api_CustomChartApplyTemplateReply,
    responseDeserialize: deserialize_mt4_term_api_CustomChartApplyTemplateReply,
  },
};

exports.InternalChartsClient = grpc.makeGenericClientConstructor(InternalChartsService);
