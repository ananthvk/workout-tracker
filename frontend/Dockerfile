FROM node:18-alpine
WORKDIR /app
COPY package.json .
COPY yarn.lock .
RUN yarn install
RUN yarn install --dev
COPY . .
RUN yarn vite build
CMD [ "yarn", "preview" ]