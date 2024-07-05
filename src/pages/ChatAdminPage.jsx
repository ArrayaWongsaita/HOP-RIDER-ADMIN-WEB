import { useState, useEffect, useRef } from "react";
import {
  PencilSquareIcon,
  ChatBubbleLeftEllipsisIcon,
} from "@heroicons/react/24/outline";

const notificationSound = new Audio("/sound/notiChat.mp3");

// Mock ข้อมูล Rider
const mockRiders = {
  1: {
    profileImg:
      "https://scontent.fbkk2-8.fna.fbcdn.net/v/t1.6435-9/54236682_1261847423980149_3478770548794720256_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=53a332&_nc_eui2=AeF4aQdj7IKTUr3z8dPOKY5JsXmnsJrSsNexeaewmtKw15aqE3_kFYe8cSND8p35musTYKoBRvfK32Qi0utzSIE3&_nc_ohc=PS1iaW-TdpwQ7kNvgFBEaYj&_nc_ht=scontent.fbkk2-8.fna&oh=00_AYDSR4FbSov3jt61W2aIqDTFMPEwz1LbhQZ8LzIK5UDnwA&oe=66ADC136",
    firstName: "John",
    lastName: "Wick",
  },
  2: {
    profileImg:
      "https://scontent.fbkk2-8.fna.fbcdn.net/v/t39.30808-6/337820493_1146862922584229_6920475203936666124_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeE2dJ4wAlIx7EcDjrjgOfL2zbGwhdw9xJvNsbCF3D3Em5Bl0_xvVehY4cIWQ3VNRqQ4f9ZDoqB1-9uRjctYt2VP&_nc_ohc=mEZ0Fgu3LEQQ7kNvgE_YQmk&_nc_ht=scontent.fbkk2-8.fna&oh=00_AYCvLUI9sQj5_edVMXE6Ze9EsMtGZaDRoGWWcUarmUc0gQ&oe=668C29AC",
    firstName: "Donny",
    lastName: "Yen",
  },
};

// Mock ข้อมูล Customer
const mockCustomers = {
  1: {
    profileImg:
      "https://hips.hearstapps.com/hmg-prod/images/spongebob-squarepants-1592120738.jpg?crop=0.482xw:1.00xh;0.169xw,0&resize=980:*",
    firstName: "SpongeBob",
    lastName: "SquarePants",
  },
  2: {
    profileImg:
      "https://scontent.fbkk2-7.fna.fbcdn.net/v/t39.30808-6/449107662_867700875386252_4941070785228174118_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeGO3D9DAZBxr09rcMJeiyMvVh_nuwvXtepWH-e7C9e16lStHp-axV2rfA0mII0GeQzn2tJB9U0ARVU4FDPHNeNu&_nc_ohc=rBAsXIvC65EQ7kNvgH4cYbV&_nc_ht=scontent.fbkk2-7.fna&gid=AoGrd5bfFooLdQNvkoV18Us&oh=00_AYA62xRbbi-ChHlKWv_7-ERefmubagT_Ic_OK_iTuEqC4Q&oe=668C28FA",
    firstName: "Minion",
    lastName: "banana",
  },
};

// Mock ข้อมูล Order
const orderDataMock = {
  1: {
    riderId: 1,
    customerId: 1,
    status: "PENDING",
    pickupPlace: "เซ็นทรัลลาดพร้าว",
    desPlace: "มาบุญครอง",
  },
  2: {
    riderId: 2,
    customerId: 2,
    status: "ACCEPTED",
    pickupPlace: "สนามหลวง",
    desPlace: "สยามพารากอน",
  },
};

const statusOptions = [
  "PENDING",
  "ACCEPTED",
  "GOING",
  "PICKEDUP",
  "OTW",
  "ARRIVED",
  "CANCELED",
  "FINISHED",
];

const OrderModal = ({
  currentOrder,
  profileData,
  editingStatus,
  selectedStatus,
  setEditingStatus,
  setSelectedStatus,
  setConfirmStatusChange,
  handleStatusChangeConfirm,
  handleStatusChangeCancel,
  confirmStatusChange,
  closeOrderModal,
}) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeOrderModal();
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        closeOrderModal();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [modalRef, closeOrderModal]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div
        className="bg-white p-6 rounded-lg shadow-lg w-96 relative"
        ref={modalRef}
      >
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
          onClick={closeOrderModal}
        >
          X
        </button>
        <h2 className="text-lg font-semibold mb-4">Order Details</h2>
        <div className="mb-4">
          <h3 className="font-semibold">Rider:</h3>
          <div className="flex items-center">
            <img
              src={profileData.rider[currentOrder.riderId].profileImg}
              alt="Profile"
              className="w-10 h-10 rounded-full mr-4"
            />
            <div>{`${profileData.rider[currentOrder.riderId].firstName} ${
              profileData.rider[currentOrder.riderId].lastName
            }`}</div>
          </div>
        </div>
        <div className="mb-4">
          <h3 className="font-semibold">Customer:</h3>
          <div className="flex items-center">
            <img
              src={profileData.customer[currentOrder.customerId].profileImg}
              alt="Profile"
              className="w-10 h-10 rounded-full mr-4"
            />
            <div>{`${profileData.customer[currentOrder.customerId].firstName} ${
              profileData.customer[currentOrder.customerId].lastName
            }`}</div>
          </div>
        </div>
        <div className="mb-4">
          <h3 className="font-semibold">Status:</h3>
          {editingStatus ? (
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="border p-2 rounded-lg w-full"
            >
              {statusOptions.map((status, index) => (
                <option key={index} value={status}>
                  {status}
                </option>
              ))}
            </select>
          ) : (
            <div>{currentOrder.status}</div>
          )}
        </div>
        <div className="mb-4">
          <h3 className="font-semibold">Pickup Location:</h3>
          <div>{currentOrder.pickupPlace}</div>
        </div>
        <div className="mb-4">
          <h3 className="font-semibold">Delivery Location:</h3>
          <div>{currentOrder.desPlace}</div>
        </div>
        <div className="flex justify-end">
          {editingStatus ? (
            confirmStatusChange ? (
              <>
                <button
                  className="px-4 py-2 bg-gray-300 rounded-lg mr-2"
                  onClick={handleStatusChangeCancel}
                >
                  No
                </button>
                <button
                  className="px-4 py-2 bg-red-500 text-white rounded-lg"
                  onClick={handleStatusChangeConfirm}
                >
                  Yes
                </button>
              </>
            ) : (
              <>
                <button
                  className="px-4 py-2 bg-gray-300 rounded-lg mr-2"
                  onClick={handleStatusChangeCancel}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                  onClick={() => setConfirmStatusChange(true)}
                >
                  Confirm
                </button>
              </>
            )
          ) : (
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-lg"
              onClick={() => setEditingStatus(true)}
            >
              Edit Status
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const EndChatModal = ({ closeModal, confirmEndChat }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [modalRef, closeModal]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div
        className="bg-white p-6 rounded-lg shadow-lg relative"
        ref={modalRef}
      >
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
          onClick={closeModal}
        >
          X
        </button>
        <h2 className="text-lg font-semibold mb-4">ยืนยันการจบการสนทนา</h2>
        <p className="mb-4">คุณต้องการจบการสนทนานี้หรือไม่?</p>
        <div className="flex justify-end">
          <button
            className="px-4 py-2 bg-gray-300 rounded-lg mr-2"
            onClick={closeModal}
          >
            ยกเลิก
          </button>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded-lg"
            onClick={confirmEndChat}
          >
            ยืนยัน
          </button>
        </div>
      </div>
    </div>
  );
};

// ส่วนที่เพิ่มเติมเริ่มต้นตรงนี้
const SimulateMessageInput = ({ onSimulateSend }) => {
  const [simulateInputValue, setSimulateInputValue] = useState("");

  const handleSimulateSend = () => {
    if (simulateInputValue.trim() !== "") {
      onSimulateSend(simulateInputValue);
      setSimulateInputValue("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSimulateSend();
    }
  };

  return (
    <div className="flex items-center mt-4">
      <input
        type="text"
        className="flex-1 p-2 border rounded-lg"
        value={simulateInputValue}
        onChange={(e) => setSimulateInputValue(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="พิมพ์ข้อความจำลอง..."
      />
      <button
        className="ml-2 px-4 py-2 bg-red-500 text-white rounded-lg"
        onClick={handleSimulateSend}
      >
        Simulate Send
      </button>
    </div>
  );
};
// ส่วนที่เพิ่มเติมสิ้นสุดตรงนี้

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

  const messagesEndRef = useRef(null);
  const dropdownRef = useRef(null);

  const suggestions = [
    "กรุณารอสักครู่ admin {name} กำลังตรวจสอบ",
    "ขอบคุณที่ติดต่อเข้ามา",
    "มีอะไรให้ช่วยไหมคะ?",
    "รอสักครู่ค่ะ",
    "ขอโทษด้วยค่ะ ขอเวลาสักครู่",
    "โปรดระบุเส้นทางที่ต้องการ",
    "สามารถส่งข้อมูลเพิ่มเติมได้ไหมคะ?",
    "กรุณายืนยันการรับงาน",
    "กรุณาตรวจสอบรายละเอียดการส่ง",
    "ขออภัยในความล่าช้า",
    "สินค้าอยู่ระหว่างการจัดส่ง",
    "โปรดแจ้งที่อยู่สำหรับการจัดส่ง",
    "กรุณายืนยันการชำระเงิน",
  ];

  useEffect(() => {
    // Mock ข้อมูลจากฐานข้อมูล
    const mockChats = {
      rider: {
        1: [
          {
            sender: "rider",
            text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
            timestamp: new Date(),
          },
          {
            sender: "admin",
            text: "สวัสดีค่ะ มีอะไรให้ช่วยไหมคะ?",
            timestamp: new Date(),
          },
          {
            sender: "rider",
            text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
            timestamp: new Date(),
          },
        ],
        2: [
          { sender: "rider", text: "สอบถามเส้นทางครับ", timestamp: new Date() },
          { sender: "admin", text: "ไปที่ไหนคะ?", timestamp: new Date() },
        ],
      },
      customer: {
        1: [
          {
            sender: "customer",
            text: "สวัสดีค่ะ อยากทราบสถานะการขนส่งค่ะ",
            timestamp: new Date(),
          },
          {
            sender: "admin",
            text: "กำลังตรวจสอบให้นะคะ",
            timestamp: new Date(),
          },
        ],
        2: [
          {
            sender: "customer",
            text: "สินค้ายังไม่มาถึงค่ะ",
            timestamp: new Date(),
          },
          {
            sender: "admin",
            text: "ขอโทษด้วยค่ะ กำลังติดตามให้ค่ะ",
            timestamp: new Date(),
          },
        ],
      },
    };

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

  // audio
  useEffect(() => {
    const lastMessage = lastMessages[currentChat.type]?.[currentChat.id];
    if (lastMessage?.sender !== "admin") {
      // หยุดเสียงก่อนที่จะเล่นเสียงใหม่
      notificationSound.pause();
      notificationSound.currentTime = 0;
      notificationSound
        .play()
        .catch((error) => console.error("Audio play error: ", error));
    }
  }, [lastMessages]);

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

            // แสดงผลการสนทนาลำดับถัดไป
            const nextChat = Object.keys(updatedChats[currentChat.type])[0];
            setCurrentChat({ type: currentChat.type, id: Number(nextChat) });

            return updatedChats;
          });
        }
      }, 60000); // 1 นาที

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

      // แสดงผลการสนทนาลำดับถัดไป
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

  const handleEditStatus = () => {
    setEditingStatus(true);
  };

  const handleChangeStatus = (e) => {
    setSelectedStatus(e.target.value);
  };

  const handleConfirmStatusChange = () => {
    setConfirmStatusChange(true);
  };

  const handleStatusChangeConfirm = () => {
    console.log("Status:", selectedStatus);
    setShowOrderModal(false);
    setEditingStatus(false);
    setConfirmStatusChange(false);
  };

  const handleStatusChangeCancel = () => {
    setShowOrderModal(false);
    setEditingStatus(false);
    setConfirmStatusChange(false);
  };

  const [currentOrder, setCurrentOrder] = useState(null);

  const currentMessages = chats[currentChat.type]?.[currentChat.id] || [];
  const currentProfile = profileData[currentChat.type]?.[currentChat.id];

  return (
    <div className="flex flex-1 overflow-hidden h-full">
      {/* Sidebar */}
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
      {/* Chat Area */}
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
          {/* เพิ่มส่วนนี้สำหรับการจำลองการส่งข้อความ */}
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
