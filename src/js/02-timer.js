// 02-timer.js
//Ten fragment kodu importuje bibliotekę flatpickr oraz jej style CSS. Dzięki temu będę mogła użyć flatpickr do tworzenia interfejsu wyboru daty i godziny.
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

// Pobranie elementów DOM:
//Ten fragment kodu pobiera referencje do elementów DOM, takich jak pole wyboru daty, przycisk "Start" oraz elementy, w których będą wyświetlane wartości licznika.
const datetimePicker = document.getElementById('datetime-picker');

const startBtn = document.querySelector('[data-start]');
const daysElement = document.querySelector('[data-days]');
const hoursElement = document.querySelector('[data-hours]');
const minutesElement = document.querySelector('[data-minutes]');
const secondsElement = document.querySelector('[data-seconds]');

// Zmienne dla licznika odliczania:
//Te zmienne będą przechowywać interwał odliczania oraz wybraną datę końcową.
let countdownInterval;
let targetDate;
let timeDifference;

// Inicjalizacja flatpickr:
//Ten fragment kodu inicjalizuje flatpickr na elemencie datetimePicker, ustawiając opcje takie jak możliwość wyboru godziny (enableTime: true), format 24-godzinny (time_24hr: true), domyślną datę jako bieżącą (defaultDate: new Date()), inkrementację minut co 1 (minuteIncrement: 1).
//Po zamknięciu interfejsu flatpickr, funkcja onClose jest wywoływana i sprawdza, czy wybrana data jest w przyszłości. Jeśli nie, wyświetlany jest alert, a przycisk "Start" jest wyłączony. W przeciwnym razie przycisk jest włączony, a wybrana data jest przypisywana do zmiennej targetDate.
flatpickr(datetimePicker, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    const currentDate = new Date();

    if (selectedDate <= currentDate) {
      //window.alert('Please choose a date in the future');
      Notiflix.Notify.failure('Wybierz datę z przyszłości');
      startBtn.disabled = true;
    } else {
      startBtn.disabled = false;
      targetDate = selectedDate;
      timeCounter = selectedDate;
      Notiflix.Notify.success('Data wybrana poprawnie');
    }
  },
});

//Funkcja pomocnicza addLeadingZero:
//Ta funkcja dodaje wiodące zero do wartości jednocyfrowych, używając metody padStart. Zwraca sformatowaną wartość.
function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

// // Obliczanie ilości milisekund dla jednostek czasu
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  //// Obliczanie ilości dni, godzin, minut i sekund
  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  // Zwracanie obiektu z obliczonymi wartościami
  return { days, hours, minutes, seconds };
}

// Ta funkcja aktualizuje wartości wyświetlane na stronie dla dni, godzin, minut i sekund.
//Wykorzystuje funkcję addLeadingZero do dodania wiodącego zera do jednocyfrowych wartości.
function updateTimerDisplay({ days, hours, minutes, seconds }) {
  daysElement.textContent = addLeadingZero(days);
  hoursElement.textContent = addLeadingZero(hours);
  minutesElement.textContent = addLeadingZero(minutes);
  secondsElement.textContent = addLeadingZero(seconds);
}

// Funkcja countdown timer
//Ta funkcja oblicza różnicę czasu między bieżącym czasem a wybraną datą końcową.
//Jeśli różnica czasu wynosi 0 lub mniej, oznacza to, że czas się skończył, więc odliczanie zostaje zatrzymane (clearInterval(countdownInterval)) i wartości licznika są aktualizowane na 0.
//W przeciwnym razie oblicza pozostały czas, wywołuje funkcję updateTimerDisplay i aktualizuje wyświetlane wartości licznika.
function startCountdown() {
  if (timeDifference <= 0) {
    clearInterval(countdownInterval);
    updateTimerDisplay({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    Notiflix.Notify.success('Koniec Odliczania');
    return;
  }
  const remainingTime = convertMs(timeDifference);
  updateTimerDisplay(remainingTime);
  timeDifference -= 1000;
}

// Nasłuchiwanie kliknięcia przycisku "Start":
// Ten fragment kodu nasłuchuje na kliknięcie przycisku "Start" i uruchamia odliczanie, ustawiając interwał odliczania (setInterval) z wywołaniem funkcji startCountdown co 1000 milisekund (czyli co 1 sekundę).
startBtn.addEventListener('click', () => {
  const currentTime = new Date().getTime();
  timeDifference = targetDate.getTime() - currentTime;
  updateTimerDisplay(convertMs(timeDifference));
  countdownInterval = setInterval(startCountdown, 1000);
  Notiflix.Notify.info('Start odliczania');
});
startBtn.setAttribute('disabled', '');
