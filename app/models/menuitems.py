from .db import db, environment, SCHEMA

class MenuItem(db.Model):
    __tablename__ = 'menuitems'


    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    restaurant_id = db.Column(db.Integer, db.ForeignKey('restaurants.id'), nullable=False)
    item = db.Column(db.String(500), nullable=False)

    restaurant = db.relationship('Restaurant', back_populates='menuitems')

    def to_dict(self):
        return {
            'id': self.id,
            'restaurant_id': self.restaurant_id,
            'item': self.item,
        }
