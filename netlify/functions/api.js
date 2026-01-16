exports.handler = async function (event, context) {
  const { city } = event.queryStringParameters;
  const API_KEY = process.env.VITE_WEATHER_API_KEY;

  if (!city) {
    return { statusCode: 400, body: "No city found!" };
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=eng`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Veri çekilemedi" }),
    };
  }
};
