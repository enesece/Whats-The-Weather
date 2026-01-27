import React, { useState, useEffect } from "react";
import styles from "./Weather.module.css";

function Weather() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

  const getWeather = async () => {
    if (city === "") return;
    setLoading(true);
    try {
      const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=eng`;
      const weatherRes = await fetch(weatherUrl);
      const weatherData = await weatherRes.json();
      setWeather(weatherData);
    } catch (error) {
      console.log("Error:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    const loadDefaultCity = async () => {
      setLoading(true);
      try {
        const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=Istanbul&appid=${API_KEY}&units=metric&lang=eng`;
        const weatherRes = await fetch(weatherUrl);
        const weatherData = await weatherRes.json();
        setWeather(weatherData);
        setCity("Istanbul");
      } catch (error) {
        console.log("Error:", error);
      }
      setLoading(false);
    };
    loadDefaultCity();
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.body.style.backgroundColor = "#1a1a1a";
    } else {
      document.body.style.backgroundColor = "hsl(0, 0%, 95%)";
    }
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
      ? "0 30px 60px hsl(1, 84%, 63%, 0.01)"
      : "0 30px 60px hsl(1, 84%, 63%, 0.07)",
    cardShadow: isDarkMode
      ? "0 4px 15px hsl(1, 84%, 63%, 0.05)"
      : "0 4px 15px hsl(1, 84%, 63%, 0.08)",
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
              boxShadow: themeStyles.weatherShadow,
            }}
          >
            <input
              type="text"
              placeholder="Search..."
              value={city}
              onChange={(e) => setCity(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && getWeather()}
              style={{
                color: themeStyles.textColor,
              }}
            />
            <button onClick={getWeather}>🔍</button>
          </div>

          {loading ? (
            <h2 className={styles.loadingText}>Loading...</h2>
          ) : weather && weather.main ? (
            <div
              className={styles.weatherInfo}
              style={{ color: themeStyles.textColor }}
            >
              <img
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
                alt="ikon"
              />
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
          className={styles.weatherRight}
          style={{
            backgroundColor: themeStyles.rightSideBg,
          }}
        >
          <div className={styles.topHeader}>
            <h3 style={{ color: themeStyles.textColor }}>Details</h3>
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

          {weather && weather.main && (
            <div className={styles.highlightsGrid}>
              <div
                className={styles.highlightsCard}
                style={{
                  backgroundColor: themeStyles.cardItemBg,
                  boxShadow: themeStyles.cardShadow,
                }}
              >
                <h4 style={{ color: themeStyles.subText }}>Wind</h4>
                <h1 style={{ color: themeStyles.textColor }}>
                  {weather.wind.speed}{" "}
                  <span
                    style={{ fontSize: "16px", color: themeStyles.subText }}
                  >
                    m/s
                  </span>
                </h1>
                <p style={{ color: themeStyles.subText }}>
                  Direction: {weather.wind.deg}°
                </p>
              </div>

              <div
                className={styles.highlightsCard}
                style={{
                  backgroundColor: themeStyles.cardItemBg,
                  boxShadow: themeStyles.cardShadow,
                }}
              >
                <h4 style={{ color: themeStyles.subText }}>Humidity</h4>
                <h1 style={{ color: themeStyles.textColor }}>
                  {weather.main.humidity}{" "}
                  <span style={{ fontSize: "16px" }}>%</span>
                </h1>
                <p style={{ color: themeStyles.subText }}>
                  {weather.main.humidity > 50 ? "High" : "Low"}
                </p>
              </div>

              <div
                className={styles.highlightsCard}
                style={{
                  backgroundColor: themeStyles.cardItemBg,
                  boxShadow: themeStyles.cardShadow,
                }}
              >
                <h4 style={{ color: themeStyles.subText }}>Feels like</h4>
                <h1 style={{ color: themeStyles.textColor }}>
                  {Math.round(weather.main.feels_like)}°
                </h1>
                <p style={{ color: themeStyles.subText }}>Temperature</p>
              </div>

              <div
                className={styles.highlightsCard}
                style={{
                  backgroundColor: themeStyles.cardItemBg,
                  boxShadow: themeStyles.cardShadow,
                }}
              >
                <h4 style={{ color: themeStyles.subText }}>Visibility</h4>
                <h1 style={{ color: themeStyles.textColor }}>
                  {weather.visibility / 1000}{" "}
                  <span
                    style={{ fontSize: "16px", color: themeStyles.subText }}
                  >
                    km
                  </span>
                </h1>
                <p style={{ color: themeStyles.subText }}>
                  {weather.visibility > 5000 ? "Clear" : "Misty"}
                </p>
              </div>

              <div
                className={styles.highlightsCard}
                style={{
                  backgroundColor: themeStyles.cardItemBg,
                  boxShadow: themeStyles.cardShadow,
                }}
              >
                <h4 style={{ color: themeStyles.subText }}>Pressure</h4>
                <h1 style={{ color: themeStyles.textColor }}>
                  {weather.main.pressure}{" "}
                  <span
                    style={{ fontSize: "16px", color: themeStyles.subText }}
                  >
                    hPa
                  </span>
                </h1>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Weather;
