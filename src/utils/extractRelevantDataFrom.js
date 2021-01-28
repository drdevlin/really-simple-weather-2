import { xml2js as convert } from 'xml-js';
import convertDate from './convertDate';
import windchill from './windchill';
import condition from './condition';

// Full extraction
const extractRelevantDataFrom = (textResponse) => {
  // Convert XML to object
  const allData = convert(textResponse, { compact: true });
  
  // Extract relevant data
  const app = extractAppDataFrom(allData);
  const extreme = extractExtremeDataFrom(allData);
  const now = extractNowDataFrom(allData);
  const precip = extractPrecipDataFrom(allData);
  const tomorrow = extractTomorrowDataFrom(allData);
  const wind = extractWindDataFrom(allData);

  // Return relevant data
  return { app, extreme, now, precip, tomorrow, wind };
};

export default extractRelevantDataFrom;


// Individual extractions
export const extractAppDataFrom = (allData) => {
  const conditionCode = allData.siteData.forecastGroup.forecast[0].abbreviatedForecast.iconCode._text;

  return { condition: condition(conditionCode) };
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

export const extractNowDataFrom = (allData) => {
  const currently = allData.siteData.currentConditions;
  // Temperature
  const isHumidex = currently.hasOwnProperty('humidex');
  let temp = (isHumidex) ? Number(currently.humidex._text) : Number(currently.temperature._text);
  // Wind
  const isGusting = currently.wind.gust.hasOwnProperty('_text');
  const windSpeed = (isGusting) ? Number(currently.wind.gust._text) : Number(currently.wind.speed._text);

  let type;
  if (temp <= 12 && !isHumidex) {
    temp = windchill(temp, windSpeed);
    type = 'windchill';
  }

  if (isHumidex) type = 'humidex';

  if (!type) type = 'normal';
  
  return { temp: Math.round(temp), type };
}

export const extractPrecipDataFrom = (allData) => {
  // POPs
  const hourlyForecasts = allData.siteData.hourlyForecastGroup.hourlyForecast;
  const pops = hourlyForecasts.map(hourlyForecast => Number(hourlyForecast.lop._text));
  // Precipitation start time
  const precipStart = hourlyForecasts.find(hourlyForecast => hourlyForecast.lop._text >= 50);
  const time = (precipStart) ? convertDate(precipStart._attributes.dateTimeUTC).valueOf() : null;

  return { time, pops };
}

export const extractTomorrowDataFrom = (allData) => {
  let temp, conditionCode;
  if (allData.siteData.forecastGroup.forecast[0].period._attributes.textForecastName === 'Today') {
    temp = Number(allData.siteData.forecastGroup.forecast[2].temperatures.temperature._text);
    conditionCode = allData.siteData.forecastGroup.forecast[2].abbreviatedForecast.iconCode._text;
  } else {
    temp = Number(allData.siteData.forecastGroup.forecast[1].temperatures.temperature._text);
    conditionCode = allData.siteData.forecastGroup.forecast[1].abbreviatedForecast.iconCode._text;
  }

  return { condition: condition(conditionCode), temp };
}

export const extractWindDataFrom = (allData) => {
  const hourlyForecasts = allData.siteData.hourlyForecastGroup.hourlyForecast;
  const speeds = hourlyForecasts.map(hourlyForecast => {
    const isGusting = hourlyForecast.wind.gust.hasOwnProperty('_text');
    return (isGusting) ? Number(hourlyForecast.wind.gust._text) : Number(hourlyForecast.wind.speed._text);
  });

  return { speeds };
}