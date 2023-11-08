import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import './Navigation.css';



function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const ulRef = useRef();

  function setActiveClass(e) {
    const ulDiv = document.getElementsByClassName("profile-dropdown")[0];
    const ulClasses = ulDiv.classList
    e.preventDefault()
    ulClasses.toggle('hidden')
  }


  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  return (
    <div>
      <button className='profile-button' onClick={setActiveClass}>
        <img className='profile-image' src='https://cdn.discordapp.com/attachments/1115823811116400650/1153911006939054180/gayboyjosh.png' alt="profile button"></img>
      </button>
      <ul className="profile-dropdown hidden" ref={ulRef}>
        {user ? (
          <>
            <li>{user.username}</li>
            <li>
              <button onClick={handleLogout} className="homepage-logout-button">Log Out</button>
            </li>
          </>
        ) : (
          <ul className="login-signup-buttons">
            <li>
              <OpenModalButton
                className="login-button"
                buttonText="Log In"
                modalComponent={<LoginFormModal />}
              />
            </li>
            <li>
              <OpenModalButton
                buttonText="Sign Up"
                modalComponent={<SignupFormModal />}
              />
            </li>
          </ul>
        )}
      </ul>
    </div>
  );
}

export default ProfileButton;
