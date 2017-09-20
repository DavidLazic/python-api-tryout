from flask import Blueprint
from flask_cors import CORS
from ..components.projects import fields_required
from ..extensions import csrf, auth
from ..components.projects import ProjectService

projects_bp = Blueprint(
    'projects_bp',
    __name__,
    template_folder = '../templates/',
    url_prefix = '/api/v1')

CORS(projects_bp)
projects_service = ProjectService()

@projects_bp.route('/projects', methods = ['GET'])
def get_projects ():
    return projects_service.all()


@projects_bp.route('/projects', methods = ['POST'])
@csrf.exempt
@auth.login_required
@fields_required(['title', 'description', 'period'])
def projects ():
    return projects_service.create()


@projects_bp.route('/projects/<int:id>', methods = ['GET'])
@auth.login_required
def get_project (id):
    return projects_service.single(id)


@projects_bp.route('/projects/<int:id>', methods = ['PATCH'])
@auth.login_required
@csrf.exempt
def update_project (id):
    return projects_service.update(id)

@projects_bp.route('/projects/<int:id>', methods = ['DELETE'])
@auth.login_required
@fields_required
def delete_project (id):
    return projects_service.delete(id)
