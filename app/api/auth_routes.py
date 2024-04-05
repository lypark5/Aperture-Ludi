from flask import Blueprint, jsonify, session, request
from app.models import User, db
from app.forms import LoginForm, SignUpForm, SignUpFormNoFile
from flask_login import current_user, login_user, logout_user, login_required
from app.api.aws_routes import get_unique_filename, upload_file_to_s3, remove_file_from_s3
from random import choice
auth_routes = Blueprint('auth', __name__)
imgArray = [
    "https://aperture-bucket-april-2023.s3.amazonaws.com/header1.jpeg",
    "https://aperture-bucket-april-2023.s3.amazonaws.com/header2.jpeg",
    "https://aperture-bucket-april-2023.s3.amazonaws.com/header5.jpeg"
    ]

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


@auth_routes.route('/')
def authenticate():
    """
    Authenticates a user.
    """
    if current_user.is_authenticated:
        return current_user.to_dict()
    return {'errors': ['Unauthorized']}


@auth_routes.route('/login', methods=['POST'])
def login():
    """
    Logs a user in
    """
    form = LoginForm()
    # Get the csrf_token from the request cookie and put it into the
    # form manually to validate_on_submit can be used
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        # Add the user to the session, we are logged in!
        user = User.query.filter(User.email == form.data['email']).first()
        login_user(user)
        return user.to_dict()
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@auth_routes.route('/logout')
def logout():
    """
    Logs a user out
    """
    logout_user()
    return {'message': 'User logged out'}


@auth_routes.route('/signup', methods=['POST'])
def sign_up():
    """
    Creates a new user and logs them in
    """
    form = SignUpForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        if not form.data['user_background_pic']:
            background_pic_upload = {}
            random_url = choice(imgArray) 
            background_pic_upload['url'] = random_url
        else:
            background_pic = form.data['user_background_pic']
            background_pic.filename = get_unique_filename(background_pic.filename)
            background_pic_upload = upload_file_to_s3(background_pic)
        if not form.data['profile_pic']:
            upload ={}
            upload['url'] = 'https://aperture-bucket-april-2023.s3.amazonaws.com/default.jpeg'
        else:

            profile_pic = form.data["profile_pic"]
            profile_pic.filename = get_unique_filename(profile_pic.filename)
            upload = upload_file_to_s3(profile_pic)
        if "url" not in upload:
        #   return render_template("post_form.html", form=form, errors=[upload])
            return {'errors': validation_errors_to_error_messages(form.errors)}, 401


        user = User(
            username=form.data['username'],
            email=form.data['email'],
            password=form.data['password'],
            first_name=form.data['first_name'],
            last_name=form.data['last_name'],
            profile_pic=upload["url"],
            bio=form.data['bio'],
            user_background_pic = background_pic_upload['url']
        )

        db.session.add(user)
        db.session.commit()
        login_user(user)
        return user.to_dict()

    if form.errors:
            return {"form errors": form.errors}


@auth_routes.route('/signup-new', methods=['POST'])
def sign_up_no_file():
    form = SignUpFormNoFile()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        user = User(
            username=form.data['username'],
            email=form.data['email'],
            password=form.data['password'],
            first_name=form.data['first_name'],
            last_name=form.data['last_name'],
            profile_pic=form.data["profile_pic"],
            bio=form.data['bio'],
        )

        db.session.add(user)
        db.session.commit()
        login_user(user)
        return user.to_dict()

    if form.errors:
            return {"form errors": form.errors}



@auth_routes.route('/unauthorized')
def unauthorized():
    """
    Returns unauthorized JSON when flask-login authentication fails
    """
    return {'errors': ['Unauthorized']}, 401
