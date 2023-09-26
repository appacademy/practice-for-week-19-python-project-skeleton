from .db import db, environment, SCHEMA, add_prefix_for_prod

class RestaurantImage(db.Model):
    __tablename__ = "restaurant_images"

    if environment == "production":
        table_args = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    restaurant_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("restaurants.id")))
    url = db.Column(db.String, nullable=False)

    restaurant = db.relationship('Restaurant', back_populates='restaurant_images')

    def to_dict(self):
        return {
            "id": self.id,
            "restaurant_id": self.restaurant_id,
            "url": self.url
        }
