FROM node:16-alpine

ENV HOST 0.0.0.0
EXPOSE 8080
ENV PORT 8080

WORKDIR /usr/sc/app

COPY . .

RUN ls -al

# Copy and download dependencies
# COPY package.json package-lock.json

RUN npm install

# EXPOSE 4000

CMD npm start
