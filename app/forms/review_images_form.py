from flask_wtf import FlaskForm
from wtforms import StringField, SelectField, IntegerField
from wtforms.validators import DataRequired
from app.models import ReviewImage

class ReviewImageForm(FlaskForm):
    review_id = IntegerField("review")
    url = StringField("url", validators=[DataRequired()])
