import React from 'react';
import ReactDOM from 'react-dom/client';
import VehicleControlProvider from './context/control/vehicle/VehicleProvider';
import LoaderProvider from './context/LoadContext';
import ToastProvider from './context/ToastContext';
import './index.module.scss';
import VehiclesPage from './pages/Vehicles';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>

    <ToastProvider>
      <LoaderProvider>
        <VehicleControlProvider>
          <VehiclesPage />
        </VehicleControlProvider>
      </LoaderProvider>
    </ToastProvider>

  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
