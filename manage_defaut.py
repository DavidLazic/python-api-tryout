from flask_script import Manager, Shell, Server
from flask import current_app
from app import create_app
from app.extensions import db
import app.models as Models
from app.config import DefaultConfig

def create_my_app (config = DefaultConfig):
    return create_app(config)

manager = Manager(create_my_app)

manager.add_command('runServer', Server(host = '0.0.0.0', port = 5000))

@manager.shell
def make_shell_context ():
    return dict(app = current_app, db = db, models = Models)

@manager.command
def custom_command ():
    db.drop_all(bind = None)
    db.create_all(bind = None)

    user = Models.User(
        username = 'root',
        role_code = 0,
        password = 'root')

    user.hash_password(user.password)

    db.session.add(user)
    db.session.commit()

if __name__ == '__main__':
    manager.run()
