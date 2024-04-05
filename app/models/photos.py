from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class Photo(db.Model):
  __tablename__ = 'photos'

  if environment == "production":
    __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
  album_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('albums.id')))
  url = db.Column(db.String(500), nullable=False)
  title = db.Column(db.String(255), nullable=False)
  description = db.Column(db.String(500))
  preview_img = db.Column(db.Boolean, default=False)
  favorite_count = db.Column(db.Integer, nullable=False, default=0)
  created_at = db.Column(db.DateTime(), default=datetime.now())
  updated_at = db.Column(db.DateTime(), default=datetime.now())

  # relationships
  # many side
  album = db.relationship('Album', back_populates='photos')

  comments = db.relationship('Comment', back_populates='photo', cascade="all, delete-orphan")

  favorites = db.relationship('Favorite', back_populates='photo', cascade="all, delete-orphan")



  def to_dict(self):
    return {
      'id': self.id,
      'userId': self.user_id,
      'albumId': self.album_id,
      'url': self.url,
      'title': self.title,
      'description': self.description,
      'previewImg': self.preview_img,
      'favoriteCount': self.favorite_count,
      'createdAt': self.created_at,
      'updatedAt': self.updated_at
    }
