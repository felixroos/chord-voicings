"use strict";
exports.__esModule = true;
exports.minTopNoteDiff = void 0;
var tonal_1 = require("@tonaljs/tonal");
function minTopNoteDiff(voicings, lastVoicing) {
    if (!lastVoicing) {
        return voicings[0];
    }
    var diff = function (voicing) {
        return Math.abs(tonal_1.Note.midi(lastVoicing[lastVoicing.length - 1]) - tonal_1.Note.midi(voicing[voicing.length - 1]));
    };
    return voicings.reduce(function (best, current) { return (diff(current) < diff(best) ? current : best); }, voicings[0]);
}
exports.minTopNoteDiff = minTopNoteDiff;
//# sourceMappingURL=minTopNoteDiff.js.map