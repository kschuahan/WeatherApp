import React from 'react';
import { View, Text } from 'react-native';
import { useSelector } from 'react-redux';

const ForecastScreen = () => {
    const forecast = useSelector((state: any) => state.weather.forecast);
console.log(forecast);

    return (
        <View style={{ padding: 20 }}>
            {forecast.map((day: any, index: number) => (
                <View key={index} style={{ marginBottom: 10 }}>
                    <Text>Day {index + 1}</Text>
                    <Text>Max Temperature: {day.tempMax} °C</Text>
                    <Text>Min Temperature: {day.tempMin} °C</Text>
                    <Text>Condition: {day.description}</Text>
                    <Text>Timing: {day.date}</Text>

                </View>
            ))}
        </View>
    );
};

export default ForecastScreen;
