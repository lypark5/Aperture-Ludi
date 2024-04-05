from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, TextAreaField, BooleanField, SubmitField
from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms.validators import DataRequired, Length
from app.models import Photo
from app.api.aws_routes import ALLOWED_EXTENSIONS

class CreatePhotoForm(FlaskForm):
    title = StringField('Add a title', validators=[DataRequired(), Length(min=3, max=30)])
    description = TextAreaField('Add a description')
    # url = StringField('Choose a photo', validators=[URL()])
    url = FileField('Choose Your Photo', validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))])
    preview_img = BooleanField(default=False)
    album_id = IntegerField('Add to a album')
    submit = SubmitField('Create new photo')
