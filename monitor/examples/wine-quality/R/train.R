library(tidyverse)
library(caret)
library(glmnet)

# read in data
wine <- read.csv(file = "winequality-white.csv", sep = ";")
wine <- as_tibble(wine)

# only use first 2500 rows for training
wine <- head(wine, 2500)

# Split the data into training and test set
set.seed(123)
training.samples <- wine$quality %>%
  createDataPartition(p = 0.8, list = FALSE)
train.data  <- wine[training.samples, ]
test.data <- wine[-training.samples, ]

# Predictor variables
x <- model.matrix(quality~., train.data)[,-1]
# Outcome variable
y <- train.data$quality

# Find the best lambda using cross-validation
set.seed(123) 
cv <- cv.glmnet(x, y, alpha = 0)
# Display the best lambda value
print(cv$lambda.min)

# Fit the final model on the training data
model <- glmnet(x, y, alpha = 0, lambda = cv$lambda.min)
# Display regression coefficients
print(coef(model))

# Make predictions on the test data
x.test <- model.matrix(quality ~., test.data)[,-1]
predictions <- model %>% predict(x.test) %>% as.vector()
# Model performance metrics
print(data.frame(
  RMSE = RMSE(predictions, test.data$quality),
  Rsquare = R2(predictions, test.data$quality)
))

# save trained model to file
saveRDS(model, "./model.rds")
