# Mapping SEER Features

This is my first attempt at matching the fields in the file Mahed has access to (used for the "Deep Multi-task Gaussian Processes for Survival Analysis with Competing Risks" and/or "Multitask Boosting for Survival Analysis with Competing Risks" papers) to columns in the actual SEER data.

The papers mention using data of around 70,000 breast cancer patients between 1992 and 2007. I looked at thw papers and the [SEER data dictionary/description](https://seer.cancer.gov/data-software/documentation/seerstat/nov2019/) to have a best guess at where each of the values in "Mahed's" file originally came from.

Selecting all the fields below in SEER Stat I get around 700,000 breast cancer patients, both from SEER 1975-2017 and SEER 1992-2017 (which covers less time but includes more locations). Haven't yet explored the files in detail, but a few of the features look mostly blank in SEER 1975.


## Data Fields

| "Mahed" file | SEER dictionary | SEER Category | Notes |
|-|-|-|-|
| ID | Patient ID | Other |  |
| ACJJ Stage | Derived AJCC Stage Group, 7th ed (2010-2015), Derived AJCC Stage Group, 6th ed (2004-2015), AJCC stage 3rd edition (1988-2003), SEER modified AJCC stage 3rd (1988-2003), Breast - Adjusted AJCC 6th Stage (1988-2015)… many options | Stage - 7th edition, Stage - 6th Edition | Note typo - should be AJCC not ACJJ, https://seer.cancer.gov/data-software/documentation/seerstat/nov2019/TextData.FileDescription.pdf#DERIVED_AJCC_STAGE_GROUP__7TH_E |
| Tumor Marker | Tumor marker 1 (1990-2003), Tumor marker 2 (1990-2003), Tumor marker 3 (1998-2003) | Extent of Disease - Historic | https://seer.cancer.gov/data-software/documentation/seerstat/nov2019/TextData.FileDescription.pdf#TUMOR_MARKER_1__1990_2003_ |
| Lymphod node | CS lymph nodes (2004-2015), EOD 10 - nodes (1988-2003) | Extent of Disease, Extent of Disease - Historic | https://seer.cancer.gov/seerstat/variables/seer/ajcc-stage/ |
| Age | Age recode with <1 year olds | Age at Diagnosis | Age at diagnosis in ~5 year bins |
| Gender | Sex | Race, Sex, Year Dx, Registry, County |  |
| Single | Marital status at diagnosis | Other | NOT AVAILABLE IN OUR DATA? https://seer.cancer.gov/data-software/documentation/seerstat/nov2019/TextData.FileDescription.pdf#MARITAL_STATUS_AT_DIAGNOSIS |
| Married | Marital status at diagnosis | Other | NOT AVAILABLE IN OUR DATA? |
| Separated | Marital status at diagnosis | Other | NOT AVAILABLE IN OUR DATA? |
| Divorced | Marital status at diagnosis | Other | NOT AVAILABLE IN OUR DATA? |
| Widowed | Marital status at diagnosis | Other | NOT AVAILABLE IN OUR DATA? |
| Domestic Partner | Marital status at diagnosis | Other | NOT AVAILABLE IN OUR DATA? |
| Bilateral | Laterality | Site and Morphology | https://seer.cancer.gov/data-software/documentation/seerstat/nov2019/TextData.FileDescription.pdf#LATERALITY |
| Laterality Spec. | Laterality | Site and Morphology |  |
| Benign/borderline Tumors | Total number of benign/borderline tumors for patient | Multiple Primary Fields |  |
| Positive histology | Diagnostic Confirmation | Site and Morphology | https://seer.cancer.gov/data-software/documentation/seerstat/nov2019/TextData.FileDescription.pdf#DIAGNOSTIC_CONFIRMATION |
| Positive cytology | Diagnostic Confirmation | Site and Morphology |  |
| Histology ICD-O-3 | Histologic Type ICD-O-3 | Site and Morphology |  |
| EOD 10 Extent | EOD 10 - extent (1988-2003) | Extent of Disease - Historic | https://seer.cancer.gov/manuals/EOD10Dig.pub.pdf |
| Positive histology + positive immunophenotyping | Diagnostic Confirmation | Site and Morphology |  |
| In situ/Malignant Tumors | Total number of in situ/malignant tumors for patient | Multiple Primary Fields |  |
| Positive microscopic confirmation | Diagnostic Confirmation | Site and Morphology |  |
| Positive lab test/marker | Diagnostic Confirmation | Site and Morphology |  |
| Radiology | Diagnostic Confirmation | Site and Morphology |  |
| Coded Cause | Maybe: COD to site recode, SEER Cause-Specific Death Classification, SEER Other Cause of Death Classification | Cause of Death (COD) and Follow-up | https://seer.cancer.gov/codrecode/1969_d04162012 |
| Censoring | ? |  | Cause of death not cancer or cardiovascular? |
| Survival Months | Survival months | Cause of Death (COD) and Follow-up | https://seer.cancer.gov/survivaltime/ |
| Cens1 | ? |  | One-hot encoded cause of death - breast cancer / CVD / other? |
| Cens2 | ? |  |  |
| Cens3 | ? |  |  |
| _Include breast cancer only_ | Site recode ICD-O-3/WHO 2008 | Site and Morphology | Breast recode value: 26000 (ICD-0-3 Site: C500-C509) https://seer.cancer.gov/siterecode/icdo3_dwhoheme/ |
| _(not present)_ | Year of Diagnosis | Race, Sex, Year Dx, Registry, County |  |