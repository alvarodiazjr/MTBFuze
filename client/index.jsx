import React from 'react';
import ReactDOM from 'react-dom/client';
import Script from './components/script-loader';

const container = document.querySelector('#root');
const root = ReactDOM.createRoot(container);

root.render(<Script />);
