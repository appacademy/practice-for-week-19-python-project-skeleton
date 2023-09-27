import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, NavLink, Switch } from 'react-router-dom';
import { fetchReviews } from "../../store/reviews";
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
    let reviewObject = useSelector((state) => state.reviews)
    let reviewArray = Object.values(reviewObject)
    let iterable = reviewArray.length - 1

    console.log(reviewArray)

    let reviewId = getRandomNumbers(iterable)

    console.log(reviewId)
    let array = [];
    reviewId.forEach(id => {
        array.push(reviewArray[id - 1])
    })

    console.log(array)



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
                    {array?.map((review) => (
                        <NavLink id="homepage-review" to={`/restaurants/${review?.restaurant_id}`}>
                            <li key={review?.id} className="single-review">
                                {review?.review} {review?.stars} {review?.reviewer?.username}
                                {review?.images?.map((image) => (
                                    <img src={image?.url} alt='review-image' key={image?.id}></img>
                                ))}
                            </li>
                        </NavLink>
                    ))}

                </ul>
        </div>
    )



}

export default HomePage;
