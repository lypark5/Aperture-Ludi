import React from "react";
import { useDispatch } from "react-redux";
import { useModal } from '../../context/Modal';
import { fetchDeleteAlbum } from '../../store/albums'
import { thunkGetAllPhotos } from "../../store/photos";
export const DeleteAlbum = ({album}) => {


    const { closeModal } = useModal();
    const dispatch = useDispatch()
    const deleteAlbum = async () => {
        await dispatch(fetchDeleteAlbum(album.id))
        await dispatch(thunkGetAllPhotos());
        closeModal();
    }
    return (
        <div className="delete-modal">
            {/* <div>Are you sure to delete {album.title} ?</div> */}
            <h3 style={{color:'rgb(46, 147, 255)'}}>Confirm Delete</h3>
            <div className="yes-no-buttons">
                <button className='yes-button' onClick={deleteAlbum}>Yes</button>
                <button className='no-button' onClick={closeModal}>No</button>
            </div>

        </div>
    )
}
