'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _parse = _interopRequireDefault(require("parse"));
var _npmlog = _interopRequireDefault(require("npmlog"));
var _APNS = _interopRequireDefault(require("./APNS"));
var _GCM = _interopRequireDefault(require("./GCM"));
var _FCM = _interopRequireDefault(require("./FCM"));
var _PushAdapterUtils = require("./PushAdapterUtils");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const LOG_PREFIX = 'parse-server-push-adapter';
class ParsePushAdapter {
  supportsPushTracking = true;
  constructor(pushConfig = {}) {
    this.validPushTypes = ['ios', 'osx', 'tvos', 'android', 'fcm'];
    this.senderMap = {};
    // used in PushController for Dashboard Features
    this.feature = {
      immediatePush: true
    };
    let pushTypes = Object.keys(pushConfig);
    for (let pushType of pushTypes) {
      // adapter may be passed as part of the parse-server initialization
      if (this.validPushTypes.indexOf(pushType) < 0 && pushType != 'adapter') {
        throw new _parse.default.Error(_parse.default.Error.PUSH_MISCONFIGURED, 'Push to ' + pushType + ' is not supported');
      }
      switch (pushType) {
        case 'ios':
        case 'tvos':
        case 'osx':
          if (pushConfig[pushType].hasOwnProperty('firebaseServiceAccount')) {
            this.senderMap[pushType] = new _FCM.default(pushConfig[pushType]);
          } else {
            this.senderMap[pushType] = new _APNS.default(pushConfig[pushType]);
          }
          break;
        case 'android':
        case 'fcm':
          if (pushConfig[pushType].hasOwnProperty('firebaseServiceAccount')) {
            this.senderMap[pushType] = new _FCM.default(pushConfig[pushType]);
          } else {
            this.senderMap[pushType] = new _GCM.default(pushConfig[pushType]);
          }
          break;
      }
    }
  }
  getValidPushTypes() {
    return this.validPushTypes;
  }
  static classifyInstallations(installations, validTypes) {
    return (0, _PushAdapterUtils.classifyInstallations)(installations, validTypes);
  }
  send(data, installations) {
    let deviceMap = (0, _PushAdapterUtils.classifyInstallations)(installations, this.validPushTypes);
    let sendPromises = [];
    for (let pushType in deviceMap) {
      let sender = this.senderMap[pushType];
      let devices = deviceMap[pushType];
      if (Array.isArray(devices) && devices.length > 0) {
        if (!sender) {
          _npmlog.default.verbose(LOG_PREFIX, `Can not find sender for push type ${pushType}, ${data}`);
          let results = devices.map(device => {
            return Promise.resolve({
              device,
              transmitted: false,
              response: {
                'error': `Can not find sender for push type ${pushType}, ${data}`
              }
            });
          });
          sendPromises.push(Promise.all(results));
        } else {
          sendPromises.push(sender.send(data, devices));
        }
      }
    }
    return Promise.all(sendPromises).then(promises => {
      // flatten all
      return [].concat.apply([], promises);
    });
  }
}
exports.default = ParsePushAdapter;