import React, { useState } from "react";
import { readSelectedArea } from "../readselectedarea";
import { sendNow } from "../sendnow";
import { useNavigate } from "react-router-dom";
// Adjust the path accordingly

const SendNow = () => {
  
  const [recipients, setRecipients] = useState<Array<{ phoneNumber: string}>>([]);
  
  const [messageInput, setMessageInput] = useState<string>("");
  
  
  const navigate = useNavigate();

  const handleGetNumber = async () => {
    try {
      const result = await readSelectedArea();
      const parsed = JSON.parse(result);
      setRecipients(parsed);
    } catch (error) {
      console.error("Error reading Excel data:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      
      messageContent: {
        messageInput,
        recipients,
      },
      
    };

    try {
      
      await sendNow(payload,0);
      console.log("Data sent successfully.");
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="MessageInput" className="form-label">
          Message Input
        </label>
        <input
          id="MessageInput"
          className="form-control"
          type="text"
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          required
        />
      </div>

      <div>
        <button type="button" onClick={handleGetNumber}>
          Load Phone Numbers from Excel
        </button>
      </div>

      <div>
        <strong>Loaded numbers:</strong>
        <ul>
          {recipients.map((p, i) => (
            <li key={i}>{p.phoneNumber}</li>
          ))}
        </ul>
      </div>

      <div>
        <button type="submit">Send Message</button>
      </div>
      <div>
        <button title="Geri" type="button" onClick={() => navigate("/")}>
          Geri
        </button>
      </div>
    </form>
  );
};

export default SendNow;
