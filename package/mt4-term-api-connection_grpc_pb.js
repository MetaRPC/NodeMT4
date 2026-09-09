// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var mt4$term$api$connection_pb = require('./mt4-term-api-connection_pb.js');
var google_api_annotations_pb = require('./google/api/annotations_pb.js');
var google_protobuf_timestamp_pb = require('google-protobuf/google/protobuf/timestamp_pb.js');
var mrpc$mt4$error_pb = require('./mrpc-mt4-error_pb.js');

function serialize_mt4_term_api_CheckConnectReply(arg) {
  if (!(arg instanceof mt4$term$api$connection_pb.CheckConnectReply)) {
    throw new Error('Expected argument of type mt4_term_api.CheckConnectReply');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_mt4_term_api_CheckConnectReply(buffer_arg) {
  return mt4$term$api$connection_pb.CheckConnectReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_mt4_term_api_CheckConnectRequest(arg) {
  if (!(arg instanceof mt4$term$api$connection_pb.CheckConnectRequest)) {
    throw new Error('Expected argument of type mt4_term_api.CheckConnectRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_mt4_term_api_CheckConnectRequest(buffer_arg) {
  return mt4$term$api$connection_pb.CheckConnectRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_mt4_term_api_ConnectByTokenRequest(arg) {
  if (!(arg instanceof mt4$term$api$connection_pb.ConnectByTokenRequest)) {
    throw new Error('Expected argument of type mt4_term_api.ConnectByTokenRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_mt4_term_api_ConnectByTokenRequest(buffer_arg) {
  return mt4$term$api$connection_pb.ConnectByTokenRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_mt4_term_api_ConnectExReply(arg) {
  if (!(arg instanceof mt4$term$api$connection_pb.ConnectExReply)) {
    throw new Error('Expected argument of type mt4_term_api.ConnectExReply');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_mt4_term_api_ConnectExReply(buffer_arg) {
  return mt4$term$api$connection_pb.ConnectExReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_mt4_term_api_ConnectExRequest(arg) {
  if (!(arg instanceof mt4$term$api$connection_pb.ConnectExRequest)) {
    throw new Error('Expected argument of type mt4_term_api.ConnectExRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_mt4_term_api_ConnectExRequest(buffer_arg) {
  return mt4$term$api$connection_pb.ConnectExRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_mt4_term_api_ConnectProxyReply(arg) {
  if (!(arg instanceof mt4$term$api$connection_pb.ConnectProxyReply)) {
    throw new Error('Expected argument of type mt4_term_api.ConnectProxyReply');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_mt4_term_api_ConnectProxyReply(buffer_arg) {
  return mt4$term$api$connection_pb.ConnectProxyReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_mt4_term_api_ConnectProxyRequest(arg) {
  if (!(arg instanceof mt4$term$api$connection_pb.ConnectProxyRequest)) {
    throw new Error('Expected argument of type mt4_term_api.ConnectProxyRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_mt4_term_api_ConnectProxyRequest(buffer_arg) {
  return mt4$term$api$connection_pb.ConnectProxyRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_mt4_term_api_ConnectReply(arg) {
  if (!(arg instanceof mt4$term$api$connection_pb.ConnectReply)) {
    throw new Error('Expected argument of type mt4_term_api.ConnectReply');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_mt4_term_api_ConnectReply(buffer_arg) {
  return mt4$term$api$connection_pb.ConnectReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_mt4_term_api_ConnectRequest(arg) {
  if (!(arg instanceof mt4$term$api$connection_pb.ConnectRequest)) {
    throw new Error('Expected argument of type mt4_term_api.ConnectRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_mt4_term_api_ConnectRequest(buffer_arg) {
  return mt4$term$api$connection_pb.ConnectRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_mt4_term_api_ConnectStateReply(arg) {
  if (!(arg instanceof mt4$term$api$connection_pb.ConnectStateReply)) {
    throw new Error('Expected argument of type mt4_term_api.ConnectStateReply');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_mt4_term_api_ConnectStateReply(buffer_arg) {
  return mt4$term$api$connection_pb.ConnectStateReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_mt4_term_api_ConnectStateRequest(arg) {
  if (!(arg instanceof mt4$term$api$connection_pb.ConnectStateRequest)) {
    throw new Error('Expected argument of type mt4_term_api.ConnectStateRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_mt4_term_api_ConnectStateRequest(buffer_arg) {
  return mt4$term$api$connection_pb.ConnectStateRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_mt4_term_api_ConnectStreamEvent(arg) {
  if (!(arg instanceof mt4$term$api$connection_pb.ConnectStreamEvent)) {
    throw new Error('Expected argument of type mt4_term_api.ConnectStreamEvent');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_mt4_term_api_ConnectStreamEvent(buffer_arg) {
  return mt4$term$api$connection_pb.ConnectStreamEvent.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_mt4_term_api_ConnectionStatusReply(arg) {
  if (!(arg instanceof mt4$term$api$connection_pb.ConnectionStatusReply)) {
    throw new Error('Expected argument of type mt4_term_api.ConnectionStatusReply');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_mt4_term_api_ConnectionStatusReply(buffer_arg) {
  return mt4$term$api$connection_pb.ConnectionStatusReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_mt4_term_api_ConnectionStatusRequest(arg) {
  if (!(arg instanceof mt4$term$api$connection_pb.ConnectionStatusRequest)) {
    throw new Error('Expected argument of type mt4_term_api.ConnectionStatusRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_mt4_term_api_ConnectionStatusRequest(buffer_arg) {
  return mt4$term$api$connection_pb.ConnectionStatusRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_mt4_term_api_DisconnectReply(arg) {
  if (!(arg instanceof mt4$term$api$connection_pb.DisconnectReply)) {
    throw new Error('Expected argument of type mt4_term_api.DisconnectReply');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_mt4_term_api_DisconnectReply(buffer_arg) {
  return mt4$term$api$connection_pb.DisconnectReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_mt4_term_api_DisconnectRequest(arg) {
  if (!(arg instanceof mt4$term$api$connection_pb.DisconnectRequest)) {
    throw new Error('Expected argument of type mt4_term_api.DisconnectRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_mt4_term_api_DisconnectRequest(buffer_arg) {
  return mt4$term$api$connection_pb.DisconnectRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_mt4_term_api_GetBrokerServersByBrokerNameReply(arg) {
  if (!(arg instanceof mt4$term$api$connection_pb.GetBrokerServersByBrokerNameReply)) {
    throw new Error('Expected argument of type mt4_term_api.GetBrokerServersByBrokerNameReply');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_mt4_term_api_GetBrokerServersByBrokerNameReply(buffer_arg) {
  return mt4$term$api$connection_pb.GetBrokerServersByBrokerNameReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_mt4_term_api_GetBrokerServersByBrokerNameRequest(arg) {
  if (!(arg instanceof mt4$term$api$connection_pb.GetBrokerServersByBrokerNameRequest)) {
    throw new Error('Expected argument of type mt4_term_api.GetBrokerServersByBrokerNameRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_mt4_term_api_GetBrokerServersByBrokerNameRequest(buffer_arg) {
  return mt4$term$api$connection_pb.GetBrokerServersByBrokerNameRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_mt4_term_api_GetIdReply(arg) {
  if (!(arg instanceof mt4$term$api$connection_pb.GetIdReply)) {
    throw new Error('Expected argument of type mt4_term_api.GetIdReply');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_mt4_term_api_GetIdReply(buffer_arg) {
  return mt4$term$api$connection_pb.GetIdReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_mt4_term_api_GetIdRequest(arg) {
  if (!(arg instanceof mt4$term$api$connection_pb.GetIdRequest)) {
    throw new Error('Expected argument of type mt4_term_api.GetIdRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_mt4_term_api_GetIdRequest(buffer_arg) {
  return mt4$term$api$connection_pb.GetIdRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_mt4_term_api_JournalReply(arg) {
  if (!(arg instanceof mt4$term$api$connection_pb.JournalReply)) {
    throw new Error('Expected argument of type mt4_term_api.JournalReply');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_mt4_term_api_JournalReply(buffer_arg) {
  return mt4$term$api$connection_pb.JournalReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_mt4_term_api_JournalRequest(arg) {
  if (!(arg instanceof mt4$term$api$connection_pb.JournalRequest)) {
    throw new Error('Expected argument of type mt4_term_api.JournalRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_mt4_term_api_JournalRequest(buffer_arg) {
  return mt4$term$api$connection_pb.JournalRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_mt4_term_api_OnConnectStateReply(arg) {
  if (!(arg instanceof mt4$term$api$connection_pb.OnConnectStateReply)) {
    throw new Error('Expected argument of type mt4_term_api.OnConnectStateReply');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_mt4_term_api_OnConnectStateReply(buffer_arg) {
  return mt4$term$api$connection_pb.OnConnectStateReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_mt4_term_api_OnConnectStateRequest(arg) {
  if (!(arg instanceof mt4$term$api$connection_pb.OnConnectStateRequest)) {
    throw new Error('Expected argument of type mt4_term_api.OnConnectStateRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_mt4_term_api_OnConnectStateRequest(buffer_arg) {
  return mt4$term$api$connection_pb.OnConnectStateRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_mt4_term_api_OnJournalReply(arg) {
  if (!(arg instanceof mt4$term$api$connection_pb.OnJournalReply)) {
    throw new Error('Expected argument of type mt4_term_api.OnJournalReply');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_mt4_term_api_OnJournalReply(buffer_arg) {
  return mt4$term$api$connection_pb.OnJournalReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_mt4_term_api_OnJournalRequest(arg) {
  if (!(arg instanceof mt4$term$api$connection_pb.OnJournalRequest)) {
    throw new Error('Expected argument of type mt4_term_api.OnJournalRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_mt4_term_api_OnJournalRequest(buffer_arg) {
  return mt4$term$api$connection_pb.OnJournalRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_mt4_term_api_ReconnectReply(arg) {
  if (!(arg instanceof mt4$term$api$connection_pb.ReconnectReply)) {
    throw new Error('Expected argument of type mt4_term_api.ReconnectReply');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_mt4_term_api_ReconnectReply(buffer_arg) {
  return mt4$term$api$connection_pb.ReconnectReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_mt4_term_api_ReconnectRequest(arg) {
  if (!(arg instanceof mt4$term$api$connection_pb.ReconnectRequest)) {
    throw new Error('Expected argument of type mt4_term_api.ReconnectRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_mt4_term_api_ReconnectRequest(buffer_arg) {
  return mt4$term$api$connection_pb.ReconnectRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_mt4_term_api_ScreenshotReply(arg) {
  if (!(arg instanceof mt4$term$api$connection_pb.ScreenshotReply)) {
    throw new Error('Expected argument of type mt4_term_api.ScreenshotReply');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_mt4_term_api_ScreenshotReply(buffer_arg) {
  return mt4$term$api$connection_pb.ScreenshotReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_mt4_term_api_ScreenshotRequest(arg) {
  if (!(arg instanceof mt4$term$api$connection_pb.ScreenshotRequest)) {
    throw new Error('Expected argument of type mt4_term_api.ScreenshotRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_mt4_term_api_ScreenshotRequest(buffer_arg) {
  return mt4$term$api$connection_pb.ScreenshotRequest.deserializeBinary(new Uint8Array(buffer_arg));
}


var ConnectionService = exports.ConnectionService = {
  // Creates terminal connection to the MT5 server by MT cluster name, waits for connection and returns Guid of it 
// [DefaultValues]
// {
//   "user": "1124213727",
//   "password": "1tjvjck",
//   "mtClusterName": "FreshForex-Demo"
// }  
connectEx: {
    path: '/mt4_term_api.Connection/ConnectEx',
    requestStream: false,
    responseStream: false,
    requestType: mt4$term$api$connection_pb.ConnectExRequest,
    responseType: mt4$term$api$connection_pb.ConnectExReply,
    requestSerialize: serialize_mt4_term_api_ConnectExRequest,
    requestDeserialize: deserialize_mt4_term_api_ConnectExRequest,
    responseSerialize: serialize_mt4_term_api_ConnectExReply,
    responseDeserialize: deserialize_mt4_term_api_ConnectExReply,
  },
  // Creates terminal connection to the MT4 server and returns Guid of it
// [DefaultValues]
// {
//   "user": "501401178",
//   "password": "v8gctta",
//   "host": "mt4-demo.roboforex.com",
//   "port": "443",
//   "baseChartSymbol": "EURUSD",  
//   "waitForTerminalIsAlive": "true"
// }
connect: {
    path: '/mt4_term_api.Connection/Connect',
    requestStream: false,
    responseStream: false,
    requestType: mt4$term$api$connection_pb.ConnectRequest,
    responseType: mt4$term$api$connection_pb.ConnectReply,
    requestSerialize: serialize_mt4_term_api_ConnectRequest,
    requestDeserialize: deserialize_mt4_term_api_ConnectRequest,
    responseSerialize: serialize_mt4_term_api_ConnectReply,
    responseDeserialize: deserialize_mt4_term_api_ConnectReply,
  },
  // Connect to account with user, password, host, port.
// [DefaultValues] 
// { 
//  "user": "500476959", 
//  "password": "ehj4bod", 
//  "host": "mt4-demo.roboforex.com", 
//  "port": "443",
//  "proxyUser": "ProxyUser123", 
//  "proxyPassword": "qwerty123", 
//  "proxyHost": "65.108.126.217", 
//  "proxyPort": "1080", 
//  "proxyType": "Socks5" 
// }
connectProxy: {
    path: '/mt4_term_api.Connection/ConnectProxy',
    requestStream: false,
    responseStream: false,
    requestType: mt4$term$api$connection_pb.ConnectProxyRequest,
    responseType: mt4$term$api$connection_pb.ConnectProxyReply,
    requestSerialize: serialize_mt4_term_api_ConnectProxyRequest,
    requestDeserialize: deserialize_mt4_term_api_ConnectProxyRequest,
    responseSerialize: serialize_mt4_term_api_ConnectProxyReply,
    responseDeserialize: deserialize_mt4_term_api_ConnectProxyReply,
  },
  // Checks if terminal connection to MT4 server is alive
checkConnect: {
    path: '/mt4_term_api.Connection/CheckConnect',
    requestStream: false,
    responseStream: false,
    requestType: mt4$term$api$connection_pb.CheckConnectRequest,
    responseType: mt4$term$api$connection_pb.CheckConnectReply,
    requestSerialize: serialize_mt4_term_api_CheckConnectRequest,
    requestDeserialize: deserialize_mt4_term_api_CheckConnectRequest,
    responseSerialize: serialize_mt4_term_api_CheckConnectReply,
    responseDeserialize: deserialize_mt4_term_api_CheckConnectReply,
  },
  // Returns detailed live connection state of this terminal instance
connectState: {
    path: '/mt4_term_api.Connection/ConnectState',
    requestStream: false,
    responseStream: false,
    requestType: mt4$term$api$connection_pb.ConnectStateRequest,
    responseType: mt4$term$api$connection_pb.ConnectStateReply,
    requestSerialize: serialize_mt4_term_api_ConnectStateRequest,
    requestDeserialize: deserialize_mt4_term_api_ConnectStateRequest,
    responseSerialize: serialize_mt4_term_api_ConnectStateReply,
    responseDeserialize: deserialize_mt4_term_api_ConnectStateReply,
  },
  // Streams real-time connection state changes for specified or visible terminals
onConnectState: {
    path: '/mt4_term_api.Connection/OnConnectState',
    requestStream: false,
    responseStream: true,
    requestType: mt4$term$api$connection_pb.OnConnectStateRequest,
    responseType: mt4$term$api$connection_pb.OnConnectStateReply,
    requestSerialize: serialize_mt4_term_api_OnConnectStateRequest,
    requestDeserialize: deserialize_mt4_term_api_OnConnectStateRequest,
    responseSerialize: serialize_mt4_term_api_OnConnectStateReply,
    responseDeserialize: deserialize_mt4_term_api_OnConnectStateReply,
  },
  // Deprecated alias for ConnectState
connectionStatus: {
    path: '/mt4_term_api.Connection/ConnectionStatus',
    requestStream: false,
    responseStream: false,
    requestType: mt4$term$api$connection_pb.ConnectionStatusRequest,
    responseType: mt4$term$api$connection_pb.ConnectionStatusReply,
    requestSerialize: serialize_mt4_term_api_ConnectionStatusRequest,
    requestDeserialize: deserialize_mt4_term_api_ConnectionStatusRequest,
    responseSerialize: serialize_mt4_term_api_ConnectionStatusReply,
    responseDeserialize: deserialize_mt4_term_api_ConnectionStatusReply,
  },
  // Close terminal connection to MT4 server
disconnect: {
    path: '/mt4_term_api.Connection/Disconnect',
    requestStream: false,
    responseStream: false,
    requestType: mt4$term$api$connection_pb.DisconnectRequest,
    responseType: mt4$term$api$connection_pb.DisconnectReply,
    requestSerialize: serialize_mt4_term_api_DisconnectRequest,
    requestDeserialize: deserialize_mt4_term_api_DisconnectRequest,
    responseSerialize: serialize_mt4_term_api_DisconnectReply,
    responseDeserialize: deserialize_mt4_term_api_DisconnectReply,
  },
  // If you need to recreate terminal instance with the same id
reconnect: {
    path: '/mt4_term_api.Connection/Reconnect',
    requestStream: false,
    responseStream: false,
    requestType: mt4$term$api$connection_pb.ReconnectRequest,
    responseType: mt4$term$api$connection_pb.ReconnectReply,
    requestSerialize: serialize_mt4_term_api_ReconnectRequest,
    requestDeserialize: deserialize_mt4_term_api_ReconnectRequest,
    responseSerialize: serialize_mt4_term_api_ReconnectReply,
    responseDeserialize: deserialize_mt4_term_api_ReconnectReply,
  },
  // Rebuild a terminal instance from a previously-saved token_details_mt4 row. The id header
// names the terminal to bring back; every credential (User/Password/Server or Host+Port,
// proxy settings, servers.dat bytes, PfxFile, HardwareId, Build) is read from the DB. Same
// reply as ConnectEx so callers do not need a separate result path.
connectByToken: {
    path: '/mt4_term_api.Connection/ConnectByToken',
    requestStream: false,
    responseStream: false,
    requestType: mt4$term$api$connection_pb.ConnectByTokenRequest,
    responseType: mt4$term$api$connection_pb.ConnectExReply,
    requestSerialize: serialize_mt4_term_api_ConnectByTokenRequest,
    requestDeserialize: deserialize_mt4_term_api_ConnectByTokenRequest,
    responseSerialize: serialize_mt4_term_api_ConnectExReply,
    responseDeserialize: deserialize_mt4_term_api_ConnectExReply,
  },
  getBrokerServersByBrokerName: {
    path: '/mt4_term_api.Connection/GetBrokerServersByBrokerName',
    requestStream: false,
    responseStream: false,
    requestType: mt4$term$api$connection_pb.GetBrokerServersByBrokerNameRequest,
    responseType: mt4$term$api$connection_pb.GetBrokerServersByBrokerNameReply,
    requestSerialize: serialize_mt4_term_api_GetBrokerServersByBrokerNameRequest,
    requestDeserialize: deserialize_mt4_term_api_GetBrokerServersByBrokerNameRequest,
    responseSerialize: serialize_mt4_term_api_GetBrokerServersByBrokerNameReply,
    responseDeserialize: deserialize_mt4_term_api_GetBrokerServersByBrokerNameReply,
  },
  // Generates a deterministic GUID from user and password.
// The same user/password combination always produces the same GUID.
// Use this GUID as the 'id' header for Connect and other endpoints.
// [DefaultValues]
// {
//   "user": "1124213727",
//   "password": "1tjvjck"
// }
getId: {
    path: '/mt4_term_api.Connection/GetId',
    requestStream: false,
    responseStream: false,
    requestType: mt4$term$api$connection_pb.GetIdRequest,
    responseType: mt4$term$api$connection_pb.GetIdReply,
    requestSerialize: serialize_mt4_term_api_GetIdRequest,
    requestDeserialize: deserialize_mt4_term_api_GetIdRequest,
    responseSerialize: serialize_mt4_term_api_GetIdReply,
    responseDeserialize: deserialize_mt4_term_api_GetIdReply,
  },
  // Captures a screenshot of the terminal instance window.
// Handled by Terminal Manager: the per-terminal in-process responder grabs the
// MT4 window and the manager returns the image. Requires 'id' header.
screenshot: {
    path: '/mt4_term_api.Connection/Screenshot',
    requestStream: false,
    responseStream: false,
    requestType: mt4$term$api$connection_pb.ScreenshotRequest,
    responseType: mt4$term$api$connection_pb.ScreenshotReply,
    requestSerialize: serialize_mt4_term_api_ScreenshotRequest,
    requestDeserialize: deserialize_mt4_term_api_ScreenshotRequest,
    responseSerialize: serialize_mt4_term_api_ScreenshotReply,
    responseDeserialize: deserialize_mt4_term_api_ScreenshotReply,
  },
  // Same as Connect but streams real-time progress events (incl. live Journal/
// Experts log lines) while the connection is established.
// Requires 'id' header — use GetId to generate.
// Swagger does not support streaming — use /connect-stream interactive viewer.
connectStream: {
    path: '/mt4_term_api.Connection/ConnectStream',
    requestStream: false,
    responseStream: true,
    requestType: mt4$term$api$connection_pb.ConnectRequest,
    responseType: mt4$term$api$connection_pb.ConnectStreamEvent,
    requestSerialize: serialize_mt4_term_api_ConnectRequest,
    requestDeserialize: deserialize_mt4_term_api_ConnectRequest,
    responseSerialize: serialize_mt4_term_api_ConnectStreamEvent,
    responseDeserialize: deserialize_mt4_term_api_ConnectStreamEvent,
  },
  // Same as ConnectEx but streams real-time progress events (incl. live Journal/
// Experts log lines) while the connection is established.
// Requires 'id' header — use GetId to generate.
// Swagger does not support streaming — use /connect-stream interactive viewer.
// [DefaultValues]
// {
//   "user": "1124213727",
//   "password": "1tjvjck",
//   "mtClusterName": "FreshForex-Demo"
// }
connectExStream: {
    path: '/mt4_term_api.Connection/ConnectExStream',
    requestStream: false,
    responseStream: true,
    requestType: mt4$term$api$connection_pb.ConnectExRequest,
    responseType: mt4$term$api$connection_pb.ConnectStreamEvent,
    requestSerialize: serialize_mt4_term_api_ConnectExRequest,
    requestDeserialize: deserialize_mt4_term_api_ConnectExRequest,
    responseSerialize: serialize_mt4_term_api_ConnectStreamEvent,
    responseDeserialize: deserialize_mt4_term_api_ConnectStreamEvent,
  },
};

exports.ConnectionClient = grpc.makeGenericClientConstructor(ConnectionService);
// Provides access to terminal log content (Journal and Experts tabs).
// Reads log entries directly from the MT4 terminal GUI.
// Requires 'id' header with the terminal connection GUID returned by Connect.
var LogsService = exports.LogsService = {
  // Returns log entries from the terminal Journal tab.
// The Journal tab contains system messages about terminal connection status,
// network activity, server synchronization and other internal events.
// Works regardless of which tab is currently active in the terminal UI.
journal: {
    path: '/mt4_term_api.Logs/Journal',
    requestStream: false,
    responseStream: false,
    requestType: mt4$term$api$connection_pb.JournalRequest,
    responseType: mt4$term$api$connection_pb.JournalReply,
    requestSerialize: serialize_mt4_term_api_JournalRequest,
    requestDeserialize: deserialize_mt4_term_api_JournalRequest,
    responseSerialize: serialize_mt4_term_api_JournalReply,
    responseDeserialize: deserialize_mt4_term_api_JournalReply,
  },
  // Streams log entries from the terminal Journal tab in real-time.
// Requires 'id' header with the terminal connection GUID returned by Connect.
onJournal: {
    path: '/mt4_term_api.Logs/OnJournal',
    requestStream: false,
    responseStream: true,
    requestType: mt4$term$api$connection_pb.OnJournalRequest,
    responseType: mt4$term$api$connection_pb.OnJournalReply,
    requestSerialize: serialize_mt4_term_api_OnJournalRequest,
    requestDeserialize: deserialize_mt4_term_api_OnJournalRequest,
    responseSerialize: serialize_mt4_term_api_OnJournalReply,
    responseDeserialize: deserialize_mt4_term_api_OnJournalReply,
  },
  // Returns log entries from the terminal Experts tab.
// The Experts tab contains messages from Expert Advisors (EAs), scripts and indicators
// including Print() output, initialization/deinitialization events and runtime errors.
// Works regardless of which tab is currently active in the terminal UI.
experts: {
    path: '/mt4_term_api.Logs/Experts',
    requestStream: false,
    responseStream: false,
    requestType: mt4$term$api$connection_pb.JournalRequest,
    responseType: mt4$term$api$connection_pb.JournalReply,
    requestSerialize: serialize_mt4_term_api_JournalRequest,
    requestDeserialize: deserialize_mt4_term_api_JournalRequest,
    responseSerialize: serialize_mt4_term_api_JournalReply,
    responseDeserialize: deserialize_mt4_term_api_JournalReply,
  },
  // Streams log entries from the terminal Experts tab in real-time.
// Requires 'id' header with the terminal connection GUID returned by Connect.
onExperts: {
    path: '/mt4_term_api.Logs/OnExperts',
    requestStream: false,
    responseStream: true,
    requestType: mt4$term$api$connection_pb.OnJournalRequest,
    responseType: mt4$term$api$connection_pb.OnJournalReply,
    requestSerialize: serialize_mt4_term_api_OnJournalRequest,
    requestDeserialize: deserialize_mt4_term_api_OnJournalRequest,
    responseSerialize: serialize_mt4_term_api_OnJournalReply,
    responseDeserialize: deserialize_mt4_term_api_OnJournalReply,
  },
};

exports.LogsClient = grpc.makeGenericClientConstructor(LogsService);
