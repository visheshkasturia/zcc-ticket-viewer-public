import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from '../App/App';
import Login from '../Login/Login';
import NotFound from '../NotFound/NotFound';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="/app" element={<App />} />
        <Route path="/NotFound" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
