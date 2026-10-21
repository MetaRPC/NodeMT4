// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var mt4$term$api$public$account_pb = require('./mt4-term-api-public-account_pb.js');
var google_protobuf_timestamp_pb = require('google-protobuf/google/protobuf/timestamp_pb.js');
var google_api_annotations_pb = require('./google/api/annotations_pb.js');
var mrpc$mt4$error_pb = require('./mrpc-mt4-error_pb.js');

function serialize_mt4_term_api_PublicAccountPublishRequest(arg) {
  if (!(arg instanceof mt4$term$api$public$account_pb.PublicAccountPublishRequest)) {
    throw new Error('Expected argument of type mt4_term_api.PublicAccountPublishRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_mt4_term_api_PublicAccountPublishRequest(buffer_arg) {
  return mt4$term$api$public$account_pb.PublicAccountPublishRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_mt4_term_api_PublicAccountReply(arg) {
  if (!(arg instanceof mt4$term$api$public$account_pb.PublicAccountReply)) {
    throw new Error('Expected argument of type mt4_term_api.PublicAccountReply');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_mt4_term_api_PublicAccountReply(buffer_arg) {
  return mt4$term$api$public$account_pb.PublicAccountReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_mt4_term_api_PublicAccountStatusRequest(arg) {
  if (!(arg instanceof mt4$term$api$public$account_pb.PublicAccountStatusRequest)) {
    throw new Error('Expected argument of type mt4_term_api.PublicAccountStatusRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_mt4_term_api_PublicAccountStatusRequest(buffer_arg) {
  return mt4$term$api$public$account_pb.PublicAccountStatusRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_mt4_term_api_PublicAccountUnpublishRequest(arg) {
  if (!(arg instanceof mt4$term$api$public$account_pb.PublicAccountUnpublishRequest)) {
    throw new Error('Expected argument of type mt4_term_api.PublicAccountUnpublishRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_mt4_term_api_PublicAccountUnpublishRequest(buffer_arg) {
  return mt4$term$api$public$account_pb.PublicAccountUnpublishRequest.deserializeBinary(new Uint8Array(buffer_arg));
}


// ============================================================================
// PublicAccount: publish the MT4 account in the "id" header as a public master account for copy trading on mrpc.pro,
// change its public name and profit share, unpublish it, and read its public status.
//
// The call needs only the "APIKey" header (your mrpc_live_ key) and the "id" header (the terminal), like every other
// terminal call: no user key, no session, no admin key. The account must belong to the API key's user and be an MT4
// account (mt4.mrpc.pro); any other id - another user's account, a deleted one, an MT5 one, an unknown one - is answered
// PUBLIC_ACCOUNT_TERMINAL_NOT_FOUND. The rules are the control panel's (mrpc.pro/my, "Public profile"): a public name of
// 2-32 letters, digits, spaces, "." "_" "-", and a profit share of 0-50 % (one decimal) charged to followers on winning
// copied trades. The terminal does not have to be running; the leaderboard lists the account once its first figures have
// been read from it (listed), which needs it connected.
// ============================================================================
var PublicAccountService = exports.PublicAccountService = {
  // Publishes the account, or changes the name or share of an account already public. A field left out keeps its current
// value; on a first publish the name defaults to the terminal's name (else "MT4 " and the masked login) and the share to 0.
publish: {
    path: '/mt4_term_api.PublicAccount/Publish',
    requestStream: false,
    responseStream: false,
    requestType: mt4$term$api$public$account_pb.PublicAccountPublishRequest,
    responseType: mt4$term$api$public$account_pb.PublicAccountReply,
    requestSerialize: serialize_mt4_term_api_PublicAccountPublishRequest,
    requestDeserialize: deserialize_mt4_term_api_PublicAccountPublishRequest,
    responseSerialize: serialize_mt4_term_api_PublicAccountReply,
    responseDeserialize: deserialize_mt4_term_api_PublicAccountReply,
  },
  // Unpublishes the account: it leaves the leaderboard and its page at once, and nobody can start following it. Copiers
// already following it are not stopped by this call. The public id (slug), name and share are kept for a later Publish.
// Unpublishing an account that is not public changes nothing.
unpublish: {
    path: '/mt4_term_api.PublicAccount/Unpublish',
    requestStream: false,
    responseStream: false,
    requestType: mt4$term$api$public$account_pb.PublicAccountUnpublishRequest,
    responseType: mt4$term$api$public$account_pb.PublicAccountReply,
    requestSerialize: serialize_mt4_term_api_PublicAccountUnpublishRequest,
    requestDeserialize: deserialize_mt4_term_api_PublicAccountUnpublishRequest,
    responseSerialize: serialize_mt4_term_api_PublicAccountReply,
    responseDeserialize: deserialize_mt4_term_api_PublicAccountReply,
  },
  // The account's public status. Changes nothing.
status: {
    path: '/mt4_term_api.PublicAccount/Status',
    requestStream: false,
    responseStream: false,
    requestType: mt4$term$api$public$account_pb.PublicAccountStatusRequest,
    responseType: mt4$term$api$public$account_pb.PublicAccountReply,
    requestSerialize: serialize_mt4_term_api_PublicAccountStatusRequest,
    requestDeserialize: deserialize_mt4_term_api_PublicAccountStatusRequest,
    responseSerialize: serialize_mt4_term_api_PublicAccountReply,
    responseDeserialize: deserialize_mt4_term_api_PublicAccountReply,
  },
};

exports.PublicAccountClient = grpc.makeGenericClientConstructor(PublicAccountService);
