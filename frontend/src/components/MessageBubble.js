const BotAvatar = () => (
  <div style={{
    width: "32px",
    height: "32px",
    borderRadius: "50%",
    background: "#00a884",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    alignSelf: "flex-end",
  }}>
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15v-4H7l5-8v4h4l-5 8z" fill="#ffffff"/>
    </svg>
  </div>
);

const UserAvatar = () => (
  <div style={{
    width: "32px",
    height: "32px",
    borderRadius: "50%",
    background: "#2a3942",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    alignSelf: "flex-end",
  }}>
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" fill="#8696a0"/>
    </svg>
  </div>
);

const MessageBubble = ({ message }) => {
  const isUser = message.type === "user";

  const now = new Date();
  const time = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  return (
    <div style={{
      display: "flex",
      justifyContent: isUser ? "flex-end" : "flex-start",
      alignItems: "flex-end",
      gap: "8px",
      marginBottom: "6px",
    }}>
      {!isUser && <BotAvatar />}

      <div style={{
        background: isUser ? "#005c4b" : "#202c33",
        padding: "9px 14px 6px",
        borderRadius: isUser ? "8px 0 8px 8px" : "0 8px 8px 8px",
        maxWidth: "68%",
        minWidth: "80px",
        position: "relative",
      }}>
        {!isUser && (
          <div style={{
            fontSize: "12px",
            fontWeight: 600,
            color: "#00a884",
            marginBottom: "3px",
          }}>
            Policy Assistant
          </div>
        )}

        <div style={{
          color: "#e9edef",
          fontSize: "14px",
          lineHeight: "1.5",
          wordBreak: "break-word",
        }}>
          {message.text}
        </div>

        <div style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          gap: "4px",
          marginTop: "4px",
        }}>
          <span style={{ fontSize: "11px", color: "#8696a0" }}>{time}</span>
          {isUser && (
            <svg width="14" height="10" viewBox="0 0 18 12" fill="none">
              <path d="M1 6l4 4L11 1M6 10l5-9" stroke="#53bdeb" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
        </div>
      </div>

      {isUser && <UserAvatar />}
    </div>
  );
};

export default MessageBubble;