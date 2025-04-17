import React, { useState, useContext, useEffect } from "react";
import { AppContext, AppContextProps } from "../utils/contexts/AppContext";
import { Editor } from "@tinymce/tinymce-react";

const Compose = () => {
    const [recipient, setRecipient] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");
    const [attachments, setAttachments] = useState<File[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);
    const [draftSaved, setDraftSaved] = useState(false);
    const [subname, setSubname] = useState("");
    const { walletAddress, token } = useContext(AppContext) as AppContextProps;

    useEffect(() => {
        if (walletAddress) {
            setSubname(walletAddress.split("@")[0]); // Automatically map username to wallet address
        }
    }, [walletAddress]);

    const handleSendEmail = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setShowError(false);
        setShowSuccess(false);
        try {
            const formData = new FormData();
            formData.append("from", walletAddress);
            formData.append("to", recipient);
            formData.append("subject", subject);
            formData.append("body", message);
            attachments.forEach((file) => formData.append("attachments", file));

            const response = await fetch("http://localhost:3000/mail/sendMail", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
                body: formData,
            });
            if (!response.ok) {
                throw new Error("Failed to send email");
            }
            const responseData = await response.json();
            console.log("Response from server:", responseData);
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 3000);
        } catch (error) {
            console.error("Error sending email:", error);
            setShowError(true);
            setTimeout(() => setShowError(false), 3000);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSaveDraft = async () => {
        setDraftSaved(false);
        try {
            const formData = new FormData();
            formData.append("from", walletAddress);
            formData.append("to", recipient);
            formData.append("subject", subject);
            formData.append("body", message);
            attachments.forEach((file) => formData.append("attachments", file));

            const response = await fetch("http://localhost:3000/mail/saveDraft", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
                body: formData,
            });

            if (!response.ok) {
                throw new Error("Failed to save draft");
            }

            console.log("Draft saved successfully");
            setDraftSaved(true);
            setTimeout(() => setDraftSaved(false), 3000);
        } catch (error) {
            console.error("Error saving draft:", error);
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

    return (
        <div className="min-h-screen bg-[#F5F5F5] flex items-center justify-center p-6">
            <div className="bg-white shadow-xl rounded-lg p-8 max-w-md w-full">
                <h1 className="text-3xl font-bold text-[#333333] text-center mb-6">
                    Compose Email
                </h1>
                <form className="space-y-5" onSubmit={handleSendEmail}>
                    <input
                        type="text"
                        placeholder="Recipient"
                        className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0F3460]"
                        value={recipient}
                        onChange={(e) => setRecipient(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Subject"
                        className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0F3460]"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                    />
                    <Editor
                        value={message}
                        onEditorChange={(content) => setMessage(content)}
                        init={{
                            height: 300,
                            menubar: false,
                            plugins: [
                                "advlist autolink lists link image charmap print preview anchor",
                                "searchreplace visualblocks code fullscreen",
                                "insertdatetime media table paste code help wordcount",
                            ],
                            toolbar:
                                "undo redo | formatselect | bold italic backcolor | \
                                alignleft aligncenter alignright alignjustify | \
                                bullist numlist outdent indent | removeformat | help",
                        }}
                    />
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Attach Files/Photos
                        </label>
                        <input
                            type="file"
                            multiple
                            onChange={handleFileChange}
                            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                        />
                        <ul className="mt-2">
                            {attachments.map((file, index) => (
                                <li key={index} className="flex justify-between items-center text-sm text-gray-600">
                                    {file.name}
                                    <button
                                        type="button"
                                        onClick={() => removeAttachment(index)}
                                        className="text-red-500 hover:underline"
                                    >
                                        Remove
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="flex gap-4">
                        <button
                            style={{
                                background: "linear-gradient(to bottom, #006bf9, #00c1fa)",
                            }}
                            className={`w-full ${isLoading ? 'bg-gray-400' : ''} text-white py-3 rounded-lg font-semibold hover:bg-[#16213E] transition duration-300`}
                            disabled={isLoading}
                        >
                            {isLoading ? 'Sending Mail...' : 'Send Email'}
                        </button>
                        <button
                            type="button"
                            onClick={handleSaveDraft}
                            className="w-full bg-gray-500 text-white py-3 rounded-lg font-semibold hover:bg-gray-600 transition duration-300"
                        >
                            Save to Draft
                        </button>
                    </div>
                </form>
                {showSuccess && (
                    <div className="mt-4 p-3 bg-green-500 text-white text-center rounded-lg">
                        Mail sent successfully!
                    </div>
                )}
                {showError && (
                    <div className="mt-4 p-3 bg-red-500 text-white text-center rounded-lg">
                        Failed to send mail. Please try again.
                    </div>
                )}
                {draftSaved && (
                    <div className="mt-4 p-3 bg-blue-500 text-white text-center rounded-lg">
                        Draft saved successfully!
                    </div>
                )}
            </div>
        </div>
    );
};





export default Compose;










