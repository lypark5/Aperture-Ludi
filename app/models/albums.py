from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class Album(db.Model):
    __tablename__ = 'albums'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
    title = db.Column(db.String(50), nullable=False)
    description = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime(), default=datetime.now())
    updated_at = db.Column(db.DateTime(), default=datetime.now())

    # relationships
    # one side
    user = db.relationship('User', back_populates='albums')
    photos = db.relationship('Photo', back_populates='album')

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.user_id,
            'title': self.title,
            'description': self.description,
            'createdAt': self.created_at,
            'updatedAt': self.updated_at
        }
