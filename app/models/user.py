from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from datetime import datetime

class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(255), nullable=False)
    last_name = db.Column(db.String(255), nullable=False)
    username = db.Column(db.String(40), nullable=False, unique=True)
    profile_pic = db.Column(db.String(255))
    user_background_pic = db.Column(db.String(255))
    bio = db.Column(db.String(1000))
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime(), default=datetime.now())
    updated_at = db.Column(db.DateTime(), default=datetime.now())

    # relationships
    albums = db.relationship('Album', back_populates='user', cascade="all, delete-orphan")
    comments = db.relationship('Comment', back_populates='user', cascade="all, delete-orphan")
    favorites = db.relationship('Favorite', back_populates='users', cascade="all, delete-orphan")

  

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'firstName': self.first_name,
            'lastName': self.last_name,
            'username': self.username,
            'profilePic': self.profile_pic,
            'bio': self.bio,
            'email': self.email,
            'userBackgroundPic':self.user_background_pic,
            'createdAt': self.created_at,
            'updatedAt': self.updated_at
        }
