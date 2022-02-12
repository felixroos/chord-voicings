import { lefthand } from './dictionaryVoicing';
import { dictionaryVoicing } from './dictionaryVoicing';
import { topNoteDiff } from './topNoteDiff';

test('dictionaryVoicing', () => {
  expect(dictionaryVoicing({ chord: 'Dm7', dictionary: lefthand, range: ['F3', 'A4'], sorter: topNoteDiff })).toEqual([
    'F3',
    'A3',
    'C4',
    'E4',
  ]);
  expect(
    dictionaryVoicing({
      chord: 'Dm7',
      dictionary: lefthand,
      range: ['F3', 'A4'],
      sorter: topNoteDiff,
      lastVoicing: ['C4', 'E4', 'G4', 'B4'],
    })
  ).toEqual(['C4', 'E4', 'F4', 'A4']);
});
