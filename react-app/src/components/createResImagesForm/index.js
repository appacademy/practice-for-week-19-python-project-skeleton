import React, { useState, useContext } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { createRestaurantImage } from "../../store/restaurants";
import "../createResImagesForm/createResImagesForm.css"
import { useModal } from "../../context/Modal";
import { loadRestaurantDetails } from "../../store/restaurants";

function CreateRestaurantImage({ restaurantId }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal()
    const history = useHistory();
    const [images, setImages] = useState(["", "", "", ""]);
    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const errors = {};
        if (images.length > 0) {
            if (!images[0].match(/\.(png|jpe?g)$/) || !images[0]) {
                errors.images = "Image URL must end in .png, .jpg, or .jpeg!";
            }
        }
        if (!images[0].length) {
            errors.images = "Add at least one Image URL"
        }
        setErrors(errors);

        if (Object.values(errors).length === 0) {
            setSubmitted(true);

            try {
                images?.forEach(async (url) => {
                    if (url) {
                        let payload = {
                            url: url,
                        };
                        await dispatch(createRestaurantImage(restaurantId, payload));
                    }
                    await dispatch(loadRestaurantDetails(restaurantId))
                    closeModal()
                });
            } catch (error) {
                console.error("Error creating Image:", error);
                if (error instanceof Response) {
                    const responseJson = await error.json();
                    console.error("Server response:", responseJson);
                }
            }
        }
    };

    return (
        <div id="create-images-form-modal">
            <h2 className="create-review-title">Add Photos to Your Restaurant</h2>
            <form onSubmit={handleSubmit}>
                <div className="review-content-main">
                    <div className="images-master-parent">
                        {images.map((url, index) => (
                            <div key={index} className="form-row-images">
                                {index === 0 && errors.images && (
                                    <span className="create-review-image-error">⚠︎ {errors.images}</span>
                                )}

                                <div className="review-url-container">
                                    <label className="create-image-label">
                                        <input
                                            type="text"
                                            value={url}
                                            placeholder="Image URL"
                                            onChange={(e) => {
                                                const newImages = [...images];
                                                newImages[index] = e.target.value;
                                                setImages(newImages);
                                            }}
                                            className="create-image-input"
                                        />
                                    </label>
                                </div>
                            </div>
                        ))}
                    </div>
                    <br />
                    <button
                        type="submit"
                        className="add-photos-submit-button"
                        disabled={submitted}
                    >
                        Add Photos
                    </button>
                </div>
            </form>
        </div>
    );
}

export default CreateRestaurantImage;
