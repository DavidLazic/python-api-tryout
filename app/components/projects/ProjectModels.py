from .. import db
from . import ProjectConstants
from .. import JSONSerializer

class Project (db.Model, JSONSerializer):
    __tablename__ = 'projects'

    id = db.Column('project_id', db.Integer, primary_key = True)
    title = db.Column('title', db.String(ProjectConstants.STRING_LEN), nullable = False)
    description = db.Column('description', db.Text())
    period = db.Column('period', db.Text(), nullable = False)

    def __init__ (self, title, description, period):
        self.title = title
        self.description = description
        self.period = period

    def __repr__(self):
        return '<Project %r>' % (self.title)

    def serialize (self):
        return JSONSerializer.serialize(self)

    def serialize_list (self):
        return JSONSerializer.serialize_list(self)
