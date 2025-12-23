const MEMBERS = ["Somesh", "Dinesh", "Divakar", "Vijay", "Dinakar", "Bhaskar", "Aditya"];
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const ROSTER_START_DATE = new Date(2025, 11, 21);

let state = {
    currentMonth: new Date().getMonth() + 1,
    currentYear: new Date().getFullYear()
};

const formatDateKey = (m, d, y) => `${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`;

const getMemberForDate = (date) => {
    const start = new Date(ROSTER_START_DATE).setHours(0, 0, 0, 0);
    const target = new Date(date).setHours(0, 0, 0, 0);

    const diffDays = Math.floor((target - start) / (1000 * 60 * 60 * 24));
    return diffDays >= 0 ? MEMBERS[diffDays % MEMBERS.length] : '';
};

function renderCalendar() {
    const { currentMonth, currentYear } = state;
    const calendarDates = document.getElementById('calendarDates');
    const title = document.getElementById("dateId");

    if (!calendarDates || !title) return;

    title.textContent = `${MONTHS[currentMonth - 1]} ${currentYear}`;

    const fragment = document.createDocumentFragment();
    calendarDates.innerHTML = '';

    const firstDayIndex = new Date(currentYear, currentMonth - 1, 1).getDay();
    const lastDayIndex = new Date(currentYear, currentMonth, 0).getDate();

    const totalCells = Math.ceil((firstDayIndex + lastDayIndex) / 7) * 7;

    for (let i = 0; i < totalCells; i++) {
        const cellDate = new Date(currentYear, currentMonth - 1, 1 - firstDayIndex + i);
        fragment.appendChild(createDayElement(cellDate));
    }

    calendarDates.appendChild(fragment);
}

const createDayElement = (date) => {
    const dayDiv = document.createElement('div');
    const isToday = date.toDateString() === new Date().toDateString();
    const isCurrentMonth = date.getMonth() + 1 === state.currentMonth;

    dayDiv.className = [
        'day',
        !isCurrentMonth ? (date < new Date(state.currentYear, state.currentMonth - 1, 1) ? 'prevDay' : 'nextDay') : '',
        isToday ? 'current-day' : ''
    ].filter(Boolean).join(' ');

    dayDiv.innerHTML = `
        <span class="date-num">${date.getDate()}</span>
        <span class="member-name">${getMemberForDate(date)}</span>
    `;
    return dayDiv;
};

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