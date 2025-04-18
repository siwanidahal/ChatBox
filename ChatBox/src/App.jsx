
import { useState } from "react";
import {
  FaMicrophone,
  FaPaperclip,
  FaPhoneAlt,
  FaSearch,
  FaSmile,
  FaVideo,
  FaWhatsapp,
} from "react-icons/fa";
import { MdSend } from "react-icons/md";
import { AiOutlineUser } from "react-icons/ai";

import useCheckAuth from "./hooks/useCheckToken";
import { IoReorderThreeOutline } from "react-icons/io5";
import time from "./liv";
import SideBar from "./component/Sidebar";
import api from "./api";

export default function WhatsAppUI() {
  const [activeChat, setActiveChatId] = useState(null);
  const [messageInput, setMessageInput] = useState("");
  const [ME, setMe] = useState(null);

  useCheckAuth();

  const handleActiveChatId = async (chatRoom) => {
    try {
      const response = await api.get(`/chat-rooms/${chatRoom._id}/messages`);
      const frd =
        chatRoom?.participants?.length <= 2
          ? chatRoom.participants.filter((p) => p._id !== ME).at(0)?.username
          : chatRoom?.name;
      setActiveChatId({ name: frd, data: response?.data || [] });
    } catch (error) {
      console.log("Fetching error", error);
    }
  };

  const handleSendMessage = async () => {
    if (messageInput.trim() === "" || !activeChat) return;

    try {
      const newMessage = {
        content: messageInput,
        timestamp: new Date().toISOString(),
        sender: { _id: ME }, // Assuming ME is the current user's ID
      };

      // Optimistically update UI
      setActiveChatId((prev) => ({
        ...prev,
        data: [...prev.data, newMessage],
      }));

      setMessageInput("");

      await api.post(`/chat-rooms/${activeChat._id || activeChat.chatRoomId}/messages`, {
        content: messageInput,
      });

    } catch (error) {
      console.log("Message Failed", error);

    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <SideBar handleActiveChatId={handleActiveChatId} activeChatId={activeChat} me={ME} setMe={setMe} />

      {/* Chat Area */}
      <div className=" flex-1 flex flex-col">
        {/* Chat Header */}
        {activeChat && (
          <div className="flex justify-between items-center p-4 bg-white border-b">
            <div className="flex items-center gap-3">
              <AiOutlineUser className="text-gray-600 text-xl" />
              <span className="text-lg font-medium">
                {activeChat?.name}
              </span>
            </div>
            <div className="flex gap-4">
              <FaVideo className="text-gray-500 cursor-pointer" />
              <FaPhoneAlt className="text-gray-500 cursor-pointer" />
              <FaSearch className="text-gray-500 cursor-pointer" />
            </div>
          </div>
        )}

        {/* Chat Messages */}
        <div className="flex-1 p-4 overflow-y-auto bg-gray-100">
          {!activeChat ? (
            <div className="flex items-center justify-center h-full text-xl text-gray-400">
              Select a chat to start messaging
            </div>
          ) : (
            activeChat?.data?.map((msg, i) => {
              const isSender = msg.sender._id === ME;
              return (
                <div
                  key={i}
                  className={`flex mb-2 ${isSender ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`rounded-lg px-4 py-2 max-w-sm text-sm ${
                      isSender ? "bg-green-300 text-black" : "bg-white text-black"
                    }`}
                  >
                    <p>{msg.content}</p>
                    <p className="text-right text-xs mt-1 text-gray-500">
                      {time(msg.timestamp)}
                    </p>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Message Input */}
        {activeChat && (
          <div className="p-3 bg-white flex items-center gap-2 border-t">
            <FaPaperclip className="text-gray-500 cursor-pointer" />
            <input
              className="flex-1 border rounded-full px-4 py-2 outline-none"
              placeholder="Type a message..."
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            />
            <FaMicrophone className="text-gray-500 cursor-pointer" />
            <FaSmile className="text-gray-500 cursor-pointer" />
            <MdSend
              className="text-green-600 text-xl cursor-pointer"
              onClick={handleSendMessage}
            />
          </div>
        )}
      </div>
    </div>
  );
}