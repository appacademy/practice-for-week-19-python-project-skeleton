import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { createReview } from "../../store/reviews";
import { createReviewImage } from "../../store/reviews";
import "./ReviewModal.css";

function ReviewModal() {
  const dispatch = useDispatch();
  const { restaurantId } = useParams();
  const history = useHistory();
  const [review, setReview] = useState("");
  const [stars, setStars] = useState();
  const [image, setImage] = useState("");
  const [imageLoading, setImageLoading] = useState(false)
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = {};
    if (review.length < 10)
      errors.review = "Review text must be greater than 10 characters!";
    if (review.length > 250)
      errors.review = "Review text must be 250 characters or less!";
    if (!stars) errors.stars = "Star rating is required!";
    if (stars > 5 || stars < 1)
      errors.stars = "Star rating must be between 1 and 5! ";
    // if (images[0] || images[1]) {
    //   if (!images[0].match(/\.(png|jpe?g)$/) || !images[0]) {
    //     errors.images = "Image URL must end in .png, .jpg, or .jpeg!";
    //   }
    // }
    setErrors(errors);

    if (Object.values(errors).length === 0) {
      setSubmitted(true);
      const reviewDatas = {
        review,
        stars,
      };

      try {
        const createdReview = await dispatch(
          createReview(restaurantId, reviewDatas)
        );
        console.log(createdReview)
        if (createdReview) {
          const reviewId = createdReview.id;
          const formData = new FormData();
          formData.append("url", image)
          setImageLoading(true)
          await dispatch(createReviewImage(formData, reviewId));
          history.push(`/restaurants/${restaurantId}`);
        }
      } catch (error) {
        console.error("Error creating review:", error);
        if (error instanceof Response) {
          const responseJson = await error.json();
          console.error("Server response:", responseJson);
        }
      }
    }
  };

  return (
    <div className="create-review-container">
      <h2 className="create-review-title">Tell us about your visit!</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="review-content-main">
          <div className="form-row-stars-rating-container">
            <div className="stars-container">
              <div className="rating">
                <div className="stars">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className={`star ${star <= stars ? "filled" : ""}`}
                      onClick={() => setStars(star)}
                    >
                      🌭
                    </span>
                  ))}
                  <span className="stars-text">Select your rating</span>
                </div>
              </div>
              <div className="things-to-consider-container">
                <span className="things-to-consider-text">
                  A few things to consider in your review
                </span>
                <span className="things-to-consider-categories-food">Food</span>
                <span className="things-to-consider-categories-service">
                  Service
                </span>
                <span className="things-to-consider-categories-ambience">
                  Ambience
                </span>
              </div>
            </div>
            <label className="create-review-label">
              <textarea
                type="text"
                value={review}
                placeholder="Type review here..."
                onChange={(e) => setReview(e.target.value)}
                className="create-review-input"
              />
            </label>
          </div>
          <div className="all-errors-reviews">
            {errors.review && (
              <div className="create-review-error-div">
                <span className="create-review-error-text">
                  ⚠︎ {errors.review}
                </span>
              </div>
            )}
            {errors.stars && (
              <div className="create-review-error-div">
                <span className="create-stars-error-text">
                  ⚠︎ {errors.stars}
                </span>
              </div>
            )}
          </div>
          <div className="images-master-parent">
            <div className="form-row-images">
              {errors.images && (
                <span className="create-review-image-error">⚠︎ {errors.images}</span>
              )}

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
            </div>
          </div>
          <br />
          <button
            type="submit"
            className="create-review-submit-button"
            disabled={submitted}
          >
            Post Review
          </button>
          {(imageLoading) && <p>Loading...</p>}
        </div>
      </form>
    </div>
  );
}

export default ReviewModal;
