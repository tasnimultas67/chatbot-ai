"use client"; // Mark this as a Client Component

import { ArrowUp } from "lucide-react";
import { useState, useEffect, useRef } from "react";

export default function Home() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const textareaRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    // Reset textarea height after submitting
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }

    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input }),
    });

    const data = await response.json();
    setMessages((prev) => [
      ...prev,
      { role: "assistant", content: data.reply },
    ]);
  };

  useEffect(() => {
    if (!input && textareaRef.current) {
      textareaRef.current.style.height = "auto"; // Reset height when input is empty
    }
  }, [input]);

  return (
    <div className="min-h-screen bg-gray-100 grid grid-cols-4">
      <div className="bg-black"></div>
      <div className=" bg-white shadow-lg rounded-lg p-6 relative bottom-0 col-span-3 overflow-hidden">
        <div className=" mb-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`mb-2 text-sm ${
                msg.role === "user" ? "text-right" : "text-left"
              }`}
            >
              <span
                className={`inline-block p-2 rounded-lg ${
                  msg.role === "user"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-black"
                }`}
              >
                {msg.content}
              </span>
            </div>
          ))}
        </div>
        <div className="w-full">
          <div className="sticky top-0">
            <form onSubmit={handleSubmit} className="flex relative top-0 ">
              <textarea
                rows={5}
                ref={textareaRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onInput={(e) => {
                  const textarea = e.target;
                  textarea.style.height = "auto"; // Reset height
                  textarea.style.height = `${textarea.scrollHeight}px`; // Set new height
                }}
                className="flex-1 p-2.5 border border-gray-300 rounded-2xl bg-gray-100 focus:outline-none text-sm resize-none no-scrollbar"
                placeholder="Type a message..."
              />
              <button
                type="submit"
                className="bg-blue-500 text-white p-2 rounded-full text-sm absolute right-1 bottom-1"
              >
                <ArrowUp className="size-4"></ArrowUp>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
