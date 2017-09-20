import os
from flask import Flask, request, g
from flask_cors import CORS
from . import config as Config
from .config import DefaultConfig
from .common import COMMON_CONSTANTS, Response
from .models import User
from .extensions import db, csrf, auth
from .api import auth_bp, index_bp, projects_bp

__all__ = ['create_app']

DEFAULT_BLUEPRINTS = [
    auth_bp,
    index_bp,
    projects_bp
]

def create_app (config = None, app_name = None, blueprints = None):

    blueprints = blueprints or DEFAULT_BLUEPRINTS
    config = config or DefaultConfig()
    app_name = app_name or config.PROJECT

    app = Flask(app_name,
                instance_path = os.path.join(config.PROJECT_ROOT, COMMON_CONSTANTS.INSTANCE_FOLDER_PATH),
                instance_relative_config = True)
    configure_app(app, config)
    configure_hook(app)
    configure_error_handlers(app)
    configure_extensions(app)
    configure_logging(app)
    configure_blueprints(app, blueprints)

    return app

def configure_app (app, config = None):
    app.config.from_object(Config.DefaultConfig)

    if config:
        app.config.from_object(config)
        return

    application_mode = os.getenv('APPLICATION_MODE', 'PRODUCTION')
    app.config.from_object(Config.get_config(application_mode))

def configure_extensions (app):
    db.init_app(app)

    @auth.verify_password
    def verify_password (username_or_token, password):
        user = User.verify_auth_token(username_or_token)

        if not user:
            user = User.query.filter_by(username = username_or_token).first()

            if not user or not user.verify_password(password):
                return False

        g.user = user
        return True

    @auth.error_handler
    def unauthorized ():
        return Response.error(message = 'Unauthorized access.', code = 401)

    CORS(app, resources = r'/static/*')
    csrf.init_app(app)

def configure_blueprints (app, blueprints):
    for blueprint in blueprints:
        app.register_blueprint(blueprint)

def configure_hook (app):
    @app.before_request
    def before_request ():
        g.config = app.config
        pass

def configure_logging(app):
    pass

def configure_error_handlers (app):
    @app.errorhandler(500)
    def server_error_page (err):
        return Response.error(message = str(err), code = 500)

    @app.errorhandler(422)
    def semantic_error (err):
        return Response.error(message = str(err.description), code = 422)

    @app.errorhandler(404)
    def page_not_found (err):
        return Response.error(message = str(err.description), code = 404)

    @app.errorhandler(403)
    def page_forbidden (err):
        return Response.error(message = str(err.description), code = 403)

    @app.errorhandler(400)
    def page_bad_request (err):
        return Response.error(message = str(err.description), code = 400)
