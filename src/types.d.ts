declare type Note = string;
declare type ChordSymbol = string;
declare type Voicing = Note[];
declare type VoicingString = string;
declare type NoteRange = [Note, Note];
declare type VoicingPicker = (voicings: Voicing[], lastVoicing?: Voicing) => Voicing;

declare interface VoicingOptions {
  chord: ChordSymbol;
  range: NoteRange;
  finder: (chordSymbol: ChordSymbol, range: NoteRange) => Voicing[]; // resolves all possible voicings in range
  picker: VoicingPicker;
  lastVoicing?: Voicing;
}

export declare type VoicingDictionary = {
  [symbol: ChordSymbol]: VoicingString[];
};
