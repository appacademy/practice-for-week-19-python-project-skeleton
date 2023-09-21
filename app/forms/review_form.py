from app.models import Review
from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, ValidationError

class ReviewForm(FlaskForm):
    reviewer_id = IntegerField('reviewer')
    restaurant_id = IntegerField('restaurant')
    review = StringField('review', [DataRequired()])
    stars = IntegerField('stars', [DataRequired()])
