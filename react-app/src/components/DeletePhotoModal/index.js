import { useDispatch } from 'react-redux';
import { thunkDeletePhoto, thunkGetCurrentUserPhotos } from '../../store/photos';
import { useModal } from '../../context/Modal';
import { useHistory } from 'react-router-dom';
import './DeletePhotoModal.css'

function DeletePhotoModalFunction({photoId, userid}) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const history = useHistory();

  const yesDeletePhotoFunction = async() => {
    await dispatch(thunkDeletePhoto(photoId));
    await dispatch(thunkGetCurrentUserPhotos(userid))
    closeModal();
    history.push(`/users/${userid}/photos`);
  }

  return (
    <div className='modal delete-modal'>
      <h3 style={{color:'rgb(46, 147, 255)'}}>Confirm Delete</h3>
      <div className='yes-no-buttons'>
        <button onClick={yesDeletePhotoFunction} className='yes-button'>Yes</button>
        <button onClick={closeModal} className='no-button'>No</button>
      </div>
    </div>
  )
}

export default DeletePhotoModalFunction;
