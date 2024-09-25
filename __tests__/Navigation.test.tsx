import React from 'react';
import { render } from '@testing-library/react-native';
import Navigation from '../../../src/navigation/StackNavigation';

jest.mock('../src/pages/HomeScreen', () => () => <div>Home Screen</div>);
jest.mock('../src/pages/ForecastScreen', () => () => <div>Forecast Screen</div>);

describe('Navigation', () => {
  it('renders the Home screen by default', () => {
    const { getByText } = render(<Navigation />);
    expect(getByText('Home Screen')).toBeTruthy(); // Check if Home Screen is rendered
  });

  it('navigates to the Forecast screen', async () => {
    const { getByText, findByText } = render(<Navigation />);
    
    // Simulate navigation to Forecast screen
    const forecastButton = getByText('5-Day Forecast'); // Ensure this button exists
    forecastButton.props.onPress(); // Simulate the button press

    // Check if Forecast Screen is rendered
    expect(await findByText('Forecast Screen')).toBeTruthy();
  });
});
