import HeaderOrderHistory from "./components/HeaderOrderHistory";
import ListOrderHistory from "./components/ListOrderHistory";

const OrderHistory = () => {
  return (
    <div
      className={`3xl:p-8 md:p-6 px-2 py-6 flex flex-col 3xl:gap-6 gap-4 h-full w-full max-w-full`}
    >
      <HeaderOrderHistory />
      <ListOrderHistory />
    </div>
  );
};

export default OrderHistory;
