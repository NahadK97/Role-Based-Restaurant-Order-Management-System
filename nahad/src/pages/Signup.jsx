import { useState } from "react";
import "./Login.css";
import login_icon from "../assets/login-icon.avif";
// import { useSignup } from "../hooks/useSignup";
const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [RID, setRID] = useState("");
  const [role, setRole] = useState("");
  // const { signup, error, isLoading } = useSignup();
  //   const handleSubmit = async (e) => {
  //     e.preventDefault();
  //     await signup(email, password);
  //   };
  return (
    <form
      className="signup"
      // onSubmit={handleSubmit}
    >
      <h3>Sign Up</h3>
      <div className="logo">
        <img src={login_icon} alt="Logo" />
      </div>
      <label>Restaurant ID:</label>
      <input
        type="text"
        value={RID}
        placeholder="eg: R101"
        onChange={(e) => setRID(e.target.value)}
        required
      />

      <label>Role:</label>
      <select value={role} onChange={(e) => setRole(e.target.value)} required>
        <option value="">--Select Role--</option>
        <option value="admin">Admin</option>
        <option value="km">Kitchen Master</option>
        <option value="waiter">Waiter</option>
      </select>

      <label>Email:</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <label>Password:</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button
      // disabled={isLoading}
      >
        Sign Up
      </button>
      {/* {error && <p className="error">{error}</p>} */}
    </form>
  );
};

export default Signup;
