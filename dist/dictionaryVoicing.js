"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
exports.__esModule = true;
exports.dictionaryVoicing = exports.dictionaryVoicingFinder = exports.triads = exports.guidetones = exports.lefthand = void 0;
var getBestVoicing_1 = require("./getBestVoicing");
var voicingsInRange_1 = require("./voicingsInRange");
exports.lefthand = {
    m7: ['3m 5P 7m 9M', '7m 9M 10m 12P'],
    '7': ['3M 6M 7m 9M', '7m 9M 10M 13M'],
    '^7': ['3M 5P 7M 9M', '7M 9M 10M 12P'],
    '69': ['3M 5P 6A 9M'],
    m7b5: ['3m 5d 7m 8P', '7m 8P 10m 12d'],
    '7b9': ['3M 6m 7m 9m', '7m 9m 10M 13m'],
    '7b13': ['3M 6m 7m 9m', '7m 9m 10M 13m'],
    o7: ['1P 3m 5d 6M', '5d 6M 8P 10m'],
    '7#11': ['7m 9M 11A 13A'],
    '7#9': ['3M 7m 9A'],
    mM7: ['3m 5P 7M 9M', '7M 9M 10m 12P'],
    m6: ['3m 5P 6M 9M', '6M 9M 10m 12P']
};
exports.guidetones = {
    m7: ['3m 7m', '7m 10m'],
    m9: ['3m 7m', '7m 10m'],
    '7': ['3M 7m', '7m 10M'],
    '^7': ['3M 7M', '7M 10M'],
    '^9': ['3M 7M', '7M 10M'],
    '69': ['3M 6M'],
    '6': ['3M 6M', '6M 10M'],
    m7b5: ['3m 7m', '7m 10m'],
    '7b9': ['3M 7m', '7m 10M'],
    '7b13': ['3M 7m', '7m 10M'],
    o7: ['3m 6M', '6M 10m'],
    '7#11': ['3M 7m', '7m 10M'],
    '7#9': ['3M 7m', '7m 10M'],
    mM7: ['3m 7M', '7M 10m'],
    m6: ['3m 6M', '6M 10m']
};
exports.triads = {
    M: ['1P 3M 5P', '3M 5P 8P', '5P 8P 10M'],
    m: ['1P 3m 5P', '3m 5P 8P', '5P 8P 10m'],
    o: ['1P 3m 5d', '3m 5d 8P', '5d 8P 10m'],
    aug: ['1P 3m 5A', '3m 5A 8P', '5A 8P 10m']
};
var dictionaryVoicingFinder = function (dictionary) { return function (chordSymbol, range) {
    return (0, voicingsInRange_1.voicingsInRange)(chordSymbol, dictionary, range);
}; };
exports.dictionaryVoicingFinder = dictionaryVoicingFinder;
var dictionaryVoicing = function (props) {
    var dictionary = props.dictionary, range = props.range, rest = __rest(props, ["dictionary", "range"]);
    return (0, getBestVoicing_1.getBestVoicing)(__assign(__assign({}, rest), { range: range, finder: (0, exports.dictionaryVoicingFinder)(dictionary) }));
};
exports.dictionaryVoicing = dictionaryVoicing;
//# sourceMappingURL=dictionaryVoicing.js.map