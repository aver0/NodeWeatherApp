const request = require('request'); // Require the request package

var geocodeAddress = (address, callback) => {
  var encodedAddress = encodeURIComponent(address); // Encode the query string replacing spaces with %
  
  request({
    url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=AIzaSyAsboCLU6JSO1jLllw5RReLTOMvdBslo7g`,
    json: true
  }, (error, response, body) => {
    if (error) {
      callback('Error: Unable to establish a connection with Google');
    } else if (body.status === 'ZERO_RESULTS') {
      callback('Error: Address not found');
    } else if (body.status === 'OK' ) {
      callback(undefined,
        {
        Address: body.results[0].formatted_address,
        Latitude: body.results[0].geometry.location.lat,
        Longitude: body.results[0].geometry.location.lng
        });
    }
  });
}

module.exports = {
  geocodeAddress
};