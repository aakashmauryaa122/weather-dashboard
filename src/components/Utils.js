export const convertTemperature = (kelvinTemp) => {
  const celsius = (kelvinTemp - 273.15).toFixed(1);
  const fahrenheit = ((kelvinTemp * 9) / 5 - 459.67).toFixed(1);
  return `${celsius}°C / ${fahrenheit}°F`;
};

