const axios = require('axios');

loginOAuth = async (domain, redirectUri, clientID) => {
  const params = { 
    response_type: 'code',
    redirect_uri: redirectUri,
    client_id: clientID,
    scope:'read',
  };

  const sendURL =`${domain}/oauth/authorizations/new?response_type=${params.response_type}&redirect_uri=${params.redirect_uri}&client_id=${params.client_id}&scope=${params.scope}`

  const data = axios({
    method: 'get',
    url: sendURL,
    responseType: 'json',
    headers: { 
      'Access-Control-Allow-Origin': '*', 
    },
  })
    .then((response) => ({callResponse: {
        msg: 'Login call Success',
        redirectURL: sendURL,
        }
      })
    )
    .catch((err) => ({ callResponse :{
        msg: 'Login call Failed',
        redirectURL: 'http://localhost:3000/NotFound'
        }
      })
    )
  return data;
};

module.exports.loginOAuth = loginOAuth;
