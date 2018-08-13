"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var strategy_1 = require("./strategy");
var ip = require('ip');
var RemoteAddressStrategy = /** @class */ (function (_super) {
    __extends(RemoteAddressStrategy, _super);
    function RemoteAddressStrategy() {
        return _super.call(this, 'remoteAddress') || this;
    }
    RemoteAddressStrategy.prototype.isEnabled = function (parameters, context) {
        if (!parameters.IPs) {
            return false;
        }
        for (var _i = 0, _a = parameters.IPs.split(/\s*,\s*/); _i < _a.length; _i++) {
            var range = _a[_i];
            try {
                if (range === context.remoteAddress) {
                    return true;
                }
                else if (!ip.isV6Format(range)) {
                    if (ip.cidrSubnet(range).contains(context.remoteAddress)) {
                        return true;
                    }
                }
            }
            catch (e) {
                continue;
            }
        }
        return false;
    };
    return RemoteAddressStrategy;
}(strategy_1.Strategy));
exports.RemoteAddressStrategy = RemoteAddressStrategy;
//# sourceMappingURL=remote-addresss-strategy.js.map