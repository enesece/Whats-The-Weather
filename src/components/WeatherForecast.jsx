import React from "react";
import ReactAnimatedWeather from "react-animated-weather";
import styles from "../Weather.module.css";

function WeatherForecast({
  forecast,
  t,
  language,
  themeStyles,
  isDarkMode,
  iconMap,
}) {
  return (
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
              borderBottom: isDarkMode ? "1px solid #444" : "1px solid #eee",
            }}
          >
            <p style={{ color: themeStyles.textColor, fontWeight: "bold" }}>
              {new Date(day.dt * 1000).toLocaleDateString(
                language === "tr" ? "tr-TR" : "en-US",
                { weekday: "short" },
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
  );
}

export default WeatherForecast;
