const ALL_FAV = 'fav/ALL_FAV'
const CREATE_FAV = 'fav/CREATE_FAV'
const Delete_Fav = 'fav/delete/'

const getAllFav = (favorites)  => ({
    type: ALL_FAV,
    favorites
})

const newFav = (favorites) => ({
    type: CREATE_FAV,
    favorites
})

const deleteFav = (favorite) => {
    return {
        type: Delete_Fav,
        favorite
    }
}

export const thunkAllFav = (userId) => async (dispatch) => {
    const res = await fetch(`/api/fav/${userId}/allFav`)

    if (res.ok) {
        const fav = await res.json();
        dispatch(getAllFav(fav));
    }
}

export const thunkCreateFav = (userId, photoId) => async (dispatch) => {

    const res = await fetch(`/api/fav/${userId}/${photoId}/new`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            user_id: userId,
            photo_id : photoId,
        })
    })

    if (res.ok) {
        const favPhoto = await res.json();
        if (!favPhoto['Delete'])  dispatch(newFav(favPhoto));
        else {

            dispatch(deleteFav(favPhoto))

        }
        return favPhoto
    }
}

const initialState = {allFav: {}}
export default function favReducer(state = initialState, action) {
    switch(action.type) {
        case ALL_FAV: {
            const newState = {allFav: {}}
            action.favorites.favPhotos.forEach(fav => {
                newState.allFav[fav.id] = fav;
            })
            return newState
        }
        case CREATE_FAV: {

            const newState = {...state, allFav: {...state.allFav}}
            return {...newState, allFav: {...newState.allFav, [action.favorites.favPhotos.id]:{...action.favorites.favPhotos}}}
        }
        case Delete_Fav: {

            const newState = {...state, allFav: {...state.allFav}}
            delete newState.allFav[action.favorite.favPhotos.id]
            return {...newState, allFav: {...newState.allFav}}
        }

        default:
            return state
    }
}
