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
var client_1 = require("./client");
var repository_1 = require("./repository");
var metrics_1 = require("./metrics");
var index_1 = require("./strategy/index");
var index_2 = require("./strategy/index");
exports.Strategy = index_2.Strategy;
var os_1 = require("os");
var events_1 = require("events");
var os_2 = require("os");
var BACKUP_PATH = os_1.tmpdir();
var Unleash = /** @class */ (function (_super) {
    __extends(Unleash, _super);
    function Unleash(_a) {
        var appName = _a.appName, instanceId = _a.instanceId, url = _a.url, _b = _a.refreshInterval, refreshInterval = _b === void 0 ? 15 * 1000 : _b, _c = _a.metricsInterval, metricsInterval = _c === void 0 ? 60 * 1000 : _c, _d = _a.disableMetrics, disableMetrics = _d === void 0 ? false : _d, _e = _a.backupPath, backupPath = _e === void 0 ? BACKUP_PATH : _e, _f = _a.strategies, strategies = _f === void 0 ? [] : _f, customHeaders = _a.customHeaders;
        var _this = _super.call(this) || this;
        if (!url) {
            throw new Error('Unleash server URL missing');
        }
        if (url.endsWith('/features')) {
            var oldUrl_1 = url;
            process.nextTick(function () {
                return _this.emit('warn', "Unleash server URL \"" + oldUrl_1 + "\" should no longer link directly to /features");
            });
            url = url.replace(/\/features$/, '');
        }
        if (!url.endsWith('/')) {
            url += '/';
        }
        if (!appName) {
            throw new Error('Unleash client appName missing');
        }
        if (!instanceId) {
            var info = void 0;
            try {
                info = os_2.userInfo();
            }
            catch (e) {
                //unable to read info;
                info = {};
            }
            var prefix = info.username
                ? info.username
                : "generated-" + Math.round(Math.random() * 1000000) + "-" + process.pid;
            instanceId = prefix + "-" + os_2.hostname();
        }
        _this.repository = new repository_1["default"]({
            backupPath: backupPath,
            url: url,
            appName: appName,
            instanceId: instanceId,
            refreshInterval: refreshInterval,
            headers: customHeaders
        });
        strategies = index_1.defaultStrategies.concat(strategies);
        _this.repository.on('ready', function () {
            _this.client = new client_1["default"](_this.repository, strategies);
            _this.client.on('error', function (err) { return _this.emit('error', err); });
            _this.client.on('warn', function (msg) { return _this.emit('warn', msg); });
            _this.emit('ready');
        });
        _this.repository.on('error', function (err) {
            err.message = "Unleash Repository error: " + err.message;
            _this.emit('error', err);
        });
        _this.repository.on('warn', function (msg) {
            _this.emit('warn', msg);
        });
        _this.metrics = new metrics_1["default"]({
            disableMetrics: disableMetrics,
            appName: appName,
            instanceId: instanceId,
            strategies: strategies.map(function (strategy) { return strategy.name; }),
            metricsInterval: metricsInterval,
            url: url,
            headers: customHeaders
        });
        _this.metrics.on('error', function (err) {
            err.message = "Unleash Metrics error: " + err.message;
            _this.emit('error', err);
        });
        _this.metrics.on('warn', function (msg) {
            _this.emit('warn', msg);
        });
        _this.metrics.on('count', function (name, enabled) {
            _this.emit('count', name, enabled);
        });
        _this.metrics.on('sent', function (payload) {
            _this.emit('sent', payload);
        });
        _this.metrics.on('registered', function (payload) {
            _this.emit('registered', payload);
        });
        return _this;
    }
    Unleash.prototype.destroy = function () {
        this.repository.stop();
        this.metrics.stop();
        this.client = undefined;
    };
    Unleash.prototype.isEnabled = function (name, context, fallbackValue) {
        var result;
        if (this.client !== undefined) {
            result = this.client.isEnabled(name, context, fallbackValue);
        }
        else {
            result = typeof fallbackValue === 'boolean' ? fallbackValue : false;
            this.emit('warn', "Unleash has not been initialized yet. isEnabled(" + name + ") defaulted to " + result);
        }
        this.count(name, result);
        return result;
    };
    Unleash.prototype.getFeatureToggleDefinition = function (toggleName) {
        return this.repository.getToggle(toggleName);
    };
    Unleash.prototype.getAllFeatureToggleDefinitions = function () {
        return this.repository.getToggles();
    };
    Unleash.prototype.count = function (toggleName, enabled) {
        this.metrics.count(toggleName, enabled);
    };
    return Unleash;
}(events_1.EventEmitter));
exports.Unleash = Unleash;
//# sourceMappingURL=unleash.js.map