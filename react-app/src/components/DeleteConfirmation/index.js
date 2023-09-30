import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';
import { deleteRestaurant } from "../../store/restaurants";
import "./DeleteForm.css"
import { loadRestaurantDetails } from "../../store/restaurants";
import { useModal } from "../../context/Modal";


const DeleteForm = ({ restaurantId }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { closeModal } = useModal()






    const handleDelete = () => {
        const deletedRestaurant = dispatch(deleteRestaurant(restaurantId))
        if (deletedRestaurant) {
            dispatch(loadRestaurantDetails(restaurantId))
            closeModal()
            history.push('/')
        }
    }

    return (
        <div className="delete-container">
            <h2 className="borp">Confirm Delete</h2>
            <p className="delete-text">Are you sure you want to remove this restaurant?</p>
            <div className="button57-container">
                <button className="yes-button1" onClick={() => handleDelete()}>YES (Delete Restaurant)</button>
                <button className="no-button1" onClick={() => closeModal()}>NO (Keep Restaurant)</button>
            </div>
        </div>
    )
}

export default DeleteForm;
