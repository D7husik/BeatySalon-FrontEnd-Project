/**
 * Weather API Service
 * Fetches real weather data from OpenWeatherMap API
 * Falls back to mock data if API is unavailable
 */

import { API_KEYS } from './config';

// New York coordinates
const NYC_LAT = 40.7128;
const NYC_LON = -74.0060;

// OpenWeatherMap API base URL
const WEATHER_API_BASE = 'https://api.openweathermap.org/data/2.5';

/**
 * Mock weather data for fallback
 */
const getMockWeather = () => ({
    temperature: 22,
    condition: 'cloudy',
    humidity: 65,
    windSpeed: 12,
    uvIndex: 4,
    description: 'Partly cloudy'
});

/**
 * Map OpenWeatherMap condition codes to simple conditions
 */
const mapCondition = (weatherId, main) => {
    if (weatherId >= 200 && weatherId < 300) return 'storm';
    if (weatherId >= 300 && weatherId < 600) return 'rain';
    if (weatherId >= 600 && weatherId < 700) return 'snow';
    if (weatherId >= 700 && weatherId < 800) return 'windy';
    if (weatherId === 800) return 'sunny';
    if (weatherId > 800) return 'cloudy';
    return main?.toLowerCase() || 'cloudy';
};

/**
 * Fetch current weather for New York
 * @returns {Promise<Object>} Weather data
 */
export const getWeather = async () => {
    const apiKey = API_KEYS.OPENWEATHER_API_KEY;

    // If no API key, return mock data
    if (!apiKey) {
        console.log('[Weather API] No API key configured, using mock data');
        return getMockWeather();
    }

    try {
        // Fetch current weather
        const weatherUrl = `${WEATHER_API_BASE}/weather?lat=${NYC_LAT}&lon=${NYC_LON}&appid=${apiKey}&units=metric`;
        const weatherResponse = await fetch(weatherUrl);

        if (!weatherResponse.ok) {
            throw new Error(`Weather API error: ${weatherResponse.status}`);
        }

        const weatherData = await weatherResponse.json();

        // Try to fetch UV index (may require separate API call)
        let uvIndex = 4; // Default moderate UV
        try {
            const uvUrl = `${WEATHER_API_BASE}/uvi?lat=${NYC_LAT}&lon=${NYC_LON}&appid=${apiKey}`;
            const uvResponse = await fetch(uvUrl);
            if (uvResponse.ok) {
                const uvData = await uvResponse.json();
                uvIndex = Math.round(uvData.value || 4);
            }
        } catch {
            // UV endpoint may not be available, use default
        }

        return {
            temperature: Math.round(weatherData.main?.temp || 22),
            condition: mapCondition(
                weatherData.weather?.[0]?.id,
                weatherData.weather?.[0]?.main
            ),
            humidity: weatherData.main?.humidity || 65,
            windSpeed: Math.round((weatherData.wind?.speed || 3) * 3.6), // Convert m/s to km/h
            uvIndex: uvIndex,
            description: weatherData.weather?.[0]?.description || 'Clear sky'
        };
    } catch (error) {
        console.error('[Weather API] Error fetching weather:', error);
        return getMockWeather();
    }
};

export default { getWeather };
