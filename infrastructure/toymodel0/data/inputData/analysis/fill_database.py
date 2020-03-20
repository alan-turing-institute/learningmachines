from flask import Flask
from database import db
from tables import DM,CE,QS,MH


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
            dm_file = dm_file.astype(object).where(pd.notnull(dm_file), None)
            ce_file = pd.read_csv(f"{datapath}/ce.csv")
            ce_file = ce_file.astype(object).where(pd.notnull(ce_file), None)
            mh_file = pd.read_csv(f"{datapath}/mh.csv")
            mh_file = mh_file.astype(object).where(pd.notnull(mh_file), None)
            qs_file = pd.read_csv(f"{datapath}/qs.csv")
            qs_file = qs_file.astype(object).where(pd.notnull(qs_file), None)
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
            print("filling Medical Health(MH)")
            for row in range(len(mh_file)):
                one_MH = MH(
                    patient_id=mh_file.iloc[row].USUBJID,
                    category=mh_file.iloc[row].MHCAT,
                    decode=mh_file.iloc[row].MHDECOD,
                    sub_category=mh_file.iloc[row].MHSCAT,
                    term=mh_file.iloc[row].MHTERM,
                    start_day=mh_file.iloc[row].MHSTDY,
                    end_day=mh_file.iloc[row].MHENDY,
                    day=mh_file.iloc[row].MHDY, )
                db.session.add(one_MH)
                db.session.flush()
            db.session.commit()
            print("filled MH table")
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


