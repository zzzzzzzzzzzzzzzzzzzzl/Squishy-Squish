import { getReadData, getWriteData } from './dataService';
import fs from 'fs/promises';

import '@testing-library/jest-dom'
import path from 'node:path'

const filePath = path.join(__dirname, './data/data.json')

describe('dataService', () => {
  beforeEach(async () => {
    await getWriteData({
      leaderboard: [
        {
          id: 1,
          name: 'Fido',
          score: 50,
        },
      ],
    });
  });
  
  afterEach(async () => {
    await getWriteData(filePath);
  });
  
  test('reads data from the data file', async () => {
    const expected = {
      leaderboard: [
        {
          id: 1,
          name: 'Fido',
          score: 50,
        },
      ]
    };
  
    const actual = await getReadData();
  
    expect(actual).toEqual(expected);
  });
  
  test('throws an error if the data file cannot be read', async () => {
    await getWriteData({ leaderboard: [] });

    await expect(getReadData()).rejects.toThrow('Failed to read data file');
  });

  describe('getWriteData', () => {
    test('writes data to the data file', async () => {
      const expected = {
        leaderboard: [
          {
            id: 1,
            name: 'Fido',
            score: 50,
          },
          {
            id: 2,
            name: 'John',
            score: 60,
          },
        ],
      };

      await getWriteData(expected);

      const actual = await getReadData();

      expect(actual).toEqual(expected);
    });

    test('throws an error if the data file cannot be written to', async () => {
      const readOnlyFilePath = './data/readOnly.json';

      await expect(getWriteData({}, readOnlyFilePath)).rejects.toThrow('Failed to write data file');
    });
  });
});
