"use strict";
exports.__esModule = true;
var unleash_1 = require("./unleash");
var index_1 = require("./strategy/index");
exports.Strategy = index_1.Strategy;
var unleash_2 = require("./unleash");
exports.Unleash = unleash_2.Unleash;
var instance;
function initialize(options) {
    instance = new unleash_1.Unleash(options);
    instance.on('error', function () { });
    return instance;
}
exports.initialize = initialize;
function isEnabled(name, context, fallbackValue) {
    return instance && instance.isEnabled(name, context, fallbackValue);
}
exports.isEnabled = isEnabled;
function destroy() {
    return instance && instance.destroy();
}
exports.destroy = destroy;
function getFeatureToggleDefinition(toggleName) {
    return instance && instance.getFeatureToggleDefinition(toggleName);
}
exports.getFeatureToggleDefinition = getFeatureToggleDefinition;
function getAllFeatureToggleDefinitions() {
    return instance && instance.getAllFeatureToggleDefinitions();
}
exports.getAllFeatureToggleDefinitions = getAllFeatureToggleDefinitions;
function count(toggleName, enabled) {
    return instance && instance.count(toggleName, enabled);
}
exports.count = count;
//# sourceMappingURL=index.js.map