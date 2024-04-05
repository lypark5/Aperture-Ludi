import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import * as sessionActions from "../../store/photos";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import './PhotoForm.css';

export const PhotoFormModalFunction = ({ photo, formType }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { closeModal } = useModal();
  const currentUser = useSelector(state => state.session.user);
  const currentUserPhotos = useSelector(state => state.photos.currentUserPhotos)
  const [title, setTitle] = useState(photo ? photo.title : '');
  const [description, setDescription] = useState(photo ? photo.description : '');
  const [url, setUrl] = useState(photo ? photo.url : '');
  const [disabled, setDisabled] = useState(true);
  const [valObj, setValObj] = useState({});
  const [buttonClass, setButtonClass] = useState("disabled-signup-button");

  useEffect(() => {
    const errObj = {};
    if (title && title.length < 1) errObj.title = "Title is required";
    if (title.length > 1) {
      setDisabled(false);
      setButtonClass("enabled-signup-button")
    } else {
      setDisabled(true);
    }
    setValObj(errObj);
  }, [title, url]);

  const handleSubmit = async(e) => {
    e.preventDefault();
    closeModal();
    if (formType === "Update") {
      const picData = {title, description, photoId: photo.id};
      const updatedPhoto = await dispatch(sessionActions.thunkUpdatePhoto(picData));

      if (updatedPhoto.id) {
        await dispatch(sessionActions.thunkGetCurrentUserPhotos(currentUser.id));
        closeModal();
        history.push(`/users/${currentUser.id}/photos`);
      }
    } else {
        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("url", url);
        const newPhoto = await dispatch(sessionActions.thunkCreatePhoto(formData));
        if (newPhoto.id) {
          await dispatch(sessionActions.thunkGetCurrentUserPhotos(currentUser.id));
          // setTitle('');
          // setDescription('');
          // setUrl('');
          history.push(`/users/${currentUser.id}/photos`);
        }
    }
  };

  return (
    <div id="photo-form-modal">
      <h2 id='create-photo-title'>{photo ? "Update Photo" : "Upload Photo"}</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data" id="photo-form">
        <input
          type='text'
          placeholder='Photo Name'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          id='photo-name-input'
          style={{width:'100%'}}
        />
        {valObj.title && <p className="errors">{valObj.title}</p>}
        <textarea
          type='textarea'
          placeholder='Photo Description'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{height: '80px', width:'100%', boxSizing: 'border-box'}}
        />
        {formType !== "Update" &&
          <input
            type='file'
            placeholder='File Url'
            onChange={(e) => setUrl(e.target.files[0])}
            required
            accept="image/png, image/jpeg, image/jpg, image/gif, image/pdf"
            style={{width:'100%'}}
          />}
        {valObj.url && <p className="errors" style={{color: "red"}}>{valObj.url}</p>}
        <button type='submit' disabled={disabled} className={buttonClass} style={{marginTop:'15px'}}>Submit</button>
      </form>
    </div>
  )

}
