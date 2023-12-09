import React from "react";
import { useDispatch } from "react-redux";
import { loadRestaurantDetails, deleteRestaurantImage, loadRestaurants } from "../../store/restaurants";
import { useModal } from "../../context/Modal";
import { useHistory, useParams } from "react-router-dom"

const DeleteResImgForm = ({ resImgId }) => {
    const dispatch = useDispatch();
    const { closeModal } = useModal()
    const { restaurantId } = useParams()
    const history = useHistory()


    const handleDelete = () => {
        const deletedImg = dispatch(deleteRestaurantImage(resImgId));
        if (deletedImg) {
            dispatch(loadRestaurantDetails(restaurantId))
            dispatch(loadRestaurants(0, 0, 0))
            closeModal()

        }
    };

    return (
        <div className="delete-container">
            <h2 className="borp">Confirm Delete</h2>
            <p className="delete-text">
                Are you sure you want to remove this image?
            </p>
            <div className="button57-container">
                <button className="yes-button1" onClick={() => handleDelete()}>YES (Delete Image)</button>
                <button className="no-button1" onClick={() => closeModal()}>
                    NO (Keep Image)
                </button>
            </div>
        </div>
    );
};

export default DeleteResImgForm;
