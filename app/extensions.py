# Flask-SQLAlchemy extension instance
from flask_sqlalchemy import SQLAlchemy
db = SQLAlchemy()

from flask_httpauth import HTTPBasicAuth
auth = HTTPBasicAuth()

# Flask-WTF csrf protection
from flask_wtf.csrf import CsrfProtect
csrf = CsrfProtect()
