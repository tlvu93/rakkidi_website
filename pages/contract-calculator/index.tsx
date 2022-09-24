import Dropzone from 'feature/contract-calculator/dropzone';
import OrderList from 'feature/contract-calculator/order-item-list';

import PriceList from 'feature/contract-calculator/price-list';
import React from 'react';

const ContractCalculator = () => {
  return (
    <>
      <OrderList />
      <PriceList />
      <Dropzone />
    </>
  );
};

export default ContractCalculator;
