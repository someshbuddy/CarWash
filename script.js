const currentDate = new Date();
const currentYear = currentDate.getFullYear();
const currentMonth = currentDate.getMonth() + 1;
const monthName = currentDate.toLocaleString('default', { month: 'long' });
const currentDay = currentDate.getDate();

const members = ["Somesh", "Dinesh", "Divakar", "Vijay", "Dinakar", "Bhaskar"];

const monthsArray = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
];

const datesMap = new Map();
const dayStarts = 21;
const monthStarts = 11;

let startDate = new Date(2025, monthStarts, dayStarts);
for (let i = 0; i < 365; i++) {
    let nextDay = new Date(startDate);
    nextDay.setDate(nextDay.getDate() + i);
    datesMap.set(nextDay.toLocaleDateString(), members[i % members.length]);
}

renderCalendar(3, 2026);

function renderCalendar(month, year) {
    setDate(month, year);

    calendarDates.innerHTML = '';

    const firstDay = new Date(year, month - 1, 1).getDay();

    const daysInMonth = new Date(year, month, 0).getDate();

    const daysinPastMonth = new Date(year, month - 1, 0).getDate();

    let c = 0;
    for (let i = daysinPastMonth - firstDay; i <= daysinPastMonth; i++) {
        c++;
        const day = document.createElement('div');

        if (month != 1)
            day.textContent = i + "\n" + (datesMap.get((month - 1) + "/" + i + "/" + year) || '');
        else
            day.textContent = i + "\n" + (datesMap.get(12 + "/" + i + "/" + (year - 1)) || '');

        day.classList.add("day");
        day.classList.add("prevDay")

        calendarDates.appendChild(day);
    }

    for (let i = 1; i <= daysInMonth; i++) {
        const day = document.createElement('div');
        day.textContent = i + "\n" + (datesMap.get(month + "/" + i + "/" + year) || '');
        day.classList.add("day");


        if (currentDay == i) {
            day.classList.add("current-day");
        }

        calendarDates.appendChild(day);
    }

    for (let i = 1; i <= (42 - daysInMonth - c) % 7; i++) {
        const day = document.createElement('div');

        if (month == 12)
            day.textContent = i + "\n" + (datesMap.get(1 + "/" + i + "/" + (year + 1)) || '');
        else
            day.textContent = i + "\n" + (datesMap.get((month + 1) + "/" + i + "/" + year) || '');


        day.classList.add("day");
        day.classList.add("nextDay")

        calendarDates.appendChild(day);
    }
}

function setDate(index, year) {
    document.getElementById("dateId").innerHTML = monthsArray[(index - 1) % 12] + " " + year;
}

console.log(datesMap)