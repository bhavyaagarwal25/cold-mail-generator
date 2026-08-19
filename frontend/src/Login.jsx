import { useState } from "react";

function Login({ onLoginSuccess }) {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setError("");
    setLoading(true);

    const endpoint = isSignup ? "/signup" : "/login";

    try {
      const response = await fetch(`http://127.0.0.1:8000${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.detail || "Something went wrong");
        setLoading(false);
        return;
      }

      if (isSignup) {
        setError("Signup successful! Please login now.");
        setIsSignup(false);
      } else {
        localStorage.setItem("token", data.access_token);
        onLoginSuccess();
      }
    } catch (err) {
      setError("Could not connect to server");
    }

    setLoading(false);
  };

  return (
    <div style={{ maxWidth: "400px", margin: "80px auto", fontFamily: "sans-serif" }}>
      <h2>{isSignup ? "Sign Up" : "Login"}</h2>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
      />

      {error && <p style={{ color: "red" }}>{error}</p>}

      <button onClick={handleSubmit} disabled={loading} style={{ padding: "10px 20px", width: "100%" }}>
        {loading ? "Please wait..." : isSignup ? "Sign Up" : "Login"}
      </button>

      <p style={{ marginTop: "15px", cursor: "pointer", color: "blue" }} onClick={() => setIsSignup(!isSignup)}>
        {isSignup ? "Already have an account? Login" : "New here? Sign up"}
      </p>
    </div>
  );
}

export default Login;