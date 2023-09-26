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

const deleteUserReview = (review) => ({
  type: DELETE_REVIEW,
  review,
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

export const createReview =
  (restaurantId, review, stars) => async (dispatch) => {
    const res = await fetch(`/api/restaurants/${restaurantId}/reviews/new`, {
      method: "POST",
      body: JSON.stringify(review, stars),
    });

    if (res.ok) {
      const reviewData = await res.json();
      dispatch(createRestaurantReview(reviewData));
      return res;
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
  const res = fetch(`/api/reviews/${reviewId}/delete`, {
    method: "DELETE",
  });
  dispatch(deleteUserReview(reviewId));
  return res;
};

export const updateReview = (reviewId, reviewData) => async (dispatch) => {
  const res = fetch(`/api/reviews/${reviewId}/update`, {
    method: "PUT",
    body: JSON.stringify(reviewData),
  });
  const review = await res.json(res);
  dispatch(updateUserReview(review));
  return res;
};

export const createReviewImage =
  (reviewId, reviewImageData) => async (dispatch) => {
    const res = await fetch(`/api/reviews/${reviewId}/images/new`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(reviewImageData),
    });

    if (res.ok) {
      const newReviewImage = await res.json();
      dispatch(createReviewImageAction(newReviewImage));
      return newReviewImage;
    }
  };

export const deleteReviewImage =
  (reviewImageId) => async (dispatch) => {
    const res = await fetch(
      `/api/reviews/images/${reviewImageId}/delete`,
      {
        method: "DELETE",
      }
    );
    dispatch(deleteReviewImageAction(reviewImageId));
    return res;
  };

const reviewReducer = (state = {}, action) => {
  let newState = { ...state };

  switch (action.type) {
    case LOAD_REVIEWS:
      action.reviews.forEach((review) => {
        newState[review.id] = review;
      });
      return newState;
    case CREATE_REVIEW:
      newState[action.review.id] = action.review;
      return newState;
    case DELETE_REVIEW:
      delete newState[action.reviewId];
      return newState;
    default:
      return state;
  }
};

export default reviewReducer;
