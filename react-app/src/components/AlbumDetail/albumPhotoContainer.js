import React, {useRef, useState} from "react";
import './AlbumDetail.css'

export default function AlbumPhotoContainer({photo, album}) {
    const [albumInfoBox, setAlbumInfoBox] = useState(false)
    const ref = useRef()

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


    return (
        <div>
            <div style={backgroundImageStyle(photo.url)} className="album-photo-detail-container" ref={ref} onMouseEnter={() => setAlbumInfoBox(true)} onMouseLeave={() => setAlbumInfoBox(false)} key={photo.id}>{albumInfoBox && <div className="text">

                    <div className="title-and-name">
                        <div>{photo.title}</div>
                        <div>by {album.user.firstName} {album.user.lastName}</div>
                    </div>
                    <div className="icons">
                        <i className="far fa-star"></i>
                        <i className="far fa-comment"></i>
                    </div>
                    </div>}</div>



        </div>
    )
}
