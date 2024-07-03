import { useState, useEffect, useCallback } from "react";
import { LoadScript } from "@react-google-maps/api";
import MapSectionWrapper from "../features/order/components/MapSectionWrapper";
import OrderDetails from "../features/order/components/OrderDetail";
import NavigationButton from "../features/order/components/NavigationButton";
import FareDetails from "../features/order/components/FareDetail";
import FooterIcons from "../features/order/components/FooterIcons";
import ModalCommon from "../components/ModalCommon";
import CommonButton from "../components/CommonButton";
import { reverseGeocode } from "../utils/geocodeUtils";
import ModalPayment from "../features/order/components/ModalPayment";

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

const fetchOrder = async () => {
  return {
    distanceInKm: 4.9,
    durationInMinutes: 15,
    fare: 49,
    locationA: {
      lat: 13.744677,
      lng: 100.5295593,
      description:
        "444 ถ. พญาไท แขวงวังใหม่ เขตปทุมวัน กรุงเทพมหานคร 10330 ประเทศไทย",
    },
    locationB: {
      lat: 13.7465337,
      lng: 100.5391488,
      description:
        "centralwOrld, ถนน พระรามที่ 1 แขวงปทุมวัน เขตปทุมวัน กรุงเทพมหานคร ประเทศไทย",
    },
    userId: 3,
  };
};

const RiderOrder = () => {
  const [riderGPS, setRiderGPS] = useState({ start: "Your location" });
  const [route, setRoute] = useState(null);
  const [buttonText, setButtonText] = useState("ฉันมาถึงแล้ว");
  const [modalVisible, setModalVisible] = useState(false);
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState(null);
  const [error, setError] = useState(null);
  const [statusLogged, setStatusLogged] = useState({
    status2: false,
    status4: false,
  });
  const [paymentModalVisible, setPaymentModalVisible] = useState(false);

  useEffect(() => {
    const initializeOrder = async () => {
      try {
        const fetchedOrder = await fetchOrder();
        setOrder(fetchedOrder);
      } catch (err) {
        setError("ไม่สามารถดึงข้อมูล order ได้");
      }
    };

    initializeOrder();
  }, []);

  useEffect(() => {
    const setCurrentLocation = async () => {
      if (!order) return;

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const currentLocation = {
              lat: position.coords.latitude || 13.7583339,
              lng: position.coords.longitude || 100.5353214,
            };
            const placeName = await reverseGeocode(
              currentLocation,
              GOOGLE_MAPS_API_KEY
            );
            setRiderGPS({ ...currentLocation, description: placeName });
            calculateRoute(currentLocation, order.locationA);
          } catch (err) {
            const defaultLocation = {
              lat: 13.7583339,
              lng: 100.5353214,
            };
            const placeName = await reverseGeocode(
              defaultLocation,
              GOOGLE_MAPS_API_KEY
            );
            setRiderGPS({ ...defaultLocation, description: placeName });
            calculateRoute(defaultLocation, order.locationA);
          } finally {
            setLoading(false);
          }
        },
        async (error) => {
          const defaultLocation = {
            lat: 13.7583339,
            lng: 100.5353214,
          };
          const placeName = await reverseGeocode(
            defaultLocation,
            GOOGLE_MAPS_API_KEY
          );
          setRiderGPS({ ...defaultLocation, description: placeName });
          calculateRoute(defaultLocation, order.locationA);
          setLoading(false);
        }
      );
    };

    setCurrentLocation();
  }, [order]);

  const calculateRoute = (origin, destination) => {
    const directionsService = new window.google.maps.DirectionsService();
    directionsService.route(
      {
        origin,
        destination,
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          setRoute(result);
        }
      }
    );
  };

  const handleNavigate = useCallback(() => {
    if (!order || !riderGPS) return;

    const getNavigateUrl = () => {
      if (step === 0 && order.locationA) {
        if (!statusLogged.status2) {
          console.log("status=2");
          setStatusLogged((prev) => ({ ...prev, status2: true }));
        }
        return `https://www.google.com/maps/dir/?api=1&origin=${riderGPS.lat},${riderGPS.lng}&destination=${order.locationA.lat},${order.locationA.lng}&travelmode=driving`;
      } else if (step === 2 && order.locationA && order.locationB) {
        if (!statusLogged.status4) {
          console.log("status=4");
          setStatusLogged((prev) => ({ ...prev, status4: true }));
        }
        return `https://www.google.com/maps/dir/?api=1&origin=${order.locationA.lat},${order.locationA.lng}&destination=${order.locationB.lat},${order.locationB.lng}&travelmode=driving`;
      }
      return "";
    };

    const navigateUrl = getNavigateUrl();
    if (navigateUrl) {
      window.open(navigateUrl, "_blank");
    }
  }, [step, riderGPS, order, statusLogged]);

  const handleButtonClick = useCallback(() => {
    setModalVisible(true);
  }, []);

  const handleModalClose = useCallback(
    (confirmed) => {
      setModalVisible(false);
      if (confirmed && order) {
        if (step === 0) {
          console.log("status=3");
          setButtonText("รับผู้โดยสารแล้ว");
          setStep(1);
        } else if (step === 1) {
          setButtonText("ส่งผู้โดยสารสำเร็จ");
          calculateRoute(order.locationA, order.locationB);
          setStep(2);
        } else if (step === 2) {
          console.log("status=5");
          setPaymentModalVisible(true);
          setStep(3);
        }
      }
    },
    [step, order]
  );

  if (error) {
    return <div>{error}</div>;
  }

  if (!order) {
    return <div>Loading order...</div>;
  }

  return (
    <div className="flex flex-col min-h-[862px]">
      <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY} libraries={["places"]}>
        <OrderDetails order={order} />
        <MapSectionWrapper loading={loading} route={route} />
        <NavigationButton onClick={handleNavigate} />
        <FareDetails
          order={order}
          buttonText={buttonText}
          onClick={handleButtonClick}
        />
        <FooterIcons />
        <ModalCommon
          isOpen={modalVisible}
          onClose={() => handleModalClose(false)}
        >
          <p>{buttonText} ?</p>
          <div className="flex w-full items-center justify-between">
            <CommonButton onClick={() => handleModalClose(true)}>
              Yes
            </CommonButton>
            <CommonButton onClick={() => handleModalClose(false)}>
              No
            </CommonButton>
          </div>
        </ModalCommon>
      </LoadScript>
      <ModalPayment
        isOpen={paymentModalVisible}
        fare={order.fare}
        onClose={() => setPaymentModalVisible(false)}
      />
    </div>
  );
};

export default RiderOrder;
