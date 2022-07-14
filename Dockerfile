FROM node:16-alpine as build-webapp

WORKDIR /home/webapp
COPY ./webapp .
RUN npm ci
RUN npm run build
RUN mkdir build/templates \
    && mv -t build/static/ build/asset-manifest.json build/favicon.ico  \
    && mv -t build/templates/ build/index.html


FROM python:3-buster
RUN apk add --no-cache git openssh

FROM python:3-alpine as build-app
COPY requirements.txt /requirements.txt
RUN apk add --no-cache build-base postgresql-libs libxml2-dev libxslt-dev postgresql-dev && \
    pip install --trusted-host '*' --no-cache-dir --disable-pip-version-check -r /requirements.txt --prefix=/install


FROM python:3-alpine
COPY --from=build-app /install /usr/local
RUN apk add --no-cache libxslt libpq

ENV APP_HOME /ratatosk
ENV PATH $PATH:$APP_HOME



COPY docker-entrypoint.sh /
COPY app $APP_HOME/app
COPY babel $APP_HOME/babel
COPY cli/planner cli/change-gen cli/change-rev $APP_HOME/

ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["waitress-serve", "app:app"]

WORKDIR /home/pam
COPY requirements.txt .
RUN pip install -r requirements.txt


WORKDIR $APP_HOME

COPY ./app .
COPY --from=build-webapp /home/pam-webapp/build /home/pam/app
ENV PYTHONUNBUFFERED=1

CMD ["waitress-serve", "app:app"]


# Copy the virtualenv into a distroless image
FROM python:3-alpine
COPY --from=build  /install /usr/local
RUN apk add --no-cache libxslt libpq

ENV APP_HOME /ratatosk
ENV PATH $PATH:$APP_HOME

WORKDIR $APP_HOME

COPY docker-entrypoint.sh /
COPY app $APP_HOME/app
COPY babel $APP_HOME/babel
COPY cli/planner cli/change-gen cli/change-rev $APP_HOME/

ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["waitress-serve", "app:app"]