import { useEffect, useState } from "react";
import * as commentActions from "../../store/comments";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { thunkGetSinglePhoto } from "../../store/photos";

export const CreateComments = ({ oldComment, type, editMode, setEditMode }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const comments = useSelector(state => state.comments.photoComments);
    const {photoId} = useParams();
    const user = useSelector(state => state.session.user);
    const [commentTxt, setCommentTxt] = useState(oldComment ? oldComment.comment : '');
    const [valObj, setValObj] = useState({});
    const [disabled, setDisabled] = useState(true);
    const [buttonId, setButtonId] = useState('disabled-comment-button');

    useEffect(() => {
        const errObj = {};
        if (commentTxt && (commentTxt.length < 3 || commentTxt.length > 100)) errObj.commentTxt = "Comments must be between 3 and 100 characters";
        if (commentTxt.length > 3 && commentTxt.length < 100) {
            setDisabled(false);
            setButtonId('enabled-comment-button')
        } else {
            setDisabled(true);
        }
        setValObj(errObj);
    }, [dispatch, commentTxt.length]);

    const handleSubmit = async (e) => {
     
        e.preventDefault();
        let commentData = {comment: commentTxt, userId: user.id, photoId: +photoId};

        if (type && type === "Update") {
       
            commentData.id = oldComment.id
            const updatedComment = await dispatch(commentActions.thunkUpdateComment(commentData, photoId))
            if (updatedComment.id) {
           
                await dispatch(commentActions.thunkGetAllCommentsByPhotoId(+photoId));
                await dispatch(thunkGetSinglePhoto(+photoId));
                setEditMode(!editMode)
                history.push(`/photos/${photoId}`)
            }
        }
        else {
            const newComment = await dispatch(commentActions.thunkCreateComment(commentData, photoId));
            if (newComment.id) {
                await dispatch(commentActions.thunkGetAllCommentsByPhotoId(+photoId))
                await dispatch(thunkGetSinglePhoto(+photoId))
                setCommentTxt('')
                history.push(`/photos/${photoId}`)
            }
        }
    }

    return (
        <div id='post-comment-section'> 
            <form onSubmit={handleSubmit} id='comment-mini-form'>
                <textarea
                    placeholder="Leave your comment here!"
                    value={commentTxt}
                    onChange={(e) => setCommentTxt(e.target.value)}
                    type="textarea"
                    style={{height:'200px', width:'100%', fontSize:'17px', boxSizing: 'border-box'}}
                />
                {valObj.commentTxt && <p className="errors">{valObj.commentTxt}</p>}
                <span className="comment-edit-mode-buttons">
                    <button type="submit" disabled={disabled} id={buttonId}>{type ? "Update" : "Post"}</button>
                    {type && <button onClick={() => setEditMode(!editMode)} className="comment-cancel-btn">Cancel</button>}
                </span>
            </form>
        </div>
    )
}
