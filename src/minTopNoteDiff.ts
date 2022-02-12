import { Note } from '@tonaljs/tonal';

export function minTopNoteDiff(voicings, lastVoicing) {
  if (!lastVoicing) {
    return voicings[0];
  }
  const diff = (voicing) =>
    Math.abs(Note.midi(lastVoicing[lastVoicing.length - 1]) - Note.midi(voicing[voicing.length - 1]));
  return voicings.reduce((best, current) => (diff(current) < diff(best) ? current : best), voicings[0]);
}
