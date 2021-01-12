FROM node:12-alpine
WORKDIR /home/node
COPY --chown=node:node package*.json ./
RUN npm install
RUN npm run build
RUN npm run seed
COPY --chown=node:node . .
EXPOSE 8000
USER node
CMD [ "node", "server/index.js" ]
