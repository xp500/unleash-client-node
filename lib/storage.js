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
var path_1 = require("path");
var fs_1 = require("fs");
var Storage = /** @class */ (function (_super) {
    __extends(Storage, _super);
    function Storage(_a) {
        var backupPath = _a.backupPath, appName = _a.appName;
        var _this = _super.call(this) || this;
        // ready is a "ready"-flag to signal that storage is ready with data,
        // and to signal to backup not to store fetched backup
        _this.ready = false;
        _this.data = {};
        _this.path = path_1.join(backupPath, "/unleash-repo-schema-v1-" + _this.safeAppName(appName) + ".json");
        _this.load();
        return _this;
    }
    Storage.prototype.safeAppName = function (appName) {
        if (appName === void 0) { appName = ''; }
        return appName.replace(/\//g, '_');
    };
    Storage.prototype.reset = function (data, doPersist) {
        var _this = this;
        if (doPersist === void 0) { doPersist = true; }
        var doEmitReady = this.ready === false;
        this.ready = true;
        this.data = data;
        process.nextTick(function () {
            if (doEmitReady) {
                _this.emit('ready');
            }
            if (doPersist) {
                _this.persist();
            }
        });
    };
    Storage.prototype.get = function (key) {
        return this.data[key];
    };
    Storage.prototype.persist = function () {
        var _this = this;
        fs_1.writeFile(this.path, JSON.stringify(this.data), function (err) {
            if (err) {
                return _this.emit('error', err);
            }
            _this.emit('persisted', true);
        });
    };
    Storage.prototype.getAll = function () {
        // TODO: is this really necessary? Wanted to keep a bit
        // of the "private" accessor of data member.
        return Object.assign({}, this.data);
    };
    Storage.prototype.load = function () {
        var _this = this;
        fs_1.readFile(this.path, 'utf8', function (err, data) {
            if (_this.ready) {
                return;
            }
            if (err) {
                if (err.code !== 'ENOENT') {
                    _this.emit('error', err);
                }
                return;
            }
            try {
                _this.reset(JSON.parse(data), false);
            }
            catch (err) {
                err.message = "Unleash storage failed parsing file " + _this.path + ": " + err.message;
                _this.emit('error', err);
            }
        });
    };
    return Storage;
}(events_1.EventEmitter));
exports.Storage = Storage;
//# sourceMappingURL=storage.js.map