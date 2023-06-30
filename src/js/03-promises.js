import Notiflix from 'notiflix';
//Definicja funkcji createPromise(position, delay):
//Ta funkcja przyjmuje dwa argumenty, position i delay. Tworzy nowy obiekt Promise, który wykonuje asynchroniczne działanie.
//Losuje wartość shouldResolve - wartość logiczną, która określa, czy obietnica powinna zostać rozwiązana czy odrzucona. Szansa na rozwiązanie obietnicy wynosi 70% (większa niż 0,3).
function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    //Używam funkcji setTimeout do opóźnienia wykonania kodu wewnątrz obietnicy o wartość delay.
    //Wewnątrz funkcji setTimeout sprawdzam wartość shouldResolve. Jeśli jest prawdziwa, obietnica zostaje rozwiązana za pomocą metody resolve(), przekazując obiekt { position, delay } jako wartość rozwiązania.
    //W przeciwnym razie, obietnica zostaje odrzucona za pomocą metody reject(), przekazując ten sam obiekt jako powód odrzucenia.
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
//Pobranie referencji do formularza HTML za pomocą document.querySelector('.form').
const form = document.querySelector('.form');
//Dodanie nasłuchiwacza zdarzeń na formularzu dla zdarzenia "submit".
//W obsłudze zdarzenia formularza:
//Wyłączenie domyślnego zachowania formularza za pomocą event.preventDefault(), aby uniknąć przeładowania strony.
form.addEventListener('submit', event => {
  event.preventDefault();
  //Pobranie referencji do trzech pól wejściowych formularza: delayInput, stepInput i amountInput.
  const delayInput = document.querySelector('input[name="delay"]');
  const stepInput = document.querySelector('input[name="step"]');
  const amountInput = document.querySelector('input[name="amount"]');
  //Pobranie wartości liczbowych z tych pól wejściowych za pomocą parseInt().
  const delay = parseInt(delayInput.value);
  const step = parseInt(stepInput.value);
  const amount = parseInt(amountInput.value);
  //Utworzenie pętli for o długości amount, która iteruje od zera do wartości: amount
  //W każdej iteracji pętli tworzy się zmienna position równa i + 1 (pozycja iteracji) oraz promiseDelay równa delay + i * step (opóźnienie obietnicy zależne od iteracji).
  for (let i = 0; i < amount; i++) {
    const position = i + 1;
    const promiseDelay = delay + i * step;
    //Wywołanie funkcji createPromise(position, promiseDelay), która zwraca obiekt Promise.
    //Do obiektu Promise zostaje dołączone dwie metody: then() i catch().
    //Metoda then() jest wywoływana, gdy obietnica zostanie rozwiązana, a metoda catch() jest wywoływana, gdy obietnica zostanie odrzucona.
    //Wewnątrz metody then() lub catch() zostaje wyświetlony komunikat w konsoli, informujący o rozwiązaniu lub odrzuceniu obietnicy, wraz z informacjami o pozycji i opóźnieniu.
    createPromise(position, promiseDelay)
      .then(({ position, delay }) => {
        //console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
        Notiflix.Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        //console.log(`❌ Rejected promise ${position} in ${delay}ms`);
        Notiflix.Notify.failure(`Rejected promise ${position} in ${delay}ms`);
      });
  }
  //Na końcu kodu, po obsłudze zdarzenia, formularz jest resetowany za pomocą form.reset(), co powoduje wyczyszczenie wprowadzonych wartości w polach formularza.
  form.reset();
});
