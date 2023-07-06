const request = require("request");
forecast = (address, callback) => {
  const url = `http://api.weatherapi.com/v1/forecast.json?key=2b35adf2df6b4f52890131208231306&q=${address}&days=1&aqi=no`;

  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to weather service!", undefined);
    } else if (response.body.error) {
      callback("Unable to find location. Try another location!", undefined);
    } else {
      callback(
        undefined,
       [response.body.forecast.forecastday[0].day.condition.text +
          " It is currently " +
          response.body.current.temp_c +
          " degree out.",response.body.location]
      );
    }
  });
};
module.exports = forecast;
