"use strict";
exports.__esModule = true;
exports.tokenizeChord = void 0;
function tokenizeChord(chord) {
    var match = (chord || '').match(/^([A-G][b#]*)([^\/]*)[\/]?([A-G][b#]*)?$/);
    if (!match) {
        // console.warn('could not tokenize chord', chord);
        return [];
    }
    return match.slice(1);
}
exports.tokenizeChord = tokenizeChord;
//# sourceMappingURL=tokenizeChord.js.map