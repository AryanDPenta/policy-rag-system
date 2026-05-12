import ChatBox from "../components/ChatBox";

const PolicyChatPage = () => {
  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      background: "#111b21",
    }}>
      <div style={{
        width: "min(680px, 95vw)",
        height: "90vh",
        display: "flex",
        flexDirection: "column",
        borderRadius: "12px",
        overflow: "hidden",
        boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
      }}>

        {/* Header */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          padding: "14px 20px",
          background: "#202c33",
          borderBottom: "1px solid #2a3942",
          flexShrink: 0,
        }}>
          <div style={{
            width: "42px",
            height: "42px",
            borderRadius: "50%",
            background: "#00a884",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15v-4H7l5-8v4h4l-5 8z" fill="#ffffff"/>
            </svg>
          </div>
          <div>
            <div style={{ fontWeight: 600, fontSize: "15px", color: "#e9edef" }}>
              Company Policy Assistant
            </div>
            <div style={{ fontSize: "12px", color: "#8696a0", marginTop: "1px" }}>
              Always here to help
            </div>
          </div>
        </div>

        <ChatBox />
      </div>
    </div>
  );
};

export default PolicyChatPage;