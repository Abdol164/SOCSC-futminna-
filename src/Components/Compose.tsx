import React, { useState, useContext } from "react";
import { AppContext, AppContextProps } from "../utils/contexts/AppContext";

const Compose = () => {
    const [recipient, setRecipient] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");
    const { walletAddress, token } = useContext(AppContext) as AppContextProps;

    const handleSendEmail = async (e: React.FormEvent) => {
        e.preventDefault(); // Prevent form submission from reloading the page
        console.log("Email sent!");
        console.log("Recipient:", recipient);
        console.log("Subject:", subject);
        console.log("Message:", message);
        // Add logic to send email here
        try {
            const response = await fetch("http://localhost:3000/mail/sendMail", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({
                    from: walletAddress,
                    to: recipient,
                    subject,
                    body: message,
                }),
            });

            // if (!response.ok) {
            //     throw new Error("Failed to send email");
            // }

            const responseData = await response.json();
            console.log("Response from server:", responseData);

            console.log("Email sent successfully:", responseData);
        } catch (error) {
            console.error("Error sending email:", error);
        }

        // Reset form fields after sending email
        // setRecipient("");
        // setSubject("");
        // setMessage("");
    };

    return (
        <div>
            <h1 className="text-2xl font-bold">Compose</h1>
            <form
                className="flex flex-col space-y-4"
                onSubmit={handleSendEmail} // Attach the submit handler here
            >
                <><input
                    type="text"
                    placeholder="Recipient"
                    className="border p-2 rounded"
                    value={recipient} // Bind state to input
                    onChange={(e) => setRecipient(e.target.value)} // Update state on change
                /><input
                        type="text"
                        placeholder="Subject"
                        className="border p-2 rounded"
                        value={subject} // Bind state to input
                        onChange={(e) => setSubject(e.target.value)} // Update state on change
                    /><textarea
                        placeholder="Write your message here..."
                        className="border p-2 rounded h-32"
                        value={message} // Bind state to textarea
                        onChange={(e) => setMessage(e.target.value)} // Update state on change
                    /><button
                        type="submit"
                        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                    >
                        Send
                    </button></>
            </form>
        </div>
    );
};

export default Compose;