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
var GradualRolloutRandomStrategy = /** @class */ (function (_super) {
    __extends(GradualRolloutRandomStrategy, _super);
    function GradualRolloutRandomStrategy() {
        return _super.call(this, 'gradualRolloutRandom') || this;
    }
    GradualRolloutRandomStrategy.prototype.isEnabled = function (parameters, context) {
        var percentage = Number(parameters.percentage);
        var random = Math.round(Math.random() * 100);
        return percentage >= random;
    };
    return GradualRolloutRandomStrategy;
}(strategy_1.Strategy));
exports.GradualRolloutRandomStrategy = GradualRolloutRandomStrategy;
//# sourceMappingURL=gradual-rollout-random.js.map