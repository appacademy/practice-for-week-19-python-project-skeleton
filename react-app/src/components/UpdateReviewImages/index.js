import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import {
	createReviewImage,
	fetchReviews,
	deleteReviewImage,
} from "../../store/reviews";
import "../UpdateReview/UpdateReview.css";
import DetailsModalButton from "../OpenModalButton/indexv4";
import DeleteReviewImgForm from "../DeleteReviewImg";
import "./UpdateReviewImages.css";

function UpdateReviewImgFunc() {
	const dispatch = useDispatch();
	const { restaurantId, reviewId } = useParams();
	const currentReview = useSelector((state) => state?.reviews[reviewId]);
	const [image, setImage] = useState("");
	const [displayImage, setDisplayImage] = useState(null);
	const [imageLoading, setImageLoading] = useState(false);
	const [errors, setErrors] = useState({});
	const [submitted, setSubmitted] = useState(false);
	const history = useHistory();
	const [url, setUrl] = useState("");
	const [changed, setChanged] = useState(false);

	useEffect(() => {
		dispatch(fetchReviews());
		if (currentReview?.images.length > 0) {
			setUrl(currentReview?.images[0].url);
		}
	}, [dispatch]);

	console.log("THIS IS URL", url);
	console.log("THIS IS IMAGE!", image);

	const handleFileChange = (e) => {
		const file = e.target.files[0];

		if (file) {
			setImage(file);
			const fileUrl = URL.createObjectURL(file);
			setDisplayImage(fileUrl);
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const errors = {};
		if (url?.name) {
			if (!url.type.match(/^image\/(png|jpe?g)$/i) || !url.name) {
				errors.images = "Image URL must end in .png, .jpg, or .jpeg!";
			}
		}
		if (image) {
			if (!image.type.match(/^image\/(png|jpe?g)$/i) || !image.name) {
				errors.images = "Image URL must end in .png, .jpg, or .jpeg!";
			}
		}
		setErrors(errors);

		if (Object.values(errors).length === 0) {
			setSubmitted(true);

			if (currentReview?.images[0]) {
				if (changed === false) {
					history.push(`/restaurants/${restaurantId}`);
				} else {
					const deletedImg = dispatch(
						deleteReviewImage(currentReview?.images[0].id)
					);
					if (deletedImg) {
						try {
							const formData = new FormData();
							formData.append("url", url);
							setImageLoading(true);
							await dispatch(
								createReviewImage(formData, reviewId)
							);
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
					formData.append("url", image);
					setImageLoading(true);
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
		<div className="update-review-image-container">
			<h2 className="update-review-image-title">
				Alter your images below!
			</h2>
			<form
				onSubmit={(e) => handleSubmit(e)}
				encType="multipart/form-data"
			>
				<div className="images-master-parent">
					<div className="form-row-images">
						{currentReview?.images.length > 0 && (
							<div className="review-url-container">
								<div className="current-img-container-update-img">
									<div id="current-img-txt">
										Current Image
									</div>
									<img
										id="current-img-update-img"
										src={currentReview?.images[0].url}
									/>
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
												placeholder="Image URL"
												onChange={(e) => {
													setUrl(e.target.files[0]);
													setChanged(true);
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
						)}
					</div>
					{currentReview?.images.length === 0 && (
						<div className="review-url-container">
							{displayImage && (
								<div className="current-img-container-update-img">
									<div id="current-img-txt">
										Selected Image
									</div>
									<img
										id="current-img-update-img"
										src={displayImage}
									/>
								</div>
							)}
							<div className="attch-photos-txt">
								Attach an image
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
											placeholder="Image URL"
											onChange={(e) => {
												handleFileChange(e);
											}}
											className="create-image-input"
											// multiple="true"
										/>
										{image?.name && (
											<div id="image-name">
												Selected files: {image?.name}
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
					)}
					<div className="update-img-btn-container">
						<button
							type="submit"
							className="update-review-image-button"
							disabled={submitted}
						>
							Update Image
						</button>
						{currentReview?.images.length > 0 && (
							<div className="delete-update-img-btn-container">
								<DetailsModalButton
									type="button"
									buttonText="Delete Image"
									modalComponent={
										<DeleteReviewImgForm
											reviewImgId={
												currentReview?.images[0].id
											}
											restaurantId={restaurantId}
										/>
									}
								/>
							</div>
						)}
						<button
							id="cancel-btn"
							onClick={() => {
								history.push(`/restaurants/${restaurantId}`);
							}}
						>
							Cancel
						</button>
					</div>
					{imageLoading && <p>Loading...</p>}
				</div>
			</form>
		</div>
	);
}

export default UpdateReviewImgFunc;
