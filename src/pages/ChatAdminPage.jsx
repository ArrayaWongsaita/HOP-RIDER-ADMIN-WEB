import { useState, useEffect, useRef } from "react";
import {
  PencilSquareIcon,
  ChatBubbleLeftEllipsisIcon,
} from "@heroicons/react/24/outline";
import EndChatModal from "../features/chatAdmin/components/EndChatModal";
import OrderModal from "../features/chatAdmin/components/OrderModal";
import {
  orderDataMock,
  mockChats,
} from "../features/chatAdmin/constants/mockData";
import InputSearch from "../components/InputSearch";
import CommonButton from "../components/CommonButton";
import { VscSend } from "react-icons/vsc";
import useSocket from "../hooks/socketIoHook";
import adminApi from "../apis/adminApi";
import { IconPersonImg } from "../icons/IconPersonImg";
import { ImageRider } from "../icons/IconImageRider";

const role = "ADMIN";
let isSetCurrentChatCalled = false;

export default function ChatAdminPage() {
  const [currentChat, setCurrentChat] = useState({ type: "rider", id: 1 });
  const [inputValue, setInputValue] = useState("");
  const [chats, setChats] = useState(mockChats);
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
  const inputRef = useRef(null);
  const notificationSoundRef = useRef(new Audio("/sound/notiChat2.mp3"));

  const { socket } = useSocket();
  const [chatInfo, setChatInfo] = useState([]);
  const [chatWith, setChatWith] = useState("User");

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
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatInfo]);
  useEffect(() => {
    if (socket) {
      const handleNewMessage = (newMessage) => {
        setChatInfo((prevChatInfo) => {
          return prevChatInfo.map((item) => {
            if (item.id === newMessage.chatId) {
              return {
                ...item,
                messages: [...(item.messages || []), newMessage],
              };
            }
            return item;
          });
        });
        scrollToBottom();
      };

      const handleNewChatToAdmin = (newChat) => {
        setChatInfo((prevChatInfo) => {
          const existingChatIndex = prevChatInfo.findIndex(
            (chat) => chat.id === newChat.id
          );
          if (existingChatIndex !== -1) {
            // Update existing chat
            const updatedChatInfo = [...prevChatInfo];
            updatedChatInfo[existingChatIndex] = {
              ...prevChatInfo[existingChatIndex],
              ...newChat,
              messages: [
                ...(prevChatInfo[existingChatIndex].messages || []),
                ...(newChat.messages || []),
              ],
            };
            return updatedChatInfo;
          }
          // Add new chat if it doesn't exist
          return [newChat, ...prevChatInfo];
        });
      };
      socket.on("newChatToAdmin", handleNewChatToAdmin);
      socket.on("newAdminMessage", handleNewMessage);
      return () => {
        socket.off("newAdminMessage", handleNewMessage);
        socket.off("newChatToAdmin", handleNewChatToAdmin);
      };
    }
  }, [socket]);

  useEffect(() => {
    const getAllChatInfo = async () => {
      try {
        const res = await adminApi.fetchAllChatAdminInfo();
        setChatInfo(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getAllChatInfo();
  }, []);

  useEffect(() => {
    const lastMessage = lastMessages[currentChat.type]?.[currentChat.id];
    if (lastMessage?.sender !== "admin" && userInteracted) {
      if (!notificationSoundRef.current.paused) {
        notificationSoundRef.current.pause();
        notificationSoundRef.current.currentTime = 0;
      }
      notificationSoundRef.current.play().catch((error) => {
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
      socket.emit("sendMessageAdmin", {
        chatId: currentChat.id,
        senderId: 1,
        content: inputValue,
        senderRole: "ADMIN",
      });
      setInputValue("");
      scrollToBottom();
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setInputValue(suggestion);
    inputRef.current.focus();
  };

  const handleEndChat = () => {
    setShowModal(true);
    setShowDropdown(false);
  };

  const confirmEndChat = () => {
    socket.emit("deleteChatHistory", { chatId: currentChat.id });
    isSetCurrentChatCalled = false;
    setChatInfo((prevChats) =>
      prevChats.filter((item) => item.id !== currentChat.id)
    );
    setShowModal(false);
  };

  const cancelEndChat = () => {
    setShowModal(false);
  };

  const handleChatTypeChange = (type) => {
    const nextChatId = Object.keys(chats[type])[0];
    setCurrentChat({ type: type, id: Number(nextChatId) });
    setSelectedChatType(type);
    isSetCurrentChatCalled = false;
    setIsSwapped(type === "customer");
  };

  const handleShowOrder = async () => {
    try {
      const data = chatInfo.filter((item) => item.id === currentChat.id)[0];
      if (data?.rider) {
        const res = await adminApi.getOrderInfo("RIDER", data.rider.id);
        const newOrder = res.data;
        setCurrentOrder(newOrder);
        setShowOrderModal(true);
      }
      if (data?.user) {
        const res = await adminApi.getOrderInfo("USER", data.user.id);
        const newOrder = res.data;
        setCurrentOrder(newOrder);
        setShowOrderModal(true);
      }
      setShowDropdown(false);
    } catch (error) {
      console.log("get route error");
    }
  };

  const closeOrderModal = () => {
    setShowOrderModal(false);
  };

  const handleStatusChangeConfirm = async () => {
    if (selectedStatus === "FINISHED" || selectedStatus === "CANCELED") {
      socket.emit("finishRoute", currentOrder);
    } else {
      socket.emit("updateRouteStatus", {
        routeId: currentOrder.id,
        status: selectedStatus,
      });
    }
    setShowOrderModal(false);
    setEditingStatus(false);
    setConfirmStatusChange(false);
  };

  const handleStatusChangeCancel = () => {
    setShowOrderModal(false);
    setEditingStatus(false);
    setConfirmStatusChange(false);
  };

  const handleOnChange = (event) => {
    setSearch(event.target.value);
  };

  return (
    <>
      {/* New version */}
      <div className="flex flex-1 overflow-hidden h-full w-full pl-[40px] pr-[40px] pt-[60px] pb-[20px]">
        <div className="mx-auto relative z-40 h-full w-full">
          <div className="w-[100%] flex justify-between absolute top-[-45px] z-20">
            <div className="flex">
              {!isSwapped ? (
                <>
                  <div
                    role="button"
                    className={`text-white h-[60px] w-[100px] flex justify-center items-center rounded-t-2xl text-[18px] ${
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
                    className={`text-white h-[60px] w-[100px] flex justify-center items-center rounded-t-2xl text-[18px] ${
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
                    className={`text-white h-[60px] w-[100px] flex justify-center items-center rounded-t-2xl text-[18px] ${
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
                    className={`text-white h-[60px] w-[100px] flex justify-center items-center rounded-t-2xl text-[18px] ${
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
            </div>
            <div className="text-white h-[44px] w-full flex  justify-end  items-center rounded-2xl text-[18px] -ml-px">
              <InputSearch
                placeholder="Search"
                onChange={handleOnChange}
                name="search"
                value={search}
                rounded="xxlLeft"
              />
            </div>
          </div>

          {/* Contact list */}
          <div className="rounded-b-2xl rounded-tr-2xl mx-auto h-full w-full flex flex-grow relative z-40 bg-gradient-to-br from-[#FF004D] from-10% to-[#1D2B53] to-85% p-[2%] gap-4">
            <div className="w-[25%] bg-[#1D2B53] rounded-xl p-2 overflow-y-auto scrollbar-hide">
              {chatInfo
                .filter((item) =>
                  selectedChatType === "customer" ? item.userId : item.riderId
                )
                .map((item, index) => {
                  let lastMessage = [];
                  if (item?.messages)
                    lastMessage = item?.messages[item?.messages?.length - 1];
                  if (index === 0 && !isSetCurrentChatCalled) {
                    setCurrentChat({
                      profileImage:
                        item?.rider?.profileImage || null,
                      type: currentChat.type,
                      id: Number(item.id),
                      firstName:
                        item?.rider?.firstName || item?.user?.firstName,
                      lastName: item?.rider?.lastName || item?.user?.lastName,
                    });
                    isSetCurrentChatCalled = true;
                  }
                  return (
                    <div
                      key={item.id}
                      className={`flex justify-between p-4 cursor-pointer h-[90px] ${
                        currentChat.id === Number(item.id) ? "bg-[#384E8D]" : ""
                      }`}
                      onClick={() =>
                        setCurrentChat({
                          profileImage:
                            item?.rider?.profileImage || null,
                          type: currentChat.type,
                          id: Number(item.id),
                          firstName:
                            item?.rider?.firstName || item?.user?.firstName,
                          lastName:
                            item?.rider?.lastName || item?.user?.lastName,
                        })
                      }
                    >
                      <div className="flex items-center">
                      {item?.rider?.profileImage ? (<img
                          src={
                            item?.rider?.profileImage 
                          }
                          alt="Profile"
                          className="w-16 h-16 rounded-xl mr-4"
                        />):
                      (<div className="flex h-16 w-16 items-center justify-center border-[#ff004d] border-2 rounded-xl ml-4 mr-2">
                      <IconPersonImg />
                    </div>)}
                        <div className="flex flex-col justify-center h-full">
                          <div className="flex-1 flex items-center truncate text-white">{`${
                            item?.rider?.firstName || item?.user?.firstName
                          } ${
                            item?.rider?.lastName || item?.user?.lastName
                          }`}</div>
                          <div className="text-xs text-white flex-1 overflow-hidden line-clamp-2 w-[120px] ">
                            {`${
                              lastMessage?.senderRole === "ADMIN"
                                ? "Admin"
                                : currentChat.type
                            }: ${lastMessage?.content || ""}`}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className="text-xs text-white min-w-[60px]"></div>
                      </div>
                    </div>
                  );
                })}
            </div>

            {/* chat */}
            <div className="w-[75%] bg-gradient-to-br from-[#1D2B53] from-10% to-[#FF004D]  to-70%  rounded-xl p-4 flex flex-col h-full">
              <div className="h-[10%] flex items-center">
                <div className="w-16 h-16 rounded-xl mr-2 self-start  flex items-center justify-center">
                  {currentChat?.profileImage ? (
                    <img
                      src={currentChat?.profileImage}
                      alt="Profile"
                      className="w-16 h-16 rounded-xl ml-4"
                    />
                  ) : currentChat.type === "rider" ? (
                    <div className="flex h-16 w-16 items-center justify-center border-[#ff004d] border-2 rounded-xl ml-4">
                      <ImageRider />
                    </div>
                  ) : (
                    <div className="flex h-16 w-16 items-center justify-center border-[#ff004d] border-2 rounded-xl ml-4">
                      <IconPersonImg />
                    </div>
                  )}
                </div>
                <div className="ml-4">
                  <div className="text-white font-semibold">
                    CHAT ID: {currentChat.id}
                  </div>
                  <div className="text-white">
                    {currentChat?.firstName} {currentChat?.lastName}
                  </div>
                </div>
                <div className="flex ml-auto">
                  <div className="relative" ref={dropdownRef}>
                    <CommonButton
                      onClick={() => setShowDropdown(!showDropdown)}
                    >
                      Manage
                    </CommonButton>
                    {showDropdown && (
                      <div className="absolute right-0 mt-1 py-2 w-[200px] bg-[#1d2b53] rounded-lg shadow-xl z-20 items-start justify-start flex flex-col ">
                        <button
                          className="flex px-4 py-2 text-left  text-white hover:bg-[#384E8D] hover:text-white w-full  items-center"
                          onClick={() => handleShowOrder(currentChat.id)}
                        >
                          <PencilSquareIcon className="h-5 w-5 mr-2" />
                          Order Status
                        </button>
                        <button
                          className="flex px-4 py-2 text-left  text-white hover:bg-[#384E8D] hover:text-white w-full  items-center"
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

              {/* เส้นใต้ profile */}
              <div className="border-white border-[1px] mt-1 mb-2"></div>

              <div className="flex-1 p-4 overflow-y-auto scrollbar-hide">
                {chatInfo?.length > 0 &&
                  chatInfo[
                    chatInfo.findIndex((item) => item?.id === currentChat?.id)
                  ]?.messages?.map((msg, index) => (
                    <div
                      key={index}
                      className={`flex ${
                        msg.senderRole === role
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      {msg.senderRole === "TYPING" ? (
                        <div className="bg-white text-2xl p-4 m-3 rounded-tl-2xl rounded-tr-2xl rounded-br-2xl flex gap-4">
                          <h1 className="text-[50px] text-black flex items-center px-2">
                            <span className="animate-wave-1 inline-block pr-1">
                              .
                            </span>
                            <span className="animate-wave-2 inline-block pr-1">
                              .
                            </span>
                            <span className="animate-wave-3 inline-block pr-1">
                              .
                            </span>
                          </h1>
                        </div>
                      ) : (
                        <div
                          ref={messagesEndRef}
                          className={`bg-white text-2xl p-4 m-3 rounded-tl-2xl rounded-tr-2xl flex gap-4 ${
                            msg.senderRole === role
                              ? "rounded-bl-2xl text-torchRed"
                              : "rounded-br-2xl"
                          }`}
                        >
                          <h1>
                            {msg.senderRole === role ? "You:" : `${chatWith}:`}
                          </h1>{" "}
                          {msg.content}
                        </div>
                      )}
                    </div>
                  ))}
                <div ref={messagesEndRef} />
              </div>

              {/* input message */}
              <div className="relative p-4  border-t">
                <div className="flex gap-2 mb-2 overflow-x-auto scrollbar-hide">
                  {suggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      className="px-4 py-2 bg-[#1D2B53] text-white rounded-full whitespace-nowrap"
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <input
                    ref={inputRef}
                    type="text"
                    className="flex-1 p-2 border rounded-lg"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="พิมพ์ข้อความ..."
                    onFocus={(e) => {
                      e.target.select();
                    }}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        handleSend();
                      }
                    }}
                  />

                  <CommonButton
                    onClick={handleSend}
                    width="send"
                    height="send"
                    bg="torchRed"
                  >
                    <VscSend />
                  </CommonButton>
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
