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
* Turing contacts:
  * QuiPP have looked into MIMIC before.
* Link: https://mimic.physionet.org/


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
* Size: Large
* Known drifts:
* Access: Public
* Past literature(s):
* Turing contacts:
  * Radka JBC nowcasting
* Link: https://covid19.eng.ox.ac.uk/


### DECOVID


### SynPUF


### MSOAC
(CPATH MS data)
https://c-path.org/programs/msoac/

### ELSA

English Longitudinal Study of Ageing

https://www.elsa-project.ac.uk/data-and-documentation


### HCUP

USA hospital data (must pay for each year separately)

https://www.hcup-us.ahrq.gov/
