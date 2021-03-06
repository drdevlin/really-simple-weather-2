import { fakeResponse, fakeResponseJs } from './fakeResponse';
import extractRelevantDataFrom from './extractRelevantDataFrom';
import { 
  extractAppDataFrom, 
  extractExtremeDataFrom,
  extractNowDataFrom,
  extractPrecipDataFrom,
  extractTomorrowDataFrom,
  extractWindDataFrom
} from './extractRelevantDataFrom';

let mockInput;

describe('utils', () => {
  describe('extractRelevantDataFrom(textResponse)', () => {
    it('accepts a string and returns a valid object for store', () => {
      const validObject = {
        app: {
          condition: 'okay'
        },
        extreme: {
          temp: -9,
          type: 'windchill',
          time: new Date('January 27, 2021 13:00:00').valueOf() //202101271800
        },
        now: {
          temp: -11,
          type: 'windchill'
        },
        precip: {
          time: null,
          pops: [ 10, 10, 10, 10, 10, 10, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20 ]
        },
        tomorrow: {
          condition: 'okay',
          temp: -7
        },
        wind: {
          speeds: [ 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 40, 40, 20, 20, 20, 20, 20, 20, 10, 10, 10, 10, 20, 20 ]
        }
      }
      const actualOutput = extractRelevantDataFrom(fakeResponse);
      expect(actualOutput).toMatchObject(validObject);
    });

    describe('extractAppDataFrom(allData)', () => {
      beforeEach(() => {
        mockInput = fakeResponseJs();
      });
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
      });
      afterAll(() => {
        mockInput = null;
      });
    });

    describe('extractNowDataFrom(allData)', () => {
      beforeEach(() => {
        mockInput = fakeResponseJs();
      });
      it('accepts an object of all data and returns a valid object for the now key', () => {
        const actualOutput = extractNowDataFrom(mockInput);
        expect(actualOutput.temp).toBeTruthy();
        expect(actualOutput.type).toBeTruthy();
      });
      it('sets the temp to the humidex when there is one', () => {
        const output1 = extractNowDataFrom(mockInput);
        mockInput.siteData.currentConditions = { 
          ...mockInput.siteData.currentConditions, 
          humidex: { _text: '30'}
        };
        const output2 = extractNowDataFrom(mockInput);

        expect(output1.temp).not.toStrictEqual(30);
        expect(output1.type).not.toStrictEqual('humidex');
        expect(output2.temp).toStrictEqual(30);
        expect(output2.type).toStrictEqual('humidex');
      });
      it('sets the temp to the windchill when temp is 12 or less', () => {
        mockInput.siteData.currentConditions.temperature = { _text: '13' };
        const output1 = extractNowDataFrom(mockInput);
        mockInput = fakeResponseJs();
        const output2 = extractNowDataFrom(mockInput);

        expect(output1.temp).toBeGreaterThan(-3);
        expect(output1.type).not.toStrictEqual('windchill');
        expect(output2.temp).toBeLessThan(-3);
        expect(output2.type).toStrictEqual('windchill');
      });
      afterAll(() => {
        mockInput = null;
      });
    });

    describe('extractPrecipDataFrom(allData)', () => {
      beforeEach(() => {
        mockInput = fakeResponseJs();
      });
      it('accepts an object of all data and returns a valid object for the precip key', () => {
        const actualOutput = extractPrecipDataFrom(mockInput);

        expect(actualOutput.hasOwnProperty('time')).toBeTruthy();
        expect(actualOutput.hasOwnProperty('pops')).toBeTruthy();
      });
      it('returns the time of the first POP >= 50%, null otherwise', () => {
        const outputNull = extractPrecipDataFrom(mockInput);
        mockInput.siteData.hourlyForecastGroup.hourlyForecast[5].lop._text = '50';
        const output50 = extractPrecipDataFrom(mockInput);

        expect(outputNull.time).toBeNull();
        expect(output50.time).toStrictEqual(new Date('January 27, 2021 16:00:00').valueOf()); //202101272100
      });
      it('returns the hourly POPs as an array', () => {
        const expected = [ 10, 10, 10, 10, 10, 10, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20 ];
        const actualOutput = extractPrecipDataFrom(mockInput);

        expect(actualOutput.pops).toMatchObject(expected);
      });
      afterAll(() => {
        mockInput = null;
      });
    });

    describe('extractTomorrowDataFrom(allData)', () => {
      beforeEach(() => {
        mockInput = fakeResponseJs();
      });
      it('accepts an object of all data and returns a valid object for the tomorrow key', () => {
        const actualOutput = extractTomorrowDataFrom(mockInput);

        expect(actualOutput.hasOwnProperty('condition')).toBeTruthy();
        expect(actualOutput.hasOwnProperty('temp')).toBeTruthy();
      });
      it("returns the condition and temperature for tomorrow's forecast", () => {
        const output1 = extractTomorrowDataFrom(mockInput);
        mockInput.siteData.forecastGroup.forecast[0].period._attributes.textForecastName = 'Tonight';
        mockInput.siteData.forecastGroup.forecast[1].abbreviatedForecast.iconCode._text = '38';
        const output2 = extractTomorrowDataFrom(mockInput);

        expect(output1.condition).toStrictEqual('okay');
        expect(output1.temp).toStrictEqual(-7);
        expect(output2.condition).not.toStrictEqual('okay');
        expect(output2.temp).not.toStrictEqual(-7);
      });
      afterAll(() => {
        mockInput = null;
      });
    });

    describe('extractWindDataFrom(allData)', () => {
      beforeEach(() => {
        mockInput = fakeResponseJs();
      });
      it('accepts an object of all data and returns a valid object for the wind key', () => {
        const actualOutput = extractWindDataFrom(mockInput);

        expect(actualOutput.hasOwnProperty('speeds')).toBeTruthy();
      });
      it('returns the hourly wind speeds as an array', () => {
        const expected = [ 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 40, 40, 20, 20, 20, 20, 20, 20, 10, 10, 10, 10, 20, 20 ];
        const actualOutput = extractWindDataFrom(mockInput);

        expect(actualOutput.speeds).toMatchObject(expected);
      });
      afterAll(() => {
        mockInput = null;
      });
    });

  });
});