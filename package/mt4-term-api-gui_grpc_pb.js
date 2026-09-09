// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var mt4$term$api$gui_pb = require('./mt4-term-api-gui_pb.js');
var google_protobuf_timestamp_pb = require('google-protobuf/google/protobuf/timestamp_pb.js');

function serialize_mt4_term_api_GuiDemoFindCompaniesReply(arg) {
  if (!(arg instanceof mt4$term$api$gui_pb.GuiDemoFindCompaniesReply)) {
    throw new Error('Expected argument of type mt4_term_api.GuiDemoFindCompaniesReply');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_mt4_term_api_GuiDemoFindCompaniesReply(buffer_arg) {
  return mt4$term$api$gui_pb.GuiDemoFindCompaniesReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_mt4_term_api_GuiDemoFindCompaniesRequest(arg) {
  if (!(arg instanceof mt4$term$api$gui_pb.GuiDemoFindCompaniesRequest)) {
    throw new Error('Expected argument of type mt4_term_api.GuiDemoFindCompaniesRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_mt4_term_api_GuiDemoFindCompaniesRequest(buffer_arg) {
  return mt4$term$api$gui_pb.GuiDemoFindCompaniesRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_mt4_term_api_GuiDemoOpenAccountReply(arg) {
  if (!(arg instanceof mt4$term$api$gui_pb.GuiDemoOpenAccountReply)) {
    throw new Error('Expected argument of type mt4_term_api.GuiDemoOpenAccountReply');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_mt4_term_api_GuiDemoOpenAccountReply(buffer_arg) {
  return mt4$term$api$gui_pb.GuiDemoOpenAccountReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_mt4_term_api_GuiDemoOpenAccountRequest(arg) {
  if (!(arg instanceof mt4$term$api$gui_pb.GuiDemoOpenAccountRequest)) {
    throw new Error('Expected argument of type mt4_term_api.GuiDemoOpenAccountRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_mt4_term_api_GuiDemoOpenAccountRequest(buffer_arg) {
  return mt4$term$api$gui_pb.GuiDemoOpenAccountRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_mt4_term_api_GuiDemoProgressEvent(arg) {
  if (!(arg instanceof mt4$term$api$gui_pb.GuiDemoProgressEvent)) {
    throw new Error('Expected argument of type mt4_term_api.GuiDemoProgressEvent');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_mt4_term_api_GuiDemoProgressEvent(buffer_arg) {
  return mt4$term$api$gui_pb.GuiDemoProgressEvent.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_mt4_term_api_GuiDemoServersAndTypesReply(arg) {
  if (!(arg instanceof mt4$term$api$gui_pb.GuiDemoServersAndTypesReply)) {
    throw new Error('Expected argument of type mt4_term_api.GuiDemoServersAndTypesReply');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_mt4_term_api_GuiDemoServersAndTypesReply(buffer_arg) {
  return mt4$term$api$gui_pb.GuiDemoServersAndTypesReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_mt4_term_api_GuiDemoServersAndTypesRequest(arg) {
  if (!(arg instanceof mt4$term$api$gui_pb.GuiDemoServersAndTypesRequest)) {
    throw new Error('Expected argument of type mt4_term_api.GuiDemoServersAndTypesRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_mt4_term_api_GuiDemoServersAndTypesRequest(buffer_arg) {
  return mt4$term$api$gui_pb.GuiDemoServersAndTypesRequest.deserializeBinary(new Uint8Array(buffer_arg));
}


// Terminal-side GUI-automation service (implemented by mt4-framework-grpc, which
// P/Invokes mt4-term-gui.dll). The manager's DemoAccount service proxies to these.
var GuiService = exports.GuiService = {
  demoFindCompanies: {
    path: '/mt4_term_api.Gui/DemoFindCompanies',
    requestStream: false,
    responseStream: false,
    requestType: mt4$term$api$gui_pb.GuiDemoFindCompaniesRequest,
    responseType: mt4$term$api$gui_pb.GuiDemoFindCompaniesReply,
    requestSerialize: serialize_mt4_term_api_GuiDemoFindCompaniesRequest,
    requestDeserialize: deserialize_mt4_term_api_GuiDemoFindCompaniesRequest,
    responseSerialize: serialize_mt4_term_api_GuiDemoFindCompaniesReply,
    responseDeserialize: deserialize_mt4_term_api_GuiDemoFindCompaniesReply,
  },
  demoServersAndTypes: {
    path: '/mt4_term_api.Gui/DemoServersAndTypes',
    requestStream: false,
    responseStream: false,
    requestType: mt4$term$api$gui_pb.GuiDemoServersAndTypesRequest,
    responseType: mt4$term$api$gui_pb.GuiDemoServersAndTypesReply,
    requestSerialize: serialize_mt4_term_api_GuiDemoServersAndTypesRequest,
    requestDeserialize: deserialize_mt4_term_api_GuiDemoServersAndTypesRequest,
    responseSerialize: serialize_mt4_term_api_GuiDemoServersAndTypesReply,
    responseDeserialize: deserialize_mt4_term_api_GuiDemoServersAndTypesReply,
  },
  demoOpenAccount: {
    path: '/mt4_term_api.Gui/DemoOpenAccount',
    requestStream: false,
    responseStream: false,
    requestType: mt4$term$api$gui_pb.GuiDemoOpenAccountRequest,
    responseType: mt4$term$api$gui_pb.GuiDemoOpenAccountReply,
    requestSerialize: serialize_mt4_term_api_GuiDemoOpenAccountRequest,
    requestDeserialize: deserialize_mt4_term_api_GuiDemoOpenAccountRequest,
    responseSerialize: serialize_mt4_term_api_GuiDemoOpenAccountReply,
    responseDeserialize: deserialize_mt4_term_api_GuiDemoOpenAccountReply,
  },
  demoOpenAccountWithProgress: {
    path: '/mt4_term_api.Gui/DemoOpenAccountWithProgress',
    requestStream: false,
    responseStream: true,
    requestType: mt4$term$api$gui_pb.GuiDemoOpenAccountRequest,
    responseType: mt4$term$api$gui_pb.GuiDemoProgressEvent,
    requestSerialize: serialize_mt4_term_api_GuiDemoOpenAccountRequest,
    requestDeserialize: deserialize_mt4_term_api_GuiDemoOpenAccountRequest,
    responseSerialize: serialize_mt4_term_api_GuiDemoProgressEvent,
    responseDeserialize: deserialize_mt4_term_api_GuiDemoProgressEvent,
  },
};

exports.GuiClient = grpc.makeGenericClientConstructor(GuiService);
