export function convertWindSpeed(speedMetersPerSecond: number): string {
  const speedInKilometersPerHour = speedMetersPerSecond * 3.6;
  return `${speedInKilometersPerHour.toFixed(0)}km/h`;
}
