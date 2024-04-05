import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { thunkGetSinglePhoto } from "../../store/photos";
import {PhotoFormModalFunction} from "../PhotoFormModalFunction";
import { useEffect } from "react";
export const UpdatePhoto = () => {
    const dispatch = useDispatch();
    const {photoId} = useParams();
    const photo = useSelector(state => state.photos.singlePhoto);

    useEffect(() => {
        dispatch(thunkGetSinglePhoto(photoId));
    }, [dispatch]);

    return (
        <PhotoFormModalFunction photo={photo} formType={"Update"}/>
    )
}
