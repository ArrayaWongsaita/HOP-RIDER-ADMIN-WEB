import MapSection from "../../../components/MapSection";

/**
 * คอมโพเนนต์ห่อสำหรับส่วนของแผนที่
 * @param {boolean} loading - สถานะการโหลด
 * @param {Object} route - ข้อมูลเส้นทาง
 */
const MapSectionWrapper = ({ loading, route }) => (
  <div className="flex-grow relative max-h-[500px]">
    {loading ? (
      <div className="flex items-center justify-center h-full">
        <div>Loading...</div>
      </div>
    ) : (
      <MapSection route={route} />
    )}
  </div>
);

export default MapSectionWrapper;
