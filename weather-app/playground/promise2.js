const request = require('request');

var geocodeAddress = (address) => {
  return new Promise((resolve, reject) => {
    var encoded = encodeURIComponent(address);
    request({
      url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encoded}`,
      json: true
    }, (error, response, body) => {
      if (error){
        reject('Unable to connect to google servers.');
      } else if (body.status === 'ZERO_RESULTS'){
        reject('Address invalid.');
      } else if (body.status === 'OK'){
        resolve({
          address: body.results[0].formatted_address,
          latitude: body.results[0].geometry.location.lat,
          longtitude: body.results[0].geometry.location.lng,
        });
    }});

  })
};

geocodeAddress('17414 cedar placid lane').then((location) => {
  console.log(JSON.stringify(location, undefined, 2));
}, (errorMessage) => {
  console.log(errorMessage);
});
