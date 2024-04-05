import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import { thunkGetCurrentUserPhotos } from "../../store/photos";
import { fetchUser } from "../../store/users";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  const history = useHistory();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    closeMenu()
    history.push('/');

  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  const manage = async (e, id) => {
    e.preventDefault();
    closeMenu();
    await dispatch(thunkGetCurrentUserPhotos(id))
    await dispatch(fetchUser(id));
    history.push(`/users/${id}/photos`)

  }

  return (
    <>
      <button onClick={openMenu} className='profile-button'>
          <i className="fas fa-bars" id='hamburger-menu'></i>
          <i className="fas fa-user-circle" id='profile-icon' />
        </button>
      <div className="dropdown">
        <ul className={ulClassName} ref={ulRef}>
          { user ? (
            <div className="dropdown-content loggedin">
              <p className="hello">Hello, {user.firstName}!</p>
              <p className="email">{user.email}</p>
              {/* <hr style={{background: "black", height: "1px", width: "100%" }}/> */}

              <button className="manage-btn" onClick={(e, id) => manage(e, user.id)}>My Profile</button>
              {/* <hr style={{background: "black", height: "1px", width: "100%" }}/> */}

              <button className="logout-btn" onClick={handleLogout}>Log Out</button>
            </div>
          ) : (
            <div className="dropdown-content loggedout" id='logged-out-menu'>
              <div className='single-button-container-div'>
                <li className="li">
                  <OpenModalButton
                    className = 'sign-up-button'
                    buttonText="Sign Up"
                    onItemClick={closeMenu}
                    modalComponent={<SignupFormModal />}
                    // style={{border: "1px solid red", width: "90%", fontWeight: "500", textAlign: "left", height: "90%"}}
                    />
                  </li>
                </div>
                <div className='single-button-container-div'>
                  <li className="li">
                    <OpenModalButton
                      className = 'sign-up-button'
                      id='login_modal'
                      buttonText="Log In"
                      onItemClick={closeMenu}
                      modalComponent={<LoginFormModal />}
                      />
                  </li>
               </div>
            </div>
        )}
        </ul>
      </div>
    </>
  );
}

export default ProfileButton;
