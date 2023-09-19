from flask_wtf import FlaskForm
from wtforms import StringField, SelectField, IntegerField
from wtforms.validators import DataRequired
from app.models import Restaurant


class CreateRestaurantForm(FlaskForm):
    owner_id = IntegerField('Owner', validators=[DataRequired()])
    address = StringField('Address', validators=[DataRequired()])
    city = StringField('City', validators=[DataRequired()])
    state = StringField('State', validators=[DataRequired()])
    country = StringField('Country', validators=[DataRequired()])
    name = StringField('Name', validators=[DataRequired()])
    price = IntegerField('Price', validators=[DataRequired()])
