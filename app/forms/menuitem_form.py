from flask_wtf import FlaskForm
from wtforms import StringField, SelectField, IntegerField
from wtforms.validators import DataRequired
from app.models import MenuItem

class MenuItemForm(FlaskForm):
    restaurant_id = IntegerField("restaurant", validators=[DataRequired()])
    item = StringField("item", validators=[DataRequired()])
