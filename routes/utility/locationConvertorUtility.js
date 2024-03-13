const axios = require('axios');

const apiKey = '55f427e99dd44bd0a50c6b3bca42a6f5';

async function getLocationCoordinates(locationName) {
  try {
    const response = await axios.get('https://api.opencagedata.com/geocode/v1/json', {
      params: {
        q: locationName,
        key: apiKey,
      },
    });

    const results = response.data.results;

    if (results.length > 0) {
      const location = results[0].geometry;
      return {
        latitude: location.lat,
        longitude: location.lng,
      };
    } else {
      throw new Error('Location not found');
    }
  } catch (error) {
    throw new Error(`Error fetching coordinates: ${error.message}`);
  }
}

async function getLocationName(latitude, longitude) {
  try {
    const response = await axios.get('https://api.opencagedata.com/geocode/v1/json', {
      params: {
        q: `${latitude},${longitude}`,
        key: apiKey,
      },
    });

    const results = response.data.results;

    if (results.length > 0) {
      return results[0].formatted;
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
