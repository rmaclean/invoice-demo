import * as fs from 'node:fs/promises'

const getAll = async () => {
    const rawData = await fs.readFile('./data/data.json', 'utf8')
    const result = JSON.parse(rawData)
    return result
}

export { getAll }