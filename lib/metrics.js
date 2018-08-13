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
var url_1 = require("url");
var request_1 = require("./request");
require('pkginfo')(module, 'version');
var sdkVersion = "unleash-client-node:" + module.exports.version;
var Metrics = /** @class */ (function (_super) {
    __extends(Metrics, _super);
    function Metrics(_a) {
        var appName = _a.appName, instanceId = _a.instanceId, strategies = _a.strategies, _b = _a.metricsInterval, metricsInterval = _b === void 0 ? 0 : _b, _c = _a.disableMetrics, disableMetrics = _c === void 0 ? false : _c, url = _a.url, headers = _a.headers;
        var _this = _super.call(this) || this;
        _this.disabled = disableMetrics;
        _this.metricsInterval = metricsInterval;
        _this.appName = appName;
        _this.instanceId = instanceId;
        _this.sdkVersion = sdkVersion;
        _this.strategies = strategies;
        _this.url = url;
        _this.headers = headers;
        _this.started = new Date();
        _this.resetBucket();
        if (typeof _this.metricsInterval === 'number' && _this.metricsInterval > 0) {
            _this.startTimer();
            _this.registerInstance();
        }
        return _this;
    }
    Metrics.prototype.startTimer = function () {
        var _this = this;
        if (this.disabled) {
            return false;
        }
        this.timer = setTimeout(function () {
            _this.sendMetrics();
        }, this.metricsInterval);
        if (process.env.NODE_ENV !== 'test') {
            this.timer.unref();
        }
        return true;
    };
    Metrics.prototype.stop = function () {
        clearInterval(this.timer);
        delete this.timer;
        this.disabled = true;
    };
    Metrics.prototype.registerInstance = function () {
        var _this = this;
        if (this.disabled) {
            return false;
        }
        var url = url_1.resolve(this.url, './client/register');
        var payload = this.getClientData();
        request_1.post({
            url: url,
            json: payload,
            appName: this.appName,
            instanceId: this.instanceId,
            headers: this.headers
        }, function (err, res, body) {
            if (err) {
                _this.emit('error', err);
                return;
            }
            if (!(res.statusCode && res.statusCode >= 200 && res.statusCode < 300)) {
                _this.emit('warn', url + " returning " + res.statusCode, body);
                return;
            }
            _this.emit('registered', payload);
        });
        return true;
    };
    Metrics.prototype.sendMetrics = function () {
        var _this = this;
        if (this.disabled) {
            return false;
        }
        if (this.bucketIsEmpty()) {
            this.resetBucket();
            this.startTimer();
            return true;
        }
        var url = url_1.resolve(this.url, './client/metrics');
        var payload = this.getPayload();
        request_1.post({
            url: url,
            json: payload,
            appName: this.appName,
            instanceId: this.instanceId,
            headers: this.headers
        }, function (err, res, body) {
            _this.startTimer();
            if (err) {
                _this.emit('error', err);
                return;
            }
            if (res.statusCode === 404) {
                _this.emit('warn', url + " returning 404, stopping metrics");
                _this.stop();
                return;
            }
            if (!(res.statusCode && res.statusCode >= 200 && res.statusCode < 300)) {
                _this.emit('warn', url + " returning " + res.statusCode, body);
                return;
            }
            _this.emit('sent', payload);
        });
        return true;
    };
    Metrics.prototype.count = function (name, enabled) {
        if (this.disabled) {
            return false;
        }
        if (!this.bucket.toggles[name]) {
            this.bucket.toggles[name] = {
                yes: 0,
                no: 0
            };
        }
        this.bucket.toggles[name][enabled ? 'yes' : 'no']++;
        this.emit('count', name, enabled);
        return true;
    };
    Metrics.prototype.bucketIsEmpty = function () {
        return Object.keys(this.bucket.toggles).length === 0;
    };
    Metrics.prototype.resetBucket = function () {
        var bucket = {
            start: new Date(),
            stop: null,
            toggles: {}
        };
        this.bucket = bucket;
    };
    Metrics.prototype.closeBucket = function () {
        this.bucket.stop = new Date();
    };
    Metrics.prototype.getPayload = function () {
        this.closeBucket();
        var payload = this.getMetricsData();
        this.resetBucket();
        return payload;
    };
    Metrics.prototype.getClientData = function () {
        return {
            appName: this.appName,
            instanceId: this.instanceId,
            sdkVersion: this.sdkVersion,
            strategies: this.strategies,
            started: this.started,
            interval: this.metricsInterval
        };
    };
    Metrics.prototype.getMetricsData = function () {
        return {
            appName: this.appName,
            instanceId: this.instanceId,
            bucket: this.bucket
        };
    };
    return Metrics;
}(events_1.EventEmitter));
exports["default"] = Metrics;
//# sourceMappingURL=metrics.js.map