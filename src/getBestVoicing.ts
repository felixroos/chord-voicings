import { Voicing, VoicingOptions } from './types';

export function getBestVoicing(voicingOptions: VoicingOptions): Voicing {
  const { chord, range, finder, sorter, lastVoicing } = voicingOptions;
  let voicings = finder(chord, range);
  if (!voicings.length) {
    return [];
  }
  let notes;
  if (!lastVoicing?.length) {
    //notes = voicings[Math.ceil(voicings.length / 2)]; // pick middle voicing..
    notes = voicings[0]; // pick lowest voicing..
  } else {
    // calculates the distance between the last note and the given voicings top note
    // sort voicings with differ
    notes = voicings.sort(sorter(lastVoicing))[0];
  }
  return notes;
}
