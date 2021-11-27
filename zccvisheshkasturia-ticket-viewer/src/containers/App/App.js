import React, { useState, useEffect } from 'react';
import './App.css';
import Cookies from 'js-cookie';
import { Navigate } from 'react-router-dom';
import Tickets from '../Tickets/Tickets';

function App() {
  const [redirect, setRedirect] = useState(false);
  const [name, setName] = useState('');
  // fetch cookie if cookie is undefined send to NotFound
  useEffect(() => {
    const cookieData = Cookies.get('zccCookie');
    if (cookieData === undefined) {
      setRedirect(true);
    } else {
      setName(JSON.parse(cookieData.slice(2)).fullName);
    }
  }, []);

  return (
    <div className="App">
      {redirect && <Navigate to="/NotFound" />}
      <Tickets name={name} />
      <a data-testid="logout-link-test" className="logout-link" href="http://localhost:5000/logout">Log out</a>
    </div>
  );
}

export default App;
