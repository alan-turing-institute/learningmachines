FROM ubuntu:16.04

### get pip git etc

RUN apt-get update; apt-get install -y python3
RUN apt-get update; apt-get install -y python3-pip
RUN apt-get update; apt-get install -y locales

# ADD . /app
WORKDIR /app
# copy current directory to the dir code/.
COPY . /app

# Set the locale
RUN sed -i -e 's/# en_GB.UTF-8 UTF-8/en_GB.UTF-8 UTF-8/' /etc/locale.gen && \
    locale-gen
ENV LANG en_GB.UTF-8
ENV LANGUAGE en_GB:en
ENV LC_ALL en_GB.UTF-8

RUN pip3 install --upgrade pip
RUN pip3 install --upgrade setuptools
RUN pip3 install -r requirements.txt

ENV FLASK_APP app.py
## expose port 8000.
EXPOSE 8000
CMD ["flask","run"]