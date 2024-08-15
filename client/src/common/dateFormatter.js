const months = {
    '1': 'January',
    '2': 'February',
    '3': 'March',
    '4': 'April',
    '5': 'May',
    '6': 'June',
    '7': 'July',
    '8': 'August',
    '9': 'September',
    '10': 'October',
    '11': 'November',
    '12': 'December'
};

export function formatDate(inputDate) {
    const fullDate = new Date(inputDate);

    const date = fullDate.getDate();
    const month = months[fullDate.getMonth() + 1];
    const year = fullDate.getFullYear();

    return { date, month, year };
}