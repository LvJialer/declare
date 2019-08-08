# Python support can be specified down to the minor or micro version
# (e.g. 3.6 or 3.6.3).
# OS Support also exists for jessie & stretch (slim and full).
# See https://hub.docker.com/r/library/python/ for all supported Python
# tags from Docker Hub.
FROM python:3.6.7

# If you prefer miniconda:
#FROM continuumio/miniconda3

COPY requirements.txt /backend/requirements.txt
RUN python3 -m pip install -i https://pypi.tuna.tsinghua.edu.cn/simple -r backend/requirements.txt && \
        apt update && apt install -y mysql-client && apt install -y sendmail
ADD . /backend
WORKDIR /

CMD service sendmail start; \
        gunicorn --bind=0.0.0.0:8080 --access-logfile - --error-logfile - backend.main:app

# Using pipenv:
#RUN python3 -m pip install pipenv
#RUN pipenv install --ignore-pipfile
#CMD ["pipenv", "run", "python3", "-m", "mgp"]

# Using miniconda (make sure to replace 'myenv' w/ your environment name):
#RUN conda env create -f environment.yml
#CMD /bin/bash -c "source activate myenv && python3 -m mgp"
