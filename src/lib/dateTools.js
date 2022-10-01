const padTwoDigitNumber = (number) => {
    let result = number.toString(10)
    if (number < 10) {
        return `0${result}`
    }

    return result
}

const getNowString = () => {
    const now = new Date(Date.now())

    return `${now.getFullYear()}-${padTwoDigitNumber(now.getMonth() + 1)}-${padTwoDigitNumber(now.getDate())}`
}

export { getNowString }