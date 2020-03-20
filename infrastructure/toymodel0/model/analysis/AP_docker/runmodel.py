#!/usr/bin/env python3
import pandas as pd
import initpath_ap
initpath_ap.init_sys_path()
import utilmlab

from sklearn.datasets import load_breast_cancer

df = load_breast_cancer()
X_ = pd.DataFrame(df.data)
Y_ = pd.DataFrame(df.target)
import model
metric = 'aucprc'
acquisition_type = 'MPI' # default and prefered is LCB but this generates excessive warnings, MPI is a good compromise.
AP_mdl   = model.AutoPrognosis_Classifier(
    metric=metric, CV=5, num_iter=3, kernel_freq=100, ensemble=True,
    ensemble_size=3, Gibbs_iter=100, burn_in=50, num_components=3,
    acquisition_type=acquisition_type)

AP_mdl.fit(X_, Y_)
AP_mdl.predict(X_)
model.evaluate_ens(X_, Y_, AP_mdl, n_folds=5, visualize=True)
# AP_mdl.visualize_data(X_)
AP_mdl.APReport()

