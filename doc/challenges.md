Learning Machines 
===

This project is funded by the Turing Health programme, and the Turing Criminal Justice programme. Data and use cases from both domains will be specifically addressed during this project. 

Machine learning techniques are effective for building predictive models because they are good at identifying patterns in large datasets. However, the development of a model for complex real life problems often stops at the point of publication or proof of concept. At the Turing we are interested in developing best practices for maintaining prediction models built using machine learning techniques. In particular, this project addresses the issue of keeping models updated, in order to reflect current environment.

In the medical and criminal justice domain, data collecting and labelling under real world circumstances specifically for the application of machine learning is rare. The ability to store data to generate newly labelled data enables models to be updated when data changes to reflect trends over time. One core component of this project is to develop a generalised infrastructure for versioning new labelled data, so that they can be used to train and retrain models, developing the models as well as keeping them updated with changes over time.

The research question posed by the Learning Machine project is: 

***What are the common ways in which newly labelled data can change over time? How do we automate detection of changes, so that models can be retrained, and therefore kept updated to reflect current environment? ***

## Introduction

Maintenance of predictive models is crucial for long term use. A model developed using retrospective data in the medical domain risks becoming obsolete as medical treatments advance. In the case of cystic fibrosis, new treatments mean that patients can survive longer without the need for a lung transplant; this means that an algorithm that predicts when a patient requires a transplant will be gradually dealing with older patients. Another example is when new treatments are introduced or new data such as genomic profiles become more accessible.

Retraining a model is expensive, and can be a source of stress for users of systems for high impact decisions.

## Types of drift

As I can see there are various ways in which data can change. We should add them here:

### 1. What is data drift - Jannetta to summarise
Taken from Mahed's notes: this is expected to happen in healthcare. One clear reason is that because of that better care that patients receive the distribution of their age is changing. However, this may or may not affect the model we are using. For example, if we are using a Bayesian model, this will supposedly affect the model, while it wont if we are using a decision tree. %This can have consequences like worse confidence bounds (higher uncertainty)

#### 1.1 What data drift is not
#### 1.2 Relevant resources

### 2. What is concept drift - Mahed to summarise

Taken from Mahed's notes: this is usually defined as the changes in the function that maps inputs to the outputs which the machine learning attempts to learn. It is possible in medical domain mostly because of changes that are possible in the practice of medicine. For instance, the reward we associate with a treatment may change because we may find out about a side effect, etc.

#### 2.1 What concept drift is not
#### 2.2 Relevant resources

### 3. What is covariate drift drift - Jack to summarise
#### 3.1 What covariate drift is not
#### 3.2 Relevant resources

### 4. Increase in erroneous data
human  error  is  possible  in  recording  and  entering  medical  data.   We  maywant to account for this in the project.  This can be considered under the uncertainty topic.
#### 4.1 What erroneous data is not
#### 4.2 Relevant resources

## Methods for detecting drift

1) Prequential analysis - James Smith
2) Changepoint detection - Gerritt
3) Estimating predictive performance / cross-validation error / goodness-of-fit etc. One measure of when it is necessary to re-train the might be when the model performance drifts substantially. - Peter Foster
4) Uncertainty values in order to trust to a ML model prediction we need to know how certain the model is about the result. We are in particular interested to know how uncertainty changes with time as we get new samples. Also, preferably we need an individualized uncertainty report, i.e., the average accuracy of the method is not enough to justify prescriptions for individuals in sensitive applications like healthcare and criminal justice - Mahed 

## Tools for monitoring model performance/behaviour change

May: One concept which is of interest in this project is intepretibility (Mahed and Mihaela's work). It would be of research interest to be able to explain what has changed. Can we build intepretibility in a predictive model or in a drift-detection model to explain why things have changed? This is important because 1) retraining is expensive, 2) seen as risky and 3) can generate new knowledge about the trends within the domain in which predictive model operates.

Taken from Mahed's notes: the  black  box  model  that  produce  predictions/recommendations  is  not  veryuseful for healthcare applications, since the medical staff should know why such a decision wasrecommended.  Explainability  also  can  be  used  in  potentially  observing  new  relations  amongvariables that leads to scientific discovery.  In learning machine project, it is also important to explain the possible changes in the model with time e.g.  why a recommendations has changedfor a patient when we updated the model with new data.

## Example datasets

Taken from Mahed's notes: 

### Heart disease
***Description of dataset***
Resources 
1. https://archive.ics.uci.edu/ml/datasets/Heart+Disease

### Breast cancer 1
***Description of dataset***
Resources
1. https://archive.ics.uci.edu/ml/datasets/Breast+Cancer+Wisconsin+%28Prognostic%29 

### Breast cancer 2
***Description of dataset***
Resources
1. https://ieeexplore.ieee.org/abstract/document/7482682/

### Diabetes 1
***Simulator for diabetes data***
Resources
1. https://github.com/jxx123/simglucose

### Diabetes 2
***Description of dataset***
Resources
1. http://smarthealth.cs.ohio.edu/bglp/OhioT1DM-dataset-paper.pdf


## Changes in datasets over time

Here we have have a summary of the types of changes we found in the datasets

| Dataset/Changes | Data drift | Concept drift | Covariate drift | Erroneous data |
|-----------------|------------|---------------|-----------------|----------------|
| Heart disease   | x          |               |                 |                |
| Breast cancer 1 |            | x             |                 |                |
| Breast cancer 2 |            |               | x               | x              |
| Diabetes 1      |            |               | x               | x              |
| Diabetes 2      |            |               | x               | x              |

