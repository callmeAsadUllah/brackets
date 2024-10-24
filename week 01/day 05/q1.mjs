const celsiusToFahrenheit = (celsius) => {
  const fahrenheit = (celsius * 9) / 5 + 32;
  return fahrenheit;
};

const fahrenheitToCelsius = (fahrenheit) => {
  const celsius = ((fahrenheit - 32) * 5) / 9;
  return celsius;
};

console.log(celsiusToFahrenheit(0));
console.log(fahrenheitToCelsius(32));
