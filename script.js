const MEMBERS = ["Somesh", "Dinesh", "Divakar", "Vijay", "Dinakar", "Bhaskar", "Aditya"];
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const ROSTER_START_DATE = new Date(2025, 11, 21);

let state = {
    currentMonth: new Date().getMonth() + 1,
    currentYear: new Date().getFullYear()
};


const formatDateKey = (m, d, y) => `${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`;

const getMemberForDate = (date) => {
    const diffTime = date - ROSTER_START_DATE;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return '';

    return MEMBERS[diffDays % MEMBERS.length];
};

function renderCalendar() {
    const { currentMonth, currentYear } = state;
    const calendarDates = document.getElementById('calendarDates');
    const title = document.getElementById("dateId");

    if (!calendarDates || !title) return;

    title.textContent = `${MONTHS[currentMonth - 1]} ${currentYear}`;
    calendarDates.innerHTML = '';

    const firstDayIndex = new Date(currentYear, currentMonth - 1, 1).getDay();
    const lastDayIndex = new Date(currentYear, currentMonth, 0).getDate();

    let totalCells = lastDayIndex + firstDayIndex;
    totalCells = totalCells % 7 != 0 ? Math.floor(totalCells / 7) * 7 + 7 : totalCells;

    for (let i = 0; i < totalCells; i++) {
        const cellDate = new Date(currentYear, currentMonth - 1, 1 - firstDayIndex + i);

        const dayNum = cellDate.getDate();
        const monthNum = cellDate.getMonth() + 1;
        const yearNum = cellDate.getFullYear();

        let className = "day";
        if (monthNum < currentMonth || (monthNum === 12 && currentMonth === 1)) className += " prevDay";
        if (monthNum > currentMonth || (monthNum === 1 && currentMonth === 12)) className += " nextDay";
        if (cellDate.toDateString() === new Date().toDateString()) className += " current-day";

        calendarDates.appendChild(createDayElement(dayNum, monthNum, yearNum, className));
    }
}

function createDayElement(dayNum, m, y, className) {
    const dayDiv = document.createElement('div');
    dayDiv.className = className;

    const memberName = getMemberForDate(new Date(y, m - 1, dayNum));

    dayDiv.innerHTML = `
        <span class="date-num">${dayNum}</span>
        <span class="member-name">${memberName}</span>
    `;
    return dayDiv;
}

function changeMonth(delta) {
    state.currentMonth += delta;
    if (state.currentMonth > 12) {
        state.currentMonth = 1;
        state.currentYear++;
    } else if (state.currentMonth < 1) {
        state.currentMonth = 12;
        state.currentYear--;
    }
    renderCalendar();
}

function prev() {
    changeMonth(-1);
}

function next() {
    changeMonth(1);
}

function currentStatus() {
    const today = new Date();
    state.currentMonth = today.getMonth() + 1;
    state.currentYear = today.getFullYear();
    renderCalendar();
}

document.addEventListener('DOMContentLoaded', renderCalendar);