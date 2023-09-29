import React from "react";
import { useDispatch } from "react-redux";
import { deleteRestaurant } from "../../store/restaurants";
import "./DeleteForm.css"


const DeleteForm = ({ restaurantId }) => {
    const dispatch = useDispatch();





    const handleDelete = () => {
        const deletedRestaurant = dispatch(deleteRestaurant(restaurantId))
        if (deletedRestaurant) {
            window.location.reload();
        }
    }

    return (
        <div className="delete-container">
            <h2 className="borp">Confirm Delete</h2>
            <p className="delete-text">Are you sure you want to remove this restaurant?</p>
            <div className="button57-container">
                <button className="yes-button1" onClick={() => handleDelete()}>YES (Delete Restaurant)</button>
                <button className="no-button1" onClick={() => window.location.reload()}>NO (Keep Restaurant)</button>
            </div>
        </div>
    )
}

export default DeleteForm;
