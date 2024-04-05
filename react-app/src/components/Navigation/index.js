import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ProfileButton from './ProfileButton';
import { useHistory } from 'react-router-dom/';
import './Navigation.css';
import OpenModalButton from '../OpenModalButton';
import { PhotoFormModalFunction } from '../PhotoFormModalFunction';
import { fetchAllphotos } from '../../store/photos'

function Navigation({ isLoaded }) {
	const sessionUser = useSelector(state => state.session.user);
	const dispatch = useDispatch()
	const history = useHistory()
	let homeUrl;
	sessionUser ? homeUrl = "/photos/all" : homeUrl = "/";
	const clickCreateButton = (userId) => {
		dispatch(fetchAllphotos(userId))
		history.push("/albums/new")
	}

	return (
		<div className='nav-bar'>
			<NavLink exact to={homeUrl} style={{ textDecoration: "none" }}>
				<div className="logo-btn" style={{ display: "flex", flexDirection: "row", justifyContent: "center", marginLeft: "60px" }}>
					<div className="logo-title" style={{ color: "#41BEE6", textDecoration: "none", fontSize: "25px", alignSelf: "center", marginLeft: "5px", color: "white" }}><img src="https://aperture-bucket-april-2023.s3.amazonaws.com/logo.png" style={{ height: "10px", paddingBottom: "2px", paddingRight: "4px" }} />aperture</div>
				</div>
			</NavLink>
			<span id="right-side-nav" style={{ display: "flex", flexDirection: "row", justifyContent: "center", marginRight: "20px", gap: "15px" }}>
				<span className="upload-links">
					{sessionUser &&
						<OpenModalButton
							modalComponent={<PhotoFormModalFunction />}
							buttonText={<p id='upload-photo-link'>Upload Photo</p>}
					style={{ width: "120px", backgroundColor: "transparent", color: "white", border: "none" }}
					className={"new-spot-link"}
					/>
					}
					{sessionUser && <div onClick={() => clickCreateButton(sessionUser.id)} className="new-spot-link">
						Create an Album
					</div>}
				</span>
				{isLoaded && (
					<div className="prof-btn" style={{ marginRight: "10%" }}>
						<ProfileButton user={sessionUser} />
					</div>
				)}
			</span>
		</div>
	);
}

export default Navigation;
