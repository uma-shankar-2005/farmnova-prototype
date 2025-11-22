import React, { useEffect, useState } from "react";

const API_KEY = "0f897f5486a8a75e8388101873a34725"; // Your OpenWeatherMap API key

const WeatherWidget = () => {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [locationError, setLocationError] = useState("");
  const [pin, setPin] = useState("");

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser.");
      setLoading(false);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        try {
          // Current weather
          const res = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
          );
          const data = await res.json();
          if (data.cod !== 200) throw new Error();
          setWeather(data);

          // 3-day forecast
          const res2 = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
          );
          const forecastData = await res2.json();
          if (forecastData.cod !== "200") throw new Error();
          const daily = forecastData.list
            .filter((item) => item.dt_txt.includes("12:00:00"))
            .slice(0, 3);
          setForecast(daily);
          setLocationError("");
        } catch {
          setLocationError(
            "Unable to fetch weather data. Please check your internet connection or try again later."
          );
        }
        setLoading(false);
      },
      (error) => {
        setLoading(false);
        setLocationError(
          "Unable to retrieve your location. Enter your pin code to see weather."
        );
      }
    );
  }, []);

  const fetchWeatherByPin = async () => {
    setLoading(true);
    setLocationError("");
    try {
      // OpenWeatherMap expects the pin code to be valid and for a city with weather data.
      // The correct format is zip={pin},IN
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?zip=${pin},IN&appid=${API_KEY}&units=metric`
      );
      const data = await res.json();
      if (data.cod !== 200) {
        // Show OpenWeatherMap's error message if available
        setLocationError(
          data.message
            ? `Unable to fetch weather: ${data.message}`
            : "Unable to fetch weather for this pin code."
        );
        setWeather(null);
      } else {
        setWeather(data);
        setForecast([]);
        setLocationError("");
      }
    } catch {
      setLocationError("Unable to fetch weather for this pin code.");
      setWeather(null);
    }
    setLoading(false);
  };

  if (loading) return <div className="text-gray-500">Loading weather...</div>;
  if (locationError) {
    return (
      <div className="bg-blue-50 rounded-lg shadow p-4 mb-6 max-w-xs mx-auto">
        <div className="mb-2 text-red-500">
          {locationError}
          <div className="mt-2 flex gap-2">
            <input
              type="text"
              placeholder="Enter Pin Code"
              className="border rounded px-2 py-1"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              maxLength={6}
            />
            <button
              className="bg-green-600 text-white px-3 py-1 rounded"
              onClick={fetchWeatherByPin}
              disabled={!pin}
            >
              Get Weather
            </button>
          </div>
          <div className="text-xs text-gray-500 mt-1">
            Tip: Use 127.0.0.1 instead of localhost or use HTTPS for geolocation
            in Chrome.
          </div>
        </div>
      </div>
    );
  }
  if (!weather) return null;

  return (
    <div className="bg-blue-50 rounded-lg shadow p-4 mb-6 max-w-xs mx-auto">
      <div className="flex items-center gap-3 mb-2">
        <img
          src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
          alt={weather.weather[0].description}
          className="w-12 h-12"
        />
        <div>
          <div className="text-lg font-bold">{weather.name}</div>
          <div className="text-2xl font-bold">
            {Math.round(weather.main.temp)}°C
          </div>
          <div className="text-sm text-gray-600 capitalize">
            {weather.weather[0].description}
          </div>
        </div>
      </div>
      {forecast.length > 0 && (
        <div className="mt-2">
          <div className="font-semibold mb-1">3-Day Forecast</div>
          <div className="flex gap-3">
            {forecast.map((f, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <span className="text-xs text-gray-500">
                  {new Date(f.dt_txt).toLocaleDateString(undefined, {
                    weekday: "short",
                  })}
                </span>
                <img
                  src={`https://openweathermap.org/img/wn/${f.weather[0].icon}.png`}
                  alt={f.weather[0].description}
                  className="w-8 h-8"
                />
                <span className="text-sm">{Math.round(f.main.temp)}°C</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherWidget;