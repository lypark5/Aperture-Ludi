import { useState } from "react";
import OpenModalButton from '../OpenModalButton'
import { DeleteCommentsModal } from '../DeleteCommentsModal';
import { CreateComments } from "../CreateComments";
import "../PhotoDetails/PhotoDetails.css";

export default function GetAllCommentsByPhotoIdFunction({comment, currentUser, photoId}) {
  const [editMode, setEditMode] = useState(false)

  function convertDate(date) {
    const splitData = date.split(' ')
    const cleanData = `${splitData[2]} ${splitData[1]}, ${splitData[3]}`
    return cleanData;
  }

  const handleEdit = (e) => {
    e.stopPropagation();
    setEditMode(true);
  }

  const handleCancel = (e) => {
    e.stopPropagation();
    setEditMode(false);
  }

  if (comment && comment["Author"] == undefined) return <></>;

  return (
    <>
      {!editMode ?
        (<div id='comment-card'>
          <div id='comment-and-trash'>
            <div id='comment'>{comment?.comment}</div>
            {currentUser.id === comment.userId &&
              <span className="edit-mode-off">
                <i className="fas fa-edit edit-comment-icon" onClick={handleEdit}></i>
                <OpenModalButton
                modalComponent={<DeleteCommentsModal commentId={comment.id} userid={currentUser.id} photoId={photoId}/>}
                buttonText={<i className="fas fa-trash-alt" id='comment-trash-icon'></i>}
                id='comment-trash-button'
                />
              </span>
            }
          </div>
          <span id='commentator-item'>
            <span id='commentator-author'>{comment?.Author?.username}</span>
            <span id='comment-date'>{convertDate(comment?.createdAt)}</span>
          </span>
        </div>
      ) : (
        <div className="edit-mode">
          <CreateComments
            oldComment={comment}
            type={"Update"}
            editMode={editMode}
            setEditMode={setEditMode}
            />
        </div>
    )}
    </>
    )
  }
// }
