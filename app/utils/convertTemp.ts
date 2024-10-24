export function convertTemp(tempKelvin: number) {
  const tempInCelsius = tempKelvin - 273.15;
  return Math.floor(tempInCelsius);
}
