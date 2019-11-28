
# Goal

A demonstration of a machine/model that:
* predicts outcomes / recommends actions(?)
* is deployed "live" and iteratively improved over time with new data
* meets the interpretability, safety and ethical requirements of sensitive
domain areas.
* is a usable tool rather than a research paper(?)

# Example problems/datasets

* UK Cancer registry
  - (Symbolic metamodelling paper) Predict 5 year mortality risk of breast
cancer patients using age, number of nodes, tumour size,
tumour grade, Estrogen-receptor status.

* Meta-analysis Global Group in Chronic heart failure database (MAGGIC)
  - (AutoPrognosis paper)

* UK Biobank
  - (AutoPrognosis paper)

* United Network for Organ Sharing (UNOS) database
  - (AutoPrognosis paper)
  - UNOS-I: pre-transplant, UNOS-II post-transplant

* Surveillance, Epidemiology, and End Results (SEER) cancer registries
  - (AutoPrognosis paper) Comorbidities - predict cardiac deaths in patients
  diagnosed with breast (SEER-I), colorectal (SEER-II), Leukemia (SEER-III),
  respiratory (SEER-IV), digestive (SEER-V), urinary (SEER-VI) cancers.

# Interpretability

* A model comprised of human-understandable functions/choices rather than a
black box.

* Why was a decision made?
  - Which features support that decision, according to the model?
  - Which features oppose that decision, according to the model?

* Why has a decision *changed*?
  - Between different versions of a model.
  - Between repeated visits of a patient.

* If considering different possible models: Why has a certain model been
selected?
  - Accuracy vs interpretability trade off
  - False positives vs. false negatives etc.

# Safety

* Uncertainty
  - What's the probability that a treatment plan is optimal/will be successful
  for a given patient?
  - What's the uncertainty on that probability?

* Reliability
  - Identify when a behaviour has changed and the model's predictions are no
  longer trustworthy.
  - Identify if the model is being used to recommend treatment from a previously
  unseen/rarely seen demographic of patient.

# Longevity

* How to create a machine that can seamlessly deal with changes in the
availability of different data sources over time?

* How to determine when the model should be retrained?

* How to add a recency bias (i.e. should new data be weighted more heavily
  than older data)?

* How to incorporate a patient's medical/treatment history?

# Utility

* What requirements need to be met for a model/machine to be implemented and
actually used in a given domain area?

* How to make sure domain experts trust and understand the (benefits/limitations
  of the) model/machine?

# Ethics

* What types of models/techniques are compatible with sensitive domains - e.g.
A/B testing, exploration for reinforcement learning may not be acceptable
for some use-cases.

# Previous work

### Symbolic meta-modelling:

> Demystifying Black-box Models with Symbolic Metamodels
>
> A. M. Alaa, M. van der Schaar
>
> http://www.vanderschaar-lab.com/papers/NIPS2019_DBM.pdf

* Converts a black-box model into "white-box" functions, e.g. convert a neural
network into simple combinations of polynomials and well-known functions (e.g.
  exponentials, logarithms etc.)

* (I think?) Only for single valued model outputs - e.g. binary classification
or regression.

* A unified framework for calculating feature importances, which also captures
the interactions between features.

* Appropriate for small to moderate number of features.

**Questions:**
* Uncertainty on meta-model vs. original uncertainty on black-box model?
* Example "white-box" functions in paper are for up to 2 dimensional problems
only - how interpretable are the final equations when using e.g. 10 features?
* Is a model being composed of white-box functions enough to make it clinically
justifiable?

### AutoPrognosis:

> AutoPrognosis: Automated Clinical Prognostic Modeling via Bayesian Optimization
with Structured Kernel Learning
>
> Ahmed M. Alaa, Mihaela van der Schaar
>
> https://arxiv.org/abs/1802.07207

* Selects best full modelling pipeline from a selection of different algorithms
  for:
  - Missing data imputation (e.g. MICE)
  - Feature processing (e.g. PCA)
  - Prediction algorithm (e.g. Random Forest)
  - Calibration (e.g. Sigmoid)

* Three modes:
  - Classification: **binary** clinical outcomes
  - Temporal: longitudinal and time series data by applying classification
  algorithms on sliding window.
  - Survival: time-to-event data. Classifiers and survival models (e.g. Cox
    proportional hazard, survival forests).

* An interpreter module to explain decisions using logical association rules(?)
