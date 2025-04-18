
import { useEffect, useState } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { FaSearch, FaWhatsapp } from "react-icons/fa";
import api from "../api";
import time from "../liv";
import { IoReorderThreeOutline } from "react-icons/io5";

const SideBar = ({ handleActiveChatId, activeChatId, setMe,me }) => {
  const [search, setSearch] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [chatRooms, setChatRooms] = useState([]);

  async function getData() {
    const data = await api.get("/chat-rooms");
    console.log(data.data.chatRooms);
    if (data?.data) {
      setMe(data?.data?.me);
      if (data.data?.chatRooms) {setChatRooms(data.data.chatRooms);}
    }
    console.log(chatRooms);
  }

  useEffect(() => {
    getData();
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  return (
    <div
      className={`transition-all duration-300 ease-in-out ${
        sidebarOpen ? "w-[300px]" : "w-[60px]"
      } bg-white flex flex-col`}
    >
      {/* Sidebar Header */}
      <div className="flex justify-between items-center p-3 bg-green-600 text-white">
        <div className="flex items-center gap-2">
          <FaWhatsapp className="text-2xl" />
          {sidebarOpen && (
            <span className="text-lg font-semibold">WhatsApp</span>
          )}
        </div>
        <IoReorderThreeOutline
          className="text-xl cursor-pointer"
          onClick={toggleSidebar}
          title="Toggle Sidebar"
        />
      </div>

      {/* Search Bar */}
      {sidebarOpen && (
        <div className="p-5 ">
          <div className="flex items-center bg-gray-100 rounded-md px-2 py-1">
            <FaSearch className="text-gray-500 mr-2" />
            <input
              className=" outline-none w-full"
              placeholder="Search or start new chat"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      )}

      {/* Chat list */}
      <div className="overflow-y-auto flex-1">
         { chatRooms.length > 0 &&
          chatRooms.map((chatRoom) => {
            const frd =
              chatRoom?.participants?.length <= 2 &&
              chatRoom.participants.filter((p) => p._id !== me).at(0);
            console.log(frd);
            return (
              <div
                key={chatRoom._id}
                className={`p-3 cursor-pointer flex justify-between ${
                  activeChatId?._id === chatRoom._id ? "bg-green-200" : ""
                }`}
                onClick={() => handleActiveChatId(chatRoom)}
              >
                {sidebarOpen ? (
                  <>
                    <div>
                      <div className="flex flex-col">
                        <div
                          className="flex items-center gap-2 font-semibold cursor-pointer"
                          onClick={() => handleActiveChatId(chatRoom)}
                        >
                          <AiOutlineUser className="text-lg align-middle" />
                          <span className="align-middle">
                            {chatRoom.isGroup
                              ? chatRoom?.name
                              : frd?.username || "User"}
                          </span>
                        </div>
                        <div className="text-sm text-gray-500 pl-7">
                          {chatRoom?.lastMessage?.content}
                        </div>
                      </div>
                    </div>
                    <div className="text-xs text-gray-400">
                      {time(chatRoom.lastMessage.timestamp)}
                    </div>
                  </>
                ) : (
                  <AiOutlineUser className="mx-auto" />
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default SideBar;



