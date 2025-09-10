import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
// Update the import path if your App component is in a different location, e.g. './components/App'
import App from './App';
// If your App component is actually in './components/App', use:
// import App from './components/App';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Root element not found');

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-200 text-center py-4 mt-auto">
      <p>&copy; {new Date().getFullYear()} Ryan Castillo. All rights reserved.</p>
    </footer>
  );
};

export { Footer };
