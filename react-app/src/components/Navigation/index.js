import React, {useState} from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);
	const [query, setQuery] = useState("")

	return (
		<div>
		<ul className='nav-bar'>
			<li>
				<NavLink exact to="/"><img className='home-button' src='https://cdn.discordapp.com/attachments/1115823811116400650/1153915198898450462/joshisgay3.png' alt='home button'></img></NavLink>
			</li>
			<li className='search-bar'>
				<form className='search-bar-form'>
					<input className='search-input' type='text' onChange={e => setQuery(e.target.value)} placeholder='Search...'></input>
					<select className='genre-input-1'>
						<option value='' disabled selected>Genre</option>
						<option value="0">Mexican</option>
                		<option value="1">Korean</option>
                		<option value="2">American</option>
                		<option value="3">Japanese</option>
                		<option value="4">French</option>
                		<option value="5">Indian</option>
					</select>
					<select className='price-input-1'>
						<option value='' disabled selected>Price</option>
						<option value="0">$</option>
                		<option value="1">$$</option>
                		<option value="2">$$$</option>
                		<option value="3">$$$$</option>
					</select>
					 <button class="search-submit-button">
						<i class='fa fa-search'></i>
					</button>
				</form>
			</li>
			{isLoaded && (
				<li>
					<ProfileButton user={sessionUser} />
				</li>
			)}
		</ul>
		</div>
	);
}

export default Navigation;
