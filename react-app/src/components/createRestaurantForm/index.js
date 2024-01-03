import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
	createRestaurant,
	createRestaurantImage,
	loadRestaurantDetails,
} from "../../store/restaurants";
import "./createRestaurant.css";
import Autocomplete from "react-google-autocomplete";
import { getKey } from "../../store/maps";

const CreateRestaurant = () => {
	const dispatch = useDispatch();
	const history = useHistory();

	const [country, setCountry] = useState("");
	const [address, setAddress] = useState("");
	const [city, setCity] = useState("");
	const [state, setState] = useState("");
	const [name, setName] = useState("");
	const [price, setPrice] = useState("");
	const [image, setImage] = useState("");
	const [lat, setLat] = useState();
	const [lng, setLng] = useState();
	const [errors, setErrors] = useState({});
	const [invalidAddyError, setInvalidAddyError] = useState("");
	const [category, setCategory] = useState("");
	const [postalcode, setPostalCode] = useState("");
	const [validSubmit, setValidSubmit] = useState(false);

	const key = useSelector((state) => state.maps.key);

	const updateName = (e) => setName(e.target.value);
	const updatePrice = (e) => setPrice(e.target.value);
	const updateCategory = (e) => setCategory(e.target.value);

	useEffect(() => {
		if (!key) {
			dispatch(getKey());
		}
	}, [dispatch, key]);

	if (!key) {
		return null;
	}

	const handleNewRestaurant = async (e) => {
		e.preventDefault();

		const errors = {};
		if (country.length > 2) {
			errors.country = "Alpha 2 Format required";
		}
		if (!country) {
			errors.country = "Country is required";
		}
		if (!address) {
			errors.address = "Street address is required";
		}
		if (!city) {
			errors.city = "City is required";
		}
		if (state.length > 2) {
			errors.state = "State must be abbreviated";
		}
		if (!state) {
			errors.state = "State is required";
		}
		if (!postalcode) {
			errors.postalcode = "Postal code is required";
		}
		if (!name) {
			errors.name = "Name is required";
		}
		if (!price) {
			errors.price = "Price is required";
		}
		if (!category) {
			errors.category = "Category is required";
		}
		if (!image) {
			errors.urls = "At least one image is required";
		}
		if (invalidAddyError) {
			errors.invalidAddress = invalidAddyError;
		}
		setErrors(errors);

		if (Object.values(errors).length === 0) {
			setValidSubmit(true);

			try {
				const safeSpot = {
					address,
					city,
					state,
					country,
					name,
					price,
					category,
					postalcode,
					lat: lat,
					lng: lng,
				};
				const createdRestaurant = await dispatch(
					createRestaurant(safeSpot)
				);
				if (createdRestaurant) {
					if (image) {
						const formData = new FormData();
						formData.append("url", image);
						await dispatch(
							createRestaurantImage(
								formData,
								createdRestaurant.id
							)
						);
					}
					await dispatch(loadRestaurantDetails(createdRestaurant.id));
					history.push(`/restaurants/${createdRestaurant.id}`);
				}
			} catch (error) {
				console.error("Restaurant creation failed:", error);
			}
			setValidSubmit(false);
		}
	};

	return (
		<div className="create-wrapper-master">
			<div className="create-restaurant-container">
				<form
					onSubmit={handleNewRestaurant}
					className="create-restaurant-form"
				>
					<div className="within-form-master-container">
						<div className="form-heading-create">
							Enter Your Restaurant's Information Below.
						</div>
						<div className="res-name-price-cat-container">
							<div className="form-group restName">
								<div htmlFor="restaurantName">
									Restaurant name
								</div>
								<input
									type="text"
									id="restaurantName"
									placeholder="Enter restaurant name"
									value={name}
									onChange={updateName}
									className={`input-field ${
										errors.name ? "error" : ""
									}`}
								/>
								{errors.name && (
									<p className="error-message-name">
										⚠︎ {errors.name}
									</p>
								)}
							</div>
							<div className="form-group category">
								<div
									className="create-small-boxers"
									htmlFor="category-create"
								>
									Category
								</div>
								<select
									id="category-create"
									onChange={updateCategory}
									className={`input-field ${
										errors.city ? "error" : ""
									}`}
									required
								>
									<option value="0">Genre</option>
									<option value="Mexican">Mexican</option>
									<option value="Korean">Korean</option>
									<option value="American">American</option>
									<option value="Japanese">Japanese</option>
									<option value="French">French</option>
									<option value="Indian">Indian</option>
								</select>
								{errors.category && (
									<p className="error-message">
										⚠︎ {errors.category}
									</p>
								)}
							</div>
							<div className="form-group price">
								<div
									className="create-small-boxers"
									htmlFor="price-create"
								>
									Average Price
								</div>
								<select
									id="price-create"
									onChange={updatePrice}
									className={`input-field ${
										errors.city ? "error" : ""
									}`}
									required
								>
									<option value="0">Price</option>
									<option value="1">$</option>
									<option value="2">$$</option>
									<option value="3">$$$</option>
									<option value="4">$$$$</option>
								</select>
								{errors.price && (
									<p className="error-message">
										⚠︎ {errors.price}
									</p>
								)}
							</div>
						</div>
						<div className="auto-complete-container">
							<div
								id="res-address-create"
								htmlFor="auto-complete-box"
							>
								Restaurant Address
							</div>
							<Autocomplete
								id="auto-complete-box"
								apiKey={key}
								onPlaceSelected={(place) => {
									if (place?.address_components) {
										setAddress(
											place?.address_components[0]
												?.short_name +
												" " +
												place?.address_components[1]
													?.short_name
										);
										if (place?.geometry?.location) {
											setLng(
												place.geometry.location.lng()
											);
											setLat(
												place.geometry.location.lat()
											);
										}
										place?.address_components.forEach(
											(component) => {
												if (
													component?.types[0] ===
													"locality"
												) {
													setCity(
														component?.short_name
													);
												}
												if (
													component?.types[0] ===
													"administrative_area_level_1"
												) {
													setState(
														component?.short_name
													);
												}
												if (
													component?.types[0] ===
													"country"
												) {
													setCountry(
														component?.short_name
													);
												}
												if (
													component?.types[0] ===
													"postal_code"
												) {
													setPostalCode(
														component?.short_name
													);
												}
											}
										);
									}
									if (!place?.address_components) {
										setInvalidAddyError(
											"Please enter a valid address!"
										);
									} else {
										setInvalidAddyError("");
									}
								}}
								options={{
									fields: ["ALL"],
									componentRestrictions: { country: "US" },
									types: ["address"],
								}}
							/>
							{invalidAddyError && (
								<p className="error-message-invalidAddy">
									⚠︎ {invalidAddyError}
								</p>
							)}
						</div>
						<div className="form-row-images-create">
							<div className="attch-photos-txt-create">
								Attach Photos
							</div>
							<label className="create-image-label-create">
								<div className="upload-img-icon-container-create">
									<div
										id="upload-image-icon-create"
										className="material-symbols-outlined"
									>
										add_a_photo
										<input
											type="file"
											accept="image/png, image/jpeg, image/jpg"
											placeholder="Image URL"
											onChange={(e) => {
												setImage(e.target.files[0]);
											}}
											className="create-image-input-create"
											// multiple="true"
										/>
										{image && (
											<div id="image-name-create">
												Selected files: {image?.name}
											</div>
										)}
									</div>
								</div>
							</label>
							{errors.urls && (
								<span className="create-res-image-error">
									⚠︎ {errors.urls}
								</span>
							)}
						</div>
						<div className="create-res-btn-container">
							<button
								type="submit"
								className="create-restaurant-btn"
								disabled={validSubmit}
							>
								Publish Restaurant
							</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
};

export default CreateRestaurant;
