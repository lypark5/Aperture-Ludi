from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, TextAreaField
from wtforms.validators import DataRequired, Length

class CreateAlbumForm(FlaskForm):
    title = StringField('Add title', validators=[DataRequired(), Length(min=3, max=30)])
    description = TextAreaField('Add a description')
    submit = SubmitField('Create new album')
