import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { loadRestaurants } from "../../store/restaurants";
import "../GetAllRestaurants/GetAllRestaurants.css";

function GetAllRestaurantsPage() {
	const dispatch = useDispatch();
	let { name, price, category } = useParams();
	const restaurants = useSelector((state) => state.restaurant);

	useEffect(() => {
		if (name == 0) {
			name = parseInt(0);
		}
		if (category == 0) {
			category = parseInt(0);
		}
		price = parseInt(price);
		dispatch(loadRestaurants(name, price, category));
	}, [dispatch, name, price, category]);

	//console.log(Object.values(restaurants))
	const restaurantsLooper = Object.values(restaurants);

	let priceFunc;
	const newPrice = restaurants?.price;
	if (price == 4) {
		priceFunc = "$$$$";
	} else if (price == 3) {
		priceFunc = "$$$";
	} else if (price == 2) {
		priceFunc = "$$";
	} else if (price == 1) {
		priceFunc = "$";
	}

	return (
		<div className="res-detail-body">
			<div className="h1-lameo">Displaying restaurants below</div>
			<div className="all-restaurant-tiles">
				{restaurantsLooper?.map((restaurant) => (
					<NavLink
						to={`/restaurants/${restaurant?.id}`}
						className="indv-res-navlink"
					>
						<div className="indv-res-info-container">
							<div className="res-img-container">
								<img
									src={restaurant?.images[0]?.url}
									className="actl-res-img"
								></img>
							</div>
							<div className="res-info-container">
								<div id="res-name-text">{restaurant?.name}</div>
								<div className="rating-div">
									{[
										...Array(
											Math.floor(restaurant?.rating)
										),
									].map((_, i) => (
										<i
											key={i}
											id="review-star"
											className="fa-solid fa-star"
										></i>
									))}

									{restaurant?.rating % 1 >= 0.3 &&
										restaurant?.rating % 1 <= 0.7 && (
											<i
												id="review-star"
												className="fa-solid fa-star-half"
											></i>
										)}
								</div>
							</div>
						</div>
					</NavLink>
				))}
			</div>
		</div>
	);
}

export default GetAllRestaurantsPage;
