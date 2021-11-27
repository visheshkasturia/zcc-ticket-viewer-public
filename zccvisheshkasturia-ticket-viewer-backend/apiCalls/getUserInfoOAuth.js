const axios = require('axios');
/* eslint-disable */
getUserInfoOAuth = async (domain, token) => {

  const data = await axios({
    method: 'get',
    url: `${domain}/api/v2/users/me.json`,
    responseType: 'json',
    headers: { 
      'Access-Control-Allow-Origin': '*', 
      'Authorization': `Bearer ${token}`,
    },
  })
    .then((response) => {
      return {callResponse: {
        msg: 'Success',
        email: response.data.user.email,
        fullName: response.data.user.name,}
    }})
    .catch((err) => {
      return { callResponse: {
        msg: err,
      }};
    })
    return data;
  };


module.exports.getUserInfoOAuth = getUserInfoOAuth;
