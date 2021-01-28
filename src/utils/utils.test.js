import { fakeResponse, fakeResponseJs } from './fakeResponse';
import extractRelevantDataFrom from './extractRelevantDataFrom';
import { extractAppDataFrom, extractExtremeDataFrom } from './extractRelevantDataFrom';

let mockInput;

describe('utils', () => {
  describe('extractRelevantDataFrom(textResponse)', () => {
    /*
    it('accepts a string and returns a valid object for store', () => {
      const validObject = {
        app: {
          condition: 'okay'
        },
        now: {
          temp: -4,
          type: 'normal'
        },
        extreme: {
          temp: -3,
          type: 'normal',
          time: Date.now() //dateTimeUTC="202101271800"
        },
        precip: {
          time: null,
          pops: [ 10, 10, 10, 10, 10, 10, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20 ]
        },
        wind: {
          speeds: [ 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 40, 40, 20, 20, 20, 20, 20, 20, 10, 10, 10, 10, 20, 20 ]
        },
        tomorrow: {
          condition: 'okay',
          temp: -7
        },
      }
      const actualOutput = extractRelevantDataFrom(fakeResponse);
      expect(actualOutput).toBe(validObject);
    });
    */

    describe('extractAppDataFrom(allData)', () => {
      beforeEach(() => { mockInput = { siteData: { forecastGroup: { forecast: [{ abbreviatedForecast: { iconCode: { _text: '01' }}}]}}}});
      it('accepts an object of all data and returns a valid object for the app key', () => {
        const actualOutput = extractAppDataFrom(mockInput);
        expect(actualOutput.condition).toBeTruthy();
      });
      it('converts the supplied code into a meaningful term', () => {
        mockInput.siteData.forecastGroup.forecast[0].abbreviatedForecast.iconCode._text = '00';
        const output00 = extractAppDataFrom(mockInput);
        mockInput.siteData.forecastGroup.forecast[0].abbreviatedForecast.iconCode._text = '02';
        const output02 = extractAppDataFrom(mockInput);
        mockInput.siteData.forecastGroup.forecast[0].abbreviatedForecast.iconCode._text = '06';
        const output06 = extractAppDataFrom(mockInput);
        mockInput.siteData.forecastGroup.forecast[0].abbreviatedForecast.iconCode._text = '09';
        const output09 = extractAppDataFrom(mockInput);
        mockInput.siteData.forecastGroup.forecast[0].abbreviatedForecast.iconCode._text = '99';
        const output99 = extractAppDataFrom(mockInput);

        expect(output00.condition).toStrictEqual('nice');
        expect(output02.condition).toStrictEqual('okay');
        expect(output06.condition).toStrictEqual('precip');
        expect(output09.condition).toStrictEqual('bad');
        expect(output99.condition).toStrictEqual('unknown');
      });
      afterAll(() => {
        mockInput = null;
      });
    });

    describe('extractExtremeDataFrom(allData)', () => {
      beforeEach(() => {
        mockInput = fakeResponseJs();
      });
      it('accepts an object of all data and returns a valid object for the extreme key', () => {
        const actualOutput = extractExtremeDataFrom(mockInput);
        expect(actualOutput.temp).toBeTruthy();
        expect(actualOutput.type).toBeTruthy();
        expect(actualOutput.time).toBeTruthy();
      });
      it('sets the temp to the humidex when there is one', () => {
        mockInput.siteData.hourlyForecastGroup.hourlyForecast[0].humidex = {};
        const output1 = extractExtremeDataFrom(mockInput);
        mockInput.siteData.hourlyForecastGroup.hourlyForecast[0].humidex = { _text: '30'};
        const output2 = extractExtremeDataFrom(mockInput);

        expect(output1.temp).not.toStrictEqual(30);
        expect(output1.type).not.toStrictEqual('humidex');
        expect(output2.temp).toStrictEqual(30);
        expect(output2.type).toStrictEqual('humidex');
      });
      it('sets the temp to the windchill when temp is 12 or less', () => {
        mockInput.siteData.hourlyForecastGroup.hourlyForecast[0].temperature = { _text: '13' };
        const output1 = extractExtremeDataFrom(mockInput);
        mockInput = fakeResponseJs();
        const output2 = extractExtremeDataFrom(mockInput);

        expect(output1.temp).toBeGreaterThan(-3);
        expect(output1.type).not.toStrictEqual('windchill');
        expect(output2.temp).toBeLessThan(-3);
        expect(output2.type).toStrictEqual('windchill');
      });
      it('returns the high from 7:00 to 19:00, low otherwise', () => {
        const output1 = extractExtremeDataFrom(mockInput);
        mockInput.siteData.hourlyForecastGroup.hourlyForecast[0]._attributes.dateTimeUTC = '202101270000';
        const output2 = extractExtremeDataFrom(mockInput);

        expect(output1.temp).toBeGreaterThan(output2.temp);
      })
    })
  });
});