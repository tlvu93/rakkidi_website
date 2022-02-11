import { Route, Routes } from 'react-router';
import {
  ContractCalculator,
  Home,
  InvoiceExtractor,
  SitePlan,
  StickerMaker
} from './views';

export default (store) => {
  /**
   * Please keep routes in alphabetical order
   */
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="siteplan" element={<SitePlan />} />
      <Route path="stickermaker" element={<StickerMaker />} />
      <Route path="invoiceextractor" element={<InvoiceExtractor />} />
      <Route path="contractcalculator" element={<ContractCalculator />} />
    </Routes>
  );
};
