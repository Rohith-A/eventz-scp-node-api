const axios = require('axios');

const apiKey = process.env.MAPS_API_KEY;
let googleapiKey = process.env.GOOGLE_API_KEY;

async function getLocationCoordinates(locationName) {
  try {
    // const response = await axios.get('https://api.opencagedata.com/geocode/v1/json', {
    //   params: {
    //     q: locationName,
    //     key: apiKey,
    //   },
    // });
    const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${locationName}&key=${googleapiKey}`);
    // let geoLocation = JSON.parse(response);
    let geoLocation = response.data;
    let mssg = `lat: ${geoLocation.results[0].geometry.location.lat} long: ${geoLocation.results[0].geometry.location.lng}`;
    return {
          latitude: geoLocation.results[0].geometry.location.lat,
          longitude: geoLocation.results[0].geometry.location.lng,
        };
    // const results = response.data.results;

    // if (results.length > 0) {
    //   const location = results[0].geometry;
    //   return {
    //     latitude: location.lat,
    //     longitude: location.lng,
    //   };
    // } else {
    //   throw new Error('Location not found');
    // }
  } catch (error) {
    throw new Error(`Error fetching coordinates: ${error.message}`);
  }
}

async function getLocationName(latitude, longitude) {
  try {
    const URL = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${googleapiKey}`
    const response = await axios.get(URL);
    const results = response.data.results;
    if (results.length > 0) {
      return {
        address: results[0].formatted_address
      };
    } else {
      throw new Error('Location not found');
    }
  } catch (error) {
    throw new Error(`Error fetching location name: ${error.message}`);
  }
}

module.exports = {
  getLocationName,
  getLocationCoordinates
}
// // Example usage:
// const locationName = 'D16P2R2, Dublin 16';

// getLocationCoordinates(locationName)
//   .then(coordinates => {
//     console.log(`Coordinates for ${locationName}:`, coordinates);
//     return getLocationName(coordinates.latitude, coordinates.longitude);
//   })
//   .then(name => console.log(`Location name for coordinates:`, name))
//   .catch(error => console.error(error));
