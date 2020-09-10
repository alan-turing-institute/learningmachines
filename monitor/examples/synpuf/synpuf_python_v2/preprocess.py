import nltk
from nltk.stem.snowball import SnowballStemmer
from nltk.corpus import stopwords

nltk.download("stopwords")


def preprocess(X):
    """Preprocess condition strings:
    - convert to lower case
    - remove punctuation, whitespace and numbers
    - remove stop words
    - stem

    Parameters
    ----------
    X : [type]
        [description]
    """

    # convert to lower case and remove digits and punctuation
    X = X.str.lower()
    X = X.str.replace(r"[^a-zA-Z]+", " ", regex=True)
    X = X.str.strip()
    X = X.str.split(" ")

    # lemmatise
    stemmer = SnowballStemmer("english")

    # remove stop words
    stop_words = stopwords.words("english")

    X = X.apply(lambda x: [stemmer.stem(word) for word in x if word not in stop_words])
    X = X.apply(lambda x: [word for word in x if len(word) > 1])
    X = X.apply(lambda x: " ".join(x))

    return X
