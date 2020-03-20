Toy Dataset on Multiple Sclerosis. 
===
Inspired by the recent publication of by [J. R. Walsh et al. (2020)](https://arxiv.org/abs/2002.02779) 

## Idea
### Basic worklfow
given their health record at day 0, a ML/DL algorithm will be trained in a supervised manner to predict whether 
a patient will have a relapsing event in 3 months time.
This is a classification task and a number of algorithm has been suggested:
+ Decision Tree
+ Logistic Regression
+ Neural Network

### Data
The input data will be constructed using three aspects of the patient's record, background, clinical and functional. 
The background includes patient's personal information such as gender, age and race etc. 
Patient's clinical record could be their KFSS scores for various systems in the body such as brain stem system and 
mental system and the number of relapses in given period of time. Lastly,the functional aspect of the record 
describes the patient's performance on a number of tests. 

The target data will simply be a True/False response of whether the patient has undergone a relapsing event or not. 

### Model interpretability 
Depending on the final dataset produced and chosen ML algorithm, it is possible to explore the interpretability of the trained
model. ML algorithms like decision trees could be useful as they are easy to understand and visualise. Other types of model
such as Neural Networks might require additional post-processing packages such as [LIME](https://github.com/marcotcr/lime). 

### Tasks
+ Build a database infrastructure to pre-process SDTM format data.
    + Using Flask API, SQLalchemy and docker 
+ Create a Jupyter Notebook to illusrate the data structure and visualise data demography. 
+ Apply data on ML algorithms. 