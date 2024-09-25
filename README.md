# Weather App

## Description
A mobile application developed using React Native that integrates with the Weather App API to provide users with current weather conditions and a 5-day weather forecast. The app is built using TypeScript for type safety and Redux for state management.

## Features
1. Search for weather information by city name.
2. View current weather conditions including temperature, humidity, wind speed, and a weather 3. description.
3. View a 5-day weather forecast with daily temperature highs, lows, and weather conditions.
4. Caching weather data to optimize API requests.
5. Navigation between screens using React Navigation.
6. Code written with clean architecture and object-oriented design principles.
7. Unit tests implemented using Jest and React Native Testing Library.

## Technologies Used
- React Native
- TypeScript
- Redux for state management
- Axios for API requests
- React Navigation for navigation
- Jest and React Native Testing Library for testing

## Project Structure
```plaintext
WeatherForecastingApp/
├── src/
│   ├── navigation/              # Navigation setup
│   │   └── StackNavigation.tsx  # Main navigation
│   ├── pages/                   # Screens for the app
│   │   ├── HomeScreen.tsx       # Home screen
│   │   └── ForecastScreen.tsx   # Forecast screen
│   ├── redux/                   # Redux setup
│   │   ├── reducer/             # Reducers
│   │   │   └── index.tsx        # RootReducer
│   │   │   └── weatherReducer.tsx # Weather reducer
│   │   │   └── weatherActions.tsx # Weather actions
│   │   └── store.tsx             # Redux store configuration
├── tests/                       # Test files
│   ├── Navigation.test.tsx      # Navigation tests
│   ├── HomeScreen.test.tsx      # Home screen tests
│   ├── ForecastScreen.test.tsx  # Forecast screen tests
│   ├── weatherReducer.test.ts   # Weather reducer tests
│   └── weatherActions.test.ts   # Weather action tests
├── App.tsx                      # Main app component
├── package.json                 # Project metadata and dependencies
├── tsconfig.json                # TypeScript configuration
└── README.md                    # Project documentation


## Prerequisites
Before you begin, ensure you have the following installed:

Node.js >=18
React Native CLI
Android Studio (for Android development) or Xcode (for iOS development)


# Installation

## Clone the repository:

git clone https://github.com/kschuahan/WeatherApp

cd WeatherApp

## Install the dependencies:

npm install

## Set up environment variables:

Replace the placeholder your-api-key in src/redux/weatherActions.tsx with your actual API key from OpenWeatherMap:

## Running the app:

### For Android:

npx react-native run-android

### For iOS:
npx react-native run-ios

# Running Tests

### You can run the tests by executing the following command:

npm run test

### To generate a code coverage report, run:

npm run test -- --coverage





