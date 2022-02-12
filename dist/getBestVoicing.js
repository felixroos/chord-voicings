"use strict";
exports.__esModule = true;
exports.getBestVoicing = void 0;
function getBestVoicing(voicingOptions) {
    var chord = voicingOptions.chord, range = voicingOptions.range, finder = voicingOptions.finder, sorter = voicingOptions.sorter, lastVoicing = voicingOptions.lastVoicing;
    var voicings = finder(chord, range);
    if (!voicings.length) {
        return [];
    }
    var notes;
    if (!(lastVoicing === null || lastVoicing === void 0 ? void 0 : lastVoicing.length)) {
        //notes = voicings[Math.ceil(voicings.length / 2)]; // pick middle voicing..
        notes = voicings[0]; // pick lowest voicing..
    }
    else {
        // calculates the distance between the last note and the given voicings top note
        // sort voicings with differ
        notes = voicings.sort(sorter(lastVoicing))[0];
    }
    return notes;
}
exports.getBestVoicing = getBestVoicing;
//# sourceMappingURL=getBestVoicing.js.map