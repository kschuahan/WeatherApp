import weatherReducer from "../src/redux/reducer/weatherReducer";

describe('weatherReducer', () => {
  const initialState = {
    currentWeather: null,
    forecast: [],
    loading: false,
    error: null,
  };

  it('should return the initial state when passed an undefined state', () => {
    expect(weatherReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle FETCH_WEATHER_REQUEST', () => {
    const action = { type: 'FETCH_WEATHER_REQUEST' };
    const expectedState = {
      ...initialState,
      loading: true,
    };

    expect(weatherReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle FETCH_WEATHER_SUCCESS', () => {
    const action = {
      type: 'FETCH_WEATHER_SUCCESS',
      payload: {
        currentWeather: {
          temp: 20,
          humidity: 60,
          windSpeed: 5,
          description: 'Clear',
        },
        forecast: [
          { tempMax: 25, tempMin: 15, description: 'Sunny' },
          { tempMax: 22, tempMin: 16, description: 'Partly Cloudy' },
        ],
      },
    };

    const expectedState = {
      ...initialState,
      loading: false,
      currentWeather: action.payload.currentWeather,
      forecast: action.payload.forecast,
    };

    expect(weatherReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle FETCH_WEATHER_FAILURE', () => {
    const action = {
      type: 'FETCH_WEATHER_FAILURE',
      payload: 'Failed to fetch weather data',
    };

    const expectedState = {
      ...initialState,
      loading: false,
      error: action.payload,
    };

    expect(weatherReducer(initialState, action)).toEqual(expectedState);
  });
});
