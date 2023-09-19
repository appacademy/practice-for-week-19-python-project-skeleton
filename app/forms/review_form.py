from app.models import Review
from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, ValidationError

class ReviewForm(FlaskForm):
    reviewer_id = IntegerField('Reviewer', [DataRequired()])
    restaurant_id = IntegerField('Restaurant', [DataRequired()])
    review = StringField('Review', [DataRequired()])
    stars = IntegerField('Stars', [DataRequired()])
