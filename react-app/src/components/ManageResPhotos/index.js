import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { loadRestaurantDetails } from "../../store/restaurants";
import { useModal } from "../../context/Modal";
import DeleteResImgForm from "../DeleteResImg";
import DetailsModalButton from "../OpenModalButton/indexv4";
import "../UpdateReview/UpdateReview.css";


function UpdateResImgFunc({ resImages, name }) {
    const dispatch = useDispatch();
    const { restaurantId } = useParams();
    const { closeModal } = useModal();
    const restaurant = useSelector((state) => state?.restaurant[restaurantId]);
    const history = useHistory();


    return (
        <div id="images-modal-container">
            <div id="modal-res-name">
                <div className="img-header-cont">
                    {name}'s Photos
                    <button onClick={closeModal}>x</button>
                </div>
                <div id="imgs-url-container">
                    {resImages.map((image) => (
                        <div>
                            <img id="modal-img-tile" src={image.url} />
                            <DetailsModalButton
                                buttonText="Delete Photo"
                                modalComponent={
                                    <DeleteResImgForm
                                        resImgId={image.id}
                                    />
                                }
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default UpdateResImgFunc;
