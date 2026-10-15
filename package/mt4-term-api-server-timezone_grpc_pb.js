// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var mt4$term$api$server$timezone_pb = require('./mt4-term-api-server-timezone_pb.js');
var google_protobuf_timestamp_pb = require('google-protobuf/google/protobuf/timestamp_pb.js');
var google_api_annotations_pb = require('./google/api/annotations_pb.js');
var mrpc$mt4$error_pb = require('./mrpc-mt4-error_pb.js');

function serialize_mt4_term_api_ServerTimezoneReply(arg) {
  if (!(arg instanceof mt4$term$api$server$timezone_pb.ServerTimezoneReply)) {
    throw new Error('Expected argument of type mt4_term_api.ServerTimezoneReply');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_mt4_term_api_ServerTimezoneReply(buffer_arg) {
  return mt4$term$api$server$timezone_pb.ServerTimezoneReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_mt4_term_api_ServerTimezoneRequest(arg) {
  if (!(arg instanceof mt4$term$api$server$timezone_pb.ServerTimezoneRequest)) {
    throw new Error('Expected argument of type mt4_term_api.ServerTimezoneRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_mt4_term_api_ServerTimezoneRequest(buffer_arg) {
  return mt4$term$api$server$timezone_pb.ServerTimezoneRequest.deserializeBinary(new Uint8Array(buffer_arg));
}


// ============================================================================
// ServerTimezone: the broker server's time zone the platform uses for this account, and where it came from.
//
// Every *_utc field of the API is the broker server time minus this offset. Answered by the platform itself from what it
// knows (the terminal is not asked unless nothing is known yet), so it is cheap to call.
// ============================================================================
var ServerTimezoneService = exports.ServerTimezoneService = {
  // The broker server's UTC offset of the terminal in the "id" header: live (read by this terminal from a fresh quote) or the
// last one validated for the same broker server (an account whose market is closed has no quote to read it from - MT4 only;
// MT5 reads its server clock directly and is always live).
serverTimezone: {
    path: '/mt4_term_api.ServerTimezone/ServerTimezone',
    requestStream: false,
    responseStream: false,
    requestType: mt4$term$api$server$timezone_pb.ServerTimezoneRequest,
    responseType: mt4$term$api$server$timezone_pb.ServerTimezoneReply,
    requestSerialize: serialize_mt4_term_api_ServerTimezoneRequest,
    requestDeserialize: deserialize_mt4_term_api_ServerTimezoneRequest,
    responseSerialize: serialize_mt4_term_api_ServerTimezoneReply,
    responseDeserialize: deserialize_mt4_term_api_ServerTimezoneReply,
  },
};

exports.ServerTimezoneClient = grpc.makeGenericClientConstructor(ServerTimezoneService);
