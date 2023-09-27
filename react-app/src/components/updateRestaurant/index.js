import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { updateRestaurant, loadRestaurantDetails } from "../../store/restaurants";



const UpdateForm = () => {
    const { restaurantId } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const restaurant = useSelector((state) => state.restaurant[restaurantId])

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
            [e.target.name]: Number(e.target.value),
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(data)
        dispatch(updateRestaurant(restaurantId, data))
            .then(() => {
                history.push(`/restaurants/${restaurantId}`)
            })
            .catch((errors) => console.error(errors))
    }



    return (
        <section className="create-restaurant-container">
            <h2>Update your Restaurant</h2>
            <h2>Location</h2>
            <form onSubmit={handleSubmit} className="create-restaurant-form">
                <div className="general-info">
                    <div>
                        <input
                            type="string"
                            name="country"
                            placeholder="country"
                            value={data.country}
                            onChange={handleStringData} />

                    </div>
                    <div className="info">
                        <input
                            type="string"
                            name="address"
                            placeholder="address"
                            value={data.address}
                            onChange={handleStringData} />

                    </div>
                    <div className="info">
                        <input
                            type="string"
                            placeholder="city"
                            name="city"
                            value={data.city}
                            onChange={handleStringData} />

                    </div>
                    <div className="info">
                        <input
                            type="string"
                            name="state"
                            placeholder="state"
                            value={data.state}
                            onChange={handleStringData} />
                    </div>

                    <div className="name-container">
                        <h2>New Name?</h2>

                        <input
                            type="string"
                            name="name"
                            placeholder="Name"
                            value={data.name}
                            onChange={handleStringData} />

                    </div>
                    <div className="price-container">
                        <h2>Updated Price</h2>
                        <p>Inflation comes after us all</p>
                        <div>
                            <input
                                type="string"
                                name="category"
                                placeholder="genre"
                                value={data.category}
                                onChange={handleStringData} />

                        </div>
                        <input
                            type="number"
                            name="price"
                            placeholder="Price per Night (USD)"
                            min="0"
                            max='5'
                            value={data.price}
                            onChange={handleNumberData} />

                    </div>
                </div>
                <button type="submit" className="create-resturant-btn" >Update Restaurant</button>
            </form>
        </section>
    )
}

export default UpdateForm;
