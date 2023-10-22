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
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/* istanbul ignore if */
if (process.env.VERBOSE || process.env.VERBOSE_PARSE_SERVER_PUSH_ADAPTER) {
  _npmlog.default.level = 'verbose';
}
var _default = exports.default = _ParsePushAdapter.default;