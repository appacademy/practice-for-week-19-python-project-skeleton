from app.models import db, Restaurant, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_restaurants():
    restaurant1 = Restaurant(
        owner_id=1, address='123 Glizzy Way', city='Hot Dog Cove', state='NE', country='USA', name="Frank's Weenies", price=2)
    restaurant2 = Restaurant(
        owner_id=2, address='6969 Ben Dover St', city='Sawcon', state='FL', country='Sugon', name="Sugondese World Famous Dogs", price=1)
    restaurant3 = Restaurant(
        owner_id=3, address='18180 Colima Rd', city='Rowland Hts', state='CA', country='USA', name="Top Dog", price=2)

    db.session.add(restaurant1)
    db.session.add(restaurant2)
    db.session.add(restaurant3)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_restaurants():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.restaurants RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM restaurants"))

    db.session.commit()
