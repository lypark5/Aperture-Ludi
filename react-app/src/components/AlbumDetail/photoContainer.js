import React, {useRef, useState} from "react";
import { useHistory } from "react-router-dom";
import './AlbumDetail.css'

export default function PhotoContainer({photo, album}) {
    const [albumInfoBox, setAlbumInfoBox] = useState(false)
    const ref = useRef()
    const history = useHistory()
    const urlToString = url => {
        return `url(${url})`
    }

    const backgroundImageStyle = (url) => {
        return {
            backgroundImage: urlToString(url),
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
        }
    }

    const photoDetail = (e, photoId) => {
        e.stopPropagation();
        history.push(`/photos/${photoId}`)
    }

    if (!album.user) return null
    return (
        <div onClick={(e)=>photoDetail(e, photo.id)}>
            <div style={backgroundImageStyle(photo.url)} className="photo-detail-container" ref={ref} onMouseEnter={() => setAlbumInfoBox(true)} onMouseLeave={() => setAlbumInfoBox(false)} key={photo.id}>{albumInfoBox && <div className="text">

                    <div className="title-and-name" style={{backgroundColor: "rgba(0, 0, 0, 0.236)"}} >
                        <div>{photo.title}</div>
                        <div>by {album.user.firstName} {album.user.lastName}</div>
                    </div>
                    {/* <div className="icons">
                        <i className="far fa-star"></i>
                        <i className="far fa-comment"></i>
                    </div> */}
                    </div>}</div>



        </div>
    )
}
