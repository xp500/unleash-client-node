"use strict";
exports.__esModule = true;
var default_strategy_1 = require("./default-strategy");
var application_hostname_strategy_1 = require("./application-hostname-strategy");
var gradual_rollout_random_1 = require("./gradual-rollout-random");
var gradual_rollout_user_id_1 = require("./gradual-rollout-user-id");
var gradual_rollout_session_id_1 = require("./gradual-rollout-session-id");
var user_with_id_strategy_1 = require("./user-with-id-strategy");
var remote_addresss_strategy_1 = require("./remote-addresss-strategy");
var strategy_1 = require("./strategy");
exports.Strategy = strategy_1.Strategy;
exports.defaultStrategies = [
    new default_strategy_1.DefaultStrategy(),
    new application_hostname_strategy_1.ApplicationHostnameStrategy(),
    new gradual_rollout_random_1.GradualRolloutRandomStrategy(),
    new gradual_rollout_user_id_1.GradualRolloutUserIdStrategy(),
    new gradual_rollout_session_id_1.GradualRolloutSessionIdStrategy(),
    new user_with_id_strategy_1.UserWithIdStrategy(),
    new remote_addresss_strategy_1.RemoteAddressStrategy(),
];
//# sourceMappingURL=index.js.map