import React from 'react';
import { render } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import ForecastScreen from '../src/pages/ForecastScreen';

// Create a mock store with redux-mock-store
const mockStore = configureStore([]);

describe('ForecastScreen', () => {
    let store: any;

    beforeEach(() => {
        // Initial mock store state with no forecast data
        store = mockStore({
            weather: {
                forecast: [],
            },
        });
    });

    it('renders correctly with no forecast data', () => {
        const { getByText } = render(
            <Provider store={store}>
                <ForecastScreen />
            </Provider>
        );

        // Since no forecast data is present, the component should not render any forecast items
        expect(getByText(/Day/i)).not.toBeTruthy();
    });

    it('displays forecast data correctly when available', () => {
        store = mockStore({
            weather: {
                forecast: [
                    { tempMax: 25, tempMin: 15, description: 'Clear sky' },
                    { tempMax: 22, tempMin: 14, description: 'Cloudy' },
                ],
            },
        });

        const { getByText } = render(
            <Provider store={store}>
                <ForecastScreen />
            </Provider>
        );

        // Check that the forecast data is displayed correctly for Day 1 and Day 2
        expect(getByText('Day 1')).toBeTruthy();
        expect(getByText('Max Temperature: 25 °C')).toBeTruthy();
        expect(getByText('Min Temperature: 15 °C')).toBeTruthy();
        expect(getByText('Condition: Clear sky')).toBeTruthy();

        expect(getByText('Day 2')).toBeTruthy();
        expect(getByText('Max Temperature: 22 °C')).toBeTruthy();
        expect(getByText('Min Temperature: 14 °C')).toBeTruthy();
        expect(getByText('Condition: Cloudy')).toBeTruthy();
    });

    it('handles rendering when forecast data is an empty array', () => {
        store = mockStore({
            weather: {
                forecast: [],
            },
        });

        const { queryByText } = render(
            <Provider store={store}>
                <ForecastScreen />
            </Provider>
        );

        // Ensure that no forecast elements are rendered when the forecast array is empty
        expect(queryByText('Day 1')).toBeNull();
    });
});
