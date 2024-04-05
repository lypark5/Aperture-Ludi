from app.models import db, Photo, environment, SCHEMA
import random
from sqlalchemy.sql import text
urls = [
"https://aperture-bucket-april-2023.s3.amazonaws.com/tornado.jpeg",
"https://aperture-bucket-april-2023.s3.amazonaws.com/snowymountains.jpg",
"https://aperture-bucket-april-2023.s3.amazonaws.com/snake.jpeg",
"https://aperture-bucket-april-2023.s3.amazonaws.com/river.jpg",
"https://aperture-bucket-april-2023.s3.amazonaws.com/redpanda.jpeg",
"https://aperture-bucket-april-2023.s3.amazonaws.com/pig.jpeg",
"https://aperture-bucket-april-2023.s3.amazonaws.com/rabbit.jpeg",
"https://aperture-bucket-april-2023.s3.amazonaws.com/moon.jpg",
"https://aperture-bucket-april-2023.s3.amazonaws.com/panda.jpeg",
"https://aperture-bucket-april-2023.s3.amazonaws.com/house.jpeg",
"https://aperture-bucket-april-2023.s3.amazonaws.com/forestroad2.jpg",
"https://aperture-bucket-april-2023.s3.amazonaws.com/forestroad.jpg",
"https://aperture-bucket-april-2023.s3.amazonaws.com/chipmunk.jpeg",
"https://aperture-bucket-april-2023.s3.amazonaws.com/deer.jpeg",
"https://aperture-bucket-april-2023.s3.amazonaws.com/bear.jpeg",
"https://aperture-bucket-april-2023.s3.amazonaws.com/beach.jpg",
"https://aperture-bucket-april-2023.s3.amazonaws.com/allanimals.jpeg"
]
def seed_photos():
  Photo1 = Photo(
    user_id=1, album_id=1, url="https://aperture-bucket-april-2023.s3.amazonaws.com/ONEEE.jpeg", title='Photo1', description='description1', preview_img=True, favorite_count=random.randint(1, 30)
  )
  Photo2 = Photo(
    user_id=2, album_id=2, url="https://aperture-bucket-april-2023.s3.amazonaws.com/blackcat.jpeg", title='Photo2', description='description2', preview_img=True, favorite_count=random.randint(1, 30)
  )
  Photo3 = Photo(
    user_id=3, album_id=3, url="https://aperture-bucket-april-2023.s3.amazonaws.com/bibimbap.jpeg", title='Photo3', description='description3', preview_img=True, favorite_count=random.randint(1, 30)
  )
  Photo4 = Photo(
    user_id=4, album_id=4, url="https://aperture-bucket-april-2023.s3.amazonaws.com/FOURRR.jpeg", title='Photo4', description='description4',
    preview_img=True, favorite_count=random.randint(1, 30)
  )
  Photo5 = Photo(
    user_id=5, album_id=5, url="https://aperture-bucket-april-2023.s3.amazonaws.com/FIVEEE.jpeg", title='Photo5', description='description5',
    preview_img=True, favorite_count=random.randint(1, 30)
  )
  Photo6 = Photo(
    user_id=1, album_id=1, url="https://aperture-bucket-april-2023.s3.amazonaws.com/jelly.jpeg", title='Photo6', description='description6', favorite_count=random.randint(1, 30)
  )
  Photo7 = Photo(
    user_id=2, album_id=2, url="https://aperture-bucket-april-2023.s3.amazonaws.com/kpop.jpeg", title='Photo7', description='description7', favorite_count=random.randint(1, 30)
  )
  Photo8 = Photo(
    user_id=3, album_id=3, url="https://aperture-bucket-april-2023.s3.amazonaws.com/marilyn.jpeg", title='Photo8', description='description8', favorite_count=random.randint(1, 30)
  )
  Photo9 = Photo(
    user_id=4, album_id=4, url="https://aperture-bucket-april-2023.s3.amazonaws.com/nsync.jpeg", title='Photo9', description='description9', favorite_count=random.randint(1, 30)
  )
  Photo10 = Photo(
    user_id=5, album_id=5, url="https://aperture-bucket-april-2023.s3.amazonaws.com/overwatch.jpeg", title='Photo10', description='description10', favorite_count=random.randint(1, 30)
  )
  Photo11 = Photo(
    user_id=4, album_id=4, url="https://aperture-bucket-april-2023.s3.amazonaws.com/underwater.jpeg", title='Photo11', description='description11', favorite_count=random.randint(1, 30)
  )
  Photo12 = Photo(
    user_id=3, album_id=3, url="https://aperture-bucket-april-2023.s3.amazonaws.com/angrycat.jpeg", title='Photo12', description='description12', favorite_count=random.randint(1, 30)
  )
  Photo13 = Photo(
    user_id=2, album_id=2, url="https://aperture-bucket-april-2023.s3.amazonaws.com/picklerick.jpeg", title='Photo13', description='description13', favorite_count=random.randint(1, 30)
  )
  Photo14 = Photo(
    user_id=6, album_id=6, url="https://aperture-bucket-april-2023.s3.amazonaws.com/FOURTEEEEEN.jpeg", title='Photo14', description='description14', favorite_count=random.randint(1, 30)
  )
  Photo15 = Photo(
    user_id=7, album_id=7, url="https://aperture-bucket-april-2023.s3.amazonaws.com/FIFTEEEEEN.jpeg", title='Photo15', description='description15', favorite_count=random.randint(1, 30)
  )
  Photo15 = Photo(
    user_id=7, album_id=7, url="https://aperture-bucket-april-2023.s3.amazonaws.com/FIFTEEEEEN.jpeg", title='Photo15', description='description15', favorite_count=random.randint(1, 30)
  )

  _= [Photo(user_id=random.randint(1,7), url=(urls[i]), title=f'Photo{i+16}', description=f'description{i+16}', favorite_count=random.randint(1, 30)) for i in range(len(urls))]

  for photo in _:
     db.session.add(photo)

  db.session.add(Photo1)
  db.session.add(Photo2)
  db.session.add(Photo3)
  db.session.add(Photo4)
  db.session.add(Photo5)
  db.session.add(Photo6)
  db.session.add(Photo7)
  db.session.add(Photo8)
  db.session.add(Photo9)
  db.session.add(Photo10)
  db.session.add(Photo11)
  db.session.add(Photo12)
  db.session.add(Photo13)
  db.session.add(Photo14)
  db.session.add(Photo15)
  db.session.commit()

def undo_photos():
  if environment == "production":
    db.session.execute(f"TRUNCATE table {SCHEMA}.photos RESTART IDENTITY CASCADE;")
  else:
      db.session.execute(text("DELETE FROM photos"))

  db.session.commit()
