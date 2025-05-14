import React, { useState, useContext } from "react";
import { AppContext, AppContextProps } from "../utils/contexts/AppContext";
import { Editor } from "@tinymce/tinymce-react";
import { Paperclip, Send, Save, X, Underline } from "lucide-react";
import { Transaction } from '@mysten/sui/transactions';
import { useCurrentAccount, useSignAndExecuteTransaction } from '@mysten/dapp-kit';
import { set } from "zod";



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
  const [requiredFee, setRequiredFee] = useState<number>(0);
  const [isCheckingRecipient, setIsCheckingRecipient] = useState(false); // New state for recipient validation
  const [suimailNs, setSuimailNs] = useState<string>(); // New state for recipient validation


  const { walletAddress, token } = useContext(AppContext) as AppContextProps;

  const { mutate: signAndExecuteTransaction } = useSignAndExecuteTransaction();
  const [digest, setDigest] = useState('');
  const currentAccount = useCurrentAccount();

  const SUI_AMOUNT = requiredFee * 1_000_000_000; // Convert requiredFee (in SUI) to its MIST value

  const sendSui = async (): Promise<boolean> => {
    try {
      const tx = new Transaction();

      // Split 0.01 SUI from the gas coin
      const [coin] = tx.splitCoins(tx.gas, [tx.pure.u64(SUI_AMOUNT)]);

      // Transfer the split coin to the recipient
      tx.transferObjects([coin], tx.pure.address(recipient));

      // Sign and execute the transaction block
      const result = await new Promise<boolean>((resolve, reject) => {
        signAndExecuteTransaction(
          { transaction: tx, chain: 'sui:testnet' },
          {
            onSuccess: (result) => {
              console.log('Executed transaction:', result);
              setDigest(result.digest);
              resolve(true); // Resolve the Promise with success
            },
            onError: (error) => {
              console.error('Transaction rejected:', error); // Log the rejection
              setIsLoading(false); // Stop loading
              reject(true); // Resolve the Promise with failure
            },
          },
        );
      })
      console.log('Transaction result:', result);
      return true;
    } catch (error) {
      console.error('Error sending SUI:', error);
      return false;
    }
  };

  const feeChecker = async () => {
    if (requiredFee > 0) {
      await sendSui(); // Wait for sendSui to complete
      console.log("Fee required");
      return true;
    }else if (requiredFee === 0) {
      console.log("No fee required, no transfer needed.");
      return true;
    }
  }

  const handleSendEmail = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission behavior
    setIsLoading(true);
    setFeedback(null);
    let transferSuccess: any = await feeChecker(); // Wait for sendSui to complete
    console.log("Transfer success:", transferSuccess);

    if (transferSuccess === true) {
      console.log(transferSuccess)
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
        const response = await fetch("https://suimail-backend.onrender.com/mail/sendMail", {
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

    if (transferSuccess === false) {
      setIsLoading(false);
      setFeedback({ type: "error", message: "Failed to send SUI." });
      console.error("Failed to send SUI.");
      return;
    }

  }

  const handleRecipientBlur = async () => {
    console.log('handleBlur')
    if (recipient) {
      console.log('try Ns request')
      setIsCheckingRecipient(true)
      
      try {
        const suimailRes = await fetch(`https://suimail-backend.onrender.com/settings/suimailNs/${recipient}`, {
          method: "GET",
          // headers: {
          //   "Content-type": "application/json",
          // },
        });

        const suimailNsData = await suimailRes.json();
        console.log("Recipient validation data:", suimailNsData);
        setSuimailNs(suimailNsData.suimailNs); // Assuming the API returns the required fee

        console.log('trying fee request')
        const feeResponse = await fetch(`https://suimail-backend.onrender.com/settings/mailFee/${recipient}`, {
          method: "GET",
          // headers: {
          //   "Content-type": "application/json",
          // },
        });

        // if (!response.ok) {
        //   throw new Error("Failed to validate recipient address.");
        // }

        const data = await feeResponse.json();
        console.log("Recipient validation response:", data.mail);
        setRequiredFee(data.mailFee); // Assuming the API returns the required fee
        // Optionally, handle the response data (e.g., show feedback to the user)
      } catch (error) {
        console.error("Error validating recipient address:", error);
        setFeedback({ type: "error", message: "Invalid recipient address." });
      } finally {
        setIsCheckingRecipient(false); // Stop loading
      }
    }
  };



  const handleSaveDraft = async () => {
    const formData = new FormData();
    formData.append("from", walletAddress);
    formData.append("to", recipient);
    formData.append("subject", subject);
    formData.append("body", message);
    attachments.forEach((file) => formData.append("attachments", file));

    try {
      const res = await fetch("http://localhost:3000/mail/saveDraft", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      if (!res.ok) throw new Error("Draft save failed");
      setFeedback({ type: "draft", message: "Draft saved!" });
    } catch (error) {
      setFeedback({ type: "error", message: "Failed to save draft." });
    }
  };

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
    // <div>
    //   {currentAccount && (
    //     <>
    //       <div>
    //         <button
    //           onClick={() => {
    //             signAndExecuteTransaction(
    //               {
    //                 transaction: new Transaction(),
    //                 chain: 'sui:devnet',
    //               },
    //               {
    //                 onSuccess: (result) => {
    //                   console.log('executed transaction', result);
    //                   setDigest(result.digest);
    //                 },
    //               },
    //             );
    //           }}
    //         >
    //           Sign and execute transaction
    //         </button>
    //       </div>
    //       <div>Digest: {digest}</div>
    //     </>
    //   )}

    // </div>

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
              value={isCheckingRecipient ? recipient : suimailNs || recipient}
              onChange={(e) => {
                setRecipient(e.target.value);
                setSuimailNs("");
              }}
              onBlur={handleRecipientBlur}
              required
            />
            {!isCheckingRecipient && requiredFee > 0 && (
              <span className="text-sm text-gray-500 mt-1 block">{`Required fee ${requiredFee} SUI`}</span>
            )}
            {/* {requiredFee !== 0 && (
              <span className="text-sm text-gray-500 mt-1 block">
                {isCheckingRecipient
                  ? "Anti-spam check loading..."
                  : requiredFee == 0
                    ? "No fee required"
                    : `Required Fee: ${requiredFee} SUI`}
              </span> 
            )} */}
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
