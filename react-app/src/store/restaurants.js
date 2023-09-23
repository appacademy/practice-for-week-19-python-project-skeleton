

const LOAD_RESTAURANTS = 'LOAD_RESTAURANTS'
const RESTAURANT_DETAIL = 'RESTAURANT_DETAIL'
const UPDATE_RESTAURANT = 'UPDATE_RESTAURANT'
const DELETE_RESTAURANT = 'DELETE_RESTAURANT'
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
})

const updateRestaurantAction = (restaurant) => ({
    type: UPDATE_RESTAURANT,
    restaurant
})

const deleteRestaurantAction = (restaurantId) => ({
    type: DELETE_RESTAURANT,
    restaurantId
})

const createRestaurantAction = (restaurantDetails) => ({
    type: CREATE_RESTAURANT,
    restaurantDetails
})

const createRestaurantImageAction = (restaurantImage) => ({
type: CREATE_RESTAURANT_IMAGE,
restaurantImage
})

const deleteRestaurantImageAction = (restaurantImageId) => ({
    type: DELETE_RESTAURANT_IMAGE,
    restaurantImageId
})


export const loadRestaurants = () => async (dispatch) => {
    const res = await fetch('/api/restaurants');

    if (res.ok) {
        const allRestaurants = await res.json()
        dispatch(loadAction(allRestaurants))
        return res;
    }
}

export const loadRestaurantDetails = (restaurantId) => async dispatch => {
    const res = await fetch(`/api/restaurants/${restaurantId}`)

    if (res.ok) {
        const details = await res.json()
        dispatch(loadDetailsAction(details))
        return res;
    }
}

export const createRestaurant = (restaurantData) => async dispatch => {
    const res = await fetch("/api/restaurants/new", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(restaurantData)
    });

    if (res.ok) {
        const newRestaurant = await res.json()
        dispatch(createRestaurantAction(newRestaurant));
        return newRestaurant;
    }

}


export const updateRestaurant = (restaurantId, restaurantData) => async dispatch => {
    const res = await fetch(`/api/restaurants/${restaurantId}/update`, {
        method: 'PUT',
        body: JSON.stringify(restaurantData)
    })
    const restaurant = await res.json()
    dispatch(updateRestaurantAction(restaurant))
    return res
}

export const deleteRestaurant = (restaurantId) => async dispatch => {
    const res = await fetch(`/api/restaurants/${restaurantId}/delete`, {
        method: "DELETE"
    })
    dispatch(deleteRestaurantAction(restaurantId))
    return res
}

export const createRestaurantImage = (restaurantId, restaurantImageData) => async dispatch => {
    const res = await fetch(`/api/restaurants/${restaurantId}/images/new`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(restaurantImageData)
    });

    if (res.ok) {
        const newRestaurantImage = await res.json()
        dispatch(createRestaurantImageAction(newRestaurantImage));
        return newRestaurantImage;
    }

}

export const deleteRestaurantImage = (restaurantImageId) => async dispatch => {
    const res = await fetch(`/api/restaurants/images/${restaurantImageId}/delete`, {
        method: "DELETE"
    })
    dispatch(deleteRestaurantImageAction(restaurantImageId));
    return res;
}

const initialState = {};

const restaurantReducer = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case LOAD_RESTAURANTS:
      newState = {};
      action.restaurants.forEach((restaurant) => {
        newState[restaurant.id] = restaurant;
      });
      return newState;
//     case LOAD_SPOT:
//       newState = {};
//       const something = action.spot;
//       newState[something.id] = something;
//       return newState;
//     case LOAD_USER_SPOT:
//       newState = {};
//       action.userSpot.Spots.forEach((spot) => {
//         newState[spot.id] = spot;
//       });
//       return newState;
//     case UPDATE_SPOT:
//       newState[action.updatedSpot.id] = action.updatedSpot;
//       return newState;
//     case CREATE_IMAGE:
//       newState[action.image.id] = action.image;
//       return newState;
//     case DELETE_SPOT:
//       delete newState[action.spotId];
//       return newState;
     default:
     return state;
   }
};

export default restaurantReducer;