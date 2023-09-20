import React, {useState} from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);
	const [query, setQuery] = useState("")

	return (
		<ul className='nav-bar'>
			<li>
				<NavLink exact to="/"><img className='home-button' src='https://cdn.discordapp.com/attachments/1115823811116400650/1153915198898450462/joshisgay3.png' alt='home button'></img></NavLink>
			</li>
			<li className='search-bar'>
				<input className='search-input' type='text' onChange={e => setQuery(e.target.value)} placeholder='Search...'></input>
					<i class='fa fa-search'></i>
			</li>
			{isLoaded && (
				<li>
					<ProfileButton user={sessionUser} />
				</li>
			)}
		</ul>
	);
}

export default Navigation;
