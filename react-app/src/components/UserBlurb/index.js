import { useHistory } from "react-router-dom"
import { thunkCreateFav } from "../../store/fav"
import { useDispatch, useSelector } from "react-redux"
import { useState } from "react"
import { thunkGetAllPhotos, thunkGetSinglePhoto } from "../../store/photos"
import './UserBlurb.css'


export const UserBlurb = ({url, username, styles, userId, photoId,  currentUser, userFavpic, count}) => {
    const history = useHistory()
    const dispatch = useDispatch()
    const fillStars = userFavpic.filter(photo=>photo.id == photoId)
    const [fav, setFav] = useState(fillStars.length ? true : false)
    const handleClick = (e) => {
        e.stopPropagation();
        history.push(`/users/${userId}/photos`)
    }
    const handleSubmit = (e, userId, photoId) => {
        e.stopPropagation()
        setFav(!fav)
        dispatch(thunkCreateFav(userId, photoId)).then(() => dispatch(thunkGetAllPhotos()).then(() => thunkGetSinglePhoto(photoId)));
    }

    return (
        <div className="user-blurb-container">
            <span onClick={e=>handleClick(e)} className="user-blurb-left">
                <img src={url} className="circle-prof-pic"></img>
                <p id="home-user-name">{username}</p>
            </span>
            <span className="user-blurb-right">
                <i id='home-star' className={fav ? "fas fa-star" : "far fa-star"} onClick={e => handleSubmit(e, currentUser.id, photoId)} style={{color: '#7eb1ff'}}></i> 
                <span id='home-count'>{count}</span>
            </span>

        </div>
    )
}
