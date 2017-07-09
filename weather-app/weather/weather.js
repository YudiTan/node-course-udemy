
const request = require('request');


var getWeather = (latitude, longtitude, callBack) => {
request({
	url: `https://api.darksky.net/forecast/20e67e55c83adfb3ee85fcac7369a1c9/${latitude},${longtitude}`,
	json: true
}, (error, response, body) => {
	if (error){
    callBack('Unable to connect to forecast.io server.');
	} else if (body.code === 400) {
    callBack(body.error);
	} else{
    callBack(undefined, {
      temperature: body.currently.temperature,
      apparentTemperature: body.currently.apparentTemperature,
    });
}});
};


module.exports.getWeather = getWeather;
