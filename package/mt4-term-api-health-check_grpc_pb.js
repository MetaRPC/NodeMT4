// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var mt4$term$api$health$check_pb = require('./mt4-term-api-health-check_pb.js');

function serialize_mt4_term_api_CloseTerminalReply(arg) {
  if (!(arg instanceof mt4$term$api$health$check_pb.CloseTerminalReply)) {
    throw new Error('Expected argument of type mt4_term_api.CloseTerminalReply');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_mt4_term_api_CloseTerminalReply(buffer_arg) {
  return mt4$term$api$health$check_pb.CloseTerminalReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_mt4_term_api_CloseTerminalRequest(arg) {
  if (!(arg instanceof mt4$term$api$health$check_pb.CloseTerminalRequest)) {
    throw new Error('Expected argument of type mt4_term_api.CloseTerminalRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_mt4_term_api_CloseTerminalRequest(buffer_arg) {
  return mt4$term$api$health$check_pb.CloseTerminalRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_mt4_term_api_HealthCheckReply(arg) {
  if (!(arg instanceof mt4$term$api$health$check_pb.HealthCheckReply)) {
    throw new Error('Expected argument of type mt4_term_api.HealthCheckReply');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_mt4_term_api_HealthCheckReply(buffer_arg) {
  return mt4$term$api$health$check_pb.HealthCheckReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_mt4_term_api_HealthCheckRequest(arg) {
  if (!(arg instanceof mt4$term$api$health$check_pb.HealthCheckRequest)) {
    throw new Error('Expected argument of type mt4_term_api.HealthCheckRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_mt4_term_api_HealthCheckRequest(buffer_arg) {
  return mt4$term$api$health$check_pb.HealthCheckRequest.deserializeBinary(new Uint8Array(buffer_arg));
}


var HealthServiceService = exports.HealthServiceService = {
  healthCheck: {
    path: '/mt4_term_api.HealthService/HealthCheck',
    requestStream: false,
    responseStream: false,
    requestType: mt4$term$api$health$check_pb.HealthCheckRequest,
    responseType: mt4$term$api$health$check_pb.HealthCheckReply,
    requestSerialize: serialize_mt4_term_api_HealthCheckRequest,
    requestDeserialize: deserialize_mt4_term_api_HealthCheckRequest,
    responseSerialize: serialize_mt4_term_api_HealthCheckReply,
    responseDeserialize: deserialize_mt4_term_api_HealthCheckReply,
  },
  closeTerminal: {
    path: '/mt4_term_api.HealthService/CloseTerminal',
    requestStream: false,
    responseStream: false,
    requestType: mt4$term$api$health$check_pb.CloseTerminalRequest,
    responseType: mt4$term$api$health$check_pb.CloseTerminalReply,
    requestSerialize: serialize_mt4_term_api_CloseTerminalRequest,
    requestDeserialize: deserialize_mt4_term_api_CloseTerminalRequest,
    responseSerialize: serialize_mt4_term_api_CloseTerminalReply,
    responseDeserialize: deserialize_mt4_term_api_CloseTerminalReply,
  },
};

exports.HealthServiceClient = grpc.makeGenericClientConstructor(HealthServiceService);
