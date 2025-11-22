import React, { useState } from "react";
import axios from "axios";

const AIChatbot = () => {
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi! How can I help you with FarmNova today?" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const userMsg = { from: "user", text: input };
    setMessages((msgs) => [...msgs, userMsg]);
    setInput("");
    setLoading(true);

    try {
      // Call your backend endpoint that wraps the OpenAI API
      const res = await axios.post("/api/ai-chat", {
        messages: [...messages, userMsg].slice(-6) // send last 6 messages for context
      });
      setMessages((msgs) => [...msgs, { from: "bot", text: res.data.reply }]);
    } catch {
      setMessages((msgs) => [
        ...msgs,
        { from: "bot", text: "Sorry, I couldn't get a response. Please try again." }
      ]);
    }
    setLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 w-80 max-w-full bg-white border rounded-lg shadow-lg flex flex-col">
      <div className="bg-green-600 text-white px-4 py-2 rounded-t-lg font-bold">
        FarmNova AI Chatbot
      </div>
      <div className="flex-1 p-3 overflow-y-auto max-h-80">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`mb-2 flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`px-3 py-2 rounded-lg text-sm ${
                msg.from === "user"
                  ? "bg-green-100 text-green-900"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="mb-2 flex justify-start">
            <div className="px-3 py-2 rounded-lg text-sm bg-gray-100 text-gray-800 animate-pulse">
              Typing...
            </div>
          </div>
        )}
      </div>
      <form onSubmit={sendMessage} className="flex border-t">
        <input
          className="flex-1 px-3 py-2 outline-none"
          placeholder="Ask me anything..."
          value={input}
          onChange={e => setInput(e.target.value)}
          disabled={loading}
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded-r-lg font-semibold disabled:opacity-50"
          disabled={loading}
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default AIChatbot;
