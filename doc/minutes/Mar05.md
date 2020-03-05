Learning Machine Minutes
===
Thursday, 5 March 2020

## Goal of 2 years project
+ Proof of concept project (develop libraries etc)
+ It should be a demonstration project rather than a purely research project.
+ Optional Route: Half and Half 
    + Half of us look at the data, develop algorithms.
    + Half of us look into the infrastructure and monitoring system. 
    

## Alan’s vision of end product (after 24 months):
+ involves more resources than currently
+ With a focus on health and CJS
+ Effective demonstration model and good proof-of-concept (aim to get NHS involve)
+ With real data , clinician interested, NHS interested 
+ Maybe start with a focus on SF. 

## Midway Goal:
+ Toy model running on toy dataset (CPATH data, simpler dataset), working monitoring , interpreter system.
+ Data: Discover datasets that have changes over time, (Proof that LM is necessary)
+ Start working on Interpretability , monitoring .. etc.

## Infrastructure:
+ Ideal if anyone can come in and use
+ an infrastructure that allows different task (Prognosis task, treatment task)
+ It is equally important to work on infrastructure so that stakeholders will see and we are doing (to show progress)
+ Built from available pipeline if possible
    + There could be fundings for commercial purpose, but should proceed with caution.
    + Commercial sources : Azure 
    + Open sources: mlflow 
    + A criteria for good platform will be looking at the flowchart and the software, see if they fit. 
    
## Toy Data Requirements:
+ Currently we have C-PATH data on MS (Placebo Arm). 
+ As simple, as it can, but still realistic. 
+ predicting future trajectory. (ground truth available)
    + Prognosis
+ A data drift can be imposed by training a model on younger patients and apply it on older patients

## Fundings
2 years funding will be guaranteed

## Next week:
+ Discuss Toy model frontend . 
+ Look at MS data, and what they look like 
