import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import {
	createRestaurant,
	createRestaurantImage,
	loadRestaurantDetails
} from "../../store/restaurants";
import "./createRestaurant.css";



const CreateRestaurant = () => {
	const dispatch = useDispatch();
	const history = useHistory();

	const [country, setCountry] = useState("");
	const [address, setAddress] = useState("");
	const [city, setCity] = useState("");
	const [state, setState] = useState("");
	const [name, setName] = useState("");
	const [price, setPrice] = useState("");
	const [urls, setUrls] = useState([""]);
	const [errors, setErrors] = useState({});
	const [category, setCategory] = useState("");
	const [postalcode, setPostalCode] = useState("");
	const [validSubmit, setValidSubmit] = useState(false);

	const updateAddress = (e) => setAddress(e.target.value);
	const updateCity = (e) => setCity(e.target.value);
	const updateState = (e) => setState(e.target.value);
	const updateCountry = (e) => setCountry(e.target.value);
	const updateName = (e) => setName(e.target.value);
	const updatePrice = (e) => setPrice(e.target.value);
	const updateCategory = (e) => setCategory(e.target.value);
	const updatePostalCode = (e) => setPostalCode(e.target.value);

	const handleNewRestaurant = async (e) => {
		e.preventDefault();

		const errors = {};
		if (country.length > 2) {
			errors.country = 'Alpha 2 Format required'
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
			errors.state = "State must be abbreviated"
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
		if (!urls[0]) {
			errors.urls = "At least one image is required";
		}
		setErrors(errors);

		if (Object.values(errors).length === 0) {
			setValidSubmit(true);

			const validSubmit = {
				address: {
					regionCode: country,
					locality: city,
					administrativeArea: state,
					postalCode: postalcode,
					addressLines: [address],
				},
				enableUspsCass: true,
			};

			try {
				const addressValidate = await fetch(
					"https://addressvalidation.googleapis.com/v1:validateAddress?key=AIzaSyDNLNEeKNVLoQYEToYv5bca-1_Vy9YtHM4",
					{
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify(validSubmit),
					}
				);
				const response = await addressValidate.json();
				console.log(response);

				if (
					response.result.verdict.validationGranularity === "PREMISE"
				) {
					const safeSpot = {
						address,
						city,
						state,
						country,
						name,
						price,
						category,
						postalcode,
						lat: response.result.geocode.location.latitude,
						lng: response.result.geocode.location.longitude,
					};
					const createdRestaurant = await dispatch(
						createRestaurant(safeSpot)
					);
					if (createdRestaurant) {
						urls?.forEach(async (url) => {
							if (url) {
								const formData = new FormData();
								formData.append("url", url)
								await dispatch(createRestaurantImage(formData, createdRestaurant.id));
							}
							await dispatch(loadRestaurantDetails(createdRestaurant.id))
						});
						history.push(`/restaurants/${createdRestaurant.id}`);
					}
				} else {
					errors.invalidAddress = "Please enter a valid address!";
				}
			} catch (error) {
				console.error("Restaurant creation failed:", error);
			}
			setValidSubmit(false);
		}
	};

	return (
		<div className='create-wrapper-master'>
		<section className="create-restaurant-container" >
			<h2 className="form-heading">Your Restaurant's Address</h2>
			<form
				onSubmit={handleNewRestaurant}
				className="create-restaurant-form"

			>
				<div className="form-group restName">
					<label htmlFor="restaurantName">
						Restaurant name
					</label>
					<input
						type="text"
						id="restaurantName"
						placeholder="Enter restaurant name"
						value={name}
						onChange={updateName}
						className={`input-field ${errors.name ? "error" : ""}`}
					/>
					{errors.name && (
						<p className="error-message">{errors.name}</p>
					)}
				</div>
				<div className="form-group category">
					<label htmlFor="category">Category</label>
					<select
						id="category"
						onChange={updateCategory}
						className={`input-field ${errors.city ? "error" : ""}`}
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
						<p className="error-message">{errors.category}</p>
					)}
					</div>
				<div className="form-group price">
				<label htmlFor="price">
						Average Price
					</label>
					<select
						onChange={updatePrice}
						className={`input-field ${errors.city ? "error" : ""}`}
						required
					>
						<option value="0">Price</option>
						<option value="1">$</option>
						<option value="2">$$</option>
						<option value="3">$$$</option>
						<option value="4">$$$$</option>
					</select>
					{errors.price && (
						<p className="error-message">{errors.price}</p>
					)}
				</div>
				<div className="form-group address">
					<label htmlFor="address">Address</label>
					<input
						type="text"
						id="address"
						placeholder="Enter address"
						value={address}
						onChange={updateAddress}
						className={`input-field ${errors.address ? "error" : ""
							}`}
					/>
					{errors.address && (
						<p className="error-message">{errors.address}</p>
					)}
				</div>
				<div className="form-group city">
					<label htmlFor="city">City</label>
					<input
						type="text"
						id="city"
						placeholder="Enter city"
						value={city}
						onChange={updateCity}
						className={`input-field ${errors.city ? "error" : ""}`}
					/>
					{errors.city && (
						<p className="error-message">{errors.city}</p>
					)}
				</div>
				<div className="form-group country">
					<label htmlFor="country">Country</label>
					<input
						type="text"
						id="country"
						placeholder="Enter country"
						value={country}
						onChange={updateCountry}
						className={`input-field ${errors.country ? "error" : ""
							}`}
					/>
					{errors.country && (
						<p className="error-message">{errors.country}</p>
					)}
				</div>

				<div className="form-group state">
					<label htmlFor="state">State</label>
					<input
						type="text"
						id="state"
						placeholder="Enter state"
						value={state}
						onChange={updateState}
						className={`input-field ${errors.state ? "error" : ""}`}
					/>
					{errors.state && (
						<p className="error-message">{errors.state}</p>
					)}
				</div>
				<div className="form-group postalCode">
					<label htmlFor="state">Postal Code</label>
					<input
						type="text"
						id="postal-code"
						placeholder="Enter Postal Code"
						value={postalcode}
						onChange={updatePostalCode}
						className={`input-field ${errors.postalcode ? "error" : ""
							}`}
					/>
					{errors.postalcode && (
						<p className="error-message">{errors.postalcode}</p>
					)}
				</div>





				{urls?.map((url, index) => (
					<div className="form-group" key={index}>
						<label htmlFor={`imageUrl${index + 1}`}>
							Image URL {index + 1}
						</label>
						<input
							type="file"
							id={`imageUrl${index + 1}`}
							placeholder="Enter image URL"
							onChange={(e) => {
								const newUrls = [...urls];
								newUrls[index] = e.target.files[0];
								setUrls(newUrls);
							}}
							className={`input-field ${errors.city ? "error" : ""}`}
						/>
						{errors.urls && (
							<p className="error-message">{errors.urls}</p>
						)}
					</div>
				))}
				{errors.invalidAddress && (
					<p className="error-message">{errors.invalidAddress}</p>
				)}
				<button
					type="submit"
					className="create-restaurant-btn"
					disabled={validSubmit}
				>
					Publish Restaurant
				</button>

			</form>

		</section>
	</div>
	);
};

export default CreateRestaurant;
