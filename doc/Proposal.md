
Learning Machines
===

## Table of Contents

[TOC]

## Introduction

This document is a proposal for the Learning Machines project. The project is funded by the Turing Health programme, and the Turing Criminal Justice programme. 

The first part of this document contains our understanding of the project background. The second part defines the research challenges to be addressed by this project. The third part outlines possible approaches and risks to addressing the research challenges.

## Context

Humans make decisions based upon past experiences. These experiences are gained from personal, social and professional interactions.

In a professional setting, a human expert such as a clinician decides on treatment regimens while considering patient socioeconomic profiles, medical histories and current disease and comorbidities states. In another example, a judge decides if a prisoner can be released on parole based on criminal histories, current behaviours and psychological profiles.

In both examples, clinicians and judges build, retain and update their experiences of disease and criminal behaviours. These experiences are referred to as domain knowledge or domain models. Experts update their models from interactions' outcomes; clinicians update their models when they receive updates about treatment outcomes. Judges update their models when they encounter (possibly again) prisoners in court.

Domain knowledge/models contain complex representations of patients (or prisoners), which must include sufficient information such as variables which may confound predicted or desired outcomes.

There are good reasons for formalising domain knowledge/model, which has traditionally been referred to as an expert system. Access to a shared model has the capacity to enable objective decisions because it is trained with a diverse range of interactions. A formal representation of a model when built with particular ML techniques to maximise transparency also allows identification of biases.

Machine learning techniques are good at finding patterns from large datasets. Data collection is expensive. In the real world (such as in the medical or criminal justice domain as in the examples above), data collected and labelled under real world circumstances specifically for the application of machine learning is rare.

Clinicians and judges are generating relevant data every time they interact with the medical or criminal system. When data is stored and labelled over a longer period, they can be used to develop and iteratively update a model. For example, the diversity of patients treated by multiple clinicians over time generates heterogeneous patient profiles which is not experienced by a single clinician.


## The problem

Changes in model behaviours are inevitable as models are updated (or retrained) with new diverse cases. This is true during initial model development, but in this project we are particularly interested in changes in model behaviour as a result of iterative updates over the long term. 

For one example patient demographics may change. In the case of cystic fibrosis, new treatments mean that patients can survive longer without the need for a lung transplant; this means that an algorithm that predicts when a patient requires a transplant will be gradually dealing with older patients. Another example is when new treatments are introduced or new data such as genomic profiles become more accessible.

For another example, the anti-immigrant sentiments has lead to an increase in reported harrassment and convicted cases. An algorithm that predicts the probabilities of reoffending will need to take into account new criminal profiles.

The research question posed by the Learning Machine project is: 

***What issues will arise when models are retrained iteratively over a period of years? How should these issues be addressed to provide users with both new information and a sense of consistency?*** 

Examples of issues that Learning Machines can address are: 

1. Can we update the model using a reward system, in order to miximise for a measurable, prespecified outcome?
2. How do we measure model changes
3. What are the warning signs which flag model change?
4. What guidance will we provide users when they are confronted with new model behaviours?

## Challenges

We propose to address these issues from three perspectives:

### Uncertainty

Uncertainty information is usually provided as part of a decision or classification outcome. It is typically in the form of a probabilistic, or paired upper and lower bound value. During initial development process, uncertainty values are expected to be large. After a number of training epochs, a model which has been trained with sufficient information, and without too much noise is expected to produce decreasing uncertainty values. Uncertainty is not a measure of the trained models' capabilities, although it is often intepreted as such.

This project (note: unsure about this) will address the issue to uncertainty values changing over time.

### Intepretability 

Intepretability is an important topic in machine learning. A system built for the medical or criminal justice domain has to be transparent. Users want to justifications on why difficult decision outcomes are reached, in order to be able to trust the system. The ease of intepretation and the closeness to which model parameters map to real-life features are essential components for tools built to augment an expert's decision making process.

When a machine is updated iteratively over a period of years, it is inevitable that its behaviour will change. This can be due to changes in the data. Changes in data can be due to many things, such as gradual shifting of patient demographic or they can be due to new data collection practices. When this occurs, capabilities such as transparency and explainability becomes foremost in deciding if a machine is valid in producing different results over time. 

This project will address a specific aspect of intepretability, that is, the challenge of intepreting model behaviour change. 

### Heterogeneous and/or high dimensional longitudinal data 

The study of heterogeneous, high dimensional data for training machine learning algorithms is well established. As mentioned above, data must contain sufficient information and this includes variables that may confound outcomes. Typically, a fix set of datatypes is used to train a model, but in real life, more diverse data types are being collected than before, with the purpose of addressing any information from possibly confounding variables. For example, in the medical domain there may be more lab results, imaging reports, 'omic'-type profiles and quality of life questionnaires.

This project will address the challenge of introducing new data types into an existing system. There is a further challenge here because while a completely new model may be developed to incorporate new data types, the impression communicated to users should be one that the system is being extended, rather than completely rehauled. 











## Datasets

## Risks

## Work breakdown

## Timeline

## Appendix and FAQ

###### tags: `Learning Machines` `Documentation`
