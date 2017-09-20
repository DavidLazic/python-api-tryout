from flask import Blueprint, render_template
from flask_cors import CORS
from ..extensions import csrf, auth
from ..components.users import UserService

auth_bp = Blueprint(
    'auth_bp',
    __name__,
    template_folder = '../templates',
    static_folder = '../static',
    static_url_path = '/%s' % __name__)


CORS(auth_bp)
user_service = UserService()

@auth_bp.route('/hyp3-admin')
def admin ():
    return render_template('/pages/admin.html')

@csrf.exempt
@auth_bp.route('/api/v1/login', methods = ['POST'])
def login ():
    return user_service.login();
