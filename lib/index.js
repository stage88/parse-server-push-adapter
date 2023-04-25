"use strict";

// ParsePushAdapter is the default implementation of
// PushAdapter, it uses GCM for android push and APNS
// for ios push.
Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "APNS", {
  enumerable: true,
  get: function () {
    return _APNS.default;
  }
});
Object.defineProperty(exports, "GCM", {
  enumerable: true,
  get: function () {
    return _GCM.default;
  }
});
Object.defineProperty(exports, "ParsePushAdapter", {
  enumerable: true,
  get: function () {
    return _ParsePushAdapter.default;
  }
});
exports.utils = exports.default = void 0;
var _npmlog = _interopRequireDefault(require("npmlog"));
var _ParsePushAdapter = _interopRequireDefault(require("./ParsePushAdapter"));
var _GCM = _interopRequireDefault(require("./GCM"));
var _APNS = _interopRequireDefault(require("./APNS"));
var utils = _interopRequireWildcard(require("./PushAdapterUtils"));
exports.utils = utils;
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/* istanbul ignore if */
if (process.env.VERBOSE || process.env.VERBOSE_PARSE_SERVER_PUSH_ADAPTER) {
  _npmlog.default.level = 'verbose';
}
var _default = _ParsePushAdapter.default;
exports.default = _default;