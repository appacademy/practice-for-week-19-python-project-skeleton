from .db import db, environment, SCHEMA

class Image(db.Model):
    __tablename__ = "images"

    if environment == "production":
        table_args = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    review_id = db.Column(db.Integer, db.ForeignKey("reviews.id"))
    restaurant_id = db.Column(db.Integer, db.ForeignKey("restaurants.id"))
    url = db.Column(db.String, nullable=False)

    review = db.relationship('Review', back_populates='images')
    restaurant = db.relationship('Restaurant', back_populates='images')

    def to_dict(self):
        return {
            "id": self.id,
            "review_id": self.review_id,
            "restaurant_id": self.restaurant_id,
            "url": self.url
        }
