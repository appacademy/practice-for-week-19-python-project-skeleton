import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { loadRestaurants } from "../../store/restaurants";
import "../GetAllRestaurants/GetAllRestaurants.css";

function GetAllRestaurantsPage() {
    const dispatch = useDispatch();
    const restaurants = useSelector((state) => state.restaurant)

    useEffect(() => {
        dispatch(loadRestaurants())
    }, [dispatch])

    //console.log(Object.values(restaurants))
   const restaurantsLooper = Object.values(restaurants);

    return (
        <div>
            <div className="all-restaurant-tiles">
                <ul>
                {restaurantsLooper?.map((restaurant) => (
                    <li>
                        <div className="restaurant-tile">
                            <div className="restaurant-image-tile">
                                    <img className src={restaurant?.images[0]?.url}/>
                            </div>
                            <div className="restaurant-text-tile">
                                <h2>
                                  {restaurant?.name}
                              </h2>
                              <h2>
                                  {restaurant?.address}
                              </h2>
                              <h2>
                                  {restaurant?.city}
                              </h2>
                              <h2>
                                  {restaurant?.state}
                              </h2>
                              <h2>
                                  {restaurant?.country}
                              </h2>
                              <h2>
                                  {restaurant?.price}
                              </h2>
                              <h2>
                                  {restaurant?.rating}
                              </h2>
                              <h2>
                                  {restaurant?.category}
                              </h2>
                              <h2>----------------------------------------------------------</h2>
                            </div>
                              </div>
                    </li>
                    ))}
                </ul>
            </div>
        </div>
    )

}

export default GetAllRestaurantsPage;