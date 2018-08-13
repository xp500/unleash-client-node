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
var util_1 = require("./util");
var GradualRolloutSessionIdStrategy = /** @class */ (function (_super) {
    __extends(GradualRolloutSessionIdStrategy, _super);
    function GradualRolloutSessionIdStrategy() {
        return _super.call(this, 'gradualRolloutSessionId') || this;
    }
    GradualRolloutSessionIdStrategy.prototype.isEnabled = function (parameters, context) {
        var sessionId = context.sessionId;
        if (!sessionId) {
            return false;
        }
        var percentage = Number(parameters.percentage);
        var groupId = parameters.groupId || '';
        var normalizedId = util_1.normalizedValue(sessionId, groupId);
        return percentage > 0 && normalizedId <= percentage;
    };
    return GradualRolloutSessionIdStrategy;
}(strategy_1.Strategy));
exports.GradualRolloutSessionIdStrategy = GradualRolloutSessionIdStrategy;
//# sourceMappingURL=gradual-rollout-session-id.js.map