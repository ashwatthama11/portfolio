import React from 'react';
import ReactDOM from 'react-dom/client';
import SmartLayoutView from './components/SmartLayoutView.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SmartLayoutView onNavigateHome={() => { window.location.href = '/#home'; }} />
  </React.StrictMode>
);
