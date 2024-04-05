import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { thunkGetAllAlbums } from '../../store/albums'
import './AlbumsIndex.css'
import ProfileHeader from '../ProfileHeader'
import ProfileNav from '../ProfileNav'
import { useParams } from "react-router-dom";
import { AlbumContainer } from './albumContainer'
export default function AllAlbums({ backgroundUrl }) {

    const currentUser = useSelector(state => state.session.user)
    const dispatch = useDispatch()
    const albums = Object.values(useSelector(state => state.albums.allAlbums))
    const { userId } = useParams()

    useEffect(() => {
        dispatch(thunkGetAllAlbums(userId))
    }, [])

    const userAlbum = albums.filter(album => album.userId == userId)


    return (
        <div className='albums-page'>
            <ProfileHeader userId={userId} url={backgroundUrl} />
            <ProfileNav userId={userId} />
            <AlbumContainer userAlbum={userAlbum} currentUser={currentUser} userId={userId}/>
        </div>
    )
}
