from flask_wtf import FlaskForm
from wtforms import TextAreaField, SubmitField
from wtforms.validators import DataRequired, Length
from app.models import Comment

class UpdateCommentForm(FlaskForm):
  comment = TextAreaField('Update your comment!', validators=[DataRequired(), Length(min=3, max=100)])
  submit = SubmitField('Submit')
