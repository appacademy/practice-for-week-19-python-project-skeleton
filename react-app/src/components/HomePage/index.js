import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, NavLink, Switch } from 'react-router-dom';
import { fetchReviews } from "../../store/reviews";
import { loadRestaurants } from "../../store/restaurants";
import { Route } from "react-router-dom/cjs/react-router-dom.min";
import "./HomePage.css";


const HomePage = () => {



    function getRandomNumbers(maxNumber) {
        const allNumbers = Array.from({ length: maxNumber }, (_, index) => index + 1);

        for (let i = allNumbers.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [allNumbers[i], allNumbers[j]] = [allNumbers[j], allNumbers[i]];
        }

        return allNumbers.slice(0, 9);
      }


    const dispatch = useDispatch();
    let restaurantObject = useSelector((state) => state.restaurant)
    let restaurantArray = Object.values(restaurantObject)
    let restaurantIterable = restaurantArray.length - 1
    let reviewObject = useSelector((state) => state.reviews)
    let reviewArray = Object.values(reviewObject)
    let iterable = reviewArray.length - 1
    console.log(restaurantObject)




    let reviewId = getRandomNumbers(iterable)
    let restaurantId = getRandomNumbers(restaurantIterable)


    let array = [];
    reviewId.forEach(id => {
        array.push(reviewArray[id - 1])
    })

    let arr = [];
    restaurantId.forEach(id => {
        arr.push(restaurantArray[id - 1])
    })


    {[...Array(9)].map((_, i) => <span key={i} class="material-symbols-outlined">star_rate</span>)}




    useEffect(() => {
        dispatch(fetchReviews())
        dispatch(loadRestaurants(0, 0, 0))
    }, [dispatch])
    /* <img src={review.images[0].url} /> */


    // reviewObject = Object.values(reviewObject)



    return (
        <>
        <div id="backround-image"></div>
            <div className="restaurant-container">
            <h2 id="header-text">Your Next Review Awaits</h2>
                <ul className="restaurant-wrapper">
                    {arr?.map((restaurant) => (
                    <NavLink id="restaurant-link" to={`/restaurants/${restaurant?.id}`}>
                        <li className="single-restaurant">
                            <img className="rst-img-home" src={restaurant?.images[0]?.url} />
                            <h2>{restaurant?.name}<p>Do you reccomend this business?</p></h2>
                        </li>
                    </NavLink>
                    ))}
                </ul>
            </div>
            <div id="reviews-wrapper">
                <h2>Recent Activity</h2>
            <ul className="review-wrapper">
                    {array?.map((review) => (
                        <NavLink id="homepage-review" to={`/restaurants/${review?.restaurant_id}`}>
                            <li key={review?.id} className="single-review">
                            <div id="reviewer-username">{review?.reviewer?.username}</div>
                            {review?.images?.map((image) => (
                                <img className="homepage-image" src={image?.url} alt='review-image' key={image?.id}></img>
                                ))}
                                <div id="reviewer-review">{review?.review}</div>
                                <div id="reviewer-stars">
                                {[...Array(review?.stars)].map((_, i) => <span key={i} class="material-symbols-outlined">star_rate</span>)}
                                </div>
                            </li>
                        </NavLink>
                    ))}

                </ul>
        </div>
        </>
    )



}

export default HomePage;
