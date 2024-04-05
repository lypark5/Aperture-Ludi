from flask_wtf import FlaskForm
from wtforms import TextAreaField, SubmitField, StringField
from wtforms.validators import DataRequired, Length
from app.models import User

class SignUpFormNoFile(FlaskForm):
    email = StringField('email', validators=[DataRequired()])
    username = StringField('username', validators=[DataRequired()])
    first_name = StringField('First name', validators=[DataRequired(), Length(min=3, max=50)])
    last_name = StringField('Last name', validators=[DataRequired(), Length(min=3, max=50)])
    profile_pic = StringField('Profile Pic')
    password = StringField('password', validators=[DataRequired()])
    bio = TextAreaField('Bio')
    submit = SubmitField('Sign up')
