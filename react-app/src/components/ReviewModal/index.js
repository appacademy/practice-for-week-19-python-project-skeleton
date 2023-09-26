import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom"
import { createReview } from "../../store/reviews";
import { createReviewImage } from "../../store/reviews";

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
      if (images) {
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

    try {
      const review = await dispatch(createReview(restaurantId, review, stars));
      const reviewId = review.id;
      if (review) {
        images.forEach(async (url) => {
          if (url) {
            await dispatch(createReviewImage(reviewId, { url: url }));
          }
        });
        history.push(`/restaurants/${restaurantId}`);
      }
    } catch (error) {
      console.error("Error creating spot:", error);
      if (error instanceof Response) {
        const responseJson = await error.json();
        console.error("Server response:", responseJson);
      }
    }
  };

  return (
    <div>
      <h1>Hello!</h1>
    </div>
  );
}

export default ReviewModal;
