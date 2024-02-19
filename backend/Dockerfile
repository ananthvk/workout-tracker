FROM node:18-alpine
WORKDIR /app
COPY package.json .
RUN yarn install
RUN yarn install --dev
COPY . .
CMD [ "yarn", "ts-node", "./src/index.ts" ]