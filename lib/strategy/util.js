"use strict";
exports.__esModule = true;
var murmurhash3js_1 = require("murmurhash3js");
function normalizedValue(id, groupId, normalizer) {
    if (normalizer === void 0) { normalizer = 100; }
    return murmurhash3js_1.murmurHash3.x86.hash32(groupId + ":" + id) % normalizer + 1;
}
exports.normalizedValue = normalizedValue;
//# sourceMappingURL=util.js.map