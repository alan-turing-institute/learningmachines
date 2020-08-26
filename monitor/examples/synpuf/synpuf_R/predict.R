library(odbc)
library(text2vec)
library(tokenizers)
library(stopwords)
library(glmnet)
library(Metrics)
library(rjson)

# Parse command line arguments for database
args <- commandArgs(trailingOnly=TRUE)
db <- args[1]
print(paste("DB: ", db))

# Connect to the database and get the data
config <- fromJSON(file = "db_config.json")

con <- dbConnect(odbc(),
                 Driver = config$driver,
                 Server = config$server,
                 Database = db,
                 UID = config$user,
                 PWD = config$password,
                 Port = config$port)

test <- dbGetQuery(con,
                   "SELECT con.concept_name AS condition, gen.concept_name AS gender
                      FROM condition_occurrence occ
                      LEFT JOIN WEEK_00.dbo.concept con ON occ.condition_concept_id=con.concept_id
                      LEFT JOIN person per ON occ.person_id=per.person_id
                      LEFT JOIN WEEK_00.dbo.concept gen ON per.gender_concept_id=gen.concept_id;"
)


# Load the pre-processing functions and model
model <- readRDS("./model.rds")
vectorizer <- readRDS("./vectorizer.rds")
prep_fun <- readRDS("./prep_fun.rds")
tok_fun <- readRDS("./tok_fun.rds")

# create word counts matrix
it_test <- tok_fun(prep_fun(test$condition))
it_test <- itoken(it_test, progressbar = FALSE)
dtm_test <- create_dtm(it_test, vectorizer)

# get predictions
y <- test$gender %in% "MALE"
preds <- predict(model, dtm_test, type = 'response')[,1]

# calculate metrics
metric_auc <- mean(auc(y, preds))
metric_ll <- mean(ll(y, preds))

df <- data.frame(
  metric = c("AUC", "LogLoss"),
  value = c(round(metric_auc, 4), round(metric_ll, 4))
)
print(df)

# Save metrics to file
write.csv(df, "metrics.csv", row.names=FALSE)
