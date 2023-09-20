import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import LoginFormModal from "../LoginFormModal";
import RegisterModalButton from "../OpenModalButton/indexv2";
import "./SignupForm.css";

function SignupFormModal() {
	const dispatch = useDispatch();
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errors, setErrors] = useState([]);
	const { closeModal } = useModal();

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (password === confirmPassword) {
			const data = await dispatch(signUp(username, email, password));
			if (data) {
				setErrors(data);
			} else {
				closeModal();
			}
		} else {
			setErrors([
				"Confirm Password field must be the same as the Password field",
			]);
		}
	};

	return (
		<div className="signup-container-modal">
			<h1>Sign Up</h1>
			<form onSubmit={handleSubmit}>
				<ul>
					{errors.map((error, idx) => (
						<li key={idx}>{error}</li>
					))}
				</ul>
				<div className="input-fields">
				<label className="email-input-field">

					<input
						placeholder="Email"
						type="text"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
				</label>
				<label className="password-input-field">

				<input
					placeholder="Password"
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
							required
						/>
				</label>
				<label className="username-input-field">

					<input
					placeholder="Username"
						type="text"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						required
					/>
				</label>
				<label className="confirm-password-input-field">

					<input
					placeholder="Confirm Password"
						type="password"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						required
					/>
				</label>
				</div>
				<button type="submit" className="login-for-modal">Sign Up</button>
				<div className="existing-account-button">
					<p>Already have an account? <a><RegisterModalButton
              className="login-button"
              buttonText="Log In"
              modalComponent={<LoginFormModal />}
            /></a></p>
				</div>
			</form>
		</div>
	);
}

export default SignupFormModal;
