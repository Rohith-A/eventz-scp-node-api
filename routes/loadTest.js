const axios = require('axios');

function loadTestApi() {
    try {
        for(let i=0; i==500; i++) {
      const response = axios.post('http://evntz-node-api.ap-south-1.elasticbeanstalk.com/location/coordinates', {
        body: {
            "to": "name",
            "latitude": "53.353644",
            "longitude": "-6.259308",
            "name": "INDIAN TIFFINS, 143 Parnell St, Rotunda, Dublin, D01 R9P7"
        }
      });
      console.log(i)
      const results = response.data.results;
  
      if (results) {
        console.log(results)
      } else {
        throw new Error('Location not found');
      }
    }
    } catch (error) {
      throw new Error(`Error fetching location name: ${error.message}`);
    }
  }

  loadTestApi();