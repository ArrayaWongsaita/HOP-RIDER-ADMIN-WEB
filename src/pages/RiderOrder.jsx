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
import useSocket from "../hooks/socketIoHook";
import { useParams } from "react-router-dom";

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

const RiderOrder = () => {
  const [riderGPS, setRiderGPS] = useState({ start: "Your location" });
  const [route, setRoute] = useState(null);
  const [buttonText, setButtonText] = useState("I have arrived.");
  const [modalVisible, setModalVisible] = useState(false);
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);
  const [statusLogged, setStatusLogged] = useState({
    status2: false,
    status4: false,
  });
  const [paymentModalVisible, setPaymentModalVisible] = useState(false);

  const { socket, order, setNewOrder, setSocketIoClient } = useSocket();
  const { routeId } = useParams();

  useEffect(() => {
    if (socket) {
      const handleRouteHistory = (data) => {
        if (data) {
          if (data?.status === "ACCEPTED") data.status = 2;
          if (data?.status === "GOING") data.status = 3;
          if (data?.status === "PICKEDUP") data.status = 4;
          setNewOrder(data);
        }
      };

      socket.on("routeHistory", handleRouteHistory);

      if (!order) {
        socket.emit("requestRouteHistory", { routeId });
      }

      return () => {
        socket.off("routeHistory", handleRouteHistory);
        socket.emit("leave", `route_${routeId}`);
      };
    } else {
      setSocketIoClient();
    }
  }, [socket, routeId, order, setNewOrder, setSocketIoClient]);

  useEffect(() => {
    const setCurrentLocation = async () => {
      if (!order) return;
      console.log(step, "step ---");
      if (step > 0) return;
      //  if(error) return

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const currentLocation = {
              lat: position.coords.latitude + 0.1 || 13.7583339,
              lng: position.coords.longitude + 0.1 || 100.5353214,
            };
            const placeName = await reverseGeocode(
              currentLocation,
              GOOGLE_MAPS_API_KEY
            );
            setRiderGPS({ ...currentLocation, description: placeName });
            calculateRoute(currentLocation, order.locationA);
          } catch (err) {
            const defaultLocation = {
              lat: order.riderGPS ? order.riderGPS.lat : 13.7583339,
              lng: order.riderGPS ? order.riderGPS.lng : 100.5353214,
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
        }
        // async (error) => {
        //   const defaultLocation = {
        //     lat: order.riderGPS ? order.riderGPS.lat : 13.7583339,
        //     lng: order.riderGPS ? order.riderGPS.lng : 100.5353214,
        //   };
        //   const placeName = await reverseGeocode(
        //     defaultLocation,
        //     GOOGLE_MAPS_API_KEY
        //   );
        //   setRiderGPS({ ...defaultLocation, description: placeName });
        //   calculateRoute(defaultLocation, order.locationA);
        //   setLoading(false);
        // }
      );
    };

    setCurrentLocation();
  }, [order]);

  const calculateRoute = (origin, destination) => {
    console.log("origin", origin);
    console.log("defaultLocation", destination);
    if (!window.google || !window.google.maps) {
      console.error("Google Maps JavaScript API is not loaded.");
      setTimeout(() => {
        window.location.reload();
      }, 300);
      return;
    }
    if (!origin || !origin.lat || !origin.lng) {
      console.error("Invalid origin:", origin);
      return;
    }
    if (!destination || !destination.lat || !destination.lng) {
      console.error("Invalid destination:", destination);
      return;
    }
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
        } else {
          console.error(`Error fetching directions ${result}`);
        }
      }
    );
  };

  const handleNavigate = useCallback(() => {
    if (!order || !riderGPS) return;

    const getNavigateUrl = () => {
      if (step === 0 && order.locationA) {
        if (!statusLogged.status2) {
          socket.emit("updateRouteStatus", { routeId, status: "GOING" });
          setStatusLogged((prev) => ({ ...prev, status2: true }));
        }
        return `https://www.google.com/maps/dir/?api=1&origin=${riderGPS.lat},${riderGPS.lng}&destination=${order.locationA.lat},${order.locationA.lng}&travelmode=driving`;
      } else if (step === 2 && order.locationA && order.locationB) {
        if (!statusLogged.status4) {
          socket.emit("updateRouteStatus", { routeId, status: "PICKEDUP" });
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
  }, [step, riderGPS, order, statusLogged, socket, routeId]);

  const handleButtonClick = useCallback(() => {
    setModalVisible(true);
  }, []);

  const handleModalClose = useCallback(
    (confirmed) => {
      setModalVisible(false);
      if (confirmed && order) {
        if (step === 0) {
          setButtonText("รับผู้โดยสารแล้ว");
          setStep(1);
        } else if (step === 1) {
          socket.emit("updateRouteStatus", { routeId, status: "PICKEDUP" });
          setButtonText("ส่งผู้โดยสารสำเร็จ");
          calculateRoute(order.locationA, order.locationB);
          setStep(2);
        } else if (step === 2) {
          setPaymentModalVisible(true);
          setStep(3);
        }
      }
    },
    [step, order, routeId, socket]
  );

  const handleFinishedRoute = () => {
    socket.emit("updateRouteStatus", { routeId, status: "FINISHED" });
    setPaymentModalVisible(false);
  };

  // if (error) {
  //   return <div>{error}</div>;
  // }

  // if (!order) {
  //   return <div>Loading order...</div>;
  // }

  return (
    <div className="flex flex-col min-h-[862px]">
      <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY} libraries={["places"]}>
        {!order ? (
          <div>Loading order...</div>
        ) : (
          <>
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
          </>
        )}
      </LoadScript>
      {!!order && (
        <ModalPayment
          isOpen={paymentModalVisible}
          fare={order.fare}
          onClose={handleFinishedRoute}
        />
      )}
    </div>
  );
};

export default RiderOrder;
