from flask_wtf import FlaskForm
from wtforms import BooleanField
from wtforms.validators import DataRequired

class CreateFav(FlaskForm):
    liked = BooleanField('Like', validators=[DataRequired()])
