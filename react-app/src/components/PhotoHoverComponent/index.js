import React, {useRef, useState} from "react";
import { useHistory } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import DeletePhotoModalFunction from "../DeletePhotoModal";
import { PhotoFormModalFunction } from "../PhotoFormModalFunction";
import {thunkCreateFav} from "../../store/fav"
import {useDispatch, useSelector} from "react-redux"
import { thunkGetAllPhotos, thunkGetSinglePhoto } from "../../store/photos";


export default function PhotoHoverComponent({photo, isCurrentUserOnOwnPage, userid, type, ownerName, photoUrl}) {
    const [photoInfoBox, setPhotoInfoBox] = useState(false)
    const ref = useRef()
    const currentUser = useSelector(state => state.session.user)
    const dispatch = useDispatch()
    const history = useHistory();

    const urlToString = url => {
        return `url(${url})`
    }

    const backgroundImageStyle = (url) => {
        return {
            backgroundImage: urlToString(url),
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            width: '300px',
            height: '300px'
        }
    }

    const handleSubmit = (e, userId, photoId) => {
        e.stopPropagation()

        dispatch(thunkCreateFav(userId, photoId)).then(() => thunkGetSinglePhoto(photoId)).then(() => thunkGetAllPhotos())
    }

    const displayName = (name) => {
        if (type && type === "photoStream") {
            if (isCurrentUserOnOwnPage) {
                return "YOU!"
            } else return `${name}`;
        }
        if (type && type === "fav") {
            if (currentUser.username === name) return "YOU!";
            return `${name}`;
        }
    }


    return (

            <div style={backgroundImageStyle(photoUrl)} className="photo-detail-container" ref={ref} onMouseEnter={() => setPhotoInfoBox(true)} onMouseLeave={() => setPhotoInfoBox(false)} key={photo.id} onClick={() => history.push(`/photos/${photo.id}`)}>
                {photoInfoBox &&
                    <div className="text" >
                        <div className="title-name-icons" style={{display: "flex", flexDirection: "row", justifyContent: "space-between", width: "100%", alignItems: "center", backgroundColor:"rgba(0, 0, 0, 0.236)"}}>
                            <div className="title-and-name">
                                <div>{photo.title}</div>
                                <div style={{fontSize: "11px"}}>by {displayName(ownerName)}</div>
                            </div>
                            { isCurrentUserOnOwnPage && type === 'photoStream' ?
                                <div className="owner-icons" style={{display: "flex", gap:"6px"}}>
                                    <OpenModalButton
                                        modalComponent={<PhotoFormModalFunction photo={photo} formType={'Update'}/>}
                                        buttonText={<i className="fas fa-edit" style={{color: "white", cursor:'pointer'}}></i>}
                                        style={{backgroundColor: "transparent", border: "none"}}
                                    />
                                    <OpenModalButton
                                        modalComponent={<DeletePhotoModalFunction photoId={photo.id} userid={userid}/>}
                                        buttonText={<i className="fas fa-trash-alt" style={{color: "white", cursor:'pointer'}}></i>}
                                        style={{backgroundColor: "transparent", border: "none"}}
                                    />
                                </div> : null
                            }
                            {
                                type === "fav" &&
                                     isCurrentUserOnOwnPage ? <div onClick={e => handleSubmit(e, currentUser.id, photo.id)} ><i style={{color: "#FFD700", paddingRight: "10px"}} className="fas fa-star" /> </div> : null

                            }
                        </div>
                    </div>
                }
            </div>
    )
}
