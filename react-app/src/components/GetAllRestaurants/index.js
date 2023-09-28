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

  return (
    <div className="res-detail-body">
        <h1 className="h1-lameo">Displaying restaurants below</h1>
      <div className="all-restaurant-tiles">
        <ul className="ul-restaurant-tiles">
          {restaurantsLooper?.map((restaurant) => (
            <li className="restaurant-tile-list-container">
              <div className="restaurant-tile">
                <div className="restaurant-tile-inner-div">
                  <div className="restaurnt-tile-content-most-inner">
                    <div className="restaurant-image-tile">
                      <div className="more-inner-image-div">
                        <div className="restaurant-actual-image-tile">
                          <div className="most-inner-img">
                            <img
                              className="literal-img-el"
                              src={restaurant?.images[0]?.url}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="restaurant-text-tile">
                      <div className="display-text">
                        <div className="restaurant-tile-name">
                          <h3 className="name-h3">{restaurant?.name}</h3>
                        </div>
                        <div className="restaurant-tile-rating">
                          <h3 className="rating-h3">{restaurant?.rating}</h3>
                        </div>
                        <div className="restaurant-tile-price-category">
                          <p className="restaurant-tile-price-category-pel">
                            <span className="restaurant-tile-price-category-span">
                            {restaurant?.category}
                            {restaurant?.price}
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default GetAllRestaurantsPage;
