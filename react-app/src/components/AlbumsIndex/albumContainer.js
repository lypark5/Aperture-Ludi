import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useBackgroundImgContext } from '../../context/BackgroundImage'
import OpenModalButton from '../OpenModalButton'
import { DeleteAlbum } from '../DeleteAlbumModal'
export const AlbumContainer = ({userAlbum, userId, currentUser}) => {
    const history = useHistory()
    const { backgroundImg } = useBackgroundImgContext()
    const [infoBox, setInfoBox] = useState(false)
    const routetoEdit = (e, albumId, userId) => {
        e.stopPropagation()
        history.push('/albums/new', { type: 'edit', albumId, userId})
    }


    const photoUrl = (album) => {
        if (album.photos) {
            for (let photo of album.photos) {
                if (photo.previewImg === true) {
                    return `url(${photo.url})`
                }
            }

            return album.photos[0] ? `url(${album.photos[0]?.url})` : `url(${backgroundImg})`
        }
        return `url(${backgroundImg})`
    }

    const backgroundImageStyle = (album) => {
        return {
            backgroundImage: photoUrl(album),
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            width: '300px',
            height: '300px'
        }
    }

    const sortAlbumList = (albums) => {
        return albums.sort((a, b) => {
            const latest = new Date(a.createdAt)
            const earliest = new Date(b.updatedAt)
            if (earliest.getTime() > latest.getTime()) return -1
            if (latest.getTime() > earliest.getTime()) return 1
            return 0
        })
    }

    const detailsAlbum = (userId, albumId) => {
        history.push(`/users/${userId}/albums/${albumId}`)
    }

    return (
        <div className="albums-container-container">
            <div className='albums-container'>
            {sortAlbumList(userAlbum).toReversed().map(album => <div onMouseEnter={()=>setInfoBox(true)} onMouseLeave={()=>setInfoBox(false)} onClick={() => detailsAlbum(album.userId, album.id)} className='album' style={backgroundImageStyle(album)} key={album.id}>
                {infoBox && <div className='title-photo-container'>
                    <span style={{paddingLeft:'4px'}}>
                        <div>{album.title}</div>
                        <div style={{fontSize: "11px"}}>{album.photos?.length == 1 || album.photos?.length === 0 ? `${album.photos?.length} photo` : `${album.photos?.length} photos`} </div>
                    </span >{
                        currentUser.id == userId ? <div className='Edit-Delete-Album'>
                        <div id='album-arrow-icon' onClick={e => routetoEdit(e, album.id, userId)}>
                            <i className='fas fa-edit'/>
                        </div>
                        <div id='album-arrow-icon' onClick={e => routetoEdit(e, album.id, userId)}>
                            <OpenModalButton modalComponent={<DeleteAlbum album={album} />} buttonText={<i className="fas fa-trash-alt" style={{color: "white", cursor:'pointer'}}></i>} style={{backgroundColor: "transparent", border: "none", paddingRight:'10px'}}/>
                        </div>
                        </div>
                        :
                        <div id='album-arrow-icon' onClick={e => routetoEdit(e, album.id, userId)}>
                    </div>
                        }
                </div>}
            </div>
            )}

        </div>
    </div>
    )
}
