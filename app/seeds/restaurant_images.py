from app.models import db, RestaurantImage, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_restaurant_images():
    image1 = RestaurantImage(
        restaurant_id=1, url='https://media.timeout.com/images/103397053/image.jpg')
    image2 = RestaurantImage(
        restaurant_id=2, url='https://www.baltimoremagazine.com/wp-content/uploads/2021/09/cropped-GARESTAURANT_0080.jpg')
    image3 = RestaurantImage(
        restaurant_id=3, url='https://www.cleveland.com/resizer/beOr-ioq0t5l5s_-Jj3zaJ5qyBM=/1280x0/smart/advancelocal-adapter-image-uploads.s3.amazonaws.com/image.cleveland.com/home/cleve-media/width2048/img/parmasunpost/photo/hot-dog-diner-owner-david-tearejpg-57153c38f38f7960.jpg')

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
def undo_restaurant_images():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.restaurant_images RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM restaurant_images"))

    db.session.commit()
