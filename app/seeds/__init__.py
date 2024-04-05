from flask.cli import AppGroup
from .users import seed_users, undo_users
from .albums import seed_albums, undo_albums
from .photos import seed_photos, undo_photos
from .comments import seed_comments, undo_comments
from .favorites import seed_favorites, undo_favorites

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo
        # command, which will  truncate all tables prefixed with
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_favorites()
        undo_comments()
        undo_photos()
        undo_albums()
        undo_users()
    # Add other seed functions here
    seed_users()
    seed_albums()
    seed_photos()
    seed_comments()
    seed_favorites()



# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    # Add other undo functions here
    seed_favorites()
    undo_comments()
    undo_photos()
    undo_albums()
    undo_users()


