from .db import db, environment, SCHEMA, add_prefix_for_prod

class Restaurant(db.Model):
    __tablename__ = "restaurants"

    if environment == "production":
        table_args = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))
    address = db.Column(db.String, nullable=False)
    city = db.Column(db.String, nullable=False)
    state = db.Column(db.String, nullable=False)
    country = db.Column(db.String, nullable=False)
    name = db.Column(db.String, nullable=False)
    price = db.Column(db.Integer, nullable=False)
    rating = db.Column(db.Integer, nullable=True)
    category = db.Column(db.String, nullable=False)

    owner = db.relationship('User', back_populates='restaurants')
    restaurant_images = db.relationship('RestaurantImage', back_populates='restaurant', cascade='all, delete-orphan')
    reviews = db.relationship('Review', back_populates='restaurant', cascade='all, delete-orphan' )

    def to_dict(self):
        reviews_list = [review.to_dict() for review in self.reviews]
        images_list = [image.to_dict() for  image in self.restaurant_images]
        return {
            "id": self.id,
            "owner_id": self.owner_id,
            "address": self.address,
            "city": self.city,
            "state": self.state,
            "country": self.country,
            "name": self.name,
            "price": self.price,
            "rating": self.rating,
            "category": self.category,
            "reviews": reviews_list,
            "images": images_list,
            "owner": self.owner.to_dict()
        }
