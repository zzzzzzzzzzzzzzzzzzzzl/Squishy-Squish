import { readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
//const fs = require('fs').promises
const filePath = path.join(__dirname, './data/data.json')
export async function getReadData() {
  try {
    const data = await readFile(filePath, 'utf-8')
    console.log(data)

    return JSON.parse(data)
  } catch (err) {
    throw new Error('Failed to read data file')
  }
}

export async function getWriteData(data: any) {
  try {
    await writeFile('./data/data.json', JSON.stringify(data, null, 2))
  } catch (err) {
    throw new Error('Failed to read data file')
  }
}
