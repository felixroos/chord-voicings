export function tokenizeChord(chord) {
  const match = (chord || '').match(/^([A-G][b#]*)([^\/]*)[\/]?([A-G][b#]*)?$/);
  if (!match) {
    // console.warn('could not tokenize chord', chord);
    return [];
  }
  return match.slice(1);
}