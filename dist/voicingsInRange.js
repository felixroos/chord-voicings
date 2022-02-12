"use strict";
exports.__esModule = true;
exports.voicingsInRange = void 0;
var tonal_1 = require("@tonaljs/tonal");
var dictionaryVoicing_1 = require("./dictionaryVoicing");
var tokenizeChord_1 = require("./tokenizeChord");
function voicingsInRange(chord, dictionary, range) {
    if (dictionary === void 0) { dictionary = dictionaryVoicing_1.lefthand; }
    if (range === void 0) { range = ['D3', 'A4']; }
    var _a = (0, tokenizeChord_1.tokenizeChord)(chord), tonic = _a[0], symbol = _a[1];
    if (!dictionary[symbol]) {
        return [];
    }
    // resolve array of interval arrays for the wanted symbol
    var voicings = dictionary[symbol].map(function (intervals) { return intervals.split(' '); });
    var notesInRange = tonal_1.Range.chromatic(range); // gives array of notes inside range
    return voicings.reduce(function (voiced, voicing) {
        // transpose intervals relative to first interval (e.g. 3m 5P > 1P 3M)
        var relativeIntervals = voicing.map(function (interval) { return tonal_1.Interval.substract(interval, voicing[0]); });
        // get enharmonic correct pitch class the bottom note
        var bottomPitchClass = tonal_1.Note.transpose(tonic, voicing[0]);
        // get all possible start notes for voicing
        var starts = notesInRange
            // only get the start notes:
            .filter(function (note) { return tonal_1.Note.chroma(note) === tonal_1.Note.chroma(bottomPitchClass); })
            // filter out start notes that will overshoot the top end of the range
            .filter(function (note) {
            return tonal_1.Note.midi(tonal_1.Note.transpose(note, relativeIntervals[relativeIntervals.length - 1])) <= tonal_1.Note.midi(range[1]);
        })
            // replace Range.chromatic notes with the correct enharmonic equivalents
            .map(function (note) { return tonal_1.Note.enharmonic(note, bottomPitchClass); });
        // render one voicing for each start note
        var notes = starts.map(function (start) { return relativeIntervals.map(function (interval) { return tonal_1.Note.transpose(start, interval); }); });
        return voiced.concat(notes);
    }, []);
}
exports.voicingsInRange = voicingsInRange;
//# sourceMappingURL=voicingsInRange.js.map