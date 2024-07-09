/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";
import socketIOClient from "socket.io-client";
import { getAccessToken } from "../utils/local-storage";
import riderApi from "../apis/riderApi";

const ENDPOINT = import.meta.env.VITE_API_URL;

export const SocketIoContext = createContext();

export default function SocketIoContextProvider({ children }) {
  const [socket, setSocket] = useState(null);
  const [order, setOrder] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const socketIo = socketIOClient(ENDPOINT, {
      auth: {
        token: getAccessToken(),
      },
    });
    setSocket(socketIo);
    socketIo.on("connect_error", (err) => {
      console.error("Connection error:", err.message);
    });

    socketIo.on("error", (err) => {
      console.error("Socket error:", err.message);
    });
  }, []);

  useEffect(() => {
    const checkRouteRider = async () => {
      try {
        const res = await riderApi.checkRiderRoute();
        console.log(res);
        if (res.data.id) {
          navigate(`/rider/order/${res.data.id}`);
          return;
        }
      } catch (error) {
        console.log(error);
      }
    };
    checkRouteRider();
  }, []);

  const setSocketIoClient = () => {
    const socketIo = socketIOClient(ENDPOINT, {
      auth: {
        token: getAccessToken(),
      },
    });
    setSocket(socketIo);
  };

  const setNewOrder = (newRoute) => {
    const newOrder = {
      id: newRoute?.id,
      userId: newRoute?.customerId,
      locationA: {
        lat: +newRoute?.pickupLat,
        lng: +newRoute?.pickupLng,
        description: newRoute.pickupPlace,
      },
      locationB: {
        lat: +newRoute?.desLat,
        lng: +newRoute?.desLng,
        description: newRoute?.desPlace,
      },
      riderGPS: {
        lat: +newRoute?.riderLat + 0.1,
        lng: +newRoute?.riderLng + 0.1,
      },
      distanceInKm: newRoute?.distance,
      durationInMinutes: newRoute?.estTime,
      fare: newRoute?.rideFare,
      status: newRoute?.status,
      riderId: newRoute?.riderId,
    };
    console.log(newOrder);
    setOrder(newOrder);
  };

  const values = {
    order,
    setSocketIoClient,
    setNewOrder,
    socket,
  };

  return (
    <SocketIoContext.Provider value={values}>
      {children}
    </SocketIoContext.Provider>
  );
}
