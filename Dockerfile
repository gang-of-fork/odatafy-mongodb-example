# Dockerfile for node.js / express / TypeScript
FROM node:lts-alpine AS build-stage

ENV TZ="Europe/Stockholm"
RUN date

WORKDIR /app

# install dependencies seperatedly, to leverage docker layer caching
COPY package*.json ./
RUN npm install

COPY . .


# build project
RUN npm run build

FROM node:lts-alpine AS prod-stage

WORKDIR /app

# copy only neccessary files to prod stage
COPY --from=build-stage /app/dist /app/dist
COPY --from=build-stage /app/node_modules /app/dist/node_modules

EXPOSE 4000
# start app
CMD ["node", "./dist/app.js"]