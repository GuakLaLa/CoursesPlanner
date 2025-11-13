// versioning.test.js
const { getNextVersionNumber } = require('../utils/versioning');

describe('Versioning Logic', () => {
  test('returns 1 when no previous version exists', () => {
    expect(getNextVersionNumber(null)).toBe(1);
  });

  test('increments version number correctly', () => {
    expect(getNextVersionNumber({ version: 5 })).toBe(6);
  });
});
