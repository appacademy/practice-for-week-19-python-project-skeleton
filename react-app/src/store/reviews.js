const LOAD_REVIEWS = "Reviews/LOAD_REVIEWS";
const CREATE_REVIEW = "Reviews/CREATE_REVIEW";
const DELETE_REVIEW = "Reviews/DELETE_REVIEW";
const UPDATE_REVIEW = "Reviews/UPDATE_REVIEW";
const CREATE_REVIEW_IMAGE = "CREATE_REVIEW_IMAGE";
const DELETE_REVIEW_IMAGE = "DELETE_REVIEW_IMAGE";

const createRestaurantReview = (review) => ({
  type: CREATE_REVIEW,
  review,
});

const fetchRestaurantReviews = (reviews) => ({
  type: LOAD_REVIEWS,
  reviews,
});

const updateUserReview = (review) => ({
  type: UPDATE_REVIEW,
  review,
});

const deleteUserReview = (reviewId) => ({
  type: DELETE_REVIEW,
  reviewId,
});

const createReviewImageAction = (reviewImage) => ({
  type: CREATE_REVIEW_IMAGE,
  reviewImage,
});

const deleteReviewImageAction = (reviewImageId) => ({
  type: DELETE_REVIEW_IMAGE,
  reviewImageId,
});

export const fetchReviews = () => async (dispatch) => {
  const res = await fetch("/api/reviews");
  if (res.ok) {
    const reviews = await res.json();
    dispatch(fetchRestaurantReviews(reviews));
    return res;
  }
};

export const createReview = (restaurantId, reviewData) => async (dispatch) => {
  const res = await fetch(`/api/restaurants/${restaurantId}/reviews/new`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(reviewData),
  });

  if (res.ok) {
    const reviewData = await res.json();
    dispatch(createRestaurantReview(reviewData));
    return reviewData;
  } else {
    const errors = await res.json();
    return errors;
  }
};

export const loadRestaurantReviews = (restaurantId) => async (dispatch) => {
  const res = await fetch(`/api/restaurants/${restaurantId}/reviews`);
  if (res.ok) {
    const reviews = await res.json();
    dispatch(fetchRestaurantReviews(reviews));
    return res;
  }
};

export const deleteUserReviews = (reviewId) => async (dispatch) => {
  const res = fetch(`/api/reviews/delete/${reviewId}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    return "Review couldn't be removed";
  }
  dispatch(deleteUserReview(reviewId));
};

export const updateReview = (restaurantId, reviewId, reviewData) => async (dispatch) => {
  const res = fetch(`/api/restaurants/${restaurantId}/review/${reviewId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(reviewData)
  });

  if (res.ok) {
    const updatedReview = await res.json();
    dispatch(updateUserReview(updatedReview));
    return updatedReview;
  }
};

export const createReviewImage =
  (image, reviewId) => async (dispatch) => {
    const res = await fetch(`/api/reviews/${reviewId}/images/new`, {
      method: "POST",
      body: image,
    });

    if (res.ok) {
      const result = await res.json();
      await dispatch(createReviewImageAction(result));
    } else {
      console.log("There was an error making your post!")
    }
  };

export const deleteReviewImage = (reviewImageId) => async (dispatch) => {
  const res = await fetch(`/api/reviews/images/${reviewImageId}/delete`, {
    method: "DELETE",
  });
  dispatch(deleteReviewImageAction(reviewImageId));
  return res;
};

const reviewReducer = (state = {}, action) => {
  let newState = { ...state };

  switch (action.type) {
    case LOAD_REVIEWS:
      newState = {}
      action.reviews.forEach((review) => {
        newState[review.id] = review;
      });
      return newState;
    case CREATE_REVIEW:
      newState[action.review.id] = action.review;
      return newState;
    case UPDATE_REVIEW:
      newState[action.review.id] = action.review;
      return newState;
    case CREATE_REVIEW_IMAGE:
      newState[action.reviewImage.id] = action.reviewImage;
      return newState;
    case DELETE_REVIEW_IMAGE:
      delete newState[action.reviewImageId];
      return newState;
    case DELETE_REVIEW:
      delete newState[action.reviewId];
      return newState;
    default:
      return state;
  }
};

export default reviewReducer;
