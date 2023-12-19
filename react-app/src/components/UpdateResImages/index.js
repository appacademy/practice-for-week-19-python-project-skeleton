import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { createRestaurantImage, deleteRestaurantImage, loadRestaurantDetails, loadRestaurants } from "../../store/restaurants";
import "../UpdateReview/UpdateReview.css";
import { useModal } from "../../context/Modal";
import DetailsModalButton from "../OpenModalButton/indexv4";
import DeleteReviewImgForm from "../DeleteReviewImg";
import "./UpdateResImages.css"

function UpdateResImgFunc({ restaurantId, resImage }) {
    const dispatch = useDispatch();
    const [imageLoading, setImageLoading] = useState(false)
    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const history = useHistory();
    const [url, setUrl] = useState(resImage?.url)
    const [changed, setChanged] = useState(false)
    const { closeModal } = useModal()

    console.log(restaurantId, resImage)
    const handleSubmit = async (e) => {
        e.preventDefault();

        const errors = {};
        if (url?.name) {
            if (!url.type.match(/^image\/(png|jpe?g)$/i) || !url.name) {
                errors.images = "Image URL must end in .png, .jpg, or .jpeg!";
            }
        }

        setErrors(errors);
        if (Object.values(errors).length === 0) {
            setSubmitted(true);

            if (changed == false) {
                closeModal();
            } else {
                const deletedImg = dispatch(deleteRestaurantImage(resImage?.id))
                if (deletedImg) {
                    try {
                        const formData = new FormData();
                        formData.append("url", url)
                        setImageLoading(true)
                        await dispatch(createRestaurantImage(formData, restaurantId))
                        dispatch(loadRestaurantDetails(restaurantId))
                        dispatch(loadRestaurants(0, 0, 0));
                        closeModal();
                    } catch (error) {
                        console.error("Error creating review:", error);
                        if (error instanceof Response) {
                            const responseJson = await error.json();
                            console.error("Server response:", responseJson);
                        }
                    }
                }
            }
        }
    };

    return (
        <div className="update-review-image-container2">
            <h2 className="update-review-image-title">Alter your image below!</h2>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="form-row-images">
                    {errors.images && (
                        <span className="create-review-image-error">⚠︎ {errors.images}</span>
                    )}
                    <div className="review-url-container">
                        <div className="current-img-container-update-img">
                            <div id="current-img-txt">
                                Current Image
                            </div>
                            <img id="current-img-update-img2" src={resImage?.url} />
                        </div>
                        <div className="attch-photos-txt">
                            Choose a new image
                        </div>
                        <label className="create-image-label">
                            <div className="upload-img-icon-container">
                                <div
                                    id="upload-image-icon"
                                    className="material-symbols-outlined"
                                >
                                    add_a_photo
                                    <input
                                        type="file"
                                        accept="image/png, image/jpeg, image/jpg"
                                        onChange={(e) => {
                                            setUrl(e.target.files[0])
                                            setChanged(true)
                                        }}
                                        className="create-image-input"
                                    // multiple="true"
                                    />
                                    {url?.name && (
                                        <div id="image-name">
                                            Selected files: {url?.name}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </label>
                        {errors.images && (
                            <span className="create-review-image-error">
                                ⚠︎ {errors.images}
                            </span>
                        )}
                    </div>
                </div>
                <div className="update-img-btn-container2">
                    <button
                        type="submit"
                        className="update-review-image-button"
                        disabled={submitted}
                    >
                        Update Image
                    </button>
                    <button id="cancel-btn" onClick={() => closeModal()}>Cancel</button>
                    {(imageLoading) && <p>Loading...</p>}
                </div>
            </form>
        </div>
    );
}

export default UpdateResImgFunc;
