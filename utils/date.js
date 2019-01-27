// Get current date + hours interval
export const getNextDateInterval = (hours) => {
    var dt = new Date();
    dt.setHours(dt.getHours() + hours);
    return dt;
}