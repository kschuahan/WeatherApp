import React from 'react';
import { render } from '@testing-library/react-native';
import App from '../App'; // Adjust the import based on your directory structure
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Navigation from '../src/navigation/StackNavigation';

// Create a mock store with redux-mock-store
const mockStore = configureStore([]);
const store = mockStore({
  weather: {
    current: null,
    forecast: [],
    loading: false,
    error: null,
  },
});

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  NavigationContainer: ({ children }: any) => children,
}));

jest.mock('../src/navigation/StackNavigation', () => {
  return jest.fn(() => null); // Mock the navigation component
});

describe('App Component', () => {
  it('renders without crashing', () => {
    const { toJSON } = render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    expect(toJSON()).toMatchSnapshot(); // Snapshot test to ensure UI renders properly
  });

  it('wraps the application in the Redux provider and renders the navigation', () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    // Check if the Navigation component is rendered
    expect(Navigation).toHaveBeenCalled();
  });
});
