---
title: 'Project documentation template'
disqus: hackmd
---

Learning Machines
===
![downloads](https://img.shields.io/github/downloads/atom/atom/total.svg)
![build](https://img.shields.io/appveyor/ci/:user/:repo.svg)
![chat](https://img.shields.io/discord/:serverId.svg)

## Table of Contents

[TOC]

## Introduction

This document gives contextual information and proposes challenges and approaches for the Learning Machines project. The first part contains our understanding of the project. The second part outlines a possible approach to addressing the challenge.

## Context

Humans make decisions based upon past experiences. These experiences are gained from personal, social and professional interactions.

In a professional setting, a human expert such as a clinician decides on treatment regimens while considering patient socioeconomic profiles, medical histories and current disease and comorbidities states. In another example, a judge decides if a prisoner can be released on parole based on criminal histories, current behaviours and psychological profiles.

In both examples, clinicians and judges build, retain and update their experiences of disease and criminal behaviours. These experiences are referred to as domain knowledge or domain models. Experts are update their models from interactions' outcomes; clinicians update their models when they receive updates about treatment outcomes. Judges update their models when they encounter (possibly again) prisoners in court.

Domain knowledge/models contain complex representations of patients (or prisoners), which must include sufficient information such as variables which may confound predicted or desired outcomes.

There are good reasons for formalising domain knowledge/model, which has traditionally been referred to as an experty system. Access to a shared model has the capacity to enable objective decisions because it is trained with a diverse range of interactions. A formal representation of a model when built with particular ML techniques to maximise transparency also allows identification of biases.


## The problem

Machine learning techniques are good at finding patterns from large datasets. Data collection is expensive. In the real world (such as in the medical or criminal justice domain as in the examples above), data collected and labelled under real world circumstances specifically for the application of machine learning is rare.

Clinicians and judges are generating relevant data every time they interact with the medical or criminal system. This data should be stored and labelled so that they can be used to develop and update a model; the diversity of patients treated by multiple clinicians generates heterogeneous patient profiles which is not experienced by a single clinician by themselves.

## Challenges

## Risks

## Work breakdown

## Timeline





## Appendix and FAQ

:::info
**Find this document incomplete?** Leave a comment!
:::

###### tags: `Templates` `Documentation`
