import OrderFromCustomer from "./OrderFromCustomer";

export default function RiderOrder() {
  return (
    <div className="w-full flex flex-col justify-between items-center px-8 py-3 rounded-xl bg-gray-200">
        <OrderFromCustomer />
    </div>
  )
}
