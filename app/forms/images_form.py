from flask_wtf import FlaskForm
from wtforms import StringField, SelectField, IntegerField
from wtforms.validators import DataRequired
from app.models import Image

class ImageForm(FlaskForm):
    review_id = IntegerField("ReviewerId",  validators=[DataRequired()])
    restaurant_id = IntegerField("ReviewId", validators=[DataRequired()])
    url = StringField("URL", validators=[DataRequired()])