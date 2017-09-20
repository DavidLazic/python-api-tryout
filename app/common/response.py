from flask import make_response, jsonify
from werkzeug.http import HTTP_STATUS_CODES

def json (response, code = 200):
    if code is not 200 and not response['error']['type']:
        response['error']['type'] = HTTP_STATUS_CODES[code]

    return make_response(jsonify(response), code)

def success (message = '', data = {}):
    response = {
        'success': True,
        'data': data,
        'message': message
    }

    return json(response)

def error (message = None, data = {}, type = None, code = 400):
    response = {
        'error': {
            'message': message or 'Something went wrong.',
            'type': type,
            'data': data
        }
    }

    return json(response, code)
