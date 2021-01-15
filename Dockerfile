FROM node:14-alpine
WORKDIR /home/node
COPY --chown=node:node package*.json ./
RUN npm ci
RUN npm run build
RUN npm run seed
COPY --chown=node:node . .
EXPOSE 8000
USER node
CMD [ "node", "server/index.js" ]
