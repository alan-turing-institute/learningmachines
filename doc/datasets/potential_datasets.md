# List of Potential Datasets

This document is to collect potential datasets that could be useful for the toymodel of Learning Machine.


### MIMIC-III critical care dataset
* Brief description: contains information about intensive care unit (ICU) patients from the Beth Israel Deaconess Medical
    Center (BIDMC). Well known dataset.
* Sector: Health
* Real or synthetic data: Real
* Patient-level: Yes
* Size (rows and features): Large (and data spans a decade)!
* Known drifts: Abrupt concept shift and gradual concept shift.
* Access: Online training course and access request form (see [here](https://mimic.physionet.org/gettingstarted/access/))
* Past literature(s):
  * https://arxiv.org/pdf/1908.00690.pdf
    * Note that this states dates in MIMIC are offset by a random amount for each patient to maintain privacy. Authors needed a separate data agreement to access the actual year of each entry, allowing them to look at the performance of models on future data.
    * Code: https://github.com/MLforHealth/MIMIC_Generalisation
  * https://arxiv.org/pdf/1902.00450.pdf (code available here: https://bitbucket.org/mvdschaar/mlforhealthlabpub/src/master/README.md)
* Turing contacts:
  * QuiPP have looked into MIMIC before as well.
* Link: https://mimic.physionet.org/

For anonymisation reasons the original treatment year is removed (see "Date Shifting" here: https://mimic.physionet.org/mimicdata/time/). This GitHub issue mentions the process for getting access to the original treatment year: https://github.com/MIT-LCP/mimic-code/issues/263

### MIMIC-IV critical care dataset
* Brief description: Recently released update to MIMIC-III (see above). Includes original treatment year in 3-year bins (see [here](https://mimic-iv.mit.edu/docs/datasets/core/patients/))
* Sector: Health
* Real or synthetic data: Real
* Patient-level: Yes
* Size (rows and features): Large (and data spans a decade)!
* Known drifts: Abrupt concept shift and gradual concept shift.
* Access: Online training course and access request form (see [here](https://mimic-iv.mit.edu/docs/access/))
* Past literature(s):
* Link: https://mimic-iv.mit.edu/


### SEER

* Brief description: USA cancer incidence data.
* Sector: Health
* Real or synthetic data: Real
* Patient-level: Yes
* Size: Millions of patients (from 1970s to present), ~one hundred features.
* Known drifts:
* Access: Public (straightforward access request)
* Past literature(s):
  * http://papers.nips.cc/paper/6827-deep-multi-task-gaussian-processes-for-survival-analysis-with-competing-risks.pdf (code available)
  * http://papers.nips.cc/paper/7413-multitask-boosting-for-survival-analysis-with-competing-risks.pdf
  * http://proceedings.mlr.press/v84/bellot18a/bellot18a.pdf
  * http://medianetlab.ee.ucla.edu/papers/AAAI_2018_DeepHit#:~:text=DeepHit%20makes%20no%20assumptions%20about,one%20possible%20event%20of%20interest (code available)
  * Autoprosnosis http://proceedings.mlr.press/v80/alaa18b/alaa18b.pdf (code available)
  * All codes for above works can be found here https://bitbucket.org/mvdschaar/mlforhealthlabpub/src/master/README.md
* Link: https://seer.cancer.gov/data/


### PHE Covid-19 Data
* Brief description: Regional Covid19 tests, cases and deaths for the UK.
* Sector: Health
* Real or synthetic data: Real
* Patient-level: No
* Size: Only a couple of features, weekly (or daily?) data for 2020.
* Known drifts: Changes in availability of testing
* Access: Public
* Past literature(s):
* Turing contacts:
  * Radka JBC nowcasting
* Link: https://coronavirus.data.gov.uk/


### OxCovid19 Database
* Brief description: International (regional) Covid-19 data including case numbers, government response, mobility (transport) and others.
* Sector: Health
* Real or synthetic data: Real
* Patient-level: No
* Size: ~100 features, daily(?) data for ~6 months (to date, but updating)
* Known drifts:
* Access: Public
* Past literature(s):
* Link: https://covid19.eng.ox.ac.uk/


### DECOVID
* Brief description: Patient-level hospital visit data for Covid-19 patient.
* Sector: Health
* Real or synthetic data: Real
* Patient-level: Yes
* Size: 
* Known drifts:
* Access: Private and very restricted.
* Past literature(s):
* Link: https://www.decovid.org/
  

### MSOAC

* Brief description: Demographic and outcome data from the placebo arm of multiple sclerosis clinical trials.
* Sector: Health
* Real or synthetic data: Real
* Patient-level: Yes
* Size: 2500 patients.
* Known drifts:
* Access: Access request form (but we already have the data)
* Past literature(s):
* Link: https://c-path.org/programs/msoac/


### CCHIC

* Brief description: Critical care data (including time series) for several UK hospitals between 2014 and 2016.
* Sector: Health
* Real or synthetic data: Real
* Patient-level: Yes
* Size: >250 features, >20,000 patients, >100 million data points (full dataset)
* Known drifts:
* Access: Public subset (with request), sensitive identifiable data in UCL safe haven. We have a data subset.
* Past literature(s):
* Turing contact(s):
  - AIDA: Camila, James G
* Links:
  - https://github.com/ropensci/cleanEHR
  - https://pubmed.ncbi.nlm.nih.gov/29500026/

### SynPUF

* Brief description: Synthetic medical claims data in OMOP format.
* Sector: Health
* Real or synthetic data: Synthetic
* Patient-level: Yes
* Size: Full set >2 million patients. We have a 1000 patient subset.
* Known drifts:
* Access: Public
* Past literature(s):
* Link: https://www.cms.gov/Research-Statistics-Data-and-Systems/Downloadable-Public-Use-Files/SynPUFs/DE_Syn_PUF

### GBSG2

* Brief description: Cancer data from a well known clinical trial.
* Sector: Health
* Real or synthetic data: Real
* Patient-level: Yes
* Size: 
* Known drifts:
* Access: Public
* Past literature(s):
* Link: https://www.rdocumentation.org/packages/TH.data/versions/1.0-10/topics/GBSG2


### Diabetes

* Brief description: 10 years (1999-2008) of clinical diabetes care at 130 US hospitals
* Sector: Health
* Real or synthetic data: Real
* Patient-level: Yes
* Size: 
* Known drifts:
* Access: Public
* Past literature(s):
* Link: https://archive.ics.uci.edu/ml/datasets/diabetes+130-us+hospitals+for+years+1999-2008

### SUPPORT

* Brief description: Study to Understand Prognoses Preferences Outcomes and Risks of Treatment
* Sector: Health
* Real or synthetic data: Real
* Patient-level: Yes
* Size: 9000 patients (SUPPORT2)
* Known drifts:
* Access: Public
* Past literature(s):
* Links:
  - http://biostat.mc.vanderbilt.edu/wiki/Main/SupportDesc
  - http://biostat.mc.vanderbilt.edu/wiki/pub/Main/DataSets/support2csv.zip

SUPPORT: Public data of critical patients. Find a description at http://biostat.mc.vanderbilt.edu/wiki/Main/SupportDesc and the data attached.

### Propublica COMPAS dataset

https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5777393/#R2
https://www.propublica.org/article/how-we-analyzed-the-compas-recidivism-algorithm
https://www.propublica.org/article/machine-bias-risk-assessments-in-criminal-sentencing
https://github.com/propublica/compas-analysis



### ELSA

English Longitudinal Study of Ageing

https://www.elsa-project.ac.uk/data-and-documentation


### HCUP

USA hospital data (must pay for each year separately)

https://www.hcup-us.ahrq.gov/

