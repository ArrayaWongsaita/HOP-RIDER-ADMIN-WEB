import { useState } from "react";
import InputSearch from "../../components/InputSearch";
import RiderBar from "../../components/RiderBar";
import RiderOrder from "../../components/RiderOrder";
import ComponentOrder from "../../components/ComponentOrder";
import useRider from "../../hooks/riderHook";

export default function CustomerController() {
  const [search, setSearch] = useState("");
  const { userRider } = useRider();
  console.log(userRider);

  const targetRider = userRider.filter(
    (item) =>
      `${item.id}`.includes(search) ||
      item.firstName.toLowerCase().includes(search.toLowerCase())
  );
  console.log("targetRider", targetRider);
  const handleOnChance = (event) => {
    setSearch(event.target.value);
  };

  return (
    <div className="w-full h-full">
      <div
        className={`w-full h-[80px] flex items-center justify-center 
           mb-5
            font-semibold text-xl text-white
            bg-gradient-to-r from-[#1D2B53] from-30% to-[#FF004D] to-100% `}
      >
        <InputSearch
          placeholder="search"
          onChange={handleOnChance}
          // onClick={() => console.log('Search di kub')}
          name="search"
          value={search}
          rounded="xxlLeft"
        />
      </div>

      <div className="flex flex-col gap-3 ">
        {targetRider.length > 0 &&
          targetRider.map((item) => (
            <RiderBar key={item.id} data={item}>
              <ComponentOrder data={item} />
            </RiderBar>
          ))}
      </div>
    </div>
  );
}
