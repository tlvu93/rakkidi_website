import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Home from './views/Home';
import InvoiceExtractor from './views/InvoiceExtractor';
import SitePlan from './views/SitePlan';
import StickerMaker from './views/StickerMaker';

import configureStore, { history } from './redux/configureStore';
import { ContractCalculator } from './views';

const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="siteplan" element={<SitePlan />} />
          <Route path="stickermaker" element={<StickerMaker />} />
          <Route path="invoiceextractor" element={<InvoiceExtractor />} />
          <Route path="contractcalculator" element={<ContractCalculator />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
