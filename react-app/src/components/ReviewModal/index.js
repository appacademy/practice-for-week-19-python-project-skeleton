import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { createReview } from "../../store/reviews";
import { createReviewImage } from "../../store/reviews";
import "./ReviewModal.css";

function ReviewModal() {
  const dispatch = useDispatch();
  const { restaurantId } = useParams();
  const history = useHistory();
  const [review, setReview] = useState("");
  const [stars, setStars] = useState(0);
  const [images, setImages] = useState(["", ""]);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (submitted) {
      const validationErrors = {};
      if (!review) validationErrors.review = "Review text is required";
      if (!stars) validationErrors.stars = "Star rating is required";
      if (images.length > 0) {
        if (!images[0].match(/\.(png|jpe?g)$/) || !images[0]) {
          validationErrors.images =
            "Image URL must end in .png, .jpg, or .jpeg";
        }
      }
      setErrors(validationErrors);
    }
  }, [review, stars, images, submitted]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);

    if (Object.keys(errors).length > 0) {
      console.error("Validation errors:", errors);
      return;
    }

    const reviewDatas = {
      review,
      stars,
    };

    try {
      const createdReview = await dispatch(createReview(restaurantId, reviewDatas));
      if (createdReview) {
        const reviewId = createdReview.id;
        images?.forEach(async (url) => {
          if (url) {
            let payload = {
              "url": url
            }
            await dispatch(createReviewImage(payload, reviewId));
          }
        });
        history.push(`/restaurants/${restaurantId}`);
      }
    } catch (error) {
      console.error("Error creating review:", error);
      if (error instanceof Response) {
        const responseJson = await error.json();
        console.error("Server response:", responseJson);
      }
    }
  };

  return (
    <div className="create-spot-container">
      <h1 className="createSpot-title">Create a new review</h1>
      <h2 className="createSpot-subtitle">Tell us about your visit!</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          {submitted && errors.review && (
            <p className="create-review-error">{errors.review}</p>
          )}
          <label className="create-review-label">
            Review
            <input
              type="text"
              value={review}
              placeholder="Review Text"
              onChange={(e) => setReview(e.target.value)}
              className="create-review-input"
            />
          </label>
        </div>
        <div className="form-row">
          {submitted && errors.stars && (
            <p className="create-stars-error">{errors.stars}</p>
          )}
          <label className="createSpot-label">
            stars
            <input
              type="integer"
              value={stars}
              placeholder="Star Rating"
              onChange={(e) => setStars(e.target.value)}
              className="create-stars-input"
            />
          </label>
        </div>
        {images.map((url, index) => (
          <div key={index} className="form-row">
            {submitted && index === 0 && errors.images && (
              <p className="createSpot-error">{errors.images}</p>
            )}
            <label className="createSpot-label">
              <input
                type="text"
                value={url}
                placeholder="Image URL"
                onChange={(e) => {
                  const newImages = [...images];
                  newImages[index] = e.target.value;
                  setImages(newImages);
                }}
                className="createSpot-input"
              />
            </label>
          </div>
        ))}
        <br />
        <button type="submit" className="createSpot-submit-button">
          Create Review
        </button>
        {Object.keys(errors).length > 0}
      </form>
    </div>
  );
}

export default ReviewModal;
