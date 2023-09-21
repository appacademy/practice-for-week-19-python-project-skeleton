from .db import db, environment, SCHEMA, add_prefix_for_prod

class Image(db.Model):
    __tablename__ = "images"

    if environment == "production":
        table_args = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    review_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("reviews.id")))
    url = db.Column(db.String, nullable=False)

    review = db.relationship('Review', back_populates='images')

    def to_dict(self):
        return {
            "id": self.id,
            "review_id": self.review_id,
            "url": self.url
        }
