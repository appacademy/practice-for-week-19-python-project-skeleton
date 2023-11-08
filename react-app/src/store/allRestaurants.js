const ALL_RESTAURANTS = "ALL_RESTAURANTS"

const allAction = (allRestaurants) => ({
    type: ALL_RESTAURANTS,
    allRestaurants,
})

export const getAllRestaurants = () => async (dispatch) => {
    const res = await fetch(`/api/restaurants`);

    if (res.ok) {
        const allRestaurants = await res.json();
        dispatch(allAction(allRestaurants));
        return res
    }
}

const allRestaurantReducer = (state = {}, action) => {
    let newState = { ...state };
    switch (action.type) {
        case ALL_RESTAURANTS:
            newState = {}
            action.allRestaurants.forEach((allRestaurant) => {
                newState[allRestaurant.id] = allRestaurant;
            });
            return newState
        default:
            return state;
    }
};

export default allRestaurantReducer;
