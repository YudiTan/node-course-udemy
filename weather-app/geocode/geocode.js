const request = require('request')


var geocodeAddress = (address, callBack) => {
  var encoded = encodeURIComponent(address);

  request({
  	url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encoded}`,
  	json: true
  }, (error, response, body) => {
  	if (error){
      callBack('Unable to connect to google servers.');
  	} else if (body.status === 'ZERO_RESULTS'){
      callBack('Address invalid.');
  	} else if (body.status === 'OK'){
      callBack(undefined, {
        address: body.results[0].formatted_address,
        latitude: body.results[0].geometry.location.lat,
        longtitude: body.results[0].geometry.location.lng,
      });

  }});

};

module.exports.geocodeAddress = geocodeAddress;
