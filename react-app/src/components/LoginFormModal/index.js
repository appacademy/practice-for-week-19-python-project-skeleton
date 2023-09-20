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

  return (
    <div className="login-container-modal">
        <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'></link>
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <label className="username-field">
          <input
            placeholder="Username"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <i class='bx bxs-user-circle'></i>
        </label>
        <label className="password-field">
          <input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <i class='bx bxs-lock' ></i>
        </label>
        <button type="submit" className="login-for-modal">Log In</button>

        <div className="no-account-register">
          <p>Don't have an account? <a><RegisterModalButton
              className='register-button'
              buttonText="Register"
              modalComponent={<SignupFormModal />}
            /></a></p>
        </div>
      </form>
    </div>
  );
}

export default LoginFormModal;
