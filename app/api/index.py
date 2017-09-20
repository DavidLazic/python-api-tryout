from flask import Blueprint, render_template

index_bp = Blueprint(
    'index_bp',
    __name__,
    template_folder = '../templates',
    static_folder = '../static',
    static_url_path = '/%s' % __name__)

@index_bp.route('/')
def index ():
    return render_template('/pages/index.html')
