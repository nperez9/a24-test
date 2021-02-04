FROM node:10-alpine

ARG NODE_ENV=${NODE_ENV:-development}
# Create app directory
WORKDIR /usr/src/a24

COPY . .

RUN npm install
RUN npm run build

EXPOSE 3000

CMD npm start
