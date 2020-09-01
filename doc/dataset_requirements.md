# Dataset Requirements

To gather a list of requirements and options for a Learning Machines dataset, both for the toy model and later fully-featured versions.

- Related to healthcare
- Publicly accessible
- Can come up with an interesting (and understandable for anyone) question to answer.
- Reasonable modelling task - i.e. isn’t completely trivial (just one feature and a small number of data points) but also isn’t too complex (e.g. huge number of features, image data, free text, a lot of preprocessing needed etc.)
- Exhibits drift in time
  - This  one is the hardest to satisfy. Of course, we can always artificially create a drift. E.g. consider a cancer dataset, we can train the model with older patients and then feed in the rest of patients in the test time. Let me know what you think.
- Ideally has a model that we wouldn't have to build ourselves, with open source code available.
