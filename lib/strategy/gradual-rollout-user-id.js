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
var GradualRolloutUserIdStrategy = /** @class */ (function (_super) {
    __extends(GradualRolloutUserIdStrategy, _super);
    function GradualRolloutUserIdStrategy() {
        return _super.call(this, 'gradualRolloutUserId') || this;
    }
    GradualRolloutUserIdStrategy.prototype.isEnabled = function (parameters, context) {
        var userId = context.userId;
        if (!userId) {
            return false;
        }
        var percentage = Number(parameters.percentage);
        var groupId = parameters.groupId || '';
        var normalizedUserId = util_1.normalizedValue(userId, groupId);
        return percentage > 0 && normalizedUserId <= percentage;
    };
    return GradualRolloutUserIdStrategy;
}(strategy_1.Strategy));
exports.GradualRolloutUserIdStrategy = GradualRolloutUserIdStrategy;
//# sourceMappingURL=gradual-rollout-user-id.js.map