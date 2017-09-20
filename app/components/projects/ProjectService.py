from flask import request
from . import Project
from .. import Response, convert_period, db
from datetime import datetime

class ProjectService ():

    def all (self):
        return Response.success(
            message = 'Listing all projects.',
            data = {
                'projects': Project.serialize_list(Project.query.all())
            }
        )

    def create (self):
        _project = Project(
            title = request.json['title'],
            description = request.json['description'],
            period = convert_period(request.json['period']))

        _project_exists = Project.query.filter_by(title = request.json['title']).first()

        if _project_exists:
            return Response.error(
                message = 'Project already exists.',
                data = {
                    'project': Project.serialize_list(Project.query.filter_by(title = request.json['title']))
                }
            )

        db.session.add(_project)
        db.session.commit()
        return Response.success(
            message = 'Project created.'
        )

    def single (self, id):
        return Response.success(
            message = 'Project found.',
            data = {
                'project': Project.serialize_list(Project.query.filter_by(id = id))
            }
        )

    def update (self, id):
        _fields = ['title', 'description', 'period']
        _project = Project.query.filter_by(id = id).first()

        for field in _fields:
            if field in request.json :
                setattr(_project, field, request.json[field])

        db.session.commit()

        return Response.success(
            message = 'Project updated.',
            data = {
                'project': Project.serialize_list(Project.query.filter_by(id = id))
            }
        )

    def delete (self, id):
        Project.query.filter_by(id = id).delete()
        db.session.commit()
        return Response.success(
            message = 'Project deleted.'
        )
