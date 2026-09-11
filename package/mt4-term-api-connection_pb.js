// source: mt4-term-api-connection.proto
/**
 * @fileoverview
 * @enhanceable
 * @suppress {missingRequire} reports error on implicit type usages.
 * @suppress {messageConventions} JS Compiler reports an error if a variable or
 *     field starts with 'MSG_' and isn't a translatable message.
 * @public
 */
// GENERATED CODE -- DO NOT EDIT!
/* eslint-disable */
// @ts-nocheck

var jspb = require('google-protobuf');
var goog = jspb;
var global =
    (typeof globalThis !== 'undefined' && globalThis) ||
    (typeof window !== 'undefined' && window) ||
    (typeof global !== 'undefined' && global) ||
    (typeof self !== 'undefined' && self) ||
    (function () { return this; }).call(null) ||
    Function('return this')();

var google_api_annotations_pb = require('./google/api/annotations_pb.js');
goog.object.extend(proto, google_api_annotations_pb);
var google_protobuf_timestamp_pb = require('google-protobuf/google/protobuf/timestamp_pb.js');
goog.object.extend(proto, google_protobuf_timestamp_pb);
var mrpc$mt4$error_pb = require('./mrpc-mt4-error_pb.js');
goog.object.extend(proto, mrpc$mt4$error_pb);
goog.exportSymbol('proto.mt4_term_api.CheckConnectData', null, global);
goog.exportSymbol('proto.mt4_term_api.CheckConnectReply', null, global);
goog.exportSymbol('proto.mt4_term_api.CheckConnectReply.ResponseCase', null, global);
goog.exportSymbol('proto.mt4_term_api.CheckConnectRequest', null, global);
goog.exportSymbol('proto.mt4_term_api.ConnectByTokenRequest', null, global);
goog.exportSymbol('proto.mt4_term_api.ConnectData', null, global);
goog.exportSymbol('proto.mt4_term_api.ConnectExReply', null, global);
goog.exportSymbol('proto.mt4_term_api.ConnectExReply.ResponseCase', null, global);
goog.exportSymbol('proto.mt4_term_api.ConnectExRequest', null, global);
goog.exportSymbol('proto.mt4_term_api.ConnectProxyData', null, global);
goog.exportSymbol('proto.mt4_term_api.ConnectProxyReply', null, global);
goog.exportSymbol('proto.mt4_term_api.ConnectProxyReply.ResponseCase', null, global);
goog.exportSymbol('proto.mt4_term_api.ConnectProxyRequest', null, global);
goog.exportSymbol('proto.mt4_term_api.ConnectReply', null, global);
goog.exportSymbol('proto.mt4_term_api.ConnectReply.ResponseCase', null, global);
goog.exportSymbol('proto.mt4_term_api.ConnectRequest', null, global);
goog.exportSymbol('proto.mt4_term_api.ConnectStateData', null, global);
goog.exportSymbol('proto.mt4_term_api.ConnectStateReply', null, global);
goog.exportSymbol('proto.mt4_term_api.ConnectStateReply.ResponseCase', null, global);
goog.exportSymbol('proto.mt4_term_api.ConnectStateRequest', null, global);
goog.exportSymbol('proto.mt4_term_api.ConnectStreamEvent', null, global);
goog.exportSymbol('proto.mt4_term_api.ConnectionStatusData', null, global);
goog.exportSymbol('proto.mt4_term_api.ConnectionStatusReply', null, global);
goog.exportSymbol('proto.mt4_term_api.ConnectionStatusReply.ResponseCase', null, global);
goog.exportSymbol('proto.mt4_term_api.ConnectionStatusRequest', null, global);
goog.exportSymbol('proto.mt4_term_api.DisconnectData', null, global);
goog.exportSymbol('proto.mt4_term_api.DisconnectReply', null, global);
goog.exportSymbol('proto.mt4_term_api.DisconnectReply.ResponseCase', null, global);
goog.exportSymbol('proto.mt4_term_api.DisconnectRequest', null, global);
goog.exportSymbol('proto.mt4_term_api.ExpertAdviser', null, global);
goog.exportSymbol('proto.mt4_term_api.GetBrokerServersByBrokerNameData', null, global);
goog.exportSymbol('proto.mt4_term_api.GetBrokerServersByBrokerNameData.BrokerResult', null, global);
goog.exportSymbol('proto.mt4_term_api.GetBrokerServersByBrokerNameData.BrokerServer', null, global);
goog.exportSymbol('proto.mt4_term_api.GetBrokerServersByBrokerNameReply', null, global);
goog.exportSymbol('proto.mt4_term_api.GetBrokerServersByBrokerNameReply.ResponseCase', null, global);
goog.exportSymbol('proto.mt4_term_api.GetBrokerServersByBrokerNameRequest', null, global);
goog.exportSymbol('proto.mt4_term_api.GetIdData', null, global);
goog.exportSymbol('proto.mt4_term_api.GetIdReply', null, global);
goog.exportSymbol('proto.mt4_term_api.GetIdReply.ResponseCase', null, global);
goog.exportSymbol('proto.mt4_term_api.GetIdRequest', null, global);
goog.exportSymbol('proto.mt4_term_api.GetTerminalJournalData', null, global);
goog.exportSymbol('proto.mt4_term_api.JournalReply', null, global);
goog.exportSymbol('proto.mt4_term_api.JournalReply.ResponseCase', null, global);
goog.exportSymbol('proto.mt4_term_api.JournalRequest', null, global);
goog.exportSymbol('proto.mt4_term_api.OnConnectStateReply', null, global);
goog.exportSymbol('proto.mt4_term_api.OnConnectStateReply.ResponseCase', null, global);
goog.exportSymbol('proto.mt4_term_api.OnConnectStateRequest', null, global);
goog.exportSymbol('proto.mt4_term_api.OnJournalReply', null, global);
goog.exportSymbol('proto.mt4_term_api.OnJournalReply.ResponseCase', null, global);
goog.exportSymbol('proto.mt4_term_api.OnJournalRequest', null, global);
goog.exportSymbol('proto.mt4_term_api.ProxyTypes', null, global);
goog.exportSymbol('proto.mt4_term_api.ReconnectData', null, global);
goog.exportSymbol('proto.mt4_term_api.ReconnectReply', null, global);
goog.exportSymbol('proto.mt4_term_api.ReconnectReply.ResponseCase', null, global);
goog.exportSymbol('proto.mt4_term_api.ReconnectRequest', null, global);
goog.exportSymbol('proto.mt4_term_api.ScreenshotData', null, global);
goog.exportSymbol('proto.mt4_term_api.ScreenshotReply', null, global);
goog.exportSymbol('proto.mt4_term_api.ScreenshotReply.ResponseCase', null, global);
goog.exportSymbol('proto.mt4_term_api.ScreenshotRequest', null, global);
goog.exportSymbol('proto.mt4_term_api.TerminalHealthCheck', null, global);
goog.exportSymbol('proto.mt4_term_api.TerminalJournalRow', null, global);
goog.exportSymbol('proto.mt4_term_api.TerminalType', null, global);
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.mt4_term_api.ConnectStreamEvent = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.mt4_term_api.ConnectStreamEvent, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.mt4_term_api.ConnectStreamEvent.displayName = 'proto.mt4_term_api.ConnectStreamEvent';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.mt4_term_api.JournalRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.mt4_term_api.JournalRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.mt4_term_api.JournalRequest.displayName = 'proto.mt4_term_api.JournalRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.mt4_term_api.JournalReply = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, proto.mt4_term_api.JournalReply.oneofGroups_);
};
goog.inherits(proto.mt4_term_api.JournalReply, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.mt4_term_api.JournalReply.displayName = 'proto.mt4_term_api.JournalReply';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.mt4_term_api.OnJournalRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.mt4_term_api.OnJournalRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.mt4_term_api.OnJournalRequest.displayName = 'proto.mt4_term_api.OnJournalRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.mt4_term_api.OnJournalReply = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, proto.mt4_term_api.OnJournalReply.oneofGroups_);
};
goog.inherits(proto.mt4_term_api.OnJournalReply, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.mt4_term_api.OnJournalReply.displayName = 'proto.mt4_term_api.OnJournalReply';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.mt4_term_api.GetTerminalJournalData = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.mt4_term_api.GetTerminalJournalData.repeatedFields_, null);
};
goog.inherits(proto.mt4_term_api.GetTerminalJournalData, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.mt4_term_api.GetTerminalJournalData.displayName = 'proto.mt4_term_api.GetTerminalJournalData';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.mt4_term_api.TerminalJournalRow = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.mt4_term_api.TerminalJournalRow, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.mt4_term_api.TerminalJournalRow.displayName = 'proto.mt4_term_api.TerminalJournalRow';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.mt4_term_api.ScreenshotRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.mt4_term_api.ScreenshotRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.mt4_term_api.ScreenshotRequest.displayName = 'proto.mt4_term_api.ScreenshotRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.mt4_term_api.ScreenshotReply = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, proto.mt4_term_api.ScreenshotReply.oneofGroups_);
};
goog.inherits(proto.mt4_term_api.ScreenshotReply, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.mt4_term_api.ScreenshotReply.displayName = 'proto.mt4_term_api.ScreenshotReply';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.mt4_term_api.ScreenshotData = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.mt4_term_api.ScreenshotData, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.mt4_term_api.ScreenshotData.displayName = 'proto.mt4_term_api.ScreenshotData';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.mt4_term_api.GetBrokerServersByBrokerNameRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.mt4_term_api.GetBrokerServersByBrokerNameRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.mt4_term_api.GetBrokerServersByBrokerNameRequest.displayName = 'proto.mt4_term_api.GetBrokerServersByBrokerNameRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.mt4_term_api.GetBrokerServersByBrokerNameReply = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, proto.mt4_term_api.GetBrokerServersByBrokerNameReply.oneofGroups_);
};
goog.inherits(proto.mt4_term_api.GetBrokerServersByBrokerNameReply, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.mt4_term_api.GetBrokerServersByBrokerNameReply.displayName = 'proto.mt4_term_api.GetBrokerServersByBrokerNameReply';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.mt4_term_api.GetBrokerServersByBrokerNameData = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.mt4_term_api.GetBrokerServersByBrokerNameData.repeatedFields_, null);
};
goog.inherits(proto.mt4_term_api.GetBrokerServersByBrokerNameData, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.mt4_term_api.GetBrokerServersByBrokerNameData.displayName = 'proto.mt4_term_api.GetBrokerServersByBrokerNameData';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.mt4_term_api.GetBrokerServersByBrokerNameData.BrokerResult = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.mt4_term_api.GetBrokerServersByBrokerNameData.BrokerResult.repeatedFields_, null);
};
goog.inherits(proto.mt4_term_api.GetBrokerServersByBrokerNameData.BrokerResult, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.mt4_term_api.GetBrokerServersByBrokerNameData.BrokerResult.displayName = 'proto.mt4_term_api.GetBrokerServersByBrokerNameData.BrokerResult';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.mt4_term_api.GetBrokerServersByBrokerNameData.BrokerServer = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.mt4_term_api.GetBrokerServersByBrokerNameData.BrokerServer.repeatedFields_, null);
};
goog.inherits(proto.mt4_term_api.GetBrokerServersByBrokerNameData.BrokerServer, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.mt4_term_api.GetBrokerServersByBrokerNameData.BrokerServer.displayName = 'proto.mt4_term_api.GetBrokerServersByBrokerNameData.BrokerServer';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.mt4_term_api.ConnectExRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.mt4_term_api.ConnectExRequest.repeatedFields_, null);
};
goog.inherits(proto.mt4_term_api.ConnectExRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.mt4_term_api.ConnectExRequest.displayName = 'proto.mt4_term_api.ConnectExRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.mt4_term_api.ConnectByTokenRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.mt4_term_api.ConnectByTokenRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.mt4_term_api.ConnectByTokenRequest.displayName = 'proto.mt4_term_api.ConnectByTokenRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.mt4_term_api.ConnectExReply = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, proto.mt4_term_api.ConnectExReply.oneofGroups_);
};
goog.inherits(proto.mt4_term_api.ConnectExReply, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.mt4_term_api.ConnectExReply.displayName = 'proto.mt4_term_api.ConnectExReply';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.mt4_term_api.ReconnectRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.mt4_term_api.ReconnectRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.mt4_term_api.ReconnectRequest.displayName = 'proto.mt4_term_api.ReconnectRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.mt4_term_api.ReconnectReply = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, proto.mt4_term_api.ReconnectReply.oneofGroups_);
};
goog.inherits(proto.mt4_term_api.ReconnectReply, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.mt4_term_api.ReconnectReply.displayName = 'proto.mt4_term_api.ReconnectReply';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.mt4_term_api.ReconnectData = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.mt4_term_api.ReconnectData.repeatedFields_, null);
};
goog.inherits(proto.mt4_term_api.ReconnectData, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.mt4_term_api.ReconnectData.displayName = 'proto.mt4_term_api.ReconnectData';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.mt4_term_api.ConnectRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.mt4_term_api.ConnectRequest.repeatedFields_, null);
};
goog.inherits(proto.mt4_term_api.ConnectRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.mt4_term_api.ConnectRequest.displayName = 'proto.mt4_term_api.ConnectRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.mt4_term_api.ExpertAdviser = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.mt4_term_api.ExpertAdviser, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.mt4_term_api.ExpertAdviser.displayName = 'proto.mt4_term_api.ExpertAdviser';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.mt4_term_api.ConnectReply = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, proto.mt4_term_api.ConnectReply.oneofGroups_);
};
goog.inherits(proto.mt4_term_api.ConnectReply, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.mt4_term_api.ConnectReply.displayName = 'proto.mt4_term_api.ConnectReply';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.mt4_term_api.ConnectData = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.mt4_term_api.ConnectData, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.mt4_term_api.ConnectData.displayName = 'proto.mt4_term_api.ConnectData';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.mt4_term_api.ConnectProxyRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.mt4_term_api.ConnectProxyRequest.repeatedFields_, null);
};
goog.inherits(proto.mt4_term_api.ConnectProxyRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.mt4_term_api.ConnectProxyRequest.displayName = 'proto.mt4_term_api.ConnectProxyRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.mt4_term_api.ConnectProxyReply = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, proto.mt4_term_api.ConnectProxyReply.oneofGroups_);
};
goog.inherits(proto.mt4_term_api.ConnectProxyReply, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.mt4_term_api.ConnectProxyReply.displayName = 'proto.mt4_term_api.ConnectProxyReply';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.mt4_term_api.ConnectProxyData = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.mt4_term_api.ConnectProxyData, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.mt4_term_api.ConnectProxyData.displayName = 'proto.mt4_term_api.ConnectProxyData';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.mt4_term_api.CheckConnectRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.mt4_term_api.CheckConnectRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.mt4_term_api.CheckConnectRequest.displayName = 'proto.mt4_term_api.CheckConnectRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.mt4_term_api.CheckConnectReply = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, proto.mt4_term_api.CheckConnectReply.oneofGroups_);
};
goog.inherits(proto.mt4_term_api.CheckConnectReply, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.mt4_term_api.CheckConnectReply.displayName = 'proto.mt4_term_api.CheckConnectReply';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.mt4_term_api.CheckConnectData = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.mt4_term_api.CheckConnectData, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.mt4_term_api.CheckConnectData.displayName = 'proto.mt4_term_api.CheckConnectData';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.mt4_term_api.TerminalHealthCheck = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.mt4_term_api.TerminalHealthCheck, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.mt4_term_api.TerminalHealthCheck.displayName = 'proto.mt4_term_api.TerminalHealthCheck';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.mt4_term_api.DisconnectRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.mt4_term_api.DisconnectRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.mt4_term_api.DisconnectRequest.displayName = 'proto.mt4_term_api.DisconnectRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.mt4_term_api.DisconnectReply = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, proto.mt4_term_api.DisconnectReply.oneofGroups_);
};
goog.inherits(proto.mt4_term_api.DisconnectReply, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.mt4_term_api.DisconnectReply.displayName = 'proto.mt4_term_api.DisconnectReply';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.mt4_term_api.DisconnectData = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.mt4_term_api.DisconnectData, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.mt4_term_api.DisconnectData.displayName = 'proto.mt4_term_api.DisconnectData';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.mt4_term_api.GetIdRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.mt4_term_api.GetIdRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.mt4_term_api.GetIdRequest.displayName = 'proto.mt4_term_api.GetIdRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.mt4_term_api.GetIdReply = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, proto.mt4_term_api.GetIdReply.oneofGroups_);
};
goog.inherits(proto.mt4_term_api.GetIdReply, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.mt4_term_api.GetIdReply.displayName = 'proto.mt4_term_api.GetIdReply';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.mt4_term_api.GetIdData = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.mt4_term_api.GetIdData, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.mt4_term_api.GetIdData.displayName = 'proto.mt4_term_api.GetIdData';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.mt4_term_api.ConnectStateRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.mt4_term_api.ConnectStateRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.mt4_term_api.ConnectStateRequest.displayName = 'proto.mt4_term_api.ConnectStateRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.mt4_term_api.ConnectStateReply = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, proto.mt4_term_api.ConnectStateReply.oneofGroups_);
};
goog.inherits(proto.mt4_term_api.ConnectStateReply, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.mt4_term_api.ConnectStateReply.displayName = 'proto.mt4_term_api.ConnectStateReply';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.mt4_term_api.OnConnectStateRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.mt4_term_api.OnConnectStateRequest.repeatedFields_, null);
};
goog.inherits(proto.mt4_term_api.OnConnectStateRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.mt4_term_api.OnConnectStateRequest.displayName = 'proto.mt4_term_api.OnConnectStateRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.mt4_term_api.OnConnectStateReply = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, proto.mt4_term_api.OnConnectStateReply.oneofGroups_);
};
goog.inherits(proto.mt4_term_api.OnConnectStateReply, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.mt4_term_api.OnConnectStateReply.displayName = 'proto.mt4_term_api.OnConnectStateReply';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.mt4_term_api.ConnectStateData = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.mt4_term_api.ConnectStateData, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.mt4_term_api.ConnectStateData.displayName = 'proto.mt4_term_api.ConnectStateData';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.mt4_term_api.ConnectionStatusRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.mt4_term_api.ConnectionStatusRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.mt4_term_api.ConnectionStatusRequest.displayName = 'proto.mt4_term_api.ConnectionStatusRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.mt4_term_api.ConnectionStatusReply = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, proto.mt4_term_api.ConnectionStatusReply.oneofGroups_);
};
goog.inherits(proto.mt4_term_api.ConnectionStatusReply, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.mt4_term_api.ConnectionStatusReply.displayName = 'proto.mt4_term_api.ConnectionStatusReply';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.mt4_term_api.ConnectionStatusData = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.mt4_term_api.ConnectionStatusData, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.mt4_term_api.ConnectionStatusData.displayName = 'proto.mt4_term_api.ConnectionStatusData';
}



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.mt4_term_api.ConnectStreamEvent.prototype.toObject = function(opt_includeInstance) {
  return proto.mt4_term_api.ConnectStreamEvent.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.mt4_term_api.ConnectStreamEvent} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.mt4_term_api.ConnectStreamEvent.toObject = function(includeInstance, msg) {
  var f, obj = {
    step: jspb.Message.getFieldWithDefault(msg, 1, ""),
    message: jspb.Message.getFieldWithDefault(msg, 2, ""),
    level: jspb.Message.getFieldWithDefault(msg, 3, ""),
    elapsedMs: jspb.Message.getFieldWithDefault(msg, 4, 0),
    timestamp: (f = msg.getTimestamp()) && google_protobuf_timestamp_pb.Timestamp.toObject(includeInstance, f),
    isFinal: jspb.Message.getBooleanFieldWithDefault(msg, 6, false),
    connectData: (f = msg.getConnectData()) && proto.mt4_term_api.ConnectData.toObject(includeInstance, f),
    errorData: (f = msg.getErrorData()) && mrpc$mt4$error_pb.Error.toObject(includeInstance, f)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.mt4_term_api.ConnectStreamEvent}
 */
proto.mt4_term_api.ConnectStreamEvent.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.mt4_term_api.ConnectStreamEvent;
  return proto.mt4_term_api.ConnectStreamEvent.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.mt4_term_api.ConnectStreamEvent} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.mt4_term_api.ConnectStreamEvent}
 */
proto.mt4_term_api.ConnectStreamEvent.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setStep(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setMessage(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setLevel(value);
      break;
    case 4:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setElapsedMs(value);
      break;
    case 5:
      var value = new google_protobuf_timestamp_pb.Timestamp;
      reader.readMessage(value,google_protobuf_timestamp_pb.Timestamp.deserializeBinaryFromReader);
      msg.setTimestamp(value);
      break;
    case 6:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setIsFinal(value);
      break;
    case 7:
      var value = new proto.mt4_term_api.ConnectData;
      reader.readMessage(value,proto.mt4_term_api.ConnectData.deserializeBinaryFromReader);
      msg.setConnectData(value);
      break;
    case 8:
      var value = new mrpc$mt4$error_pb.Error;
      reader.readMessage(value,mrpc$mt4$error_pb.Error.deserializeBinaryFromReader);
      msg.setErrorData(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.mt4_term_api.ConnectStreamEvent.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.mt4_term_api.ConnectStreamEvent.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.mt4_term_api.ConnectStreamEvent} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.mt4_term_api.ConnectStreamEvent.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getStep();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getMessage();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getLevel();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
  f = message.getElapsedMs();
  if (f !== 0) {
    writer.writeInt64(
      4,
      f
    );
  }
  f = message.getTimestamp();
  if (f != null) {
    writer.writeMessage(
      5,
      f,
      google_protobuf_timestamp_pb.Timestamp.serializeBinaryToWriter
    );
  }
  f = message.getIsFinal();
  if (f) {
    writer.writeBool(
      6,
      f
    );
  }
  f = message.getConnectData();
  if (f != null) {
    writer.writeMessage(
      7,
      f,
      proto.mt4_term_api.ConnectData.serializeBinaryToWriter
    );
  }
  f = message.getErrorData();
  if (f != null) {
    writer.writeMessage(
      8,
      f,
      mrpc$mt4$error_pb.Error.serializeBinaryToWriter
    );
  }
};


/**
 * optional string step = 1;
 * @return {string}
 */
proto.mt4_term_api.ConnectStreamEvent.prototype.getStep = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.mt4_term_api.ConnectStreamEvent} returns this
 */
proto.mt4_term_api.ConnectStreamEvent.prototype.setStep = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string message = 2;
 * @return {string}
 */
proto.mt4_term_api.ConnectStreamEvent.prototype.getMessage = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.mt4_term_api.ConnectStreamEvent} returns this
 */
proto.mt4_term_api.ConnectStreamEvent.prototype.setMessage = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional string level = 3;
 * @return {string}
 */
proto.mt4_term_api.ConnectStreamEvent.prototype.getLevel = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.mt4_term_api.ConnectStreamEvent} returns this
 */
proto.mt4_term_api.ConnectStreamEvent.prototype.setLevel = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};


/**
 * optional int64 elapsed_ms = 4;
 * @return {number}
 */
proto.mt4_term_api.ConnectStreamEvent.prototype.getElapsedMs = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 4, 0));
};


/**
 * @param {number} value
 * @return {!proto.mt4_term_api.ConnectStreamEvent} returns this
 */
proto.mt4_term_api.ConnectStreamEvent.prototype.setElapsedMs = function(value) {
  return jspb.Message.setProto3IntField(this, 4, value);
};


/**
 * optional google.protobuf.Timestamp timestamp = 5;
 * @return {?proto.google.protobuf.Timestamp}
 */
proto.mt4_term_api.ConnectStreamEvent.prototype.getTimestamp = function() {
  return /** @type{?proto.google.protobuf.Timestamp} */ (
    jspb.Message.getWrapperField(this, google_protobuf_timestamp_pb.Timestamp, 5));
};


/**
 * @param {?proto.google.protobuf.Timestamp|undefined} value
 * @return {!proto.mt4_term_api.ConnectStreamEvent} returns this
*/
proto.mt4_term_api.ConnectStreamEvent.prototype.setTimestamp = function(value) {
  return jspb.Message.setWrapperField(this, 5, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.mt4_term_api.ConnectStreamEvent} returns this
 */
proto.mt4_term_api.ConnectStreamEvent.prototype.clearTimestamp = function() {
  return this.setTimestamp(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.mt4_term_api.ConnectStreamEvent.prototype.hasTimestamp = function() {
  return jspb.Message.getField(this, 5) != null;
};


/**
 * optional bool is_final = 6;
 * @return {boolean}
 */
proto.mt4_term_api.ConnectStreamEvent.prototype.getIsFinal = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 6, false));
};


/**
 * @param {boolean} value
 * @return {!proto.mt4_term_api.ConnectStreamEvent} returns this
 */
proto.mt4_term_api.ConnectStreamEvent.prototype.setIsFinal = function(value) {
  return jspb.Message.setProto3BooleanField(this, 6, value);
};


/**
 * optional ConnectData connect_data = 7;
 * @return {?proto.mt4_term_api.ConnectData}
 */
proto.mt4_term_api.ConnectStreamEvent.prototype.getConnectData = function() {
  return /** @type{?proto.mt4_term_api.ConnectData} */ (
    jspb.Message.getWrapperField(this, proto.mt4_term_api.ConnectData, 7));
};


/**
 * @param {?proto.mt4_term_api.ConnectData|undefined} value
 * @return {!proto.mt4_term_api.ConnectStreamEvent} returns this
*/
proto.mt4_term_api.ConnectStreamEvent.prototype.setConnectData = function(value) {
  return jspb.Message.setWrapperField(this, 7, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.mt4_term_api.ConnectStreamEvent} returns this
 */
proto.mt4_term_api.ConnectStreamEvent.prototype.clearConnectData = function() {
  return this.setConnectData(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.mt4_term_api.ConnectStreamEvent.prototype.hasConnectData = function() {
  return jspb.Message.getField(this, 7) != null;
};


/**
 * optional Error error_data = 8;
 * @return {?proto.mt4_term_api.Error}
 */
proto.mt4_term_api.ConnectStreamEvent.prototype.getErrorData = function() {
  return /** @type{?proto.mt4_term_api.Error} */ (
    jspb.Message.getWrapperField(this, mrpc$mt4$error_pb.Error, 8));
};


/**
 * @param {?proto.mt4_term_api.Error|undefined} value
 * @return {!proto.mt4_term_api.ConnectStreamEvent} returns this
*/
proto.mt4_term_api.ConnectStreamEvent.prototype.setErrorData = function(value) {
  return jspb.Message.setWrapperField(this, 8, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.mt4_term_api.ConnectStreamEvent} returns this
 */
proto.mt4_term_api.ConnectStreamEvent.prototype.clearErrorData = function() {
  return this.setErrorData(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.mt4_term_api.ConnectStreamEvent.prototype.hasErrorData = function() {
  return jspb.Message.getField(this, 8) != null;
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.mt4_term_api.JournalRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.mt4_term_api.JournalRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.mt4_term_api.JournalRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.mt4_term_api.JournalRequest.toObject = function(includeInstance, msg) {
  var f, obj = {

  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.mt4_term_api.JournalRequest}
 */
proto.mt4_term_api.JournalRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.mt4_term_api.JournalRequest;
  return proto.mt4_term_api.JournalRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.mt4_term_api.JournalRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.mt4_term_api.JournalRequest}
 */
proto.mt4_term_api.JournalRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.mt4_term_api.JournalRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.mt4_term_api.JournalRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.mt4_term_api.JournalRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.mt4_term_api.JournalRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
};



/**
 * Oneof group definitions for this message. Each group defines the field
 * numbers belonging to that group. When of these fields' value is set, all
 * other fields in the group are cleared. During deserialization, if multiple
 * fields are encountered for a group, only the last value seen will be kept.
 * @private {!Array<!Array<number>>}
 * @const
 */
proto.mt4_term_api.JournalReply.oneofGroups_ = [[1,2]];

/**
 * @enum {number}
 */
proto.mt4_term_api.JournalReply.ResponseCase = {
  RESPONSE_NOT_SET: 0,
  DATA: 1,
  ERROR: 2
};

/**
 * @return {proto.mt4_term_api.JournalReply.ResponseCase}
 */
proto.mt4_term_api.JournalReply.prototype.getResponseCase = function() {
  return /** @type {proto.mt4_term_api.JournalReply.ResponseCase} */(jspb.Message.computeOneofCase(this, proto.mt4_term_api.JournalReply.oneofGroups_[0]));
};



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.mt4_term_api.JournalReply.prototype.toObject = function(opt_includeInstance) {
  return proto.mt4_term_api.JournalReply.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.mt4_term_api.JournalReply} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.mt4_term_api.JournalReply.toObject = function(includeInstance, msg) {
  var f, obj = {
    data: (f = msg.getData()) && proto.mt4_term_api.GetTerminalJournalData.toObject(includeInstance, f),
    error: (f = msg.getError()) && mrpc$mt4$error_pb.Error.toObject(includeInstance, f)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.mt4_term_api.JournalReply}
 */
proto.mt4_term_api.JournalReply.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.mt4_term_api.JournalReply;
  return proto.mt4_term_api.JournalReply.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.mt4_term_api.JournalReply} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.mt4_term_api.JournalReply}
 */
proto.mt4_term_api.JournalReply.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.mt4_term_api.GetTerminalJournalData;
      reader.readMessage(value,proto.mt4_term_api.GetTerminalJournalData.deserializeBinaryFromReader);
      msg.setData(value);
      break;
    case 2:
      var value = new mrpc$mt4$error_pb.Error;
      reader.readMessage(value,mrpc$mt4$error_pb.Error.deserializeBinaryFromReader);
      msg.setError(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.mt4_term_api.JournalReply.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.mt4_term_api.JournalReply.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.mt4_term_api.JournalReply} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.mt4_term_api.JournalReply.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getData();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      proto.mt4_term_api.GetTerminalJournalData.serializeBinaryToWriter
    );
  }
  f = message.getError();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      mrpc$mt4$error_pb.Error.serializeBinaryToWriter
    );
  }
};


/**
 * optional GetTerminalJournalData data = 1;
 * @return {?proto.mt4_term_api.GetTerminalJournalData}
 */
proto.mt4_term_api.JournalReply.prototype.getData = function() {
  return /** @type{?proto.mt4_term_api.GetTerminalJournalData} */ (
    jspb.Message.getWrapperField(this, proto.mt4_term_api.GetTerminalJournalData, 1));
};


/**
 * @param {?proto.mt4_term_api.GetTerminalJournalData|undefined} value
 * @return {!proto.mt4_term_api.JournalReply} returns this
*/
proto.mt4_term_api.JournalReply.prototype.setData = function(value) {
  return jspb.Message.setOneofWrapperField(this, 1, proto.mt4_term_api.JournalReply.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.mt4_term_api.JournalReply} returns this
 */
proto.mt4_term_api.JournalReply.prototype.clearData = function() {
  return this.setData(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.mt4_term_api.JournalReply.prototype.hasData = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional Error error = 2;
 * @return {?proto.mt4_term_api.Error}
 */
proto.mt4_term_api.JournalReply.prototype.getError = function() {
  return /** @type{?proto.mt4_term_api.Error} */ (
    jspb.Message.getWrapperField(this, mrpc$mt4$error_pb.Error, 2));
};


/**
 * @param {?proto.mt4_term_api.Error|undefined} value
 * @return {!proto.mt4_term_api.JournalReply} returns this
*/
proto.mt4_term_api.JournalReply.prototype.setError = function(value) {
  return jspb.Message.setOneofWrapperField(this, 2, proto.mt4_term_api.JournalReply.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.mt4_term_api.JournalReply} returns this
 */
proto.mt4_term_api.JournalReply.prototype.clearError = function() {
  return this.setError(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.mt4_term_api.JournalReply.prototype.hasError = function() {
  return jspb.Message.getField(this, 2) != null;
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.mt4_term_api.OnJournalRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.mt4_term_api.OnJournalRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.mt4_term_api.OnJournalRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.mt4_term_api.OnJournalRequest.toObject = function(includeInstance, msg) {
  var f, obj = {

  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.mt4_term_api.OnJournalRequest}
 */
proto.mt4_term_api.OnJournalRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.mt4_term_api.OnJournalRequest;
  return proto.mt4_term_api.OnJournalRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.mt4_term_api.OnJournalRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.mt4_term_api.OnJournalRequest}
 */
proto.mt4_term_api.OnJournalRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.mt4_term_api.OnJournalRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.mt4_term_api.OnJournalRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.mt4_term_api.OnJournalRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.mt4_term_api.OnJournalRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
};



/**
 * Oneof group definitions for this message. Each group defines the field
 * numbers belonging to that group. When of these fields' value is set, all
 * other fields in the group are cleared. During deserialization, if multiple
 * fields are encountered for a group, only the last value seen will be kept.
 * @private {!Array<!Array<number>>}
 * @const
 */
proto.mt4_term_api.OnJournalReply.oneofGroups_ = [[1,2]];

/**
 * @enum {number}
 */
proto.mt4_term_api.OnJournalReply.ResponseCase = {
  RESPONSE_NOT_SET: 0,
  DATA: 1,
  ERROR: 2
};

/**
 * @return {proto.mt4_term_api.OnJournalReply.ResponseCase}
 */
proto.mt4_term_api.OnJournalReply.prototype.getResponseCase = function() {
  return /** @type {proto.mt4_term_api.OnJournalReply.ResponseCase} */(jspb.Message.computeOneofCase(this, proto.mt4_term_api.OnJournalReply.oneofGroups_[0]));
};



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.mt4_term_api.OnJournalReply.prototype.toObject = function(opt_includeInstance) {
  return proto.mt4_term_api.OnJournalReply.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.mt4_term_api.OnJournalReply} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.mt4_term_api.OnJournalReply.toObject = function(includeInstance, msg) {
  var f, obj = {
    data: (f = msg.getData()) && proto.mt4_term_api.GetTerminalJournalData.toObject(includeInstance, f),
    error: (f = msg.getError()) && mrpc$mt4$error_pb.Error.toObject(includeInstance, f)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.mt4_term_api.OnJournalReply}
 */
proto.mt4_term_api.OnJournalReply.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.mt4_term_api.OnJournalReply;
  return proto.mt4_term_api.OnJournalReply.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.mt4_term_api.OnJournalReply} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.mt4_term_api.OnJournalReply}
 */
proto.mt4_term_api.OnJournalReply.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.mt4_term_api.GetTerminalJournalData;
      reader.readMessage(value,proto.mt4_term_api.GetTerminalJournalData.deserializeBinaryFromReader);
      msg.setData(value);
      break;
    case 2:
      var value = new mrpc$mt4$error_pb.Error;
      reader.readMessage(value,mrpc$mt4$error_pb.Error.deserializeBinaryFromReader);
      msg.setError(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.mt4_term_api.OnJournalReply.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.mt4_term_api.OnJournalReply.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.mt4_term_api.OnJournalReply} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.mt4_term_api.OnJournalReply.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getData();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      proto.mt4_term_api.GetTerminalJournalData.serializeBinaryToWriter
    );
  }
  f = message.getError();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      mrpc$mt4$error_pb.Error.serializeBinaryToWriter
    );
  }
};


/**
 * optional GetTerminalJournalData data = 1;
 * @return {?proto.mt4_term_api.GetTerminalJournalData}
 */
proto.mt4_term_api.OnJournalReply.prototype.getData = function() {
  return /** @type{?proto.mt4_term_api.GetTerminalJournalData} */ (
    jspb.Message.getWrapperField(this, proto.mt4_term_api.GetTerminalJournalData, 1));
};


/**
 * @param {?proto.mt4_term_api.GetTerminalJournalData|undefined} value
 * @return {!proto.mt4_term_api.OnJournalReply} returns this
*/
proto.mt4_term_api.OnJournalReply.prototype.setData = function(value) {
  return jspb.Message.setOneofWrapperField(this, 1, proto.mt4_term_api.OnJournalReply.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.mt4_term_api.OnJournalReply} returns this
 */
proto.mt4_term_api.OnJournalReply.prototype.clearData = function() {
  return this.setData(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.mt4_term_api.OnJournalReply.prototype.hasData = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional Error error = 2;
 * @return {?proto.mt4_term_api.Error}
 */
proto.mt4_term_api.OnJournalReply.prototype.getError = function() {
  return /** @type{?proto.mt4_term_api.Error} */ (
    jspb.Message.getWrapperField(this, mrpc$mt4$error_pb.Error, 2));
};


/**
 * @param {?proto.mt4_term_api.Error|undefined} value
 * @return {!proto.mt4_term_api.OnJournalReply} returns this
*/
proto.mt4_term_api.OnJournalReply.prototype.setError = function(value) {
  return jspb.Message.setOneofWrapperField(this, 2, proto.mt4_term_api.OnJournalReply.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.mt4_term_api.OnJournalReply} returns this
 */
proto.mt4_term_api.OnJournalReply.prototype.clearError = function() {
  return this.setError(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.mt4_term_api.OnJournalReply.prototype.hasError = function() {
  return jspb.Message.getField(this, 2) != null;
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.mt4_term_api.GetTerminalJournalData.repeatedFields_ = [1];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.mt4_term_api.GetTerminalJournalData.prototype.toObject = function(opt_includeInstance) {
  return proto.mt4_term_api.GetTerminalJournalData.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.mt4_term_api.GetTerminalJournalData} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.mt4_term_api.GetTerminalJournalData.toObject = function(includeInstance, msg) {
  var f, obj = {
    rowsList: jspb.Message.toObjectList(msg.getRowsList(),
    proto.mt4_term_api.TerminalJournalRow.toObject, includeInstance)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.mt4_term_api.GetTerminalJournalData}
 */
proto.mt4_term_api.GetTerminalJournalData.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.mt4_term_api.GetTerminalJournalData;
  return proto.mt4_term_api.GetTerminalJournalData.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.mt4_term_api.GetTerminalJournalData} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.mt4_term_api.GetTerminalJournalData}
 */
proto.mt4_term_api.GetTerminalJournalData.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.mt4_term_api.TerminalJournalRow;
      reader.readMessage(value,proto.mt4_term_api.TerminalJournalRow.deserializeBinaryFromReader);
      msg.addRows(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.mt4_term_api.GetTerminalJournalData.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.mt4_term_api.GetTerminalJournalData.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.mt4_term_api.GetTerminalJournalData} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.mt4_term_api.GetTerminalJournalData.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getRowsList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      1,
      f,
      proto.mt4_term_api.TerminalJournalRow.serializeBinaryToWriter
    );
  }
};


/**
 * repeated TerminalJournalRow rows = 1;
 * @return {!Array<!proto.mt4_term_api.TerminalJournalRow>}
 */
proto.mt4_term_api.GetTerminalJournalData.prototype.getRowsList = function() {
  return /** @type{!Array<!proto.mt4_term_api.TerminalJournalRow>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.mt4_term_api.TerminalJournalRow, 1));
};


/**
 * @param {!Array<!proto.mt4_term_api.TerminalJournalRow>} value
 * @return {!proto.mt4_term_api.GetTerminalJournalData} returns this
*/
proto.mt4_term_api.GetTerminalJournalData.prototype.setRowsList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 1, value);
};


/**
 * @param {!proto.mt4_term_api.TerminalJournalRow=} opt_value
 * @param {number=} opt_index
 * @return {!proto.mt4_term_api.TerminalJournalRow}
 */
proto.mt4_term_api.GetTerminalJournalData.prototype.addRows = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 1, opt_value, proto.mt4_term_api.TerminalJournalRow, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.mt4_term_api.GetTerminalJournalData} returns this
 */
proto.mt4_term_api.GetTerminalJournalData.prototype.clearRowsList = function() {
  return this.setRowsList([]);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.mt4_term_api.TerminalJournalRow.prototype.toObject = function(opt_includeInstance) {
  return proto.mt4_term_api.TerminalJournalRow.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.mt4_term_api.TerminalJournalRow} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.mt4_term_api.TerminalJournalRow.toObject = function(includeInstance, msg) {
  var f, obj = {
    time: (f = msg.getTime()) && google_protobuf_timestamp_pb.Timestamp.toObject(includeInstance, f),
    source: jspb.Message.getFieldWithDefault(msg, 2, ""),
    message: jspb.Message.getFieldWithDefault(msg, 3, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.mt4_term_api.TerminalJournalRow}
 */
proto.mt4_term_api.TerminalJournalRow.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.mt4_term_api.TerminalJournalRow;
  return proto.mt4_term_api.TerminalJournalRow.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.mt4_term_api.TerminalJournalRow} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.mt4_term_api.TerminalJournalRow}
 */
proto.mt4_term_api.TerminalJournalRow.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new google_protobuf_timestamp_pb.Timestamp;
      reader.readMessage(value,google_protobuf_timestamp_pb.Timestamp.deserializeBinaryFromReader);
      msg.setTime(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setSource(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setMessage(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.mt4_term_api.TerminalJournalRow.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.mt4_term_api.TerminalJournalRow.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.mt4_term_api.TerminalJournalRow} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.mt4_term_api.TerminalJournalRow.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getTime();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      google_protobuf_timestamp_pb.Timestamp.serializeBinaryToWriter
    );
  }
  f = message.getSource();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getMessage();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
};


/**
 * optional google.protobuf.Timestamp time = 1;
 * @return {?proto.google.protobuf.Timestamp}
 */
proto.mt4_term_api.TerminalJournalRow.prototype.getTime = function() {
  return /** @type{?proto.google.protobuf.Timestamp} */ (
    jspb.Message.getWrapperField(this, google_protobuf_timestamp_pb.Timestamp, 1));
};


/**
 * @param {?proto.google.protobuf.Timestamp|undefined} value
 * @return {!proto.mt4_term_api.TerminalJournalRow} returns this
*/
proto.mt4_term_api.TerminalJournalRow.prototype.setTime = function(value) {
  return jspb.Message.setWrapperField(this, 1, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.mt4_term_api.TerminalJournalRow} returns this
 */
proto.mt4_term_api.TerminalJournalRow.prototype.clearTime = function() {
  return this.setTime(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.mt4_term_api.TerminalJournalRow.prototype.hasTime = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional string source = 2;
 * @return {string}
 */
proto.mt4_term_api.TerminalJournalRow.prototype.getSource = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.mt4_term_api.TerminalJournalRow} returns this
 */
proto.mt4_term_api.TerminalJournalRow.prototype.setSource = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional string message = 3;
 * @return {string}
 */
proto.mt4_term_api.TerminalJournalRow.prototype.getMessage = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.mt4_term_api.TerminalJournalRow} returns this
 */
proto.mt4_term_api.TerminalJournalRow.prototype.setMessage = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.mt4_term_api.ScreenshotRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.mt4_term_api.ScreenshotRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.mt4_term_api.ScreenshotRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.mt4_term_api.ScreenshotRequest.toObject = function(includeInstance, msg) {
  var f, obj = {

  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.mt4_term_api.ScreenshotRequest}
 */
proto.mt4_term_api.ScreenshotRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.mt4_term_api.ScreenshotRequest;
  return proto.mt4_term_api.ScreenshotRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.mt4_term_api.ScreenshotRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.mt4_term_api.ScreenshotRequest}
 */
proto.mt4_term_api.ScreenshotRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.mt4_term_api.ScreenshotRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.mt4_term_api.ScreenshotRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.mt4_term_api.ScreenshotRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.mt4_term_api.ScreenshotRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
};



/**
 * Oneof group definitions for this message. Each group defines the field
 * numbers belonging to that group. When of these fields' value is set, all
 * other fields in the group are cleared. During deserialization, if multiple
 * fields are encountered for a group, only the last value seen will be kept.
 * @private {!Array<!Array<number>>}
 * @const
 */
proto.mt4_term_api.ScreenshotReply.oneofGroups_ = [[1,2]];

/**
 * @enum {number}
 */
proto.mt4_term_api.ScreenshotReply.ResponseCase = {
  RESPONSE_NOT_SET: 0,
  DATA: 1,
  ERROR: 2
};

/**
 * @return {proto.mt4_term_api.ScreenshotReply.ResponseCase}
 */
proto.mt4_term_api.ScreenshotReply.prototype.getResponseCase = function() {
  return /** @type {proto.mt4_term_api.ScreenshotReply.ResponseCase} */(jspb.Message.computeOneofCase(this, proto.mt4_term_api.ScreenshotReply.oneofGroups_[0]));
};



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.mt4_term_api.ScreenshotReply.prototype.toObject = function(opt_includeInstance) {
  return proto.mt4_term_api.ScreenshotReply.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.mt4_term_api.ScreenshotReply} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.mt4_term_api.ScreenshotReply.toObject = function(includeInstance, msg) {
  var f, obj = {
    data: (f = msg.getData()) && proto.mt4_term_api.ScreenshotData.toObject(includeInstance, f),
    error: (f = msg.getError()) && mrpc$mt4$error_pb.Error.toObject(includeInstance, f)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.mt4_term_api.ScreenshotReply}
 */
proto.mt4_term_api.ScreenshotReply.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.mt4_term_api.ScreenshotReply;
  return proto.mt4_term_api.ScreenshotReply.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.mt4_term_api.ScreenshotReply} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.mt4_term_api.ScreenshotReply}
 */
proto.mt4_term_api.ScreenshotReply.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.mt4_term_api.ScreenshotData;
      reader.readMessage(value,proto.mt4_term_api.ScreenshotData.deserializeBinaryFromReader);
      msg.setData(value);
      break;
    case 2:
      var value = new mrpc$mt4$error_pb.Error;
      reader.readMessage(value,mrpc$mt4$error_pb.Error.deserializeBinaryFromReader);
      msg.setError(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.mt4_term_api.ScreenshotReply.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.mt4_term_api.ScreenshotReply.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.mt4_term_api.ScreenshotReply} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.mt4_term_api.ScreenshotReply.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getData();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      proto.mt4_term_api.ScreenshotData.serializeBinaryToWriter
    );
  }
  f = message.getError();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      mrpc$mt4$error_pb.Error.serializeBinaryToWriter
    );
  }
};


/**
 * optional ScreenshotData data = 1;
 * @return {?proto.mt4_term_api.ScreenshotData}
 */
proto.mt4_term_api.ScreenshotReply.prototype.getData = function() {
  return /** @type{?proto.mt4_term_api.ScreenshotData} */ (
    jspb.Message.getWrapperField(this, proto.mt4_term_api.ScreenshotData, 1));
};


/**
 * @param {?proto.mt4_term_api.ScreenshotData|undefined} value
 * @return {!proto.mt4_term_api.ScreenshotReply} returns this
*/
proto.mt4_term_api.ScreenshotReply.prototype.setData = function(value) {
  return jspb.Message.setOneofWrapperField(this, 1, proto.mt4_term_api.ScreenshotReply.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.mt4_term_api.ScreenshotReply} returns this
 */
proto.mt4_term_api.ScreenshotReply.prototype.clearData = function() {
  return this.setData(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.mt4_term_api.ScreenshotReply.prototype.hasData = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional Error error = 2;
 * @return {?proto.mt4_term_api.Error}
 */
proto.mt4_term_api.ScreenshotReply.prototype.getError = function() {
  return /** @type{?proto.mt4_term_api.Error} */ (
    jspb.Message.getWrapperField(this, mrpc$mt4$error_pb.Error, 2));
};


/**
 * @param {?proto.mt4_term_api.Error|undefined} value
 * @return {!proto.mt4_term_api.ScreenshotReply} returns this
*/
proto.mt4_term_api.ScreenshotReply.prototype.setError = function(value) {
  return jspb.Message.setOneofWrapperField(this, 2, proto.mt4_term_api.ScreenshotReply.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.mt4_term_api.ScreenshotReply} returns this
 */
proto.mt4_term_api.ScreenshotReply.prototype.clearError = function() {
  return this.setError(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.mt4_term_api.ScreenshotReply.prototype.hasError = function() {
  return jspb.Message.getField(this, 2) != null;
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.mt4_term_api.ScreenshotData.prototype.toObject = function(opt_includeInstance) {
  return proto.mt4_term_api.ScreenshotData.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.mt4_term_api.ScreenshotData} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.mt4_term_api.ScreenshotData.toObject = function(includeInstance, msg) {
  var f, obj = {
    imageData: msg.getImageData_asB64(),
    displayNumber: jspb.Message.getFieldWithDefault(msg, 2, 0),
    terminalId: jspb.Message.getFieldWithDefault(msg, 3, ""),
    contentType: jspb.Message.getFieldWithDefault(msg, 4, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.mt4_term_api.ScreenshotData}
 */
proto.mt4_term_api.ScreenshotData.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.mt4_term_api.ScreenshotData;
  return proto.mt4_term_api.ScreenshotData.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.mt4_term_api.ScreenshotData} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.mt4_term_api.ScreenshotData}
 */
proto.mt4_term_api.ScreenshotData.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setImageData(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setDisplayNumber(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setTerminalId(value);
      break;
    case 4:
      var value = /** @type {string} */ (reader.readString());
      msg.setContentType(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.mt4_term_api.ScreenshotData.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.mt4_term_api.ScreenshotData.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.mt4_term_api.ScreenshotData} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.mt4_term_api.ScreenshotData.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getImageData_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      1,
      f
    );
  }
  f = message.getDisplayNumber();
  if (f !== 0) {
    writer.writeInt32(
      2,
      f
    );
  }
  f = message.getTerminalId();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
  f = message.getContentType();
  if (f.length > 0) {
    writer.writeString(
      4,
      f
    );
  }
};


/**
 * optional bytes image_data = 1;
 * @return {!(string|Uint8Array)}
 */
proto.mt4_term_api.ScreenshotData.prototype.getImageData = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * optional bytes image_data = 1;
 * This is a type-conversion wrapper around `getImageData()`
 * @return {string}
 */
proto.mt4_term_api.ScreenshotData.prototype.getImageData_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getImageData()));
};


/**
 * optional bytes image_data = 1;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getImageData()`
 * @return {!Uint8Array}
 */
proto.mt4_term_api.ScreenshotData.prototype.getImageData_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getImageData()));
};


/**
 * @param {!(string|Uint8Array)} value
 * @return {!proto.mt4_term_api.ScreenshotData} returns this
 */
proto.mt4_term_api.ScreenshotData.prototype.setImageData = function(value) {
  return jspb.Message.setProto3BytesField(this, 1, value);
};


/**
 * optional int32 display_number = 2;
 * @return {number}
 */
proto.mt4_term_api.ScreenshotData.prototype.getDisplayNumber = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/**
 * @param {number} value
 * @return {!proto.mt4_term_api.ScreenshotData} returns this
 */
proto.mt4_term_api.ScreenshotData.prototype.setDisplayNumber = function(value) {
  return jspb.Message.setProto3IntField(this, 2, value);
};


/**
 * optional string terminal_id = 3;
 * @return {string}
 */
proto.mt4_term_api.ScreenshotData.prototype.getTerminalId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.mt4_term_api.ScreenshotData} returns this
 */
proto.mt4_term_api.ScreenshotData.prototype.setTerminalId = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};


/**
 * optional string content_type = 4;
 * @return {string}
 */
proto.mt4_term_api.ScreenshotData.prototype.getContentType = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 4, ""));
};


/**
 * @param {string} value
 * @return {!proto.mt4_term_api.ScreenshotData} returns this
 */
proto.mt4_term_api.ScreenshotData.prototype.setContentType = function(value) {
  return jspb.Message.setProto3StringField(this, 4, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.mt4_term_api.GetBrokerServersByBrokerNameRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.mt4_term_api.GetBrokerServersByBrokerNameRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.mt4_term_api.GetBrokerServersByBrokerNameRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.mt4_term_api.GetBrokerServersByBrokerNameRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    brokername: jspb.Message.getFieldWithDefault(msg, 1, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.mt4_term_api.GetBrokerServersByBrokerNameRequest}
 */
proto.mt4_term_api.GetBrokerServersByBrokerNameRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.mt4_term_api.GetBrokerServersByBrokerNameRequest;
  return proto.mt4_term_api.GetBrokerServersByBrokerNameRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.mt4_term_api.GetBrokerServersByBrokerNameRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.mt4_term_api.GetBrokerServersByBrokerNameRequest}
 */
proto.mt4_term_api.GetBrokerServersByBrokerNameRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setBrokername(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.mt4_term_api.GetBrokerServersByBrokerNameRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.mt4_term_api.GetBrokerServersByBrokerNameRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.mt4_term_api.GetBrokerServersByBrokerNameRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.mt4_term_api.GetBrokerServersByBrokerNameRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getBrokername();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
};


/**
 * optional string BrokerName = 1;
 * @return {string}
 */
proto.mt4_term_api.GetBrokerServersByBrokerNameRequest.prototype.getBrokername = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.mt4_term_api.GetBrokerServersByBrokerNameRequest} returns this
 */
proto.mt4_term_api.GetBrokerServersByBrokerNameRequest.prototype.setBrokername = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};



/**
 * Oneof group definitions for this message. Each group defines the field
 * numbers belonging to that group. When of these fields' value is set, all
 * other fields in the group are cleared. During deserialization, if multiple
 * fields are encountered for a group, only the last value seen will be kept.
 * @private {!Array<!Array<number>>}
 * @const
 */
proto.mt4_term_api.GetBrokerServersByBrokerNameReply.oneofGroups_ = [[1,2]];

/**
 * @enum {number}
 */
proto.mt4_term_api.GetBrokerServersByBrokerNameReply.ResponseCase = {
  RESPONSE_NOT_SET: 0,
  DATA: 1,
  ERROR: 2
};

/**
 * @return {proto.mt4_term_api.GetBrokerServersByBrokerNameReply.ResponseCase}
 */
proto.mt4_term_api.GetBrokerServersByBrokerNameReply.prototype.getResponseCase = function() {
  return /** @type {proto.mt4_term_api.GetBrokerServersByBrokerNameReply.ResponseCase} */(jspb.Message.computeOneofCase(this, proto.mt4_term_api.GetBrokerServersByBrokerNameReply.oneofGroups_[0]));
};



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.mt4_term_api.GetBrokerServersByBrokerNameReply.prototype.toObject = function(opt_includeInstance) {
  return proto.mt4_term_api.GetBrokerServersByBrokerNameReply.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.mt4_term_api.GetBrokerServersByBrokerNameReply} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.mt4_term_api.GetBrokerServersByBrokerNameReply.toObject = function(includeInstance, msg) {
  var f, obj = {
    data: (f = msg.getData()) && proto.mt4_term_api.GetBrokerServersByBrokerNameData.toObject(includeInstance, f),
    error: (f = msg.getError()) && mrpc$mt4$error_pb.Error.toObject(includeInstance, f)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.mt4_term_api.GetBrokerServersByBrokerNameReply}
 */
proto.mt4_term_api.GetBrokerServersByBrokerNameReply.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.mt4_term_api.GetBrokerServersByBrokerNameReply;
  return proto.mt4_term_api.GetBrokerServersByBrokerNameReply.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.mt4_term_api.GetBrokerServersByBrokerNameReply} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.mt4_term_api.GetBrokerServersByBrokerNameReply}
 */
proto.mt4_term_api.GetBrokerServersByBrokerNameReply.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.mt4_term_api.GetBrokerServersByBrokerNameData;
      reader.readMessage(value,proto.mt4_term_api.GetBrokerServersByBrokerNameData.deserializeBinaryFromReader);
      msg.setData(value);
      break;
    case 2:
      var value = new mrpc$mt4$error_pb.Error;
      reader.readMessage(value,mrpc$mt4$error_pb.Error.deserializeBinaryFromReader);
      msg.setError(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.mt4_term_api.GetBrokerServersByBrokerNameReply.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.mt4_term_api.GetBrokerServersByBrokerNameReply.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.mt4_term_api.GetBrokerServersByBrokerNameReply} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.mt4_term_api.GetBrokerServersByBrokerNameReply.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getData();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      proto.mt4_term_api.GetBrokerServersByBrokerNameData.serializeBinaryToWriter
    );
  }
  f = message.getError();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      mrpc$mt4$error_pb.Error.serializeBinaryToWriter
    );
  }
};


/**
 * optional GetBrokerServersByBrokerNameData data = 1;
 * @return {?proto.mt4_term_api.GetBrokerServersByBrokerNameData}
 */
proto.mt4_term_api.GetBrokerServersByBrokerNameReply.prototype.getData = function() {
  return /** @type{?proto.mt4_term_api.GetBrokerServersByBrokerNameData} */ (
    jspb.Message.getWrapperField(this, proto.mt4_term_api.GetBrokerServersByBrokerNameData, 1));
};


/**
 * @param {?proto.mt4_term_api.GetBrokerServersByBrokerNameData|undefined} value
 * @return {!proto.mt4_term_api.GetBrokerServersByBrokerNameReply} returns this
*/
proto.mt4_term_api.GetBrokerServersByBrokerNameReply.prototype.setData = function(value) {
  return jspb.Message.setOneofWrapperField(this, 1, proto.mt4_term_api.GetBrokerServersByBrokerNameReply.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.mt4_term_api.GetBrokerServersByBrokerNameReply} returns this
 */
proto.mt4_term_api.GetBrokerServersByBrokerNameReply.prototype.clearData = function() {
  return this.setData(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.mt4_term_api.GetBrokerServersByBrokerNameReply.prototype.hasData = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional Error error = 2;
 * @return {?proto.mt4_term_api.Error}
 */
proto.mt4_term_api.GetBrokerServersByBrokerNameReply.prototype.getError = function() {
  return /** @type{?proto.mt4_term_api.Error} */ (
    jspb.Message.getWrapperField(this, mrpc$mt4$error_pb.Error, 2));
};


/**
 * @param {?proto.mt4_term_api.Error|undefined} value
 * @return {!proto.mt4_term_api.GetBrokerServersByBrokerNameReply} returns this
*/
proto.mt4_term_api.GetBrokerServersByBrokerNameReply.prototype.setError = function(value) {
  return jspb.Message.setOneofWrapperField(this, 2, proto.mt4_term_api.GetBrokerServersByBrokerNameReply.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.mt4_term_api.GetBrokerServersByBrokerNameReply} returns this
 */
proto.mt4_term_api.GetBrokerServersByBrokerNameReply.prototype.clearError = function() {
  return this.setError(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.mt4_term_api.GetBrokerServersByBrokerNameReply.prototype.hasError = function() {
  return jspb.Message.getField(this, 2) != null;
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.mt4_term_api.GetBrokerServersByBrokerNameData.repeatedFields_ = [1];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.mt4_term_api.GetBrokerServersByBrokerNameData.prototype.toObject = function(opt_includeInstance) {
  return proto.mt4_term_api.GetBrokerServersByBrokerNameData.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.mt4_term_api.GetBrokerServersByBrokerNameData} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.mt4_term_api.GetBrokerServersByBrokerNameData.toObject = function(includeInstance, msg) {
  var f, obj = {
    resultList: jspb.Message.toObjectList(msg.getResultList(),
    proto.mt4_term_api.GetBrokerServersByBrokerNameData.BrokerResult.toObject, includeInstance)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.mt4_term_api.GetBrokerServersByBrokerNameData}
 */
proto.mt4_term_api.GetBrokerServersByBrokerNameData.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.mt4_term_api.GetBrokerServersByBrokerNameData;
  return proto.mt4_term_api.GetBrokerServersByBrokerNameData.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.mt4_term_api.GetBrokerServersByBrokerNameData} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.mt4_term_api.GetBrokerServersByBrokerNameData}
 */
proto.mt4_term_api.GetBrokerServersByBrokerNameData.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.mt4_term_api.GetBrokerServersByBrokerNameData.BrokerResult;
      reader.readMessage(value,proto.mt4_term_api.GetBrokerServersByBrokerNameData.BrokerResult.deserializeBinaryFromReader);
      msg.addResult(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.mt4_term_api.GetBrokerServersByBrokerNameData.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.mt4_term_api.GetBrokerServersByBrokerNameData.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.mt4_term_api.GetBrokerServersByBrokerNameData} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.mt4_term_api.GetBrokerServersByBrokerNameData.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getResultList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      1,
      f,
      proto.mt4_term_api.GetBrokerServersByBrokerNameData.BrokerResult.serializeBinaryToWriter
    );
  }
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.mt4_term_api.GetBrokerServersByBrokerNameData.BrokerResult.repeatedFields_ = [2];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.mt4_term_api.GetBrokerServersByBrokerNameData.BrokerResult.prototype.toObject = function(opt_includeInstance) {
  return proto.mt4_term_api.GetBrokerServersByBrokerNameData.BrokerResult.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.mt4_term_api.GetBrokerServersByBrokerNameData.BrokerResult} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.mt4_term_api.GetBrokerServersByBrokerNameData.BrokerResult.toObject = function(includeInstance, msg) {
  var f, obj = {
    company: jspb.Message.getFieldWithDefault(msg, 1, ""),
    resultsList: jspb.Message.toObjectList(msg.getResultsList(),
    proto.mt4_term_api.GetBrokerServersByBrokerNameData.BrokerServer.toObject, includeInstance)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.mt4_term_api.GetBrokerServersByBrokerNameData.BrokerResult}
 */
proto.mt4_term_api.GetBrokerServersByBrokerNameData.BrokerResult.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.mt4_term_api.GetBrokerServersByBrokerNameData.BrokerResult;
  return proto.mt4_term_api.GetBrokerServersByBrokerNameData.BrokerResult.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.mt4_term_api.GetBrokerServersByBrokerNameData.BrokerResult} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.mt4_term_api.GetBrokerServersByBrokerNameData.BrokerResult}
 */
proto.mt4_term_api.GetBrokerServersByBrokerNameData.BrokerResult.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setCompany(value);
      break;
    case 2:
      var value = new proto.mt4_term_api.GetBrokerServersByBrokerNameData.BrokerServer;
      reader.readMessage(value,proto.mt4_term_api.GetBrokerServersByBrokerNameData.BrokerServer.deserializeBinaryFromReader);
      msg.addResults(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.mt4_term_api.GetBrokerServersByBrokerNameData.BrokerResult.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.mt4_term_api.GetBrokerServersByBrokerNameData.BrokerResult.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.mt4_term_api.GetBrokerServersByBrokerNameData.BrokerResult} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.mt4_term_api.GetBrokerServersByBrokerNameData.BrokerResult.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getCompany();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getResultsList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      2,
      f,
      proto.mt4_term_api.GetBrokerServersByBrokerNameData.BrokerServer.serializeBinaryToWriter
    );
  }
};


/**
 * optional string company = 1;
 * @return {string}
 */
proto.mt4_term_api.GetBrokerServersByBrokerNameData.BrokerResult.prototype.getCompany = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.mt4_term_api.GetBrokerServersByBrokerNameData.BrokerResult} returns this
 */
proto.mt4_term_api.GetBrokerServersByBrokerNameData.BrokerResult.prototype.setCompany = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * repeated BrokerServer results = 2;
 * @return {!Array<!proto.mt4_term_api.GetBrokerServersByBrokerNameData.BrokerServer>}
 */
proto.mt4_term_api.GetBrokerServersByBrokerNameData.BrokerResult.prototype.getResultsList = function() {
  return /** @type{!Array<!proto.mt4_term_api.GetBrokerServersByBrokerNameData.BrokerServer>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.mt4_term_api.GetBrokerServersByBrokerNameData.BrokerServer, 2));
};


/**
 * @param {!Array<!proto.mt4_term_api.GetBrokerServersByBrokerNameData.BrokerServer>} value
 * @return {!proto.mt4_term_api.GetBrokerServersByBrokerNameData.BrokerResult} returns this
*/
proto.mt4_term_api.GetBrokerServersByBrokerNameData.BrokerResult.prototype.setResultsList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 2, value);
};


/**
 * @param {!proto.mt4_term_api.GetBrokerServersByBrokerNameData.BrokerServer=} opt_value
 * @param {number=} opt_index
 * @return {!proto.mt4_term_api.GetBrokerServersByBrokerNameData.BrokerServer}
 */
proto.mt4_term_api.GetBrokerServersByBrokerNameData.BrokerResult.prototype.addResults = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 2, opt_value, proto.mt4_term_api.GetBrokerServersByBrokerNameData.BrokerServer, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.mt4_term_api.GetBrokerServersByBrokerNameData.BrokerResult} returns this
 */
proto.mt4_term_api.GetBrokerServersByBrokerNameData.BrokerResult.prototype.clearResultsList = function() {
  return this.setResultsList([]);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.mt4_term_api.GetBrokerServersByBrokerNameData.BrokerServer.repeatedFields_ = [4];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.mt4_term_api.GetBrokerServersByBrokerNameData.BrokerServer.prototype.toObject = function(opt_includeInstance) {
  return proto.mt4_term_api.GetBrokerServersByBrokerNameData.BrokerServer.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.mt4_term_api.GetBrokerServersByBrokerNameData.BrokerServer} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.mt4_term_api.GetBrokerServersByBrokerNameData.BrokerServer.toObject = function(includeInstance, msg) {
  var f, obj = {
    name: jspb.Message.getFieldWithDefault(msg, 1, ""),
    logoUrl: jspb.Message.getFieldWithDefault(msg, 2, ""),
    site: jspb.Message.getFieldWithDefault(msg, 3, ""),
    accessList: (f = jspb.Message.getRepeatedField(msg, 4)) == null ? undefined : f
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.mt4_term_api.GetBrokerServersByBrokerNameData.BrokerServer}
 */
proto.mt4_term_api.GetBrokerServersByBrokerNameData.BrokerServer.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.mt4_term_api.GetBrokerServersByBrokerNameData.BrokerServer;
  return proto.mt4_term_api.GetBrokerServersByBrokerNameData.BrokerServer.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.mt4_term_api.GetBrokerServersByBrokerNameData.BrokerServer} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.mt4_term_api.GetBrokerServersByBrokerNameData.BrokerServer}
 */
proto.mt4_term_api.GetBrokerServersByBrokerNameData.BrokerServer.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setName(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setLogoUrl(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setSite(value);
      break;
    case 4:
      var value = /** @type {string} */ (reader.readString());
      msg.addAccess(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.mt4_term_api.GetBrokerServersByBrokerNameData.BrokerServer.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.mt4_term_api.GetBrokerServersByBrokerNameData.BrokerServer.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.mt4_term_api.GetBrokerServersByBrokerNameData.BrokerServer} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.mt4_term_api.GetBrokerServersByBrokerNameData.BrokerServer.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getName();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = /** @type {string} */ (jspb.Message.getField(message, 2));
  if (f != null) {
    writer.writeString(
      2,
      f
    );
  }
  f = /** @type {string} */ (jspb.Message.getField(message, 3));
  if (f != null) {
    writer.writeString(
      3,
      f
    );
  }
  f = message.getAccessList();
  if (f.length > 0) {
    writer.writeRepeatedString(
      4,
      f
    );
  }
};


/**
 * optional string name = 1;
 * @return {string}
 */
proto.mt4_term_api.GetBrokerServersByBrokerNameData.BrokerServer.prototype.getName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.mt4_term_api.GetBrokerServersByBrokerNameData.BrokerServer} returns this
 */
proto.mt4_term_api.GetBrokerServersByBrokerNameData.BrokerServer.prototype.setName = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string logo_url = 2;
 * @return {string}
 */
proto.mt4_term_api.GetBrokerServersByBrokerNameData.BrokerServer.prototype.getLogoUrl = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.mt4_term_api.GetBrokerServersByBrokerNameData.BrokerServer} returns this
 */
proto.mt4_term_api.GetBrokerServersByBrokerNameData.BrokerServer.prototype.setLogoUrl = function(value) {
  return jspb.Message.setField(this, 2, value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.mt4_term_api.GetBrokerServersByBrokerNameData.BrokerServer} returns this
 */
proto.mt4_term_api.GetBrokerServersByBrokerNameData.BrokerServer.prototype.clearLogoUrl = function() {
  return jspb.Message.setField(this, 2, undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.mt4_term_api.GetBrokerServersByBrokerNameData.BrokerServer.prototype.hasLogoUrl = function() {
  return jspb.Message.getField(this, 2) != null;
};


/**
 * optional string site = 3;
 * @return {string}
 */
proto.mt4_term_api.GetBrokerServersByBrokerNameData.BrokerServer.prototype.getSite = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.mt4_term_api.GetBrokerServersByBrokerNameData.BrokerServer} returns this
 */
proto.mt4_term_api.GetBrokerServersByBrokerNameData.BrokerServer.prototype.setSite = function(value) {
  return jspb.Message.setField(this, 3, value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.mt4_term_api.GetBrokerServersByBrokerNameData.BrokerServer} returns this
 */
proto.mt4_term_api.GetBrokerServersByBrokerNameData.BrokerServer.prototype.clearSite = function() {
  return jspb.Message.setField(this, 3, undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.mt4_term_api.GetBrokerServersByBrokerNameData.BrokerServer.prototype.hasSite = function() {
  return jspb.Message.getField(this, 3) != null;
};


/**
 * repeated string access = 4;
 * @return {!Array<string>}
 */
proto.mt4_term_api.GetBrokerServersByBrokerNameData.BrokerServer.prototype.getAccessList = function() {
  return /** @type {!Array<string>} */ (jspb.Message.getRepeatedField(this, 4));
};


/**
 * @param {!Array<string>} value
 * @return {!proto.mt4_term_api.GetBrokerServersByBrokerNameData.BrokerServer} returns this
 */
proto.mt4_term_api.GetBrokerServersByBrokerNameData.BrokerServer.prototype.setAccessList = function(value) {
  return jspb.Message.setField(this, 4, value || []);
};


/**
 * @param {string} value
 * @param {number=} opt_index
 * @return {!proto.mt4_term_api.GetBrokerServersByBrokerNameData.BrokerServer} returns this
 */
proto.mt4_term_api.GetBrokerServersByBrokerNameData.BrokerServer.prototype.addAccess = function(value, opt_index) {
  return jspb.Message.addToRepeatedField(this, 4, value, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.mt4_term_api.GetBrokerServersByBrokerNameData.BrokerServer} returns this
 */
proto.mt4_term_api.GetBrokerServersByBrokerNameData.BrokerServer.prototype.clearAccessList = function() {
  return this.setAccessList([]);
};


/**
 * repeated BrokerResult result = 1;
 * @return {!Array<!proto.mt4_term_api.GetBrokerServersByBrokerNameData.BrokerResult>}
 */
proto.mt4_term_api.GetBrokerServersByBrokerNameData.prototype.getResultList = function() {
  return /** @type{!Array<!proto.mt4_term_api.GetBrokerServersByBrokerNameData.BrokerResult>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.mt4_term_api.GetBrokerServersByBrokerNameData.BrokerResult, 1));
};


/**
 * @param {!Array<!proto.mt4_term_api.GetBrokerServersByBrokerNameData.BrokerResult>} value
 * @return {!proto.mt4_term_api.GetBrokerServersByBrokerNameData} returns this
*/
proto.mt4_term_api.GetBrokerServersByBrokerNameData.prototype.setResultList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 1, value);
};


/**
 * @param {!proto.mt4_term_api.GetBrokerServersByBrokerNameData.BrokerResult=} opt_value
 * @param {number=} opt_index
 * @return {!proto.mt4_term_api.GetBrokerServersByBrokerNameData.BrokerResult}
 */
proto.mt4_term_api.GetBrokerServersByBrokerNameData.prototype.addResult = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 1, opt_value, proto.mt4_term_api.GetBrokerServersByBrokerNameData.BrokerResult, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.mt4_term_api.GetBrokerServersByBrokerNameData} returns this
 */
proto.mt4_term_api.GetBrokerServersByBrokerNameData.prototype.clearResultList = function() {
  return this.setResultList([]);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.mt4_term_api.ConnectExRequest.repeatedFields_ = [5];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.mt4_term_api.ConnectExRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.mt4_term_api.ConnectExRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.mt4_term_api.ConnectExRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.mt4_term_api.ConnectExRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    user: jspb.Message.getFieldWithDefault(msg, 1, 0),
    password: jspb.Message.getFieldWithDefault(msg, 2, ""),
    mtClusterName: jspb.Message.getFieldWithDefault(msg, 3, ""),
    expertsToAddList: jspb.Message.toObjectList(msg.getExpertsToAddList(),
    proto.mt4_term_api.ExpertAdviser.toObject, includeInstance),
    timeoutSeconds: jspb.Message.getFieldWithDefault(msg, 6, 0),
    name: jspb.Message.getFieldWithDefault(msg, 7, ""),
    expiration: jspb.Message.getFieldWithDefault(msg, 8, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.mt4_term_api.ConnectExRequest}
 */
proto.mt4_term_api.ConnectExRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.mt4_term_api.ConnectExRequest;
  return proto.mt4_term_api.ConnectExRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.mt4_term_api.ConnectExRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.mt4_term_api.ConnectExRequest}
 */
proto.mt4_term_api.ConnectExRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readUint64());
      msg.setUser(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setPassword(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setMtClusterName(value);
      break;
    case 5:
      var value = new proto.mt4_term_api.ExpertAdviser;
      reader.readMessage(value,proto.mt4_term_api.ExpertAdviser.deserializeBinaryFromReader);
      msg.addExpertsToAdd(value);
      break;
    case 6:
      var value = /** @type {number} */ (reader.readUint32());
      msg.setTimeoutSeconds(value);
      break;
    case 7:
      var value = /** @type {string} */ (reader.readString());
      msg.setName(value);
      break;
    case 8:
      var value = /** @type {number} */ (reader.readUint32());
      msg.setExpiration(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.mt4_term_api.ConnectExRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.mt4_term_api.ConnectExRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.mt4_term_api.ConnectExRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.mt4_term_api.ConnectExRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getUser();
  if (f !== 0) {
    writer.writeUint64(
      1,
      f
    );
  }
  f = message.getPassword();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getMtClusterName();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
  f = message.getExpertsToAddList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      5,
      f,
      proto.mt4_term_api.ExpertAdviser.serializeBinaryToWriter
    );
  }
  f = /** @type {number} */ (jspb.Message.getField(message, 6));
  if (f != null) {
    writer.writeUint32(
      6,
      f
    );
  }
  f = /** @type {string} */ (jspb.Message.getField(message, 7));
  if (f != null) {
    writer.writeString(
      7,
      f
    );
  }
  f = /** @type {number} */ (jspb.Message.getField(message, 8));
  if (f != null) {
    writer.writeUint32(
      8,
      f
    );
  }
};


/**
 * optional uint64 user = 1;
 * @return {number}
 */
proto.mt4_term_api.ConnectExRequest.prototype.getUser = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.mt4_term_api.ConnectExRequest} returns this
 */
proto.mt4_term_api.ConnectExRequest.prototype.setUser = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};


/**
 * optional string password = 2;
 * @return {string}
 */
proto.mt4_term_api.ConnectExRequest.prototype.getPassword = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.mt4_term_api.ConnectExRequest} returns this
 */
proto.mt4_term_api.ConnectExRequest.prototype.setPassword = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional string mt_cluster_name = 3;
 * @return {string}
 */
proto.mt4_term_api.ConnectExRequest.prototype.getMtClusterName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.mt4_term_api.ConnectExRequest} returns this
 */
proto.mt4_term_api.ConnectExRequest.prototype.setMtClusterName = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};


/**
 * repeated ExpertAdviser experts_to_add = 5;
 * @return {!Array<!proto.mt4_term_api.ExpertAdviser>}
 */
proto.mt4_term_api.ConnectExRequest.prototype.getExpertsToAddList = function() {
  return /** @type{!Array<!proto.mt4_term_api.ExpertAdviser>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.mt4_term_api.ExpertAdviser, 5));
};


/**
 * @param {!Array<!proto.mt4_term_api.ExpertAdviser>} value
 * @return {!proto.mt4_term_api.ConnectExRequest} returns this
*/
proto.mt4_term_api.ConnectExRequest.prototype.setExpertsToAddList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 5, value);
};


/**
 * @param {!proto.mt4_term_api.ExpertAdviser=} opt_value
 * @param {number=} opt_index
 * @return {!proto.mt4_term_api.ExpertAdviser}
 */
proto.mt4_term_api.ConnectExRequest.prototype.addExpertsToAdd = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 5, opt_value, proto.mt4_term_api.ExpertAdviser, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.mt4_term_api.ConnectExRequest} returns this
 */
proto.mt4_term_api.ConnectExRequest.prototype.clearExpertsToAddList = function() {
  return this.setExpertsToAddList([]);
};


/**
 * optional uint32 timeout_seconds = 6;
 * @return {number}
 */
proto.mt4_term_api.ConnectExRequest.prototype.getTimeoutSeconds = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 6, 0));
};


/**
 * @param {number} value
 * @return {!proto.mt4_term_api.ConnectExRequest} returns this
 */
proto.mt4_term_api.ConnectExRequest.prototype.setTimeoutSeconds = function(value) {
  return jspb.Message.setField(this, 6, value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.mt4_term_api.ConnectExRequest} returns this
 */
proto.mt4_term_api.ConnectExRequest.prototype.clearTimeoutSeconds = function() {
  return jspb.Message.setField(this, 6, undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.mt4_term_api.ConnectExRequest.prototype.hasTimeoutSeconds = function() {
  return jspb.Message.getField(this, 6) != null;
};


/**
 * optional string name = 7;
 * @return {string}
 */
proto.mt4_term_api.ConnectExRequest.prototype.getName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 7, ""));
};


/**
 * @param {string} value
 * @return {!proto.mt4_term_api.ConnectExRequest} returns this
 */
proto.mt4_term_api.ConnectExRequest.prototype.setName = function(value) {
  return jspb.Message.setField(this, 7, value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.mt4_term_api.ConnectExRequest} returns this
 */
proto.mt4_term_api.ConnectExRequest.prototype.clearName = function() {
  return jspb.Message.setField(this, 7, undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.mt4_term_api.ConnectExRequest.prototype.hasName = function() {
  return jspb.Message.getField(this, 7) != null;
};


/**
 * optional uint32 expiration = 8;
 * @return {number}
 */
proto.mt4_term_api.ConnectExRequest.prototype.getExpiration = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 8, 0));
};


/**
 * @param {number} value
 * @return {!proto.mt4_term_api.ConnectExRequest} returns this
 */
proto.mt4_term_api.ConnectExRequest.prototype.setExpiration = function(value) {
  return jspb.Message.setField(this, 8, value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.mt4_term_api.ConnectExRequest} returns this
 */
proto.mt4_term_api.ConnectExRequest.prototype.clearExpiration = function() {
  return jspb.Message.setField(this, 8, undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.mt4_term_api.ConnectExRequest.prototype.hasExpiration = function() {
  return jspb.Message.getField(this, 8) != null;
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.mt4_term_api.ConnectByTokenRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.mt4_term_api.ConnectByTokenRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.mt4_term_api.ConnectByTokenRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.mt4_term_api.ConnectByTokenRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    timeoutSeconds: jspb.Message.getFieldWithDefault(msg, 2, 0),
    expiration: jspb.Message.getFieldWithDefault(msg, 3, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.mt4_term_api.ConnectByTokenRequest}
 */
proto.mt4_term_api.ConnectByTokenRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.mt4_term_api.ConnectByTokenRequest;
  return proto.mt4_term_api.ConnectByTokenRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.mt4_term_api.ConnectByTokenRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.mt4_term_api.ConnectByTokenRequest}
 */
proto.mt4_term_api.ConnectByTokenRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 2:
      var value = /** @type {number} */ (reader.readUint32());
      msg.setTimeoutSeconds(value);
      break;
    case 3:
      var value = /** @type {number} */ (reader.readUint32());
      msg.setExpiration(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.mt4_term_api.ConnectByTokenRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.mt4_term_api.ConnectByTokenRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.mt4_term_api.ConnectByTokenRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.mt4_term_api.ConnectByTokenRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = /** @type {number} */ (jspb.Message.getField(message, 2));
  if (f != null) {
    writer.writeUint32(
      2,
      f
    );
  }
  f = /** @type {number} */ (jspb.Message.getField(message, 3));
  if (f != null) {
    writer.writeUint32(
      3,
      f
    );
  }
};


/**
 * optional uint32 timeout_seconds = 2;
 * @return {number}
 */
proto.mt4_term_api.ConnectByTokenRequest.prototype.getTimeoutSeconds = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/**
 * @param {number} value
 * @return {!proto.mt4_term_api.ConnectByTokenRequest} returns this
 */
proto.mt4_term_api.ConnectByTokenRequest.prototype.setTimeoutSeconds = function(value) {
  return jspb.Message.setField(this, 2, value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.mt4_term_api.ConnectByTokenRequest} returns this
 */
proto.mt4_term_api.ConnectByTokenRequest.prototype.clearTimeoutSeconds = function() {
  return jspb.Message.setField(this, 2, undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.mt4_term_api.ConnectByTokenRequest.prototype.hasTimeoutSeconds = function() {
  return jspb.Message.getField(this, 2) != null;
};


/**
 * optional uint32 expiration = 3;
 * @return {number}
 */
proto.mt4_term_api.ConnectByTokenRequest.prototype.getExpiration = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 3, 0));
};


/**
 * @param {number} value
 * @return {!proto.mt4_term_api.ConnectByTokenRequest} returns this
 */
proto.mt4_term_api.ConnectByTokenRequest.prototype.setExpiration = function(value) {
  return jspb.Message.setField(this, 3, value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.mt4_term_api.ConnectByTokenRequest} returns this
 */
proto.mt4_term_api.ConnectByTokenRequest.prototype.clearExpiration = function() {
  return jspb.Message.setField(this, 3, undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.mt4_term_api.ConnectByTokenRequest.prototype.hasExpiration = function() {
  return jspb.Message.getField(this, 3) != null;
};



/**
 * Oneof group definitions for this message. Each group defines the field
 * numbers belonging to that group. When of these fields' value is set, all
 * other fields in the group are cleared. During deserialization, if multiple
 * fields are encountered for a group, only the last value seen will be kept.
 * @private {!Array<!Array<number>>}
 * @const
 */
proto.mt4_term_api.ConnectExReply.oneofGroups_ = [[1,2]];

/**
 * @enum {number}
 */
proto.mt4_term_api.ConnectExReply.ResponseCase = {
  RESPONSE_NOT_SET: 0,
  DATA: 1,
  ERROR: 2
};

/**
 * @return {proto.mt4_term_api.ConnectExReply.ResponseCase}
 */
proto.mt4_term_api.ConnectExReply.prototype.getResponseCase = function() {
  return /** @type {proto.mt4_term_api.ConnectExReply.ResponseCase} */(jspb.Message.computeOneofCase(this, proto.mt4_term_api.ConnectExReply.oneofGroups_[0]));
};



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.mt4_term_api.ConnectExReply.prototype.toObject = function(opt_includeInstance) {
  return proto.mt4_term_api.ConnectExReply.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.mt4_term_api.ConnectExReply} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.mt4_term_api.ConnectExReply.toObject = function(includeInstance, msg) {
  var f, obj = {
    data: (f = msg.getData()) && proto.mt4_term_api.ConnectData.toObject(includeInstance, f),
    error: (f = msg.getError()) && mrpc$mt4$error_pb.Error.toObject(includeInstance, f)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.mt4_term_api.ConnectExReply}
 */
proto.mt4_term_api.ConnectExReply.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.mt4_term_api.ConnectExReply;
  return proto.mt4_term_api.ConnectExReply.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.mt4_term_api.ConnectExReply} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.mt4_term_api.ConnectExReply}
 */
proto.mt4_term_api.ConnectExReply.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.mt4_term_api.ConnectData;
      reader.readMessage(value,proto.mt4_term_api.ConnectData.deserializeBinaryFromReader);
      msg.setData(value);
      break;
    case 2:
      var value = new mrpc$mt4$error_pb.Error;
      reader.readMessage(value,mrpc$mt4$error_pb.Error.deserializeBinaryFromReader);
      msg.setError(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.mt4_term_api.ConnectExReply.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.mt4_term_api.ConnectExReply.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.mt4_term_api.ConnectExReply} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.mt4_term_api.ConnectExReply.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getData();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      proto.mt4_term_api.ConnectData.serializeBinaryToWriter
    );
  }
  f = message.getError();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      mrpc$mt4$error_pb.Error.serializeBinaryToWriter
    );
  }
};


/**
 * optional ConnectData data = 1;
 * @return {?proto.mt4_term_api.ConnectData}
 */
proto.mt4_term_api.ConnectExReply.prototype.getData = function() {
  return /** @type{?proto.mt4_term_api.ConnectData} */ (
    jspb.Message.getWrapperField(this, proto.mt4_term_api.ConnectData, 1));
};


/**
 * @param {?proto.mt4_term_api.ConnectData|undefined} value
 * @return {!proto.mt4_term_api.ConnectExReply} returns this
*/
proto.mt4_term_api.ConnectExReply.prototype.setData = function(value) {
  return jspb.Message.setOneofWrapperField(this, 1, proto.mt4_term_api.ConnectExReply.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.mt4_term_api.ConnectExReply} returns this
 */
proto.mt4_term_api.ConnectExReply.prototype.clearData = function() {
  return this.setData(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.mt4_term_api.ConnectExReply.prototype.hasData = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional Error error = 2;
 * @return {?proto.mt4_term_api.Error}
 */
proto.mt4_term_api.ConnectExReply.prototype.getError = function() {
  return /** @type{?proto.mt4_term_api.Error} */ (
    jspb.Message.getWrapperField(this, mrpc$mt4$error_pb.Error, 2));
};


/**
 * @param {?proto.mt4_term_api.Error|undefined} value
 * @return {!proto.mt4_term_api.ConnectExReply} returns this
*/
proto.mt4_term_api.ConnectExReply.prototype.setError = function(value) {
  return jspb.Message.setOneofWrapperField(this, 2, proto.mt4_term_api.ConnectExReply.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.mt4_term_api.ConnectExReply} returns this
 */
proto.mt4_term_api.ConnectExReply.prototype.clearError = function() {
  return this.setError(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.mt4_term_api.ConnectExReply.prototype.hasError = function() {
  return jspb.Message.getField(this, 2) != null;
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.mt4_term_api.ReconnectRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.mt4_term_api.ReconnectRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.mt4_term_api.ReconnectRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.mt4_term_api.ReconnectRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    forceReconnection: jspb.Message.getBooleanFieldWithDefault(msg, 1, false)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.mt4_term_api.ReconnectRequest}
 */
proto.mt4_term_api.ReconnectRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.mt4_term_api.ReconnectRequest;
  return proto.mt4_term_api.ReconnectRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.mt4_term_api.ReconnectRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.mt4_term_api.ReconnectRequest}
 */
proto.mt4_term_api.ReconnectRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setForceReconnection(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.mt4_term_api.ReconnectRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.mt4_term_api.ReconnectRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.mt4_term_api.ReconnectRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.mt4_term_api.ReconnectRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = /** @type {boolean} */ (jspb.Message.getField(message, 1));
  if (f != null) {
    writer.writeBool(
      1,
      f
    );
  }
};


/**
 * optional bool force_reconnection = 1;
 * @return {boolean}
 */
proto.mt4_term_api.ReconnectRequest.prototype.getForceReconnection = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 1, false));
};


/**
 * @param {boolean} value
 * @return {!proto.mt4_term_api.ReconnectRequest} returns this
 */
proto.mt4_term_api.ReconnectRequest.prototype.setForceReconnection = function(value) {
  return jspb.Message.setField(this, 1, value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.mt4_term_api.ReconnectRequest} returns this
 */
proto.mt4_term_api.ReconnectRequest.prototype.clearForceReconnection = function() {
  return jspb.Message.setField(this, 1, undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.mt4_term_api.ReconnectRequest.prototype.hasForceReconnection = function() {
  return jspb.Message.getField(this, 1) != null;
};



/**
 * Oneof group definitions for this message. Each group defines the field
 * numbers belonging to that group. When of these fields' value is set, all
 * other fields in the group are cleared. During deserialization, if multiple
 * fields are encountered for a group, only the last value seen will be kept.
 * @private {!Array<!Array<number>>}
 * @const
 */
proto.mt4_term_api.ReconnectReply.oneofGroups_ = [[1,2]];

/**
 * @enum {number}
 */
proto.mt4_term_api.ReconnectReply.ResponseCase = {
  RESPONSE_NOT_SET: 0,
  DATA: 1,
  ERROR: 2
};

/**
 * @return {proto.mt4_term_api.ReconnectReply.ResponseCase}
 */
proto.mt4_term_api.ReconnectReply.prototype.getResponseCase = function() {
  return /** @type {proto.mt4_term_api.ReconnectReply.ResponseCase} */(jspb.Message.computeOneofCase(this, proto.mt4_term_api.ReconnectReply.oneofGroups_[0]));
};



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.mt4_term_api.ReconnectReply.prototype.toObject = function(opt_includeInstance) {
  return proto.mt4_term_api.ReconnectReply.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.mt4_term_api.ReconnectReply} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.mt4_term_api.ReconnectReply.toObject = function(includeInstance, msg) {
  var f, obj = {
    data: (f = msg.getData()) && proto.mt4_term_api.ReconnectData.toObject(includeInstance, f),
    error: (f = msg.getError()) && mrpc$mt4$error_pb.Error.toObject(includeInstance, f)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.mt4_term_api.ReconnectReply}
 */
proto.mt4_term_api.ReconnectReply.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.mt4_term_api.ReconnectReply;
  return proto.mt4_term_api.ReconnectReply.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.mt4_term_api.ReconnectReply} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.mt4_term_api.ReconnectReply}
 */
proto.mt4_term_api.ReconnectReply.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.mt4_term_api.ReconnectData;
      reader.readMessage(value,proto.mt4_term_api.ReconnectData.deserializeBinaryFromReader);
      msg.setData(value);
      break;
    case 2:
      var value = new mrpc$mt4$error_pb.Error;
      reader.readMessage(value,mrpc$mt4$error_pb.Error.deserializeBinaryFromReader);
      msg.setError(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.mt4_term_api.ReconnectReply.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.mt4_term_api.ReconnectReply.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.mt4_term_api.ReconnectReply} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.mt4_term_api.ReconnectReply.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getData();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      proto.mt4_term_api.ReconnectData.serializeBinaryToWriter
    );
  }
  f = message.getError();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      mrpc$mt4$error_pb.Error.serializeBinaryToWriter
    );
  }
};


/**
 * optional ReconnectData data = 1;
 * @return {?proto.mt4_term_api.ReconnectData}
 */
proto.mt4_term_api.ReconnectReply.prototype.getData = function() {
  return /** @type{?proto.mt4_term_api.ReconnectData} */ (
    jspb.Message.getWrapperField(this, proto.mt4_term_api.ReconnectData, 1));
};


/**
 * @param {?proto.mt4_term_api.ReconnectData|undefined} value
 * @return {!proto.mt4_term_api.ReconnectReply} returns this
*/
proto.mt4_term_api.ReconnectReply.prototype.setData = function(value) {
  return jspb.Message.setOneofWrapperField(this, 1, proto.mt4_term_api.ReconnectReply.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.mt4_term_api.ReconnectReply} returns this
 */
proto.mt4_term_api.ReconnectReply.prototype.clearData = function() {
  return this.setData(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.mt4_term_api.ReconnectReply.prototype.hasData = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional Error error = 2;
 * @return {?proto.mt4_term_api.Error}
 */
proto.mt4_term_api.ReconnectReply.prototype.getError = function() {
  return /** @type{?proto.mt4_term_api.Error} */ (
    jspb.Message.getWrapperField(this, mrpc$mt4$error_pb.Error, 2));
};


/**
 * @param {?proto.mt4_term_api.Error|undefined} value
 * @return {!proto.mt4_term_api.ReconnectReply} returns this
*/
proto.mt4_term_api.ReconnectReply.prototype.setError = function(value) {
  return jspb.Message.setOneofWrapperField(this, 2, proto.mt4_term_api.ReconnectReply.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.mt4_term_api.ReconnectReply} returns this
 */
proto.mt4_term_api.ReconnectReply.prototype.clearError = function() {
  return this.setError(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.mt4_term_api.ReconnectReply.prototype.hasError = function() {
  return jspb.Message.getField(this, 2) != null;
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.mt4_term_api.ReconnectData.repeatedFields_ = [5];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.mt4_term_api.ReconnectData.prototype.toObject = function(opt_includeInstance) {
  return proto.mt4_term_api.ReconnectData.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.mt4_term_api.ReconnectData} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.mt4_term_api.ReconnectData.toObject = function(includeInstance, msg) {
  var f, obj = {
    terminalWasRecreated: jspb.Message.getBooleanFieldWithDefault(msg, 1, false),
    terminalType: jspb.Message.getFieldWithDefault(msg, 2, 0),
    terminalInstanceGuid: jspb.Message.getFieldWithDefault(msg, 3, ""),
    oldTerminalFullLiveTimeSeconds: jspb.Message.getFieldWithDefault(msg, 4, 0),
    oldLogFilesList: jspb.Message.toObjectList(msg.getOldLogFilesList(),
    mrpc$mt4$error_pb.LogFileInfo.toObject, includeInstance)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.mt4_term_api.ReconnectData}
 */
proto.mt4_term_api.ReconnectData.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.mt4_term_api.ReconnectData;
  return proto.mt4_term_api.ReconnectData.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.mt4_term_api.ReconnectData} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.mt4_term_api.ReconnectData}
 */
proto.mt4_term_api.ReconnectData.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setTerminalWasRecreated(value);
      break;
    case 2:
      var value = /** @type {!proto.mt4_term_api.TerminalType} */ (reader.readEnum());
      msg.setTerminalType(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setTerminalInstanceGuid(value);
      break;
    case 4:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setOldTerminalFullLiveTimeSeconds(value);
      break;
    case 5:
      var value = new mrpc$mt4$error_pb.LogFileInfo;
      reader.readMessage(value,mrpc$mt4$error_pb.LogFileInfo.deserializeBinaryFromReader);
      msg.addOldLogFiles(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.mt4_term_api.ReconnectData.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.mt4_term_api.ReconnectData.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.mt4_term_api.ReconnectData} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.mt4_term_api.ReconnectData.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getTerminalWasRecreated();
  if (f) {
    writer.writeBool(
      1,
      f
    );
  }
  f = message.getTerminalType();
  if (f !== 0.0) {
    writer.writeEnum(
      2,
      f
    );
  }
  f = message.getTerminalInstanceGuid();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
  f = message.getOldTerminalFullLiveTimeSeconds();
  if (f !== 0) {
    writer.writeInt64(
      4,
      f
    );
  }
  f = message.getOldLogFilesList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      5,
      f,
      mrpc$mt4$error_pb.LogFileInfo.serializeBinaryToWriter
    );
  }
};


/**
 * optional bool terminal_was_recreated = 1;
 * @return {boolean}
 */
proto.mt4_term_api.ReconnectData.prototype.getTerminalWasRecreated = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 1, false));
};


/**
 * @param {boolean} value
 * @return {!proto.mt4_term_api.ReconnectData} returns this
 */
proto.mt4_term_api.ReconnectData.prototype.setTerminalWasRecreated = function(value) {
  return jspb.Message.setProto3BooleanField(this, 1, value);
};


/**
 * optional TerminalType terminal_type = 2;
 * @return {!proto.mt4_term_api.TerminalType}
 */
proto.mt4_term_api.ReconnectData.prototype.getTerminalType = function() {
  return /** @type {!proto.mt4_term_api.TerminalType} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/**
 * @param {!proto.mt4_term_api.TerminalType} value
 * @return {!proto.mt4_term_api.ReconnectData} returns this
 */
proto.mt4_term_api.ReconnectData.prototype.setTerminalType = function(value) {
  return jspb.Message.setProto3EnumField(this, 2, value);
};


/**
 * optional string terminal_instance_guid = 3;
 * @return {string}
 */
proto.mt4_term_api.ReconnectData.prototype.getTerminalInstanceGuid = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.mt4_term_api.ReconnectData} returns this
 */
proto.mt4_term_api.ReconnectData.prototype.setTerminalInstanceGuid = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};


/**
 * optional int64 old_terminal_full_live_time_seconds = 4;
 * @return {number}
 */
proto.mt4_term_api.ReconnectData.prototype.getOldTerminalFullLiveTimeSeconds = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 4, 0));
};


/**
 * @param {number} value
 * @return {!proto.mt4_term_api.ReconnectData} returns this
 */
proto.mt4_term_api.ReconnectData.prototype.setOldTerminalFullLiveTimeSeconds = function(value) {
  return jspb.Message.setProto3IntField(this, 4, value);
};


/**
 * repeated LogFileInfo old_log_files = 5;
 * @return {!Array<!proto.mt4_term_api.LogFileInfo>}
 */
proto.mt4_term_api.ReconnectData.prototype.getOldLogFilesList = function() {
  return /** @type{!Array<!proto.mt4_term_api.LogFileInfo>} */ (
    jspb.Message.getRepeatedWrapperField(this, mrpc$mt4$error_pb.LogFileInfo, 5));
};


/**
 * @param {!Array<!proto.mt4_term_api.LogFileInfo>} value
 * @return {!proto.mt4_term_api.ReconnectData} returns this
*/
proto.mt4_term_api.ReconnectData.prototype.setOldLogFilesList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 5, value);
};


/**
 * @param {!proto.mt4_term_api.LogFileInfo=} opt_value
 * @param {number=} opt_index
 * @return {!proto.mt4_term_api.LogFileInfo}
 */
proto.mt4_term_api.ReconnectData.prototype.addOldLogFiles = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 5, opt_value, proto.mt4_term_api.LogFileInfo, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.mt4_term_api.ReconnectData} returns this
 */
proto.mt4_term_api.ReconnectData.prototype.clearOldLogFilesList = function() {
  return this.setOldLogFilesList([]);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.mt4_term_api.ConnectRequest.repeatedFields_ = [5];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.mt4_term_api.ConnectRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.mt4_term_api.ConnectRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.mt4_term_api.ConnectRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.mt4_term_api.ConnectRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    user: jspb.Message.getFieldWithDefault(msg, 1, 0),
    password: jspb.Message.getFieldWithDefault(msg, 2, ""),
    host: jspb.Message.getFieldWithDefault(msg, 3, ""),
    port: jspb.Message.getFieldWithDefault(msg, 4, 0),
    expertsToAddList: jspb.Message.toObjectList(msg.getExpertsToAddList(),
    proto.mt4_term_api.ExpertAdviser.toObject, includeInstance),
    timeoutSeconds: jspb.Message.getFieldWithDefault(msg, 6, 0),
    name: jspb.Message.getFieldWithDefault(msg, 7, ""),
    expiration: jspb.Message.getFieldWithDefault(msg, 8, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.mt4_term_api.ConnectRequest}
 */
proto.mt4_term_api.ConnectRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.mt4_term_api.ConnectRequest;
  return proto.mt4_term_api.ConnectRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.mt4_term_api.ConnectRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.mt4_term_api.ConnectRequest}
 */
proto.mt4_term_api.ConnectRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readUint64());
      msg.setUser(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setPassword(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setHost(value);
      break;
    case 4:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setPort(value);
      break;
    case 5:
      var value = new proto.mt4_term_api.ExpertAdviser;
      reader.readMessage(value,proto.mt4_term_api.ExpertAdviser.deserializeBinaryFromReader);
      msg.addExpertsToAdd(value);
      break;
    case 6:
      var value = /** @type {number} */ (reader.readUint32());
      msg.setTimeoutSeconds(value);
      break;
    case 7:
      var value = /** @type {string} */ (reader.readString());
      msg.setName(value);
      break;
    case 8:
      var value = /** @type {number} */ (reader.readUint32());
      msg.setExpiration(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.mt4_term_api.ConnectRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.mt4_term_api.ConnectRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.mt4_term_api.ConnectRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.mt4_term_api.ConnectRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getUser();
  if (f !== 0) {
    writer.writeUint64(
      1,
      f
    );
  }
  f = message.getPassword();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getHost();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
  f = message.getPort();
  if (f !== 0) {
    writer.writeInt32(
      4,
      f
    );
  }
  f = message.getExpertsToAddList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      5,
      f,
      proto.mt4_term_api.ExpertAdviser.serializeBinaryToWriter
    );
  }
  f = /** @type {number} */ (jspb.Message.getField(message, 6));
  if (f != null) {
    writer.writeUint32(
      6,
      f
    );
  }
  f = /** @type {string} */ (jspb.Message.getField(message, 7));
  if (f != null) {
    writer.writeString(
      7,
      f
    );
  }
  f = /** @type {number} */ (jspb.Message.getField(message, 8));
  if (f != null) {
    writer.writeUint32(
      8,
      f
    );
  }
};


/**
 * optional uint64 user = 1;
 * @return {number}
 */
proto.mt4_term_api.ConnectRequest.prototype.getUser = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.mt4_term_api.ConnectRequest} returns this
 */
proto.mt4_term_api.ConnectRequest.prototype.setUser = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};


/**
 * optional string password = 2;
 * @return {string}
 */
proto.mt4_term_api.ConnectRequest.prototype.getPassword = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.mt4_term_api.ConnectRequest} returns this
 */
proto.mt4_term_api.ConnectRequest.prototype.setPassword = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional string host = 3;
 * @return {string}
 */
proto.mt4_term_api.ConnectRequest.prototype.getHost = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.mt4_term_api.ConnectRequest} returns this
 */
proto.mt4_term_api.ConnectRequest.prototype.setHost = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};


/**
 * optional int32 port = 4;
 * @return {number}
 */
proto.mt4_term_api.ConnectRequest.prototype.getPort = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 4, 0));
};


/**
 * @param {number} value
 * @return {!proto.mt4_term_api.ConnectRequest} returns this
 */
proto.mt4_term_api.ConnectRequest.prototype.setPort = function(value) {
  return jspb.Message.setProto3IntField(this, 4, value);
};


/**
 * repeated ExpertAdviser experts_to_add = 5;
 * @return {!Array<!proto.mt4_term_api.ExpertAdviser>}
 */
proto.mt4_term_api.ConnectRequest.prototype.getExpertsToAddList = function() {
  return /** @type{!Array<!proto.mt4_term_api.ExpertAdviser>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.mt4_term_api.ExpertAdviser, 5));
};


/**
 * @param {!Array<!proto.mt4_term_api.ExpertAdviser>} value
 * @return {!proto.mt4_term_api.ConnectRequest} returns this
*/
proto.mt4_term_api.ConnectRequest.prototype.setExpertsToAddList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 5, value);
};


/**
 * @param {!proto.mt4_term_api.ExpertAdviser=} opt_value
 * @param {number=} opt_index
 * @return {!proto.mt4_term_api.ExpertAdviser}
 */
proto.mt4_term_api.ConnectRequest.prototype.addExpertsToAdd = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 5, opt_value, proto.mt4_term_api.ExpertAdviser, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.mt4_term_api.ConnectRequest} returns this
 */
proto.mt4_term_api.ConnectRequest.prototype.clearExpertsToAddList = function() {
  return this.setExpertsToAddList([]);
};


/**
 * optional uint32 timeout_seconds = 6;
 * @return {number}
 */
proto.mt4_term_api.ConnectRequest.prototype.getTimeoutSeconds = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 6, 0));
};


/**
 * @param {number} value
 * @return {!proto.mt4_term_api.ConnectRequest} returns this
 */
proto.mt4_term_api.ConnectRequest.prototype.setTimeoutSeconds = function(value) {
  return jspb.Message.setField(this, 6, value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.mt4_term_api.ConnectRequest} returns this
 */
proto.mt4_term_api.ConnectRequest.prototype.clearTimeoutSeconds = function() {
  return jspb.Message.setField(this, 6, undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.mt4_term_api.ConnectRequest.prototype.hasTimeoutSeconds = function() {
  return jspb.Message.getField(this, 6) != null;
};


/**
 * optional string name = 7;
 * @return {string}
 */
proto.mt4_term_api.ConnectRequest.prototype.getName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 7, ""));
};


/**
 * @param {string} value
 * @return {!proto.mt4_term_api.ConnectRequest} returns this
 */
proto.mt4_term_api.ConnectRequest.prototype.setName = function(value) {
  return jspb.Message.setField(this, 7, value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.mt4_term_api.ConnectRequest} returns this
 */
proto.mt4_term_api.ConnectRequest.prototype.clearName = function() {
  return jspb.Message.setField(this, 7, undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.mt4_term_api.ConnectRequest.prototype.hasName = function() {
  return jspb.Message.getField(this, 7) != null;
};


/**
 * optional uint32 expiration = 8;
 * @return {number}
 */
proto.mt4_term_api.ConnectRequest.prototype.getExpiration = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 8, 0));
};


/**
 * @param {number} value
 * @return {!proto.mt4_term_api.ConnectRequest} returns this
 */
proto.mt4_term_api.ConnectRequest.prototype.setExpiration = function(value) {
  return jspb.Message.setField(this, 8, value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.mt4_term_api.ConnectRequest} returns this
 */
proto.mt4_term_api.ConnectRequest.prototype.clearExpiration = function() {
  return jspb.Message.setField(this, 8, undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.mt4_term_api.ConnectRequest.prototype.hasExpiration = function() {
  return jspb.Message.getField(this, 8) != null;
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.mt4_term_api.ExpertAdviser.prototype.toObject = function(opt_includeInstance) {
  return proto.mt4_term_api.ExpertAdviser.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.mt4_term_api.ExpertAdviser} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.mt4_term_api.ExpertAdviser.toObject = function(includeInstance, msg) {
  var f, obj = {
    fileName: jspb.Message.getFieldWithDefault(msg, 1, ""),
    fileContent: msg.getFileContent_asB64()
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.mt4_term_api.ExpertAdviser}
 */
proto.mt4_term_api.ExpertAdviser.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.mt4_term_api.ExpertAdviser;
  return proto.mt4_term_api.ExpertAdviser.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.mt4_term_api.ExpertAdviser} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.mt4_term_api.ExpertAdviser}
 */
proto.mt4_term_api.ExpertAdviser.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setFileName(value);
      break;
    case 2:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setFileContent(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.mt4_term_api.ExpertAdviser.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.mt4_term_api.ExpertAdviser.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.mt4_term_api.ExpertAdviser} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.mt4_term_api.ExpertAdviser.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getFileName();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getFileContent_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      2,
      f
    );
  }
};


/**
 * optional string file_name = 1;
 * @return {string}
 */
proto.mt4_term_api.ExpertAdviser.prototype.getFileName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.mt4_term_api.ExpertAdviser} returns this
 */
proto.mt4_term_api.ExpertAdviser.prototype.setFileName = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional bytes file_content = 2;
 * @return {!(string|Uint8Array)}
 */
proto.mt4_term_api.ExpertAdviser.prototype.getFileContent = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * optional bytes file_content = 2;
 * This is a type-conversion wrapper around `getFileContent()`
 * @return {string}
 */
proto.mt4_term_api.ExpertAdviser.prototype.getFileContent_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getFileContent()));
};


/**
 * optional bytes file_content = 2;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getFileContent()`
 * @return {!Uint8Array}
 */
proto.mt4_term_api.ExpertAdviser.prototype.getFileContent_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getFileContent()));
};


/**
 * @param {!(string|Uint8Array)} value
 * @return {!proto.mt4_term_api.ExpertAdviser} returns this
 */
proto.mt4_term_api.ExpertAdviser.prototype.setFileContent = function(value) {
  return jspb.Message.setProto3BytesField(this, 2, value);
};



/**
 * Oneof group definitions for this message. Each group defines the field
 * numbers belonging to that group. When of these fields' value is set, all
 * other fields in the group are cleared. During deserialization, if multiple
 * fields are encountered for a group, only the last value seen will be kept.
 * @private {!Array<!Array<number>>}
 * @const
 */
proto.mt4_term_api.ConnectReply.oneofGroups_ = [[1,2]];

/**
 * @enum {number}
 */
proto.mt4_term_api.ConnectReply.ResponseCase = {
  RESPONSE_NOT_SET: 0,
  DATA: 1,
  ERROR: 2
};

/**
 * @return {proto.mt4_term_api.ConnectReply.ResponseCase}
 */
proto.mt4_term_api.ConnectReply.prototype.getResponseCase = function() {
  return /** @type {proto.mt4_term_api.ConnectReply.ResponseCase} */(jspb.Message.computeOneofCase(this, proto.mt4_term_api.ConnectReply.oneofGroups_[0]));
};



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.mt4_term_api.ConnectReply.prototype.toObject = function(opt_includeInstance) {
  return proto.mt4_term_api.ConnectReply.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.mt4_term_api.ConnectReply} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.mt4_term_api.ConnectReply.toObject = function(includeInstance, msg) {
  var f, obj = {
    data: (f = msg.getData()) && proto.mt4_term_api.ConnectData.toObject(includeInstance, f),
    error: (f = msg.getError()) && mrpc$mt4$error_pb.Error.toObject(includeInstance, f)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.mt4_term_api.ConnectReply}
 */
proto.mt4_term_api.ConnectReply.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.mt4_term_api.ConnectReply;
  return proto.mt4_term_api.ConnectReply.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.mt4_term_api.ConnectReply} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.mt4_term_api.ConnectReply}
 */
proto.mt4_term_api.ConnectReply.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.mt4_term_api.ConnectData;
      reader.readMessage(value,proto.mt4_term_api.ConnectData.deserializeBinaryFromReader);
      msg.setData(value);
      break;
    case 2:
      var value = new mrpc$mt4$error_pb.Error;
      reader.readMessage(value,mrpc$mt4$error_pb.Error.deserializeBinaryFromReader);
      msg.setError(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.mt4_term_api.ConnectReply.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.mt4_term_api.ConnectReply.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.mt4_term_api.ConnectReply} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.mt4_term_api.ConnectReply.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getData();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      proto.mt4_term_api.ConnectData.serializeBinaryToWriter
    );
  }
  f = message.getError();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      mrpc$mt4$error_pb.Error.serializeBinaryToWriter
    );
  }
};


/**
 * optional ConnectData data = 1;
 * @return {?proto.mt4_term_api.ConnectData}
 */
proto.mt4_term_api.ConnectReply.prototype.getData = function() {
  return /** @type{?proto.mt4_term_api.ConnectData} */ (
    jspb.Message.getWrapperField(this, proto.mt4_term_api.ConnectData, 1));
};


/**
 * @param {?proto.mt4_term_api.ConnectData|undefined} value
 * @return {!proto.mt4_term_api.ConnectReply} returns this
*/
proto.mt4_term_api.ConnectReply.prototype.setData = function(value) {
  return jspb.Message.setOneofWrapperField(this, 1, proto.mt4_term_api.ConnectReply.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.mt4_term_api.ConnectReply} returns this
 */
proto.mt4_term_api.ConnectReply.prototype.clearData = function() {
  return this.setData(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.mt4_term_api.ConnectReply.prototype.hasData = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional Error error = 2;
 * @return {?proto.mt4_term_api.Error}
 */
proto.mt4_term_api.ConnectReply.prototype.getError = function() {
  return /** @type{?proto.mt4_term_api.Error} */ (
    jspb.Message.getWrapperField(this, mrpc$mt4$error_pb.Error, 2));
};


/**
 * @param {?proto.mt4_term_api.Error|undefined} value
 * @return {!proto.mt4_term_api.ConnectReply} returns this
*/
proto.mt4_term_api.ConnectReply.prototype.setError = function(value) {
  return jspb.Message.setOneofWrapperField(this, 2, proto.mt4_term_api.ConnectReply.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.mt4_term_api.ConnectReply} returns this
 */
proto.mt4_term_api.ConnectReply.prototype.clearError = function() {
  return this.setError(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.mt4_term_api.ConnectReply.prototype.hasError = function() {
  return jspb.Message.getField(this, 2) != null;
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.mt4_term_api.ConnectData.prototype.toObject = function(opt_includeInstance) {
  return proto.mt4_term_api.ConnectData.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.mt4_term_api.ConnectData} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.mt4_term_api.ConnectData.toObject = function(includeInstance, msg) {
  var f, obj = {
    terminalInstanceGuid: jspb.Message.getFieldWithDefault(msg, 1, ""),
    terminalType: jspb.Message.getFieldWithDefault(msg, 3, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.mt4_term_api.ConnectData}
 */
proto.mt4_term_api.ConnectData.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.mt4_term_api.ConnectData;
  return proto.mt4_term_api.ConnectData.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.mt4_term_api.ConnectData} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.mt4_term_api.ConnectData}
 */
proto.mt4_term_api.ConnectData.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setTerminalInstanceGuid(value);
      break;
    case 3:
      var value = /** @type {!proto.mt4_term_api.TerminalType} */ (reader.readEnum());
      msg.setTerminalType(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.mt4_term_api.ConnectData.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.mt4_term_api.ConnectData.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.mt4_term_api.ConnectData} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.mt4_term_api.ConnectData.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getTerminalInstanceGuid();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getTerminalType();
  if (f !== 0.0) {
    writer.writeEnum(
      3,
      f
    );
  }
};


/**
 * optional string terminal_instance_guid = 1;
 * @return {string}
 */
proto.mt4_term_api.ConnectData.prototype.getTerminalInstanceGuid = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.mt4_term_api.ConnectData} returns this
 */
proto.mt4_term_api.ConnectData.prototype.setTerminalInstanceGuid = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional TerminalType terminal_type = 3;
 * @return {!proto.mt4_term_api.TerminalType}
 */
proto.mt4_term_api.ConnectData.prototype.getTerminalType = function() {
  return /** @type {!proto.mt4_term_api.TerminalType} */ (jspb.Message.getFieldWithDefault(this, 3, 0));
};


/**
 * @param {!proto.mt4_term_api.TerminalType} value
 * @return {!proto.mt4_term_api.ConnectData} returns this
 */
proto.mt4_term_api.ConnectData.prototype.setTerminalType = function(value) {
  return jspb.Message.setProto3EnumField(this, 3, value);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.mt4_term_api.ConnectProxyRequest.repeatedFields_ = [10];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.mt4_term_api.ConnectProxyRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.mt4_term_api.ConnectProxyRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.mt4_term_api.ConnectProxyRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.mt4_term_api.ConnectProxyRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    user: jspb.Message.getFieldWithDefault(msg, 1, 0),
    password: jspb.Message.getFieldWithDefault(msg, 2, ""),
    host: jspb.Message.getFieldWithDefault(msg, 3, ""),
    port: jspb.Message.getFieldWithDefault(msg, 4, 0),
    proxyuser: jspb.Message.getFieldWithDefault(msg, 5, ""),
    proxypassword: jspb.Message.getFieldWithDefault(msg, 6, ""),
    proxyhost: jspb.Message.getFieldWithDefault(msg, 7, ""),
    proxyport: jspb.Message.getFieldWithDefault(msg, 8, 0),
    proxytype: jspb.Message.getFieldWithDefault(msg, 9, 0),
    expertsToAddList: jspb.Message.toObjectList(msg.getExpertsToAddList(),
    proto.mt4_term_api.ExpertAdviser.toObject, includeInstance),
    timeoutSeconds: jspb.Message.getFieldWithDefault(msg, 11, 0),
    name: jspb.Message.getFieldWithDefault(msg, 12, ""),
    expiration: jspb.Message.getFieldWithDefault(msg, 13, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.mt4_term_api.ConnectProxyRequest}
 */
proto.mt4_term_api.ConnectProxyRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.mt4_term_api.ConnectProxyRequest;
  return proto.mt4_term_api.ConnectProxyRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.mt4_term_api.ConnectProxyRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.mt4_term_api.ConnectProxyRequest}
 */
proto.mt4_term_api.ConnectProxyRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readUint64());
      msg.setUser(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setPassword(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setHost(value);
      break;
    case 4:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setPort(value);
      break;
    case 5:
      var value = /** @type {string} */ (reader.readString());
      msg.setProxyuser(value);
      break;
    case 6:
      var value = /** @type {string} */ (reader.readString());
      msg.setProxypassword(value);
      break;
    case 7:
      var value = /** @type {string} */ (reader.readString());
      msg.setProxyhost(value);
      break;
    case 8:
      var value = /** @type {number} */ (reader.readUint32());
      msg.setProxyport(value);
      break;
    case 9:
      var value = /** @type {!proto.mt4_term_api.ProxyTypes} */ (reader.readEnum());
      msg.setProxytype(value);
      break;
    case 10:
      var value = new proto.mt4_term_api.ExpertAdviser;
      reader.readMessage(value,proto.mt4_term_api.ExpertAdviser.deserializeBinaryFromReader);
      msg.addExpertsToAdd(value);
      break;
    case 11:
      var value = /** @type {number} */ (reader.readUint32());
      msg.setTimeoutSeconds(value);
      break;
    case 12:
      var value = /** @type {string} */ (reader.readString());
      msg.setName(value);
      break;
    case 13:
      var value = /** @type {number} */ (reader.readUint32());
      msg.setExpiration(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.mt4_term_api.ConnectProxyRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.mt4_term_api.ConnectProxyRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.mt4_term_api.ConnectProxyRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.mt4_term_api.ConnectProxyRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getUser();
  if (f !== 0) {
    writer.writeUint64(
      1,
      f
    );
  }
  f = message.getPassword();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getHost();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
  f = message.getPort();
  if (f !== 0) {
    writer.writeInt32(
      4,
      f
    );
  }
  f = message.getProxyuser();
  if (f.length > 0) {
    writer.writeString(
      5,
      f
    );
  }
  f = message.getProxypassword();
  if (f.length > 0) {
    writer.writeString(
      6,
      f
    );
  }
  f = message.getProxyhost();
  if (f.length > 0) {
    writer.writeString(
      7,
      f
    );
  }
  f = message.getProxyport();
  if (f !== 0) {
    writer.writeUint32(
      8,
      f
    );
  }
  f = message.getProxytype();
  if (f !== 0.0) {
    writer.writeEnum(
      9,
      f
    );
  }
  f = message.getExpertsToAddList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      10,
      f,
      proto.mt4_term_api.ExpertAdviser.serializeBinaryToWriter
    );
  }
  f = /** @type {number} */ (jspb.Message.getField(message, 11));
  if (f != null) {
    writer.writeUint32(
      11,
      f
    );
  }
  f = /** @type {string} */ (jspb.Message.getField(message, 12));
  if (f != null) {
    writer.writeString(
      12,
      f
    );
  }
  f = /** @type {number} */ (jspb.Message.getField(message, 13));
  if (f != null) {
    writer.writeUint32(
      13,
      f
    );
  }
};


/**
 * optional uint64 user = 1;
 * @return {number}
 */
proto.mt4_term_api.ConnectProxyRequest.prototype.getUser = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.mt4_term_api.ConnectProxyRequest} returns this
 */
proto.mt4_term_api.ConnectProxyRequest.prototype.setUser = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};


/**
 * optional string password = 2;
 * @return {string}
 */
proto.mt4_term_api.ConnectProxyRequest.prototype.getPassword = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.mt4_term_api.ConnectProxyRequest} returns this
 */
proto.mt4_term_api.ConnectProxyRequest.prototype.setPassword = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional string host = 3;
 * @return {string}
 */
proto.mt4_term_api.ConnectProxyRequest.prototype.getHost = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.mt4_term_api.ConnectProxyRequest} returns this
 */
proto.mt4_term_api.ConnectProxyRequest.prototype.setHost = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};


/**
 * optional int32 port = 4;
 * @return {number}
 */
proto.mt4_term_api.ConnectProxyRequest.prototype.getPort = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 4, 0));
};


/**
 * @param {number} value
 * @return {!proto.mt4_term_api.ConnectProxyRequest} returns this
 */
proto.mt4_term_api.ConnectProxyRequest.prototype.setPort = function(value) {
  return jspb.Message.setProto3IntField(this, 4, value);
};


/**
 * optional string proxyUser = 5;
 * @return {string}
 */
proto.mt4_term_api.ConnectProxyRequest.prototype.getProxyuser = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 5, ""));
};


/**
 * @param {string} value
 * @return {!proto.mt4_term_api.ConnectProxyRequest} returns this
 */
proto.mt4_term_api.ConnectProxyRequest.prototype.setProxyuser = function(value) {
  return jspb.Message.setProto3StringField(this, 5, value);
};


/**
 * optional string proxyPassword = 6;
 * @return {string}
 */
proto.mt4_term_api.ConnectProxyRequest.prototype.getProxypassword = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 6, ""));
};


/**
 * @param {string} value
 * @return {!proto.mt4_term_api.ConnectProxyRequest} returns this
 */
proto.mt4_term_api.ConnectProxyRequest.prototype.setProxypassword = function(value) {
  return jspb.Message.setProto3StringField(this, 6, value);
};


/**
 * optional string proxyHost = 7;
 * @return {string}
 */
proto.mt4_term_api.ConnectProxyRequest.prototype.getProxyhost = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 7, ""));
};


/**
 * @param {string} value
 * @return {!proto.mt4_term_api.ConnectProxyRequest} returns this
 */
proto.mt4_term_api.ConnectProxyRequest.prototype.setProxyhost = function(value) {
  return jspb.Message.setProto3StringField(this, 7, value);
};


/**
 * optional uint32 proxyPort = 8;
 * @return {number}
 */
proto.mt4_term_api.ConnectProxyRequest.prototype.getProxyport = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 8, 0));
};


/**
 * @param {number} value
 * @return {!proto.mt4_term_api.ConnectProxyRequest} returns this
 */
proto.mt4_term_api.ConnectProxyRequest.prototype.setProxyport = function(value) {
  return jspb.Message.setProto3IntField(this, 8, value);
};


/**
 * optional ProxyTypes proxyType = 9;
 * @return {!proto.mt4_term_api.ProxyTypes}
 */
proto.mt4_term_api.ConnectProxyRequest.prototype.getProxytype = function() {
  return /** @type {!proto.mt4_term_api.ProxyTypes} */ (jspb.Message.getFieldWithDefault(this, 9, 0));
};


/**
 * @param {!proto.mt4_term_api.ProxyTypes} value
 * @return {!proto.mt4_term_api.ConnectProxyRequest} returns this
 */
proto.mt4_term_api.ConnectProxyRequest.prototype.setProxytype = function(value) {
  return jspb.Message.setProto3EnumField(this, 9, value);
};


/**
 * repeated ExpertAdviser experts_to_add = 10;
 * @return {!Array<!proto.mt4_term_api.ExpertAdviser>}
 */
proto.mt4_term_api.ConnectProxyRequest.prototype.getExpertsToAddList = function() {
  return /** @type{!Array<!proto.mt4_term_api.ExpertAdviser>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.mt4_term_api.ExpertAdviser, 10));
};


/**
 * @param {!Array<!proto.mt4_term_api.ExpertAdviser>} value
 * @return {!proto.mt4_term_api.ConnectProxyRequest} returns this
*/
proto.mt4_term_api.ConnectProxyRequest.prototype.setExpertsToAddList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 10, value);
};


/**
 * @param {!proto.mt4_term_api.ExpertAdviser=} opt_value
 * @param {number=} opt_index
 * @return {!proto.mt4_term_api.ExpertAdviser}
 */
proto.mt4_term_api.ConnectProxyRequest.prototype.addExpertsToAdd = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 10, opt_value, proto.mt4_term_api.ExpertAdviser, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.mt4_term_api.ConnectProxyRequest} returns this
 */
proto.mt4_term_api.ConnectProxyRequest.prototype.clearExpertsToAddList = function() {
  return this.setExpertsToAddList([]);
};


/**
 * optional uint32 timeout_seconds = 11;
 * @return {number}
 */
proto.mt4_term_api.ConnectProxyRequest.prototype.getTimeoutSeconds = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 11, 0));
};


/**
 * @param {number} value
 * @return {!proto.mt4_term_api.ConnectProxyRequest} returns this
 */
proto.mt4_term_api.ConnectProxyRequest.prototype.setTimeoutSeconds = function(value) {
  return jspb.Message.setField(this, 11, value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.mt4_term_api.ConnectProxyRequest} returns this
 */
proto.mt4_term_api.ConnectProxyRequest.prototype.clearTimeoutSeconds = function() {
  return jspb.Message.setField(this, 11, undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.mt4_term_api.ConnectProxyRequest.prototype.hasTimeoutSeconds = function() {
  return jspb.Message.getField(this, 11) != null;
};


/**
 * optional string name = 12;
 * @return {string}
 */
proto.mt4_term_api.ConnectProxyRequest.prototype.getName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 12, ""));
};


/**
 * @param {string} value
 * @return {!proto.mt4_term_api.ConnectProxyRequest} returns this
 */
proto.mt4_term_api.ConnectProxyRequest.prototype.setName = function(value) {
  return jspb.Message.setField(this, 12, value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.mt4_term_api.ConnectProxyRequest} returns this
 */
proto.mt4_term_api.ConnectProxyRequest.prototype.clearName = function() {
  return jspb.Message.setField(this, 12, undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.mt4_term_api.ConnectProxyRequest.prototype.hasName = function() {
  return jspb.Message.getField(this, 12) != null;
};


/**
 * optional uint32 expiration = 13;
 * @return {number}
 */
proto.mt4_term_api.ConnectProxyRequest.prototype.getExpiration = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 13, 0));
};


/**
 * @param {number} value
 * @return {!proto.mt4_term_api.ConnectProxyRequest} returns this
 */
proto.mt4_term_api.ConnectProxyRequest.prototype.setExpiration = function(value) {
  return jspb.Message.setField(this, 13, value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.mt4_term_api.ConnectProxyRequest} returns this
 */
proto.mt4_term_api.ConnectProxyRequest.prototype.clearExpiration = function() {
  return jspb.Message.setField(this, 13, undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.mt4_term_api.ConnectProxyRequest.prototype.hasExpiration = function() {
  return jspb.Message.getField(this, 13) != null;
};



/**
 * Oneof group definitions for this message. Each group defines the field
 * numbers belonging to that group. When of these fields' value is set, all
 * other fields in the group are cleared. During deserialization, if multiple
 * fields are encountered for a group, only the last value seen will be kept.
 * @private {!Array<!Array<number>>}
 * @const
 */
proto.mt4_term_api.ConnectProxyReply.oneofGroups_ = [[1,2]];

/**
 * @enum {number}
 */
proto.mt4_term_api.ConnectProxyReply.ResponseCase = {
  RESPONSE_NOT_SET: 0,
  DATA: 1,
  ERROR: 2
};

/**
 * @return {proto.mt4_term_api.ConnectProxyReply.ResponseCase}
 */
proto.mt4_term_api.ConnectProxyReply.prototype.getResponseCase = function() {
  return /** @type {proto.mt4_term_api.ConnectProxyReply.ResponseCase} */(jspb.Message.computeOneofCase(this, proto.mt4_term_api.ConnectProxyReply.oneofGroups_[0]));
};



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.mt4_term_api.ConnectProxyReply.prototype.toObject = function(opt_includeInstance) {
  return proto.mt4_term_api.ConnectProxyReply.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.mt4_term_api.ConnectProxyReply} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.mt4_term_api.ConnectProxyReply.toObject = function(includeInstance, msg) {
  var f, obj = {
    data: (f = msg.getData()) && proto.mt4_term_api.ConnectProxyData.toObject(includeInstance, f),
    error: (f = msg.getError()) && mrpc$mt4$error_pb.Error.toObject(includeInstance, f)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.mt4_term_api.ConnectProxyReply}
 */
proto.mt4_term_api.ConnectProxyReply.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.mt4_term_api.ConnectProxyReply;
  return proto.mt4_term_api.ConnectProxyReply.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.mt4_term_api.ConnectProxyReply} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.mt4_term_api.ConnectProxyReply}
 */
proto.mt4_term_api.ConnectProxyReply.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.mt4_term_api.ConnectProxyData;
      reader.readMessage(value,proto.mt4_term_api.ConnectProxyData.deserializeBinaryFromReader);
      msg.setData(value);
      break;
    case 2:
      var value = new mrpc$mt4$error_pb.Error;
      reader.readMessage(value,mrpc$mt4$error_pb.Error.deserializeBinaryFromReader);
      msg.setError(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.mt4_term_api.ConnectProxyReply.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.mt4_term_api.ConnectProxyReply.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.mt4_term_api.ConnectProxyReply} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.mt4_term_api.ConnectProxyReply.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getData();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      proto.mt4_term_api.ConnectProxyData.serializeBinaryToWriter
    );
  }
  f = message.getError();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      mrpc$mt4$error_pb.Error.serializeBinaryToWriter
    );
  }
};


/**
 * optional ConnectProxyData data = 1;
 * @return {?proto.mt4_term_api.ConnectProxyData}
 */
proto.mt4_term_api.ConnectProxyReply.prototype.getData = function() {
  return /** @type{?proto.mt4_term_api.ConnectProxyData} */ (
    jspb.Message.getWrapperField(this, proto.mt4_term_api.ConnectProxyData, 1));
};


/**
 * @param {?proto.mt4_term_api.ConnectProxyData|undefined} value
 * @return {!proto.mt4_term_api.ConnectProxyReply} returns this
*/
proto.mt4_term_api.ConnectProxyReply.prototype.setData = function(value) {
  return jspb.Message.setOneofWrapperField(this, 1, proto.mt4_term_api.ConnectProxyReply.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.mt4_term_api.ConnectProxyReply} returns this
 */
proto.mt4_term_api.ConnectProxyReply.prototype.clearData = function() {
  return this.setData(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.mt4_term_api.ConnectProxyReply.prototype.hasData = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional Error error = 2;
 * @return {?proto.mt4_term_api.Error}
 */
proto.mt4_term_api.ConnectProxyReply.prototype.getError = function() {
  return /** @type{?proto.mt4_term_api.Error} */ (
    jspb.Message.getWrapperField(this, mrpc$mt4$error_pb.Error, 2));
};


/**
 * @param {?proto.mt4_term_api.Error|undefined} value
 * @return {!proto.mt4_term_api.ConnectProxyReply} returns this
*/
proto.mt4_term_api.ConnectProxyReply.prototype.setError = function(value) {
  return jspb.Message.setOneofWrapperField(this, 2, proto.mt4_term_api.ConnectProxyReply.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.mt4_term_api.ConnectProxyReply} returns this
 */
proto.mt4_term_api.ConnectProxyReply.prototype.clearError = function() {
  return this.setError(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.mt4_term_api.ConnectProxyReply.prototype.hasError = function() {
  return jspb.Message.getField(this, 2) != null;
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.mt4_term_api.ConnectProxyData.prototype.toObject = function(opt_includeInstance) {
  return proto.mt4_term_api.ConnectProxyData.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.mt4_term_api.ConnectProxyData} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.mt4_term_api.ConnectProxyData.toObject = function(includeInstance, msg) {
  var f, obj = {
    uniqueIdentifier: jspb.Message.getFieldWithDefault(msg, 1, ""),
    terminalType: jspb.Message.getFieldWithDefault(msg, 2, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.mt4_term_api.ConnectProxyData}
 */
proto.mt4_term_api.ConnectProxyData.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.mt4_term_api.ConnectProxyData;
  return proto.mt4_term_api.ConnectProxyData.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.mt4_term_api.ConnectProxyData} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.mt4_term_api.ConnectProxyData}
 */
proto.mt4_term_api.ConnectProxyData.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setUniqueIdentifier(value);
      break;
    case 2:
      var value = /** @type {!proto.mt4_term_api.TerminalType} */ (reader.readEnum());
      msg.setTerminalType(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.mt4_term_api.ConnectProxyData.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.mt4_term_api.ConnectProxyData.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.mt4_term_api.ConnectProxyData} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.mt4_term_api.ConnectProxyData.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getUniqueIdentifier();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getTerminalType();
  if (f !== 0.0) {
    writer.writeEnum(
      2,
      f
    );
  }
};


/**
 * optional string unique_identifier = 1;
 * @return {string}
 */
proto.mt4_term_api.ConnectProxyData.prototype.getUniqueIdentifier = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.mt4_term_api.ConnectProxyData} returns this
 */
proto.mt4_term_api.ConnectProxyData.prototype.setUniqueIdentifier = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional TerminalType terminal_type = 2;
 * @return {!proto.mt4_term_api.TerminalType}
 */
proto.mt4_term_api.ConnectProxyData.prototype.getTerminalType = function() {
  return /** @type {!proto.mt4_term_api.TerminalType} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/**
 * @param {!proto.mt4_term_api.TerminalType} value
 * @return {!proto.mt4_term_api.ConnectProxyData} returns this
 */
proto.mt4_term_api.ConnectProxyData.prototype.setTerminalType = function(value) {
  return jspb.Message.setProto3EnumField(this, 2, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.mt4_term_api.CheckConnectRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.mt4_term_api.CheckConnectRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.mt4_term_api.CheckConnectRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.mt4_term_api.CheckConnectRequest.toObject = function(includeInstance, msg) {
  var f, obj = {

  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.mt4_term_api.CheckConnectRequest}
 */
proto.mt4_term_api.CheckConnectRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.mt4_term_api.CheckConnectRequest;
  return proto.mt4_term_api.CheckConnectRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.mt4_term_api.CheckConnectRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.mt4_term_api.CheckConnectRequest}
 */
proto.mt4_term_api.CheckConnectRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.mt4_term_api.CheckConnectRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.mt4_term_api.CheckConnectRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.mt4_term_api.CheckConnectRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.mt4_term_api.CheckConnectRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
};



/**
 * Oneof group definitions for this message. Each group defines the field
 * numbers belonging to that group. When of these fields' value is set, all
 * other fields in the group are cleared. During deserialization, if multiple
 * fields are encountered for a group, only the last value seen will be kept.
 * @private {!Array<!Array<number>>}
 * @const
 */
proto.mt4_term_api.CheckConnectReply.oneofGroups_ = [[1,2]];

/**
 * @enum {number}
 */
proto.mt4_term_api.CheckConnectReply.ResponseCase = {
  RESPONSE_NOT_SET: 0,
  DATA: 1,
  ERROR: 2
};

/**
 * @return {proto.mt4_term_api.CheckConnectReply.ResponseCase}
 */
proto.mt4_term_api.CheckConnectReply.prototype.getResponseCase = function() {
  return /** @type {proto.mt4_term_api.CheckConnectReply.ResponseCase} */(jspb.Message.computeOneofCase(this, proto.mt4_term_api.CheckConnectReply.oneofGroups_[0]));
};



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.mt4_term_api.CheckConnectReply.prototype.toObject = function(opt_includeInstance) {
  return proto.mt4_term_api.CheckConnectReply.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.mt4_term_api.CheckConnectReply} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.mt4_term_api.CheckConnectReply.toObject = function(includeInstance, msg) {
  var f, obj = {
    data: (f = msg.getData()) && proto.mt4_term_api.CheckConnectData.toObject(includeInstance, f),
    error: (f = msg.getError()) && mrpc$mt4$error_pb.Error.toObject(includeInstance, f)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.mt4_term_api.CheckConnectReply}
 */
proto.mt4_term_api.CheckConnectReply.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.mt4_term_api.CheckConnectReply;
  return proto.mt4_term_api.CheckConnectReply.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.mt4_term_api.CheckConnectReply} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.mt4_term_api.CheckConnectReply}
 */
proto.mt4_term_api.CheckConnectReply.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.mt4_term_api.CheckConnectData;
      reader.readMessage(value,proto.mt4_term_api.CheckConnectData.deserializeBinaryFromReader);
      msg.setData(value);
      break;
    case 2:
      var value = new mrpc$mt4$error_pb.Error;
      reader.readMessage(value,mrpc$mt4$error_pb.Error.deserializeBinaryFromReader);
      msg.setError(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.mt4_term_api.CheckConnectReply.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.mt4_term_api.CheckConnectReply.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.mt4_term_api.CheckConnectReply} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.mt4_term_api.CheckConnectReply.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getData();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      proto.mt4_term_api.CheckConnectData.serializeBinaryToWriter
    );
  }
  f = message.getError();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      mrpc$mt4$error_pb.Error.serializeBinaryToWriter
    );
  }
};


/**
 * optional CheckConnectData data = 1;
 * @return {?proto.mt4_term_api.CheckConnectData}
 */
proto.mt4_term_api.CheckConnectReply.prototype.getData = function() {
  return /** @type{?proto.mt4_term_api.CheckConnectData} */ (
    jspb.Message.getWrapperField(this, proto.mt4_term_api.CheckConnectData, 1));
};


/**
 * @param {?proto.mt4_term_api.CheckConnectData|undefined} value
 * @return {!proto.mt4_term_api.CheckConnectReply} returns this
*/
proto.mt4_term_api.CheckConnectReply.prototype.setData = function(value) {
  return jspb.Message.setOneofWrapperField(this, 1, proto.mt4_term_api.CheckConnectReply.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.mt4_term_api.CheckConnectReply} returns this
 */
proto.mt4_term_api.CheckConnectReply.prototype.clearData = function() {
  return this.setData(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.mt4_term_api.CheckConnectReply.prototype.hasData = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional Error error = 2;
 * @return {?proto.mt4_term_api.Error}
 */
proto.mt4_term_api.CheckConnectReply.prototype.getError = function() {
  return /** @type{?proto.mt4_term_api.Error} */ (
    jspb.Message.getWrapperField(this, mrpc$mt4$error_pb.Error, 2));
};


/**
 * @param {?proto.mt4_term_api.Error|undefined} value
 * @return {!proto.mt4_term_api.CheckConnectReply} returns this
*/
proto.mt4_term_api.CheckConnectReply.prototype.setError = function(value) {
  return jspb.Message.setOneofWrapperField(this, 2, proto.mt4_term_api.CheckConnectReply.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.mt4_term_api.CheckConnectReply} returns this
 */
proto.mt4_term_api.CheckConnectReply.prototype.clearError = function() {
  return this.setError(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.mt4_term_api.CheckConnectReply.prototype.hasError = function() {
  return jspb.Message.getField(this, 2) != null;
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.mt4_term_api.CheckConnectData.prototype.toObject = function(opt_includeInstance) {
  return proto.mt4_term_api.CheckConnectData.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.mt4_term_api.CheckConnectData} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.mt4_term_api.CheckConnectData.toObject = function(includeInstance, msg) {
  var f, obj = {
    uniqueIdentifier: jspb.Message.getFieldWithDefault(msg, 1, ""),
    healthCheck: (f = msg.getHealthCheck()) && proto.mt4_term_api.TerminalHealthCheck.toObject(includeInstance, f)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.mt4_term_api.CheckConnectData}
 */
proto.mt4_term_api.CheckConnectData.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.mt4_term_api.CheckConnectData;
  return proto.mt4_term_api.CheckConnectData.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.mt4_term_api.CheckConnectData} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.mt4_term_api.CheckConnectData}
 */
proto.mt4_term_api.CheckConnectData.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setUniqueIdentifier(value);
      break;
    case 2:
      var value = new proto.mt4_term_api.TerminalHealthCheck;
      reader.readMessage(value,proto.mt4_term_api.TerminalHealthCheck.deserializeBinaryFromReader);
      msg.setHealthCheck(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.mt4_term_api.CheckConnectData.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.mt4_term_api.CheckConnectData.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.mt4_term_api.CheckConnectData} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.mt4_term_api.CheckConnectData.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getUniqueIdentifier();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getHealthCheck();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      proto.mt4_term_api.TerminalHealthCheck.serializeBinaryToWriter
    );
  }
};


/**
 * optional string unique_identifier = 1;
 * @return {string}
 */
proto.mt4_term_api.CheckConnectData.prototype.getUniqueIdentifier = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.mt4_term_api.CheckConnectData} returns this
 */
proto.mt4_term_api.CheckConnectData.prototype.setUniqueIdentifier = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional TerminalHealthCheck health_check = 2;
 * @return {?proto.mt4_term_api.TerminalHealthCheck}
 */
proto.mt4_term_api.CheckConnectData.prototype.getHealthCheck = function() {
  return /** @type{?proto.mt4_term_api.TerminalHealthCheck} */ (
    jspb.Message.getWrapperField(this, proto.mt4_term_api.TerminalHealthCheck, 2));
};


/**
 * @param {?proto.mt4_term_api.TerminalHealthCheck|undefined} value
 * @return {!proto.mt4_term_api.CheckConnectData} returns this
*/
proto.mt4_term_api.CheckConnectData.prototype.setHealthCheck = function(value) {
  return jspb.Message.setWrapperField(this, 2, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.mt4_term_api.CheckConnectData} returns this
 */
proto.mt4_term_api.CheckConnectData.prototype.clearHealthCheck = function() {
  return this.setHealthCheck(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.mt4_term_api.CheckConnectData.prototype.hasHealthCheck = function() {
  return jspb.Message.getField(this, 2) != null;
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.mt4_term_api.TerminalHealthCheck.prototype.toObject = function(opt_includeInstance) {
  return proto.mt4_term_api.TerminalHealthCheck.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.mt4_term_api.TerminalHealthCheck} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.mt4_term_api.TerminalHealthCheck.toObject = function(includeInstance, msg) {
  var f, obj = {
    isAlive: jspb.Message.getBooleanFieldWithDefault(msg, 1, false),
    apiIsAlive: jspb.Message.getBooleanFieldWithDefault(msg, 2, false),
    terminalIsConnectedToMtServer: jspb.Message.getBooleanFieldWithDefault(msg, 3, false)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.mt4_term_api.TerminalHealthCheck}
 */
proto.mt4_term_api.TerminalHealthCheck.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.mt4_term_api.TerminalHealthCheck;
  return proto.mt4_term_api.TerminalHealthCheck.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.mt4_term_api.TerminalHealthCheck} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.mt4_term_api.TerminalHealthCheck}
 */
proto.mt4_term_api.TerminalHealthCheck.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setIsAlive(value);
      break;
    case 2:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setApiIsAlive(value);
      break;
    case 3:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setTerminalIsConnectedToMtServer(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.mt4_term_api.TerminalHealthCheck.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.mt4_term_api.TerminalHealthCheck.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.mt4_term_api.TerminalHealthCheck} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.mt4_term_api.TerminalHealthCheck.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getIsAlive();
  if (f) {
    writer.writeBool(
      1,
      f
    );
  }
  f = message.getApiIsAlive();
  if (f) {
    writer.writeBool(
      2,
      f
    );
  }
  f = message.getTerminalIsConnectedToMtServer();
  if (f) {
    writer.writeBool(
      3,
      f
    );
  }
};


/**
 * optional bool is_alive = 1;
 * @return {boolean}
 */
proto.mt4_term_api.TerminalHealthCheck.prototype.getIsAlive = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 1, false));
};


/**
 * @param {boolean} value
 * @return {!proto.mt4_term_api.TerminalHealthCheck} returns this
 */
proto.mt4_term_api.TerminalHealthCheck.prototype.setIsAlive = function(value) {
  return jspb.Message.setProto3BooleanField(this, 1, value);
};


/**
 * optional bool api_is_alive = 2;
 * @return {boolean}
 */
proto.mt4_term_api.TerminalHealthCheck.prototype.getApiIsAlive = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 2, false));
};


/**
 * @param {boolean} value
 * @return {!proto.mt4_term_api.TerminalHealthCheck} returns this
 */
proto.mt4_term_api.TerminalHealthCheck.prototype.setApiIsAlive = function(value) {
  return jspb.Message.setProto3BooleanField(this, 2, value);
};


/**
 * optional bool terminal_is_connected_to_mt_server = 3;
 * @return {boolean}
 */
proto.mt4_term_api.TerminalHealthCheck.prototype.getTerminalIsConnectedToMtServer = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 3, false));
};


/**
 * @param {boolean} value
 * @return {!proto.mt4_term_api.TerminalHealthCheck} returns this
 */
proto.mt4_term_api.TerminalHealthCheck.prototype.setTerminalIsConnectedToMtServer = function(value) {
  return jspb.Message.setProto3BooleanField(this, 3, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.mt4_term_api.DisconnectRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.mt4_term_api.DisconnectRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.mt4_term_api.DisconnectRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.mt4_term_api.DisconnectRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    reason: jspb.Message.getFieldWithDefault(msg, 1, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.mt4_term_api.DisconnectRequest}
 */
proto.mt4_term_api.DisconnectRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.mt4_term_api.DisconnectRequest;
  return proto.mt4_term_api.DisconnectRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.mt4_term_api.DisconnectRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.mt4_term_api.DisconnectRequest}
 */
proto.mt4_term_api.DisconnectRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setReason(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.mt4_term_api.DisconnectRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.mt4_term_api.DisconnectRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.mt4_term_api.DisconnectRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.mt4_term_api.DisconnectRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = /** @type {string} */ (jspb.Message.getField(message, 1));
  if (f != null) {
    writer.writeString(
      1,
      f
    );
  }
};


/**
 * optional string reason = 1;
 * @return {string}
 */
proto.mt4_term_api.DisconnectRequest.prototype.getReason = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.mt4_term_api.DisconnectRequest} returns this
 */
proto.mt4_term_api.DisconnectRequest.prototype.setReason = function(value) {
  return jspb.Message.setField(this, 1, value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.mt4_term_api.DisconnectRequest} returns this
 */
proto.mt4_term_api.DisconnectRequest.prototype.clearReason = function() {
  return jspb.Message.setField(this, 1, undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.mt4_term_api.DisconnectRequest.prototype.hasReason = function() {
  return jspb.Message.getField(this, 1) != null;
};



/**
 * Oneof group definitions for this message. Each group defines the field
 * numbers belonging to that group. When of these fields' value is set, all
 * other fields in the group are cleared. During deserialization, if multiple
 * fields are encountered for a group, only the last value seen will be kept.
 * @private {!Array<!Array<number>>}
 * @const
 */
proto.mt4_term_api.DisconnectReply.oneofGroups_ = [[1,2]];

/**
 * @enum {number}
 */
proto.mt4_term_api.DisconnectReply.ResponseCase = {
  RESPONSE_NOT_SET: 0,
  DATA: 1,
  ERROR: 2
};

/**
 * @return {proto.mt4_term_api.DisconnectReply.ResponseCase}
 */
proto.mt4_term_api.DisconnectReply.prototype.getResponseCase = function() {
  return /** @type {proto.mt4_term_api.DisconnectReply.ResponseCase} */(jspb.Message.computeOneofCase(this, proto.mt4_term_api.DisconnectReply.oneofGroups_[0]));
};



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.mt4_term_api.DisconnectReply.prototype.toObject = function(opt_includeInstance) {
  return proto.mt4_term_api.DisconnectReply.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.mt4_term_api.DisconnectReply} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.mt4_term_api.DisconnectReply.toObject = function(includeInstance, msg) {
  var f, obj = {
    data: (f = msg.getData()) && proto.mt4_term_api.DisconnectData.toObject(includeInstance, f),
    error: (f = msg.getError()) && mrpc$mt4$error_pb.Error.toObject(includeInstance, f)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.mt4_term_api.DisconnectReply}
 */
proto.mt4_term_api.DisconnectReply.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.mt4_term_api.DisconnectReply;
  return proto.mt4_term_api.DisconnectReply.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.mt4_term_api.DisconnectReply} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.mt4_term_api.DisconnectReply}
 */
proto.mt4_term_api.DisconnectReply.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.mt4_term_api.DisconnectData;
      reader.readMessage(value,proto.mt4_term_api.DisconnectData.deserializeBinaryFromReader);
      msg.setData(value);
      break;
    case 2:
      var value = new mrpc$mt4$error_pb.Error;
      reader.readMessage(value,mrpc$mt4$error_pb.Error.deserializeBinaryFromReader);
      msg.setError(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.mt4_term_api.DisconnectReply.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.mt4_term_api.DisconnectReply.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.mt4_term_api.DisconnectReply} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.mt4_term_api.DisconnectReply.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getData();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      proto.mt4_term_api.DisconnectData.serializeBinaryToWriter
    );
  }
  f = message.getError();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      mrpc$mt4$error_pb.Error.serializeBinaryToWriter
    );
  }
};


/**
 * optional DisconnectData data = 1;
 * @return {?proto.mt4_term_api.DisconnectData}
 */
proto.mt4_term_api.DisconnectReply.prototype.getData = function() {
  return /** @type{?proto.mt4_term_api.DisconnectData} */ (
    jspb.Message.getWrapperField(this, proto.mt4_term_api.DisconnectData, 1));
};


/**
 * @param {?proto.mt4_term_api.DisconnectData|undefined} value
 * @return {!proto.mt4_term_api.DisconnectReply} returns this
*/
proto.mt4_term_api.DisconnectReply.prototype.setData = function(value) {
  return jspb.Message.setOneofWrapperField(this, 1, proto.mt4_term_api.DisconnectReply.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.mt4_term_api.DisconnectReply} returns this
 */
proto.mt4_term_api.DisconnectReply.prototype.clearData = function() {
  return this.setData(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.mt4_term_api.DisconnectReply.prototype.hasData = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional Error error = 2;
 * @return {?proto.mt4_term_api.Error}
 */
proto.mt4_term_api.DisconnectReply.prototype.getError = function() {
  return /** @type{?proto.mt4_term_api.Error} */ (
    jspb.Message.getWrapperField(this, mrpc$mt4$error_pb.Error, 2));
};


/**
 * @param {?proto.mt4_term_api.Error|undefined} value
 * @return {!proto.mt4_term_api.DisconnectReply} returns this
*/
proto.mt4_term_api.DisconnectReply.prototype.setError = function(value) {
  return jspb.Message.setOneofWrapperField(this, 2, proto.mt4_term_api.DisconnectReply.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.mt4_term_api.DisconnectReply} returns this
 */
proto.mt4_term_api.DisconnectReply.prototype.clearError = function() {
  return this.setError(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.mt4_term_api.DisconnectReply.prototype.hasError = function() {
  return jspb.Message.getField(this, 2) != null;
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.mt4_term_api.DisconnectData.prototype.toObject = function(opt_includeInstance) {
  return proto.mt4_term_api.DisconnectData.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.mt4_term_api.DisconnectData} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.mt4_term_api.DisconnectData.toObject = function(includeInstance, msg) {
  var f, obj = {
    uniqueIdentifier: jspb.Message.getFieldWithDefault(msg, 1, ""),
    fullLifeTimeSeconds: jspb.Message.getFieldWithDefault(msg, 2, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.mt4_term_api.DisconnectData}
 */
proto.mt4_term_api.DisconnectData.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.mt4_term_api.DisconnectData;
  return proto.mt4_term_api.DisconnectData.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.mt4_term_api.DisconnectData} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.mt4_term_api.DisconnectData}
 */
proto.mt4_term_api.DisconnectData.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setUniqueIdentifier(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setFullLifeTimeSeconds(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.mt4_term_api.DisconnectData.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.mt4_term_api.DisconnectData.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.mt4_term_api.DisconnectData} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.mt4_term_api.DisconnectData.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getUniqueIdentifier();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getFullLifeTimeSeconds();
  if (f !== 0) {
    writer.writeInt64(
      2,
      f
    );
  }
};


/**
 * optional string unique_identifier = 1;
 * @return {string}
 */
proto.mt4_term_api.DisconnectData.prototype.getUniqueIdentifier = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.mt4_term_api.DisconnectData} returns this
 */
proto.mt4_term_api.DisconnectData.prototype.setUniqueIdentifier = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional int64 full_life_time_seconds = 2;
 * @return {number}
 */
proto.mt4_term_api.DisconnectData.prototype.getFullLifeTimeSeconds = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/**
 * @param {number} value
 * @return {!proto.mt4_term_api.DisconnectData} returns this
 */
proto.mt4_term_api.DisconnectData.prototype.setFullLifeTimeSeconds = function(value) {
  return jspb.Message.setProto3IntField(this, 2, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.mt4_term_api.GetIdRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.mt4_term_api.GetIdRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.mt4_term_api.GetIdRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.mt4_term_api.GetIdRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    user: jspb.Message.getFieldWithDefault(msg, 1, ""),
    password: jspb.Message.getFieldWithDefault(msg, 2, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.mt4_term_api.GetIdRequest}
 */
proto.mt4_term_api.GetIdRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.mt4_term_api.GetIdRequest;
  return proto.mt4_term_api.GetIdRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.mt4_term_api.GetIdRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.mt4_term_api.GetIdRequest}
 */
proto.mt4_term_api.GetIdRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setUser(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setPassword(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.mt4_term_api.GetIdRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.mt4_term_api.GetIdRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.mt4_term_api.GetIdRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.mt4_term_api.GetIdRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getUser();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getPassword();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
};


/**
 * optional string user = 1;
 * @return {string}
 */
proto.mt4_term_api.GetIdRequest.prototype.getUser = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.mt4_term_api.GetIdRequest} returns this
 */
proto.mt4_term_api.GetIdRequest.prototype.setUser = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string password = 2;
 * @return {string}
 */
proto.mt4_term_api.GetIdRequest.prototype.getPassword = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.mt4_term_api.GetIdRequest} returns this
 */
proto.mt4_term_api.GetIdRequest.prototype.setPassword = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};



/**
 * Oneof group definitions for this message. Each group defines the field
 * numbers belonging to that group. When of these fields' value is set, all
 * other fields in the group are cleared. During deserialization, if multiple
 * fields are encountered for a group, only the last value seen will be kept.
 * @private {!Array<!Array<number>>}
 * @const
 */
proto.mt4_term_api.GetIdReply.oneofGroups_ = [[1,2]];

/**
 * @enum {number}
 */
proto.mt4_term_api.GetIdReply.ResponseCase = {
  RESPONSE_NOT_SET: 0,
  DATA: 1,
  ERROR: 2
};

/**
 * @return {proto.mt4_term_api.GetIdReply.ResponseCase}
 */
proto.mt4_term_api.GetIdReply.prototype.getResponseCase = function() {
  return /** @type {proto.mt4_term_api.GetIdReply.ResponseCase} */(jspb.Message.computeOneofCase(this, proto.mt4_term_api.GetIdReply.oneofGroups_[0]));
};



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.mt4_term_api.GetIdReply.prototype.toObject = function(opt_includeInstance) {
  return proto.mt4_term_api.GetIdReply.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.mt4_term_api.GetIdReply} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.mt4_term_api.GetIdReply.toObject = function(includeInstance, msg) {
  var f, obj = {
    data: (f = msg.getData()) && proto.mt4_term_api.GetIdData.toObject(includeInstance, f),
    error: (f = msg.getError()) && mrpc$mt4$error_pb.Error.toObject(includeInstance, f)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.mt4_term_api.GetIdReply}
 */
proto.mt4_term_api.GetIdReply.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.mt4_term_api.GetIdReply;
  return proto.mt4_term_api.GetIdReply.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.mt4_term_api.GetIdReply} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.mt4_term_api.GetIdReply}
 */
proto.mt4_term_api.GetIdReply.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.mt4_term_api.GetIdData;
      reader.readMessage(value,proto.mt4_term_api.GetIdData.deserializeBinaryFromReader);
      msg.setData(value);
      break;
    case 2:
      var value = new mrpc$mt4$error_pb.Error;
      reader.readMessage(value,mrpc$mt4$error_pb.Error.deserializeBinaryFromReader);
      msg.setError(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.mt4_term_api.GetIdReply.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.mt4_term_api.GetIdReply.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.mt4_term_api.GetIdReply} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.mt4_term_api.GetIdReply.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getData();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      proto.mt4_term_api.GetIdData.serializeBinaryToWriter
    );
  }
  f = message.getError();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      mrpc$mt4$error_pb.Error.serializeBinaryToWriter
    );
  }
};


/**
 * optional GetIdData data = 1;
 * @return {?proto.mt4_term_api.GetIdData}
 */
proto.mt4_term_api.GetIdReply.prototype.getData = function() {
  return /** @type{?proto.mt4_term_api.GetIdData} */ (
    jspb.Message.getWrapperField(this, proto.mt4_term_api.GetIdData, 1));
};


/**
 * @param {?proto.mt4_term_api.GetIdData|undefined} value
 * @return {!proto.mt4_term_api.GetIdReply} returns this
*/
proto.mt4_term_api.GetIdReply.prototype.setData = function(value) {
  return jspb.Message.setOneofWrapperField(this, 1, proto.mt4_term_api.GetIdReply.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.mt4_term_api.GetIdReply} returns this
 */
proto.mt4_term_api.GetIdReply.prototype.clearData = function() {
  return this.setData(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.mt4_term_api.GetIdReply.prototype.hasData = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional Error error = 2;
 * @return {?proto.mt4_term_api.Error}
 */
proto.mt4_term_api.GetIdReply.prototype.getError = function() {
  return /** @type{?proto.mt4_term_api.Error} */ (
    jspb.Message.getWrapperField(this, mrpc$mt4$error_pb.Error, 2));
};


/**
 * @param {?proto.mt4_term_api.Error|undefined} value
 * @return {!proto.mt4_term_api.GetIdReply} returns this
*/
proto.mt4_term_api.GetIdReply.prototype.setError = function(value) {
  return jspb.Message.setOneofWrapperField(this, 2, proto.mt4_term_api.GetIdReply.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.mt4_term_api.GetIdReply} returns this
 */
proto.mt4_term_api.GetIdReply.prototype.clearError = function() {
  return this.setError(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.mt4_term_api.GetIdReply.prototype.hasError = function() {
  return jspb.Message.getField(this, 2) != null;
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.mt4_term_api.GetIdData.prototype.toObject = function(opt_includeInstance) {
  return proto.mt4_term_api.GetIdData.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.mt4_term_api.GetIdData} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.mt4_term_api.GetIdData.toObject = function(includeInstance, msg) {
  var f, obj = {
    id: jspb.Message.getFieldWithDefault(msg, 1, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.mt4_term_api.GetIdData}
 */
proto.mt4_term_api.GetIdData.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.mt4_term_api.GetIdData;
  return proto.mt4_term_api.GetIdData.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.mt4_term_api.GetIdData} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.mt4_term_api.GetIdData}
 */
proto.mt4_term_api.GetIdData.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setId(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.mt4_term_api.GetIdData.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.mt4_term_api.GetIdData.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.mt4_term_api.GetIdData} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.mt4_term_api.GetIdData.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getId();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
};


/**
 * optional string id = 1;
 * @return {string}
 */
proto.mt4_term_api.GetIdData.prototype.getId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.mt4_term_api.GetIdData} returns this
 */
proto.mt4_term_api.GetIdData.prototype.setId = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.mt4_term_api.ConnectStateRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.mt4_term_api.ConnectStateRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.mt4_term_api.ConnectStateRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.mt4_term_api.ConnectStateRequest.toObject = function(includeInstance, msg) {
  var f, obj = {

  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.mt4_term_api.ConnectStateRequest}
 */
proto.mt4_term_api.ConnectStateRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.mt4_term_api.ConnectStateRequest;
  return proto.mt4_term_api.ConnectStateRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.mt4_term_api.ConnectStateRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.mt4_term_api.ConnectStateRequest}
 */
proto.mt4_term_api.ConnectStateRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.mt4_term_api.ConnectStateRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.mt4_term_api.ConnectStateRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.mt4_term_api.ConnectStateRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.mt4_term_api.ConnectStateRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
};



/**
 * Oneof group definitions for this message. Each group defines the field
 * numbers belonging to that group. When of these fields' value is set, all
 * other fields in the group are cleared. During deserialization, if multiple
 * fields are encountered for a group, only the last value seen will be kept.
 * @private {!Array<!Array<number>>}
 * @const
 */
proto.mt4_term_api.ConnectStateReply.oneofGroups_ = [[1,2]];

/**
 * @enum {number}
 */
proto.mt4_term_api.ConnectStateReply.ResponseCase = {
  RESPONSE_NOT_SET: 0,
  DATA: 1,
  ERROR: 2
};

/**
 * @return {proto.mt4_term_api.ConnectStateReply.ResponseCase}
 */
proto.mt4_term_api.ConnectStateReply.prototype.getResponseCase = function() {
  return /** @type {proto.mt4_term_api.ConnectStateReply.ResponseCase} */(jspb.Message.computeOneofCase(this, proto.mt4_term_api.ConnectStateReply.oneofGroups_[0]));
};



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.mt4_term_api.ConnectStateReply.prototype.toObject = function(opt_includeInstance) {
  return proto.mt4_term_api.ConnectStateReply.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.mt4_term_api.ConnectStateReply} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.mt4_term_api.ConnectStateReply.toObject = function(includeInstance, msg) {
  var f, obj = {
    data: (f = msg.getData()) && proto.mt4_term_api.ConnectStateData.toObject(includeInstance, f),
    error: (f = msg.getError()) && mrpc$mt4$error_pb.Error.toObject(includeInstance, f)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.mt4_term_api.ConnectStateReply}
 */
proto.mt4_term_api.ConnectStateReply.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.mt4_term_api.ConnectStateReply;
  return proto.mt4_term_api.ConnectStateReply.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.mt4_term_api.ConnectStateReply} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.mt4_term_api.ConnectStateReply}
 */
proto.mt4_term_api.ConnectStateReply.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.mt4_term_api.ConnectStateData;
      reader.readMessage(value,proto.mt4_term_api.ConnectStateData.deserializeBinaryFromReader);
      msg.setData(value);
      break;
    case 2:
      var value = new mrpc$mt4$error_pb.Error;
      reader.readMessage(value,mrpc$mt4$error_pb.Error.deserializeBinaryFromReader);
      msg.setError(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.mt4_term_api.ConnectStateReply.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.mt4_term_api.ConnectStateReply.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.mt4_term_api.ConnectStateReply} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.mt4_term_api.ConnectStateReply.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getData();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      proto.mt4_term_api.ConnectStateData.serializeBinaryToWriter
    );
  }
  f = message.getError();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      mrpc$mt4$error_pb.Error.serializeBinaryToWriter
    );
  }
};


/**
 * optional ConnectStateData data = 1;
 * @return {?proto.mt4_term_api.ConnectStateData}
 */
proto.mt4_term_api.ConnectStateReply.prototype.getData = function() {
  return /** @type{?proto.mt4_term_api.ConnectStateData} */ (
    jspb.Message.getWrapperField(this, proto.mt4_term_api.ConnectStateData, 1));
};


/**
 * @param {?proto.mt4_term_api.ConnectStateData|undefined} value
 * @return {!proto.mt4_term_api.ConnectStateReply} returns this
*/
proto.mt4_term_api.ConnectStateReply.prototype.setData = function(value) {
  return jspb.Message.setOneofWrapperField(this, 1, proto.mt4_term_api.ConnectStateReply.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.mt4_term_api.ConnectStateReply} returns this
 */
proto.mt4_term_api.ConnectStateReply.prototype.clearData = function() {
  return this.setData(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.mt4_term_api.ConnectStateReply.prototype.hasData = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional Error error = 2;
 * @return {?proto.mt4_term_api.Error}
 */
proto.mt4_term_api.ConnectStateReply.prototype.getError = function() {
  return /** @type{?proto.mt4_term_api.Error} */ (
    jspb.Message.getWrapperField(this, mrpc$mt4$error_pb.Error, 2));
};


/**
 * @param {?proto.mt4_term_api.Error|undefined} value
 * @return {!proto.mt4_term_api.ConnectStateReply} returns this
*/
proto.mt4_term_api.ConnectStateReply.prototype.setError = function(value) {
  return jspb.Message.setOneofWrapperField(this, 2, proto.mt4_term_api.ConnectStateReply.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.mt4_term_api.ConnectStateReply} returns this
 */
proto.mt4_term_api.ConnectStateReply.prototype.clearError = function() {
  return this.setError(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.mt4_term_api.ConnectStateReply.prototype.hasError = function() {
  return jspb.Message.getField(this, 2) != null;
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.mt4_term_api.OnConnectStateRequest.repeatedFields_ = [1];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.mt4_term_api.OnConnectStateRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.mt4_term_api.OnConnectStateRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.mt4_term_api.OnConnectStateRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.mt4_term_api.OnConnectStateRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    terminalIdsList: (f = jspb.Message.getRepeatedField(msg, 1)) == null ? undefined : f
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.mt4_term_api.OnConnectStateRequest}
 */
proto.mt4_term_api.OnConnectStateRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.mt4_term_api.OnConnectStateRequest;
  return proto.mt4_term_api.OnConnectStateRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.mt4_term_api.OnConnectStateRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.mt4_term_api.OnConnectStateRequest}
 */
proto.mt4_term_api.OnConnectStateRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.addTerminalIds(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.mt4_term_api.OnConnectStateRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.mt4_term_api.OnConnectStateRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.mt4_term_api.OnConnectStateRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.mt4_term_api.OnConnectStateRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getTerminalIdsList();
  if (f.length > 0) {
    writer.writeRepeatedString(
      1,
      f
    );
  }
};


/**
 * repeated string terminal_ids = 1;
 * @return {!Array<string>}
 */
proto.mt4_term_api.OnConnectStateRequest.prototype.getTerminalIdsList = function() {
  return /** @type {!Array<string>} */ (jspb.Message.getRepeatedField(this, 1));
};


/**
 * @param {!Array<string>} value
 * @return {!proto.mt4_term_api.OnConnectStateRequest} returns this
 */
proto.mt4_term_api.OnConnectStateRequest.prototype.setTerminalIdsList = function(value) {
  return jspb.Message.setField(this, 1, value || []);
};


/**
 * @param {string} value
 * @param {number=} opt_index
 * @return {!proto.mt4_term_api.OnConnectStateRequest} returns this
 */
proto.mt4_term_api.OnConnectStateRequest.prototype.addTerminalIds = function(value, opt_index) {
  return jspb.Message.addToRepeatedField(this, 1, value, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.mt4_term_api.OnConnectStateRequest} returns this
 */
proto.mt4_term_api.OnConnectStateRequest.prototype.clearTerminalIdsList = function() {
  return this.setTerminalIdsList([]);
};



/**
 * Oneof group definitions for this message. Each group defines the field
 * numbers belonging to that group. When of these fields' value is set, all
 * other fields in the group are cleared. During deserialization, if multiple
 * fields are encountered for a group, only the last value seen will be kept.
 * @private {!Array<!Array<number>>}
 * @const
 */
proto.mt4_term_api.OnConnectStateReply.oneofGroups_ = [[1,2]];

/**
 * @enum {number}
 */
proto.mt4_term_api.OnConnectStateReply.ResponseCase = {
  RESPONSE_NOT_SET: 0,
  DATA: 1,
  ERROR: 2
};

/**
 * @return {proto.mt4_term_api.OnConnectStateReply.ResponseCase}
 */
proto.mt4_term_api.OnConnectStateReply.prototype.getResponseCase = function() {
  return /** @type {proto.mt4_term_api.OnConnectStateReply.ResponseCase} */(jspb.Message.computeOneofCase(this, proto.mt4_term_api.OnConnectStateReply.oneofGroups_[0]));
};



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.mt4_term_api.OnConnectStateReply.prototype.toObject = function(opt_includeInstance) {
  return proto.mt4_term_api.OnConnectStateReply.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.mt4_term_api.OnConnectStateReply} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.mt4_term_api.OnConnectStateReply.toObject = function(includeInstance, msg) {
  var f, obj = {
    data: (f = msg.getData()) && proto.mt4_term_api.ConnectStateData.toObject(includeInstance, f),
    error: (f = msg.getError()) && mrpc$mt4$error_pb.Error.toObject(includeInstance, f)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.mt4_term_api.OnConnectStateReply}
 */
proto.mt4_term_api.OnConnectStateReply.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.mt4_term_api.OnConnectStateReply;
  return proto.mt4_term_api.OnConnectStateReply.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.mt4_term_api.OnConnectStateReply} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.mt4_term_api.OnConnectStateReply}
 */
proto.mt4_term_api.OnConnectStateReply.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.mt4_term_api.ConnectStateData;
      reader.readMessage(value,proto.mt4_term_api.ConnectStateData.deserializeBinaryFromReader);
      msg.setData(value);
      break;
    case 2:
      var value = new mrpc$mt4$error_pb.Error;
      reader.readMessage(value,mrpc$mt4$error_pb.Error.deserializeBinaryFromReader);
      msg.setError(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.mt4_term_api.OnConnectStateReply.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.mt4_term_api.OnConnectStateReply.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.mt4_term_api.OnConnectStateReply} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.mt4_term_api.OnConnectStateReply.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getData();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      proto.mt4_term_api.ConnectStateData.serializeBinaryToWriter
    );
  }
  f = message.getError();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      mrpc$mt4$error_pb.Error.serializeBinaryToWriter
    );
  }
};


/**
 * optional ConnectStateData data = 1;
 * @return {?proto.mt4_term_api.ConnectStateData}
 */
proto.mt4_term_api.OnConnectStateReply.prototype.getData = function() {
  return /** @type{?proto.mt4_term_api.ConnectStateData} */ (
    jspb.Message.getWrapperField(this, proto.mt4_term_api.ConnectStateData, 1));
};


/**
 * @param {?proto.mt4_term_api.ConnectStateData|undefined} value
 * @return {!proto.mt4_term_api.OnConnectStateReply} returns this
*/
proto.mt4_term_api.OnConnectStateReply.prototype.setData = function(value) {
  return jspb.Message.setOneofWrapperField(this, 1, proto.mt4_term_api.OnConnectStateReply.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.mt4_term_api.OnConnectStateReply} returns this
 */
proto.mt4_term_api.OnConnectStateReply.prototype.clearData = function() {
  return this.setData(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.mt4_term_api.OnConnectStateReply.prototype.hasData = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional Error error = 2;
 * @return {?proto.mt4_term_api.Error}
 */
proto.mt4_term_api.OnConnectStateReply.prototype.getError = function() {
  return /** @type{?proto.mt4_term_api.Error} */ (
    jspb.Message.getWrapperField(this, mrpc$mt4$error_pb.Error, 2));
};


/**
 * @param {?proto.mt4_term_api.Error|undefined} value
 * @return {!proto.mt4_term_api.OnConnectStateReply} returns this
*/
proto.mt4_term_api.OnConnectStateReply.prototype.setError = function(value) {
  return jspb.Message.setOneofWrapperField(this, 2, proto.mt4_term_api.OnConnectStateReply.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.mt4_term_api.OnConnectStateReply} returns this
 */
proto.mt4_term_api.OnConnectStateReply.prototype.clearError = function() {
  return this.setError(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.mt4_term_api.OnConnectStateReply.prototype.hasError = function() {
  return jspb.Message.getField(this, 2) != null;
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.mt4_term_api.ConnectStateData.prototype.toObject = function(opt_includeInstance) {
  return proto.mt4_term_api.ConnectStateData.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.mt4_term_api.ConnectStateData} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.mt4_term_api.ConnectStateData.toObject = function(includeInstance, msg) {
  var f, obj = {
    id: jspb.Message.getFieldWithDefault(msg, 1, ""),
    state: jspb.Message.getFieldWithDefault(msg, 2, ""),
    isConnected: jspb.Message.getBooleanFieldWithDefault(msg, 3, false),
    isAlive: jspb.Message.getBooleanFieldWithDefault(msg, 4, false),
    apiIsAlive: jspb.Message.getBooleanFieldWithDefault(msg, 5, false),
    server: jspb.Message.getFieldWithDefault(msg, 6, ""),
    account: jspb.Message.getFieldWithDefault(msg, 7, 0),
    errorMessage: jspb.Message.getFieldWithDefault(msg, 8, ""),
    timestamp: (f = msg.getTimestamp()) && google_protobuf_timestamp_pb.Timestamp.toObject(includeInstance, f)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.mt4_term_api.ConnectStateData}
 */
proto.mt4_term_api.ConnectStateData.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.mt4_term_api.ConnectStateData;
  return proto.mt4_term_api.ConnectStateData.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.mt4_term_api.ConnectStateData} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.mt4_term_api.ConnectStateData}
 */
proto.mt4_term_api.ConnectStateData.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setId(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setState(value);
      break;
    case 3:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setIsConnected(value);
      break;
    case 4:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setIsAlive(value);
      break;
    case 5:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setApiIsAlive(value);
      break;
    case 6:
      var value = /** @type {string} */ (reader.readString());
      msg.setServer(value);
      break;
    case 7:
      var value = /** @type {number} */ (reader.readUint64());
      msg.setAccount(value);
      break;
    case 8:
      var value = /** @type {string} */ (reader.readString());
      msg.setErrorMessage(value);
      break;
    case 9:
      var value = new google_protobuf_timestamp_pb.Timestamp;
      reader.readMessage(value,google_protobuf_timestamp_pb.Timestamp.deserializeBinaryFromReader);
      msg.setTimestamp(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.mt4_term_api.ConnectStateData.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.mt4_term_api.ConnectStateData.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.mt4_term_api.ConnectStateData} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.mt4_term_api.ConnectStateData.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getId();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getState();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getIsConnected();
  if (f) {
    writer.writeBool(
      3,
      f
    );
  }
  f = message.getIsAlive();
  if (f) {
    writer.writeBool(
      4,
      f
    );
  }
  f = message.getApiIsAlive();
  if (f) {
    writer.writeBool(
      5,
      f
    );
  }
  f = message.getServer();
  if (f.length > 0) {
    writer.writeString(
      6,
      f
    );
  }
  f = message.getAccount();
  if (f !== 0) {
    writer.writeUint64(
      7,
      f
    );
  }
  f = message.getErrorMessage();
  if (f.length > 0) {
    writer.writeString(
      8,
      f
    );
  }
  f = message.getTimestamp();
  if (f != null) {
    writer.writeMessage(
      9,
      f,
      google_protobuf_timestamp_pb.Timestamp.serializeBinaryToWriter
    );
  }
};


/**
 * optional string id = 1;
 * @return {string}
 */
proto.mt4_term_api.ConnectStateData.prototype.getId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.mt4_term_api.ConnectStateData} returns this
 */
proto.mt4_term_api.ConnectStateData.prototype.setId = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string state = 2;
 * @return {string}
 */
proto.mt4_term_api.ConnectStateData.prototype.getState = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.mt4_term_api.ConnectStateData} returns this
 */
proto.mt4_term_api.ConnectStateData.prototype.setState = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional bool is_connected = 3;
 * @return {boolean}
 */
proto.mt4_term_api.ConnectStateData.prototype.getIsConnected = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 3, false));
};


/**
 * @param {boolean} value
 * @return {!proto.mt4_term_api.ConnectStateData} returns this
 */
proto.mt4_term_api.ConnectStateData.prototype.setIsConnected = function(value) {
  return jspb.Message.setProto3BooleanField(this, 3, value);
};


/**
 * optional bool is_alive = 4;
 * @return {boolean}
 */
proto.mt4_term_api.ConnectStateData.prototype.getIsAlive = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 4, false));
};


/**
 * @param {boolean} value
 * @return {!proto.mt4_term_api.ConnectStateData} returns this
 */
proto.mt4_term_api.ConnectStateData.prototype.setIsAlive = function(value) {
  return jspb.Message.setProto3BooleanField(this, 4, value);
};


/**
 * optional bool api_is_alive = 5;
 * @return {boolean}
 */
proto.mt4_term_api.ConnectStateData.prototype.getApiIsAlive = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 5, false));
};


/**
 * @param {boolean} value
 * @return {!proto.mt4_term_api.ConnectStateData} returns this
 */
proto.mt4_term_api.ConnectStateData.prototype.setApiIsAlive = function(value) {
  return jspb.Message.setProto3BooleanField(this, 5, value);
};


/**
 * optional string server = 6;
 * @return {string}
 */
proto.mt4_term_api.ConnectStateData.prototype.getServer = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 6, ""));
};


/**
 * @param {string} value
 * @return {!proto.mt4_term_api.ConnectStateData} returns this
 */
proto.mt4_term_api.ConnectStateData.prototype.setServer = function(value) {
  return jspb.Message.setProto3StringField(this, 6, value);
};


/**
 * optional uint64 account = 7;
 * @return {number}
 */
proto.mt4_term_api.ConnectStateData.prototype.getAccount = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 7, 0));
};


/**
 * @param {number} value
 * @return {!proto.mt4_term_api.ConnectStateData} returns this
 */
proto.mt4_term_api.ConnectStateData.prototype.setAccount = function(value) {
  return jspb.Message.setProto3IntField(this, 7, value);
};


/**
 * optional string error_message = 8;
 * @return {string}
 */
proto.mt4_term_api.ConnectStateData.prototype.getErrorMessage = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 8, ""));
};


/**
 * @param {string} value
 * @return {!proto.mt4_term_api.ConnectStateData} returns this
 */
proto.mt4_term_api.ConnectStateData.prototype.setErrorMessage = function(value) {
  return jspb.Message.setProto3StringField(this, 8, value);
};


/**
 * optional google.protobuf.Timestamp timestamp = 9;
 * @return {?proto.google.protobuf.Timestamp}
 */
proto.mt4_term_api.ConnectStateData.prototype.getTimestamp = function() {
  return /** @type{?proto.google.protobuf.Timestamp} */ (
    jspb.Message.getWrapperField(this, google_protobuf_timestamp_pb.Timestamp, 9));
};


/**
 * @param {?proto.google.protobuf.Timestamp|undefined} value
 * @return {!proto.mt4_term_api.ConnectStateData} returns this
*/
proto.mt4_term_api.ConnectStateData.prototype.setTimestamp = function(value) {
  return jspb.Message.setWrapperField(this, 9, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.mt4_term_api.ConnectStateData} returns this
 */
proto.mt4_term_api.ConnectStateData.prototype.clearTimestamp = function() {
  return this.setTimestamp(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.mt4_term_api.ConnectStateData.prototype.hasTimestamp = function() {
  return jspb.Message.getField(this, 9) != null;
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.mt4_term_api.ConnectionStatusRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.mt4_term_api.ConnectionStatusRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.mt4_term_api.ConnectionStatusRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.mt4_term_api.ConnectionStatusRequest.toObject = function(includeInstance, msg) {
  var f, obj = {

  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.mt4_term_api.ConnectionStatusRequest}
 */
proto.mt4_term_api.ConnectionStatusRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.mt4_term_api.ConnectionStatusRequest;
  return proto.mt4_term_api.ConnectionStatusRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.mt4_term_api.ConnectionStatusRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.mt4_term_api.ConnectionStatusRequest}
 */
proto.mt4_term_api.ConnectionStatusRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.mt4_term_api.ConnectionStatusRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.mt4_term_api.ConnectionStatusRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.mt4_term_api.ConnectionStatusRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.mt4_term_api.ConnectionStatusRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
};



/**
 * Oneof group definitions for this message. Each group defines the field
 * numbers belonging to that group. When of these fields' value is set, all
 * other fields in the group are cleared. During deserialization, if multiple
 * fields are encountered for a group, only the last value seen will be kept.
 * @private {!Array<!Array<number>>}
 * @const
 */
proto.mt4_term_api.ConnectionStatusReply.oneofGroups_ = [[1,2]];

/**
 * @enum {number}
 */
proto.mt4_term_api.ConnectionStatusReply.ResponseCase = {
  RESPONSE_NOT_SET: 0,
  DATA: 1,
  ERROR: 2
};

/**
 * @return {proto.mt4_term_api.ConnectionStatusReply.ResponseCase}
 */
proto.mt4_term_api.ConnectionStatusReply.prototype.getResponseCase = function() {
  return /** @type {proto.mt4_term_api.ConnectionStatusReply.ResponseCase} */(jspb.Message.computeOneofCase(this, proto.mt4_term_api.ConnectionStatusReply.oneofGroups_[0]));
};



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.mt4_term_api.ConnectionStatusReply.prototype.toObject = function(opt_includeInstance) {
  return proto.mt4_term_api.ConnectionStatusReply.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.mt4_term_api.ConnectionStatusReply} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.mt4_term_api.ConnectionStatusReply.toObject = function(includeInstance, msg) {
  var f, obj = {
    data: (f = msg.getData()) && proto.mt4_term_api.ConnectionStatusData.toObject(includeInstance, f),
    error: (f = msg.getError()) && mrpc$mt4$error_pb.Error.toObject(includeInstance, f)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.mt4_term_api.ConnectionStatusReply}
 */
proto.mt4_term_api.ConnectionStatusReply.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.mt4_term_api.ConnectionStatusReply;
  return proto.mt4_term_api.ConnectionStatusReply.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.mt4_term_api.ConnectionStatusReply} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.mt4_term_api.ConnectionStatusReply}
 */
proto.mt4_term_api.ConnectionStatusReply.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.mt4_term_api.ConnectionStatusData;
      reader.readMessage(value,proto.mt4_term_api.ConnectionStatusData.deserializeBinaryFromReader);
      msg.setData(value);
      break;
    case 2:
      var value = new mrpc$mt4$error_pb.Error;
      reader.readMessage(value,mrpc$mt4$error_pb.Error.deserializeBinaryFromReader);
      msg.setError(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.mt4_term_api.ConnectionStatusReply.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.mt4_term_api.ConnectionStatusReply.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.mt4_term_api.ConnectionStatusReply} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.mt4_term_api.ConnectionStatusReply.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getData();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      proto.mt4_term_api.ConnectionStatusData.serializeBinaryToWriter
    );
  }
  f = message.getError();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      mrpc$mt4$error_pb.Error.serializeBinaryToWriter
    );
  }
};


/**
 * optional ConnectionStatusData data = 1;
 * @return {?proto.mt4_term_api.ConnectionStatusData}
 */
proto.mt4_term_api.ConnectionStatusReply.prototype.getData = function() {
  return /** @type{?proto.mt4_term_api.ConnectionStatusData} */ (
    jspb.Message.getWrapperField(this, proto.mt4_term_api.ConnectionStatusData, 1));
};


/**
 * @param {?proto.mt4_term_api.ConnectionStatusData|undefined} value
 * @return {!proto.mt4_term_api.ConnectionStatusReply} returns this
*/
proto.mt4_term_api.ConnectionStatusReply.prototype.setData = function(value) {
  return jspb.Message.setOneofWrapperField(this, 1, proto.mt4_term_api.ConnectionStatusReply.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.mt4_term_api.ConnectionStatusReply} returns this
 */
proto.mt4_term_api.ConnectionStatusReply.prototype.clearData = function() {
  return this.setData(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.mt4_term_api.ConnectionStatusReply.prototype.hasData = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional Error error = 2;
 * @return {?proto.mt4_term_api.Error}
 */
proto.mt4_term_api.ConnectionStatusReply.prototype.getError = function() {
  return /** @type{?proto.mt4_term_api.Error} */ (
    jspb.Message.getWrapperField(this, mrpc$mt4$error_pb.Error, 2));
};


/**
 * @param {?proto.mt4_term_api.Error|undefined} value
 * @return {!proto.mt4_term_api.ConnectionStatusReply} returns this
*/
proto.mt4_term_api.ConnectionStatusReply.prototype.setError = function(value) {
  return jspb.Message.setOneofWrapperField(this, 2, proto.mt4_term_api.ConnectionStatusReply.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.mt4_term_api.ConnectionStatusReply} returns this
 */
proto.mt4_term_api.ConnectionStatusReply.prototype.clearError = function() {
  return this.setError(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.mt4_term_api.ConnectionStatusReply.prototype.hasError = function() {
  return jspb.Message.getField(this, 2) != null;
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.mt4_term_api.ConnectionStatusData.prototype.toObject = function(opt_includeInstance) {
  return proto.mt4_term_api.ConnectionStatusData.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.mt4_term_api.ConnectionStatusData} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.mt4_term_api.ConnectionStatusData.toObject = function(includeInstance, msg) {
  var f, obj = {
    id: jspb.Message.getFieldWithDefault(msg, 1, ""),
    isConnected: jspb.Message.getBooleanFieldWithDefault(msg, 2, false),
    isAlive: jspb.Message.getBooleanFieldWithDefault(msg, 3, false),
    apiIsAlive: jspb.Message.getBooleanFieldWithDefault(msg, 4, false),
    server: jspb.Message.getFieldWithDefault(msg, 5, ""),
    account: jspb.Message.getFieldWithDefault(msg, 6, 0),
    errorMessage: jspb.Message.getFieldWithDefault(msg, 7, ""),
    state: jspb.Message.getFieldWithDefault(msg, 8, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.mt4_term_api.ConnectionStatusData}
 */
proto.mt4_term_api.ConnectionStatusData.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.mt4_term_api.ConnectionStatusData;
  return proto.mt4_term_api.ConnectionStatusData.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.mt4_term_api.ConnectionStatusData} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.mt4_term_api.ConnectionStatusData}
 */
proto.mt4_term_api.ConnectionStatusData.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setId(value);
      break;
    case 2:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setIsConnected(value);
      break;
    case 3:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setIsAlive(value);
      break;
    case 4:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setApiIsAlive(value);
      break;
    case 5:
      var value = /** @type {string} */ (reader.readString());
      msg.setServer(value);
      break;
    case 6:
      var value = /** @type {number} */ (reader.readUint64());
      msg.setAccount(value);
      break;
    case 7:
      var value = /** @type {string} */ (reader.readString());
      msg.setErrorMessage(value);
      break;
    case 8:
      var value = /** @type {string} */ (reader.readString());
      msg.setState(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.mt4_term_api.ConnectionStatusData.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.mt4_term_api.ConnectionStatusData.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.mt4_term_api.ConnectionStatusData} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.mt4_term_api.ConnectionStatusData.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getId();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getIsConnected();
  if (f) {
    writer.writeBool(
      2,
      f
    );
  }
  f = message.getIsAlive();
  if (f) {
    writer.writeBool(
      3,
      f
    );
  }
  f = message.getApiIsAlive();
  if (f) {
    writer.writeBool(
      4,
      f
    );
  }
  f = message.getServer();
  if (f.length > 0) {
    writer.writeString(
      5,
      f
    );
  }
  f = message.getAccount();
  if (f !== 0) {
    writer.writeUint64(
      6,
      f
    );
  }
  f = message.getErrorMessage();
  if (f.length > 0) {
    writer.writeString(
      7,
      f
    );
  }
  f = message.getState();
  if (f.length > 0) {
    writer.writeString(
      8,
      f
    );
  }
};


/**
 * optional string id = 1;
 * @return {string}
 */
proto.mt4_term_api.ConnectionStatusData.prototype.getId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.mt4_term_api.ConnectionStatusData} returns this
 */
proto.mt4_term_api.ConnectionStatusData.prototype.setId = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional bool is_connected = 2;
 * @return {boolean}
 */
proto.mt4_term_api.ConnectionStatusData.prototype.getIsConnected = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 2, false));
};


/**
 * @param {boolean} value
 * @return {!proto.mt4_term_api.ConnectionStatusData} returns this
 */
proto.mt4_term_api.ConnectionStatusData.prototype.setIsConnected = function(value) {
  return jspb.Message.setProto3BooleanField(this, 2, value);
};


/**
 * optional bool is_alive = 3;
 * @return {boolean}
 */
proto.mt4_term_api.ConnectionStatusData.prototype.getIsAlive = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 3, false));
};


/**
 * @param {boolean} value
 * @return {!proto.mt4_term_api.ConnectionStatusData} returns this
 */
proto.mt4_term_api.ConnectionStatusData.prototype.setIsAlive = function(value) {
  return jspb.Message.setProto3BooleanField(this, 3, value);
};


/**
 * optional bool api_is_alive = 4;
 * @return {boolean}
 */
proto.mt4_term_api.ConnectionStatusData.prototype.getApiIsAlive = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 4, false));
};


/**
 * @param {boolean} value
 * @return {!proto.mt4_term_api.ConnectionStatusData} returns this
 */
proto.mt4_term_api.ConnectionStatusData.prototype.setApiIsAlive = function(value) {
  return jspb.Message.setProto3BooleanField(this, 4, value);
};


/**
 * optional string server = 5;
 * @return {string}
 */
proto.mt4_term_api.ConnectionStatusData.prototype.getServer = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 5, ""));
};


/**
 * @param {string} value
 * @return {!proto.mt4_term_api.ConnectionStatusData} returns this
 */
proto.mt4_term_api.ConnectionStatusData.prototype.setServer = function(value) {
  return jspb.Message.setProto3StringField(this, 5, value);
};


/**
 * optional uint64 account = 6;
 * @return {number}
 */
proto.mt4_term_api.ConnectionStatusData.prototype.getAccount = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 6, 0));
};


/**
 * @param {number} value
 * @return {!proto.mt4_term_api.ConnectionStatusData} returns this
 */
proto.mt4_term_api.ConnectionStatusData.prototype.setAccount = function(value) {
  return jspb.Message.setProto3IntField(this, 6, value);
};


/**
 * optional string error_message = 7;
 * @return {string}
 */
proto.mt4_term_api.ConnectionStatusData.prototype.getErrorMessage = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 7, ""));
};


/**
 * @param {string} value
 * @return {!proto.mt4_term_api.ConnectionStatusData} returns this
 */
proto.mt4_term_api.ConnectionStatusData.prototype.setErrorMessage = function(value) {
  return jspb.Message.setProto3StringField(this, 7, value);
};


/**
 * optional string state = 8;
 * @return {string}
 */
proto.mt4_term_api.ConnectionStatusData.prototype.getState = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 8, ""));
};


/**
 * @param {string} value
 * @return {!proto.mt4_term_api.ConnectionStatusData} returns this
 */
proto.mt4_term_api.ConnectionStatusData.prototype.setState = function(value) {
  return jspb.Message.setProto3StringField(this, 8, value);
};


/**
 * @enum {number}
 */
proto.mt4_term_api.ProxyTypes = {
  NONE: 0,
  HTTPS: 1,
  SOCKS4: 2,
  SOCKS5: 3
};

/**
 * @enum {number}
 */
proto.mt4_term_api.TerminalType = {
  MT4: 0,
  MT5: 1
};

goog.object.extend(exports, proto.mt4_term_api);
