import { useState } from "react";
import InputSearch from "../../components/InputSearch";
import RiderBar from "../../components/RiderBar";
import { dataRider } from "../../constants/dataRider";
import RiderPaymentSubscribe from "../../layouts/Admin/RiderPaymentSubscribe";
import RiderPaymentPending from "../../layouts/Admin/RiderPaymentPending";
import RiderPaymentExpired from "../../layouts/Admin/RiderPaymentExpired";

export default function PaymentConfirmation() {
  const [search, setSearch] = useState('');
  const [filterBy, setFilterBy] = useState('SUBMITTED')
  const userRider = dataRider     // mock up

  console.log(userRider);

  const menuList = [    // หัวข้อของ sub navbar
    { id: 1, menuName: "Pending", onClick: () => setFilterBy('SUBMITTED'), isActive: 'SUBMITTED' },   // อย่าลืมแก้ status ตาม dataBase
    { id: 2, menuName: "Subscribed", onClick: () => setFilterBy('APPROVED'), isActive: 'APPROVED' },
    { id: 3, menuName: "Expired", onClick: () => setFilterBy('CANCELED'), isActive: 'CANCELED' },
  ];

  const targetRider = userRider.filter(item => item.status === filterBy)
  console.log('targetRider -->>', targetRider);

  const handleOnChance = (event) => {
    setSearch(event.target.value)
  }

  return (
    <div>
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
        {targetRider.map((item) =>
          <RiderBar key={item.id} data={item}>
            {filterBy === 'SUBMITTED'
              ? <RiderPaymentPending data={item} />
              : filterBy === 'APPROVED'
                ? <RiderPaymentSubscribe data={item} />
                : filterBy === 'CANCELED'
                  ? <RiderPaymentExpired data={item} />
                  : 'Something wrong'}
          </RiderBar>
        )}
      </div>
    </div>
  )
}
