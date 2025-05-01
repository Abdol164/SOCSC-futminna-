import React, { useState, useContext } from "react";
import { AppContext, AppContextProps } from "../utils/contexts/AppContext";
import { Editor } from "@tinymce/tinymce-react";
import { Paperclip, Send, Save, X } from "lucide-react";

interface ComposeProps {
  onDone?: () => void; // Used for drawer mode (desktop)
}

const Compose: React.FC<ComposeProps> = ({ onDone }) => {
  const [recipient, setRecipient] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [attachments, setAttachments] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error" | "draft"; message: string } | null>(null);

  const { walletAddress, token } = useContext(AppContext) as AppContextProps;

  const handleSendEmail = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission behavior
    setIsLoading(true);
    setFeedback(null);

    try {
      // Create a FormData object
      const formData = new FormData();

      // Append JSON fields
      formData.append("from", walletAddress);
      formData.append("to", recipient);
      formData.append("subject", subject);
      formData.append("body", message);

      // Append attachments
      attachments.forEach((file) => {
        formData.append("attachments", file, file.name);
      });

      console.log("FormData:", formData.getAll("attachments"));
      console.log("FormData message:", formData.get("body"));

      // Send the request
      const response = await fetch("api/mail/sendMail", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`, // Authorization header
        },
        body: formData, // FormData as the body
      });

      const responseData = await response.json();
      console.log("Response from server:", responseData);

      if (!response.ok) {
        throw new Error(responseData.message || "Failed to send email.");
      }

      setFeedback({ type: "success", message: "Email sent successfully!" });
      setRecipient("");
      setSubject("");
      setMessage("");
      setAttachments([]);
      if (onDone) onDone(); // Auto-close drawer
    } catch (error) {
      console.error("Error sending email:", error);
      setFeedback({ type: "error", message: "Failed to send email." });
    } finally {
      setIsLoading(false);
    }
  };

  // const handleSaveDraft = async () => {
  //   const formData = new FormData();
  //   formData.append("from", walletAddress);
  //   formData.append("to", recipient);
  //   formData.append("subject", subject);
  //   formData.append("body", message);
  //   attachments.forEach((file) => formData.append("attachments", file));

  //   try {
  //     const res = await fetch("http://localhost:3000/mail/saveDraft", {
  //       method: "POST",
  //       headers: { Authorization: `Bearer ${token}` },
  //       body: formData,
  //     });

  //     if (!res.ok) throw new Error("Draft save failed");
  //     setFeedback({ type: "draft", message: "Draft saved!" });
  //   } catch (error) {
  //     setFeedback({ type: "error", message: "Failed to save draft." });
  //   }
  // };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setAttachments([...attachments, ...Array.from(e.target.files)]);
    }
  };

  const removeAttachment = (index: number) => {
    setAttachments(attachments.filter((_, i) => i !== index));
  };

  const isDrawer = typeof onDone === "function";

  return (
    <div
      className={`${isDrawer
          ? "bg-white p-4"
          : "min-h-screen bg-gradient-to-br from-gray-100 to-white flex items-center justify-center py-10 px-4"
        }`}
    >
      <div
        className={`w-full ${isDrawer ? "" : "max-w-3xl shadow-xl"} bg-white rounded-xl ${isDrawer ? "" : "p-6 md:p-10"
          } space-y-6`}
      >
        {!isDrawer && (
          <h2 className="text-3xl font-semibold text-gray-800 text-center">New Message</h2>
        )}

        <form className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">To</label>
            <input
              type="text"
              placeholder="e.g. jane@sui.id"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Subject</label>
            <input
              type="text"
              placeholder="What's this about?"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Message</label>
            <textarea
              placeholder="Write your message here..."
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={6}
              required
            />
            {/* <Editor
              value={message}
              onEditorChange={(content) => setMessage(content)}
              apiKey="o0f41o9lfxw523k9i91hfunnmrfgjhzicfmktar9ttcd5ze8"
              init={{
                height: 300,
                menubar: false,
                plugins: "link image code table lists preview",
                toolbar:
                  "undo redo | blocks | bold italic underline | alignleft aligncenter alignright | bullist numlist | link image | preview",
              }}
            /> */}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Attachments</label>
            <input
              type="file"
              multiple
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-500 mb-2"
            />
            <div className="flex flex-wrap gap-2">
              {attachments.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center bg-gray-100 px-3 py-1 rounded-full text-sm"
                >
                  <Paperclip className="w-4 h-4 mr-1" />
                  {file.name}
                  <button
                    type="button"
                    onClick={() => removeAttachment(index)}
                    className="ml-2 text-red-500 hover:text-red-700"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            {onDone && (
              <button
                type="button"
                onClick={onDone}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
              >
                Close
              </button>
            )}
            {/* <button
              type="button"
              onClick={handleSaveDraft}
              className="flex items-center justify-center gap-2 bg-gray-600 hover:bg-gray-700 text-white px-5 py-2 rounded-lg font-medium"
            >
              <Save className="w-5 h-5" />
              Save Draft
            </button> */}
            <button
              onClick={handleSendEmail}
              // type="submit"
              disabled={isLoading}
              className={`flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-medium transition ${isLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
            >
              <Send className="w-5 h-5" />
              {isLoading ? "Sending..." : "Send"}
            </button>
          </div>
        </form>

        {feedback && (
          <div
            className={`mt-4 p-3 rounded-lg text-center text-white transition-all duration-300 ${feedback.type === "success"
                ? "bg-green-500"
                : feedback.type === "draft"
                  ? "bg-blue-500"
                  : "bg-red-500"
              }`}
          >
            {feedback.message}
          </div>
        )}
      </div>
    </div>
  );
};

export default Compose;
