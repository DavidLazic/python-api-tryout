from functools import wraps
from flask import request
from .. import Response

def fields_required (_dict = []):
    def wrapper (fn):
        @wraps(fn)

        def decorated (*args, **kwargs):
            _errors = []

            for prop in _dict:
                if not prop in request.json:
                    _errors.append(prop)

            if len(_errors):
                return Response.error(message = 'Missing properties: %s.' % [prop for prop in _errors])

            return fn(*args, **kwargs)
        return decorated
    return wrapper
