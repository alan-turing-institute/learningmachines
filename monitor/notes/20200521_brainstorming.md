# Model Monitoring Brainstorming
21st May 2020
Jack, Ed

## We're not considering.

- Monitoring data changes - Anna & Gordon working on that.
- Retraining models.
- Deploying models.

## How to transition from analysts code to monitoring?

- How much scope do we have to define how this is going to work? Need to work with the analysts, UHB etc. rather than against them.
- What guidance should we give to analysts before starting with regard to preparing models for validation?
    - Discuss with REG.
    - What should the helpful thing we ask all analysts to include with a model submission be e.g. a doc with some basic info on how to run it, what it does etc (is there a Turing Way guide for this?)
- What format should the model/code be provided in?
    - Do we need the source code for monitoring purposes?
    - Code: Ideally should have a GitLab repo
    - Trained model: standard packaging formats?
        - e.g. [pkl file in Python](https://machinelearningmastery.com/save-load-machine-learning-models-python-scikit-learn/), [rda file in R](https://machinelearningmastery.com/save-load-machine-learning-models-python-scikit-learn/) (can we use models saved in this way with [mlflow](https://www.mlflow.org/)?)
- Will the safe haven SREs ensure a reproducible computing environment between SREs (e.g. analyst and REG validation SRE) or do we need to get the analysts to record things and if so what? (this may overlap with the reproducible catalog tool?)
    - Analysts may need to specify which python/conda they used if that isn't obvious
    - There are multiple versions of packages. Will the version of each need to be specified?
- Need to support / make analyst's life easier.
- How to support many different workflows?
- Interface between analysts work and our monitoring system.
- When/how often do the analysts submit a model and how (for validation)?
    - We need to know overall project timings. Will this happen once at the end or during at intervals?
- Can we avoid having to modify/write new code to make it compatible with the monitoring system?
- Do we perform the validation in each analysts SRE or elsewhere?
    - Discuss with James/Martin etc
    - What if we have access to more data in monitoring area? Will that break compatibility with the model code.

## What are we monitoring?

- Can we run their models on exact same data with reproducible results - reproducibility
  - Ask Eric/Radka/Louise about their work
- **Performance on new data**  - replicability
- Performance on corrections to old data - does model still work? - robustness
- Performance of different models (or different versions of the same model) on the same question.

## What is performance?

- Each team, model and research question will probably have different metrics.
- Is there some standard metric(s) we can also measure across models
- Performance on different demographics/groups in the data? - Bias.
  - Or new hosptials added to the dataset.

- How often will new data be provided / what frequency do we want to update the monitoring at?

## What's our output?

- Who's the audience (or audiences)?
    - May says it is primarily for the analysts benefit
    - (There is another group who will be doing continuous appraisal and deciding how a model gets to the next stage e.g. publication)
- Visualisations.
    - Standardised in some way?
    - REG not expected to produce any figs for publication, so anything we make should be geared towards explaining our findings from model monitoring to the analyst who created the model
- Notify analyst team if model performance drops (or increases) below some threshold.
  - And clinicians/anyone using the model.
  - What if analysts no longer attached to DECOVID?

## Model creation/validation steps

1. Analyst team makes a model.

   - What format should the model be provided in?
   - What metadata do we need.
     - Start date and end date for when model was trained.
     - Code/library versions.

2. Pull model to monitoring area

3. Validate model/code matches expected version and performance is the same on the training data as stated by the validation team.

4. Add model to list of jobs to be run at regular intervals (when there's new data).

5. Job run: predict on new data, calculate and log performance metrics (MLFlow?)

6. Check whether any performance values outside tolerances - notify someone if so.

7. Output as defined above


## Next planning Steps

- Get input from the wider group.
  - Eric, Radka, Louise for reproducibility (repro-catalogue).
  - Reproducibility/model packaging in R - Louise?
- Options for model packaging in python and R
- Investigate MLFlow as an option for both model storage and metric tracking.
   - Will it play nicely with safe haven?
- Sketch out infrastructure options and requirements.
- Define day M1 (monitoring day 1) features and requirements.
- Start working on a dummy example.
