#Download base image ubuntu 18.04
FROM ubuntu:18.04

LABEL maintainer="jannetta.steyn@newcastle.ac.uk"

ENV TZ=Europe/London

# Update Ubuntu Software repository
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone
RUN apt-get update
RUN apt-get upgrade -y
RUN apt-get -y install apt-utils
RUN apt-get -y install vim python3.6 python3.6-dev python3-pip wget git apt-transport-https software-properties-common zip unzip libpaper-utils xdg-utils liblas3 libcairo2 libcurl4 libjpeg8 liblapack3 libpango-1.0-0 libpangocairo-1.0-0 libpng16-16 libtiff5 libtk8.6 libxt6 gfortran libblas-dev libatlas-base-dev liblapack-dev libatlas-base-dev libncurses5-dev libreadline-dev libjpeg-dev libpcre3-dev libpng-dev zlib1g-dev libbz2-dev liblzma-dev libicu-dev pkg-config r-base-core r-base-dev jupyter jupyter-core jupyter-notebook
# RUN wget https://cloud.r-project.org/bin/linux/ubuntu/bionic-cran35/r-base-core_3.5.3-1bionic_amd64.deb
# RUN wget https://cloud.r-project.org/bin/linux/ubuntu/bionic-cran35/r-base-dev_3.5.3-1bionic_all.deb
RUN apt-key adv --keyserver keyserver.ubuntu.com --recv-keys E298A3A825C0D65DFD57CBB651716619E084DAB9
RUN add-apt-repository 'deb https://cloud.r-project.org/bin/linux/ubuntu bionic-cran35/'
RUN apt-get update
RUN apt-get upgrade -y
RUN git clone https://github.com/ahmedmalaa/AutoPrognosis.git
RUN cd AutoPrognosis
RUN sed -i '6s/\# //' /AutoPrognosis/cfg/requirements.txt
RUN sed -i 's/sklearn//g' /AutoPrognosis/cfg/requirements.txt
RUN sed -i 's/,repos=\"http:\/\/cran.cnr.Berkeley.edu\/\"//g' /AutoPrognosis/cfg/install_packages.r
#"
RUN Rscript /AutoPrognosis/cfg/install_packages.r
RUN pip3 install -r /AutoPrognosis/cfg/requirements.txt
RUN pip3 install cython jupyter jupyter-core notebook sklearn pivottablejs GPyOpt pandas
RUN python3 -m pip install tensorflow
RUN cd /AutoPrognosis/alg/autoprognosis; wget https://archive.ics.uci.edu/ml/machine-learning-databases/spambase/spambase.data
RUN mv /AutoPrognosis/alg/autoprognosis/spambase.data /AutoPrognosis/alg/autoprognosis/spambase.csv
RUN mkdir /root/.jupyter
COPY jupyter_notebook_config.py /root/.jupyter/.

# Run command to keep container running
CMD cd /AutoPrognosis; jupyter notebook --port=8080 --no-browser --ip=0.0.0.0 --allow-root

