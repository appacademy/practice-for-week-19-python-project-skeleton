import React, { useState, useEffect } from "react";
import { useDispatch, useSelector} from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { updateReview, fetchReviews } from "../../store/reviews";

function UpdateReviewFunc() {
  const dispatch = useDispatch();
  const { restaurantId, reviewId } = useParams();
  const currentReview = useSelector((state) => state?.reviews[reviewId]);
  const history = useHistory();
  const [review, setReview] = useState(currentReview?.review);
  const [stars, setStars] = useState(currentReview?.stars);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(fetchReviews());
    console.log("THIS IS CURRENT REVIEW!", currentReview);
  }, [dispatch]);

  useEffect(() => {
      const validationErrors = {};
      if (!review) validationErrors.review = "Review text is required";
      if (!stars) validationErrors.stars = "Star rating is required";
      setErrors(validationErrors);
  }, [review, stars]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const reviewData = {
      review,
      stars,
    };
        await dispatch(updateReview(restaurantId, reviewId, reviewData))
            .then(async ()  => {
                await dispatch(fetchReviews());
                history.push(`/restaurants/${restaurantId}`)
                console.log("THIS IS CURRENT REVIEW2!", currentReview);
            })
            .catch((errors) => console.error(errors))
  };

  return (
    <div className="create-spot-container">
      <h1 className="createSpot-title">Create a new review</h1>
      <h2 className="createSpot-subtitle">Tell us about your visit!</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          {errors.review && (
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
          {errors.stars && (
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
        <br />
        <button type="submit" className="createSpot-submit-button">
          Update Review
        </button>
      </form>
    </div>
  );
}

export default UpdateReviewFunc;
