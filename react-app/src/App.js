import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import LandingPage from "./components/LandingPage";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import AllAlbums from "./components/AlbumsIndex";
import { PhotosIndex } from "./components/PhotosIndex";
import AlbumDetail from "./components/AlbumDetail";
import {PhotoDetails} from "./components/PhotoDetails";
import { Photostream } from "./components/Photostream";
import CreateAlbum from "./components/CreateAlbum";
import {PhotoFormModalFunction} from "./components/PhotoFormModalFunction";
import { UpdatePhoto } from "./components/UpdatePhoto";
import FavPhotos from "./components/FavPhotos";
import { Footer } from "./components/Footer";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>                {/*Switch allows rendering only 1 route at a time*/}
          <Route exact path="/">
            <LandingPage />
          </Route>
          <ProtectedRoute exact path='/albums/new'>
              <CreateAlbum />
          </ProtectedRoute>
          <ProtectedRoute exact path='/users/:userId/faves' >
              <FavPhotos />
          </ProtectedRoute>
          <ProtectedRoute exact path='/users/:userId/albums' >
              <AllAlbums />
          </ProtectedRoute>
          <ProtectedRoute exact path='/users/:userId/albums/:albumId'>
              <AlbumDetail />
          </ProtectedRoute>
          <ProtectedRoute path="/photos/all" >
              <PhotosIndex />
          </ProtectedRoute>
          <ProtectedRoute path="/photos/new" >
              <PhotoFormModalFunction />
          </ProtectedRoute>
          <ProtectedRoute path="/photos/:photoId" >
              <PhotoDetails />
          </ProtectedRoute>
          <ProtectedRoute path="/photos/:photoId/edit" >
              <UpdatePhoto />
          </ProtectedRoute>
          <ProtectedRoute path='/users/:userId/photos' >
              <Photostream />
          </ProtectedRoute>
          {/* <Route path="/login" >
            <LoginFormPage />
          </Route> */}
          {/* <Route path="/signup">
            <SignupFormPage />
          </Route> */}
          <Route path="/*">
            <h1>Page Not Found</h1>
          </Route>
        </Switch>
      )}
      <Footer />
    </>
  );
}

export default App;
