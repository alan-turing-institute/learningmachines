"""
Classes defining the ModMon database schema in the SQLAlchemy ORM
"""
# coding: utf-8
from sqlalchemy import (
    Boolean,
    Column,
    DateTime,
    Float,
    ForeignKey,
    ForeignKeyConstraint,
    Integer,
    String,
)
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()
metadata = Base.metadata


class Dataset(Base):
    """Unique combination of a start date, end date and database.
    """

    __tablename__ = "datasets"

    datasetid = Column(Integer, primary_key=True)
    databasename = Column(String(20))
    description = Column(String(500))
    start_date = Column(DateTime)
    end_date = Column(DateTime)


class Metric(Base):
    """Unique name and a description for each metric to be tracked. Names will come from
    the saved metrics.csv files after model runs.
    """

    __tablename__ = "metrics"

    metric = Column(String(50), primary_key=True)
    description = Column(String(500))


class Researchquestion(Base):
    """Question the model is trying to answer.
    """

    __tablename__ = "researchquestions"

    questionid = Column(Integer, primary_key=True)
    description = Column(String(500), nullable=False)


class Team(Base):
    """Details of the team submitting the model.
    """

    __tablename__ = "teams"

    teamname = Column(String(50), primary_key=True)
    contactname = Column(String(100), nullable=False)
    contactemail = Column(String(100), nullable=False)
    description = Column(String(500))


class Model(Base):
    """Model table stores groups of unique question, team and model name combinations.
    Each model may have multiple Model Versionos (see Modelversioni table)
    """

    __tablename__ = "models"

    modelid = Column(Integer, primary_key=True)
    teamname = Column(ForeignKey("teams.teamname"), nullable=False)
    questionid = Column(ForeignKey("researchquestions.questionid"), nullable=False)
    name = Column(String(20), nullable=False)
    description = Column(String(500))

    researchquestion = relationship("Researchquestion")
    team = relationship("Team")


class Modelversion(Base):
    """Version of a specified model. Each model version specifies the path to (location)
    its files and the command needed to run it. The command must conotain placeholder
    arguments <start_date>, <end_date> and <database> which are replaced with
    appropriate values at run time.
    """

    __tablename__ = "modelversions"

    modelid = Column(ForeignKey("models.modelid"), primary_key=True, nullable=False)
    modelversion = Column(String(10), primary_key=True, nullable=False)
    trainingdatasetid = Column(ForeignKey("datasets.datasetid"), nullable=False)
    referencetestdatasetid = Column(ForeignKey("datasets.datasetid"), nullable=False)
    location = Column(String(500))
    command = Column(String(500))
    modeltraintime = Column(DateTime)
    active = Column(Boolean)

    model = relationship("Model")
    dataset = relationship(
        "Dataset",
        primaryjoin="Modelversion.referencetestdatasetid == Dataset.datasetid",
    )
    dataset1 = relationship(
        "Dataset", primaryjoin="Modelversion.trainingdatasetid == Dataset.datasetid"
    )


class Result(Base):
    """Each row in the Result table is a value for a single metric from a run of a model
    version on a certain dataset.
    """

    __tablename__ = "results"
    __table_args__ = (
        ForeignKeyConstraint(
            ["modelid", "modelversion"],
            ["modelversions.modelid", "modelversions.modelversion"],
        ),
    )

    modelid = Column(Integer, primary_key=True, nullable=False)
    modelversion = Column(String(10), primary_key=True, nullable=False)
    testdatasetid = Column(
        ForeignKey("datasets.datasetid"), primary_key=True, nullable=False
    )
    isreferenceresult = Column(Boolean, nullable=False)
    runtime = Column(DateTime, nullable=False)
    runid = Column(Integer, primary_key=True, nullable=False)
    metric = Column(ForeignKey("metrics.metric"), primary_key=True, nullable=False)
    value = Column(Float(53), nullable=False)
    valueerror = Column(Float(53))
    resultmessage = Column(String(500))

    metric1 = relationship("Metric")
    modelversion1 = relationship("Modelversion")
    dataset = relationship("Dataset")
