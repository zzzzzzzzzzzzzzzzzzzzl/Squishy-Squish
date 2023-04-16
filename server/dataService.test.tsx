import { getReadData, getWriteData } from './dataService'
import { readFile, writeFile } from 'node:fs/promises'

jest.mock('node:fs/promises')

describe('getReadData', () => {
  test('returns parsed data when file is read successfully', async () => {
    const mockData = { leaderboard: [{ name: 'Alice', score: 100 }] }
    const mockedReadFile = readFile as jest.MockedFunction<typeof readFile>
    mockedReadFile.mockResolvedValueOnce(JSON.stringify(mockData))

    const data = await getReadData()

    expect(data).toEqual(mockData)
  })

  test('throws error when file read fails', async () => {
    const mockedReadFile = readFile as jest.MockedFunction<typeof readFile>
    mockedReadFile.mockRejectedValueOnce(new Error('Failed to read data file'))

    await expect(getReadData()).rejects.toThrow('Failed to read data file')
  })
})

describe('getWriteData', () => {
  test('throws error when file write fails', async () => {
    const mockData = { leaderboard: [{ name: 'Alice', score: 100 }] }
    const mockedWriteFile = writeFile as jest.MockedFunction<typeof writeFile>
    mockedWriteFile.mockRejectedValueOnce(
      new Error('Failed to write to data file')
    )

    await expect(getWriteData(mockData)).rejects.toThrow(
      'Failed to write to data file'
    )
  })
})
