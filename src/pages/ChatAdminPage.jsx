import { useState, useEffect, useRef } from "react";
import {
  PencilSquareIcon,
  ChatBubbleLeftEllipsisIcon,
} from "@heroicons/react/24/outline";
import EndChatModal from "../features/chatAdmin/components/EndChatModal";
import OrderModal from "../features/chatAdmin/components/OrderModal";
import SimulateMessageInput from "../features/chatAdmin/components/SimulateMessageInput";
import {
  mockRiders,
  mockCustomers,
  orderDataMock,
  mockChats,
} from "../features/chatAdmin/constants/mockData";

const notificationSound = new Audio("/sound/notiChat.mp3");

export default function ChatAdminPage() {
  const [currentChat, setCurrentChat] = useState({ type: "rider", id: 1 });
  const [inputValue, setInputValue] = useState("");
  const [chats, setChats] = useState({ rider: {}, customer: {} });
  const [lastMessages, setLastMessages] = useState({ rider: {}, customer: {} });
  const [profileData, setProfileData] = useState({ rider: {}, customer: {} });
  const [lastAdminMessageTime, setLastAdminMessageTime] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [orderData, setOrderData] = useState(orderDataMock);
  const [editingStatus, setEditingStatus] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [confirmStatusChange, setConfirmStatusChange] = useState(false);
  const [userInteracted, setUserInteracted] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);

  const messagesEndRef = useRef(null);
  const dropdownRef = useRef(null);

  const suggestions = [
    "กรุณารอสักครู่ admin กำลังตรวจสอบ",
    "ขอบคุณที่ติดต่อเข้ามา",
    "มีอะไรให้ช่วยไหมคะ?",
    "ขอโทษด้วยค่ะ ขอเวลาสักครู่",
    "สามารถส่งข้อมูลเพิ่มเติมได้ไหมคะ?",
    "กรุณาตรวจสอบรายละเอียดการส่ง",
    "ขออภัยในความล่าช้า",
  ];

  useEffect(() => {
    setChats(mockChats);

    const initialLastMessages = {
      rider: Object.keys(mockChats.rider).reduce((acc, id) => {
        const lastMessage = mockChats.rider[id].slice(-1)[0];
        acc[id] = lastMessage;
        return acc;
      }, {}),
      customer: Object.keys(mockChats.customer).reduce((acc, id) => {
        const lastMessage = mockChats.customer[id].slice(-1)[0];
        acc[id] = lastMessage;
        return acc;
      }, {}),
    };

    setLastMessages(initialLastMessages);

    setProfileData({
      rider: mockRiders,
      customer: mockCustomers,
    });
  }, []);

  const handleUserInteraction = () => {
    setUserInteracted(true);
    document.removeEventListener("click", handleUserInteraction);
    document.removeEventListener("touchstart", handleUserInteraction);
  };

  useEffect(() => {
    document.addEventListener("click", handleUserInteraction);
    document.addEventListener("touchstart", handleUserInteraction);

    return () => {
      document.removeEventListener("click", handleUserInteraction);
      document.removeEventListener("touchstart", handleUserInteraction);
    };
  }, []);

  useEffect(() => {
    const lastMessage = lastMessages[currentChat.type]?.[currentChat.id];
    if (lastMessage?.sender !== "admin" && userInteracted) {
      if (!notificationSound.paused) {
        notificationSound.pause();
        notificationSound.currentTime = 0;
      }
      notificationSound.play().catch((error) => {
        console.error("Audio play error: ", error);
      });
    }
  }, [lastMessages, currentChat, userInteracted]);

  useEffect(() => {
    if (lastAdminMessageTime) {
      const timer = setTimeout(() => {
        const lastMessage =
          chats[currentChat.type]?.[currentChat.id]?.slice(-1)[0];
        if (lastMessage?.sender === "admin") {
          console.log("ลบการสนทนา เนื่องจากไม่มีการตอบกลับ");
          setChats((prevChats) => {
            const updatedChats = { ...prevChats };
            delete updatedChats[currentChat.type][currentChat.id];

            const nextChat = Object.keys(updatedChats[currentChat.type])[0];
            setCurrentChat({ type: currentChat.type, id: Number(nextChat) });

            return updatedChats;
          });
        }
      }, 15000);

      return () => clearTimeout(timer);
    }
  }, [lastAdminMessageTime, chats, currentChat.type, currentChat.id]);

  useEffect(() => {
    scrollToBottom();
  }, [chats, currentChat]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSend = () => {
    if (inputValue.trim() !== "") {
      const newMessage = {
        sender: "admin",
        text: inputValue,
        timestamp: new Date(),
      };
      setChats((prevChats) => {
        const updatedChats = { ...prevChats };
        updatedChats[currentChat.type][currentChat.id].push(newMessage);

        setLastMessages((prevLastMessages) => ({
          ...prevLastMessages,
          [currentChat.type]: {
            ...prevLastMessages[currentChat.type],
            [currentChat.id]: newMessage,
          },
        }));

        setLastAdminMessageTime(new Date());

        return updatedChats;
      });
      setInputValue("");
      scrollToBottom();
    }
  };

  const handleSimulateSend = (message) => {
    const newMessage = {
      sender: currentChat.type,
      text: message,
      timestamp: new Date(),
    };
    setChats((prevChats) => {
      const updatedChats = { ...prevChats };
      updatedChats[currentChat.type][currentChat.id].push(newMessage);

      setLastMessages((prevLastMessages) => ({
        ...prevLastMessages,
        [currentChat.type]: {
          ...prevLastMessages[currentChat.type],
          [currentChat.id]: newMessage,
        },
      }));

      return updatedChats;
    });
    scrollToBottom();
  };

  const handleSuggestionClick = (suggestion) => {
    setInputValue(suggestion);
  };

  const handleEndChat = () => {
    setShowModal(true);
  };

  const confirmEndChat = () => {
    console.log("ลบการสนทนา");
    setChats((prevChats) => {
      const updatedChats = { ...prevChats };
      delete updatedChats[currentChat.type][currentChat.id];

      const nextChat = Object.keys(updatedChats[currentChat.type])[0];
      setCurrentChat({ type: currentChat.type, id: Number(nextChat) });

      return updatedChats;
    });
    setShowModal(false);
  };

  const cancelEndChat = () => {
    setShowModal(false);
  };

  const handleChatTypeChange = (type) => {
    const nextChatId = Object.keys(chats[type])[0];
    setCurrentChat({ type: type, id: Number(nextChatId) });
  };

  const handleShowOrder = (id) => {
    setCurrentOrder(orderData[id]);
    setShowOrderModal(true);
  };

  const closeOrderModal = () => {
    setShowOrderModal(false);
  };

  const handleStatusChangeConfirm = () => {
    console.log("Status:", selectedStatus);
    setOrderData((prevOrderData) => ({
      ...prevOrderData,
      [currentOrder.id]: {
        ...prevOrderData[currentOrder.id],
        status: selectedStatus,
      },
    }));
    setCurrentOrder((prevOrder) => ({
      ...prevOrder,
      status: selectedStatus,
    }));
    console.log(orderData);
    setShowOrderModal(false);
    setEditingStatus(false);
    setConfirmStatusChange(false);
  };

  const handleStatusChangeCancel = () => {
    setShowOrderModal(false);
    setEditingStatus(false);
    setConfirmStatusChange(false);
  };

  const currentMessages = chats[currentChat.type]?.[currentChat.id] || [];
  const currentProfile = profileData[currentChat.type]?.[currentChat.id];

  return (
    <div className="flex flex-1 overflow-hidden h-full">
      <div className="w-1/4 bg-gray-100 border-r overflow-y-auto">
        <div className="flex justify-around bg-yellow-200 p-4">
          <button
            className={`px-4 py-2 rounded-lg ${
              currentChat.type === "rider"
                ? "bg-blue-500 text-white"
                : "bg-gray-300"
            }`}
            onClick={() => handleChatTypeChange("rider")}
          >
            Rider
          </button>
          <button
            className={`px-4 py-2 rounded-lg ${
              currentChat.type === "customer"
                ? "bg-blue-500 text-white"
                : "bg-gray-300"
            }`}
            onClick={() => handleChatTypeChange("customer")}
          >
            Customer
          </button>
        </div>

        {Object.keys(chats[currentChat.type] || {})
          .sort((a, b) => {
            return (
              new Date(lastMessages[currentChat.type][b].timestamp) -
              new Date(lastMessages[currentChat.type][a].timestamp)
            );
          })
          .map((id) => {
            const lastMessage = lastMessages[currentChat.type][id];
            const isUnread = lastMessage.sender !== "admin";

            return (
              <div
                key={id}
                className={`flex justify-between p-4 cursor-pointer h-[90px] ${
                  currentChat.id === Number(id) ? "bg-gray-200 " : ""
                }`}
                onClick={() =>
                  setCurrentChat({ type: currentChat.type, id: Number(id) })
                }
              >
                <div className="flex items-center">
                  <img
                    src={profileData[currentChat.type][id].profileImg}
                    alt="Profile"
                    className="w-16 h-16 rounded-full mr-4"
                  />
                  <div className="flex flex-col justify-center h-full">
                    <div className="flex-1 flex items-center">{`${
                      profileData[currentChat.type][id].firstName
                    } ${profileData[currentChat.type][id].lastName}`}</div>
                    <div className="text-xs text-gray-500 flex-1 overflow-hidden line-clamp-2">
                      {`${
                        lastMessage.sender === "admin"
                          ? "Admin"
                          : currentChat.type
                      }: ${lastMessage.text}`}
                    </div>
                  </div>
                </div>
                <div className="flex items-center">
                  {isUnread && (
                    <span className="w-2.5 h-2.5 bg-red-500 rounded-full mr-2 blink" />
                  )}
                  <div className="text-xs text-gray-500 min-w-[60px]">
                    {new Date(lastMessage.timestamp).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>
              </div>
            );
          })}
      </div>
      <div className="flex flex-col flex-1 overflow-hidden">
        <div className="flex items-center justify-between bg-yellow-200 p-4">
          <div>
            {currentChat.type === "rider" ? "Rider: " : "Customer: "}
            {currentProfile?.firstName
              ? `${currentProfile.firstName} ${currentProfile.lastName}`
              : "Loading..."}
          </div>
          <div className="relative" ref={dropdownRef}>
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-lg"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              Manage
            </button>

            {showDropdown && (
              <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-lg shadow-xl z-20 items-start justify-start flex flex-col">
                <button
                  className="block px-4 py-2 text-left text-gray-800 hover:bg-blue-500 hover:text-white w-full flex items-center"
                  onClick={() => handleShowOrder(currentChat.id)}
                >
                  <PencilSquareIcon className="h-5 w-5 mr-2" />
                  Order Status
                </button>
                <button
                  className="block px-4 py-2 text-left text-gray-800 hover:bg-blue-500 hover:text-white w-full flex items-center"
                  onClick={handleEndChat}
                >
                  <ChatBubbleLeftEllipsisIcon className="h-5 w-5 mr-2" />
                  End Chat
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="flex-1 p-4 overflow-y-auto">
          {currentMessages.map((message, index) => (
            <div
              key={index}
              className={`mb-2 flex ${
                message.sender === "admin" ? "justify-end" : "justify-start"
              }`}
            >
              {message.sender !== "admin" && (
                <img
                  src={
                    currentChat.type === "rider"
                      ? profileData.rider[currentChat.id].profileImg
                      : profileData.customer[currentChat.id].profileImg
                  }
                  alt="Profile"
                  className="w-16 h-16 rounded-full mr-2 self-start bg-pink-200 "
                />
              )}
              <div
                className={`inline-block p-2 rounded-lg max-w-lg break-words ${
                  message.sender === "admin"
                    ? "bg-blue-500 text-white"
                    : message.sender === "rider"
                    ? "bg-green-300 text-black"
                    : "bg-gray-300 text-black"
                }`}
              >
                {message.sender === "admin" ? "Admin: " : ""}
                {message.text}
                <div className="text-xs text-gray-500 text-end">
                  {new Date(message.timestamp).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div className="relative p-4 bg-white border-t">
          <div className="flex gap-2 mb-2 overflow-x-auto">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                className="px-4 py-2 bg-gray-200 rounded-full whitespace-nowrap"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion}
              </button>
            ))}
          </div>
          <div className="flex items-center">
            <input
              type="text"
              className="flex-1 p-2 border rounded-lg"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="พิมพ์ข้อความ..."
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleSend();
                }
              }}
            />
            <button
              className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg"
              onClick={handleSend}
            >
              Send
            </button>
          </div>
          <SimulateMessageInput onSimulateSend={handleSimulateSend} />
        </div>
      </div>

      {showModal && (
        <EndChatModal
          closeModal={cancelEndChat}
          confirmEndChat={confirmEndChat}
        />
      )}

      {showOrderModal && currentOrder && (
        <OrderModal
          currentOrder={currentOrder}
          profileData={profileData}
          editingStatus={editingStatus}
          selectedStatus={selectedStatus}
          setEditingStatus={setEditingStatus}
          setSelectedStatus={setSelectedStatus}
          setConfirmStatusChange={setConfirmStatusChange}
          handleStatusChangeConfirm={handleStatusChangeConfirm}
          handleStatusChangeCancel={handleStatusChangeCancel}
          confirmStatusChange={confirmStatusChange}
          closeOrderModal={closeOrderModal}
        />
      )}
    </div>
  );
}
