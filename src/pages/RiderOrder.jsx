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
import { useNavigate } from "react-router-dom";

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
let chatOpen = false;

const RiderOrder = () => {
  const [riderGPS, setRiderGPS] = useState({ start: "Your location" });
  const [route, setRoute] = useState(null);
  const [buttonText, setButtonText] = useState("I have arrived.");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTelephone, setModalTelephone] = useState(false);
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);
  const [statusLogged, setStatusLogged] = useState({
    status2: false,
    status4: false,
  });
  const [paymentModalVisible, setPaymentModalVisible] = useState(false);

  const [isModalChatOpen, setIsModalChatOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatAdminId, setChatAdminId] = useState(null);
  const [messagesAdmin, setMessagesAdmin] = useState([]);
  const [isChatAdminOpen, setIsChatAdminOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [chatId, setChatId] = useState(null);

  const { socket, order, setNewOrder, setSocketIoClient } = useSocket();
  const { routeId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (socket) {
      const handleRouteHistory = (data) => {
        if (data.status === "FINISHED") {
          navigate("/rider");
        }
        if (data?.chatInfo) {
          setChatId(data.chatInfo.id);
        }
        if (data) {
          switch (data.status) {
            case "ACCEPTED":
              data.status = 2;
              break;
            case "ARRIVED":
              setButtonText("PICKEDUP");
              setStep(1);
              data.status = 2;
              break;
            case "PICKINGUP":
              setStatusLogged((prev) => ({ ...prev, status2: true }));
              data.status = 3;
              break;
            case "PICKEDUP":
              setButtonText("DELIVERED");
              setStep(2);
              data.status = 4;
              break;
            default:
              console.log("Unknown status");
          }
          setNewOrder(data);
        }
      };

      socket.on("routeHistory", handleRouteHistory);

      if (!order || !chatId) {
        socket.emit("requestRouteHistory", { routeId });
      }

      return () => {
        socket.off("routeHistory", handleRouteHistory);
        socket.emit("leaveRoute", { routeId });
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

      socket.emit("joinChat", { chatId });
      socket.on("chatHistory", handleChatHistory);
      socket.on("newMessage", handleNewMessage);
      socket.on("typing", handleTyping);

      return () => {
        socket.off("chatHistory", handleChatHistory);
        socket.off("newMessage", handleNewMessage);
        socket.off("typing", handleTyping);
        socket.emit("leaveChat", { chatId });
      };
    }
  }, [chatId, socket]);

  useEffect(() => {
    if (socket) {
      const handleChatAdminId = (data) => {
        setChatAdminId(data.id);
        if (data?.messages) {
          setMessagesAdmin(data.messages);
        }
      };
      socket.on("chatAdminInfo", handleChatAdminId);

      if (chatAdminId) {
        const handleNewMessageAdmin = (message) => {
          setMessagesAdmin((messagesAdmin) =>
            messagesAdmin.filter((item) => item.senderRole !== "TYPING")
          );
          setMessagesAdmin((messages) => [...messages, message]);
        };

        socket.on("newMessageAdmin", handleNewMessageAdmin);

        return () => {
          socket.off("chatAdminId", handleChatAdminId);
        };
      }
    }
  }, [socket, chatAdminId]);

  const handleChatClick = () => {
    setIsChatOpen(true);
    chatOpen = true;
  };
  const handleChatClose = () => {
    setIsChatOpen(false);
    chatOpen = false;
  };

  const handleChatAdminClick = () => {
    if (!chatAdminId) {
      socket.emit("chatToAdmin");
    }
    setIsChatAdminOpen(true);
    chatOpen = true;
  };
  const handleChatAdminClose = () => {
    setIsChatAdminOpen(false);
    chatOpen = false;
  };

  // ----------end chat -------------------

  useEffect(() => {
    const setCurrentLocation = async () => {
      if (!order) return;
      if (step > 0) return;

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

  const handleButtonTelClick = useCallback(() => {
    setModalTelephone(true);
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
  const handleModalTelClose = useCallback((confirmedTel) => {
    setModalTelephone(false);
    if (confirmedTel) {
      window.location.href = "tel:+6601234567"; // หมายเลขโทรศัพท์ที่ต้องการโทรออก
    }
  }, []);

  const handleFinishedRoute = () => {
    socket.emit("finishRoute", { ...order, chatId });
    socket.emit("leaveRoute", { routeId });
    socket.emit("leaveChat", { chatId });
    setPaymentModalVisible(false);
  };

  return (
    <div className="flex flex-col min-h-[862px]">
      <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY} libraries={["places"]}>
        {isChatOpen && (
          <ChatContainer
            messages={messages}
            socket={socket}
            chatId={chatId}
            closeChat={handleChatClose}
            senderId={order.riderId}
          />
        )}
        {isChatAdminOpen && (
          <ChatContainer
            messages={messagesAdmin}
            socket={socket}
            chatId={chatAdminId}
            closeChat={handleChatAdminClose}
            senderId={order.riderId}
            chatWith="Admin"
          />
        )}
        {!order ? (
          <div>Loading order...</div>
        ) : (
          <>
            <OrderDetails order={order} step={step} />
            <MapSectionWrapper loading={loading} route={route} />
            <NavigationButton onClick={handleNavigate} />
            <FareDetails
              order={order}
              buttonText={buttonText}
              onClick={handleButtonClick}
            />

            <FooterIcons
              onClickChat={handleChatClick}
              onClickChatAdmin={handleChatAdminClick}
              onClickTelUser={handleButtonTelClick}
            />
            <ModalCommon
              isOpen={modalVisible}
              onClose={() => handleModalClose(false)}
            >
              <p className="text-white">{buttonText} ?</p>
              <div className="flex w-full items-center justify-between">
                <CommonButton onClick={() => handleModalClose(true)}>
                  Yes
                </CommonButton>
                <CommonButton onClick={() => handleModalClose(false)}>
                  No
                </CommonButton>
              </div>
            </ModalCommon>

            <ModalCommon
              isOpen={modalTelephone}
              onClose={() => handleModalTelClose(false)}
            >
              <p className="text-white">{`tel xxxxxx`}</p>
              <div className="flex w-full items-center justify-between">
                <CommonButton onClick={() => handleModalTelClose(true)}>
                  Yes
                </CommonButton>
                <CommonButton onClick={() => handleModalTelClose(false)}>
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
      {order && (
        <ModalChatNotification
          isOpen={isModalChatOpen}
          openChat={handleChatClick}
          onClose={() => setIsModalChatOpen(false)}
          message={messages[messages.length - 1]?.content}
          riderName={order.riderName}
          riderProfilePic={order.riderProfilePic}
        />
      )}
    </div>
  );
};

export default RiderOrder;
