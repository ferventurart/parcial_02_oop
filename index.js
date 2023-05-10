window.addEventListener("load", () => {
  const today = new Date();
  document.getElementById("departure-date").min = today
    .toISOString()
    .slice(0, 10);
  //yyyy-mm-dd
});

const ticketForm = document.getElementById("ticket-form");
const ticketCost = document.getElementById("ticket-cost");

ticketForm.addEventListener("submit", (event) => {
  event.preventDefault();

  //Obtener los valores de los campos de entrada.
  const originCity = document.getElementById("origin-city").value;
  const destinationCity = document.getElementById("destination-city").value;
  const departureDateString = document.getElementById("departure-date").value;
  const departureDate = new Date(departureDateString + "T00:00:00.000-04:00");
  departureDate.setMinutes(
    departureDate.getMinutes() - departureDate.getTimezoneOffset() - 360
  );
  const departureTime = document.getElementById("departure-time").value;

  // 1) Paso : Calcular o establecer el costo base del boleto aero
  let ticketPrice = 200;

  // 2) Paso: Sumar $50.00 si la ciudad de origen y la ciudad de destino son diferentes
  if (originCity != destinationCity) ticketPrice += 50;

  // 3) Paso: Sumar $100.00 si la fecha de salida es en fin de semana.
  const weekend = [5, 6, 0];
  if (weekend.includes(departureDate.getDay())) ticketPrice += 100;

  // 4) Paso : Sumar $75.00 si la hora de salida es en horas pico (entre las 7:00 am y las 9:00 am | 16:00 pm y las 18:00 pm)
  const departureHour = Number.parseInt(departureTime.split(":")[0]);

  if (
    (departureHour >= 7 && departureHour < 9) ||
    (departureHour >= 16 && departureHour < 18)
  )
    ticketPrice += 75;
 // 5 Paso : Mostrar el costo del boleto en pantalla
   ticketCost.innerHTML = `🛫 🎫 El costo del boleto de avion es de $${ticketPrice}`;
});
