// import React, { useState } from 'react';
// import Navbar from './navbar';
// import Sidebar from './Sidebar';

// const MainLayout: React.FC = () => {
//   const [activeNavItem, setActiveNavItem] = useState<string>('Inbox');
//   const profileImageUrl = '/images/profile-avatar.jpg';

//   // Function to render content based on activeNavItem
//   const renderMainContent = () => {
//     switch (activeNavItem) {
//       case 'Inbox':
//         return <div>Inbox Content Here</div>;
//       case 'Sent':
//         return <div>Sent Content Here</div>;
//       case 'Draft':
//         return <div>Draft Content Here</div>;
//       case 'Spam':
//         return <div>Spam Content Here</div>;
//       case 'Archive':
//         return <div>Archive Content Here</div>;
//       case 'Trash':
//         return <div>Trash Content Here</div>;
//       default:
//         return <div>Select a section</div>;
//     }
//   };

//   return (
//     <div className="flex">
//       {/* Sidebar */}
//       <Sidebar setActiveNavItem={setActiveNavItem} />

//       {/* Main content area */}
//       <div className="flex flex-col flex-1">
//         <Navbar activePage={activeNavItem} profileImageUrl={profileImageUrl} />
//         <div className="p-6">
//           {/* Render the content based on the activeNavItem */}
//           {renderMainContent()}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MainLayout;
