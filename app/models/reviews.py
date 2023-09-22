from .db import db, environment, SCHEMA, add_prefix_for_prod

class Review(db.Model):
    __tablename__ = 'reviews'


    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    reviewer_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    restaurant_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('restaurants.id')), nullable=False)
    review = db.Column(db.String(500), nullable=False)
    stars = db.Column(db.Integer(), nullable=False)

    review_images = db.relationship('ReviewImage', back_populates='review', cascade='all, delete-orphan')
    reviewer = db.relationship('User', back_populates='reviews')
    restaurant = db.relationship("Restaurant", back_populates="reviews")


    def to_dict(self):
        images_list = [image.to_dict() for image in self.review_images]
        return {
            'id': self.id,
            'reviewer_id': self.reviewer_id,
            'restaurant_id': self.restaurant_id,
            'review': self.review,
            'stars': self.stars,
            "reviewer": self.reviewer.to_dict(),
            "images": images_list
        }
