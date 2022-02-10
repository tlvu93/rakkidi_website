import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import ContractCalculator from './views/ContractCalculator';
import Home from './views/Home';
import InvoiceExtractor from './views/InvoiceExtractor';
import SitePlan from './views/SitePlan';
import StickerMaker from './views/StickerMaker';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="siteplan" element={<SitePlan />} />
        <Route path="stickermaker" element={<StickerMaker />} />
        <Route path="invoiceextractor" element={<InvoiceExtractor />} />
        <Route path="contractcalculator" element={<ContractCalculator />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
