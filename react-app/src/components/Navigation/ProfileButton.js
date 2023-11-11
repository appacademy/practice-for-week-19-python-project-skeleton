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
      <i id="profile-icon"  class="fa-solid fa-user"></i>
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
