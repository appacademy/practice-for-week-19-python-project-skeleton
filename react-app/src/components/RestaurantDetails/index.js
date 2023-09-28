import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, NavLink } from "react-router-dom";
import { loadRestaurantDetails } from "../../store/restaurants";
import "../RestaurantDetails/RestaurantDetails.css";
import OpenModalButton from "../OpenModalButton";
import DeleteForm from "../DeleteConfirmation";
import DeleteReviewForm from "../DeleteReview";

function RestaurantDetailsPage() {
  const dispatch = useDispatch();
  const { restaurantId } = useParams();
  const restaurant = useSelector((state) => state?.restaurant[restaurantId]);
  const sessionUser = useSelector((state) => state?.session.user);


  useEffect(() => {
    dispatch(loadRestaurantDetails(restaurantId));
  }, [dispatch, restaurantId]);

  let priceFunc;
  const price = restaurant?.price
  if (price == 4) {
    priceFunc = "$$$$"
  } else if (price == 3) {
    priceFunc = "$$$"
  } else if (price == 2) {
    priceFunc = "$$"
  } else if (price == 1) {
    priceFunc = "$"
  }

  return (
    <div className="detail-body">
      <div id="res-img">
        {restaurant?.images.length > 0 && (
          <img className="img-tile" src={restaurant?.images[0]?.url} />
        )}
        <div className="info">
          <div id="restaurant-name"> {restaurant?.name}</div>
          <div id="restaurant-rtng">Rating: {restaurant?.rating} ({restaurant?.reviews.length} reviews)</div>
          <div id="restaurant-cat">{priceFunc} · {restaurant?.category}</div>
        </div>
      </div>
      <div id="res-details">
        {sessionUser?.id === restaurant?.owner?.id && (
          <div className="manage-buttons">
            <a href={`/restaurants/edit/${restaurant?.id}`}>
              <button>Update Restaurant Info</button>
            </a>
            <OpenModalButton
              buttonText="Delete"
              modalComponent={<DeleteForm restaurantId={restaurant?.id} />}
            />
          </div>
        )}
        <div>{restaurant?.address}</div>
        <div>{restaurant?.city}</div>
        <div>{restaurant?.state}</div>
        <div>{restaurant?.country}</div>
        {sessionUser?.id !== restaurant?.owner.id && (
          <button>Post a Review</button>
        )}
        <div>
          Reviews:{" "}
          {restaurant?.reviews?.map((review) => (
            <div>
              <div>{review?.reviewer?.username}</div>
              <div>{review?.review}</div>
              <div>{review?.stars}</div>
              {review?.images.length > 0 && (
                <div>
                  Images:{" "}
                  {review.images.map((image) => (
                    <img src={image.url} />
                  ))}
                </div>
              )}
              {review?.reviewer?.id === sessionUser?.id && (
                <div>
                  <NavLink
                    to={`/restaurants/${restaurantId}/review/${review?.id}/edit`}
                  >
                    <button>Update Review</button>
                  </NavLink>
                  <OpenModalButton
                    buttonText="Delete"
                    modalComponent={<DeleteReviewForm reviewId={review?.id} />}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default RestaurantDetailsPage;
