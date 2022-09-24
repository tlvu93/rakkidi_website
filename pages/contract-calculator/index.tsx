import Dropzone from 'feature/contract-calculator/dropzone';
import Orderlist from 'feature/contract-calculator/orderlist';
import PriceList from 'feature/contract-calculator/price-list';
import React from 'react';

const ContractCalculator = () => {
  return (
    <>
      <Orderlist />
      <PriceList />
      <Dropzone />
    </>
  );
};

export default ContractCalculator;
