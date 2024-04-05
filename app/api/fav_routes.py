from flask import Blueprint, session, request
from flask_login import login_required, current_user
from sqlalchemy import and_, select
from app.models import Favorite, db, Photo, User

fav_routes = Blueprint('fav', __name__)


@fav_routes.route('/<int:userId>/allFav')
@login_required
def all_fav(userId):
    """Display all fav photos by the user"""
    res = []
    favs = Favorite.query.filter(Favorite.user_id == userId).all()
    for fav in favs:
        photoUrl = Photo.query.filter(Photo.id == fav.photo_id).first().to_dict()
        res.append(photoUrl)

    return {"favPhotos": res}


@fav_routes.route('/<int:userId>/<int:photoId>/new', methods=["POST"])
@login_required
def create_fav(userId, photoId):
    """Create new fav to a photo by the user"""
    photo = Photo.query.get(photoId)
    searchFavorite = Favorite.query.filter(and_(Favorite.user_id == userId, Favorite.photo_id == photoId)).first()

    if not searchFavorite:
        new_fav = Favorite(user_id = userId, photo_id = photoId)

        photo.favorite_count += 1
        db.session.add(new_fav)
        db.session.commit()

        return {"favPhotos": new_fav.photo.to_dict()}
    else:



        photo.favorite_count -= 1
        db.session.delete(searchFavorite)
        db.session.commit()
        return {"favPhotos": photo.to_dict(), 'Delete':'DeleteFav'}
