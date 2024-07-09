/* eslint-disable react-hooks/exhaustive-deps */
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
import ChatContainer from "../features/chat/components/ChatContainer";
import ModalChatNotification from "../features/order/components/ModalChatNotification";

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
let chatOpen = false 


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

  const [isModalChatOpen, setIsModalChatOpen] = useState(false);
  const [isChatOpen , setIsChatOpen] = useState(false)
  const [messages, setMessages] = useState([]);
  const [chatId, setChatId] = useState(null);

  const { socket, order, setNewOrder, setSocketIoClient } = useSocket();
  const { routeId } = useParams();


  useEffect(() => {
    if (socket) {
      const handleRouteHistory = (data) => {
        console.log(data)
        if (data?.chatInfo) {
          console.log(data.chatInfo.id, "chat----------------");
          setChatId(data.chatInfo.id);
        }
        if (data) {
          if (data?.status === "ACCEPTED") data.status = 2;
          if (data?.status === "PICKINGUP") data.status = 3;
          if (data?.status === "PICKEDUP") data.status = 4;
          setNewOrder(data);
        }
      };

      socket.on("routeHistory", handleRouteHistory);

      if (!order || !chatId) {
        socket.emit("requestRouteHistory", { routeId });
      }

      return () => {
        socket.off("routeHistory", handleRouteHistory);
        socket.emit("leaveRoute", {routeId});
      };
    } else {
      setSocketIoClient();
    }
  }, [socket]);



// ---------- chat -------------------  
useEffect(() => {
  if (socket && chatId) {
    const handleChatHistory = (messages) => {
      setMessages(messages);
    };
    const handleNewMessage = (message) => {
      console.log(message)
      if (!chatOpen && message.senderRole !== "RIDER") {
        setIsModalChatOpen(true);
      }
      setMessages((messages) =>
        messages.filter((item) => item.senderRole !== "TYPING")
      );
      setMessages((messages) => [...messages, message]);
    };
    const handleTyping = ({ role }) => {
      if (role !== "RIDER") {
        setMessages((messages) => {
          const newMessages = messages.filter(
            (item) => item.senderRole !== "TYPING"
          );
          return [
            ...newMessages,
            { senderRole: "TYPING", content: "message" },
          ];
        });
        setTimeout(() => {
          setMessages((messages) =>
            messages.filter((item) => item.senderRole !== "TYPING")
          );
        }, 5000);
      }
    };

    console.log("--------------------------joinChat", chatId);
    socket.emit("joinChat", { chatId });
    socket.on("chatHistory", handleChatHistory);
    socket.on("newMessage", handleNewMessage);
    socket.on("typing", handleTyping);

    return () => {
      socket.off("chatHistory", handleChatHistory);
      socket.off("newMessage", handleNewMessage);
      socket.off("typing", handleTyping);
      socket.emit("leaveChat", {chatId});
    };
  }
}, [chatId, socket]);


const handleChatClick = () => {
  setIsChatOpen(true)
  chatOpen = true
};
const handleChatClose = () => {
 setIsChatOpen(false)
 chatOpen = false
};



// ----------end chat ------------------- 



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
          socket.emit("updateRouteStatus", { routeId, status: "PICKINGUP" });
          setStatusLogged((prev) => ({ ...prev, status2: true }));
        }
        return `https://www.google.com/maps/dir/?api=1&origin=${riderGPS.lat},${riderGPS.lng}&destination=${order.locationA.lat},${order.locationA.lng}&travelmode=driving`;
      } else if (step === 2 && order.locationA && order.locationB) {
        if (!statusLogged.status4) {
        socket.emit("updateRouteStatus", { routeId, status: "PICKEDUP" });
          // socket.emit("updateRouteStatus", { routeId, status: "OTW" });
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
          socket.emit("updateRouteStatus", { routeId, status: "ARRIVED" });
          
          socket.emit("sendMessage", {
            chatId,
            senderId: order.riderId,
            content: "I've arrived",
            senderRole: "RIDER",
          });
          setButtonText("PICKEDUP");
          setStep(1);
        } else if (step === 1) {
          // socket.emit("updateRouteStatus", { routeId, status: "PICKEDUP" });
          setButtonText("DELIVERED");
          calculateRoute(order.locationA, order.locationB);
          setStep(2);
        } else if (step === 2) {

          socket.emit("updateRouteStatus", { routeId, status: "DELIVERING" });
          setPaymentModalVisible(true);
          setStep(3);
        }
      }
    },
    [step, order, routeId, socket]
  );

  const handleFinishedRoute = () => {

    socket.emit("finishRoute", {...order,chatId});
    socket.emit("leaveRoute", {routeId});
    socket.emit("leaveChat", {chatId});
    setPaymentModalVisible(false);
  };

  // if (error) {
  //   return <div>{error}</div>;
  // }

  // if (!order) {
  //   return <div>Loading order...</div>;
  // }

  console.log(route,"-------===========================")

  return (
    <div className="flex flex-col min-h-[862px]">
      <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY} libraries={["places"]}>
      {isChatOpen && <ChatContainer messages={messages} socket={socket} chatId={chatId} closeChat={handleChatClose} senderId={order.riderId}/>}
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
            
            <FooterIcons onClickChat={handleChatClick}  />
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
      {order && <ModalChatNotification
      isOpen={isModalChatOpen}
      openChat={handleChatClick}
      onClose={() => setIsModalChatOpen(false)}
      message={messages[messages.length -1]?.content}
      riderName={order.riderName}
      riderProfilePic={order.riderProfilePic}/>}
    </div>
  );
};

export default RiderOrder;
