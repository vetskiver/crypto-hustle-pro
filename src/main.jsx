import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import Layout from './routes/Layout';
import DetailView from './routes/DetailView';
import NotFound from './routes/NotFound';

import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Layout />} >
          <Route index element={<App />} />
          <Route path="coindetails/:symbol" element={<DetailView />} />
          <Route path="*" element={<NotFound />} />
          </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
