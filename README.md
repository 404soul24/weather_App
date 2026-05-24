# Weather App

A simple weather app that fetches current conditions and a 7-day forecast using the [Visual Crossing Weather API](https://www.visualcrossing.com/weather-api).

## Features

- Search weather by city or location name
- Displays current temperature, feels-like, humidity, wind speed, and conditions
- Shows a daily forecast with high/low temps and rain probability
- Loading spinner and error handling

## Usage

1. Open `index.html` in a browser.
2. Enter a location in the search box.
3. Click **Search** to fetch and display the weather.

## Files

| File        | Description                        |
|-------------|------------------------------------|
| index.html  | App layout                         |
| style.css   | Card-based UI styling              |
| script.js   | API calls, data processing, UI     |

## API

This app uses a free-tier Visual Crossing API key bundled in the source. For production, replace the key in `script.js` with your own from [visualcrossing.com](https://www.visualcrossing.com/weather-api).
