import { Chord, Interval, Note, Range } from '@tonaljs/tonal';
import { lefthand } from './dictionaryVoicing';
import { tokenizeChord } from './tokenizeChord';
import { NoteRange } from './types';

export function voicingsInRange(chord, dictionary = lefthand, range: NoteRange = ['D3', 'A4']): string[][] {
  const [tonic, symbol] = tokenizeChord(chord);
  if (!dictionary[symbol]) {
    return [];
  }
  // resolve array of interval arrays for the wanted symbol
  const voicings = dictionary[symbol].map((intervals) => intervals.split(' '));
  const notesInRange = Range.chromatic(range); // gives array of notes inside range
  return voicings.reduce((voiced: string[][], voicing: string[]) => {
    // transpose intervals relative to first interval (e.g. 3m 5P > 1P 3M)
    const relativeIntervals = voicing.map((interval) => Interval.substract(interval, voicing[0]));
    // get enharmonic correct pitch class the bottom note
    const bottomPitchClass = Note.transpose(tonic, voicing[0]);
    // get all possible start notes for voicing
    const starts = notesInRange
      // only get the start notes:
      .filter((note) => Note.chroma(note) === Note.chroma(bottomPitchClass))
      // filter out start notes that will overshoot the top end of the range
      .filter(
        (note) =>
          Note.midi(Note.transpose(note, relativeIntervals[relativeIntervals.length - 1])) <= Note.midi(range[1])
      )
      // replace Range.chromatic notes with the correct enharmonic equivalents
      .map((note) => Note.enharmonic(note, bottomPitchClass));
    // render one voicing for each start note
    const notes = starts.map((start) => relativeIntervals.map((interval) => Note.transpose(start, interval)));
    return voiced.concat(notes);
  }, []);
}
