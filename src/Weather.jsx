import React, { useState, useEffect } from "react";
import styles from "./Weather.module.css";
import { translations } from "./translations";

import WeatherLeft from "./components/WeatherLeft";
import WeatherMiddle from "./components/WeatherMiddle";
import WeatherForecast from "./components/WeatherForecast";

function Weather() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [language, setLanguage] = useState("en");
  const t = translations[language];

  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

  const iconMap = {
    Clear: "CLEAR_DAY",
    Clouds: "CLOUDY",
    Rain: "RAIN",
    Drizzle: "SLEET",
    Thunderstorm: "WIND",
    Snow: "SNOW",
    Mist: "FOG",
    Smoke: "FOG",
    Haze: "FOG",
    Fog: "FOG",
  };

  const getWeather = async (searchCity = city) => {
    if (searchCity === "") return;
    setLoading(true);
    try {
      const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=${API_KEY}&units=metric&lang=${language}`;
      const weatherRes = await fetch(weatherUrl);
      const weatherData = await weatherRes.json();
      setWeather(weatherData);

      const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${searchCity}&appid=${API_KEY}&units=metric&lang=${language}`;
      const forecastRes = await fetch(forecastUrl);
      const forecastData = await forecastRes.json();

      const dailyData = forecastData.list
        .filter((item) => item.dt_txt.includes("12:00:00"))
        .slice(0, 5);
      setForecast(dailyData);
    } catch (error) {
      console.log("Error:", error);
    }
    setLoading(false);
  };

  const getWeatherByCoords = async (lat, lon) => {
    setLoading(true);
    try {
      const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=${language}`;
      const weatherRes = await fetch(weatherUrl);
      const weatherData = await weatherRes.json();
      setWeather(weatherData);
      setCity(weatherData.name);

      const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=${language}`;
      const forecastRes = await fetch(forecastUrl);
      const forecastData = await forecastRes.json();
      const dailyData = forecastData.list
        .filter((item) => item.dt_txt.includes("12:00:00"))
        .slice(0, 5);
      setForecast(dailyData);
    } catch (error) {
      console.log("Coords Error:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => getWeatherByCoords(pos.coords.latitude, pos.coords.longitude),
        () => {
          getWeather("Istanbul");
          setCity("Istanbul");
        },
      );
    } else {
      getWeather("Istanbul");
      setCity("Istanbul");
    }
  }, []);

  useEffect(() => {
    if (weather?.name) getWeather(weather.name);
  }, [language]);

  useEffect(() => {
    document.body.style.backgroundColor = isDarkMode
      ? "#1a1a1a"
      : "hsl(0, 0%, 95%)";
  }, [isDarkMode]);

  const themeStyles = {
    cardBg: isDarkMode ? "#2b2b2b" : "white",
    textColor: isDarkMode ? "white" : "#333",
    rightSideBg: isDarkMode ? "#222" : "#f6f6f8",
    cardItemBg: isDarkMode ? "#333" : "white",
    subText: isDarkMode ? "#bbb" : "gray",
    weatherShadow: isDarkMode
      ? "0 30px 60px rgba(0,0,0,0.2)"
      : "0 30px 60px rgba(0,0,0,0.07)",
    cardShadow: isDarkMode
      ? "0 4px 15px rgba(0,0,0,0.2)"
      : "0 4px 15px rgba(0,0,0,0.08)",
    iconColor: isDarkMode ? "white" : "#f0534f",
  };

  const formatTime = (ts) =>
    new Date(ts * 1000).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

  const getSuggestion = () => {
    if (!weather?.main) return "";
    const main = weather.weather[0].main;
    const temp = weather.main.temp;
    if (main === "Rain" || main === "Drizzle") return t.suggestRain;
    if (main === "Snow") return t.suggestSnow;
    if (weather.wind.speed > 10) return t.suggestWind;
    if (temp > 28) return t.suggestSunny;
    if (temp < 10) return t.suggestCold;
    return t.suggestGood;
  };

  return (
    <div className={styles.container}>
      <div
        className={styles.weatherCard}
        style={{
          backgroundColor: themeStyles.cardBg,
          boxShadow: themeStyles.weatherShadow,
        }}
      >
        {/* Left Side */}
        <WeatherLeft
          city={city}
          setCity={setCity}
          getWeather={getWeather}
          t={t}
          loading={loading}
          weather={weather}
          themeStyles={themeStyles}
          isDarkMode={isDarkMode}
          iconMap={iconMap}
          getSuggestion={getSuggestion}
        />

        {/* Center */}
        <WeatherMiddle
          weather={weather}
          t={t}
          language={language}
          setLanguage={setLanguage}
          isDarkMode={isDarkMode}
          toggleTheme={() => setIsDarkMode(!isDarkMode)}
          themeStyles={themeStyles}
          formatTime={formatTime}
        />

        {/* Right Side */}
        <WeatherForecast
          forecast={forecast}
          t={t}
          language={language}
          themeStyles={themeStyles}
          isDarkMode={isDarkMode}
          iconMap={iconMap}
        />
      </div>
    </div>
  );
}

export default Weather;
