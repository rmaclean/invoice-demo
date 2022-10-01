const padTwoDigitNumber = (number) => {
    let result = number.toString(10)
    if (number < 10) {
        return `0${result}`
    }

    return result
}

const formatDate = (date) => {
    return `${date.getFullYear()}-${padTwoDigitNumber(date.getMonth() + 1)}-${padTwoDigitNumber(date.getDate())}`
}

const getNowString = () => {
    const now = new Date(Date.now())
    return formatDate(now)
}

const incrementDate = (initialDate, days) => {
    if (days <= 0) {
        return initialDate
    }

    const daysAsMS = days * 86400000 // 1000ms * 60sec * 60min * 24hr
    const parsedDate = new Date(initialDate)
    parsedDate.setTime(parsedDate.getTime() + daysAsMS)
    return formatDate(parsedDate)
}

export { getNowString, incrementDate }