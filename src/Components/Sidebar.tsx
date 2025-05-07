import React, { useContext } from 'react';
import { HiOutlineInboxIn } from "react-icons/hi";
import { MdPresentToAll } from "react-icons/md";
import { RiDraftLine } from "react-icons/ri";
import { RiSpam2Line } from "react-icons/ri";
import { LuArchiveRestore } from "react-icons/lu";
import { GoTrash } from "react-icons/go";
import { IoSettingsOutline } from "react-icons/io5";
import { CiCreditCard1 } from "react-icons/ci";
import { MdCurrencyExchange } from "react-icons/md";
import { MdOutlineHelpCenter } from "react-icons/md";
import { AppContext } from '../utils/contexts/AppContext';


interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, label, active, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`flex items-center px-6 py-3 my-1 cursor-pointer ${active ? 'bg-blue-50' : 'hover:bg-gray-50'} rounded-md`}
    >
      <div className="w-5 h-5 mr-3">{icon}</div>
      <span className={`text-base ${active ? 'text-blue-500 font-medium' : 'text-gray-700'}`}>{label}</span>
    </div>
  );
};

interface ProfileProps {
  avatar: string;
  name: string;
  email: string;
}

const Profile: React.FC<ProfileProps> = ({ avatar, name, email }) => {
  return (
    <div className="flex items-center px-4 py-4 mt-auto">
      <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-blue-400">
        <img src={avatar} alt="Profile" className="w-full h-full object-cover" />
      </div>
      <div className="ml-3">
        <p className="font-medium text-gray-800">{name}</p>
        <p className="text-sm text-gray-500">{email}</p>
      </div>
    </div>
  );
};


const Sidebar = () => {
  const appContext = useContext(AppContext);

  if (!appContext) {
    throw new Error("AppContext is not provided");
  }

  const { activeNavItem, setActiveNavItem } = appContext;

  // Handle item click to set the active item
  const handleNavItemClick = (item: string) => {
    setActiveNavItem(item); // Update the active item state
    console.log(`Clicked on ${item}:`, activeNavItem); // Log the clicked item
  };

  return (
    <div className="border-r border-b-5 overflow-auto sticky-top">
      {/* Logo */}
      <div className="px-5 py-6 align-items-center">
        <img src="/png/inbox.icon.png" alt="SUIMAIL" className="h-8" />
      </div>

      {/* Compose Button */}
      <div className="px-6 mb-4">
        <button
          style={{
            background: "linear-gradient(to bottom, #006bf9, #00c1fa)",
          }}
          onClick={() => handleNavItemClick('Compose')}
          className="flex items-center justify-center w-full bg-blue-400 hover:bg-blue-500 text-white py-2 px-4 rounded-full"
          onClick={onCompose} 
        >
          <span className="mr-2 text-xl font-bold">+</span>
          <span>Compose</span>
        </button>
      </div>

      {/* Mail Navigation */}
      <div className="mt-2">
        {/* <div className="flex flex-col items-start space-y-4 px-6 w-40"> */}
          <SidebarItem
            icon={<HiOutlineInboxIn />}
            label="Inbox"
            active={activeNavItem === 'Inbox'}
            onClick={() => handleNavItemClick('Inbox')}
          />
          <SidebarItem
            icon={<MdPresentToAll />}
            label="Sent"
            active={activeNavItem === 'Sent'}
            onClick={() => handleNavItemClick('Sent')}
          />
          <SidebarItem
            icon={<RiDraftLine />}
            label="Draft"
            active={activeNavItem === 'Draft'}
            onClick={() => handleNavItemClick('Draft')}
          />
          <SidebarItem
            icon={<RiSpam2Line />}
            label="Spam"
            active={activeNavItem === 'Spam'}
            onClick={() => handleNavItemClick('Spam')}
          />
          <SidebarItem
            icon={<LuArchiveRestore />}
            label="Archive"
            active={activeNavItem === 'Archive'}
            onClick={() => handleNavItemClick('Archive')}
          />
          <SidebarItem
            icon={<GoTrash />}
            label="Trash"
            active={activeNavItem === 'Trash'}
            onClick={() => handleNavItemClick('Trash')}
          />
        {/* </div> */}
      </div>

      {/* Spacer */}
      <div className="border-t border-gray-200 mt-4"></div>

      {/* Account Settings */}
      <div className="">
        <SidebarItem
          icon={<CiCreditCard1 />}
          label="Payment"
          active={activeNavItem === 'Payment'}
          onClick={() => handleNavItemClick('Payment')}
        />
        <SidebarItem
          icon={<MdCurrencyExchange />}
          label="Subscription"
          active={activeNavItem === 'Subscription'}
          onClick={() => handleNavItemClick('Subscription')}
        />
      </div>

      {/* Spacer */}
      <div className="flex-grow"></div>
      <div className="border-t border-gray-200 mt-4"></div>

      {/* Help and Settings */}
      <div className="mb-4">
        <SidebarItem
          icon={<MdOutlineHelpCenter />}
          label="Help"
          active={activeNavItem === 'Help'}
          onClick={() => handleNavItemClick('Help')}
        />
        <SidebarItem
          icon={<IoSettingsOutline />}
          label="Settings"
          active={activeNavItem === 'Settings'}
          onClick={() => handleNavItemClick('Settings')}
        />
      </div>

      {/* Profile */}
      <Profile
        avatar="/png/avatar.png"
        name="Lacasa"
        email="lacasadapapel@suimail"
      />
    </div>
  );
};

export default Sidebar;
