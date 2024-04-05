from flask import Blueprint, session, request
from flask_login import login_required, current_user
from app.models import Photo, db, Album
from app.forms import CreatePhotoForm
from app.forms import UpdatePhotoForm
from app.api.aws_routes import get_unique_filename, upload_file_to_s3, remove_file_from_s3
from sqlalchemy import and_
photo_routes = Blueprint('photos', __name__)


@photo_routes.route('/all')
@login_required
def all_photos():
    """
    Logged in homepage display all photos
    """
    photos = Photo.query.all()
    res = [photo.to_dict() for photo in photos]
    return {'photos': res}

@photo_routes.route('/all/album/<int:userId>/photos')
@login_required
def all_album_photos(userId):
 
    photos = Photo.query.filter(Photo.user_id == userId).all()
    res = [photo.to_dict() for photo in photos]
   
    return {'photos': res}


@photo_routes.route('/<int:id>')
@login_required
def one_photo(id):
    """
    Query for a photo by id and return that photo in a dictioanry
    """
    one_photo = Photo.query.get(id)
    return one_photo.to_dict()


@photo_routes.route('/new', methods=["POST"])
@login_required
def create_photo():
    """
    Create new photo
    """
    form = CreatePhotoForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        url = form.data["url"]
        url.filename = get_unique_filename(url.filename)
        upload = upload_file_to_s3(url)
   

        if "url" not in upload:
 
         
            return {"errors": upload}

        new_photo = Photo(
            title=form.data['title'],
            url=upload['url'],
            description=form.data['description'],
            preview_img=form.data['preview_img'],
            album_id=form.data['album_id'],
            user_id=current_user.id
        )

        db.session.add(new_photo)
        db.session.commit()
        return new_photo.to_dict()

    if form.errors:
        print(form.errors)
        return {'errors': form.errors}


@photo_routes.route('/edit/<int:id>', methods=['PUT'])
@login_required
def update_photo(id):
    data = request.json
    photo_to_edit = Photo.query.get(id)
    photo_to_edit.album_id = data["album_id"]
    photo_to_edit.title = data['title']
    photo_to_edit.description = data['description']

    db.session.commit()
    return photo_to_edit.to_dict()

@photo_routes.route('/album/<int:albumId>/edit', methods=['PUT'])
@login_required
def update_photo_album(albumId):
    data = request.json
    
    
    album = Album.query.get(albumId)
    album.photos = []
   
    _ = [ album.photos.append(Photo.query.get(photo['id'])) for photo in data]
   
    db.session.commit()
    res = [photo.to_dict() for photo in album.photos]
    
    return {'photos' : res }


@photo_routes.route('/<int:id>/edit', methods=['PUT'])
@login_required
def update_photo_route(id):
    form = UpdatePhotoForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        photo_to_edit = Photo.query.get(id)

        photo_to_edit.title = form.data['title']
        photo_to_edit.description = form.data['description']

        db.session.commit()
        return photo_to_edit.to_dict()

    if form.errors:
        return {'errors': form.errors}

@photo_routes.route('/delete/<int:id>', methods=['DELETE'])
@login_required
def delete_your_photo(id):
    to_delete = Photo.query.get(id)
    db.session.delete(to_delete)
    db.session.commit()
    return {"Message": "Photo Deleted Successfully"}
