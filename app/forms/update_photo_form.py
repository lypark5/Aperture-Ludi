from flask_wtf import FlaskForm
from wtforms import TextAreaField, SubmitField, StringField
from wtforms.validators import DataRequired, Length
from app.models import Photo

class UpdatePhotoForm(FlaskForm):
  title = TextAreaField('Add your comment here...', validators=[DataRequired(), Length(min=3, max=30)])
  description = StringField('Add a description')
  submit = SubmitField('Submit')
