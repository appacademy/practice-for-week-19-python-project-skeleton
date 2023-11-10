import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { updateRestaurant, loadRestaurantDetails } from "../../store/restaurants";
import "../createRestaurantForm/createRestaurant.css"



const UpdateForm = () => {
    const { restaurantId } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const restaurant = useSelector((state) => state.restaurant[restaurantId])
    const [validSubmit, setValidSubmit] = useState(false)
    const [errors, setErrors] = useState({});


    const [data, setData] = useState({

        country: "",
        address: "",
        city: "",
        state: "",
        name: "",
        category: "",
        price: "",
    })


    useEffect(() => {
        if (restaurant) {
            setData({
                country: restaurant.country,
                address: restaurant.address,
                city: restaurant.city,
                state: restaurant.state,
                name: restaurant.name,
                category: restaurant.category,
                price: restaurant.price,
            });
        } else {
            dispatch(loadRestaurantDetails(restaurantId))
                .then((data) => {
                    setData({
                        country: data.country,
                        address: data.address,
                        city: data.city,
                        state: data.state,
                        name: data.name,
                        category: data.category,
                        price: data.price,
                    });
                })
                .catch((err) => console.error(err));
        }
    }, [dispatch, restaurantId, restaurant]);

    const handleStringData = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value

        })
    }

    const handleNumberData = (e) => {
        setData({
            ...data,
            [e.target.name]: parseInt(e.target.value),
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const errors = {};
        if (!data.country) {
            errors.country = "Country is required";
        }
        if (!data.address) {
            errors.address = "Street address is required"
        }
        if (!data.city) {
            errors.city = "City is required"
        }
        if (!data.state) {
            errors.state = "State is required"
        }
        if (!data.name) {
            errors.name = "Name is required"
        }
        if (!data.category) {
            errors.category = "Category is required"
        }
        if (!data.price) {
            errors.price = "Price is required"
        }
        setErrors(errors)

        if (Object.values(errors).length === 0) {
            setValidSubmit(true);


            try {

                dispatch(updateRestaurant(restaurantId, data))
                .then(() => {
                history.push(`/restaurants/${restaurantId}`)
                })

            } catch(error) {
                console.error('Could not update your restaurant:', error)
            }


        }
    }



    return (
        <section className="create-restaurant-container">
            <h1>Update your Restaurant</h1>
            <h2>Location</h2>
            <form onSubmit={handleSubmit} className="create-restaurant-form">
                <div className="general-info">
                    <div className="form-group">
                        <input
                            className={`input-field ${errors.country ? 'error' : ''}`}
                            type="string"
                            name="country"
                            placeholder="country"
                            value={data.country}
                            onChange={handleStringData} />
                            {errors.country && (
                                <p className='error-message'>{errors.country}*</p>
                            )}

                    </div>
                    <div className="form-group">
                        <input
                            className={`input-field ${errors.country ? 'error' : ''}`}
                            type="string"
                            name="address"
                            placeholder="address"
                            value={data.address}
                            onChange={handleStringData} />
                            {errors.address && (
                                <p className='error-message'>{errors.address}*</p>
                            )}
                    </div>
                    <div className="form-group">
                        <input
                            className={`input-field ${errors.country ? 'error' : ''}`}
                            type="string"
                            placeholder="city"
                            name="city"
                            value={data.city}
                            onChange={handleStringData} />
                         {errors.city && (
                                <p className='error-message'>{errors.city}*</p>
                            )}
                    </div>
                    <div className="form-group">
                        <input
                            className={`input-field ${errors.country ? 'error' : ''}`}
                            type="string"
                            name="state"
                            placeholder="state"
                            value={data.state}
                            onChange={handleStringData} />
                             {errors.state && (
                                <p className='error-message'>{errors.state}*</p>
                            )}
                    </div>

                    <div className="form-group">
                        <h2>New Name?</h2>

                        <input
                            className={`input-field ${errors.country ? 'error' : ''}`}
                            type="string"
                            name="name"
                            placeholder="Name"
                            value={data.name}
                            onChange={handleStringData} />
                             {errors.name && (
                                <p className='error-message'>{errors.name}*</p>
                            )}

                    </div>
                    <div className="form-group">
                        <div className="price-container0">
                    <h2>Set a new Average cost per person</h2>
                        <select className="input-field" name="price" onChange={handleNumberData}>
                            <option value="0">{
                                restaurant?.price === 4
                                  ? "$$$$"
                                  : restaurant?.price === 3
                                  ? "$$$"
                                  : restaurant?.price === 2
                                  ? "$$"
                                  : restaurant?.price === 1
                                  ? "$"
                                  : null} </option>
                            <option value="1">$</option>
                            <option value="2">$$</option>
                            <option value="3">$$$</option>
                            <option value="4">$$$$</option>
                        </select>
                             {errors.price && (
                                <p className='error-message'>{errors.price}*</p>
                            )}
                            </div>

                            <div>
                            <h2>Change the genre of your Restaurant</h2>
                            <select className="input-field" name="category" required onChange={handleStringData}>
                                <option>{data.category}</option>
                                <option value="Mexican">Mexican</option>
                                <option value="Korean">Korean</option>
                                <option value="American">American</option>
                                <option value="Japanese">Japanese</option>
                                <option value="French">French</option>
                                <option value="Indian">Indian</option>
                            </select>
                            </div>

                    </div>
                </div>
                <button type="submit" disabled={validSubmit} className="create-restaurant-btn" >Update Restaurant</button>
            </form>
        </section>
    )
}

export default UpdateForm;
