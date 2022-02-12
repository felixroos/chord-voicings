import { Note } from '@tonaljs/tonal';


export function topNoteDiff(lastVoicing) {
  const diff = (voicing) =>
    Math.abs(Note.midi(lastVoicing[lastVoicing.length - 1]) - Note.midi(voicing[voicing.length - 1]));
  return (a, b) => diff(a) - diff(b);
}
