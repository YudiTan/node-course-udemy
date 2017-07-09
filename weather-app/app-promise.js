const yargs = require('yargs');
const geocode = require('./geocode/geocode.js');
const weather = require('./weather/weather.js');
const axios = require('axios');

//tool that helps parse command line commands
const argv = yargs
	.options({
		a: {
			demand:true,
			alias:'address',
			describe:"Address to fetch weather for.",
			string:true
		}
})
	.help()
	.alias('help', 'h')
	.argv;

// encoding strings into webURL format, i.e. hello world => hello%20world
var encoded = encodeURIComponent(argv.a);
var geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encoded}`;

//axios is basically a tool that helps implement promises for arrow functions
axios.get(geocodeUrl).then((response) => { //this is the callback function
	if (response.data.status === 'ZERO_RESULTS'){
		throw new Error('Unable to find address.'); //raises and error and jumps straight to catch at the bottom
	} else {
		var latitude = response.data.results[0].geometry.location.lat;
		var longtitude = response.data.results[0].geometry.location.lng;
		var weatherUrl = `https://api.darksky.net/forecast/20e67e55c83adfb3ee85fcac7369a1c9/${latitude},${longtitude}`;
		console.log(response.data.results[0].formatted_address);
		return axios.get(weatherUrl);
	}
}).then((response) => {
	var temperature = response.data.currently.temperature;
	var apparentTemperature = response.data.currently.apparentTemperature;
	console.log(`It's currently ${temperature}, but it feels like ${apparentTemperature}.`);
}).catch((e) => {
	if (e.code === 'ENOTFOUND') {
		console.log('Unable to connect to API servers.');
	} else {
		console.log(e.message);
	}
});
