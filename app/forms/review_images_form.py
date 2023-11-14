from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms import StringField, SubmitField, IntegerField
from wtforms.validators import DataRequired
from app.models import ReviewImage
from app.api.aws_routes import ALLOWED_EXTENSIONS


class ReviewImageForm(FlaskForm):
    review_id = IntegerField("review")
    url = FileField(
        "Image File", validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))]
    )
