# Application for Ethics Approval

Source: _https://turingcomplete.topdesk.net/tas/public/ssp/content/serviceflow?unid=2e579708ee364171b58eb4c86e5ed140_

## 1. Project Goal and Purpose

> Please introduce your project. Tell us, among other things:
> - the purpose and goal of your project
> - the intended benefits of your project
> -	how this research project aligns with the Turing's goals, challenges, and/or objectives

Machine learning techniques are effective for building predictive models because they are good at identifying patterns in large datasets. However, the development of a model for complex real life problems often stops at the point of publication or proof of concept.

The maintenance and monitoring of predictive models post-publication is crucial to guarantee their safe and effective long term use. A model developed using retrospective data in the medical domain risks becoming obsolete as medical treatments advance.

> Clinical data is highly dependent on the landscape of clinical practice as well as underlying population demographics and comorbidities, all of which vary over time. The complete utility of a healthcare model can be nearly impossible to ascertain unless one accounts for the inevitable effect of temporal dataset drift
> <div style="text-align: right"> <i>[https://arxiv.org/pdf/1908.00690.pdf] </i></div>

In the case of cystic fibrosis, new treatments mean that patients can survive longer without the need for a lung transplant; this means that an algorithm that predicts when a patient requires a transplant will gradually be making predictions about older patients with different comorbidities. Breast cancer risk assessment models which were trained on data collected from patients ten years ago may be prioritising features such as smoking; however smoking has been a downward trend amongst women in recent years. Another example is when new treatments are introduced or new data types such as genomic profiles and imaging need to be incorporated into prediction models.

### The purpose and goal of this project

The purpose of Learning Machines (LM) is to enable continuous appraisal of the performance of an algorithm as new data is collected over time. The project will determine, design and build the software infrastructure necessary to support the continuous appraisal of an algorithm's performance, for the long term. In this document, we will refer to this infrastructure as the intelligence infrastructure (II).

There are many ways to build II. This project will prioritise approaches and components to enable good research engineering practices with minimal overheads to researchers themselves. Examples of modules to be investigated or developed in the Learning Machines Intelligence Infrastructure (LM II) are:

1. Pre-specification of statistical measures of the dataset used to train a model, leading to automated report generation of those measures when new data is available (eg. when the algorithm is used). 

    ** Note ** We have built python scripts that performed analysis of dummy data and produced pdf/html visualisations and reports.

2. Version control of datasets and models
   
    ** Note ** We have investigated with version control features offered by PostgreSQL and MS SQL Server. We have also designed data structures neccessary to support model versioning.

3. Software packages for enabling reproducibility checks 
    
    ** Note ** When supporting DECOVID, we helped develop a package called 'repro-catalogue' that confirmed reproducibility of analysis using hashes of data and code.

5. Specification of algorithm performance measures, including acceptability thresholds 

6. Automated testing leading to the generation of algorithm performance reports 
   
    ** Note ** We have developed python scripts that builds a conda environment, downloads specified versions of both model and data, runs a test epoch, stores performance measures and produces pdf/html visualisations and reports.

### How this research project aligns with the Turing's goals, challenges, and/or objectives

Learning Machines aligns with the Turing's goals relating to developing best practices for research and software engineering. The intelligence infrastructure proposed will support the long-term maintenance of models built using machine learning techniques. 

Learning Machines will also raise awareness of the need to maintain and monitor machine learning technologies beyond initial proofs-of-concept, especially in domains where they may be used to support decision making with clear consequences for human lives, such as healthcare and criminal justice.

## 2. Data and Research Methods Description

Please provide a description / overview of the data that you will use for your project, if any, as well as the research methods you will use.

> Please cover:
>-	the type of data
>- the amount of data in the sample, e.g. number of people, items, variables, months, years covered in the data
>- the sources of the data, e.g. the datasets that will be used, who they were created by, where they are accessible from
>- if known, where and how the data to be used was collected
>- a brief description of the research to be carried out and the methods that will be used

### The sources of the data, e.g. the datasets that will be used, who they were created by, where they are accessible from

We propose to obtain datasets from the Surveillance, Epidemiology, and End Results (SEER) Program. The SEER program provides information on cancer statistics in an effort to reduce the cancer burden among the U.S. population. SEER is supported by the Surveillance Research Program (SRP) in NCI's Division of Cancer Control and Population Sciences (DCCPS).

We have identified SEER as the source for data as one of its goals are as below:

>Describe temporal changes in cancer incidence, mortality, extent of disease at diagnosis (stage), therapy, and patient survival as they may relate to the impact of cancer prevention and control interventions.
> <div style="text-align: right"> <i>https://seer.cancer.gov/about/goals.html </i></div>

There are two SEER products:
- SEER Research, which excludes geography (county, state/registry), month in dates (e.g. month at diagnosis), and a few other demographic fields. and
- SEER Research Plus, which include geography, months in dates, and other demographic fields, as well as information on radiation therapy and chemotherapy given as part of the first-course treatment.

Learning Machines will apply to access SEER Research, which is the less sensitive dataset without precise locations or dates to minimise the risk of patients being re-identified. Each member of the Learning Machines team will sign a SEER Research Data Use Agreement (DUA) before being given access to the data, in accordance with the SEER policy. A copy of the DUA is found [here](https://seer.cancer.gov/data/dua/SEER-DUA-ResearchData.pdf) and also included as supplementary information with this application.

### The type of data

We propose to obtain anonymised cancer incidence data; these data were collected by multiple population-based cancer registries and amalgamated by the SEER program. 

Data types include patient demographics, primary tumor site, tumor morphology, stage at diagnosis, and first course of treatment, follow ups with patients for vital status. 

### The amount of data

The dataset we are considering contains 5,347,692 incidences of tumours, recorded by up to 9 cancer registries in the United States, from years 1975-2017.

There are approximately 141 patient features in the the SEER Research database; examples of these which are relevant to Learning Machines are summarised in the table below.

|  Name | Data Type (Category vs Numerical vs Date)  | Description  |
|---|---|---|
| Age  | Category | 19 age groups (< 1 year, 1-4 years, 5-9 years, ..., 85+ years). |
| Year of diagnosis | Date (Year) | Values from 1973-2014 but may be a subset. |
| Primary Site | Category | Tumour primary site codes as per the Topography section of the International Classification of Diseases for Oncology (ICD-O) 3rd edition. |
| Grade | Category | Tumour grade based on the grade codes in ICD-O-3. |
| Total number of in situ/malignant tumours for patient | Numerical | Count of a patient’s total reported in situ/malignant cancers. |
| Survival months | Numerical | Months between patient diagnosis and time of death (or date of last contact if patient is still alive).  |

The full list of patient features are listed as a data dictionary [here](https://seer.cancer.gov/data-software/documentation/seerstat/nov2019/seerstat-variable-dictionary-nov2019.pdf
).

### A brief description of the research to be carried out and the methods that will be used

The first step for LM is to automate the generation of quality control checks and descriptive statistics both for the dataset itself and on metrics relating to the performance of a predictive model. We will be using both single-value measures (eg. mean value of dataset features, model accuracy) and also more sophisticated methods such as autoencoders to quantify how different features and the relationships between them changes over time. These measures will be used to determine when retraining the model is necessary.

The algorithm or analysis performed will initially be simplified 'toy models', or models that have been published previously for the SEER dataset with open source code. We will be looking at deploying well-established machine learning methods (e.g. random forest) to predict disease outcomes. The year of diagnosis in the SEER data will allow us to look at long-term trends and changes. We also plan to investigate approaches for generating synthetic data with drifts over time.

It is important to note that the choice of algorithm or analysis itself is not the focal point of the project, instead the focus is on building infrastructure required to detect features of datasets changing over time as new data is accumulated, and how this affects algorithm performance.

## 3. Consent

>Please comment on any issues around securing consent raised by your research. 
>
>Where you identify risks, you should inform us how your research plans to minimise or eliminate them.
>
>Questions to consider:
> - If your study involves collecting data about, with, or from human participants, will they receive all relevant information about what their participation will involve, prior to providing consent?
> - If your study involves using existing data about people, was their consent given for the original data collection? Did they consent to this data being reused?

### If your study involves collecting data about, with, or from human participants, will they receive all relevant information about what their participation will involve, prior to providing consent?

We do not collect data from participants. We are using an existing dataset which has been made available for research purposes.

### If your study involves using existing data about people, was their consent given for the original data collection? Did they consent to this data being reused?

The data was collected by multiple cancer registries. (NOTE: I am not sure how to check if patients from 1975 gave their consent to their data being reused this way?)

## 4. Privacy and Security

> Please comment on any issues of privacy and security raised by your research. 
>
> Where you identify risks, you should inform us how your research plans to minimise or eliminate them.
>
> Questions to consider:
> - If you use data about people in your study, is this data anonymous, or anonymised? Could it be associated with identifiable individuals, including by triangulating with other publicly available datasets?
> - How do you plan to keep sensitive data safe and secure? What will you do with sensitive data after the study is completed?

### If you use data about people in your study, is this data anonymous, or anonymised

We use data about tumours in people. This data is anonymised by each cancer registry before being shared with the SEER program. SEER amalgamates data from multiple registries and there has been, and continues to be ongoing efforts to ensure patients cannot be identified either through the contents of the dataset or by linking to other datasets. 

The particular SEER product that Learning Machines proposes to use exludes geographical values. Ages are binned into 5-year sized bins (there are no bins with values so small as to enable re-identification of patients). The months in which the diagnosis were made have been removed. There are no years where the number of patients diagnoses is small enough that the patients can be reidentified.

Learning Machines will not be linking SEER Research data with any other datasets.

### How do you plan to keep sensitive data safe and secure?

As per the accessibility protocol for SEER Research, the SEER Stat program will be used to perform the cohort selection necessary for the project and to download SEER data. Access to any data extracted or derived from SEER will be strictly limited to the named Learning Machines individuals with data use agreements.

Data will be stored on password protected local machines, there are no plans to store them on cloud-based servers. Data will be deleted off local machines when the Learning Machines project is complete.

### 5. Other Harms

>Please comment on the potential for individual, societal or ecological harms to arise from your research, beyond what is described above. 
>
>Where you identify risks, you should inform us how your research plans to minimise or eliminate them.
>
> Questions to consider:
> - Could any harms arise to the people involved in conducting this research (e.g. viewing violent content could harm researchers)?
> - Could conducting or promoting this research create unintended negative outcomes, such as environmental damage, new power imbalances, or the misuse of technology?
> - How do you plan to ascertain and acknowledge the limitations of your research, if any (e.g. does the data sample you use allow for generisability of your research findings)?
> - What benefits could your research contribute that would balance or outweigh any potentially negative impacts that could arise?

Retraining a single model can be expensive, both computationally and in terms of the time invested by the developers (clinicians, data scientists and software enginieers). Retraining a model which comprises of an ensemble of dependent models is both expensive and complex. This is especially true if models provide absolute class decisions instead of probabilistic values, because absolute class decisions are based on carefully selected thresholds. Thresholds are selected to maximise metrics such as sensitivity or specificity, according to purposes of applications. Reselection of multiple thresholds to rebalance system performance is both complex and brittle.

For all these reasons, decisions to retrain models are difficult decisions. In addition, the resulting changes in model behaviour can be a source of uncertainty for users making high impact or high risk decisions. This can result in user distrust and resistance if the reasons for making changes are not available or communicated clearly.

### Could any harms arise to the people involved in conducting this research (e.g. viewing violent content could harm researchers?

No

### Could conducting or promoting this research create unintended negative outcomes, such as environmental damage, new power imbalances, or the misuse of technology?

One successful outcome that the Learning Machines project hopes to have is the ability to clearly flag if a trained model is no longer optimal (or generalizable) to current data. However, this flag forces technology users to address the issue: _who is responsible for technology sustainability (eg. the model is no longer accurate, reliable or robust)_?

A negative outcome may be distrust in academic-produced machine learning technologies. Unlike industry-based machine learning technologies, there is no long term support. If researchers are no longer actively supporting the development of the algorithm, users will be left with an obsolete technology when the model is is flagged as outdated. There are no methods to predict when this obsolescense will occur. There is the possibility that the algorithm in its current form cannot be retrained to pre-specified good-enough performance given the new data landscape.

### What benefits could your research contribute that would balance or outweigh any potentially negative impacts that could arise?

Learning Machines prioritises transparency and intepretability. Within the intelligence infrastructure, there is a module to intepret prediction results and communicate uncertainty values, in order to generate user trust (eg. the ability to view the rankings of weights of features). 

Learning Machines will be applying this same approach to provide intepretations why model is no longer optimal. This helps both users see the reasons for the new limitations of the technology.




