const axios = require('axios');

getAllTickets = async (domain, token) => {
  const data = await axios({
    method: 'get',
    url: `${domain}/api/v2/requests.json`,
    responseType: 'json',
    headers: { 
      'Access-Control-Allow-Origin': '*',
      'Authorization': `Bearer ${token}`,
    },
    withCredentials: true,
  })
    .then((response) => {
      return response;
    })
    .catch((err) => {
      return err;
    })
    return data;
  };


module.exports.getAllTickets = getAllTickets;
