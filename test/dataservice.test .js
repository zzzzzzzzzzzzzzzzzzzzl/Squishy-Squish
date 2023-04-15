import { getReadData, getWriteData } from './server/dataService'
//setting up the test
//the outermost test suite that contains all of our tests for the dataService.
describe('dataService', () => {
  const dataFilePath = './data/data.json'

  beforeEach(async () => {
    // Create a fresh copy of the data file before each test
    await getWriteData({
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
        {
          id: 3,
          name: 'Holly',
          score: 80,
        },
        {
          id: 4,
          name: 'Dan',
          score: 100,
        },
        {
          id: 5,
          name: 'Alisha',
          score: 150,
        },
      ],
    })
  })
//Test teardown:
  afterEach(async () => {
    // Delete the data file after each test
    await getWriteData({
      leaderboard: [],
    })
  })

//finishing test set up

  describe('getReadData', () => {

    //test case:
    test('reads data from the data file', async () => {
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
          {
            id: 3,
            name: 'Holly',
            score: 80,
          },
          {
            id: 4,
            name: 'Dan',
            score: 100,
          },
          {
            id: 5,
            name: 'Alisha',
            score: 150,
          },
        ],
      }

      const actual = await getReadData()

      //Test assertion:
      expect(actual).toEqual(expected)
    })

    test('throws an error if the data file cannot be read', async () => {
      // Delete the data file to simulate a read error
      await getWriteData({
        leaderboard: [],
      })

      await expect(getReadData()).rejects.toThrow('Failed to read data file')
    })
  })

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
      }

      await getWriteData(expected)

      const actual = await getReadData()

      expect(actual).toEqual(expected)
    })

    test('throws an error if the data file cannot be written to', async () => {
      // Try to write data to a read-only file
      const readOnlyFilePath = './data/readOnly.json'
      await getWriteData(expected, readOnlyFilePath)
    
      await expect(getWriteData({}, readOnlyFilePath)).rejects.toThrow('Failed to write data file')
    })
    
        })
      })
  
    