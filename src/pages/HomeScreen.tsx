import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, TextInput, Button, Text, ActivityIndicator } from 'react-native';
import { fetchWeather } from '../redux/reducer/weatherActions';

const HomeScreen = (props:any) => {
 const    { navigation }=props
  const [city, setCity] = useState('');
  const dispatch = useDispatch();
  const weather = useSelector((state:any) => state.weather);

  const handleSearch =  () => {
    dispatch(fetchWeather(city));
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        placeholder="Enter city"
        value={city}
        onChangeText={setCity}
        style={{ borderWidth: 1, padding: 10, marginBottom: 20 }}
      />
      <Button title="Search" onPress={handleSearch} />

      {weather.loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : weather.error ? (
        <Text>{weather.error}</Text>
      ) : weather.currentWeather ? (
        <>
          <Text>Temperature: {weather.currentWeather.temp} °C</Text>
          <Text>Humidity: {weather.currentWeather.humidity} %</Text>
          <Text>Wind Speed: {weather.currentWeather.windSpeed} m/s</Text>
          <Text>Description: {weather.currentWeather.description}</Text>
          <Button  title="5-Day Forecast" onPress={() => navigation.navigate('Forecast')} />
        </>
      ) : null}
    </View>
  );
};

export default HomeScreen;
