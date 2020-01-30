Learning Machines 
===

This project is funded by the Turing Health programme, and the Turing Criminal Justice programme. Data and use cases from both domains will be specifically addressed during this project. 

Machine learning techniques are effective for building predictive models because they are good at identifying patterns in large datasets. However, the development of a model for complex real life problems often stops at the point of publication or proof of concept. At the Turing we are interested in developing best practices for maintaining prediction models built using machine learning techniques. In particular, this project addresses the issue of keeping models updated, in order to reflect current environment.

In the medical and criminal justice domain, data collecting and labelling under real world circumstances specifically for the application of machine learning is rare. The ability to store data to generate newly labelled data enables models to be updated when data changes to reflect trends over time. One core component of this project is to develop a generalised infrastructure for versioning new labelled data, so that they can be used to train and retrain models, developing the models as well as keeping them updated with changes over time.

The research question posed by the Learning Machine project is: 

***What are the common ways in which newly labelled data can change over time? How do we automate detection of changes, so that models can be retrained, and therefore kept updated to reflect current environment? ***

## Introduction

Maintenance of predictive models is crucial for long term use. A model developed using retrospective data in the medical domain risks becoming obsolete as medical treatments advance. In the case of cystic fibrosis, new treatments mean that patients can survive longer without the need for a lung transplant; this means that an algorithm that predicts when a patient requires a transplant will be gradually dealing with older patients. Another example is when new treatments are introduced or new data such as genomic profiles become more accessible.

## Types of drift

As I can see there are three ways in which data can change. These are ...

### 1. What is data drift
#### 1.1 What data drift is not
#### 1.2 Relevant resources

### 2. What is concept drift
#### 2.1 What data drift is not
#### 2.2 Relevant resources

### 3. What is covariate drift drift
#### 3.1 What covariate drift is not
#### 3.2 Relevant resources

## Tools for detecting drift

1) Prequential analysis - James Smith
2) Changepoint detection - Gerritt
3) Estimating predictive performance / cross-validation error / goodness-of-fit etc. One measure of when it is necessary to re-train the might be when the model performance drifts substantially. - Peter Foster

## Example datasets
### Dataset 1
***Description of dataset***
