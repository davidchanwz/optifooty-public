import React, { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '../context/AuthContext';
import logo from "../assets/images/logo.png";
import "./auth.css";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth(); // Use the login function from AuthContext

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value,
      };
    });
  }

  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      await login(formData.email, formData.password); // Use the login function from AuthContext
      navigate("/");
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("An unexpected error occurred");
      }
    }
  }

  function togglePasswordVisibility() {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  }

  return (
    <div className="container">
      <div className="logo-section">
        <img src={logo} alt="OptiFooty Logo" className="logo" />
      </div>
      <div className="form-section">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <input placeholder="Email" name="email" onChange={handleChange} />
          </div>
          <div className="form-group">
            <input
              placeholder="Password"
              name="password"
              type={showPassword ? "text" : "password"}
              onChange={handleChange}
            />
            <span
              className="material-icons toggle-password"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? "visibility" : "visibility_off"}
            </span>
          </div>
          <button type="submit">Login</button>
        </form>
        <p>
          Don't have an account? <Link to="/signup">Sign Up</Link>.
        </p>
      </div>
    </div>
  );
};

export default Login;