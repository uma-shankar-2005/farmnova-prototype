import React from "react";
import { FaCloudSun, FaTint, FaWind } from "react-icons/fa";

const weatherData = [
  {
    region: "Nashik, Maharashtra",
    crop: "Grape growing region",
    temp: "28°C",
    desc: "Partly Cloudy",
    humidity: "65%",
    wind: "12 km/h",
    icon: <FaCloudSun className="text-2xl text-yellow-400" />,
  },
  {
    region: "Bengaluru, Karnataka",
    crop: "Tomato growing region",
    temp: "32°C",
    desc: "Sunny",
    humidity: "45%",
    wind: "8 km/h",
    icon: <FaCloudSun className="text-2xl text-yellow-400" />,
  },
  {
    region: "Punjab",
    crop: "Wheat growing region",
    temp: "22°C",
    desc: "Light Rain",
    humidity: "85%",
    wind: "15 km/h",
    icon: <FaCloudSun className="text-2xl text-blue-400" />,
  },
];

const forecast = [
  { region: "Nashik", today: "28°C", tomorrow: "30°C", day3: "31°C", day4: "29°C", day5: "26°C" },
  { region: "Bengaluru", today: "32°C", tomorrow: "33°C", day3: "30°C", day4: "28°C", day5: "30°C" },
  { region: "Punjab", today: "22°C", tomorrow: "24°C", day3: "25°C", day4: "25°C", day5: "25°C" },
];

const WeatherSection = () => (
  <section className="bg-white py-16" id="weather">
    <div className="max-w-4xl mx-auto text-center mb-8">
      <div className="text-green-600 font-semibold mb-2">WEATHER INSIGHTS</div>
      <h2 className="text-3xl md:text-4xl font-extrabold mb-2">Real-Time Weather Data</h2>
      <p className="text-gray-600">Stay informed about weather conditions that may affect farming and delivery schedules.</p>
    </div>
    <div className="max-w-4xl mx-auto bg-green-600 rounded-t-lg p-3 text-left text-white font-semibold">Current Weather Conditions</div>
    <div className="max-w-4xl mx-auto bg-white rounded-b-lg shadow p-6 flex flex-col gap-6">
      <div className="flex flex-col md:flex-row gap-4 justify-between">
        {weatherData.map((w) => (
          <div key={w.region} className="flex-1 bg-gray-50 rounded-lg p-4 shadow flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <span className="text-green-600">{w.icon}</span>
              <div>
                <div className="font-bold text-gray-900">{w.region}</div>
                <div className="text-xs text-gray-500">{w.crop}</div>
              </div>
            </div>
            <div className="text-2xl font-bold text-green-700">{w.temp}</div>
            <div className="text-gray-600">{w.desc}</div>
            <div className="flex gap-4 text-xs text-gray-500 mt-2">
              <span><FaTint className="inline mr-1" /> Humidity: {w.humidity}</span>
              <span><FaWind className="inline mr-1" /> Wind: {w.wind}</span>
            </div>
          </div>
        ))}
      </div>
      <div>
        <div className="font-semibold text-gray-700 mb-2">7-Day Forecast for Key Regions</div>
        <table className="w-full text-sm bg-white rounded-lg">
          <thead>
            <tr className="text-gray-500">
              <th className="text-left py-1">REGION</th>
              <th>TODAY</th>
              <th>TOMORROW</th>
              <th>DAY 3</th>
              <th>DAY 4</th>
              <th>DAY 5</th>
            </tr>
          </thead>
          <tbody>
            {forecast.map((row) => (
              <tr key={row.region} className="border-t">
                <td className="py-1 font-semibold">{row.region}</td>
                <td>{row.today}</td>
                <td>{row.tomorrow}</td>
                <td>{row.day3}</td>
                <td>{row.day4}</td>
                <td>{row.day5}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </section>
);

export default WeatherSection;
