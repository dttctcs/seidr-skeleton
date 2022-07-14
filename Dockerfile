
FROM python:3-alpine as build-app
COPY requirements.txt /requirements.txt
RUN apk add --no-cache build-base postgresql-libs libxml2-dev libxslt-dev postgresql-dev git && \
    pip install --trusted-host '*' --no-cache-dir --disable-pip-version-check -r /requirements.txt --prefix=/install


FROM python:3-alpine
RUN adduser -D app
COPY --from=build-app /install /usr/local
USER app
ENV APP_HOME /app
ENV PATH $PATH:$APP_HOME
ENV PYTHONUNBUFFERED=1
COPY docker-entrypoint.sh /
COPY --chown=app app $APP_HOME/app
WORKDIR $APP_HOME
ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["waitress-serve", "app:app"]
