import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { thunkOneAlbum } from '../../store/albums'
import { thunkGetAllPhotos } from '../../store/photos'
import { NavLink } from 'react-router-dom'
import './AlbumDetail.css'
import { useParams } from "react-router-dom";
import PhotoContainer from './photoContainer'
import { useBackgroundImgContext } from '../../context/BackgroundImage'

export default function AlbumDetail() {
    const dispatch = useDispatch();
    const {userId, albumId} = useParams()
    const album = useSelector(state => state.albums.singleAlbum)
    const allPhotos = useSelector(state => state.photos.allPhotos)
    const { backgroundImg } = useBackgroundImgContext()
    useEffect(() => {
        dispatch(thunkGetAllPhotos()).then(()=>dispatch(thunkOneAlbum(userId, albumId)))
    }, [])

    if (!Object.values(album).length || !Object.values(allPhotos).length) return null

    const res  = (allPhotos, userId) => {
        return Object.values(allPhotos).filter(photo => photo.userId == userId && photo.albumId == album.id)
    }

      const previewUrl = []

      for (let photo of res(allPhotos, userId)) {
        if (photo.previewImg === true) {
            previewUrl.push(photo.url)
        }
      }
      res(allPhotos, userId)[0] ? previewUrl.push(res(allPhotos, userId)[0]?.url) : previewUrl.push(backgroundImg)

      const backgroundImageStyle = (photoUrl) => {
  
        return {
            backgroundImage: `url(${photoUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
        }
    }

    return (
        <div id='album-detail-outer'>


            <div className='one-album-container'>
                <div className='back-to-albums'>
                    <NavLink to={`/users/${userId}/albums`}>        {/*new nested route dynamically created after AlbumDetail component is rendered*/}
                        <i className="fas fa-arrow-left"></i>
                        Back to albums list
                    </NavLink>
                </div>
                <div className='album-detail-container' style={backgroundImageStyle(previewUrl.length ? previewUrl[0] : backgroundImg)}>
                    <div id='album-detail-info-card'>
                        <h1 id='album-title'>{album.title}</h1>
                        <div id='album-tiddly-bits'>
                            <div>{album.description}</div>
                            <div>{res(allPhotos, userId).length == 1 ? '1 photo' : `${res(allPhotos, userId).length} photos`}</div>
                            <div>By: {album.user?.firstName} {album.user?.lastName}</div>
                        </div>
                    </div>

                </div>
                <div className='photos-container'>
                    {res(allPhotos, userId).sort((a, b) => {
                    const latest = new Date(a.createdAt)
                    const earliest = new Date(b.createdAt)
                    if (earliest.getTime() > latest.getTime()) return -1
                    if (latest.getTime() > earliest.getTime()) return 1
                    return 0
                    }).map(photo => <div key={photo.id}><PhotoContainer photo={photo} album={album} /></div>)}
                </div>
            </div>

        </div>
    )
}

