from flask import Blueprint, session, request
from flask_login import login_required, current_user
from app.models import Photo, db, Comment, User
from app.forms import CreateCommentForm, UpdateCommentForm

comment_routes = Blueprint('comments', __name__)


@comment_routes.route('/<int:photoId>')     # <int: converts the param to integer
@login_required
def all_comments(photoId):
  """
  fetch all comments by the photo's id
  """
  comments = Comment.query.filter(Comment.photo_id == photoId).all()
  lst = []
  res = {"comments": lst}
  for comment in comments:
    user = User.query.filter(User.id == comment.user_id).first()
    new_comment = comment.to_dict()
    user = user.to_dict()
    new_comment["Author"] = user
    res["comments"].append(new_comment)
  return res


@comment_routes.route('/<int:photoId>/new', methods=["POST"])
@login_required
def create_comment(photoId):
  """
  Create new comment
  """
  form = CreateCommentForm()
  form['csrf_token'].data = request.cookies['csrf_token']

  if form.validate_on_submit():

    new_comment = Comment(
      comment=form.data["comment"],
      user_id=current_user.id,
      photo_id=photoId
    )

    db.session.add(new_comment)
    db.session.commit()
    return new_comment.to_dict()

  if form.errors:
      print(form.errors)
      return {'errors': form.errors}


@comment_routes.route('/<int:id>/delete', methods=["DELETE"])
@login_required
def delete_comment(id):
  to_delete = Comment.query.get(id)
  db.session.delete(to_delete)
  db.session.commit()
  return {"Message": "Comment Deleted Successfully"}


@comment_routes.route('/<int:id>/edit', methods=["PUT"])
@login_required
def update_comment(id):
  comment_to_update = Comment.query.get(id)
  form = UpdateCommentForm()
  form['csrf_token'].data = request.cookies['csrf_token']

  if form.validate_on_submit():
    comment_to_update.comment = form.data["comment"]
    db.session.commit()

    return comment_to_update.to_dict()

  if form.errors:
    print('update comment form errors', form.errors)
    return {"errors": form.errors}
