import os

class BaseConfig (object):

    PROJECT = 'PROJECT_NAME'

    # Get app root path, also can use flask.root_path.
    PROJECT_ROOT = os.path.abspath(os.path.dirname(__file__))

    DEBUG = False
    TESTING = False
    WTF_CSRF_ENABLED = True

    ADMINS = frozenset(['admin@admin.com'])

    SECRET_KEY = 'super-secret-key'

class DefaultConfig (BaseConfig):

    SQLALCHEMY_DATABASE_URI = 'sqlite:///' + os.path.join(BaseConfig.PROJECT_ROOT + '/database/', 'DB_NAME.db')
    SQLALCHEMY_MIGRATE_REPO = os.path.join(BaseConfig.PROJECT_ROOT + '/database/', 'DB_REPO')
    SQLALCHEMY_TRACK_MODIFICATIONS = True

    REMEMBER_COOKIE_DURATION = 3600

    ADMIN_ROUTES = frozenset([
                'test-route'
            ])

class LocalConfig (DefaultConfig):
    # config for local development
    DEBUG = True
    pass

class StagingConfig (DefaultConfig):
    # config for staging environment
    pass

class ProdConfig (DefaultConfig):
    # config for production environment
    pass

def get_config (MODE):
    SWITCH = {
        'LOCAL'     : LocalConfig,
        'STAGING'   : StagingConfig,
        'PRODUCTION': ProdConfig
    }

    return SWITCH[MODE]
