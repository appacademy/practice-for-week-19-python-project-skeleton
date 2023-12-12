import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { createRestaurantImage, deleteRestaurantImage, loadRestaurantDetails, loadRestaurants } from "../../store/restaurants";
import "../UpdateReview/UpdateReview.css";
import { useModal } from "../../context/Modal";
import DetailsModalButton from "../OpenModalButton/indexv4";
import DeleteReviewImgForm from "../DeleteReviewImg";

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
        <div className="create-review-container">
            <h2 className="create-review-title">Alter your image below!</h2>
            <form onSubmit={handleSubmit} encType="multipart/form-data">

                <div className="images-master-parent">
                    <div className="form-row-images">
                        {errors.images && (
                            <span className="create-review-image-error">⚠︎ {errors.images}</span>
                        )}
                        <div className="review-url-container">
                            <img src={resImage?.url} />
                            <label className="create-image-label">
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
                            </label>
                        </div>
                    </div>
                </div>
                <button
                    type="submit"
                    className="create-review-submit-button"
                    disabled={submitted}
                >
                    Update Image
                </button>
                <button onClick={() => closeModal()}>Cancel</button>
                {(imageLoading) && <p>Loading...</p>}
            </form>
        </div>
    );
}

export default UpdateResImgFunc;
