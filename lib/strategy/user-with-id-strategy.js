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
var UserWithIdStrategy = /** @class */ (function (_super) {
    __extends(UserWithIdStrategy, _super);
    function UserWithIdStrategy() {
        return _super.call(this, 'userWithId') || this;
    }
    UserWithIdStrategy.prototype.isEnabled = function (parameters, context) {
        var userIdList = parameters.userIds.split(/\s*,\s*/);
        return userIdList.includes(context.userId);
    };
    return UserWithIdStrategy;
}(strategy_1.Strategy));
exports.UserWithIdStrategy = UserWithIdStrategy;
//# sourceMappingURL=user-with-id-strategy.js.map