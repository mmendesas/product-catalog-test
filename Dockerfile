FROM node:0.10.38

ADD . /code
WORKDIR /code

RUN npm install nodemon -g
RUN npm install

EXPOSE 3300

CMD ["nodemon", "server.js"]