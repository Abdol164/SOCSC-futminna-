import React from "react";
// import EmailList from "./Email-list";
// import EmailDetailPage from "./Email-view";
import Sidebar from "./Sidebar";
// import Navbar from "./navbar";
// import { useContext, useEffect } from "react";
import { AppContext } from '../utils/contexts/AppContext';
import EmailList from "./EmailList";
// import SentPage from "./Sent";


const Inbox = () => {
  // const [activePage, setActivePage] = useState("Inbox");

//   const { setNewbie, walletAddress, activePage, setActivePage } = useContext(AppContext);
//   console.log("the wallet addres:", walletAddress)

  
//   useEffect(() => {
//     const fetchData = async () => {
//       if (walletAddress) {
//         console.log('inside useeffect')
//         try {
//           const response = await fetch("http://localhost:3000/user/login", {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//             },
//             body: JSON.stringify({ address: walletAddress }),
//           })
//           const result = await response.json();
  
//           // setToken(result.token);
//           setNewbie(result.newbie);
          
//           // console.log(result.token)
//         } catch (err) {
//           console.log(err)
//         }
//       }
//     };
  
//     fetchData();

//   },[setNewbie, walletAddress])

  return (
    // <>
    //     <div>Welcome to Inbox</div>    
    // </>
    <div>
        <> 
          {/* Navbar */}
          {/* <div className="fixed border-b-2 top-0 right-0 w-4/5 bg-white z-50 ">
            <Navbar activePage={activePage}/>
          </div> */}

          {/* EmailList */}
          <div className="w-80  mt-20 border-r  border-gray-200">
            <EmailList />
          </div>

          {/* EmailView */}
          {/* <div className="flex-1 mt-20 overflow-auto">
            <EmailDetailPage />
          </div> */}
        </>
    </div>
  );
}


export default Inbox;
