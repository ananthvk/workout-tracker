FROM node:18-alpine
WORKDIR /app
COPY package.json .
COPY yarn.lock .
RUN yarn install
RUN yarn install --production=false --dev
COPY . .
RUN yarn run tsc
CMD [ "yarn", "start" ]