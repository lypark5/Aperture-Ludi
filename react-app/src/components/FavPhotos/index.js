import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from "react-router-dom";
import { useBackgroundImgContext } from '../../context/BackgroundImage'
import { thunkAllFav } from '../../store/fav';
import { Photostream } from '../Photostream';


export default function FavPhotos() {
    const { userId } = useParams();
    const dispatch = useDispatch();
    const likedPhotos = Object.values(useSelector(state => state.favs.allFav));
    const allUsers = Object.values(useSelector(state => state.users.allUsers));

    useEffect(() => {
        dispatch(thunkAllFav(userId));
    }, [dispatch]);

    likedPhotos.forEach(photo => {
        photo["Owner"] = Object.values(allUsers).find(user => user.id === photo.userId);
    });

    return (
       <div>
            <Photostream fav={likedPhotos} like={"like"} />
        </div>
    )
}
