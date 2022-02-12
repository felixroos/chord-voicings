# chord-voicings

This package contains logic to find chords voicings for a given chord symbol.

## Install

```sh
npm i chord-voicings --save
```

## Usage

```js
import { dictionaryVoicing, minTopNoteDiff, lefthand } from 'chord-voicings';

const getVoicing = (chord, lastVoicing) =>
  dictionaryVoicing({
    chord,
    dictionary: lefthand,
    range: ['F3', 'A4'],
    picker: minTopNoteDiff,
    lastVoicing,
  });

getVoicing('Dm7'); // ['F3', 'A3', 'C3', 'E3']
getVoicing('Dm7', ['F3', 'A3', 'C3', 'E3']); // ['C4', 'E4', 'F4', 'A4']
```

- `chord`: the chord (= note + chord symbol) we want to voice. The available symbols depend on your `dictionary`.
- `dictionary`: Maps chord symbols to possible interval structures. You can either use one of the [available voicing dictionaries](./src/dictionaryVoicing.ts), or create your own.
- `range`: The range inside which we are allowed to voice.
- `lastVoicing` (optional): voicing that came before. If given, the best voice leading will be chosen using `picker`.
- `picker`: Function that picks the best voicing after `lastVoicing`. Currently, there is only `minTopNoteDiff`, which picks the voicing with the smallest top note distance (or first if no `lastVoicing` given).

I made this lib after writing [this post](https://loophole-letters.vercel.app/rhythmical-chords).
I also started to integrate this idea directly into tonaljs, see [this issue](https://github.com/tonaljs/tonal/issues/230).
Currently, I just want some lib I can use directly without waiting for the tonal integration to fruit.
