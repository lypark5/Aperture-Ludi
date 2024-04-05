from app.models import db, environment, SCHEMA, Comment
from sqlalchemy.sql import text
import random

def seed_comments():
    comment1 = Comment(
        photo_id=random.randint(1, 15),
        user_id=random.randint(1, 7),
        comment="OMG ITS SO HIGH TECH YASSSSSS",
    )
    comment2 = Comment(
        photo_id=random.randint(1, 15),
        user_id=random.randint(1, 7),
        comment="Batman is so cool",
    )
    comment3 = Comment(
        photo_id=random.randint(1, 15),
        user_id=random.randint(1, 7),
        comment="I Got to meet robin =D"
    )
    comment4 = Comment(
        photo_id=random.randint(1, 15),
        user_id=random.randint(1, 7),
        comment="I Got to meet test =D"
    )
    comment5 = Comment(
        photo_id=random.randint(1, 15),
        user_id=random.randint(1, 7),
        comment="I Got to meet test15 =D"
    )
    comment6 = Comment(
        photo_id=random.randint(1, 15),
        user_id=random.randint(1, 7),
        comment="I Got to meet test12 =D"
    )
    comment7 = Comment(
        photo_id=random.randint(1, 15),
        user_id=random.randint(1, 7),
        comment="I Got to meet test33=D"
    )
    comment8 = Comment(
        photo_id=random.randint(1, 15),
        user_id=random.randint(1, 7),
        comment="I Got to meet robinerwr =D"
    )
    comment9 = Comment(
        photo_id=random.randint(1, 15),
        user_id=random.randint(1, 7),
        comment="I Got to meet robinwerwerewr =D"
    )
    comment10 = Comment(
        photo_id=random.randint(1, 15),
        user_id=random.randint(1, 7),
        comment="I Got to meet robinqwewqewdsad =D"
    )
    db.session.add(comment1)
    db.session.add(comment2)
    db.session.add(comment3)
    db.session.add(comment4)
    db.session.add(comment5)
    db.session.add(comment6)
    db.session.add(comment7)
    db.session.add(comment8)
    db.session.add(comment9)
    db.session.add(comment10)
    db.session.commit()
    
def undo_comments():
  if environment == "production":
    db.session.execute(f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
  else:
      db.session.execute(text("DELETE FROM comments"))

  db.session.commit()