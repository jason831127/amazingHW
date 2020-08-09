FROM node:10.17.0

# build node application
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY src /usr/src/app/src
COPY test /usr/src/app/test
COPY package.json /usr/src/app/

RUN npm install
EXPOSE 1337 61337
CMD ["npm", "run", "start-nodemon"]
