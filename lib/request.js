"use strict";
exports.__esModule = true;
var request = require("request");
exports.post = function (_a, cb) {
    var url = _a.url, appName = _a.appName, timeout = _a.timeout, instanceId = _a.instanceId, headers = _a.headers, json = _a.json;
    var options = {
        url: url,
        timeout: timeout || 10000,
        headers: Object.assign({
            'UNLEASH-APPNAME': appName,
            'UNLEASH-INSTANCEID': instanceId,
            'User-Agent': appName
        }, headers),
        json: json
    };
    return request.post(options, cb);
};
exports.get = function (_a, cb) {
    var url = _a.url, etag = _a.etag, appName = _a.appName, timeout = _a.timeout, instanceId = _a.instanceId, headers = _a.headers;
    var options = {
        url: url,
        timeout: timeout || 10000,
        headers: Object.assign({
            'UNLEASH-APPNAME': appName,
            'UNLEASH-INSTANCEID': instanceId,
            'User-Agent': appName
        }, headers)
    };
    if (etag) {
        options.headers['If-None-Match'] = etag;
    }
    return request.get(options, cb);
};
//# sourceMappingURL=request.js.map