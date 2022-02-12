import { getBestVoicing } from './getBestVoicing';
import { VoicingDictionary, VoicingOptions } from './types';
import { voicingsInRange } from './voicingsInRange';

export const lefthand: VoicingDictionary = {
  m7: ['3m 5P 7m 9M', '7m 9M 10m 12P'],
  '7': ['3M 6M 7m 9M', '7m 9M 10M 13M'],
  '^7': ['3M 5P 7M 9M', '7M 9M 10M 12P'],
  '69': ['3M 5P 6A 9M'],
  m7b5: ['3m 5d 7m 8P', '7m 8P 10m 12d'],
  '7b9': ['3M 6m 7m 9m', '7m 9m 10M 13m'], // b9 / b13
  '7b13': ['3M 6m 7m 9m', '7m 9m 10M 13m'], // b9 / b13
  o7: ['1P 3m 5d 6M', '5d 6M 8P 10m'],
  '7#11': ['7m 9M 11A 13A'],
  '7#9': ['3M 7m 9A'],
  mM7: ['3m 5P 7M 9M', '7M 9M 10m 12P'],
  m6: ['3m 5P 6M 9M', '6M 9M 10m 12P'],
};
export const guidetones: VoicingDictionary = {
  m7: ['3m 7m', '7m 10m'],
  m9: ['3m 7m', '7m 10m'],
  '7': ['3M 7m', '7m 10M'],
  '^7': ['3M 7M', '7M 10M'],
  '^9': ['3M 7M', '7M 10M'],
  '69': ['3M 6M'],
  '6': ['3M 6M', '6M 10M'],
  m7b5: ['3m 7m', '7m 10m'],
  '7b9': ['3M 7m', '7m 10M'], // b9 / b13
  '7b13': ['3M 7m', '7m 10M'], // b9 / b13
  o7: ['3m 6M', '6M 10m'],
  '7#11': ['3M 7m', '7m 10M'],
  '7#9': ['3M 7m', '7m 10M'],
  mM7: ['3m 7M', '7M 10m'],
  m6: ['3m 6M', '6M 10m'],
};
export const triads: VoicingDictionary = {
  M: ['1P 3M 5P', '3M 5P 8P', '5P 8P 10M'],
  m: ['1P 3m 5P', '3m 5P 8P', '5P 8P 10m'],
  o: ['1P 3m 5d', '3m 5d 8P', '5d 8P 10m'],
  aug: ['1P 3m 5A', '3m 5A 8P', '5A 8P 10m'],
};

export declare interface DictionaryVoicingProps extends Omit<VoicingOptions, 'finder'> {
  dictionary: VoicingDictionary;
}

export const dictionaryVoicingFinder = (dictionary) => (chordSymbol, range) =>
  voicingsInRange(chordSymbol, dictionary, range);

export const dictionaryVoicing = (props: DictionaryVoicingProps) => {
  const { dictionary, range, ...rest } = props;
  return getBestVoicing({
    ...rest,
    range,
    finder: dictionaryVoicingFinder(dictionary),
  });
};
