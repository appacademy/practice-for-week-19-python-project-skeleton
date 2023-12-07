import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { createReviewImage, fetchReviews, deleteReviewImage } from "../../store/reviews";
import "../UpdateReview/UpdateReview.css";
import DetailsModalButton from "../OpenModalButton/indexv4";
import DeleteReviewImgForm from "../DeleteReviewImg";

function UpdateReviewImgFunc() {
    const dispatch = useDispatch();
    const { restaurantId, reviewId } = useParams();
    const currentReview = useSelector((state) => state?.reviews[reviewId]);
    const [image, setImage] = useState("");
    const [imageLoading, setImageLoading] = useState(false)
    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const history = useHistory();
    const [url, setUrl] = useState("")
    const [changed, setChanged] = useState(false)


    useEffect(() => {
        dispatch(fetchReviews());
        if (currentReview?.images[0]) {
            setUrl(currentReview?.images[0].url)
        }
    }, [dispatch]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setErrors(errors);
        if (Object.values(errors).length === 0) {
            setSubmitted(true);

            if (currentReview?.images[0]) {
                if (changed == false) {
                    history.push(`/restaurants/${restaurantId}`);
                } else {
                    const deletedImg = dispatch(deleteReviewImage(currentReview?.images[0].id))
                    if (deletedImg) {
                        try {
                            const formData = new FormData();
                            formData.append("url", url)
                            setImageLoading(true)
                            await dispatch(createReviewImage(formData, reviewId));
                            history.push(`/restaurants/${restaurantId}`);
                        } catch (error) {
                            console.error("Error creating review:", error);
                            if (error instanceof Response) {
                                const responseJson = await error.json();
                                console.error("Server response:", responseJson);
                            }
                        }
                    }
                }
            } else {
                try {
                    const formData = new FormData();
                    formData.append("url", image)
                    setImageLoading(true)
                    await dispatch(createReviewImage(formData, reviewId));
                    history.push(`/restaurants/${restaurantId}`);
                } catch (error) {
                    console.error("Error creating review:", error);
                    if (error instanceof Response) {
                        const responseJson = await error.json();
                        console.error("Server response:", responseJson);
                    }
                }
            }
        }
    };

    return (
        <div className="create-review-container">
            <h2 className="create-review-title">Alter your images below!</h2>
            <form onSubmit={handleSubmit} encType="multipart/form-data">

                <div className="images-master-parent">
                    <div className="form-row-images">
                        {errors.images && (
                            <span className="create-review-image-error">⚠︎ {errors.images}</span>
                        )}
                        {currentReview?.images[0] && (
                            <div className="review-url-container">
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
                        )}
                    </div>
                    {!currentReview?.images[0] && (
                        <div className="review-url-container">
                            <label className="create-image-label">
                                <input
                                    type="file"
                                    accept="image/png, image/jpeg, image/jpg"
                                    placeholder="Image URL"
                                    onChange={(e) => {
                                        setImage(e.target.files[0])
                                    }}
                                    className="create-image-input"
                                // multiple="true"
                                />
                            </label>
                        </div>
                    )}

                </div>
                <button
                    type="submit"
                    className="create-review-submit-button"
                    disabled={submitted}
                >
                    Update Image
                </button>
                {(imageLoading) && <p>Loading...</p>}
            </form>
            {currentReview?.images[0] && (
                <DetailsModalButton
                    buttonText="Delete Image"
                    modalComponent={
                        <DeleteReviewImgForm
                            reviewImgId={currentReview?.images[0].id}
                            restaurantId={
                                restaurantId
                            }
                        />
                    }
                />
            )}
        </div>
    );
}

export default UpdateReviewImgFunc;
