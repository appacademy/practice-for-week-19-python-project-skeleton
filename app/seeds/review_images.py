from app.models import db, ReviewImage, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_review_images():
    image1 = ReviewImage(
        review_id=1, url='https://i.kym-cdn.com/photos/images/original/002/478/462/fc2.jpg')
    image2 = ReviewImage(
        review_id=2, url='https://i.redd.it/8i3g5uq6kac51.png')
    image3 = ReviewImage(
        review_id=3, url='https://i1.sndcdn.com/artworks-OnxUtSVPpcAFGZxQ-Sujwlw-t500x500.jpg')

    db.session.add(image1)
    db.session.add(image2)
    db.session.add(image3)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_review_images():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.review_images RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM review_images"))

    db.session.commit()
