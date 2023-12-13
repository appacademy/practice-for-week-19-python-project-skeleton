import React from "react";
import { useModal } from "../../context/Modal";
import "./modal-button.css";

function DetailsModalButton({
	modalComponent, // component to render inside the modal
	buttonText, // text of the button that opens the modal
	onButtonClick, // optional: callback function that will be called once the button that opens the modal is clicked
	onModalClose, // optional: callback function that will be called once the modal is closed
}) {
	const { setModalContent, setOnModalClose } = useModal();

	const onClick = (e) => {
		e.preventDefault();
		if (onModalClose) setOnModalClose(onModalClose);
		setModalContent(modalComponent);
		if (onButtonClick) onButtonClick();
	};

	return (
		<button className="modal-button" onClick={(e) => onClick(e)}>
			{buttonText}
		</button>
	);
}

export default DetailsModalButton;
