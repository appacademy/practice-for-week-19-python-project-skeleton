import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { loadRestaurants, loadRestaurantDetails } from "../../store/restaurants";
import "../GetAllRestaurants/GetAllRestaurants.css";

function RestaurantDetailsPage() {
    const dispatch = useDispatch();
    const { restaurantId } = useParams()
    const restaurant = useSelector((state) => state.restaurant[restaurantId])

    useEffect(() => {
        dispatch(loadRestaurantDetails(restaurantId))
    }, [dispatch, restaurantId])

    console.log(restaurant)


    return (
        <div className="detail-body">{restaurant?.name}</div>
    )

}

export default RestaurantDetailsPage;
