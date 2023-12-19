import React, { useState, useEffect } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ProfileButton from "./ProfileButton";
import { getAllRestaurants } from "../../store/allRestaurants";
import TextField from "@mui/material/TextField";
import { Autocomplete } from "@mui/material";
import "./Navigation.css";

function Navigation({ isLoaded }) {
	const dispatch = useDispatch();
	const history = useHistory();
	const sessionUser = useSelector((state) => state?.session.user);
	const restaurantsNav = useSelector((state) => state?.allRestaurants);
	const [name, setName] = useState("");
	const [category, setCategory] = useState(0);
	const [price, setPrice] = useState(0);

	useEffect(() => {
		dispatch(getAllRestaurants());
	}, [dispatch]);

	const handleReset = () => {
		Array.from(document.querySelectorAll("select")).forEach(
			(select) => (select.value = "0")
		);
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!name) {
			history.push(`/restaurants/${0}/${price}/${category}`);
		} else {
			history.push(`/restaurants/${name}/${price}/${category}`);
		}
		setCategory(0);
		setPrice(0);
		handleReset();
	};

	const restaurantsArr = Object.values(restaurantsNav);

	return (
		<div>
			<ul className="nav-bar">
				<li>
					<NavLink exact to="/">
						<img
							className="home-button"
							src="https://cdn.discordapp.com/attachments/1115823811116400650/1173012826823081994/welplogoblue.png?ex=65626853&is=654ff353&hm=8b8f03c5f6ae31ebecc250d240b6aacfbc65fd5e8e5a018851bffa6f935e8b86&"
							alt="home button"
						></img>
					</NavLink>
				</li>
				<div className="outer-search-container">
					<li className="search-bar">
						<form
							className="search-bar-form"
							onSubmit={handleSubmit}
						>
							<div className="search-bar-div-container">
								<Autocomplete
									id="combo-box-demo"
									options={restaurantsArr}
									getOptionLabel={(restaurant) =>
										restaurant.name
									}
									renderOption={(props, restaurant) => (
										<li {...props}>
											<div className="search-results-container">
												<div>
													<img
														id="search-img-results"
														src={
															restaurant.images &&
															restaurant.images
																.length > 0
																? restaurant
																		.images[0]
																		.url
																: "default-image-url.jpg"
														}
														alt={restaurant.name}
													/>
												</div>
												<div className="search-results-info">
													<div id="search-results-name">
														{restaurant.name}
													</div>
													<div id="search-results-address">
														{restaurant.address},{" "}
														{restaurant.city},{" "}
														{restaurant.state}
													</div>
												</div>
											</div>
										</li>
									)}
									onChange={(event, restaurant) =>
										setName(
											restaurant ? restaurant.name : ""
										)
									}
									onSelect={(e) => setName(e.target.value)}
									renderInput={(params) => (
										<TextField
											className="query-box"
											size="small"
											variant="standard"
											{...params}
											placeholder="Search..."
										/>
									)}
								/>
								<div id="option-wrapper">
									<select
										className="genre-input-1"
										onChange={(e) =>
											setCategory(e.target.value)
										}
									>
										<option value="0">Genre</option>
										<option value="Mexican">Mexican</option>
										<option value="Korean">Korean</option>
										<option value="American">
											American
										</option>
										<option value="Japanese">
											Japanese
										</option>
										<option value="French">French</option>
										<option value="Indian">Indian</option>
									</select>
									<select
										className="price-input-1"
										onChange={(e) =>
											setPrice(e.target.value)
										}
									>
										<option value="0">Price</option>
										<option value="1">$</option>
										<option value="2">$$</option>
										<option value="3">$$$</option>
										<option value="4">$$$$</option>
									</select>
								</div>
							</div>
							<div className="search-btn-container">
								<button
									type="submit"
									class="search-submit-button"
								>
									<i className="fa fa-search"></i>
								</button>
							</div>
						</form>
					</li>
				</div>
				{isLoaded && (
					<li id="corner-nav-container">
						<ProfileButton user={sessionUser} />
					</li>
				)}
			</ul>
		</div>
	);
}

export default Navigation;
