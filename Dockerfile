FROM python:3.12

WORKDIR /app

ADD https://netfree.link/dl/unix-ca.sh /home/netfree-unix-ca.sh 
RUN cat  /home/netfree-unix-ca.sh | sh
ENV NODE_EXTRA_CA_CERTS=/etc/ca-bundle.crt
ENV REQUESTS_CA_BUNDLE=/etc/ca-bundle.crt
ENV SSL_CERT_FILE=/etc/ca-bundle.crt

COPY . /app

RUN pip install --upgrade pip
RUN pip install -r /app/requirements.txt --trusted-host pypi.org --trusted-host pypi.python.org --trusted-host=files.pythonhosted.org

EXPOSE 8080
CMD [ "python", "src/app.py" ]
