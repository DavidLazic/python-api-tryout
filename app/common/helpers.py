import os
from datetime import datetime
from sqlalchemy.inspection import inspect

def get_current_time ():
    return datetime.utcnow()

def convert_period (_list):
    for period in _list:
        period['fromDate'] = int(datetime.strptime(period['fromDate'], '%d/%m/%Y').timestamp())
        period['toDate'] = int(datetime.strptime(period['toDate'], '%d/%m/%Y').timestamp())

    return _list

def make_dir (path):
    try:
        if not os.path.exists(path):
            os.mkdir(path)
    except Exception as err:
        raise err

class JSONSerializer (object):
    def serialize (self):
        return {c: getattr(self, c) for c in inspect(self).attrs.keys()}

    @staticmethod
    def serialize_list (l):
        return [m.serialize() for m in l]
