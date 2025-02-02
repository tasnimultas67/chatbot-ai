"use client"; // Mark this as a Client Component

import { ArrowUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
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
      <div className="bg-black flex items-end justify-start p-5">
        <div className="space-y-2">
          <Image
            className="rounded-full size-20 object-cover"
            src="/Tasnimul-Haque.jpg"
            width={200}
            height={200}
          ></Image>
          <h2 className="text-white font-semibold">Tasnimul Haque</h2>
          <p className="text-xs text-gray-300 line-clamp-5">
            Hello, I am Tasnimul Haque! As a creative developer, I am committed
            to encompassing both design and development aspects in my work. This
            allows me to actively contribute to projects from their initial
            stages until the point of publication. My primary focus lies in
            crafting exceptional layouts, interactive elements, and captivating
            typography when working on websites.
          </p>
          <div>
            <Link
              className="text-xs text-white bg-slate-900 py-1 px-3 rounded-md"
              href="https://tasnimul.vercel.app/"
              target="_blank"
            >
              See More
            </Link>
          </div>
        </div>
      </div>
      <div className=" bg-white shadow-lg rounded-lg p-6 relative bottom-0 col-span-3 overflow-hidden flex items-end justify-start">
        {/* Preview */}
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
        {/* Form */}
        <div className="w-full ">
          <div className="">
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
