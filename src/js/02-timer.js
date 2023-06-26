// 02-timer.js
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

// DOM elements
const datetimePicker = document.getElementById('datetime-picker');
const startBtn = document.getElementById('start-btn');
const daysElement = document.getElementById('days');
const hoursElement = document.getElementById('hours');
const minutesElement = document.getElementById('minutes');
const secondsElement = document.getElementById('seconds');

// Countdown timer variables
let countdownInterval;
let targetDate;

// Enable flatpickr
flatpickr(datetimePicker, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    const currentDate = new Date();

    if (selectedDate <= currentDate) {
      window.alert('Please choose a date in the future');
      startBtn.disabled = true;
    } else {
      startBtn.disabled = false;
      targetDate = selectedDate;
    }
  },
});

// Add leading zero to single digit values
function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

// Convert milliseconds to days, hours, minutes, and seconds
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

// Update the countdown timer display
function updateTimerDisplay({ days, hours, minutes, seconds }) {
  daysElement.textContent = addLeadingZero(days);
  hoursElement.textContent = addLeadingZero(hours);
  minutesElement.textContent = addLeadingZero(minutes);
  secondsElement.textContent = addLeadingZero(seconds);
}

// Start the countdown timer
function startCountdown() {
  const currentTime = new Date().getTime();
  const timeDifference = targetDate.getTime() - currentTime;

  if (timeDifference <= 0) {
    clearInterval(countdownInterval);
    updateTimerDisplay({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    return;
  }

  const remainingTime = convertMs(timeDifference);
  updateTimerDisplay(remainingTime);
}

// Event listener for start button click
startBtn.addEventListener('click', () => {
  countdownInterval = setInterval(startCountdown, 1000);
});
