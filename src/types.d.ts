declare type Note = string;
declare type ChordSymbol = string;
declare type Voicing = Note[];
declare type VoicingString = string;
declare type NoteRange = [Note, Note];
declare type VoicingSorter = (lastVoicing: Voicing) => (a: Voicing, b: Voicing) => number;

declare interface VoicingOptions {
  chord: ChordSymbol;
  range: NoteRange;
  finder: (chordSymbol: ChordSymbol, range: NoteRange) => Voicing[]; // resolves all possible voicings in range
  sorter: VoicingSorter;
  lastVoicing?: Voicing;
}

export declare type VoicingDictionary = {
  [symbol: ChordSymbol]: VoicingString[];
};
