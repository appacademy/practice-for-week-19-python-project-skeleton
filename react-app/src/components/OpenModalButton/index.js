import React from 'react';
import { useModal } from '../../context/Modal';
import './modal-button.css'

function setActiveClass(e) {
  const ulDiv = document.getElementsByClassName("profile-dropdown")[0];
  const ulClasses = ulDiv.classList
  ulClasses.toggle('hidden')
}

function OpenModalButton({
  modalComponent, // component to render inside the modal
  buttonText, // text of the button that opens the modal
  onButtonClick, // optional: callback function that will be called once the button that opens the modal is clicked
  onModalClose // optional: callback function that will be called once the modal is closed
}) {
  const { setModalContent, setOnModalClose } = useModal();

  const onClick = () => {
    if (onModalClose) setOnModalClose(onModalClose);
    setModalContent(modalComponent);
    setActiveClass()
    if (onButtonClick) onButtonClick();
  };

  return (
    <button className="modal-button" onClick={onClick}>{buttonText}</button>
  );
}

export default OpenModalButton;
