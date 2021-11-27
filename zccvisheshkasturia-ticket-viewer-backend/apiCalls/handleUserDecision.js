const axios = require('axios');

handleUserDecision = async (domain, redirectUri, clientID, clientSecret, codeFromURL) => {
  const data = await axios({
    method: 'post',
    url: `${domain}/oauth/tokens`,
    responseType: 'json',
    headers: { 'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
    },
    data : {
      grant_type: 'authorization_code',
      code: codeFromURL,
      client_id: clientID,
      client_secret: clientSecret,
      redirect_uri: redirectUri,
      scope: 'read',
    },
    withCredentials: true,
  })
    .then((res) => ({callResponse: {
        msg: 'Success',
        data: res,
        }}
      )
    )
    .catch((err) => ({callResponse: {
        msg: 'Failed',
        data: err,
        }}
      ) 
    )
  return data;
};

module.exports.handleUserDecision = handleUserDecision;
