import React, { useState, useEffect } from "react";
import ReactAnimatedWeather from "react-animated-weather";
import styles from "./Weather.module.css";
import { translations } from "../translations";

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
      const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=${API_KEY}&units=metric&lang=${language === "tr" ? "tr" : "en"}`;
      const weatherRes = await fetch(weatherUrl);
      const weatherData = await weatherRes.json();
      setWeather(weatherData);

      const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${searchCity}&appid=${API_KEY}&units=metric&lang=${language === "tr" ? "tr" : "en"}`;
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

  useEffect(() => {
    getWeather("Istanbul");
    setCity("Istanbul");
  }, []);

  useEffect(() => {
    if (weather && weather.name) {
      getWeather(weather.name);
    }
  }, [language]);

  useEffect(() => {
    document.body.style.backgroundColor = isDarkMode
      ? "#1a1a1a"
      : "hsl(0, 0%, 95%)";
    document.body.style.transition = "background-color 0.5s ease";
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

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

  const formatTime = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
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
        <div
          className={styles.weatherLeft}
          style={{
            backgroundColor: themeStyles.cardBg,
            borderColor: isDarkMode ? "#444" : "#eee",
          }}
        >
          <div
            className={styles.searchBar}
            style={{
              backgroundColor: themeStyles.rightSideBg,
              borderBottom: "1.5px solid #f0534f",
            }}
          >
            <input
              type="text"
              placeholder={t.searchPlaceholder}
              value={city}
              onChange={(e) => setCity(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && getWeather()}
              style={{ color: themeStyles.textColor }}
            />
            <button onClick={() => getWeather()}>🔍</button>
          </div>

          {loading ? (
            <h2 className={styles.loadingText}>{t.loading}</h2>
          ) : weather && weather.main ? (
            <div
              className={styles.weatherInfo}
              style={{ color: themeStyles.textColor }}
            >
              <div className={styles.iconContainer}>
                <ReactAnimatedWeather
                  icon={iconMap[weather.weather[0].main] || "CLOUDY"}
                  color={themeStyles.iconColor}
                  size={150}
                  animate={true}
                />
              </div>
              <h1>{Math.round(weather.main.temp)}°</h1>
              <h2>
                {weather.name}, {weather.sys.country}
              </h2>
              <p>{weather.weather[0].description}</p>
            </div>
          ) : (
            <h3 style={{ color: themeStyles.textColor }}>No data found.</h3>
          )}
        </div>

        <div
          className={styles.weatherMiddle}
          style={{ backgroundColor: themeStyles.rightSideBg }}
        >
          <div className={styles.topHeader}>
            <h3 style={{ color: themeStyles.textColor }}>{t.details}</h3>

            <div className={styles.controlsGroup}>
              <button
                className={styles.themeBtn}
                onClick={() => setLanguage(language === "en" ? "tr" : "en")}
                style={{
                  backgroundColor: isDarkMode ? "white" : "#333",
                  color: isDarkMode ? "#333" : "white",
                  fontWeight: "bold",
                  fontSize: "12px",
                }}
              >
                {language === "en" ? "TR" : "EN"}
              </button>

              <button
                className={styles.themeBtn}
                onClick={toggleTheme}
                style={{
                  backgroundColor: isDarkMode ? "white" : "#333",
                  color: isDarkMode ? "#333" : "white",
                }}
              >
                {isDarkMode ? "☀️" : "🌙"}
              </button>
            </div>
          </div>

          {weather && weather.main && (
            <div className={styles.highlightsGrid}>
              <div
                className={styles.highlightsCard}
                style={{
                  backgroundColor: themeStyles.cardItemBg,
                  boxShadow: themeStyles.cardShadow,
                }}
              >
                <h4 style={{ color: themeStyles.subText }}>{t.wind}</h4>
                <h1 style={{ color: themeStyles.textColor }}>
                  {weather.wind.speed}{" "}
                  <span style={{ fontSize: "16px" }}>m/s</span>
                </h1>
                <p style={{ color: themeStyles.subText }}>
                  {t.direction}: {weather.wind.deg}°
                </p>
              </div>

              <div
                className={styles.highlightsCard}
                style={{
                  backgroundColor: themeStyles.cardItemBg,
                  boxShadow: themeStyles.cardShadow,
                }}
              >
                <h4 style={{ color: themeStyles.subText }}>{t.humidity}</h4>
                <h1 style={{ color: themeStyles.textColor }}>
                  {weather.main.humidity} %
                </h1>
                <p style={{ color: themeStyles.subText }}>
                  {weather.main.humidity > 50 ? t.high : t.low}
                </p>
              </div>

              <div
                className={styles.highlightsCard}
                style={{
                  backgroundColor: themeStyles.cardItemBg,
                  boxShadow: themeStyles.cardShadow,
                }}
              >
                <h4 style={{ color: themeStyles.subText }}>{t.feelsLike}</h4>
                <h1 style={{ color: themeStyles.textColor }}>
                  {Math.round(weather.main.feels_like)}°
                </h1>
                <p style={{ color: themeStyles.subText }}>{t.temperature}</p>
              </div>

              <div
                className={styles.highlightsCard}
                style={{
                  backgroundColor: themeStyles.cardItemBg,
                  boxShadow: themeStyles.cardShadow,
                }}
              >
                <h4 style={{ color: themeStyles.subText }}>{t.pressure}</h4>
                <h1 style={{ color: themeStyles.textColor }}>
                  {weather.main.pressure}{" "}
                  <span style={{ fontSize: "16px" }}>hPa</span>
                </h1>
              </div>

              <div
                className={styles.highlightsCard}
                style={{
                  backgroundColor: themeStyles.cardItemBg,
                  boxShadow: themeStyles.cardShadow,
                  gridColumn: "span 2",
                  height: "auto",
                }}
              >
                <h4 style={{ color: themeStyles.subText }}>
                  {t.sunrise} & {t.sunset}
                </h4>
                <div className={styles.sunContainer}>
                  <div className={styles.sunItem}>
                    <span style={{ fontSize: "22px" }}>☀️</span>
                    <div>
                      <p
                        style={{ fontSize: "11px", color: themeStyles.subText }}
                      >
                        {t.sunrise}
                      </p>
                      <h2
                        style={{
                          fontSize: "16px",
                          color: themeStyles.textColor,
                        }}
                      >
                        {formatTime(weather.sys.sunrise)}
                      </h2>
                    </div>
                  </div>
                  <div className={styles.sunItem}>
                    <span style={{ fontSize: "22px" }}>🌙</span>
                    <div>
                      <p
                        style={{ fontSize: "11px", color: themeStyles.subText }}
                      >
                        {t.sunset}
                      </p>
                      <h2
                        style={{
                          fontSize: "16px",
                          color: themeStyles.textColor,
                        }}
                      >
                        {formatTime(weather.sys.sunset)}
                      </h2>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div
          className={styles.weatherForecast}
          style={{
            backgroundColor: themeStyles.cardBg,
            borderColor: isDarkMode ? "#444" : "#eee",
          }}
        >
          <h3 style={{ color: themeStyles.textColor, marginBottom: "20px" }}>
            {t.forecast}
          </h3>
          <div className={styles.forecastList}>
            {forecast.map((day, index) => (
              <div
                key={index}
                className={styles.forecastItem}
                style={{
                  borderBottom: isDarkMode
                    ? "1px solid #444"
                    : "1px solid #eee",
                }}
              >
                <p style={{ color: themeStyles.textColor, fontWeight: "bold" }}>
                  {new Date(day.dt * 1000).toLocaleDateString(
                    language === "tr" ? "tr-TR" : "en-US",
                    {
                      weekday: "short",
                    },
                  )}
                </p>
                <div className={styles.forecastIcon}>
                  <ReactAnimatedWeather
                    icon={iconMap[day.weather[0].main] || "CLOUDY"}
                    color={themeStyles.iconColor}
                    size={35}
                    animate={true}
                  />
                </div>
                <p style={{ color: themeStyles.textColor }}>
                  {Math.round(day.main.temp)}°
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Weather;
