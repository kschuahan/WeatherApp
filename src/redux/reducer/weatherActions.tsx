import axios from 'axios';

export const fetchWeather = (city: string) => async (dispatch: any) => {
  dispatch({ type: 'FETCH_WEATHER_REQUEST' });

  try {
    const apiKey = '2bc310c8eed7982747117c63fb959280';
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`
    );

    const currentWeather = {
      temp: response.data.list[0].main.temp,
      humidity: response.data.list[0].main.humidity,
      windSpeed: response.data.list[0].wind.speed,
      description: response.data.list[0].weather[0].description,
    };

    const forecast = response.data.list.slice(1, 6).map((day: any) => ({
      tempMax: day.main.temp_max,
      tempMin: day.main.temp_min,
      description: day.weather[0].description,
      date: day.dt_txt
    }));

    dispatch({
      type: 'FETCH_WEATHER_SUCCESS',
      payload: { currentWeather, forecast },
    });
  } catch (error: any) {
    dispatch({
      type: 'FETCH_WEATHER_FAILURE',
      payload: error.message,
    });
  }
};