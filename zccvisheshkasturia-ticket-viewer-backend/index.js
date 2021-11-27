require('dotenv').config()
const express = require('express');
const { URL } = require('url')
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const ticketsLib = require('./apiCalls/getAllTickets');
const getUserOAuth = require('./apiCalls/getUserInfoOAuth')
const loginUser = require('./apiCalls/loginOAuth')
const handleDecision = require('./apiCalls/handleUserDecision');

const webapp = express();
webapp.use(cookieParser());

// Allow cross origin access
webapp.use(cors());
webapp.use(bodyParser.urlencoded({extended: true,}));

// set variables
const port = process.env.SERVER_PORT;
const domain = process.env.DOMAIN_URL;
const redirectURI = process.env.REDIRECT_URI
const clientID = process.env.CLIENT_ID;
let redirectUriObj = undefined;
let pathName = '';
try {
  redirectUriObj = new URL(redirectURI);
  pathName = redirectUriObj.pathname;
} catch {
  console.log('Invalid URL')
}

const clientSecret = process.env.CLIENT_SECRET;
let accessToken = '';

webapp.listen(port, () => console.log(`Server running on port:${port}`));

webapp.get('/', (req, res) => (
  res.json({
    message: 'Welcome to the proxy backend for Zendesk Coding Challenge Ticket Viewer',
})));

// Make Login OAuth Request
webapp.get('/oauth', (request, response) => {
  loginUser.loginOAuth(domain, redirectURI, clientID).then((res) => {
    response.redirect(encodeURI(res.callResponse.redirectURL));
  }).catch(() => {
    response.redirect('http://localhost:3000/NotFound')
  });
});

// Handle User Decision
webapp.get(pathName, async (request, response) => {
  const fullurl = request.protocol + '://' + request.get('host') + request.originalUrl;
  const urlObj = new URL(fullurl)

  if (fullurl.includes('error')){
    response.json({msg: 'Error User Declined Authenticatiom'})
    return;
  }

  const codeFromURL = urlObj.searchParams.get('code')

  handleDecision.handleUserDecision(domain,redirectURI, clientID, clientSecret, codeFromURL).then( async (res) => {
    // if response is successful set cookie with user and token details else redirect to NotFound/ Something went wrong
    if(res.callResponse.msg == 'Success') {
      const responseData = res.callResponse.data;
      accessToken = responseData.data.access_token;
      getUserOAuth.getUserInfoOAuth(domain, accessToken).then((userRes) => {
        const userData = userRes.callResponse;
        const options = {
          maxAge: 1000 * 60 * 15, // Cookie will expire after 15 minutes
        }
        const cookieData = {
          login: 'success',
          token: accessToken,
          fullName: userData.fullName,
          email: userData.email,
          userDomain: domain,
        }
        response.cookie('zccCookie', cookieData, options)
        response.redirect('http://localhost:3000/App')
      }).catch(() => {
        console.log('Error while fetching user details');
        response.redirect('http://localhost:3000/NotFound')
      })
    } else {
      response.redirect('http://localhost:3000/NotFound')
    }
    return;
  })
  .catch(() => {
    response.redirect('http://localhost:5000/NotFound')
    return;
  })
});

// GET Ticket API endpoint
webapp.get('/getAllTickets', (request, response) => {

  let tokenCookie = request.cookies.zccCookie;
  if (tokenCookie == undefined) {
    console.log('Token not accessible login again');
    response.redirect('http://localhost:5000/NotFound')
  } else {
    accessToken = tokenCookie.token;
    ticketsLib.getAllTickets(domain, accessToken).then((res) => {
      response.json({data:res.data.requests});
      return;
    })
      .catch((err) => {
        response.redirect('http://localhost:3000/NotFound');
      });
  }
});

webapp.get('/logout', (request,response) => {
  response.clearCookie('zccCookie');
  accessToken = '';
  response.redirect('http://localhost:3000');
});
