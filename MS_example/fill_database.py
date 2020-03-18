from flask import Flask
from database import db
from tables import DM,CE,QS


def create_app():
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///site.db'
    with app.app_context():
        db.init_app(app)

    @app.route('/')
    def hello_world():
        return 'MS database set up successfully, waiting for more information...'
    return app


def setup_database(app, datapath, POPULATE_DB=True):
    if POPULATE_DB:
        print("Populating database...")
        with app.app_context():
            db.drop_all()
            print("Dropped all previous columns")
            db.create_all()
            print("Created new empty database")
            import pandas as pd
            dm_file = pd.read_csv(f"{datapath}/dm.csv")
            ce_file = pd.read_csv(f"{datapath}/ce.csv")
            qs_file = pd.read_csv(f"{datapath}/qs.csv")
            print("filling Patients Demography(DM)")
            for row in range(len(dm_file)):
                DM.populate(patient_id=dm_file.iloc[row].USUBJID,
                            domain=dm_file.iloc[row].DOMAIN,
                            age=dm_file.iloc[row].AGE,
                            gender=dm_file.iloc[row].SEX,
                            race=dm_file.iloc[row].RACE,
                            country=dm_file.iloc[row].COUNTRY)
            print("filled DM table")
            print("filling Clinical Event(CE)")
            for row in range(len(ce_file)):
                CE.add_clinical_record(
                    patient_id=ce_file.iloc[row].USUBJID,
                    domain=ce_file.iloc[row].DOMAIN,
                    reported_term=ce_file.iloc[row].CETERM,
                    modify_term=ce_file.iloc[row].CEMODIFY,
                    dict_term=ce_file.iloc[row].CEDECOD,
                    category=ce_file.iloc[row].CECAT,
                    body_system=ce_file.iloc[row].CEBODSYS,
                    severity=ce_file.iloc[row].CESEV,
                    serious_event=ce_file.iloc[row].CESER,
                    start_day=ce_file.iloc[row].CESTDY,
                    end_day=ce_file.iloc[row].CEENDY,
                    day=ce_file.iloc[row].CEDY, )
            print("filled CE table")
            print("filling Questionaire(QS)")
            for row in range(len(qs_file)):
                one_event = QS(
                    patient_id=qs_file.iloc[row].USUBJID,
                    domain=qs_file.iloc[row].DOMAIN,
                    test_code=qs_file.iloc[row].QSTESTCD,
                    test_dption=qs_file.iloc[row].QSTEST,
                    test_category=qs_file.iloc[row].QSCAT,
                    test_score_raw=qs_file.iloc[row].QSORRES,
                    test_score_num=qs_file.iloc[row].QSSTRESN,
                    test_day=qs_file.iloc[row].QSDY,
                    visit=qs_file.iloc[row].VISIT,
                    visit_day=qs_file.iloc[row].VISITDY,
                )
                db.session.add(one_event)
                db.session.flush()
            db.session.commit()
            print("filled QS table")
    else:
        print("database setup passed.")
    print("database setup and ready to use.")


