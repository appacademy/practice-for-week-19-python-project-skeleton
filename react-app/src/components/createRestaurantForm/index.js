import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';
import { createRestaurant, createRestaurantImage } from "../../store/restaurants"
import "./createRestaurant.css"

const CreateRestaurant = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [urls, setUrls] = useState(["", "", "", ""]);
  const [errors, setErrors] = useState({});
  const [category, setCategory] = useState("")
  const [validSubmit, setValidSubmit] = useState(false);




    const updateAddress = (e) => setAddress(e.target.value);
    const updateCity = (e) => setCity(e.target.value);
    const updateState = (e) => setState(e.target.value);
    const updateCountry = (e) => setCountry(e.target.value)
    const updateName = (e) => setName(e.target.value);
    const updatePrice = (e) => setPrice(e.target.value);
    const updateCategory = (e) => setCategory(e.target.value)



    const handleNewSpot = async (e) => {
        e.preventDefault();


const errors = {};
    if(!country) {
        errors.country = "Country is required";
    }
    if(!address) {
        errors.address = "Street address is required"
    }
    if(!city) {
        errors.city = "City is required"
    }
    if(!state) {
        errors.state = "State is required"
    }

    if(!name) {
        errors.name = "Name is required"
    }
    if(!price) {
        errors.price = "Price is required"
    }
    if(!urls) {
        errors.urls = "Image url must end in a .png, .jpg, or .jpeg"
    }
    setErrors(errors)

    if(Object.values(errors).length === 0) {
        setValidSubmit(true);


        const safeSpot = {
            address,
            city,
            state,
            country,
            name,
            price,
            category
        };

       try {

            const createdRestaurant = await dispatch(createRestaurant(safeSpot));
            if(createdRestaurant) {
            urls?.forEach(async (url) => {
              if (url) {
                await dispatch(createRestaurantImage(createdRestaurant.id, url));
              }
            });
        }
            history.push(`/restaurants/${createdRestaurant.id}`);
          } catch (error) {
            console.error("Restaurant creation failed:", error);
          }
          setValidSubmit(false)
        }
    }


return (
    <section className="create-restaurant-container">
        <h2>Create a New Spot!</h2>
        <p>Where is you place located?</p>
        <p>Guests will only get your exact address once they booked a reservation</p>
        <form onSubmit={handleNewSpot} className="create-restaurant-form">
            <div className="general-info">
            <input
                type="country"
                placeholder="country"
                value={country}
                onChange={updateCountry} />
                {errors.country && (
                    <p className='error-create'>{errors.country}</p>
                )}
                <div className="info">
            <input
                type="string"
                placeholder="address"
                value={address}
                onChange={updateAddress} />
                {errors.address && (
                    <p className='error-create'>{errors.address}</p>
                )}
                </div>
                <div className="info">
            <input
                type="string"
                placeholder="city"
                value={city}
                onChange={updateCity} />
                {errors.city && (
                    <p className='error-create'>{errors.city}</p>
                )}
                </div>
                <div className="info">
            <input
                type="string"
                placeholder="STATE"
                value={state}
                onChange={updateState} />
                {errors.state && (
                    <p className='error-create'>{errors.state}</p>
                )}
                </div>

                </div>
                <div className="name-container">
                <h2>Add the Name and Genre of your Restaurant</h2>

            <select required onChange={updateCategory}>
                <option value="0">Mexican</option>
                <option value="1">Korean</option>
                <option value="2">American</option>
                <option value="3">Japanese</option>
                <option value="4">French</option>
                <option value="5">Indian</option>
            </select>
            <input
                type="string"
                placeholder="Name of your Restaurant"
                value={name}
                onChange={updateName} />
                {errors.name && (
                    <p className='error-create'>{errors.name}</p>
                )}
                </div>
                <div className="price-container0">
                <h2>Set an Average cost per person</h2>
            <input
                type="integer"
                placeholder="Average Cost Per Person"
                value={price}
                onChange={updatePrice} />
                {errors.price && (
                    <p className='error-create'>{errors.price}</p>
                )}
                </div>
            <div className="images-container">
            <h2>Add Photos of your restaurant</h2>
                <p>Submit a link to at least one photo to publish your restaurant.</p>
                <div >
                    {urls?.map((url, index)=> (
                        <div className="image-url"key={index}>
                <input
                type="string"
                placeholder="Image Url"
                value={url}
                onChange={(e) => {
                    const newUrls = [...urls];
                    newUrls[index] = e.target.value;
                    setUrls(newUrls)}} />
                    </div>
                    ))}
                </div>
                </div>
            <button type="submit" className="create-restaurant-btn" disabled={validSubmit}>Publish Restaurant</button>
        </form>
    </section>
);
}





export default CreateRestaurant;
