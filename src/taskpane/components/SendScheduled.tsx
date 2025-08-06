import React, { useState } from "react";
import { readSelectedArea } from "../readselectedarea";
import { sendScheduled } from "../sendscheduled";

const SendScheduled = () => {
  const [recipients, setRecipients] = useState<Array<{ phoneNumber: string; sendDate: string }>>(
    []
  );
  const [isLastSendDate, setIsLastSendDate] = useState<boolean>(false);
  const [messageInput, setMessageInput] = useState<string>("");
  const [sendDate, setSendDate] = useState<string>("");
  const [batchSize, setBatchSize] = useState<number>(0);
  const [intervalMinutes, setIntervalMinutes] = useState<number>(0);
  const [timeWindowStart, setTimeWindowStart] = useState<Date>(new Date());
  const [timeWindowEnd, setTimeWindowEnd] = useState<Date>(new Date());

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
      isLastSendDate,
      messageContent: {
        messageInput,
        recipients: recipients.map((r) => ({
          phoneNumber: r.phoneNumber,
          sendDate: sendDate,
        })),
      },
      batchSetting: {
        batchSize,
        intervalMinutes,
        timeWindowStart,
        timeWindowEnd,
      },
    };
    try {
      setIsLastSendDate(false);
      setBatchSize(0);
      setIntervalMinutes(0);
      setTimeWindowStart(new Date());
      setTimeWindowEnd(new Date());

      await sendScheduled(payload,1,13);
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
        <label htmlFor="sendDate" className="form-label">
          Start Date
        </label>
        <input
          id="sendDate"
          className="form-control"
          type="datetime-local"
          value={sendDate}
          onChange={(e) => {
            setSendDate(e.target.value);
            console.log(e.target.value);
          }}
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
    </form>
  );
};
export default SendScheduled;
