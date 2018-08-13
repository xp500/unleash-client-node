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
var DefaultStrategy = /** @class */ (function (_super) {
    __extends(DefaultStrategy, _super);
    function DefaultStrategy() {
        return _super.call(this, 'default') || this;
    }
    DefaultStrategy.prototype.isEnabled = function () {
        return true;
    };
    return DefaultStrategy;
}(strategy_1.Strategy));
exports.DefaultStrategy = DefaultStrategy;
//# sourceMappingURL=default-strategy.js.map