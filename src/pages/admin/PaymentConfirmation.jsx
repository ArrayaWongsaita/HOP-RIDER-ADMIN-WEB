import { useState } from "react";
import InputSearch from "../../components/InputSearch";
import RiderBar from "../../components/RiderBar";
import RiderPaymentSubscribe from "../../layouts/Admin/RiderPaymentSubscribe";
import RiderPaymentPending from "../../layouts/Admin/RiderPaymentPending";
import useRider from "../../hooks/riderHook";
import { useEffect } from "react";

export default function PaymentConfirmation() {
  const { userRider, riderPaymentPending } = useRider();
  const [filterData, setFilterData] = useState([...userRider]);
  const [search, setSearch] = useState('');
  const [filterBy, setFilterBy] = useState('PENDING')

  useEffect(() => {
    if (filterBy === "PENDING") {
      handleClickPending()
    }
  }, [])

  const menuList = [    // หัวข้อของ sub navbar
    { id: 1, menuName: "Pending", onClick: () => { handleClickPending(); setFilterBy('PENDING') }, isActive: 'PENDING' },
    { id: 2, menuName: "Subscribed", onClick: () => { handleClickSubScribed(); setFilterBy('APPROVED') }, isActive: 'APPROVED' },
    { id: 3, menuName: "Expired", onClick: () => { handleClickExpired(); setFilterBy('EXPIRED') }, isActive: 'EXPIRED' },
  ];

  const handleOnChance = (event) => {
    setSearch(event.target.value)
  };

  const handleClickPending = () => {
    const filter = riderPaymentPending.filter((item) => item?.payments?.status === "PENDING")
    setFilterData(filter)
  };

  const handleClickSubScribed = () => {
    const filter = userRider.filter((item) => item?.subScribeDate > 0)
    setFilterData(filter)
  };

  const handleClickExpired = () => {
    const filter = userRider.filter((item) => item?.subScribeDate <= 0)
    setFilterData(filter)
  };

  return (
    <div className="pb-10">
      <div>
        <div className={`w-full h-[70px] flex items-center justify-between p-4 mb-5 pl-28
            font-semibold text-xl text-white
            bg-gradient-to-r from-[#1D2B53] from-30% to-[#FF004D] to-100% `}>
          {menuList.map((item) => (
            <div key={item.id} role="button" onClick={item.onClick}
              className={`hover:underline hover:font-extrabold ${filterBy === item.isActive ? 'underline' : ''}`}>
              {item.menuName}
            </div>
          ))}
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
      <div className="w-[90%] mx-auto flex flex-col gap-3">
        {filterData.map((item) =>
          <RiderBar status={item?.subScribeDate > 0 ? item?.payments?.expiredDate : "Expired"} key={item.id} data={item}>
            {filterBy === 'PENDING'
              ? <RiderPaymentPending data={item} />
              : filterBy === 'APPROVED'
                ? <RiderPaymentSubscribe data={item} />
                : filterBy === 'EXPIRED'
                  ? <RiderPaymentSubscribe data={item} />
                  : 'Something wrong'}
          </RiderBar>
        )}
      </div>
    </div>
  )
}
