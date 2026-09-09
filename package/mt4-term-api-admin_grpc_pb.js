// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var mt4$term$api$admin_pb = require('./mt4-term-api-admin_pb.js');
var google_api_annotations_pb = require('./google/api/annotations_pb.js');
var google_protobuf_timestamp_pb = require('google-protobuf/google/protobuf/timestamp_pb.js');

function serialize_mrpc_admin_ActiveTerminalsClusterReply(arg) {
  if (!(arg instanceof mt4$term$api$admin_pb.ActiveTerminalsClusterReply)) {
    throw new Error('Expected argument of type mrpc_admin.ActiveTerminalsClusterReply');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_mrpc_admin_ActiveTerminalsClusterReply(buffer_arg) {
  return mt4$term$api$admin_pb.ActiveTerminalsClusterReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_mrpc_admin_ActiveTerminalsReply(arg) {
  if (!(arg instanceof mt4$term$api$admin_pb.ActiveTerminalsReply)) {
    throw new Error('Expected argument of type mrpc_admin.ActiveTerminalsReply');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_mrpc_admin_ActiveTerminalsReply(buffer_arg) {
  return mt4$term$api$admin_pb.ActiveTerminalsReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_mrpc_admin_ActiveTerminalsRequest(arg) {
  if (!(arg instanceof mt4$term$api$admin_pb.ActiveTerminalsRequest)) {
    throw new Error('Expected argument of type mrpc_admin.ActiveTerminalsRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_mrpc_admin_ActiveTerminalsRequest(buffer_arg) {
  return mt4$term$api$admin_pb.ActiveTerminalsRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_mrpc_admin_CaptureSessionScreenshotOnPodRequest(arg) {
  if (!(arg instanceof mt4$term$api$admin_pb.CaptureSessionScreenshotOnPodRequest)) {
    throw new Error('Expected argument of type mrpc_admin.CaptureSessionScreenshotOnPodRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_mrpc_admin_CaptureSessionScreenshotOnPodRequest(buffer_arg) {
  return mt4$term$api$admin_pb.CaptureSessionScreenshotOnPodRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_mrpc_admin_CaptureSessionScreenshotReply(arg) {
  if (!(arg instanceof mt4$term$api$admin_pb.CaptureSessionScreenshotReply)) {
    throw new Error('Expected argument of type mrpc_admin.CaptureSessionScreenshotReply');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_mrpc_admin_CaptureSessionScreenshotReply(buffer_arg) {
  return mt4$term$api$admin_pb.CaptureSessionScreenshotReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_mrpc_admin_CaptureSessionScreenshotRequest(arg) {
  if (!(arg instanceof mt4$term$api$admin_pb.CaptureSessionScreenshotRequest)) {
    throw new Error('Expected argument of type mrpc_admin.CaptureSessionScreenshotRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_mrpc_admin_CaptureSessionScreenshotRequest(buffer_arg) {
  return mt4$term$api$admin_pb.CaptureSessionScreenshotRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_mrpc_admin_GetAllLogsReply(arg) {
  if (!(arg instanceof mt4$term$api$admin_pb.GetAllLogsReply)) {
    throw new Error('Expected argument of type mrpc_admin.GetAllLogsReply');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_mrpc_admin_GetAllLogsReply(buffer_arg) {
  return mt4$term$api$admin_pb.GetAllLogsReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_mrpc_admin_GetAllLogsRequest(arg) {
  if (!(arg instanceof mt4$term$api$admin_pb.GetAllLogsRequest)) {
    throw new Error('Expected argument of type mrpc_admin.GetAllLogsRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_mrpc_admin_GetAllLogsRequest(buffer_arg) {
  return mt4$term$api$admin_pb.GetAllLogsRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_mrpc_admin_GetEventLogEntriesReply(arg) {
  if (!(arg instanceof mt4$term$api$admin_pb.GetEventLogEntriesReply)) {
    throw new Error('Expected argument of type mrpc_admin.GetEventLogEntriesReply');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_mrpc_admin_GetEventLogEntriesReply(buffer_arg) {
  return mt4$term$api$admin_pb.GetEventLogEntriesReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_mrpc_admin_GetEventLogEntriesRequest(arg) {
  if (!(arg instanceof mt4$term$api$admin_pb.GetEventLogEntriesRequest)) {
    throw new Error('Expected argument of type mrpc_admin.GetEventLogEntriesRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_mrpc_admin_GetEventLogEntriesRequest(buffer_arg) {
  return mt4$term$api$admin_pb.GetEventLogEntriesRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_mrpc_admin_GetLogFileReply(arg) {
  if (!(arg instanceof mt4$term$api$admin_pb.GetLogFileReply)) {
    throw new Error('Expected argument of type mrpc_admin.GetLogFileReply');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_mrpc_admin_GetLogFileReply(buffer_arg) {
  return mt4$term$api$admin_pb.GetLogFileReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_mrpc_admin_GetLogFileRequest(arg) {
  if (!(arg instanceof mt4$term$api$admin_pb.GetLogFileRequest)) {
    throw new Error('Expected argument of type mrpc_admin.GetLogFileRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_mrpc_admin_GetLogFileRequest(buffer_arg) {
  return mt4$term$api$admin_pb.GetLogFileRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_mrpc_admin_GetSessionRestoreLogsReply(arg) {
  if (!(arg instanceof mt4$term$api$admin_pb.GetSessionRestoreLogsReply)) {
    throw new Error('Expected argument of type mrpc_admin.GetSessionRestoreLogsReply');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_mrpc_admin_GetSessionRestoreLogsReply(buffer_arg) {
  return mt4$term$api$admin_pb.GetSessionRestoreLogsReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_mrpc_admin_GetSessionRestoreLogsRequest(arg) {
  if (!(arg instanceof mt4$term$api$admin_pb.GetSessionRestoreLogsRequest)) {
    throw new Error('Expected argument of type mrpc_admin.GetSessionRestoreLogsRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_mrpc_admin_GetSessionRestoreLogsRequest(buffer_arg) {
  return mt4$term$api$admin_pb.GetSessionRestoreLogsRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_mrpc_admin_GetSessionRestoreStatusReply(arg) {
  if (!(arg instanceof mt4$term$api$admin_pb.GetSessionRestoreStatusReply)) {
    throw new Error('Expected argument of type mrpc_admin.GetSessionRestoreStatusReply');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_mrpc_admin_GetSessionRestoreStatusReply(buffer_arg) {
  return mt4$term$api$admin_pb.GetSessionRestoreStatusReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_mrpc_admin_ListLogFilesReply(arg) {
  if (!(arg instanceof mt4$term$api$admin_pb.ListLogFilesReply)) {
    throw new Error('Expected argument of type mrpc_admin.ListLogFilesReply');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_mrpc_admin_ListLogFilesReply(buffer_arg) {
  return mt4$term$api$admin_pb.ListLogFilesReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_mrpc_admin_RefreshMrpcRestReply(arg) {
  if (!(arg instanceof mt4$term$api$admin_pb.RefreshMrpcRestReply)) {
    throw new Error('Expected argument of type mrpc_admin.RefreshMrpcRestReply');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_mrpc_admin_RefreshMrpcRestReply(buffer_arg) {
  return mt4$term$api$admin_pb.RefreshMrpcRestReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_mrpc_admin_SystemUsageReply(arg) {
  if (!(arg instanceof mt4$term$api$admin_pb.SystemUsageReply)) {
    throw new Error('Expected argument of type mrpc_admin.SystemUsageReply');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_mrpc_admin_SystemUsageReply(buffer_arg) {
  return mt4$term$api$admin_pb.SystemUsageReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_mrpc_admin_VersionReply(arg) {
  if (!(arg instanceof mt4$term$api$admin_pb.VersionReply)) {
    throw new Error('Expected argument of type mrpc_admin.VersionReply');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_mrpc_admin_VersionReply(buffer_arg) {
  return mt4$term$api$admin_pb.VersionReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_mrpc_admin_VersionRequest(arg) {
  if (!(arg instanceof mt4$term$api$admin_pb.VersionRequest)) {
    throw new Error('Expected argument of type mrpc_admin.VersionRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_mrpc_admin_VersionRequest(buffer_arg) {
  return mt4$term$api$admin_pb.VersionRequest.deserializeBinary(new Uint8Array(buffer_arg));
}


// ============================================================
// Admin / diagnostics service (terminal-agnostic — identical to the mt5 copy).
// Auth via admin_key (matched against the ADMIN_KEY env setting).
// HTTP-transcoded for the /admin HTML page + cross-pod fan-out, but HIDDEN from
// Swagger (excluded in SwaggerGen DocInclusionPredicate in Program.cs).
//
// NOTE: this file exists ONLY so the mt4 client libraries (create-grpc-libs,
// proto/mt4) include the admin API, matching mt5. The Terminal Manager binary
// compiles the single shared mrpc_admin proto from proto/mt5 (see the csproj) —
// do NOT add this file to the csproj or mrpc_admin.* would be defined twice.
// ============================================================
var AdminApiService = exports.AdminApiService = {
  // Active terminals running on THIS pod.
activeTerminals: {
    path: '/mrpc_admin.AdminApi/ActiveTerminals',
    requestStream: false,
    responseStream: false,
    requestType: mt4$term$api$admin_pb.ActiveTerminalsRequest,
    responseType: mt4$term$api$admin_pb.ActiveTerminalsReply,
    requestSerialize: serialize_mrpc_admin_ActiveTerminalsRequest,
    requestDeserialize: deserialize_mrpc_admin_ActiveTerminalsRequest,
    responseSerialize: serialize_mrpc_admin_ActiveTerminalsReply,
    responseDeserialize: deserialize_mrpc_admin_ActiveTerminalsReply,
  },
  // Active terminals across ALL pods of this StatefulSet/Deployment.
// Lists peer pods via the Kubernetes API, then calls ActiveTerminals on each.
activeTerminalsCluster: {
    path: '/mrpc_admin.AdminApi/ActiveTerminalsCluster',
    requestStream: false,
    responseStream: false,
    requestType: mt4$term$api$admin_pb.ActiveTerminalsRequest,
    responseType: mt4$term$api$admin_pb.ActiveTerminalsClusterReply,
    requestSerialize: serialize_mrpc_admin_ActiveTerminalsRequest,
    requestDeserialize: deserialize_mrpc_admin_ActiveTerminalsRequest,
    responseSerialize: serialize_mrpc_admin_ActiveTerminalsClusterReply,
    responseDeserialize: deserialize_mrpc_admin_ActiveTerminalsClusterReply,
  },
  // Whole-machine CPU % and physical RAM (current + short history) for THIS pod.
systemUsage: {
    path: '/mrpc_admin.AdminApi/SystemUsage',
    requestStream: false,
    responseStream: false,
    requestType: mt4$term$api$admin_pb.ActiveTerminalsRequest,
    responseType: mt4$term$api$admin_pb.SystemUsageReply,
    requestSerialize: serialize_mrpc_admin_ActiveTerminalsRequest,
    requestDeserialize: deserialize_mrpc_admin_ActiveTerminalsRequest,
    responseSerialize: serialize_mrpc_admin_SystemUsageReply,
    responseDeserialize: deserialize_mrpc_admin_SystemUsageReply,
  },
  // Lists the diagnostic log files on \\host.lan\Data\logs (mrpc.log, startup.log,
// install.log, boot-diag.log, and any future additions) - the exact files the container's
// postStart hook tails into "kubectl logs", readable here without cluster/kubectl access.
listLogFiles: {
    path: '/mrpc_admin.AdminApi/ListLogFiles',
    requestStream: false,
    responseStream: false,
    requestType: mt4$term$api$admin_pb.ActiveTerminalsRequest,
    responseType: mt4$term$api$admin_pb.ListLogFilesReply,
    requestSerialize: serialize_mrpc_admin_ActiveTerminalsRequest,
    requestDeserialize: deserialize_mrpc_admin_ActiveTerminalsRequest,
    responseSerialize: serialize_mrpc_admin_ListLogFilesReply,
    responseDeserialize: deserialize_mrpc_admin_ListLogFilesReply,
  },
  // Content of one log file from \\host.lan\Data\logs (see ListLogFiles). Truncated to the
// LAST max_bytes bytes if larger (0 = server default, 256 KiB).
getLogFile: {
    path: '/mrpc_admin.AdminApi/GetLogFile',
    requestStream: false,
    responseStream: false,
    requestType: mt4$term$api$admin_pb.GetLogFileRequest,
    responseType: mt4$term$api$admin_pb.GetLogFileReply,
    requestSerialize: serialize_mrpc_admin_GetLogFileRequest,
    requestDeserialize: deserialize_mrpc_admin_GetLogFileRequest,
    responseSerialize: serialize_mrpc_admin_GetLogFileReply,
    responseDeserialize: deserialize_mrpc_admin_GetLogFileReply,
  },
  // On-demand dump of recent Windows Event Log entries (Service Control Manager events,
// shutdown/restart events, Application errors) - the same data boot-diag.bat captures on a
// service state change, available here without waiting for that trigger.
getEventLogEntries: {
    path: '/mrpc_admin.AdminApi/GetEventLogEntries',
    requestStream: false,
    responseStream: false,
    requestType: mt4$term$api$admin_pb.GetEventLogEntriesRequest,
    responseType: mt4$term$api$admin_pb.GetEventLogEntriesReply,
    requestSerialize: serialize_mrpc_admin_GetEventLogEntriesRequest,
    requestDeserialize: deserialize_mrpc_admin_GetEventLogEntriesRequest,
    responseSerialize: serialize_mrpc_admin_GetEventLogEntriesReply,
    responseDeserialize: deserialize_mrpc_admin_GetEventLogEntriesReply,
  },
  // Screenshot of a Windows interactive session's whole desktop - a specific
// MrpcTerminalUser<N> session, or (if session_user_name is empty) the pod's main/autologon
// session, the one startup.bat runs in.
captureSessionScreenshot: {
    path: '/mrpc_admin.AdminApi/CaptureSessionScreenshot',
    requestStream: false,
    responseStream: false,
    requestType: mt4$term$api$admin_pb.CaptureSessionScreenshotRequest,
    responseType: mt4$term$api$admin_pb.CaptureSessionScreenshotReply,
    requestSerialize: serialize_mrpc_admin_CaptureSessionScreenshotRequest,
    requestDeserialize: deserialize_mrpc_admin_CaptureSessionScreenshotRequest,
    responseSerialize: serialize_mrpc_admin_CaptureSessionScreenshotReply,
    responseDeserialize: deserialize_mrpc_admin_CaptureSessionScreenshotReply,
  },
  // Same as CaptureSessionScreenshot, but fanned out from THIS pod to a DIFFERENT pod by IP
// (mirroring the ActiveTerminalsCluster fan-out) - a browser can only reach the pod that is
// currently serving it, not other pods' ClusterIPs, so the cluster admin view asks whichever
// pod it's connected to relay the request.
captureSessionScreenshotOnPod: {
    path: '/mrpc_admin.AdminApi/CaptureSessionScreenshotOnPod',
    requestStream: false,
    responseStream: false,
    requestType: mt4$term$api$admin_pb.CaptureSessionScreenshotOnPodRequest,
    responseType: mt4$term$api$admin_pb.CaptureSessionScreenshotReply,
    requestSerialize: serialize_mrpc_admin_CaptureSessionScreenshotOnPodRequest,
    requestDeserialize: deserialize_mrpc_admin_CaptureSessionScreenshotOnPodRequest,
    responseSerialize: serialize_mrpc_admin_CaptureSessionScreenshotReply,
    responseDeserialize: deserialize_mrpc_admin_CaptureSessionScreenshotReply,
  },
  // Runs, in-process (LocalSystem, no guest logon/SSH needed), the same refresh
// startup.bat performs on a successful ONLOGON boot: robocopy published-app (including
// mrpc-rest) from the host share, then create/start MrpcRestService. Exists because
// ONLOGON is unreliable (autologon-dependent) - this lets a stuck deploy be repaired
// through the Terminal Manager's own already-running gRPC/HTTP API instead of waiting
// on that trigger or requiring interactive guest access.
refreshMrpcRest: {
    path: '/mrpc_admin.AdminApi/RefreshMrpcRest',
    requestStream: false,
    responseStream: false,
    requestType: mt4$term$api$admin_pb.ActiveTerminalsRequest,
    responseType: mt4$term$api$admin_pb.RefreshMrpcRestReply,
    requestSerialize: serialize_mrpc_admin_ActiveTerminalsRequest,
    requestDeserialize: deserialize_mrpc_admin_ActiveTerminalsRequest,
    responseSerialize: serialize_mrpc_admin_RefreshMrpcRestReply,
    responseDeserialize: deserialize_mrpc_admin_RefreshMrpcRestReply,
  },
  // Build/version identity of the Terminal Manager running on THIS pod, so a deploy can be
// VERIFIED rather than guessed. No admin_key required - it exposes no secrets. mrpc-rest
// transcodes GET /version-tm onto this (its own build is at GET /version).
getVersion: {
    path: '/mrpc_admin.AdminApi/GetVersion',
    requestStream: false,
    responseStream: false,
    requestType: mt4$term$api$admin_pb.VersionRequest,
    responseType: mt4$term$api$admin_pb.VersionReply,
    requestSerialize: serialize_mrpc_admin_VersionRequest,
    requestDeserialize: deserialize_mrpc_admin_VersionRequest,
    responseSerialize: serialize_mrpc_admin_VersionReply,
    responseDeserialize: deserialize_mrpc_admin_VersionReply,
  },
  // One-shot bundle of EVERY diagnostic log available on this pod: every *.log file on the
// shared Data folder AND in C:\OEM, plus the Windows Application + System event logs. See the
// mt5 admin proto for the canonical definition (this copy exists for the mt4 client libs).
getAllLogs: {
    path: '/mrpc_admin.AdminApi/GetAllLogs',
    requestStream: false,
    responseStream: false,
    requestType: mt4$term$api$admin_pb.GetAllLogsRequest,
    responseType: mt4$term$api$admin_pb.GetAllLogsReply,
    requestSerialize: serialize_mrpc_admin_GetAllLogsRequest,
    requestDeserialize: deserialize_mrpc_admin_GetAllLogsRequest,
    responseSerialize: serialize_mrpc_admin_GetAllLogsReply,
    responseDeserialize: deserialize_mrpc_admin_GetAllLogsReply,
  },
  // Session restore logs for the latest startup sequence on a pod (stored in MongoDB session_restore_logs).
getSessionRestoreLogs: {
    path: '/mrpc_admin.AdminApi/GetSessionRestoreLogs',
    requestStream: false,
    responseStream: false,
    requestType: mt4$term$api$admin_pb.GetSessionRestoreLogsRequest,
    responseType: mt4$term$api$admin_pb.GetSessionRestoreLogsReply,
    requestSerialize: serialize_mrpc_admin_GetSessionRestoreLogsRequest,
    requestDeserialize: deserialize_mrpc_admin_GetSessionRestoreLogsRequest,
    responseSerialize: serialize_mrpc_admin_GetSessionRestoreLogsReply,
    responseDeserialize: deserialize_mrpc_admin_GetSessionRestoreLogsReply,
  },
  // Session restore watcher status (terminals loaded, queue count, state, diagnostics) for THIS pod.
getSessionRestoreStatus: {
    path: '/mrpc_admin.AdminApi/GetSessionRestoreStatus',
    requestStream: false,
    responseStream: false,
    requestType: mt4$term$api$admin_pb.ActiveTerminalsRequest,
    responseType: mt4$term$api$admin_pb.GetSessionRestoreStatusReply,
    requestSerialize: serialize_mrpc_admin_ActiveTerminalsRequest,
    requestDeserialize: deserialize_mrpc_admin_ActiveTerminalsRequest,
    responseSerialize: serialize_mrpc_admin_GetSessionRestoreStatusReply,
    responseDeserialize: deserialize_mrpc_admin_GetSessionRestoreStatusReply,
  },
};

exports.AdminApiClient = grpc.makeGenericClientConstructor(AdminApiService);
