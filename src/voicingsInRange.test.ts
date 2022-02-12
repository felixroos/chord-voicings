import { Chord, tokenizeNote } from '@tonaljs/tonal';
import { voicingsInRange } from './voicingsInRange';

describe('voicingsInRange', () => {
  test('tonaljs support of ireal chord symbols', () => {
    // this tests which of the chord symbols that are used in the ireal playlist for the first realbook are supported by tonaljs
    // see analytics.test for info on how to get those chords
    const realbook1chords = [
      '7',
      '-7',
      '^7',
      '7b9',
      'h7',
      '6',
      '-',
      '7sus',
      'M',
      'o7',
      '-6',
      '^7#11',
      '7#11',
      '-11',
      '-^7',
      '7#9',
      '7#5',
      '13',
      '7alt',
      '7b13',
      '^9',
      'sus',
      'o',
      '9sus',
      '-9',
      '9',
      'h',
      '-b6',
      '7#9#5',
      '13b9',
      '^7#5',
      '69',
      '7b5',
      '7b9sus',
      '7b13sus',
      '9#5',
      '13sus',
      '7b9b13',
      '7b9b5',
      '^9#11',
      '7#9b5',
      '9#11',
      'add9',
      '-69',
      '7susadd3',
      '9b5',
      '7b9#9',
      '5',
      '+',
      '13#11',
      '-7b5',
      '7b9#11',
    ];
    const isSupported = (symbol) => Chord.get('C' + symbol).aliases.includes(symbol);
    const supported = realbook1chords.filter(isSupported);
    const unsupported = realbook1chords.filter((symbol) => !isSupported(symbol));
    expect(supported).toEqual([
      '7',
      '^7',
      '7b9',
      'h7',
      '6',
      '7sus',
      'M',
      'o7',
      '^7#11',
      '7#11',
      '7#9',
      '7#5',
      '13',
      '7alt',
      '7b13',
      '^9',
      'sus',
      'o',
      '9sus',
      '9',
      'h',
      '7#9#5',
      '13b9',
      '^7#5',
      '7b5',
      '7b9sus',
      '9#5',
      '13sus',
      '7b9b13',
      '7b9b5',
      '^9#11',
      '7#9b5',
      '9#11',
      'add9',
      '9b5',
      '7b9#9',
      '5',
      '+',
      '13#11',
      '7b9#11',
    ]);
    expect(unsupported).toEqual([
      '-7',
      '-',
      '-6',
      '-11',
      '-^7',
      '-9',
      '-b6',
      '69',
      '7b13sus',
      '-69',
      '7susadd3',
      '-7b5',
    ]);
    // alternative symbols for the ones that are not supported "out of the box"
    const alternatives = {
      '-7': 'm7',
      '-': 'm',
      '-6': 'm6',
      '-11': 'm11',
      '-^7': 'mM7',
      '-9': 'm9',
      '-b6': 'mb6',
      '69': '69',
      '7b13sus': '7b13sus',
      '-69': 'm69',
      '7susadd3': '7susadd3',
      '-7b5': 'm7b5',
    };
    const unsupporedAlternatives = Object.entries(alternatives)
      .filter(([_, alternative]) => !isSupported(alternative))
      .map(([symbol, alternative]) => symbol);
    expect(unsupporedAlternatives).toEqual(['69', '-b6', '7b13sus', '7susadd3']); // those chords will always fail
    const toTonalChordSymbol = (symbol) => {
      if (isSupported(symbol)) {
        return symbol;
      }
      if (alternatives?.[symbol] && isSupported(alternatives?.[symbol])) {
        return alternatives?.[symbol];
      }
      return 'unsupported###' + symbol;
    };
    expect(
      realbook1chords
        .map(toTonalChordSymbol)
        .filter((symbol) => symbol.startsWith('unsupported'))
        .map((unsupportedSymbol) => unsupportedSymbol.split('###')[1])
    ).toEqual([
      '-b6', // ["1P", "3m", "5P", "6m"]
      '69', // ["1P", "3M", "5P", "6M", "9M"]
      '7b13sus', // ["1P", "4P", "5P", "6m", "7m"]
      '7susadd3', // ["1P", "3M", "4P", "5P", "7m"]
    ]); // those symbols will always fail...
  });

  // 6, 64, 7, 9, 11 and 13 are consider part of the chord
  // (see https://github.com/danigb/tonal/issues/55)

  const NUM_TYPES = /^(-11|-6|-|-7|-9|-69|69|6|64|7|9|11|13)$/;
  function tokenizeFix(name: string) {
    const [letter, acc, oct, type] = tokenizeNote(name);
    if (letter === '') {
      return ['', name];
    }
    // aug is augmented (see https://github.com/danigb/tonal/issues/55)
    if (letter === 'A' && type === 'ug') {
      return ['', 'aug'];
    }
    // see: https://github.com/tonaljs/tonal/issues/70
    if (!type && (oct === '4' || oct === '5')) {
      return [letter + acc, oct];
    }

    if (NUM_TYPES.test(oct)) {
      return [letter + acc, oct + type];
    } else {
      return [letter + acc + oct, type];
    }
  }

  test('Chord.tokenize', () => {
    expect(Chord.tokenize('C7')).toEqual(['C', '7']); //ok
    // not ok:
    expect(Chord.tokenize('C-7')).toEqual(['C-7', '']);
    expect(Chord.tokenize('C69')).toEqual(['C69', '']);
    expect(Chord.tokenize('C-')).toEqual(['C-', '']);
    expect(Chord.tokenize('C-6')).toEqual(['C-6', '']);
    expect(Chord.tokenize('C-11')).toEqual(['C-11', '']);
    expect(Chord.tokenize('C-^7')).toEqual(['C-', '^7']);
    expect(Chord.tokenize('C-9')).toEqual(['C-9', '']);
    expect(Chord.tokenize('C-b6')).toEqual(['C-', 'b6']);
    expect(Chord.tokenize('C69')).toEqual(['C69', '']);
    expect(Chord.tokenize('C7b13sus')).toEqual(['C', '7b13sus']);
    expect(Chord.tokenize('C-69')).toEqual(['C-69', '']);
    expect(Chord.tokenize('C7susadd3')).toEqual(['C', '7susadd3']);
    expect(Chord.tokenize('C-7b5')).toEqual(['C-7', 'b5']);

    expect(tokenizeFix('C7')).toEqual(['C', '7']);
    expect(tokenizeFix('C-7')).toEqual(['C', '-7']);
    expect(tokenizeFix('C69')).toEqual(['C', '69']);
    expect(tokenizeFix('C-')).toEqual(['C', '-']);
    expect(tokenizeFix('C-6')).toEqual(['C', '-6']);
    expect(tokenizeFix('C-11')).toEqual(['C', '-11']);
    expect(tokenizeFix('C-^7')).toEqual(['C', '-^7']);
    expect(tokenizeFix('C-9')).toEqual(['C', '-9']);
    expect(tokenizeFix('C-b6')).toEqual(['C', '-b6']);
    expect(tokenizeFix('C69')).toEqual(['C', '69']);
    expect(tokenizeFix('C7b13sus')).toEqual(['C', '7b13sus']);
    expect(tokenizeFix('C-69')).toEqual(['C', '-69']);
    expect(tokenizeFix('C7susadd3')).toEqual(['C', '7susadd3']);
    expect(tokenizeFix('C-7b5')).toEqual(['C', '-7b5']);
  });
  test('aliases', () => {
    expect(Chord.tokenize('C7b13sus')).toEqual(['C', '7b13sus']);
    expect(Chord.tokenize('C7')).toEqual(['C', '7']); // problem
    expect(Chord.tokenize('C-7')).toEqual(['C-7', '']); // problem
    /*     const noteRegex = /^([a-gA-G]?)(#{1,}|b{1,}|x{1,}|)(-?\d*)\s*(.*)$/;
    expect(noteRegex.exec('C7')).toStrictEqual(['C7', 'C', '', '7', '']); //
    expect(noteRegex.exec('C-7')).toEqual(['']); */
  });

  test('C major triad inversions', () => {
    expect(voicingsInRange('C', { '': ['1M 3M 5P', '3M 5P 8P', '5P 8P 10M'] }, ['C3', 'C5'])).toEqual([
      ['C3', 'E3', 'G3'],
      ['C4', 'E4', 'G4'],
      ['E3', 'G3', 'C4'],
      ['E4', 'G4', 'C5'],
      ['G3', 'C4', 'E4'],
    ]);
  });
});
test('C^7 lefthand', () => {
  expect(voicingsInRange('C^7', { '^7': ['3M 5P 7M 9M', '7M 9M 10M 12P'] }, ['E3', 'D5'])).toEqual([
    ['E3', 'G3', 'B3', 'D4'],
    ['E4', 'G4', 'B4', 'D5'],
    ['B3', 'D4', 'E4', 'G4'],
  ]);
});

test('C-7 lefthand', () => {
  expect(voicingsInRange('C-7', { '-7': ['3m 5P 7m 9M', '7m 9M 10m 12P'] }, ['Eb3', 'D5'])).toEqual([
    ['Eb3', 'G3', 'Bb3', 'D4'],
    ['Eb4', 'G4', 'Bb4', 'D5'],
    ['Bb3', 'D4', 'Eb4', 'G4'],
  ]);
});
