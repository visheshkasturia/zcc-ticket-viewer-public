import React from 'react';
import './Login.css';

function Login() {
  return (
    <div className="Login">
      <h2 data-testid="h2-login-test" className="h2-login">Zendesk Ticket Viewer</h2>
      <a data-testid="a-login-test" className="login-link" href="http://localhost:5000/oauth"> Login with Zendesk</a>
    </div>
  );
}

export default Login;
