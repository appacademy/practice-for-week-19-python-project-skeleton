import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, NavLink, Switch } from 'react-router-dom';
import { fetchReviews } from "../../store/reviews";
import { Route } from "react-router-dom/cjs/react-router-dom.min";
import "./HomePage.css";


const HomePage = () => {
    const dispatch = useDispatch();
    let reviewObject = useSelector((state) => state.reviews)
    reviewObject = Object.values(reviewObject)


    useEffect(() => {
        dispatch(fetchReviews())
    }, [dispatch])
    /* <img src={review.images[0].url} /> */


    // reviewObject = Object.values(reviewObject)



    return (
        <div className="homepage">
            <div id="backround-image">
            </div>
            <ul>
                    {reviewObject.map((review) => (
                        <NavLink id="homepage-review" to={`/restaurants/${review.restaurant_id}`}>
                            <li key={review.id} className="single-review">
                                {review.review}
                            </li>
                        </NavLink>
                    ))}

                </ul>
        </div>
    )



}

export default HomePage;
