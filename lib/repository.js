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
var data_formatter_1 = require("./data-formatter");
var storage_1 = require("./storage");
var url_1 = require("url");
var request_1 = require("./request");
var Repository = /** @class */ (function (_super) {
    __extends(Repository, _super);
    function Repository(_a) {
        var backupPath = _a.backupPath, url = _a.url, appName = _a.appName, instanceId = _a.instanceId, refreshInterval = _a.refreshInterval, _b = _a.StorageImpl, StorageImpl = _b === void 0 ? storage_1.Storage : _b, headers = _a.headers;
        var _this = _super.call(this) || this;
        _this.url = url;
        _this.refreshInterval = refreshInterval;
        _this.instanceId = instanceId;
        _this.appName = appName;
        _this.headers = headers;
        _this.storage = new StorageImpl({ backupPath: backupPath, appName: appName });
        _this.storage.on('error', function (err) { return _this.emit('error', err); });
        _this.storage.on('ready', function () { return _this.emit('ready'); });
        process.nextTick(function () { return _this.fetch(); });
        return _this;
    }
    Repository.prototype.timedFetch = function () {
        var _this = this;
        if (this.refreshInterval != null && this.refreshInterval > 0) {
            this.timer = setTimeout(function () { return _this.fetch(); }, this.refreshInterval);
            if (process.env.NODE_ENV !== 'test') {
                this.timer.unref();
            }
        }
    };
    Repository.prototype.validateFeature = function (feature) {
        var errors = [];
        if (!Array.isArray(feature.strategies)) {
            errors.push("feature.strategies should be an array, but was " + typeof feature.strategies);
        }
        if (typeof feature.enabled !== 'boolean') {
            errors.push("feature.enabled should be an boolean, but was " + typeof feature.enabled);
        }
        if (errors.length > 0) {
            var err = new Error(errors.join(', '));
            this.emit('error', err);
        }
    };
    Repository.prototype.fetch = function () {
        var _this = this;
        var url = url_1.resolve(this.url, './client/features');
        request_1.get({
            url: url,
            etag: this.etag,
            appName: this.appName,
            instanceId: this.instanceId,
            headers: this.headers
        }, function (error, res, body) {
            // start timer for next fetch
            _this.timedFetch();
            if (error) {
                return _this.emit('error', error);
            }
            if (res.statusCode === 304) {
                // No new data
                return;
            }
            if (!(res.statusCode >= 200 && res.statusCode < 300)) {
                return _this.emit('error', new Error("Response was not statusCode 2XX, but was " + res.statusCode));
            }
            try {
                var payload = JSON.parse(body);
                var data = data_formatter_1.pickData(data_formatter_1.toNewFormat(payload));
                var obj = data.features.reduce(function (o, feature) {
                    _this.validateFeature(feature);
                    o[feature.name] = feature;
                    return o;
                }, {});
                _this.storage.reset(obj);
                _this.etag = res.headers.etag;
                _this.emit('data');
            }
            catch (err) {
                _this.emit('error', err);
            }
        });
    };
    Repository.prototype.stop = function () {
        clearInterval(this.timer);
        this.removeAllListeners();
        this.storage.removeAllListeners();
    };
    Repository.prototype.getToggle = function (name) {
        return this.storage.get(name);
    };
    Repository.prototype.getToggles = function () {
        var data = this.storage.getAll();
        return Object.keys(data).map(function (k) { return data[k]; });
    };
    return Repository;
}(events_1.EventEmitter));
exports["default"] = Repository;
//# sourceMappingURL=repository.js.map