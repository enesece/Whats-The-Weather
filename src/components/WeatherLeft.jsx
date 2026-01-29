import React from "react";
import ReactAnimatedWeather from "react-animated-weather";
import styles from "../Weather.module.css";

function WeatherLeft({
  city,
  setCity,
  getWeather,
  t,
  loading,
  weather,
  themeStyles,
  isDarkMode,
  iconMap,
  getSuggestion,
}) {
  return (
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

          <p
            style={{
              marginTop: "15px",
              fontStyle: "italic",
              color: themeStyles.iconColor,
              fontWeight: "500",
              fontSize: "14px",
              backgroundColor: isDarkMode
                ? "rgba(255,255,255,0.1)"
                : "rgba(0,0,0,0.05)",
              padding: "8px 15px",
              borderRadius: "10px",
            }}
          >
            {getSuggestion()}
          </p>
        </div>
      ) : (
        <h3 style={{ color: themeStyles.textColor }}>{t.noData}</h3>
      )}
    </div>
  );
}

export default WeatherLeft;
