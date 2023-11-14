from flask_wtf import FlaskForm
from wtforms import StringField, SelectField, IntegerField, SubmitField
from wtforms.validators import DataRequired
from app.models import RestaurantImage
from flask_wtf.file import FileField, FileAllowed, FileRequired
from app.api.aws_routes import ALLOWED_EXTENSIONS


class RestaurantImageForm(FlaskForm):
    restaurant_id = IntegerField("restaurant")
    image = FileField(
        "Image File", validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))]
    )
