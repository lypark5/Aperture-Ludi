import { useDispatch } from 'react-redux';
import { thunkDeleteComment, thunkGetAllCommentsByPhotoId } from '../../store/comments';
import { useModal } from '../../context/Modal';
import { useHistory } from 'react-router-dom';

export const DeleteCommentsModal = ({commentId, photoId}) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const history = useHistory();

  const yesDeleteCommentFunction = async() => {
    await dispatch(thunkDeleteComment(commentId));
    await dispatch(thunkGetAllCommentsByPhotoId(photoId))
    closeModal();
    history.push(`/photos/${photoId}`);
  }

  return (
    <div className='modal delete-modal'>
      <h3 style={{color:'rgb(46, 147, 255)'}}>Confirm Delete</h3>
      <div className='yes-no-buttons'>
        <button onClick={yesDeleteCommentFunction} className='yes-button'>Yes</button>
        <button onClick={closeModal} className='no-button'>No</button>
      </div>
    </div>
  )
}
