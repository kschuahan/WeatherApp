import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';// Action to be dispatched
import { fetchWeather } from '../src/redux/reducer/weatherActions';
import HomeScreen from '../src/pages/HomeScreen';

// Create a mock store with redux-mock-store
const mockStore = configureStore([]);
const mockNavigation = { navigate: jest.fn() };

// Mock the fetchWeather action
jest.mock('../src/redux/reducer/weatherActions', () => ({
  fetchWeather: jest.fn(),
}));

describe('HomeScreen', () => {
  let store: any;

  beforeEach(() => {
    // Initialize mock store with default state
    store = mockStore({
      weather: {
        currentWeather: null,
        loading: false,
        error: null,
      },
    });

    // Reset mocks
    mockNavigation.navigate.mockReset();
    (fetchWeather as jest.Mock).mockReset();
  });

  it('renders correctly and allows the user to search for a city', async () => {
    const { getByPlaceholderText, getByText } = render(
      <Provider store={store}>
        <HomeScreen navigation={mockNavigation} />
      </Provider>
    );

    const input = getByPlaceholderText('Enter city');
    const searchButton = getByText('Search');

    // Simulate user entering a city name
    fireEvent.changeText(input, 'New York');
    expect(input.props.value).toBe('New York');

    // Simulate pressing the search button
    fireEvent.press(searchButton);

    // Check that fetchWeather was called with 'New York'
    expect(fetchWeather).toHaveBeenCalledWith('New York');
  });

  it('displays a loading indicator while fetching weather data', () => {
    store = mockStore({
      weather: {
        currentWeather: null,
        loading: true,
        error: null,
      },
    });

    const { getByTestId } = render(
      <Provider store={store}>
        <HomeScreen navigation={mockNavigation} />
      </Provider>
    );

    // Check if the loading indicator is displayed
    expect(getByTestId('ActivityIndicator')).toBeTruthy();
  });

  it('displays weather data when available', () => {
    store = mockStore({
      weather: {
        currentWeather: {
          temp: 20,
          humidity: 60,
          windSpeed: 5,
          description: 'Clear sky',
        },
        loading: false,
        error: null,
      },
    });

    const { getByText } = render(
      <Provider store={store}>
        <HomeScreen navigation={mockNavigation} />
      </Provider>
    );

    // Check if weather data is displayed correctly
    expect(getByText('Temperature: 20 °C')).toBeTruthy();
    expect(getByText('Humidity: 60 %')).toBeTruthy();
    expect(getByText('Wind Speed: 5 m/s')).toBeTruthy();
    expect(getByText('Description: Clear sky')).toBeTruthy();
  });

  it('displays an error message if weather data could not be fetched', () => {
    store = mockStore({
      weather: {
        currentWeather: null,
        loading: false,
        error: 'Failed to fetch weather data',
      },
    });

    const { getByText } = render(
      <Provider store={store}>
        <HomeScreen navigation={mockNavigation} />
      </Provider>
    );

    // Check if the error message is displayed
    expect(getByText('Failed to fetch weather data')).toBeTruthy();
  });

  it('navigates to the Forecast screen when the "5-Day Forecast" button is pressed', () => {
    store = mockStore({
      weather: {
        currentWeather: {
          temp: 20,
          humidity: 60,
          windSpeed: 5,
          description: 'Clear sky',
        },
        loading: false,
        error: null,
      },
    });

    const { getByText } = render(
      <Provider store={store}>
        <HomeScreen navigation={mockNavigation} />
      </Provider>
    );

    // Simulate pressing the "5-Day Forecast" button
    const forecastButton = getByText('5-Day Forecast');
    fireEvent.press(forecastButton);

    // Check if navigation to the "Forecast" screen occurred
    expect(mockNavigation.navigate).toHaveBeenCalledWith('Forecast');
  });
});
