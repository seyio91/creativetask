FROM node:12-alpine

ARG PORT

ARG NODE_ENV

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY package*.json ./

USER node

RUN npm install

COPY --chown=node:node . .

ENV PORT=8080

ENV NODE_ENV=production

EXPOSE $PORT

CMD [ "npm", "run", "start" ]