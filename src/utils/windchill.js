const windchill = (actualTemp, windSpeed) => {
  return Math.round(13.12 + (0.6215 * actualTemp) - (11.37 * Math.pow(windSpeed, 0.16)) + (0.3965 * actualTemp * Math.pow(windSpeed, 0.16)));
}

export default windchill;