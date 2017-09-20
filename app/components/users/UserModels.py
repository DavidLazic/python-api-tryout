from flask import g
from itsdangerous import TimedJSONWebSignatureSerializer as Serializer, BadSignature, SignatureExpired
from passlib.apps import custom_app_context as pwd_context
from .. import JSONSerializer, get_current_time, db
from . import UserConstants

class User (db.Model, JSONSerializer):
    __tablename__ = 'users'

    id = db.Column('user_id', db.Integer, primary_key = True)
    username = db.Column('username', db.String(UserConstants.STRING_LEN), index = True, unique = True, nullable = False)
    role_code = db.Column('role_code', db.SmallInteger, default = UserConstants.USER, nullable = False)
    created_on = db.Column('created_on', db.DateTime, nullable = False, default = get_current_time)
    password = db.Column('password', db.String(UserConstants.PW_STRING_LEN), nullable = False)

    def __init__ (self, username, password, role_code):
        self.username = username
        self.password = password
        self.role_code = role_code

    def hash_password (self, password):
        self.password = pwd_context.encrypt(password)

    def verify_password (self, password):
        return pwd_context.verify(password, self.password)

    def generate_auth_token (self, expiration = None):
        _serializer = Serializer(g.config['SECRET_KEY'], expires_in = expiration or g.config['REMEMBER_COOKIE_DURATION'])
        return _serializer.dumps({'id': self.id})

    def __repr__ (self):
        return '<User %r>' % (self.username)

    @staticmethod
    def verify_auth_token (token):
        _serializer = Serializer(g.config['SECRET_KEY'])
        _response = {
            'message': 'Token expired.',
            'type': 'error',
            'resolved': None,
            'code': 401
        }

        try:
            data = _serializer.loads(token)
        except SignatureExpired:
            _response['message'] = 'Token expired.'
            # return _response
            print ('EXPIRED')
            return None
        except BadSignature:
            _response['message'] = 'Token invalid.'
            # return _response
            print ('INVALID')
            return None

        return User.query.get(data['id'])
