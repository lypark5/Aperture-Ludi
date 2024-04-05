const GET_ALL_ALBUMS = "albums/GET_ALL";
const GET_ONE_ALBUM = "album/GET_ONE_ALBUM";
const CREATE_ALBUM = 'album/CREATE_ALBUM';
const DELETE_ALBUM = 'album/delete/:albumId"'

const getAllAlbums = (albums) => ({
    type: GET_ALL_ALBUMS,
    albums
})

const getOneAlbum = (album) => ({
    type: GET_ONE_ALBUM,
    album
})

const createAlbum = (album) => ({
    type: CREATE_ALBUM,
    album
})

const deleteAlbum = album => {
    return {
        type:DELETE_ALBUM,
        album
    }
}

// thunk
export const thunkGetAllAlbums = (userId) => async (dispatch) => {
    const res = await fetch(`/api/albums/${userId}`);
    if (res.ok) {
        const albums = await res.json();
        dispatch(getAllAlbums(albums));
        return albums;
    }
}

export const thunkOneAlbum = (userId, albumId) => async (dispatch) => {
    const res = await fetch(`/api/albums/${userId}/${albumId}`);
    if (res.ok) {
        const album = await res.json();
        dispatch(getOneAlbum(album))
        return album
    }
}

export const thunkCreateAlbum = (album, userId) => async (dispatch) => {
    const { title, description } = album
    const res = await fetch(`/api/albums/${userId}/new`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            title,
            description,
            userId
        })
    })

    if (res.ok) {
        const album = await res.json();
        dispatch(createAlbum(album))
        return album;
    } else if (res.status < 500) {

        const data = await res.json();
        if (data.errors) {
            return data.errors;
        }
    } else {

        return ["An error occurred. Please try again."];
    }
};

export const fetchUpdateAlbum = (albumId, userId, updateAlbum) => async dispatch => {
    const { title, description } = updateAlbum;
    const res = await fetch(`/api/albums/${userId}/edit/${albumId}`, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title,
        description
      })
    });
  
    if (res.ok) {
      const  updatedAlbum = await res.json()
        dispatch(getOneAlbum(updatedAlbum)); 
     
      return updatedAlbum;
    } else {
      const error = await res.json();
      throw error;
    }
  };

  export const fetchDeleteAlbum = (albumId) => async dispatch => {
    const res = await fetch(`/api/albums/delete/${albumId}`, {
        method:'DELETE'
    })
    if(res.ok) {
       const data = await res.json()
       dispatch(deleteAlbum(data))
    } else {
        const error = res.json()
        throw error
    }
  }


// reducer
const initialState = { allAlbums: {}, singleAlbum: {}, currentUserAlbums: {} };

export default function albumsReducer(state = initialState, action) {
    let newState = {}
    switch (action.type) {
        case GET_ALL_ALBUMS: {
            let newObj = {}
            action.albums.albums.forEach(album => {
                newObj[album.id] = album
            });
            newState = { ...state, allAlbums: { ...newObj } }
            return newState
        }
        case GET_ONE_ALBUM: {

            return { ...state, singleAlbum: { ...action.album }, allAlbums: {...state.allAlbums, [action.album.id]: {...action.album}} }
        }
        case CREATE_ALBUM: {
            return { ...state, allAlbums: { ...state.allAlbums, [action.album.id]: { ...action.album } } }
        }
        case DELETE_ALBUM: {
            const newState = {
                ...state,
                singleAlbum: {
                    ...state.singleAlbum
                },
                allAlbums: {
                    ...state.allAlbums,
                },
                currentUserAlbums: {
                    ...state.currentUserAlbums
                }
            }
            
            delete newState.allAlbums[action.album.id]
            return {
                ...newState,
                singleAlbum: {
                    ...newState.singleAlbum
                },
                allAlbums: {
                    ...newState.allAlbums
                },
                currentUserAlbums: {
                    ...state.currentUserAlbums
                }
            }
        }
        default:
            return state
    }
}
