from flask import request, g
from . import User
from .. import Response, db

class UserService ():

    def login (self):
        _user = User.query.filter_by(username = request.json['username']).first()

        if not _user or not _user.verify_password(request.json['password']):
            return Response.error(
                message = 'Invalid username or password.'
            )

        _token = _user.generate_auth_token(g.config['REMEMBER_COOKIE_DURATION'])
        return Response.success(
            message = 'Success',
            data = {
                'token': _token.decode('ascii')
            }
        )
