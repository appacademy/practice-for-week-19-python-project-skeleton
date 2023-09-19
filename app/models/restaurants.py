from .db import db, environment, SCHEMA

class Restaurant(db.Model):
    tablename = "restaurants"

    if environment == "production":
        table_args = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    address = db.Column(db.String, nullable=False)
    city = db.Column(db.String, nullable=False)
    state = db.Column(db.String, nullable=False)
    country = db.Column(db.String, nullable=False)
    name = db.Column(db.String, nullable=False)
    price = db.Column(db.Integer, nullable=False)

    images = db.relationship('Image', backref='restaurant')

    def to_dict(self):
        return {
            "id": self.id,
            "owner_id": self.owner_id,
            "address": self.address,
            "city": self.city,
            "state": self.state,
            "country": self.country,
            "name": self.name,
            "priceRange": self.priceRange,
        }
