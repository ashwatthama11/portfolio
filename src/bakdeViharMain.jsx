import React from 'react';
import ReactDOM from 'react-dom/client';
import BakdeViharView from './components/BakdeViharView.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BakdeViharView
      onNavigateAadhunikNaksha={() => {
        window.location.href = '/aadhunik-naksha';
      }}
      onNavigateHome={() => {
        window.location.href = '/#home';
      }}
    />
  </React.StrictMode>
);
