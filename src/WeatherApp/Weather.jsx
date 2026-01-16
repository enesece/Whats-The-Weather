import React, { useState, useEffect } from "react";
import styles from "./Weather.module.css";

function Weather() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const getWeather = async () => {
    if (city === "") return;

    setLoading(true);

    try {
      const weatherRes = await fetch(`/.netlify/functions/api?city=${city}`);
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
        const weatherRes = await fetch(`/.netlify/functions/api?city=Istanbul`);
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
      ? "0 30px 60px hsl(1, 84%, 63%, 0.06)"
      : "0 30px 60px hsl(1, 84%, 63%, 0.08)",
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
        {/* --- LEFT SIDE --- */}
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
                style={{ width: "150px" }}
              />
              <h1 style={{ fontSize: "70px", margin: "0" }}>
                {Math.round(weather.main.temp)}°
              </h1>
              <h2 style={{ fontSize: "24px", margin: "10px 0" }}>
                {weather.name}, {weather.sys.country}
              </h2>
              <p
                style={{
                  textTransform: "capitalize",
                  color: "gray",
                  fontSize: "18px",
                }}
              >
                {weather.weather[0].description}
              </p>
            </div>
          ) : (
            <h3 style={{ color: themeStyles.textColor }}>No data found.</h3>
          )}
        </div>

        {/* --- RIGHT SIDE --- */}
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
              {/*---- WIND ----*/}
              <div
                className={styles.highlightsCard}
                style={{ backgroundColor: themeStyles.cardItemBg }}
              >
                <h4 style={{ color: themeStyles.subText }}>Wind</h4>
                <h1 style={{ color: themeStyles.textColor }}>
                  {weather.wind.speed}{" "}
                  <span
                    style={{ fontSize: "16px", color: themeStyles.subText }}
                  >
                    km/s
                  </span>
                </h1>
                <p style={{ color: themeStyles.subText }}>
                  Direction: {weather.wind.deg}°
                </p>
              </div>

              {/*---- HUMIDITY ----*/}
              <div
                className={styles.highlightsCard}
                style={{ backgroundColor: themeStyles.cardItemBg }}
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

              {/*---- FEELS LIKE ----*/}
              <div
                className={styles.highlightsCard}
                style={{ backgroundColor: themeStyles.cardItemBg }}
              >
                <h4 style={{ color: themeStyles.subText }}>Feels like</h4>
                <h1 style={{ color: themeStyles.textColor }}>
                  {Math.round(weather.main.feels_like)}°
                </h1>
                <p style={{ color: themeStyles.subText }}>Tempature</p>
              </div>

              {/*---- VISIBILITY ----*/}
              <div
                className={styles.highlightsCard}
                style={{ backgroundColor: themeStyles.cardItemBg }}
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

              {/*---- PRESSURE ----*/}
              <div
                className={styles.highlightsCard}
                style={{ backgroundColor: themeStyles.cardItemBg }}
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
