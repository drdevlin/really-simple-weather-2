import { xml2js as convert } from 'xml-js';
import convertDate from './convertDate';
import windchill from './windchill';

// Full extraction
const extractRelevantDataFrom = (textResponse) => {
  // Convert XML to object
  const allData = convert(textResponse, { compact: true });
  
  // Extract relevant data
  const app = extractAppDataFrom(allData);
  const extreme = extractExtremeDataFrom(allData);

  // Return relevant data
  return { app, extreme }

};

export default extractRelevantDataFrom;


// Individual extractions
export const extractAppDataFrom = (allData) => {
  const conditionCode = allData.siteData.forecastGroup.forecast[0].abbreviatedForecast.iconCode._text;

  let condition;
  switch (conditionCode) {
    case '00':
    case '01':
    case '30':
    case '31':
      condition = "nice";
      break;
    case '02':
    case '03':
    case '04':
    case '05':
    case '10':
    case '22':
    case '23':
    case '32':
    case '33':
    case '34':
    case '35':
      condition = "okay";
      break;
    case '06':
    case '07':
    case '08':
    case '12':
    case '13':
    case '15':
    case '16':
    case '19':
    case '24':
    case '28':
    case '36':
    case '37':
    case '38':
      condition = "precip";
      break;
    case '09':
    case '14':
    case '17':
    case '18':
    case '27':
    case '39':
    case '40':
    case '43':
    case '44':
      condition = "bad";
      break;
  default:
      condition = "unknown";
  }

  return { condition };
};

export const extractExtremeDataFrom = (allData) => {
  const hourlyForecasts = allData.siteData.hourlyForecastGroup.hourlyForecast;
  const hourlyTemps = hourlyForecasts.map(hourlyForecast => {
    // Temperature
    const isHumidex = hourlyForecast.humidex.hasOwnProperty('_text');
    const temperature = (isHumidex) ? Number(hourlyForecast.humidex._text) : Number(hourlyForecast.temperature._text);
    // Wind
    const isGusting = hourlyForecast.wind.gust.hasOwnProperty('_text');
    const windSpeed = (isGusting) ? Number(hourlyForecast.wind.gust._text) : Number(hourlyForecast.wind.speed._text);
    return { hour: hourlyForecast._attributes.dateTimeUTC, temperature, isHumidex, windSpeed };
  });

  const firstHour = convertDate(hourlyTemps[0].hour).getHours();
  let extreme;
  if (firstHour >= 7 && firstHour < 19) { // get high
    extreme = hourlyTemps.reduce((highestSoFar, hourlyTemp) => {
      const highestSoFarValue = highestSoFar.temperature;
      const hourlyTempValue = hourlyTemp.temperature;
      return (hourlyTempValue > highestSoFarValue) ? hourlyTemp : highestSoFar;
    });
  } else { // get low
    extreme = hourlyTemps.reduce((lowestSoFar, hourlyTemp) => {
      const lowestSoFarValue = lowestSoFar.temperature;
      const hourlyTempValue = hourlyTemp.temperature;
      return (hourlyTempValue < lowestSoFarValue) ? hourlyTemp : lowestSoFar;
    });
  }

  if (extreme.temperature <= 12 && !extreme.isHumidex) {
    extreme.temperature = windchill(extreme.temperature, extreme.windSpeed);
    extreme.type = 'windchill';
  }

  if (extreme.isHumidex) extreme.type = 'humidex';

  if (!extreme.hasOwnProperty('type')) extreme.type = 'normal';
  
  return {
    temp: extreme.temperature,
    type: extreme.type,
    time: convertDate(extreme.hour).valueOf()
  }
}