const initialState = {
    currentWeather: null,
    forecast: [],
    loading: false,
    error: null,
  };
  
  export default function weatherReducer(state = initialState, action:any) {
    switch (action.type) {
      case 'FETCH_WEATHER_REQUEST':
        return { ...state, loading: true };
      case 'FETCH_WEATHER_SUCCESS':
        return {
          ...state,
          loading: false,
          currentWeather: action.payload.currentWeather,
          forecast: action.payload.forecast,
        };
      case 'FETCH_WEATHER_FAILURE':
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  }