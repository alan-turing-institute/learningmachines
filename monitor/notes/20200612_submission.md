### Analysts to provide:

**Environment:**
* conda for python
* renv for R

**Metrics script:**
* Inputs: Start date, end date, database to connect to.
* Outputs: Metrics in CSV format: name, value, (error on value).

**Metadata:**
* team_name, team_description, contact_name, contact_email, research_question, model_name, model_description, model_version.

**Reference Metrics Values:**
* In same CSV format (name, value, error).
* Values to use as reference performance for model, i.e. will be used to define performance threshold at which analysts asked to intervene.
* Calculated in whichever way, with whichever data subset, the team prefers.

**Reproducibility Metrics Values:**
* In same CSV format (name, value, error).
* Output of metrics script for a known, simple date range (start date -> end date).
* Before adding a model to the monitoring system: Check we can run the metrics script with the same inputs and get the same result

