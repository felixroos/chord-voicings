import { Voicing, VoicingOptions } from './types';

export function getBestVoicing(voicingOptions: VoicingOptions): Voicing {
  const { chord, range, finder, picker, lastVoicing } = voicingOptions;
  let voicings = finder(chord, range);
  if (!voicings.length) {
    return [];
  }
  return picker(voicings, lastVoicing);
}
