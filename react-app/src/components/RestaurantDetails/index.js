import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, NavLink, useHistory } from "react-router-dom";
import { loadRestaurantDetails } from "../../store/restaurants";
import "../RestaurantDetails/RestaurantDetails.css";
import OpenModalButton from "../OpenModalButton";
import DeleteForm from "../DeleteConfirmation";
import DeleteReviewForm from "../DeleteReview";
import ImagesFormModal from "../GetAllImagesModal";
import ImagesModalButton from "../OpenModalButton";

function RestaurantDetailsPage() {
  const history = useHistory()
  const dispatch = useDispatch();
  const { restaurantId } = useParams();
  const restaurant = useSelector((state) => state?.restaurant[restaurantId]);
  const sessionUser = useSelector((state) => state?.session.user);


  useEffect(() => {
    dispatch(loadRestaurantDetails(restaurantId));
  }, [dispatch, restaurantId]);

  const images = [];

  if (restaurant?.images.length) {
    restaurant?.images.forEach(image => {
      images.push(image.url)
    });
  }
  if (restaurant?.reviews.length) {
    restaurant?.reviews.forEach((review) => {
      if (review?.images.length) {
        review?.images.forEach(image => {
          images.push(image.url)
        })
      }
    })
  }

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
        <div className="info-thing">
          <div id="restaurant-name"> {restaurant?.name}</div>
          <div id="restaurant-rtng">Rating: {restaurant?.rating} ({restaurant?.reviews.length} reviews)</div>
          <div id="restaurant-cat">
            <div id="restaurant-price">
              {priceFunc} · {restaurant?.category}
            </div>
            <button id="photo-butt">
              <ImagesModalButton
                buttonText="See all photos"
                modalComponent={<ImagesFormModal images={images} name={restaurant?.name} />} />
            </button>
          </div>
        </div>
      </div>
      <div id="res-details">
        <div id="option-buttons">
          {sessionUser?.id !== restaurant?.owner.id && (
            <button onClick={() => history.push(`/restaurants/${restaurant?.id}/new-review`)}>Write a review</button>
          )}
          {sessionUser?.id === restaurant?.owner?.id && (
            <div id="manage-buttons">
              <button onClick={() => history.push(`/restaurants/edit/${restaurant?.id}`)}>Update Restaurant Info</button>
              <OpenModalButton
                buttonText="Delete Restaurant"
                modalComponent={<DeleteForm restaurantId={restaurant?.id} />}
              />
            </div>
          )}
          <div id="res-location">
            <div id="location-tag">Location:</div>
            <div> {restaurant?.address}, {restaurant?.city}, {restaurant?.state}, {restaurant?.country}</div>
          </div>
        </div>
        <div id="all-da-reviews">
          <div id="rec-review-text">Recommended Reviews</div>
          {restaurant?.reviews?.map((review) => (
            <div id="res-details-rev-info">
              <div id="rev-prof-header">
                <div id="prof-stars">
                  <img className='profile-image' src='https://cdn.discordapp.com/attachments/1115823811116400650/1153911006939054180/gayboyjosh.png' alt="profile button"></img>
                  <div id="reviewer-username">
                    {review?.reviewer?.username}
                    <div>{[...Array(review?.stars)].map((_, i) => <span key={i} class="material-symbols-outlined">star_rate</span>)}</div>
                  </div>
                </div>
                {review?.reviewer?.id === sessionUser?.id && (
                  <div id="manage-rev-buttons">
                    <button onClick={() => history.push(`/restaurants/${restaurant?.id}/review/${review?.id}/edit`)}>Update Review</button>
                    <OpenModalButton
                      buttonText="Delete Review"
                      modalComponent={<DeleteReviewForm reviewId={review?.id} />}
                    />
                  </div>
                )}
              </div>
              <div id="details-review-text">{review?.review}</div>
              {review?.images.length > 0 && (
                <div id="rev-imgs-container">
                  {review.images.map((image) => (
                    <img src={image.url} />
                  ))}
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
