import React, { useState, useContext, useEffect } from "react";
import {
  ChevronLeft,
  Archive,
  Trash2,
  AlertTriangle,
  MailOpen,
  Printer,
  ExternalLink,
  Star,
  Smile,
} from "lucide-react";
import { AppContext, AppContextProps } from "../utils/contexts/AppContext";

interface Attachment {
  name: string;
  url: string;
}

interface EmailViewProps {
  email: {
    _id: string;
    subject: string;
    from: string;
    to: string;
    date: string;
    senderImage: string;
    attachments?: Attachment[];
  };
  onBack: () => void;
}

const EmailView: React.FC<EmailViewProps> = ({ email: { _id, subject, from, to, date }, onBack }) => {
  const { walletAddress, token } = useContext(AppContext) as AppContextProps;
  const [mailBody, setMailBody] = useState<string>("");
  const [attachments, setAttachments] = useState<Attachment[]>([]);

  const fetchEmailBody = async () => {
    try {
      const response = await fetch(
        `/api/mail/inboxMessage/${walletAddress}/${_id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const responseData = await response.json();
      console.log("Email body response:", responseData);

      // Reconstruct Buffers from serialized data
      const reconstructedAttachments = responseData.attachments.map((attachment: any) => {
        const buffer = new Uint8Array(attachment.content.data); // Reconstruct Buffer
        return {
          name: attachment.fileName,
          url: URL.createObjectURL(new Blob([buffer], { type: attachment.fileType })),
        };
      });

      responseData.attachments.map((attachment: any) => {
        console.log("Attachment buffer:",attachment.content.data)
      })

      setMailBody(responseData.mail); // Set the decrypted email body
      setAttachments(reconstructedAttachments); // Set reconstructed attachments
    } catch (err) {
      console.error("Failed to fetch email body.", err);
    }
  };

  useEffect(() => {
    fetchEmailBody();
  }, [])


  const handleArchive = () => {
    console.log("Archived email:", subject);
    onBack(); // optionally return to list
  };

  const handleReport = () => {
    console.log("Reported email:", subject);
    alert("Email reported as suspicious.");
  };

  const handleDelete = () => {
    console.log("Deleted email:", subject);
    onBack(); // optionally return to list
  };

  const handleMarkUnread = () => {
    console.log("Marked as unread:", subject);
    onBack(); // optionally return to list
  };

  const handlePrint = () => {
    window.print();
  };

  const handleOpenNew = () => {
    alert("Opening in new window...");
    // Implement proper open logic as needed
  };

  return (
    <div className="w-full h-full bg-white overflow-y-auto p-4 sm:p-6 text-gray-800">
      {/* Top Bar Actions */}
      <div className="flex justify-between items-center border-b pb-3 mb-5">
        <div className="flex items-center space-x-3 flex-wrap">
          <button onClick={onBack} title="Back" className="hover:bg-gray-100 p-2 rounded">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button onClick={handleArchive} title="Archive" className="hover:bg-gray-100 p-2 rounded">
            <Archive className="w-5 h-5" />
          </button>
          <button onClick={handleReport} title="Report" className="hover:bg-gray-100 p-2 rounded">
            <AlertTriangle className="w-5 h-5" />
          </button>
          <button onClick={handleDelete} title="Delete" className="hover:bg-gray-100 p-2 rounded">
            <Trash2 className="w-5 h-5" />
          </button>
          <button onClick={handleMarkUnread} title="Mark as unread" className="hover:bg-gray-100 p-2 rounded">
            <MailOpen className="w-5 h-5" />
          </button>
        </div>
        <div className="flex items-center space-x-3">
          <button onClick={handlePrint} title="Print" className="hover:bg-gray-100 p-2 rounded">
            <Printer className="w-5 h-5" />
          </button>
          <button onClick={handleOpenNew} title="Open in new window" className="hover:bg-gray-100 p-2 rounded">
            <ExternalLink className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Subject */}
      <h1 className="text-2xl sm:text-3xl font-semibold mb-4">{subject}</h1>

      {/* Sender Info */}
      <div className="flex justify-between items-start sm:items-center mb-6">
        <div className="flex items-center gap-3">
          <img src="../public/logo.jpg" alt="Sender" className="w-10 h-10 rounded-full" />
          <div>
            <p className="font-semibold">{from}</p>
            <p className="text-sm text-gray-500">to {to}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <span>{new Date(date).toLocaleTimeString()}</span>
          <span title="Star this message">
            <Star className="w-4 h-4 cursor-pointer" />
          </span>
          <span title="React to message">
            <Smile className="w-4 h-4 cursor-pointer" />
          </span>
        </div>
      </div>

      {/* Promo Image */}
      {/* <div className="mb-6">
        <img
          src="https://ae01.alicdn.com/kf/Screenshot_FakeBannerImage.png"
          alt="Banner"
          className="w-full max-h-[400px] object-cover rounded-lg"
        />
      </div> */}

      {/* Email Body */}
      <div className="text-base leading-relaxed whitespace-pre-line mb-6">{mailBody}</div>

      {/* Attachments */}
      {attachments.length > 0 && (
        <div className="mb-10">
          <h2 className="text-sm font-semibold mb-2">Attachments</h2>
          <div className="grid grid-cols-2 sm:flex gap-4">
            {attachments.map((attachment, idx) => (
              <div key={idx} className="border p-2 rounded-md bg-gray-50 text-center shadow-sm">
                <p className="text-xs text-gray-700 truncate">{attachment.name}</p>
                <a
                  href={attachment.url}
                  className="text-blue-600 text-xs mt-1 hover:underline block"
                  download={attachment.name}
                >
                  Download
                </a>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Reply Area */}
      {/* <div className="border-t pt-6">
        <h2 className="text-sm font-semibold mb-2">Reply</h2>
        <textarea
          placeholder="Write your reply..."
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={5}
        ></textarea>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mt-3">
          <input type="file" className="text-sm" />
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Send
          </button>
        </div>
      </div> */}
    </div>
  );
};

export default EmailView;
