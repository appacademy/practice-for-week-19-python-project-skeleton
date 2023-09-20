from app.models import db, MenuItem, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_items():
    item1 = MenuItem(
        restaurant_id=1, item='Cold Dog')
    item2 = MenuItem(
        restaurant_id=1, item='Hot Dog')
    item3 = MenuItem(
        restaurant_id=2, item='Turkey Dog')
    item4 = MenuItem(
        restaurant_id=2, item='Beef Dog')
    item5 = MenuItem(
        restaurant_id=3, item='Halal Dog')
    item6 = MenuItem(
        restaurant_id=3, item='Camel Dog')

    db.session.add(item1)
    db.session.add(item2)
    db.session.add(item3)
    db.session.add(item4)
    db.session.add(item5)
    db.session.add(item6)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_items():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.menuitems RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM menuitems"))

    db.session.commit()
