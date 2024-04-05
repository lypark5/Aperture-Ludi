import { useEffect, useState } from "react";
import { thunkGetAllPhotos } from "../../store/photos";
import { thunkGetAllUsers } from "../../store/users";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { UserBlurb } from '../UserBlurb';
import { thunkAllFav } from '../../store/fav'
import './PhotosIndex.css';

export const PhotosIndex = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const fotos = useSelector(state => state.photos.allPhotos);
    const users = useSelector(state => state.users.allUsers);
    const currentUser = useSelector(state => state.session.user)
    const favPics = Object.values(useSelector(state => state.favs.allFav))
    const userFavpic = favPics.filter(photo => photo.userId == currentUser.id)

    useEffect(() => {
        dispatch(thunkAllFav(currentUser.id))
        dispatch(thunkGetAllPhotos())
        dispatch(thunkGetAllUsers());
    }, [dispatch])

    const photos = [...Object.values(fotos)];

    const userArr = [...Object.values(users)];

    photos.forEach(photo => {
        photo["Owner"] = userArr.find(user => user.id === photo.userId)
    });

    const hotPhotos = photos.sort((a,b) => {
        const favCountA = a.favoriteCount;
        const favCountB = b.favoriteCount;

        if (favCountA > favCountB) {
            return -1
        } else if (favCountA === favCountB ) {
           return 0
        } else return 1;
    })

    return (
        <div className='container-container'>
            <div className='all-photos-container'>
                    <h1>Explore Popular Photos</h1>

                <div id="cards-container">
                {hotPhotos.map(photo =>
                    <span className='all-photos-card' title={photo.name} key={photo.id} >
                            <img className='all-photos-pic' src={photo.url} alt={photo.title} onClick={()=>history.push(`/photos/${photo.id}`)}></img>
                            <UserBlurb photoId={photo.id} userId={photo.userId}
                                url={photo?.Owner?.profilePic}
                                username={photo?.Owner?.username}
                                styles={{ display: "flex", flexDirection: "row", justifyContent: "space-between", paddingTop: "4px", paddingLeft: "4px", alignItems: "center" }}
                                favPics={favPics}
                                currentUser={currentUser}
                                userFavpic={favPics}
                                count={photo.favoriteCount}
                                />
                    </span>
                )}
                </div>
            </div>
        </div>
    )
}
