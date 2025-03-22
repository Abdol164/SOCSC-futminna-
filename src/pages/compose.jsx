// import React, { useState } from "react";
// import { X, Send, Paperclip, Calendar, Trash } from "lucide-react";
// import { Editor } from "@tinymce/tinymce-react"; // Rich Text Editor
// import DatePicker from "react-datepicker"; // Date Picker for Scheduling
// import "react-datepicker/dist/react-datepicker.css";

// export default function ComposeEmail({ onClose }) {
//   const [to, setTo] = useState("");
//   const [subject, setSubject] = useState("");
//   const [message, setMessage] = useState("");
//   const [attachments, setAttachments] = useState([]);
//   const [scheduleTime, setScheduleTime] = useState(null);

//   // Handle File Upload
//   const handleFileUpload = (event) => {
//     const files = Array.from(event.target.files);
//     setAttachments((prev) => [...prev, ...files]);
//   };

//   // Handle Removing Attachments
//   const removeAttachment = (index) => {
//     setAttachments(attachments.filter((_, i) => i !== index));
//   };

//   // Handle Send
//   const handleSend = () => {
//     if (!to || !subject || !message) {
//       alert("Please fill out all fields before sending.");
//       return;
//     }
//     console.log("Sending Email:", { to, subject, message, attachments, scheduleTime });
//     onClose();
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
//       <div className="bg-white w-[600px] p-6 rounded-lg shadow-lg">
//         {/* Header */}
//         <div className="flex justify-between items-center border-b pb-3 mb-4">
//           <h2 className="text-lg font-semibold">Compose Email</h2>
//           <button onClick={onClose} className="text-gray-500 hover:text-red-500">
//             <X size={20} />
//           </button>
//         </div>

//         {/* Input Fields */}
//         <div className="space-y-4">
//           <input
//             type="email"
//             placeholder="To"
//             className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
//             value={to}
//             onChange={(e) => setTo(e.target.value)}
//           />
//           <input
//             type="text"
//             placeholder="Subject"
//             className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
//             value={subject}
//             onChange={(e) => setSubject(e.target.value)}
//           />

//           {/* Rich Text Editor */}
//           <Editor
//             apiKey="your-tinymce-api-key"
//             value={message}
//             onEditorChange={(newValue) => setMessage(newValue)}
//             init={{
//               height: 200,
//               menubar: false,
//               plugins: "lists link",
//               toolbar: "bold italic | bullist numlist | link",
//             }}
//           />

//           {/* File Attachments */}
//           <div className="border p-3 rounded-lg">
//             <label className="flex items-center gap-2 text-blue-600 cursor-pointer">
//               <Paperclip size={18} />
//               Attach Files
//               <input type="file" multiple className="hidden" onChange={handleFileUpload} />
//             </label>
//             {/* File Previews */}
//             {attachments.length > 0 && (
//               <div className="mt-2 space-y-2">
//                 {attachments.map((file, index) => (
//                   <div key={index} className="flex items-center justify-between bg-gray-100 p-2 rounded">
//                     <span className="text-sm truncate max-w-[70%]">{file.name}</span>
//                     <button onClick={() => removeAttachment(index)} className="text-red-500 hover:text-red-700">
//                       <Trash size={16} />
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>

//           {/* Schedule Email */}
//           <div className="flex items-center space-x-2">
//             <Calendar size={18} className="text-gray-500" />
//             <DatePicker
//               selected={scheduleTime}
//               onChange={(date) => setScheduleTime(date)}
//               showTimeSelect
//               dateFormat="Pp"
//               placeholderText="Schedule for later"
//               className="border rounded-lg px-3 py-2 w-full focus:outline-none focus:ring focus:ring-blue-200"
//             />
//           </div>
//         </div>

//         {/* Buttons */}
//         <div className="flex justify-end space-x-2 mt-4">
//           <button
//             onClick={onClose}
//             className="px-4 py-2 text-gray-600 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={handleSend}
//             className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 flex items-center gap-2 transition"
//           >
//             <Send size={16} /> {scheduleTime ? "Schedule" : "Send"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }


import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { X, Send, Paperclip, Calendar, Trash } from "lucide-react";
import { Editor } from "@tinymce/tinymce-react"; // Rich Text Editor
import DatePicker from "react-datepicker"; // Date Picker for Scheduling
import "react-datepicker/dist/react-datepicker.css";

export default function ComposeEmail({ onClose }) {
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [attachments, setAttachments] = useState([]);
  const [scheduleTime, setScheduleTime] = useState(null);

  // Handle File Upload
  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    setAttachments((prev) => [...prev, ...files]);
  };

  // Handle Removing Attachments
  const removeAttachment = (index) => {
    setAttachments(attachments.filter((_, i) => i !== index));
  };

  // Handle Send
  const handleSend = () => {
    if (!to || !subject || !message) {
      alert("Please fill out all fields before sending.");
      return;
    }
    console.log("Sending Email:", { to, subject, message, attachments, scheduleTime });
    onClose();
  };

  // Close on Escape Key
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return createPortal(
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-opacity animate-fade-in"
      onClick={onClose}
    >
      <div
        className="bg-white w-[600px] p-6 rounded-lg shadow-lg relative transition-transform transform animate-slide-in"
        onClick={(e) => e.stopPropagation()} // Prevent closing on modal click
      >
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-3 mb-4">
          <h2 className="text-lg font-semibold">Compose Email</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-red-500">
            <X size={20} />
          </button>
        </div>

        {/* Input Fields */}
        <div className="space-y-4">
          <input
            type="email"
            placeholder="To"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
            value={to}
            onChange={(e) => setTo(e.target.value)}
          />
          <input
            type="text"
            placeholder="Subject"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />

          {/* Rich Text Editor */}
          <Editor
            apiKey="p5o7a41lz770cmkboof5qv1ns1qjcmin8e57mmrn9xn6wjlj"
            value={message}
            onEditorChange={(newValue) => setMessage(newValue)}
            init={{
              height: 200,
              menubar: false,
              plugins: "lists link",
              toolbar: "bold italic | bullist numlist | link",
            }}
          />

          {/* File Attachments */}
          <div className="border p-3 rounded-lg">
            <label className="flex items-center gap-2 text-blue-600 cursor-pointer">
              <Paperclip size={18} />
              Attach Files
              <input type="file" multiple className="hidden" onChange={handleFileUpload} />
            </label>
            {/* File Previews */}
            {attachments.length > 0 && (
              <div className="mt-2 space-y-2">
                {attachments.map((file, index) => (
                  <div key={index} className="flex items-center justify-between bg-gray-100 p-2 rounded">
                    <span className="text-sm truncate max-w-[70%]">{file.name}</span>
                    <button onClick={() => removeAttachment(index)} className="text-red-500 hover:text-red-700">
                      <Trash size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Schedule Email */}
          <div className="flex items-center space-x-2">
            <Calendar size={18} className="text-gray-500" />
            <DatePicker
              selected={scheduleTime}
              onChange={(date) => setScheduleTime(date)}
              showTimeSelect
              dateFormat="Pp"
              placeholderText="Schedule for later"
              className="border rounded-lg px-3 py-2 w-full focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end space-x-2 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSend}
            className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 flex items-center gap-2 transition"
          >
            <Send size={16} /> {scheduleTime ? "Schedule" : "Send"}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}

