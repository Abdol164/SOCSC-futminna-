import React, { useContext } from 'react';
import {
  HiOutlineInboxIn
} from "react-icons/hi";
import { RiDraftLine, RiSpam2Line } from "react-icons/ri";
import { LuArchiveRestore } from "react-icons/lu";
import { GoTrash } from "react-icons/go";
import { IoSettingsOutline } from "react-icons/io5";
import { CiCreditCard1 } from "react-icons/ci";
import { MdCurrencyExchange, MdOutlineHelpCenter, MdPresentToAll } from "react-icons/md";
import { AppContext, AppContextProps } from '../utils/contexts/AppContext';

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, label, active, onClick }) => (
  <div
    onClick={onClick}
    className={`flex items-center px-6 py-3 my-1 cursor-pointer transition rounded-md ${
      active ? 'bg-blue-50' : 'hover:bg-gray-100'
    }`}
  >
    <div className="w-5 h-5 mr-3 text-blue-500">{icon}</div>
    <span className={`text-base ${active ? 'text-blue-600 font-semibold' : 'text-gray-800'}`}>
      {label}
    </span>
  </div>
);

interface ProfileProps {
  avatar: string;
  name: string;
}

const Profile: React.FC<ProfileProps> = ({ avatar, name }) => {
  const { walletAddress, subname } = useContext(AppContext) as AppContextProps;
  const displaySubname = subname ?? (walletAddress ? `${walletAddress.slice(2)}@suimail` : '');

  return (
    <div className="flex items-center px-4 py-4 mt-auto">
      <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-blue-400">
        <img src={avatar} alt="Profile" className="w-full h-full object-cover" />
      </div>
      <div className="ml-3">
        <p className="font-medium text-gray-800">{name}</p>
        {displaySubname && <p className="text-sm text-blue-500 break-words">{displaySubname}</p>}
      </div>
    </div>
  );
};

interface SidebarProps {
  onNavChange: (item: string) => void;
  onCompose: () => void; // ✅ NEW: handle Compose drawer
}

const Sidebar: React.FC<SidebarProps> = ({ onNavChange, onCompose }) => {
  const { activeNavItem, setActiveNavItem, subname } = useContext(AppContext) as AppContextProps;

  const handleNavItemClick = (item: string) => {
    setActiveNavItem(item);
    onNavChange(item); // triggers sidebar close in mobile
  };

  return (
    <div className="border-r bg-white h-full flex flex-col overflow-auto">
      {/* Logo */}
      <div className="px-5 py-6">
        <img src="/png/inbox.icon.png" alt="SUIMAIL" className="h-8" />
      </div>

      {/* Compose Button */}
      <div className="px-6 mb-4">
        <button
          style={{ background: 'linear-gradient(to bottom, #006bf9, #00c1fa)' }}
          onClick={onCompose}
          className="flex items-center justify-center w-full text-white py-2 px-4 rounded-full shadow"
        >
          <span className="mr-2 text-xl font-bold">+</span>
          <span>Compose</span>
        </button>
      </div>

      {/* Mail Items */}
      <div className="flex-grow">
        <SidebarItem icon={<HiOutlineInboxIn />} label="Inbox" active={activeNavItem === 'Inbox'} onClick={() => handleNavItemClick('Inbox')} />
        <SidebarItem icon={<MdPresentToAll />} label="Sent" active={activeNavItem === 'Sent'} onClick={() => handleNavItemClick('Sent')} />
        <SidebarItem icon={<RiDraftLine />} label="Draft" active={activeNavItem === 'Draft'} onClick={() => handleNavItemClick('Draft')} />
        <SidebarItem icon={<RiSpam2Line />} label="Spam" active={activeNavItem === 'Spam'} onClick={() => handleNavItemClick('Spam')} />
        <SidebarItem icon={<LuArchiveRestore />} label="Archive" active={activeNavItem === 'Archive'} onClick={() => handleNavItemClick('Archive')} />
        <SidebarItem icon={<GoTrash />} label="Trash" active={activeNavItem === 'Trash'} onClick={() => handleNavItemClick('Trash')} />
      </div>

      {/* Divider */}
      <div className="border-t border-gray-200 mt-4"></div>

      {/* Settings Items */}
      <SidebarItem icon={<CiCreditCard1 />} label="Payment" active={activeNavItem === 'Payment'} onClick={() => handleNavItemClick('Payment')} />
      <SidebarItem icon={<MdCurrencyExchange />} label="Subscription" active={activeNavItem === 'Subscription'} onClick={() => handleNavItemClick('Subscription')} />

      {/* Divider */}
      <div className="border-t border-gray-200 mt-4"></div>

      <SidebarItem icon={<MdOutlineHelpCenter />} label="Help" active={activeNavItem === 'Help'} onClick={() => handleNavItemClick('Help')} />
      <SidebarItem icon={<IoSettingsOutline />} label="Settings" active={activeNavItem === 'Settings'} onClick={() => handleNavItemClick('Settings')} />

      {/* Footer Profile */}
      <Profile avatar="/png/avatar.png" name={subname || "Register your subname"} />
    </div>
  );
};

export default Sidebar;
