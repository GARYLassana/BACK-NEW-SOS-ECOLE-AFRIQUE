const getIntervalDate = () => {
    const data = new Date()
    const month = data.getMonth();
    const year = data.getFullYear();
    let min = ''
    let max = ''
    if (month >= 8 && month <= 12) {
        min = `${year}-08-01 00:00:00`
        max = `${year + 1}-06-01 00:00:00`
    } else {
        min = `${year - 1}-08-01 00:00:00`
        max = `${year}-06-01 00:00:00`
    }
    return {min, max}
}
module.exports =  {getIntervalDate}