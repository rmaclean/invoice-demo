import * as fs from 'node:fs/promises'

const getDataFromSource = async () => {
    return JSON.parse(await fs.readFile('./data/data.json', 'utf8'))
}

const getInvoices = async (filter) => {
    return (await getDataFromSource()).filter(i => {
        if (filter) {
            return i.status == filter.status
        } 
        
        // no filter
        return true
    })
}

export { getInvoices }