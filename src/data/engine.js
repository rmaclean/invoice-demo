import * as fs from 'node:fs/promises'

const getDataFromSource = async () => {
    return JSON.parse(await fs.readFile('./data/data.json', 'utf8'))
}

const getInvoices = async (filter) => {
    return (await getDataFromSource()).filter(i => {
        if (filter) {
            if (filter.status && i.status != filter.status) {
                return false
            }

            if (filter.id && i.id != filter.id) {
                return false
            }
        } 
        
        // no filter
        return true
    })
}

export { getInvoices }