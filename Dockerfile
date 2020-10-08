FROM node:12-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
RUN npm run build
RUN npm run seed
COPY . .
EXPOSE 8000
CMD [ "npm", "start" ]