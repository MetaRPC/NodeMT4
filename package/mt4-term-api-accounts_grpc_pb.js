// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var mt4$term$api$accounts_pb = require('./mt4-term-api-accounts_pb.js');
var google_protobuf_timestamp_pb = require('google-protobuf/google/protobuf/timestamp_pb.js');
var google_api_annotations_pb = require('./google/api/annotations_pb.js');
var mrpc$mt4$error_pb = require('./mrpc-mt4-error_pb.js');

function serialize_mt4_term_api_AccountsListReply(arg) {
  if (!(arg instanceof mt4$term$api$accounts_pb.AccountsListReply)) {
    throw new Error('Expected argument of type mt4_term_api.AccountsListReply');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_mt4_term_api_AccountsListReply(buffer_arg) {
  return mt4$term$api$accounts_pb.AccountsListReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_mt4_term_api_AccountsListRequest(arg) {
  if (!(arg instanceof mt4$term$api$accounts_pb.AccountsListRequest)) {
    throw new Error('Expected argument of type mt4_term_api.AccountsListRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_mt4_term_api_AccountsListRequest(buffer_arg) {
  return mt4$term$api$accounts_pb.AccountsListRequest.deserializeBinary(new Uint8Array(buffer_arg));
}


// ============================================================================
// Accounts: the MT4 accounts (terminals) that belong to your API key.
//
// This is the call to make when you need the terminal ids of accounts that already exist - started
// from the dashboard or by an earlier ConnectEx - so that you can send them as the "id" header of
// every other call. Unlike the terminal calls it needs NO "id" header: it is answered from the
// platform's records of the API key sent in the "APIKey" header, and it never starts, wakes or bills
// a terminal.
//
// Accounts are listed newest first (by started_utc, then terminal_id) and returned by page. Only
// accounts of THIS platform's endpoint are listed (mt5.mrpc.pro lists MT5 accounts, mt4.mrpc.pro lists
// MT4 accounts).
// ============================================================================
var AccountsService = exports.AccountsService = {
  // Lists the accounts of the API key sent in the APIKey header, one page per call. Pass the
// next_page_token of a page back as page_token to continue; an empty next_page_token means that was
// the last page.
// [DefaultValues]
// {
//   "includeStopped": "false",
//   "pageSize": "200"
// }
list: {
    path: '/mt4_term_api.Accounts/List',
    requestStream: false,
    responseStream: false,
    requestType: mt4$term$api$accounts_pb.AccountsListRequest,
    responseType: mt4$term$api$accounts_pb.AccountsListReply,
    requestSerialize: serialize_mt4_term_api_AccountsListRequest,
    requestDeserialize: deserialize_mt4_term_api_AccountsListRequest,
    responseSerialize: serialize_mt4_term_api_AccountsListReply,
    responseDeserialize: deserialize_mt4_term_api_AccountsListReply,
  },
};

exports.AccountsClient = grpc.makeGenericClientConstructor(AccountsService);
