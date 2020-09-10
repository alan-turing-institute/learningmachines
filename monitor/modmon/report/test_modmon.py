import matplotlib.pyplot as plt
import psycopg2
import pandas as pd
import seaborn as sns
import unittest
from unitreport import plotting, tabling


class TestModMon(unittest.TestCase):
    """This report aims to provide readers with a summary of the model appraisal"""

    db_connection = None

    @classmethod
    def setUpClass(cls):
        """Set up database connection and extract plot data before running tests."""
        cls.db_connection = psycopg2.connect(
            host = "localhost",
            port = 5432,
            database = "ModMon",
        )

        query = """
        SELECT m.name, r.metric, r.value, d.databasename, d.datasetid, m.modelid, r.modelversion, q.description
        FROM results AS r, datasets AS d, models AS m, researchQuestions AS q
        WHERE r.testdatasetid = d.datasetid
        AND r.modelid = m.modelid
        AND m.questionid = q.questionid
        AND NOT r.isreferenceresult;
        """
        results = pd.read_sql(
            query,
            cls.db_connection,
        )
        results = results.sort_values(by=['modelid', 'datasetid'])

        results['model'] = results['name'] + '_' + results['modelversion']
        results['titles'] = results['metric'] + ' (' + results['description'] + ')'
        cls.results = results

    @classmethod
    def tearDownClass(cls):
        """Close connection to database after completing and/or failing tests."""
        cls.db_connection.close()

    @tabling
    def test_fig_metadata_table(self):
        """Models in the monitoring database (ModMon)"""
        query = """
        SELECT modelid, count(modelid) AS versions
        FROM modelVersions
        GROUP BY modelid;
        """
        version_count = pd.read_sql(
                    query,
                    self.db_connection,
                )
        query = """
        SELECT m.name AS Model, mv.modelid, mv.modelversion AS active_version, Q.description AS Question, m.teamName AS Team
        FROM modelVersions as mv, models AS m, researchQuestions AS q
        WHERE m.questionID = q.questionID
        AND mv.modelid = m.modelid
        AND mv.active;
        """
        metadata = pd.read_sql(
            query,
            self.db_connection,
        )
        metadata = pd.merge(metadata, version_count, on='modelid')[['model', 'versions', 'active_version', 'question', 'team']]
        return metadata.to_html(index=False)

    @plotting
    def test_fig_1_results_performance(self):
        """Performance of ModMon DB models on across OMOP database versions. Each sub-plot shows the peformance of models on
        a particular research question according to a given metric."""
        g = sns.FacetGrid(data=self.results, row='titles', sharey=False, sharex=False, aspect=3, hue='model')
        g.map(plt.scatter, "databasename", "value").fig.subplots_adjust(hspace=.4)
        g.set(xlabel='Database Version', ylabel='Metric Value')
        g.set_titles(col_template = "{col_name}", row_template = '{row_name}')
        for i, _ in enumerate(g.axes):
            g.axes[i][0].legend(title = "Models")

    @plotting
    def test_fig_2_model_bars(self):
        """Comparison between initial performance of each model and performance on most recent OMOP dataset"""
        reduced_results = self.results.loc[self.results['datasetid'].isin([max(self.results['datasetid']), min(self.results['datasetid'])])].copy()
        reduced_results['model_metric'] = reduced_results['model'] + '_' + reduced_results['metric']

        g1 = sns.FacetGrid(data=reduced_results, col='model_metric', col_wrap=3, sharey=False, sharex=False, hue='metric')
        g1.map(plt.bar, "databasename", "value").fig.subplots_adjust(hspace=.4)
        g1.set(xlabel='Database Version', ylabel=None)
        g1.set_titles(col_template = "{col_name}")
        g1.add_legend(title='Metrics')
