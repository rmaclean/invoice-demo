const createInt = () => Math.floor(Math.random() * 10)
const createLetter = () => String.fromCharCode(Math.floor(Math.random() * 26) + 65)

const createID = (userIDs) => {
    for (; ;) {
        let proposedID = ''
        for (let index = 0; index < 2; index++) {
            proposedID += createLetter()
        }

        for (let index = 0; index < 4; index++) {
            proposedID += createInt()
        }

        const existingID = userIDs.find(existing => existing === proposedID)
        if (!existingID) {
            return proposedID
        }
    }
}

export { createID }