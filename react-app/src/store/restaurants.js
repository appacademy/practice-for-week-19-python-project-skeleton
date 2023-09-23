

const LOAD_RESTAURANTS = 'LOAD_RESTAURANTS'
const RESTAURANT_DETAIL = 'RESTAURANT_DETAIL'
const UPDATE_RESTAURANT = 'UPDATE_RESTAURANT'
const DELETE_RESTAURANT = 'DELETE_RESTAURANT'


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


export const loadRestaurants = () => async dispatch => {
    const res = await fetch('/api/restaurants');

    if (res.ok) {
        const allRestaurants = await res.json()
        dispatch(loadAction(allRestaurants))
        return res;
    }
}

export const loadRestaurantDetails = (restaurantId) => async dispatch => {
    const res = await fetch(`/api/restaurant/${restaurantId}`)

    if (res.ok) {
        const details = await res.json()
        dispatch(loadDetailsAction(details))
        return res;
    }
}


export const updateRestaurant = (restaurantId, restaurantData) => async dispatch => {
    const res = await fetch(`/api/restaurant/${restaurantId}/update`, {
        method: 'PUT',
        body: JSON.stringify(restaurantData)
    })
    const restaurant = await res.json()
    dispatch(updateRestaurantAction(restaurant))
    return res
}

export const deleteRestaurant = (restaurantId) => async dispatch => {
    const res = await fetch(`/api/restaurant/${restaurantId}/delete`, {
        method: "DELETE"
    })
    dispatch(deleteRestaurantAction(restaurantId))
    return res
}
