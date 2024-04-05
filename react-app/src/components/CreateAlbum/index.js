import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import './CreateAlbum.css'
import { thunkCreateAlbum, fetchUpdateAlbum, thunkOneAlbum } from '../../store/albums'
import { thunkGetAllPhotos, thunkGetSinglePhoto } from '../../store/photos'
import { useLocation } from 'react-router-dom'
import { thunkUpdatePhotoList, thunkUpdatePhotoListAlbum  } from '../../store/photos'
import { useHistory } from 'react-router-dom'

export default function CreateAlbum() {
    console.log('IN CREATE ALBUM ')
    const photos = Object.values(useSelector(state => state.photos.allPhotos))
    const currentUser = useSelector(state => state.session.user)
    const dispatch = useDispatch()
    const location = useLocation()
    const type = location.state ? location.state.type : 'create'
    const albumId = location.state ? location.state.albumId : ''
    const userId = location.state ? location.state.userId : ''
    const updateAlbum = useSelector(state => state.albums.allAlbums[albumId])
    const [title, setTitle] = useState(updateAlbum ? updateAlbum.title : "")
    const [description, setDescription] = useState(updateAlbum ? updateAlbum.description : "")
    const [photoIdList, setPhotoIdList] = useState(updateAlbum ? updateAlbum.photos?.map(photo => photo.id) : [])
    const [error , setError] = useState({})
    const history = useHistory()
    useEffect(() => {
        dispatch(thunkGetAllPhotos())
    }, [])


    if (!photos.length || !currentUser) return null;
    const userPhotos = photos.filter(photo => photo.userId == currentUser.id)

    const backgroundImageStyle = (photoUrl) => {
        return {
            backgroundImage: `url(${photoUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        const res = []
        const newAlbum = {
            title: title,
            description: description,
            user_id: currentUser.id
        }

        for (let id of photoIdList) {
            for (let userPhoto of userPhotos) {
                if (id == userPhoto.id) res.push(userPhoto)
            }
        }
        if (type === 'create') {
            dispatch(thunkCreateAlbum(newAlbum, currentUser.id))
                .then((album) => dispatch(thunkUpdatePhotoList(res, album.id)))
                .then(() => dispatch(thunkGetAllPhotos()))
                .then(() => history.push(`/users/${currentUser.id}/albums`))
                .catch(e => setError(e));
        }
        else{
            dispatch(fetchUpdateAlbum(albumId, currentUser.id, newAlbum)).then((album) => dispatch(thunkUpdatePhotoListAlbum(res, album.id))).then(()=>dispatch(thunkGetAllPhotos())).catch(e => setError(e))
            history.push(`/users/${currentUser.id}/albums/${albumId}`)
        }
    }

    const handleCancel = (id) => {
        history.push(`/users/${id}/albums`)
    }

    return (
        <div id='create-whole-page'>
            <div id='create-meat'>
                <h1 id='create-album-h1'>{type === 'edit' ? 'Update Album' : 'Create Album'}</h1>
                <form id='album-form' onSubmit={handleSubmit}>
                    <div id='both-container'>

                        <span id='left-create'>
                            <div id='left-create-80'>
                                <div className='album-titles'>Album Title</div>
                                <input
                                    type="text"
                                    placeholder='title'
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    required
                                    style={{width:'100%', boxSizing:'border-box'}}
                                />
                                <div className='album-titles'>Description</div>
                                <textarea
                                    type="text"
                                    placeholder='Describe your album'
                                    value={description}
                                    onChange={e => setDescription(e.target.value)}
                                    required
                                    style={{width:'100%', height:'300px', boxSizing:'border-box'}}
                                />
                            </div>
                        </span>
                        <span id='right-select-photos'>
                            {/* {type ==='edit' ?
                                <div id='select-photo'>Choose the photos that will be included in your updated album</div>
                                :
                                <div id='select-photo'>Choose your photos:</div>} */}
                            <div id='select-photo'>Choose your photos:</div>
                            <div className='photo-container'>
                                {type === 'create' ?
                                   ( userPhotos.filter(photo => photo.albumId === null ).map(photo =>
                                    <div className='choose-photo' key={photo.id} style={backgroundImageStyle(photo.url)}>
                                        <div className='photo-div'>
                                            <input type='checkbox' checked={type === 'edit' && photo.albumId === albumId ? photoIdList?.find(upphotos => upphotos == photo.id) : photoIdList?.find(upphotos => upphotos == photo.id)} value={photo.id} onChange={(e) => {
                                                if (e.target.checked) {
                                                    setPhotoIdList(prev => [...prev, parseInt(e.target.value)])
                                                } else {
                                                    setPhotoIdList(prev => prev.filter(id => id !== parseInt(e.target.value)))
                                                }
                                            }} />
                                        </div>
                                    </div>))
                                    :
                                    (userPhotos.map(photo =>
                                        <div className='choose-photo' key={photo.id} style={backgroundImageStyle(photo.url)}>
                                            <div className='photo-div'>
                                                <input type='checkbox' checked={type === 'edit' && photo.albumId === albumId ? photoIdList?.find(upphotos => upphotos == photo.id) : photoIdList?.find(upphotos => upphotos == photo.id)} value={photo.id} onChange={(e) => {
                                                    if (e.target.checked) {
                                                        setPhotoIdList(prev => [...prev, parseInt(e.target.value)])
                                                    } else {
                                                        setPhotoIdList(prev => prev.filter(id => id !== parseInt(e.target.value)))
                                                    }
                                                }} />
                                            </div>
                                        </div>))
                            }</div>
                        </span>

                    </div>
                    {/* {error && <p>{error}</p>} */}
                    <div id='album-button-div'>
                        <button id='yes-album'>{type === 'edit' ? 'Update Album' : 'Submit'}</button>
                        <button id='no-album' onClick={()=>handleCancel(currentUser.id)}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
