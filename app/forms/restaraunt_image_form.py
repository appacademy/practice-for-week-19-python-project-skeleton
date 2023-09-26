from flask_wtf import FlaskForm
from wtforms import StringField, SelectField, IntegerField
from wtforms.validators import DataRequired
from app.models import RestaurantImage

class RestaurantImageForm(FlaskForm):
    restaurant_id = IntegerField("restaurant")
    url = StringField("url", validators=[DataRequired()])
