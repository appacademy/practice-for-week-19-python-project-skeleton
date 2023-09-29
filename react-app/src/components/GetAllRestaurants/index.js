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
      <h1 className="h1-lameo">Displaying restaurants below</h1>
      <div className="all-restaurant-tiles">
        <ul className="ul-restaurant-tiles">
          {restaurantsLooper?.map((restaurant) => (
            <NavLink to={`/restaurants/${restaurant?.id}`}>
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
                            <div className="rating-div">
                              {[...Array(Math.floor(restaurant?.rating))].map(
                                (_, i) => (
                                  <p key={i} class="material-symbols-outlined">
                                    star_rate
                                  </p>
                                )
                              )}
                            </div>
                          </div>
                          <div className="restaurant-tile-price-category">
                            <p className="restaurant-tile-price-category-pel">
                              <span className="restaurant-tile-price-category-span">
                                <div className="category-tile-text">
                                  {restaurant?.category}
                                </div>
                                <div className="price-tile-text">
                                  {restaurant?.price === 4
                                    ? "$$$$"
                                    : restaurant?.price === 3
                                    ? "$$$"
                                    : restaurant?.price === 2
                                    ? "$$"
                                    : restaurant?.price === 1
                                    ? "$"
                                    : null}
                                </div>
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            </NavLink>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default GetAllRestaurantsPage;
