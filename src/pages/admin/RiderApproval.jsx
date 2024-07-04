import { useState } from "react";
import InputSearch from "../../components/InputSearch";
import RiderBar from "../../components/RiderBar";
import RiderInfo from "../../components/RiderInfo";
import { dataRider } from "../../contexts/dataRider";

export default function RiderApproval() {
  const [search, setSearch] = useState('');
  const [filterBy, setFilterBy] = useState('SUBMITTED')
  const userRider = dataRider

  console.log(userRider);

  const menuList = [
    { id: 1, menuName: "Pending", onClick: () => setFilterBy('SUBMITTED') },
    { id: 2, menuName: "Approved", onClick: () => setFilterBy('APPROVED') },
    { id: 3, menuName: "Denied", onClick: () => setFilterBy('CANCELED') },
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
            <div key={item.id} role="button" onClick={item.onClick} className="">
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
