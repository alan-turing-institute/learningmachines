from database import db



class DM(db.Model):
    __tablename__ = 'patient_bkg'
    patient_id = db.Column(db.String(), unique=True, nullable=False, primary_key=True)
    domain = db.Column(db.String(), nullable=True)
    age = db.Column(db.Integer, nullable=True)
    gender = db.Column(db.String(), nullable=True)
    race = db.Column(db.String(), nullable=True)
    country = db.Column(db.String(), nullable=True)
    clinical_event = db.relationship('CE', backref='patient', lazy=True)
    questionaire = db.relationship('QS', backref='patient', lazy=True)

    def __init__(self, patient_id, domain, age, gender, race, country):
        self.patient_id = patient_id
        self.domain = domain
        self.age = age
        self.gender = gender
        self.race = race
        self.country = country

    def __repr__(self):
        return f"DM Table('ID: {self.patient_id}',Age:'{self.age}','Domain:{self.domain}','Sex:{self.gender}')"

    @classmethod
    def populate(self, patient_id, domain, age, gender, race, country):
        person = self(patient_id, domain, age, gender, race, country)
        db.session.add(person)
        db.session.commit()

class MH(db.Model):
    __tablename__ = 'medical_health'
    id = db.Column(db.Integer, primary_key=True, nullable=False, autoincrement=True)
    patient_id = db.Column(db.String(120), db.ForeignKey('patient_bkg.patient_id'), nullable=False)
    decode = db.Column(db.String(), nullable=True)
    category = db.Column(db.String(100), nullable=True)
    sub_category = db.Column(db.String(100), nullable=True)
    term = db.Column(db.String(), nullable=True)
    start_day = db.Column(db.Integer, nullable=True)
    end_day = db.Column(db.Integer, nullable=True)
    day = db.Column(db.Integer, nullable=True)

    def __init__(self, patient_id, decode, category, sub_category, term, start_day, end_day, day):
        self.patient_id = patient_id
        self.decode = decode
        self.category = category
        self.sub_category = sub_category
        self.term = term
        self.start_day = start_day
        self.day = day
        self.end_day = end_day

    def __repr__(self):
        return f"Medical Health Record('ID: {self.id}',Patient ID:'{self.patient_id}','Category:{self.category}','Day:{self.day}','Start Day:{self.start_day}')"

    @classmethod
    def add_MH_record(self, patient_id, decode, category, sub_category, term, start_day, end_day, day):
        MH_record = self(patient_id, decode, category, sub_category, term, start_day, end_day, day)
        db.session.add(MH_record)
        db.session.commit()

class CE(db.Model):
    __tablename__ = 'clinical_event'
    id = db.Column(db.Integer, primary_key=True, nullable=False, autoincrement=True)
    patient_id = db.Column(db.String(120), db.ForeignKey('patient_bkg.patient_id'), nullable=False)
    domain = db.Column(db.String(2), nullable=True)
    reported_term = db.Column(db.String(100), nullable=True)
    modify_term = db.Column(db.String(100), nullable=True)
    dict_term = db.Column(db.String(100), nullable=True)
    category = db.Column(db.String(100), nullable=True)
    body_system = db.Column(db.String(100), nullable=True)
    severity = db.Column(db.String(100), nullable=True)
    serious_event = db.Column(db.String(1), nullable=True)
    start_day = db.Column(db.Integer, nullable=True)
    end_day = db.Column(db.Integer, nullable=True)
    day = db.Column(db.Integer, nullable=True)

    def __init__(self, patient_id, domain, reported_term, modify_term, dict_term, category, body_system, severity,
                 serious_event, start_day, end_day, day):
        self.patient_id = patient_id
        self.domain = domain
        self.reported_term = reported_term
        self.modify_term = modify_term
        self.dict_term = dict_term
        self.category = category
        self.body_system = body_system
        self.severity = severity
        self.start_day = start_day
        self.day = day
        self.end_day = end_day

    def __repr__(self):
        return f"Clinical Event('ID: {self.id}',Patient ID:'{self.patient_id}','Incident:{self.reported_term}','Day:{self.day}','Start Day:{self.start_day}')"

    @classmethod
    def add_clinical_record(self, patient_id, domain, reported_term, modify_term, dict_term, category, body_system,
                            severity, serious_event, start_day, end_day, day):
        CE_record = self(patient_id, domain, reported_term, modify_term, dict_term, category, body_system, severity,
                         serious_event, start_day, end_day, day)
        db.session.add(CE_record)
        db.session.commit()


class QS(db.Model):
    __tablename__ = 'questionaire'
    id = db.Column(db.Integer, primary_key=True, nullable=False, autoincrement=True)
    patient_id = db.Column(db.String(), db.ForeignKey('patient_bkg.patient_id'), nullable=False)
    domain = db.Column(db.String(2), nullable=True)
    test_code = db.Column(db.String(50), nullable=True)
    test_dption = db.Column(db.String(100), nullable=True)
    test_category = db.Column(db.String(30), nullable=True)
    test_score_raw = db.Column(db.String(100), nullable=True)
    test_score_num = db.Column(db.Float, nullable=True)
    test_day = db.Column(db.Integer, nullable=True)
    visit = db.Column(db.String(50), nullable=True)
    visit_day = db.Column(db.Integer, nullable=True)

    def __init__(self, patient_id, domain, test_code, test_dption, test_category, test_score_raw, test_score_num,
                 test_day, visit, visit_day):
        self.patient_id = patient_id
        self.domain = domain
        self.test_code = test_code
        self.test_dption = test_dption
        self.test_category = test_category
        self.test_score_raw = test_score_raw
        self.test_score_num = test_score_num
        self.test_day = test_day
        self.visit = visit
        self.visit_day = visit_day

    def __repr__(self):
        return f"Questionaire('ID: {self.id}',Patient ID:'{self.patient_id}','Test Performed:{self.test_code}','Category:{self.test_category}','Score:{self.test_score_raw}','test day:{self.test_day})"

    @classmethod
    def add_questionaire(self, patient_id, domain, test_code, test_dption, test_category, test_score_raw,
                         test_score_num, test_day, visit, visit_day):
        QS_record = self(patient_id, domain, test_code, test_dption, test_category, test_score_raw, test_score_num,
                         test_day, visit, visit_day)
        db.session.add(QS_record)
        db.session.commit()