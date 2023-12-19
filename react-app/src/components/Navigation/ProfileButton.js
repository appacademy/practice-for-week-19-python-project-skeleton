import React, { useRef, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import "./Navigation.css";

function ProfileButton({ user }) {
	const dispatch = useDispatch();
	const ulRef = useRef();

	const [currentDateTime, setCurrentDateTime] = useState(new Date());

	useEffect(() => {
		const intervalId = setInterval(() => {
			setCurrentDateTime(new Date());
		}, 1000);

		return () => {
			clearInterval(intervalId);
		};
	}, []);

	function getFormattedDate(date) {
		const options = {
			year: "numeric",
			month: "long",
			day: "numeric",
		};
		return date.toLocaleDateString(undefined, options);
	}

	function getFormattedTime(date) {
		const hours = date.getHours();
		const minutes = date.getMinutes();
		const seconds = date.getSeconds();

		const amOrPm = hours >= 12 ? "PM" : "AM";
		const formattedHours = hours % 12 || 12;

		return `${formattedHours}:${minutes < 10 ? "0" : ""}${minutes}:${
			seconds < 10 ? "0" : ""
		}${seconds} ${amOrPm}`;
	}

	function setActiveClass(e) {
		const ulDiv = document.getElementsByClassName("profile-dropdown")[0];
		const ulClasses = ulDiv.classList;
		e.preventDefault();
		ulClasses.toggle("hidden");
	}

	const handleLogout = (e) => {
		e.preventDefault();
		dispatch(logout());
	};

	return (
		<div>
			<button className="profile-button" onClick={setActiveClass}>
				<i id="profile-icon" class="fa-solid fa-user"></i>
			</button>
			<ul className="profile-dropdown hidden" ref={ulRef}>
				{user ? (
					<div>
						<div className="welcome-msg-container">
							<div className="profile-icon-container-dropdown">
								<i
									id="profile-icon-dropdown"
									class="fa-solid fa-user"
								></i>
							</div>
							<div className="hello-user-msg-container">
								Hello, {user.username}.
							</div>
						</div>
						<div className="date-time-container">
							<div>It is currently,</div>
							<div className="date-time-only">
								<span className="date-nav">
									{getFormattedDate(currentDateTime)},
								</span>
								<span className="time-nav">
									{getFormattedTime(currentDateTime)}.
								</span>
							</div>
						</div>
						<div className="profile-dropdown-options-container">
							<div>Would you like to, </div>
							<div className="profile-dropdown-navlink-container">
								<NavLink
									id="create-restaurant-button-dropdown"
									to="/restaurants/new"
								>
									<div
										id="food-symbol-profile-dropdown"
										className="material-symbols-outlined"
									>
										fastfood
									</div>
									Create a restaurant
								</NavLink>
							</div>
						</div>
						<div className="logout-btn-container-profile-dropdown">
							<button
								onClick={handleLogout}
								className="homepage-logout-button"
							>
								Log Out
							</button>
						</div>
					</div>
				) : (
					<div className="login-signup-buttons">
            <div id="welcome-text">👋 Welcome.</div>
						<div className="profile-dropdown-login-out-btns">
							<OpenModalButton
								className="login-button"
								buttonText="Log In"
								modalComponent={<LoginFormModal />}
							/>
						</div>
						<div className="profile-dropdown-login-out-btns">
							<OpenModalButton
								buttonText="Sign Up"
								modalComponent={<SignupFormModal />}
							/>
						</div>
					</div>
				)}
			</ul>
		</div>
	);
}

export default ProfileButton;
