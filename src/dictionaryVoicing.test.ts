import { lefthand } from './dictionaryVoicing';
import { dictionaryVoicing } from './dictionaryVoicing';
import { minTopNoteDiff } from './minTopNoteDiff';

test('dictionaryVoicing', () => {
  expect(
    dictionaryVoicing({ chord: 'Dm7', dictionary: lefthand, range: ['F3', 'A4'], picker: minTopNoteDiff })
  ).toEqual(['F3', 'A3', 'C4', 'E4']);
  expect(
    dictionaryVoicing({
      chord: 'Dm7',
      dictionary: lefthand,
      range: ['F3', 'A4'],
      picker: minTopNoteDiff,
      lastVoicing: ['C4', 'E4', 'G4', 'B4'],
    })
  ).toEqual(['C4', 'E4', 'F4', 'A4']);
});
