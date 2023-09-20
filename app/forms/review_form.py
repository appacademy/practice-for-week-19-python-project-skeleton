from app.models import Review
from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, ValidationError

class ReviewForm(FlaskForm):
    reviewer_id = IntegerField('reviewer', [DataRequired()])
    restaurant_id = IntegerField('restaurant', [DataRequired()])
    review = StringField('review', [DataRequired()])
    stars = IntegerField('stars', [DataRequired()])
