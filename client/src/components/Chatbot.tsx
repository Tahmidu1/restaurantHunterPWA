import React, { useState } from "react";

interface Message {
  sender: "user" | "bot";
  text: string;
}

const LiveChatbot: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  const apiKey = process.env.REACT_APP_GROQ_API_KEY;
  const endpoint = "https://api.groq.com/v1/chat";

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMessage = input.trim();
    setMessages((prev) => [...prev, { sender: "user", text: userMessage }]);
    setInput("");

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({ message: userMessage }),
      });

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const data = await response.json();
      const reply = data.reply || "Sorry, I couldn't generate an answer.";
      setMessages((prev) => [...prev, { sender: "bot", text: reply }]);
    } catch (error) {
      console.error("Error fetching AI response:", error);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Error: Could not get response." },
      ]);
    }
  };

  return (
    <>
      {open ? (
        // Expanded Chat Window
        <div className="fixed bottom-4 right-4 w-80 bg-white shadow-lg rounded-lg flex flex-col">
          {/* Chat Header with Close Button */}
          <div className="p-2 border-b flex justify-between items-center">
            <span className="font-bold">Chatbot</span>
            <button onClick={() => setOpen(false)} className="text-gray-600 hover:text-gray-800">
              &times;
            </button>
          </div>
          {/* Chat Messages */}
          <div className="p-4 h-64 overflow-y-auto">
            {messages.map((msg, index) => (
              <div key={index} className={`mb-2 ${msg.sender === "bot" ? "text-blue-600" : "text-gray-800"}`}>
                <strong>{msg.sender === "bot" ? "Bot:" : "You:"}</strong> {msg.text}
              </div>
            ))}
          </div>
          {/* Chat Input */}
          <div className="p-2 border-t flex">
            <input
              type="text"
              className="flex-grow border rounded px-2 py-1"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a question..."
            />
            <button
              onClick={handleSend}
              className="ml-2 bg-blue-500 text-white px-3 py-1 rounded"
            >
              Send
            </button>
          </div>
        </div>
      ) : (
        // Small Chat Button
        <div className="fixed bottom-4 right-4">
          <button
            onClick={() => setOpen(true)}
            className="bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 transition"
          >
            Chat
          </button>
        </div>
      )}
    </>
  );
};

export default LiveChatbot;
