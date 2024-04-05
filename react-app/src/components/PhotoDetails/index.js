import React, {useState, useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, NavLink, useHistory } from "react-router-dom";
import { thunkGetAllUsers } from "../../store/users";
import { thunkGetSinglePhoto, fetchAllphotos } from "../../store/photos";
import { UserBlurb } from "../UserBlurb";
import * as sessionActions from "../../store/comments";
import GetAllCommentsByPhotoIdFunction from "../GetAllComments";
import { CreateComments } from "../CreateComments";
import { thunkCreateFav, thunkAllFav } from "../../store/fav";
import './PhotoDetails.css';


export const PhotoDetails = () => {
    const dispatch = useDispatch();
    const {photoId} = useParams();
    const users = Object.values(useSelector(state => state.users.allUsers));
    const currentUser = useSelector(state => state.session.user);
    const photo = useSelector(state => state.photos.singlePhoto);
    const comments = Object.values(useSelector(state => state.comments.photoComments)).filter(comment => comment.photoId == photoId);
    const history = useHistory();
    const favPics = Object.values(useSelector(state=>state.favs.allFav))
    const currentUserFavpic = favPics.filter(favphoto=>favphoto.id == photo.id)

    useEffect(() => {
        dispatch(thunkGetSinglePhoto(photoId));
        dispatch(thunkGetAllUsers());
        dispatch(fetchAllphotos(currentUser.id));
        dispatch(sessionActions.thunkGetAllCommentsByPhotoId(photoId));
    }, [dispatch]);

    if (!currentUser) return null;

    const handleSubmit = (userId, photoId) => {
        dispatch(thunkCreateFav(userId, photoId)).then(()=>dispatch(thunkGetSinglePhoto(photo.id))).then(()=>dispatch(fetchAllphotos(currentUser.id)))
    }
 
    const handleClick = (e, id) => {
        e.stopPropagation();
        history.push(`/users/${id}/photos`)
    }

    photo["Owner"] = Object.values(users).find(user => user.id === photo.userId);

    

    return (
        <div id='outer-detail-div'>
            <div id='gray-div'>
                {/* <span id='detail-go-back'>
                    <NavLink to={`/users/${photo.userId}/photos`} style={{textDecoration: 'none', color: 'white', border: '1px solid white'}}>
                        <i className="fas fa-arrow-left" style={{color: 'white'}}></i>
                        &nbsp;&nbsp;Back to Photostream
                    </NavLink>
                </span> */}
                <img src={photo?.url} alt={photo?.title} id='detail-pic'></img>
            </div>
            <div id='detail-mid'>
                <span id='detail-mid-left-big'>
                    <span id='detail-user-stuff' onClick={(e) => handleClick(e, photo.userId)}>
                        <img src={photo?.Owner?.profilePic} id='detail-profile-pic'></img>
                        <h3 id='username-h3'>{photo?.Owner?.username}</h3>
                    </span>
                </span>
                <span id='photo-details-block'>
                    <h3 id='detail-photo-title'>{photo.title}</h3>
                    <div id='detail-photo-desc'>{photo.description}</div>
                </span>
                <span id='detail-mid-right-big'>
                    <p id='fave-word-star' onClick={() => handleSubmit(currentUser.id, photo.id)}>Favorite <i className={ currentUserFavpic.length ? "fas fa-star" : "far fa-star"}  style={{color: "#FFD700"}}></i></p>
                    <span id='details-like-count'>Likes: {photo.favoriteCount}</span>
                </span>
            </div>
            <div id='detail-bottom-outer'>
                <div id='create-comments-container-div'>
                    <CreateComments />
                </div>
                <div id='comments-container'>
                    {Object.values(comments).length ? comments.toReversed().map(comment =>
                        <GetAllCommentsByPhotoIdFunction comment={comment} currentUser={currentUser} photoId={photo.id}/>
                    ):<p>Be the first to leave a comment!</p>}
                </div>
            </div>
        </div>
    )
}
