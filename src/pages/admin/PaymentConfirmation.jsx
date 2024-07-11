import { useState } from "react";
import InputSearch from "../../components/InputSearch";
import RiderBar from "../../components/RiderBar";
import RiderPaymentSubscribe from "../../layouts/Admin/RiderPaymentSubscribe";
import RiderPaymentPending from "../../layouts/Admin/RiderPaymentPending";
import useRider from "../../hooks/riderHook";

export default function PaymentConfirmation() {
  const { userRiderSubscribe, userRiderPaymentPending, userRiderExpired } = useRider();
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('PENDING');

  const menuList = [    // หัวข้อของ sub navbar
    {
      id: 1,
      menuName: "Pending",
      onClick: () => handleClickPending(),
      isActive: 'PENDING'
    },
    {
      id: 2,
      menuName: "Subscribed",
      onClick: () => handleClickSubScribed(),
      isActive: 'APPROVED'
    },
    {
      id: 3,
      menuName: "Expired",
      onClick: () => handleClickExpired(),
      isActive: 'EXPIRED'
    },
  ];

  const handleOnChance = (event) => {
    setSearch(event.target.value);
  };

  const handleClickPending = () => {
    setFilterStatus('PENDING')
  };

  const handleClickSubScribed = () => {
    setFilterStatus('APPROVED')
  };

  const handleClickExpired = () => {
    setFilterStatus('EXPIRED')
  };

  return (
    <div className="pb-10">
      <div>
        <div
          className={`w-full h-[80px] flex items-center justify-between p-4 mb-5 pl-28
            font-semibold text-xl text-white
            bg-gradient-to-r from-[#1D2B53] from-30% to-[#FF004D] to-100% `}
        >
          {menuList.map((item) => (
            <div key={item.id} role="button" onClick={item.onClick}
              className={`hover:underline hover:font-extrabold ${filterStatus === item.isActive ? 'underline' : ""
                }`}
            >
              {item.menuName}
            </div>
          ))}
          <div className="invisible">
            <InputSearch
              placeholder='search'
              onChange={handleOnChance}
              onClick={() => console.log('Search di kub')}
              name='search'
              value={search}
              rounded="xxlLeft"
            />
          </div>
        </div>
      </div>
      <div className="w-[90%] mx-auto flex flex-col gap-3">
        {filterStatus === 'PENDING' &&
          userRiderPaymentPending.map((item) =>
            <RiderBar key={item.id} data={item}
            >
              <RiderPaymentPending data={item} />
            </RiderBar>
          )}
        {filterStatus === 'APPROVED' &&
          userRiderSubscribe.map((item) =>
            <RiderBar key={item.id} data={item}
              status={item?.subScribeDate > 0 ? item?.payments?.expiredDate : "Expired"}
            >
              <RiderPaymentSubscribe data={item} />
            </RiderBar>
          )}
        {filterStatus === 'EXPIRED' &&
          userRiderExpired.map((item) =>
            <RiderBar key={item.id} data={item}
              status={item?.subScribeDate > 0 ? item?.payments?.expiredDate : "Expired"}
            >
              <RiderPaymentSubscribe data={item} />
            </RiderBar>
          )}
      </div>
    </div >
  );
}
