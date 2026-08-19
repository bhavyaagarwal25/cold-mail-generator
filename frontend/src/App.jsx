import Login from "./Login";
import { useState } from "react";


function App() {
  const [recipientName, setRecipientName] = useState("");
  const [recipientRole, setRecipientRole] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [senderGoal, setSenderGoal] = useState("");
  const [tone, setTone] = useState("Formal");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const handleGenerate = async () => {
    setLoading(true);
    setEmail("");

    try {
      const response = await fetch("http://127.0.0.1:8000/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          recipient_name: recipientName,
          recipient_role: recipientRole,
          company_name: companyName,
          sender_goal: senderGoal,
           tone: tone,
        }),
      });

      const data = await response.json();
      setEmail(data.email);
    } catch (error) {
      setEmail("Something went wrong. Please try again.");
    }

    setLoading(false);
  };
if (!isLoggedIn) {
  return <Login onLoginSuccess={() => setIsLoggedIn(true)} />;
}
  return (
    <div style={{ maxWidth: "600px", margin: "40px auto", fontFamily: "sans-serif" }}>
      {/* <h1>Cold Email Generator </h1> */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1>Cold Email Generator ✉️</h1>
        <button onClick={() => { localStorage.removeItem("token"); setIsLoggedIn(false); }}>
          Logout
        </button>
      </div>
      <input
        placeholder="Recipient ka naam"
        value={recipientName}
        onChange={(e) => setRecipientName(e.target.value)}
        style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
      />
      <input
        placeholder="Recipient ka role"
        value={recipientRole}
        onChange={(e) => setRecipientRole(e.target.value)}
        style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
      />
      <input
        placeholder="Company ka naam"
        value={companyName}
        onChange={(e) => setCompanyName(e.target.value)}
        style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
      />
      <input
        placeholder="Email ka goal"
        value={senderGoal}
        onChange={(e) => setSenderGoal(e.target.value)}
        style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
      />
      <select
          value={tone}
          onChange={(e) => setTone(e.target.value)}
          style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
        >
          <option value="Formal">Formal</option>
          <option value="Casual">Casual</option>
          <option value="Direct">Direct</option>
        </select>

      <button onClick={handleGenerate} disabled={loading} style={{ padding: "10px 20px" }}>
        {loading ? "Generating..." : "Generate Email"}
      </button>

      {email && (
        <div style={{ marginTop: "20px", whiteSpace: "pre-wrap", background: "#f5f5f5", padding: "15px" }}>
          {email}
        </div>
      )}
    </div>
  );
}

export default App;