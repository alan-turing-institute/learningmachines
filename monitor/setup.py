from setuptools import setup, find_packages


with open("README.md", "r") as fh:
    long_description = fh.read()

# Source dependencies from requirements.txt file.
try:
    with open("requirements.txt", "r") as f:
        lines = f.readlines()
        install_packages = [line.strip() for line in lines]
except FileNotFoundError:
    install_packages = []

setup(
    name="modmon",
    version="0.0.1",
    author="The Alan Turing Institute Research Engineering Group",
    author_email="hut23@turing.ac.uk",
    description="A framework for tracking the performance of models over time",
    long_description=long_description,
    long_description_content_type="text/markdown",
    url="https://github.com/alan-turing-institute/DECOVID-dataaccess/tree/master/monitor",
    license="MIT",
    classifiers=[
        "Development Status :: 1 - Planning",
        "Programming Language :: Python :: 3",
        "Programming Language :: R",
        "License :: OSI Approved :: MIT License",
        "Operating System :: Unix",
        "Topic :: Utilities",
    ],
    keywords="model monitor monitoring tracking performance",
    python_requires=">=3.6",
    packages=find_packages(),
    install_requires=install_packages,
    entry_points={
        "console_scripts": [
            "modmon_db_create=modmon.db.create:main",
            "modmon_db_check=modmon.db.connect:main",
            "modmon_model_check=modmon.models.check:main",
            "modmon_model_setup=modmon.models.setup:main",
            "modmon_run=modmon.models.run:main",
            "modmon_delete=modmon.utils.delete:main",
            "modmon_report=modmon.report.report:main",
        ]
    },
)
