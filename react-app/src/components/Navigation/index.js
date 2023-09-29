import React, { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
    const history = useHistory()
    const sessionUser = useSelector(state => state.session.user);
    const [name, setName] = useState(0)
    const [category, setCategory] = useState(0)
    const [price, setPrice] = useState(0)


    const handleReset = () => {
        Array.from(document.querySelectorAll("input")).forEach(input => (input.value = ""));
        Array.from(document.querySelectorAll("select")).forEach(select => (select.value = "0"))

    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        history.push(`/restaurants/${name}/${price}/${category}`)
        setName(0)
        setCategory(0)
        setPrice(0)
        handleReset()
    }



    return (
        <div>
            <ul className='nav-bar'>
                <li>
                    <NavLink exact to="/"><img className='home-button' src='https://cdn.discordapp.com/attachments/1115823811116400650/1153915198898450462/joshisgay3.png' alt='home button'></img></NavLink>
                </li>
                <li className='search-bar'>
                    <form className='search-bar-form' onSubmit={handleSubmit}>
                        <input className='search-input' type='text' onChange={e => setName(e.target.value)} placeholder='Search...'></input>
                        <select className='genre-input-1' onChange={e => setCategory(e.target.value)}>
                            <option value="0">Genre</option>
                            <option value="Mexican">Mexican</option>
                            <option value="Korean">Korean</option>
                            <option value="American">American</option>
                            <option value="Japanese">Japanese</option>
                            <option value="French">French</option>
                            <option value="Indian">Indian</option>
                        </select>
                        <select className='price-input-1' onChange={e => setPrice(e.target.value)}>
                            <option value="0">Price</option>
                            <option value="1">$</option>
                            <option value="2">$$</option>
                            <option value="3">$$$</option>
                            <option value="4">$$$$</option>
                        </select>
                        <button type="submit" class="search-submit-button">
                            <i class='fa fa-search'></i>
                        </button>
                    </form>
                </li>
                {isLoaded && (

                    <li id="corner-nav-container">
                    <NavLink className='create-restaurant-button' to="/restaurants/new">
                        Create a restaurant
                    </NavLink>
                        <ProfileButton user={sessionUser} />
                    </li>
                )}
            </ul>
        </div>
    );
}

export default Navigation;
