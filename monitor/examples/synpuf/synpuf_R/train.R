# Inspired by this example:
# https://cran.r-project.org/web/packages/text2vec/vignettes/text-vectorization.html
library(odbc)
library(text2vec)
library(tokenizers)
library(purrr)
library(stopwords)
library(glmnet)
library(rjson)

# Connect to the database and get the data
config <- fromJSON(file = "db_config.json")

con <- dbConnect(odbc(),
                 Driver = config$driver,
                 Server = config$server,
                 Database = db,
                 UID = config$user,
                 PWD = config$password,
                 Port = config$port)

# Get the data - condition and gender
data <- dbGetQuery(con,
                   "SELECT con.concept_name AS condition, gen.concept_name AS gender
                      FROM condition_occurrence occ
                      LEFT JOIN WEEK_00.dbo.concept con ON occ.condition_concept_id=con.concept_id
                      LEFT JOIN person per ON occ.person_id=per.person_id
                      LEFT JOIN WEEK_00.dbo.concept gen ON per.gender_concept_id=gen.concept_id;"
                     )

# Convert condition strings in to word count vectors
prep_fun <- tolower
tok_fun <- purrr::partial(tokenize_words,
                         strip_numeric=TRUE,
                         strip_punct=TRUE,
                         lowercase=TRUE,
                         stopwords=stopwords("en"))

it_train <- itoken(data$condition, 
                   preprocessor = prep_fun, 
                   tokenizer = tok_fun, 
                   progressbar = FALSE)

vocab <- create_vocabulary(it_train)


vectorizer <- vocab_vectorizer(vocab)
dtm_train <- create_dtm(it_train, vectorizer)

# TRUE if gender is MALE, FALSE otherwise (including NA)
y <- data$gender %in% "MALE"

# Train a model on the word count vectors to predict gender from condition
glmnet_classifier <- cv.glmnet(x = dtm_train, y = y, 
                              family = 'binomial', 
                              alpha = 1,
                              type.measure = "auc",
                              nfolds = 4,
                              thresh = 1e-3,
                              maxit = 1e3)

print(paste("max AUC =", round(max(glmnet_classifier$cvm), 4)))

# Save functions and artefacts needed for predictions
saveRDS(glmnet_classifier, "./model.rds")
saveRDS(vectorizer, "./vectorizer.rds")
saveRDS(prep_fun, "./prep_fun.rds")
saveRDS(tok_fun, "./tok_fun.rds")