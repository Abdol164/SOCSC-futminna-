import React from 'react';

interface NavbarProps {
  activePage: string;
  profileImageUrl: string;
}

const Navbar: React.FC<NavbarProps> = ({ activePage, profileImageUrl }) => {
  return (
    <div className="flex items-center justify-between w-full h-16 px-6 bg-white border-b border-gray-200">
      {/* Page Title */}
      <div className="flex-1">
        <h1 className="text-xl font-medium text-gray-800">{activePage}</h1>
      </div>
      
      {/* Search and Action Icons */}
      <div className="flex items-center space-x-4">
        {/* Search Icon */}
        <button className="p-2 rounded-full hover:bg-gray-100">
          <img 
            src="/images/search-icon.png" 
            alt="Search" 
            className="w-5 h-5"
          />
        </button>
        
        {/* Notification Icon */}
        <button className="p-2 rounded-full hover:bg-gray-100 relative">
          <img 
            src="/images/notification-icon.png" 
            alt="Notifications" 
            className="w-5 h-5"
          />
          {/* Notification indicator */}
          <span className="absolute top-1 right-1 w-2 h-2 bg-blue-500 rounded-full"></span>
        </button>
        
        {/* Profile Icon */}
        <button className="w-8 h-8 rounded-full overflow-hidden">
          <img 
            src={profileImageUrl} 
            alt="Profile" 
            className="w-full h-full object-cover"
          />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
