"use strict";
exports.__esModule = true;
exports.getBestVoicing = void 0;
function getBestVoicing(voicingOptions) {
    var chord = voicingOptions.chord, range = voicingOptions.range, finder = voicingOptions.finder, picker = voicingOptions.picker, lastVoicing = voicingOptions.lastVoicing;
    var voicings = finder(chord, range);
    if (!voicings.length) {
        return [];
    }
    return picker(voicings, lastVoicing);
}
exports.getBestVoicing = getBestVoicing;
//# sourceMappingURL=getBestVoicing.js.map