const LOAD_RESTAURANTS = "LOAD_RESTAURANTS";
const RESTAURANT_DETAIL = "RESTAURANT_DETAIL";
const UPDATE_RESTAURANT = "UPDATE_RESTAURANT";
const DELETE_RESTAURANT = "DELETE_RESTAURANT";
const CREATE_RESTAURANT = "CREATE_RESTAURANT";
const CREATE_RESTAURANT_IMAGE = "CREATE_RESTAURANT_IMAGE";
const DELETE_RESTAURANT_IMAGE = "DELETE_RESTAURANT_IMAGE";


const loadAction = (restaurants) => ({
  type: LOAD_RESTAURANTS,
  restaurants,
});


const loadDetailsAction = (restaurant) => ({
  type: RESTAURANT_DETAIL,
  restaurant,
});

const updateRestaurantAction = (restaurant) => ({
  type: UPDATE_RESTAURANT,
  restaurant,
});

const deleteRestaurantAction = (restaurantId) => ({
  type: DELETE_RESTAURANT,
  restaurantId,
});

const createRestaurantAction = (restaurantDetails) => ({
  type: CREATE_RESTAURANT,
  restaurantDetails,
});

const createRestaurantImageAction = (restaurantImage) => ({
  type: CREATE_RESTAURANT_IMAGE,
  restaurantImage,
});

const deleteRestaurantImageAction = (restaurantImageId) => ({
  type: DELETE_RESTAURANT_IMAGE,
  restaurantImageId,
});

export const loadRestaurants = (name, price, category) => async (dispatch) => {
  let res;
  if (name !== 0 && price !== 0 && category !== 0) {
    res = await fetch(
      `/api/restaurants/search?name=${name}&price=${price}&category=${category}`
    );
  } else if (name !== 0 && category !== 0) {
    res = await fetch(
      `/api/restaurants/search?name=${name}&category=${category}`
    );
  } else if (name !== 0 && price !== 0) {
    res = await fetch(`/api/restaurants/search?name=${name}&price=${price}`);
  } else if (category !== 0 && price !== 0) {
    res = await fetch(
      `/api/restaurants/search?price=${price}&category=${category}`
    );
  } else if (name !== 0) {
    res = await fetch(`/api/restaurants/search?name=${name}`);
  } else if (category !== 0) {
    res = await fetch(`/api/restaurants/search?category=${category}`);
  } else if (price !== 0) {
    res = await fetch(`/api/restaurants/search?price=${price}`);
  } else if (name === 0 && price === 0 && category === 0) {
    res = await fetch("/api/restaurants");
  }

  if (res.ok) {
    const allRestaurantsFiltered = await res.json();
    dispatch(loadAction(allRestaurantsFiltered));
    return res;
  }
};

export const loadRestaurantDetails = (restaurantId) => async (dispatch) => {
  const res = await fetch(`/api/restaurants/${restaurantId}`);

  if (res.ok) {
    const details = await res.json();
    dispatch(loadDetailsAction(details));
    return res;
  }
};

export const createRestaurant = (restaurantData) => async (dispatch) => {
  const res = await fetch("/api/restaurants/new", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(restaurantData),
  });

  if (res.ok) {
    const newRestaurant = await res.json();
    dispatch(createRestaurantAction(newRestaurant));
    return newRestaurant;
  }
};

export const updateRestaurant =
  (restaurantId, restaurantData) => async (dispatch) => {
    const res = await fetch(`/api/restaurants/edit/${restaurantId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(restaurantData),
    });
    const restaurant = await res.json();
    dispatch(updateRestaurantAction(restaurant));
    return res;
  };

export const deleteRestaurant = (restaurantId) => async (dispatch) => {
  const res = await fetch(`/api/restaurants/delete/${restaurantId}`, {
    method: "DELETE",
  });
  dispatch(deleteRestaurantAction(restaurantId));
  return res;
};

export const createRestaurantImage =
  (restaurantId, restaurantImageData) => async (dispatch) => {
    const res = await fetch(`/api/restaurants/${restaurantId}/images/new`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(restaurantImageData),
    });

    if (res.ok) {
      const newRestaurantImage = await res.json();
      dispatch(createRestaurantImageAction(newRestaurantImage));
      return newRestaurantImage;
    }
  };

export const deleteRestaurantImage =
  (restaurantImageId) => async (dispatch) => {
    const res = await fetch(
      `/api/restaurants/images/${restaurantImageId}/delete`,
      {
        method: "DELETE",
      }
    );
    dispatch(deleteRestaurantImageAction(restaurantImageId));
    return res;
  };

const initialState = {};

const restaurantReducer = (state = {}, action) => {
  let newState = { ...state };
  switch (action.type) {
    case LOAD_RESTAURANTS:
      newState = {}
      action.restaurants.forEach((restaurant) => {
        newState[restaurant.id] = restaurant;
      });
      return newState;
    case RESTAURANT_DETAIL:
      newState[action.restaurant.id] = action.restaurant;
      return newState;
    case DELETE_RESTAURANT:
      delete newState[action.restaurantId];
      return newState;
    default:
      return state;
  }
};

export default restaurantReducer;
