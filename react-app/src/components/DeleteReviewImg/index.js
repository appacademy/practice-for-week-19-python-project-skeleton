import React from "react";
import { useDispatch } from "react-redux";
import { deleteReviewImage, fetchReviews } from "../../store/reviews";
import { loadRestaurantDetails } from "../../store/restaurants";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom";

const DeleteReviewImgForm = ({ reviewImgId, restaurantId }) => {
	const dispatch = useDispatch();
	const { closeModal } = useModal();
	const history = useHistory();

	const handleDelete = async () => {
		try {
			await dispatch(deleteReviewImage(reviewImgId));
			closeModal();
			dispatch(fetchReviews());
			dispatch(loadRestaurantDetails(restaurantId));
			// Only navigate if deletion was successful
			history.push(`/restaurants/${restaurantId}`);
		} catch (error) {
			console.error("Error deleting review image:", error);
			closeModal();
		}
	};

	return (
		<div className="delete-container">
			<h2 className="borp">Confirm Delete</h2>
			<p className="delete-text">
				Are you sure you want to remove this image?
			</p>
			<div className="button57-container">
				<button className="yes-button1" onClick={() => handleDelete()}>
					YES (Delete Image)
				</button>
				<button className="no-button1" onClick={() => closeModal()}>
					NO (Keep Image)
				</button>
			</div>
		</div>
	);
};

export default DeleteReviewImgForm;
