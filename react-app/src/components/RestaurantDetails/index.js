import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { loadRestaurants, loadRestaurantDetails } from "../../store/restaurants";
import "../RestaurantDetails/RestaurantDetails.css"
import OpenModalButton from "../OpenModalButton";
import DeleteForm from "../DeleteConfirmation";

function RestaurantDetailsPage() {
    const dispatch = useDispatch();
    const { restaurantId } = useParams()
    const restaurant = useSelector((state) => state.restaurant[restaurantId])
    const sessionUser = useSelector(state => state.session.user);

    console.log(sessionUser)

    useEffect(() => {
        dispatch(loadRestaurantDetails(restaurantId))
    }, [dispatch, restaurantId])

    console.log(restaurant)


    return (
        <div className="detail-body">
            {sessionUser?.id === restaurant?.owner.id && (
                <div className="manage-buttons">
                    <a href={`/restaurants/edit/${restaurant?.id}`}><button>Update Restaurant Info</button></a>
                    <OpenModalButton
                        buttonText='Delete'
                        modalComponent={<DeleteForm restaurantId={restaurant.id} />}
                    />
                </div>
            )}
            <div id="restaurant-name">Name: {restaurant?.name}</div>
            <div>Rating: {restaurant?.rating}</div>
            <div>#Reviews({restaurant?.reviews.length})</div>
            <div>Category: {restaurant?.category}</div>
            <div>{restaurant?.address}</div>
            <div>{restaurant?.city}</div>
            <div>{restaurant?.state}</div>
            <div>{restaurant?.country}</div>
            {restaurant?.images.length > 0 && (
                <div>Images: {restaurant?.images.map((image) => (
                    <img src={image.url} />
                ))}</div>
            )}
            {sessionUser?.id !== restaurant?.owner.id && (
                <button>Post a Review</button>
            )}
            <div>Reviews: {restaurant?.reviews?.map((review) => (
                <div>
                    <div>{review.reviewer.username}</div>
                    <div>{review.review}</div>
                    {review?.images.length > 0 && (
                        <div>Images: {review.images.map((image) => (
                            <img src={image.url} />
                        ))}</div>
                    )}
                    {review?.reviewer.id === sessionUser?.id && (
                        <div>
                            <button>Update Review</button>
                            <button>Delete Review</button>
                        </div>
                    )}
                </div>
            ))}</div>
        </div>
    )

}

export default RestaurantDetailsPage;
