import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, NavLink, Switch, useHistory } from "react-router-dom";
import reviewReducer, { fetchReviews } from "../../store/reviews";
import { loadRestaurants } from "../../store/restaurants";
import { Route } from "react-router-dom/cjs/react-router-dom.min";
import "./HomePage.css";

const HomePage = () => {
	const history = useHistory();
	const [stars, setStars] = useState();
	const sessionUser = useSelector((state) => state?.session.user);
	function getRandomNumbers(maxNumber) {
		const allNumbers = Array.from(
			{ length: maxNumber },
			(_, index) => index + 1
		);

		for (let i = allNumbers.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[allNumbers[i], allNumbers[j]] = [allNumbers[j], allNumbers[i]];
		}

		return allNumbers.slice(0, 9);
	}

	const dispatch = useDispatch();
	let restaurantObject = useSelector((state) => state.restaurant);
	let restaurantArray = Object.values(restaurantObject);
	let restaurantIterable = restaurantArray.length;
	let reviewObject = useSelector((state) => state.reviews);
	let reviewArray = Object.values(reviewObject);
	let iterable = reviewArray.length;

	let reviewId = getRandomNumbers(iterable);
	let restaurantId = getRandomNumbers(restaurantIterable);

	let array = [];
	reviewId.forEach((id) => {
		array.push(reviewArray[id - 1]);
	});

	let shuffledRestaurants = restaurantArray?.sort(() => 0.5 - Math.random());
	let arr = shuffledRestaurants?.slice(0, 6);

	useEffect(() => {
		dispatch(fetchReviews());
		dispatch(loadRestaurants(0, 0, 0));
	}, [dispatch]);
	/* <img src={review.images[0].url} /> */

	// reviewObject = Object.values(reviewObject)

	const getTooltip = (star) => {
		switch (star) {
			case 1:
				return "Not Good";
			case 2:
				return "Could've been better";
			case 3:
				return "OK";
			case 4:
				return "Good";
			case 5:
				return "Great";
			default:
				return "";
		}
	};

	const recommendationTexts = [
		"Do you recommend this business?",
		"Share what was great about it",
		"Help the community decide",
	];

	return (
		<>
			<div id="backround-image"></div>
			<div className="restaurant-container">
				<h2 id="header-text">Your Next Review Awaits</h2>
				<div className="restaurant-wrapper">
					{arr?.map((restaurant) =>
						restaurant?.owner_id !== sessionUser?.id ? (
							<div className="rec-res-container">
								<div className="single-restaurant">
									<div className="rec-img-container">
										<img
											className="rst-img-home"
											src={restaurant?.images[0]?.url}
										/>
									</div>
									<div className="rec-info-container">
										<NavLink
											id="restaurant-link"
											to={`/restaurants/${restaurant?.id}`}
										>
											<div id="rec-res-name">
												{restaurant?.name.length >= 21
													? restaurant.name.slice(
															0,
															21
													  ) + "..."
													: restaurant?.name}
											</div>
										</NavLink>
										<div>
											{
												recommendationTexts[
													Math.floor(
														Math.random() *
															recommendationTexts.length
													)
												]
											}
										</div>
										<NavLink
											id="rec-rating-navlink"
											to={`/restaurants/${restaurant?.id}/new-review`}
										>
											<div className="stars-rec">
												{[5, 4, 3, 2, 1].map((star) => (
													<div
														key={star}
														className={`star-rec ${
															star <= stars
																? "filled-rec"
																: ""
														}`}
														onClick={() =>
															setStars(star)
														}
														title={getTooltip(star)}
													>
														<i
															id="review-star-homepage-rec"
															className="fa-solid fa-star"
														></i>
													</div>
												))}
											</div>
										</NavLink>
									</div>
								</div>
							</div>
						) : null
					)}
				</div>
				<div id="more-res-btn" onClick={(e) => {e.preventDefault(); history.push("/restaurants/0/0/0")}}>See more restaurants</div>
			</div>
			<div id="reviews-wrapper">
				<h2 id="recent-activity-text">Recent Activity</h2>
				<ul className="review-wrapper">
					{array?.map((review) =>
						review?.images?.length >= 1 ? (
							<NavLink
								id="homepage-review"
								to={`/restaurants/${review?.restaurant_id}`}
							>
								<li key={review?.id} className="single-review">
									<div id="profile-header">
										<span
											id="prof-picture"
											class="material-symbols-outlined"
										>
											account_circle
										</span>
										<div id="container-username-text">
											<div id="reviewer-username-home">
												{review?.reviewer?.username}
											</div>
											<div id="filler-text-review">
												Left a review...
											</div>
										</div>
									</div>
									{review?.images?.map((image) => (
										<img
											className="homepage-image"
											src={image?.url}
											alt="review-image"
											key={image?.id}
										></img>
									))}
									{restaurantArray?.map((restaurant) =>
										restaurant?.id ===
										review?.restaurant_id ? (
											<div
												id="rst-name-in-review"
												key={restaurant?.id}
											>
												{restaurant?.name}
											</div>
										) : null
									)}
									<div id="reviewer-stars">
										{[...Array(review?.stars)].map(
											(_, i) => (
												<i
													id="review-star-homepage"
													className="fa-solid fa-star"
												></i>
											)
										)}
									</div>
									<div id="reviewer-review">
										{review?.review.length > 175 ? (
											<div>
												{review.review.slice(0, 175)}{" "}
												<span className="more-text">
													more...
												</span>
											</div>
										) : (
											review?.review
										)}
									</div>
								</li>
							</NavLink>
						) : null
					)}
				</ul>
			</div>
		</>
	);
};

export default HomePage;
