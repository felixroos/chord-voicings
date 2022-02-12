"use strict";
exports.__esModule = true;
exports.topNoteDiff = void 0;
var tonal_1 = require("@tonaljs/tonal");
function topNoteDiff(lastVoicing) {
    var diff = function (voicing) {
        return Math.abs(tonal_1.Note.midi(lastVoicing[lastVoicing.length - 1]) - tonal_1.Note.midi(voicing[voicing.length - 1]));
    };
    return function (a, b) { return diff(a) - diff(b); };
}
exports.topNoteDiff = topNoteDiff;
//# sourceMappingURL=topNoteDiff.js.map