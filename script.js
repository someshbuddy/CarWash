const members = ["Somesh", "Dinesh", "Divakar", "Vijay", "Dinakar", "Bhaskar", "Aditya"];
const monthsArray = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const datesMap = new Map();

const formatDateKey = (m, d, y) => `${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`;

// Initialize Data
const dayStarts = 21;
const monthStarts = 11; // December (0-indexed for Date object)
let startDate = new Date(2025, monthStarts, dayStarts);

for (let i = 0; i < 365; i++) {
    let nextDay = new Date(startDate);
    nextDay.setDate(startDate.getDate() + i);
    const key = formatDateKey(nextDay.getMonth() + 1, nextDay.getDate(), nextDay.getFullYear());
    datesMap.set(key, members[i % members.length]);
}

function renderCalendar(month, year) {
    const calendarDates = document.getElementById('calendarDates'); // Ensure ID exists
    setDate(month, year);
    calendarDates.innerHTML = '';

    // Calculation logic
    const firstDayIndex = new Date(year, month - 1, 1).getDay(); // 0 = Sun, 1 = Mon
    const daysInMonth = new Date(year, month, 0).getDate();
    const daysInPastMonth = new Date(year, month - 1, 0).getDate();

    // 1. PREVIOUS MONTH DAYS
    let count = 0;
    for (let i = firstDayIndex; i > 0; i--) {
        count++;
        const prevDayNum = daysInPastMonth - i + 1;
        const prevMonth = month === 1 ? 12 : month - 1;
        const prevYear = month === 1 ? year - 1 : year;

        const day = createDayElement(prevDayNum, prevMonth, prevYear, "prevDay");
        calendarDates.appendChild(day);
    }

    // 2. CURRENT MONTH DAYS
    for (let i = 1; i <= daysInMonth; i++) {
        count++;
        const isToday = (new Date().getDate() === i && new Date().getMonth() + 1 === month && new Date().getFullYear() === year);
        const day = createDayElement(i, month, year, isToday ? "current-day" : "");
        calendarDates.appendChild(day);
    }

    // 3. NEXT MONTH DAYS (Fill grid to 42 cells for consistent height)
    const remainingSlots = (42 - count) % 7;
    for (let i = 1; i <= remainingSlots; i++) {
        const nextMonth = month === 12 ? 1 : month + 1;
        const nextYear = month === 12 ? year + 1 : year;

        const day = createDayElement(i, nextMonth, nextYear, "nextDay");
        calendarDates.appendChild(day);
    }
}

// Helper to build the DOM element
function createDayElement(dayNum, m, y, extraClass) {
    const dayDiv = document.createElement('div');
    dayDiv.classList.add("day");
    if (extraClass) dayDiv.classList.add(extraClass);

    const key = formatDateKey(m, dayNum, y);
    const memberName = datesMap.get(key) || '';

    dayDiv.innerHTML = `<span class="date-num">${dayNum}</span><span class="member-name">${memberName}</span>`;
    return dayDiv;
}

function setDate(index, year) {
    document.getElementById("dateId").innerHTML = monthsArray[(index - 1)] + " " + year;
}

// Execution
let currentDate = new Date();
let currentYear = currentDate.getFullYear();
let currentMonth = currentDate.getMonth() + 1;
renderCalendar(currentMonth, currentYear);

let lastScrollTop = 0;
window.addEventListener("scroll", function () {
    let st = window.pageYOffset || document.documentElement.scrollTop;

    if (st > lastScrollTop) {
        renderCalendar(currentMonth--, currentYear--);
    } else if (st < lastScrollTop) {
        renderCalendar(currentMonth++, currentYear++);
    }
    lastScrollTop = st <= 0 ? 0 : st; // For mobile or negative scrolling
}, false);
