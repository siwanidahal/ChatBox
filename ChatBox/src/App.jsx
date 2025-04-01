import { useState } from "react";
import {
  FaWhatsapp,
  FaPhoneAlt,
  FaPaperclip,
  FaMicrophone,
  FaVideo,
  FaSearch,
  FaSmile,
} from "react-icons/fa";
import { MdMessage, MdNewReleases, MdSend } from "react-icons/md";
import { AiOutlineUser } from "react-icons/ai";
const ME = "sahil";
const messsages = [
  {
    messageId: "1",
    sender: "Tezz",
    receiver: "sahil",
    messsages: [
      {
        sender: "Tezz",
        message: "hello there",
        time: "Tue Apr 01 2025 15:21:21 GMT+0545 (Nepal Time)",
      },
    ],
  },
  {
    messageId: "2",
    sender: "jhon",
    receiver: "raj",
    messsages: [
      {
        sender: "raj",
        message: "all right",
        time: "Tue Apr 01 2025 16:21:21 GMT+0545 (Nepal Time)",
      },
      {
        sender: "jhon",
        message: "yes",
        time: "Tue Apr 01 2025 16:22:21 GMT+0545 (Nepal Time)",
      },
    ],
  },
];
export default function WhatsAppUI() {
  const [activeChat, setActiveChat] = useState(null);

  const handleChatClick = (contactName) => {
    setActiveChat(contactName);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-1/4 bg-white p-4 border-l">
        {/* Navbar */}
        <div className="flex items-center justify-between p-2 border-b border-green-500">
          <div className="flex items-center space-x-2">
            <FaWhatsapp className="text-green-500 text-3xl" />
            <span className="text-xl font-semibold">WhatsApp</span>
          </div>
          <div className="flex space-x-3">
            <FaPhoneAlt className="text-gray-500 text-l cursor-pointer" />
            <MdMessage className="text-gray-500 text-xl cursor-pointer" />
            <AiOutlineUser className="text-gray-500 text-xl cursor-pointer" />
          </div>
        </div>

        {/* Search Bar */}
        <div className="p-2">
          <div className="flex items-center bg-gray-200 p-2 rounded-md">
            <FaSearch className="mr-2" />
            <input
              type="text"
              placeholder="Search or start a new chat"
              className="bg-transparent outline-none w-full"
            />
          </div>
        </div>

        {/* Chat List */}

        <div className="flex-1 overflow-auto">
          {messsages.map((message) => {
            const lastTime = time(message.messsages.at(0).time);

            return (
              <div
                key={message.messageId}
                className={`p-2 cursor-pointer hover:bg-gray-200 flex justify-between ${
                  activeChat === ME ? "bg-white" : ""
                }`}
                onClick={() => handleChatClick(message)}
              >
                <div>
                  <span className="text-lg font-medium flex items-center gap-2">
                    <AiOutlineUser />
                    {message.sender === ME ? message.receiver : message.sender}
                  </span>
                  <p className="text-sm text-gray-500">
                    {message?.messsages?.at(0)?.message}
                  </p>
                </div>
                <time className="text-xs text-gray-400">{lastTime}</time>
              </div>
            );
          })}
        </div>
      </div>

      {/* ChatWindow */}
      <div className="flex-1 flex flex-col">
        {activeChat && (
          <div className="p-4 bg-white flex items-center justify-between border-b">
            <div className="flex items-center space-x-3">
              <AiOutlineUser className="text-gray-500 text-2xl" />

              <span className="text-lg font-medium">
                {activeChat.sender === ME
                  ? activeChat.receiver
                  : activeChat.sender}
              </span>
            </div>
            <div className="flex space-x-4">
              <FaVideo className="text-gray-500 text-xl cursor-pointer" />
              <FaPhoneAlt className="text-gray-500 text-xl cursor-pointer" />
              <FaSearch className="text-gray-500 text-xl cursor-pointer" />
            </div>
          </div>
        )}

        <div className="flex-1 bg-gray-100 p-4 overflow-auto">
          {!activeChat ? (
            <div className="flex items-center justify-center  p-70 font-bold text-4xl">
              <p className="">Welcome </p>
            </div>
          ) : (
            activeChat?.messsages.map((chat, index) => {
              return (
                <div key={index} className="flex justify-start mb-4">
                  <div className="bg-white py-2 px-6 rounded-lg max-w-xs">
                    <p>{chat.message}</p>
                    <p className="text-xs text-gray-500 text-right mt-1">
                      {time(chat.time)}
                    </p>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {activeChat && (
          <div className="p-4 bg-white border-t flex items-center">
            <FaPaperclip className="text-gray-500 text-xl cursor-pointer mr-3" />
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Type a message..."
                className="w-full p-2 border rounded-md"
              />
              <div className="absolute right-2 top-2 flex space-x-2">
                <FaMicrophone className="text-gray-500 text-lg cursor-pointer" />
                <FaSmile className="text-gray-500 text-lg cursor-pointer" />
              </div>
            </div>
            <MdSend className="text-gray-500 text-xl cursor-pointer ml-3" />
          </div>
        )}
      </div>
    </div>
  );
}
const time = (newDate) => {
const tt = new Date(newDate)
  return new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(tt);
};
