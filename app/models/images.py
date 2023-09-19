from .db import db, environment, SCHEMA

class Image(db.Model):
    tablename = "images"

    if environment == "production":
        table_args = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    review_id = db.Column(db.Integer, db.ForeignKey("reviews.id"))
    restaurant_id = db.Column(db.Integer, db.ForeignKey("restaurants.id"))
    url = db.Column(db.String, nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "reviewId": self.reviewId,
            "restaurantId": self.restaurantId,
            "url": self.url
        }
