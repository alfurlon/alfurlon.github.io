FROM mysql:latest

COPY *.sql /docker-entrypoint-initdb.d

ENV MYSQL_ROOT_PASSWORD=top-secret-password
ENV MYSQL_DATABSE=field_agent