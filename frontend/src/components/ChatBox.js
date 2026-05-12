import React, { useState, useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble";
import { askPolicyQuestion } from "../services/policyService";

const ChatBox = () => {
  const messagesEndRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userText = input;
    setMessages((prev) => [...prev, { type: "user", text: userText }]);
    setInput("");
    setLoading(true);
    try {
      const res = await askPolicyQuestion(userText);
      setMessages((prev) => [...prev, { type: "bot", text: res.data.answer }]);
    } catch {
      setMessages((prev) => [...prev, { type: "bot", text: "Something went wrong. Please try again." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      flex: 1,
      overflow: "hidden",
      background: "#0b141a",
    }}>

      {/* Subtle watermark pattern background */}
      <div style={{
        flex: 1,
        overflowY: "auto",
        padding: "16px 20px",
        display: "flex",
        flexDirection: "column",
        gap: "2px",
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23182229' fill-opacity='0.6'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }}>
        {messages.length === 0 && (
          <div style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
            color: "#8696a0",
            paddingTop: "60px",
          }}>
            <div style={{
              width: "64px",
              height: "64px",
              borderRadius: "50%",
              background: "#202c33",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" fill="#8696a0"/>
              </svg>
            </div>
            <p style={{ fontSize: "14px", margin: 0 }}>Ask anything about company policies</p>
          </div>
        )}

        {messages.map((msg, i) => (
          <MessageBubble key={i} message={msg} />
        ))}

        {loading && (
          <div style={{ display: "flex", alignItems: "flex-end", gap: "8px", marginTop: "4px" }}>
            {/* Bot avatar */}
            <div style={{
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              background: "#00a884",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15v-4H7l5-8v4h4l-5 8z" fill="#ffffff"/>
              </svg>
            </div>
            <div style={{
              background: "#202c33",
              borderRadius: "0 8px 8px 8px",
              padding: "10px 14px",
              display: "flex",
              alignItems: "center",
              gap: "5px",
            }}>
              {[0, 1, 2].map((i) => (
                <span key={i} style={{
                  width: "7px",
                  height: "7px",
                  borderRadius: "50%",
                  background: "#8696a0",
                  display: "inline-block",
                  animation: `bounce 1.2s ease-in-out ${i * 0.2}s infinite`,
                }} />
              ))}
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input bar */}
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        padding: "10px 16px",
        background: "#202c33",
        borderTop: "1px solid #2a3942",
        flexShrink: 0,
      }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
          placeholder="Ask about company policies..."
          style={{
            flex: 1,
            padding: "10px 16px",
            borderRadius: "24px",
            border: "none",
            outline: "none",
            background: "#2a3942",
            color: "#e9edef",
            fontSize: "14px",
            caretColor: "#00a884",
          }}
        />
        <button
          onClick={handleSend}
          disabled={!input.trim() || loading}
          style={{
            width: "42px",
            height: "42px",
            borderRadius: "50%",
            border: "none",
            background: input.trim() && !loading ? "#00a884" : "#2a3942",
            cursor: input.trim() && !loading ? "pointer" : "default",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            transition: "background 0.2s",
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" fill="#ffffff"/>
          </svg>
        </button>
      </div>

      <style>{`
        @keyframes bounce {
          0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; }
          40% { transform: scale(1); opacity: 1; }
        }
        div[style*="overflowY"]::-webkit-scrollbar { width: 5px; }
        div[style*="overflowY"]::-webkit-scrollbar-track { background: transparent; }
        div[style*="overflowY"]::-webkit-scrollbar-thumb { background: #2a3942; border-radius: 10px; }
      `}</style>
    </div>
  );
};

export default ChatBox;