import {
  Dropzone,
  OrderList,
  PriceList
} from '../components/contractCalculator';
import AppLayout from '../layouts/AppLayout';

const ContractCalculator = () => {
  return (
    <AppLayout>
      <OrderList />
      <PriceList />
      <Dropzone />
    </AppLayout>
  );
};

export default ContractCalculator;
