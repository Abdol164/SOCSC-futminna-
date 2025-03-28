import React, { useState, useEffect, useRef } from "react";
import { CiSearch } from "react-icons/ci";
import { IoMdNotificationsOutline } from "react-icons/io";

interface NavbarProps {
  activePage: string;
  profileImageUrl: string;
}

const Navbar: React.FC<NavbarProps> = ({ activePage, profileImageUrl }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showSearch, setShowSearch] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setIsVisible(false); // Hide on scroll down
      } else {
        setIsVisible(true); // Show on scroll up
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Close when clicking outside or pressing "Escape"
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target as Node)
      ) {
        setShowNotifications(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setShowNotifications(false);
        setShowSearch(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <>
      {/* Background Blur when Notifications are Open */}
      {showNotifications && (
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-md z-40"></div>
      )}

      {/* Navbar */}
      <div
        className={`fixed top-4 left-[270px] w-[calc(100%-270px)] flex items-center justify-between h-16 px-6 md:px-10 transition-transform duration-300 z-50 bg-white shadow-lg rounded-2xl ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        {/* Left: Page Title */}
        <div className="flex">
          <h1 className="text-xl font-bold text-gray-900">{activePage}</h1>
        </div>

        {/* Search Bar (Inside Navbar) */}
        <div className={`flex-1 mx-10 transition-all duration-300 ${showSearch ? "w-full" : "w-0 opacity-0 pointer-events-none"}`}>
          <input
            ref={searchRef}
            type="text"
            placeholder="Search..."
            className="w-full p-3 pl-4 border border-gray-300 rounded-full focus:outline-none"
            autoFocus={showSearch}
          />
        </div>

        {/* Right: Search, Notifications & Profile */}
        <div className="flex items-center space-x-6">
          {/* Search Icon */}
          <button
            className="p-3 rounded-full hover:bg-gray-100"
            onClick={() => setShowSearch(!showSearch)}
          >
            <CiSearch size={24} />
          </button>

          {/* Notification Icon */}
          <button
            className="p-3 rounded-full hover:bg-gray-100 relative"
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <IoMdNotificationsOutline size={24} />
          </button>

          {/* Profile Icon */}
          <button className="w-10 h-10 rounded-full overflow-hidden">
            <img
              src={profileImageUrl || "/png/avatar.png"}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </button>
        </div>
      </div>

      {/* Floating Notification Panel */}
      {showNotifications && (
        <div
          ref={notificationRef}
          className="fixed top-20 right-6 w-80 bg-white shadow-lg rounded-lg p-4 z-50 transition-transform duration-300"
        >
          <h2 className="text-lg font-semibold">Notifications</h2>
          <p className="text-gray-600 text-sm mt-2">No new notifications</p>
        </div>
      )}
    </>
  );
};

export default Navbar;
