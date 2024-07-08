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
import InputSearch from "../components/InputSearch";

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
  const [selectedChatType, setSelectedChatType] = useState("rider");
  const [isSwapped, setIsSwapped] = useState(false);
  const [search, setSearch] = useState("");
  const messagesEndRef = useRef(null);
  const dropdownRef = useRef(null);
  const inputRef = useRef(null); // เพิ่ม ref สำหรับ input field

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

  useEffect(() => {
    const lastMessage = lastMessages[currentChat.type]?.[currentChat.id];
    if (lastMessage?.sender !== "admin" && userInteracted) {
      if (!notificationSound.paused) {
        notificationSound.pause();
        notificationSound.currentTime = 0;
      }
      notificationSound.play().catch((error) => {
        // console.error("Audio play error: ", error);
      });
    }
  }, [lastMessages, currentChat, userInteracted]);

  useEffect(() => {
    if (lastAdminMessageTime) {
      const timer = setTimeout(() => {
        const lastMessage =
          chats[currentChat.type]?.[currentChat.id]?.slice(-1)[0];
        if (lastMessage?.sender === "admin") {
          // console.log("ลบการสนทนา เนื่องจากไม่มีการตอบกลับ");
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

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }

    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdown]);

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
    inputRef.current.focus(); // โฟกัสไปที่ input field หลังจากคลิก suggestion
  };

  const handleEndChat = () => {
    setShowModal(true);
    setShowDropdown(false); // ปิด dropdown เมื่อคลิกปุ่ม
  };

  const confirmEndChat = () => {
    // console.log("ลบการสนทนา");
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

  // const handleChatTypeChange = (type) => {
  //   const nextChatId = Object.keys(chats[type])[0];
  //   setCurrentChat({ type: type, id: Number(nextChatId) });
  //   setSelectedChatType(type);
  // };

  const handleChatTypeChange = (type) => {
    const nextChatId = Object.keys(chats[type])[0];
    setCurrentChat({ type: type, id: Number(nextChatId) });
    setSelectedChatType(type);
    setIsSwapped(type === "customer");
  };

  const handleShowOrder = (id) => {
    setCurrentOrder(orderData[id]);
    setShowOrderModal(true);
    setShowDropdown(false); // ปิด dropdown เมื่อคลิกปุ่ม
  };

  const closeOrderModal = () => {
    setShowOrderModal(false);
  };

  const handleStatusChangeConfirm = () => {
    // console.log("Status:", selectedStatus);
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
    // console.log(orderData);
    setShowOrderModal(false);
    setEditingStatus(false);
    setConfirmStatusChange(false);
  };

  const handleStatusChangeCancel = () => {
    setShowOrderModal(false);
    setEditingStatus(false);
    setConfirmStatusChange(false);
  };

  const hasUnreadRider = Object.values(lastMessages.rider).some(
    (msg) => msg.sender !== "admin"
  );
  const hasUnreadCustomer = Object.values(lastMessages.customer).some(
    (msg) => msg.sender !== "admin"
  );

  const currentMessages = chats[currentChat.type]?.[currentChat.id] || [];
  const currentProfile = profileData[currentChat.type]?.[currentChat.id];

  const filterChats = (chats, searchTerm) => {
    return Object.entries(chats).reduce((acc, [id, chat]) => {
      const profile = profileData[currentChat.type][id];
      if (
        id.includes(searchTerm) ||
        profile.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        profile.lastName.toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        acc[id] = chat;
      }
      return acc;
    }, {});
  };
  const filteredChats = filterChats(chats[currentChat.type] || {}, search);
  const handleOnChange = (event) => {
    setSearch(event.target.value);
  };
  return (
    <>
      {/* New version */}
      <div className="flex flex-1 overflow-hidden h-full w-full pl-[40px] pr-[40px] pt-[60px] pb-[20px]">
        <div className="mx-auto relative z-40 h-full w-full">
          {/* <div className="w-[100%] flex justify-between absolute top-[-45px] z-20">
            <div className="flex space-x-2">
              {!isSwapped ? (
                <>
                  <div
                    role="button"
                    className={`text-white h-[60px] w-[100px] flex justify-center items-center rounded-tr-2xl text-[18px] ${
                      selectedChatType === "rider"
                        ? "bg-[#FF004D] hover:bg-[#cc0040]"
                        : "bg-[#1D2B53] hover:bg-[#161e41]"
                    }`}
                    onClick={() => handleChatTypeChange("rider")}
                  >
                    Rider
                  </div>
                  <div
                    role="button"
                    className={`text-white h-[60px] w-[100px] flex justify-center items-center rounded-tl-2xl text-[18px] ${
                      selectedChatType === "customer"
                        ? "bg-[#FF004D] hover:bg-[#cc0040]"
                        : "bg-[#1D2B53] hover:bg-[#161e41]"
                    }`}
                    onClick={() => handleChatTypeChange("customer")}
                  >
                    Customer
                  </div>
                </>
              ) : (
                <>
                  <div
                    role="button"
                    className={`text-white h-[60px] w-[100px] flex justify-center items-center rounded-tr-2xl text-[18px] ${
                      selectedChatType === "customer"
                        ? "bg-[#FF004D] hover:bg-[#cc0040]"
                        : "bg-[#1D2B53] hover:bg-[#161e41]"
                    }`}
                    onClick={() => handleChatTypeChange("customer")}
                  >
                    Customer
                  </div>
                  <div
                    role="button"
                    className={`text-white h-[60px] w-[100px] flex justify-center items-center rounded-tl-2xl text-[18px] ${
                      selectedChatType === "rider"
                        ? "bg-[#FF004D] hover:bg-[#cc0040]"
                        : "bg-[#1D2B53] hover:bg-[#161e41]"
                    }`}
                    onClick={() => handleChatTypeChange("rider")}
                  >
                    Rider
                  </div>
                </>
              )}
            </div>
            <div className="text-white h-[44px] w-[15%] bg-[#FF004D] flex justify-center items-center rounded-2xl text-[18px]  ">
              <InputSearch
                placeholder="Search"
                onChange={handleOnChange}
                name="search"
                value={search}
                rounded="xxlLeft"
              />
            </div>
          </div> */}

          <div className="w-[100%] flex justify-between absolute top-[-45px] z-20">
            <div className="flex">
              {!isSwapped ? (
                <>
                  <div
                    role="button"
                    className={`text-white h-[60px] w-[100px] flex justify-center items-center rounded-tr-2xl text-[18px] ${
                      selectedChatType === "rider"
                        ? "bg-[#FF004D] hover:bg-[#cc0040]"
                        : "bg-[#1D2B53] hover:bg-[#161e41]"
                    }`}
                    onClick={() => handleChatTypeChange("rider")}
                  >
                    Rider
                  </div>
                  <div
                    role="button"
                    className={`text-white h-[60px] w-[100px] flex justify-center items-center rounded-tl-2xl text-[18px] ${
                      selectedChatType === "customer"
                        ? "bg-[#FF004D] hover:bg-[#cc0040]"
                        : "bg-[#1D2B53] hover:bg-[#161e41]"
                    } -ml-px`}
                    onClick={() => handleChatTypeChange("customer")}
                  >
                    Customer
                  </div>
                </>
              ) : (
                <>
                  <div
                    role="button"
                    className={`text-white h-[60px] w-[100px] flex justify-center items-center rounded-tr-2xl text-[18px] ${
                      selectedChatType === "customer"
                        ? "bg-[#FF004D] hover:bg-[#cc0040]"
                        : "bg-[#1D2B53] hover:bg-[#161e41]"
                    }`}
                    onClick={() => handleChatTypeChange("customer")}
                  >
                    Customer
                  </div>
                  <div
                    role="button"
                    className={`text-white h-[60px] w-[100px] flex justify-center items-center rounded-tl-2xl text-[18px] ${
                      selectedChatType === "rider"
                        ? "bg-[#FF004D] hover:bg-[#cc0040]"
                        : "bg-[#1D2B53] hover:bg-[#161e41]"
                    } -ml-px`}
                    onClick={() => handleChatTypeChange("rider")}
                  >
                    Rider
                  </div>
                </>
              )}
              <div className="text-white h-[44px] w-[280px] flex justify-center items-center rounded-2xl text-[18px] -ml-px">
                <InputSearch
                  placeholder="Search"
                  onChange={handleOnChange}
                  name="search"
                  value={search}
                  rounded="xxlLeft"
                />
              </div>
            </div>
          </div>

          {/* Contact list */}
          <div className="rounded-b-2xl rounded-tr-2xl mx-auto h-full w-full flex flex-grow relative z-40 bg-gradient-to-br from-[#FF004D] from-10% to-[#1D2B53] to-85% p-[2%] gap-4">
            <div className="w-[25%] bg-[#1D2B53] rounded-xl p-2 overflow-y-auto">
              {Object.keys(filteredChats)
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
                        currentChat.id === Number(id) ? "bg-[#384E8D]" : ""
                      }`}
                      onClick={() =>
                        setCurrentChat({
                          type: currentChat.type,
                          id: Number(id),
                        })
                      }
                    >
                      <div className="flex items-center">
                        <img
                          src={profileData[currentChat.type][id].profileImg}
                          alt="Profile"
                          className="w-16 h-16 rounded-xl mr-4"
                        />
                        <div className="flex flex-col justify-center h-full">
                          <div className="flex-1 flex items-center truncate text-white">{`${
                            profileData[currentChat.type][id].firstName
                          } ${
                            profileData[currentChat.type][id].lastName
                          }`}</div>
                          <div className="text-xs text-white flex-1 overflow-hidden line-clamp-2 ">
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

                        <div className="text-xs text-white min-w-[60px]">
                          {new Date(lastMessage.timestamp).toLocaleTimeString(
                            [],
                            {
                              hour: "2-digit",
                              minute: "2-digit",
                            }
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>

            {/* chat */}
            <div className="w-[75%] bg-gradient-to-br from-[#1D2B53] from-10% to-[#FF004D]  to-70%  rounded-xl p-4 flex flex-col h-full">
              <div className="h-[10%] flex items-center">
                <img
                  src={currentProfile?.profileImg}
                  alt="Profile"
                  className="max-h-16 max-w-16 min-h-16 min-w-16 rounded-lg border-white border-[2px] ml-4 object-cover"
                />
                <div className="ml-4">
                  <div className="text-white font-semibold">
                    ID: {currentChat.id}
                  </div>
                  <div className="text-white">
                    {currentProfile?.firstName} {currentProfile?.lastName}
                  </div>
                </div>
                <div className="flex ml-auto">
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
                          className="block px-4 py-2 text-left text-gray-800 hover:bg-blue-500 hover:text-white w-full  items-center"
                          onClick={() => handleShowOrder(currentChat.id)}
                        >
                          <PencilSquareIcon className="h-5 w-5 mr-2" />
                          Order Status
                        </button>
                        <button
                          className="block px-4 py-2 text-left text-gray-800 hover:bg-blue-500 hover:text-white w-full  items-center"
                          onClick={handleEndChat}
                        >
                          <ChatBubbleLeftEllipsisIcon className="h-5 w-5 mr-2" />
                          End Chat
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="border-white border-[1px] mt-1 mb-2"></div>
              <div className="flex-1 p-4 overflow-y-auto">
                {currentMessages.map((message, index) => (
                  <div
                    key={index}
                    className={`mb-2 flex ${
                      message.sender === "admin"
                        ? "justify-end"
                        : "justify-start"
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
                        className="w-16 h-16 rounded-xl mr-2 self-start bg-pink-200"
                      />
                    )}

                    <div
                      className={`inline-block p-2 max-w-lg break-words ${
                        message.sender === "admin"
                          ? "rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl bg-white text-black"
                          : "rounded-tl-2xl rounded-tr-2xl rounded-br-2xl bg-white text-black"
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
                    ref={inputRef} // ตั้งค่า ref สำหรับ input field
                    type="text"
                    className="flex-1 p-2 border rounded-lg"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="พิมพ์ข้อความ..."
                    onFocus={(e) => {
                      e.target.select(); // เลือกข้อความทั้งหมดเมื่อโฟกัสที่ input field
                    }}
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
                  {/* <SimulateMessageInput onSimulateSend={handleSimulateSend} /> */}
                </div>
              </div>
            </div>
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
    </>
  );
}
