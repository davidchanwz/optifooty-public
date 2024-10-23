import React, { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import supabase from "../client";
import logo from "../assets/images/logo.png";
import "./auth.css";

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userName: "",
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

  async function handleSignUp(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            userName: formData.userName,
          },
        },
      });
      if (error) throw error;
      alert("Successfully signed up");
      navigate("/login"); // Navigate to the login page on successful signup
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
        <h2>Sign Up</h2>
        <form onSubmit={handleSignUp}>
          <div className="form-group">
            <input
              placeholder="Username"
              name="userName"
              onChange={handleChange}
            />
          </div>
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
          <button type="submit">Sign Up</button>
        </form>
        <p>
          Already have an account? <Link to="/login">Login</Link>.
        </p>
      </div>
    </div>
  );
};

export default SignUp;