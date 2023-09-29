import React from "react";
import { useDispatch } from "react-redux";
import { deleteUserReviews } from "../../store/reviews";

const DeleteReviewForm = ({ reviewId }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    const deletedReview = dispatch(deleteUserReviews(reviewId));
    if (deletedReview) {
      window.location.reload();
    }
  };

  return (
    <div className="delete-container">
      <h2 className="borp">Confirm Delete</h2>
      <p className="delete-text">
        Are you sure you want to remove this review?
      </p>
      <div className="button57-container">
        <button className="yes-button1" onClick={() => handleDelete()}>YES (Delete Review)</button>
        <button className="no-button1" onClick={() => window.location.reload()}>
          NO (Keep Review)
        </button>
      </div>
    </div>
  );
};

export default DeleteReviewForm;
