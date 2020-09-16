# Dataset Requirements

To gather a list of requirements and options for a Learning Machines dataset, both for the toy model and later fully-featured versions.

- Related to healthcare

- Publicly accessible

- Can come up with an interesting (and understandable for a wider audience) question to answer. Relatable to a real world use-case.

- Reasonable modelling task - i.e. isn’t completely trivial (just one feature and a small number of data points) but also isn’t too complex (e.g. huge number of features, image data, free text, a lot of preprocessing needed etc.)

- Exhibits drifts in time

- Publicly available previous work - code and model


## Data Drifts

This one is the hardest to satisfy.

- Patient-level datasets often have dates obscured or removed to preserve anonymity. This may change the original ordering and hide drifts (old data mixed with new data).

- Other healthcare datasets often contain only a few summary stats (e.g. number of cases), which might not be enough to create an interesting ML model that fits the learning machines concept.

Options:
- Find a longitudinal study/dataset with patient-level data preserved (less likely to be publicly available)
- Find a healthcare-related but less sensitive subject (i.e. not patient-level hospital data) with times and sufficient complexity.
- Artificially create drifts, by ordering the data in some way (e.g. start with older patients and then feed in younger patients over time)
