import React from "react";
import styles from "../Weather.module.css";

function WeatherMiddle({
  weather,
  t,
  language,
  setLanguage,
  isDarkMode,
  toggleTheme,
  themeStyles,
  formatTime,
}) {
  return (
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
              {weather.wind.speed} <span style={{ fontSize: "16px" }}>m/s</span>
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
                  <p style={{ fontSize: "11px", color: themeStyles.subText }}>
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
                  <p style={{ fontSize: "11px", color: themeStyles.subText }}>
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
  );
}

export default WeatherMiddle;
