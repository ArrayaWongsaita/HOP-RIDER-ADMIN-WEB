import { useState } from "react";
import InputSearch from "../../components/InputSearch";
import RiderBar from "../../components/RiderBar";
import RiderInfo from "../../components/RiderInfo";
import useRider from "../../hooks/riderHook";

export default function RiderApproval() {
  const { userRider } = useRider();
  const [search, setSearch] = useState('');
  const [filterBy, setFilterBy] = useState('SUBMITTED')

  console.log(userRider);

  const menuList = [    // หัวข้อของ sub navbar
    { id: 1, menuName: "Pending", onClick: () => setFilterBy('SUBMITTED'), isActive: 'SUBMITTED' },
    { id: 2, menuName: "Approved", onClick: () => setFilterBy('APPROVED'), isActive: 'APPROVED' },
    { id: 3, menuName: "Denied", onClick: () => setFilterBy('CANCELED'), isActive: 'CANCELED' },
  ];

  const targetRider = userRider.filter(item => item.status === filterBy)

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
            <RiderInfo data={item} />
          </RiderBar>
        )}
      </div>
    </div>
  )
}
