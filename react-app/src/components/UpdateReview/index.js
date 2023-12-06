import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { updateReview, fetchReviews } from "../../store/reviews";
import "../UpdateReview/UpdateReview.css";

function UpdateReviewFunc() {
	const dispatch = useDispatch();
	const { restaurantId, reviewId } = useParams();
	const currentReview = useSelector((state) => state?.reviews[reviewId]);
	const history = useHistory();
	const [review, setReview] = useState(currentReview?.review);
	const [stars, setStars] = useState(currentReview?.stars);
	const [errors, setErrors] = useState({});
	const [submitted, setSubmitted] = useState(false);

	useEffect(() => {
		dispatch(fetchReviews());
	}, [dispatch]);

	const handleSubmit = async (e) => {
		e.preventDefault();

		const errors = {};
		if (review.length < 10)
			errors.review = "Review text must be greater than 10 characters.";
		if (review.length > 250)
			errors.review = "Review text must be 250 characters or less.";
		if (!stars) errors.stars = "Star rating is required";
		if (stars > 5 || stars < 1)
			errors.stars = "Star rating must be between 1 and 5! ";
		setErrors(errors);

		if (Object.values(errors).length === 0) {
			setSubmitted(true);
			const reviewData = {
				review,
				stars,
			};

			try {
				await dispatch(
					updateReview(restaurantId, reviewId, reviewData)
				).then(async () => {
					await dispatch(fetchReviews());
					history.push(`/restaurants/${restaurantId}`);
				});
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
			<h2 className="create-review-title">Alter your review below!</h2>
			<form onSubmit={handleSubmit}>
				<div className="review-content-main">
					<div className="form-row-stars-rating-container">
						<div className="stars-container">
							<div className="rating">
								<div className="stars">
									<span className="stars-text">
										Select your rating
									</span>
									{[5, 4, 3, 2, 1].map((star) => (
										<div
											key={star}
											className={`star ${
												star <= stars ? "filled" : ""
											}`}
											onClick={() => setStars(star)}
										>
											<i
												id="review-star-actl"
												className="fa-solid fa-star"
											></i>
										</div>
									))}
								</div>
							</div>
							<div className="things-to-consider-container">
								<span className="things-to-consider-text">
									A few things to consider in your review
								</span>
								<span className="things-to-consider-categories-food">
									Food
								</span>
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
					<br />
					<button
						type="submit"
						className="create-review-submit-button"
						disabled={submitted}
					>
						Update Review
					</button>
				</div>
			</form>
		</div>
	);
}

export default UpdateReviewFunc;
