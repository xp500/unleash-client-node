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
var events_1 = require("events");
var UnleashClient = /** @class */ (function (_super) {
    __extends(UnleashClient, _super);
    function UnleashClient(repository, strategies) {
        var _this = _super.call(this) || this;
        _this.repository = repository;
        _this.strategies = strategies || [];
        _this.warned = {};
        _this.strategies.forEach(function (strategy) {
            if (!strategy ||
                !strategy.name ||
                typeof strategy.name !== 'string' ||
                !strategy.isEnabled ||
                typeof strategy.isEnabled !== 'function') {
                throw new Error('Invalid strategy data / interface');
            }
        });
        return _this;
    }
    UnleashClient.prototype.getStrategy = function (name) {
        var match;
        this.strategies.some(function (strategy) {
            if (strategy.name === name) {
                match = strategy;
                return true;
            }
            return false;
        });
        return match;
    };
    UnleashClient.prototype.warnOnce = function (missingStrategy, name, strategies) {
        if (!this.warned[missingStrategy + name]) {
            this.warned[missingStrategy + name] = true;
            this.emit('warn', "Missing strategy \"" + missingStrategy + "\" for toggle \"" + name + "\". Ensure that \"" + strategies
                .map(function (_a) {
                var name = _a.name;
                return name;
            })
                .join(', ') + "\" are supported before using this toggle");
        }
    };
    UnleashClient.prototype.isEnabled = function (name, context, fallbackValue) {
        var _this = this;
        var feature = this.repository.getToggle(name);
        if (!feature && typeof fallbackValue === 'boolean') {
            return fallbackValue;
        }
        if (!feature || !feature.enabled) {
            return false;
        }
        if (!Array.isArray(feature.strategies)) {
            this.emit('error', new Error("Malformed feature, strategies not an array, is a " + typeof feature.strategies));
            return false;
        }
        if (feature.strategies.length === 0) {
            return feature.enabled;
        }
        return (feature.strategies.length > 0 &&
            feature.strategies.some(function (strategySelector) {
                var strategy = _this.getStrategy(strategySelector.name);
                if (!strategy) {
                    _this.warnOnce(strategySelector.name, name, feature.strategies);
                    return false;
                }
                return strategy.isEnabled(strategySelector.parameters, context);
            }));
    };
    return UnleashClient;
}(events_1.EventEmitter));
exports["default"] = UnleashClient;
//# sourceMappingURL=client.js.map