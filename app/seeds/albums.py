from app.models import db, Album, environment, SCHEMA
from sqlalchemy.sql import text

def seed_albums():
    test = Album(
        user_id=1, title='test', description='description for testing'
    )
    nsync = Album(
        user_id=2, title='nsync', description='description for testing'
    )
    bts = Album(
        user_id=3, title='bts', description='description for testing'
    )
    blackpink = Album(
        user_id=4, title='blackpink', description='description for testing'
    )
    blkswn = Album(
        user_id=5, title='blkswn', description='description for testing'
    )
    yeol_ramen = Album(
        user_id=6, title='Colin stuff', description='this is my stuff ok'
    )
    flower = Album(
        user_id=7, title='Vivian stuff', description='this is my cruds'
    )



    db.session.add(test)
    db.session.add(nsync)
    db.session.add(bts)
    db.session.add(blackpink)
    db.session.add(blkswn)
    db.session.add(yeol_ramen)
    db.session.add(flower)
    db.session.commit()


def undo_albums():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.albums RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM albums"))

    db.session.commit()
