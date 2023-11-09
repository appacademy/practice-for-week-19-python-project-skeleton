import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { useParams } from "react-router-dom";
import { loadRestaurantDetails } from "../../store/restaurants";
import "./GetAllImages.css";


function ImagesFormModal({ images, name }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const { restaurantId } = useParams()

    return (
        <div id="images-modal-container">
            <div id="modal-res-name">
                <div className="img-header-cont">
                    Photos for {name}
                    <button onClick={closeModal}>x</button>
                </div>
                <div id="imgs-url-container">
                    {images.map((image) => (
                        <img id="modal-img-tile" src={image} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ImagesFormModal
