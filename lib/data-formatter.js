"use strict";
exports.__esModule = true;
function toNewFormat(data) {
    return {
        version: 1,
        features: data.features.map(function (feature) {
            var copied = Object.assign({}, feature);
            if (!feature.strategies && feature.strategy) {
                copied.strategies = [{ name: feature.strategy, parameters: feature.parameters }];
                return copied;
            }
            return copied;
        })
    };
}
exports.toNewFormat = toNewFormat;
function pickData(serverData) {
    var features = serverData.features;
    return {
        features: features.map(function (_a) {
            var name = _a.name, enabled = _a.enabled, strategies = _a.strategies;
            return ({
                name: name,
                enabled: enabled,
                strategies: strategies
            });
        })
    };
}
exports.pickData = pickData;
//# sourceMappingURL=data-formatter.js.map