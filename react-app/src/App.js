import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import HomePage from "./components/HomePage";
import GetAllRestaurantsPage from "./components/GetAllRestaurants";
import RestaurantDetailsPage from "./components/RestaurantDetails";
import CreateRestaurant from "./components/createRestaurantForm";
import ReviewModal from "./components/ReviewModal";
import UpdateForm from "./components/updateRestaurant";
import UpdateReviewFunc from "./components/UpdateReview";
import UpdateReviewImgFunc from "./components/UpdateReview";
import ManageResImgFunc from "./components/UpdateReviewImages";
import UpdateResImgFunc from "./components/UpdateResImages";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/login">
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path="/restaurants/:restaurantId/review/:reviewId/edit">
            <UpdateReviewFunc />
          </Route>
          <Route path="/restaurants/:restaurantId/review/:reviewId/images/edit">
            <UpdateReviewImgFunc />
          </Route>
          <Route path="/restaurants/:name/:price/:category">
            <GetAllRestaurantsPage />
          </Route>
          <Route path="/restaurants/:restaurantId/new-review">
            <ReviewModal />
          </Route>
          <Route path="/restaurants/edit/:restaurantId">
            <UpdateForm />
          </Route>
          <Route path="/restaurants/new">
            <CreateRestaurant />
          </Route>
          <Route path="/restaurants/:restaurantId">
            <RestaurantDetailsPage />
          </Route>
          <Route path="/">
            <HomePage />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
