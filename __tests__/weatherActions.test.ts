import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { fetchWeather } from '../src/redux/reducer/weatherActions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('fetchWeather action', () => {
  let store: any;
  let mockAxios: MockAdapter;

  beforeEach(() => {
    store = mockStore({});
    mockAxios = new MockAdapter(axios);
  });

  afterEach(() => {
    mockAxios.restore(); // Restore the axios instance to prevent interference
    store.clearActions(); // Clear any actions stored in the mock store
  });

  it('dispatches FETCH_WEATHER_SUCCESS when fetching weather is successful', async () => {
    const city = 'London';
    const mockResponse = {
      list: [
        {
          main: { temp: 15, humidity: 80 },
          wind: { speed: 5 },
          weather: [{ description: 'Clear sky' }],
        },
        {
          main: { temp_max: 17, temp_min: 13 },
          weather: [{ description: 'Cloudy' }],
        },
        {
          main: { temp_max: 18, temp_min: 14 },
          weather: [{ description: 'Rainy' }],
        },
        {
          main: { temp_max: 19, temp_min: 15 },
          weather: [{ description: 'Sunny' }],
        },
        {
          main: { temp_max: 20, temp_min: 16 },
          weather: [{ description: 'Windy' }],
        },
      ],
    };

    mockAxios.onGet(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=2bc310c8eed7982747117c63fb959280&units=metric`).reply(200, mockResponse);

    const expectedActions = [
      { type: 'FETCH_WEATHER_REQUEST' },
      {
        type: 'FETCH_WEATHER_SUCCESS',
        payload: {
          currentWeather: {
            temp: 15,
            humidity: 80,
            windSpeed: 5,
            description: 'Clear sky',
          },
          forecast: [
            { tempMax: 17, tempMin: 13, description: 'Cloudy' },
            { tempMax: 18, tempMin: 14, description: 'Rainy' },
            { tempMax: 19, tempMin: 15, description: 'Sunny' },
            { tempMax: 20, tempMin: 16, description: 'Windy' },
          ],
        },
      },
    ];

    await store.dispatch(fetchWeather(city));

    const actions = store.getActions();
    expect(actions).toEqual(expectedActions);
  });

  it('dispatches FETCH_WEATHER_FAILURE when fetching weather fails', async () => {
    const city = 'UnknownCity';
    const mockErrorMessage = 'Network Error';

    mockAxios.onGet(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=2bc310c8eed7982747117c63fb959280&units=metric`).reply(500, mockErrorMessage);

    const expectedActions = [
      { type: 'FETCH_WEATHER_REQUEST' },
      {
        type: 'FETCH_WEATHER_FAILURE',
        payload: mockErrorMessage,
      },
    ];

    await store.dispatch(fetchWeather(city));

    const actions = store.getActions();
    expect(actions).toEqual(expectedActions);
  });
});
