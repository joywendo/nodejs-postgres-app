FROM node:16-alpine

WORKDIR /usr/sc/app

COPY . .

RUN ls -al

# Copy and download dependencies
# COPY package.json package-lock.json

RUN npm install

EXPOSE 4000

CMD npm start
