import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { loadRestaurantDetails } from "../../store/restaurants";
import { useModal } from "../../context/Modal";
import DeleteResImgForm from "../DeleteResImg";
import DetailsModalButton from "../OpenModalButton/indexv4";
import UpdateResImgFunc from "../UpdateResImages";
import "../UpdateReview/UpdateReview.css";


function ManageResImgFunc({ resImages, name, restaurantId }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const restaurant = useSelector((state) => state?.restaurant[restaurantId]);
    const history = useHistory();

    console.log(restaurantId)

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
                                buttonText="Update Photo"
                                modalComponent={
                                    <UpdateResImgFunc
                                        resImage={image}
                                        restaurantId={restaurantId}
                                    />
                                }
                            />
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

export default ManageResImgFunc;
