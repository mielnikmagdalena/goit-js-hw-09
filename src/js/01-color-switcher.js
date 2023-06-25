//Ta funkcja generuje losowy kolor w formacie heksadecymalnym. Wykorzystuje Math.random() do wygenerowania losowej liczby z zakresu od 0 do 1, a następnie przelicza ją na liczbę w formacie szesnastkowym (hex) za pomocą toString(16). Zwraca kolor w formacie #RRGGBB, gdzie RR, GG i BB reprezentują wartości heksadecymalne dla składowych czerwonej, zielonej i niebieskiej.
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
//Deklaracja zmiennych: Tworzę trzy zmienne:
//startButton: Przechowuje odwołanie do przycisku "Start" za pomocą selektora [data-start].
//stopButton: Przechowuje odwołanie do przycisku "Stop" za pomocą selektora [data-stop].
//body: Przechowuje odwołanie do elementu <body> za pomocą document.body.
const startButton = document.querySelector('[data-start]');
const stopButton = document.querySelector('[data-stop]');
const body = document.body;
//Zmienna intervalId: Ta zmienna będzie przechowywać identyfikator interwału, który użyję do późniejszego wyczyszczenia interwału.
let intervalId;
//Obsługa kliknięcia przycisku "Start":
//Dodaję nasłuchiwanie zdarzenia click na przycisku "Start".
//Po kliknięciu, przycisk "Start" zostaje zablokowany (startButton.disabled = true;), aby uniknąć wielokrotnych kliknięć, gdy zmiana kolorów jest już uruchomiona.
startButton.addEventListener('click', () => {
  startButton.disabled = true;
  //Przycisk "Stop" zostaje odblokowany (stopButton.disabled = false;), aby umożliwić zatrzymanie zmiany kolorów.
  stopButton.disabled = false;
  //Tworzę interwał za pomocą setInterval(), który będzie wywoływał funkcję co sekundę.
  intervalId = setInterval(() => {
    const randomColor = getRandomHexColor();
    //Wewnątrz interwału generuję losowy kolor za pomocą getRandomHexColor() i ustawiam go jako kolor tła <body> za pomocą body.style.backgroundColor.
    body.style.backgroundColor = randomColor;
  }, 1000);
});
//Obsługa kliknięcia przycisku "Stop":
//Dodaję nasłuchiwanie zdarzenia click na przycisku "Stop".
//Po kliknięciu, wyczyszczam interwał za pomocą clearInterval(intervalId), aby zatrzymać zmianę kolorów.
//Przycisk "Start" zostaje odblokowany (startButton.disabled = false;), umożliwiając ponowne uruchomienie zmiany kolorów w przyszłości.
//Przycisk "Stop" zostaje zablokowany (stopButton.disabled = true;), ponieważ zmiana kolorów została zatrzymana.
stopButton.addEventListener('click', () => {
  clearInterval(intervalId);
  startButton.disabled = false;
  stopButton.disabled = true;
});
