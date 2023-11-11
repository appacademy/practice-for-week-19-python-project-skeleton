import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import SignupFormModal from "../SignupFormModal";
import "./LoginForm.css";
import RegisterModalButton from "../OpenModalButton/indexv2";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    } else {
        closeModal()
    }
  };

  const demoLogin = () => {
    setEmail('demo@aa.io')
    setPassword('password')
  }

  return (
    <div className="login-container-modal">
        <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'></link>
        <img className="home-button" src="https://cdn.discordapp.com/attachments/1115823811116400650/1173012826823081994/welplogoblue.png?ex=65626853&is=654ff353&hm=8b8f03c5f6ae31ebecc250d240b6aacfbc65fd5e8e5a018851bffa6f935e8b86&"></img>
      <h2>User Log In</h2>
      <p>Access your Welp account</p>
      <form onSubmit={handleSubmit} id="login-container-form">
        <ul id="login-errors">
          {errors.map((error, idx) => (
            <li key={idx}>* {error}</li>
          ))}
        </ul>
        <label className="username-field">
          <input
            placeholder="Email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

        </label>
        <label className="password-field">
          <input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

        </label>
        <button type="submit" className="login-for-modal" disabled={password.length < 6}>Log In</button>
        <button className="demo-button" onClick={demoLogin}>Log in as demo user</button>
        <div className="no-account-register">
          <p>Don't have an account?<a><RegisterModalButton
              className='register-button'
              buttonText="Sign Up"
              modalComponent={<SignupFormModal />}
            /></a>here</p>
        </div>
      </form>
    </div>
  );
}

export default LoginFormModal;
