export const searchReadings = (str,readings) => {
    return readings.filter(reading => reading.includes(str.toLowerCase()));
}

export const getActive = (names,obj) => {
    return names.reduce((count,name) => {
        return obj[name].active ? count + 1 : count;
    },0)
}