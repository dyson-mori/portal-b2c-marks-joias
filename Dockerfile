# node version
FROM node:18

WORKDIR /usr/src/app

COPY package.json .
COPY yarn.lock .
COPY prisma ./prisma

RUN yarn install

COPY . .

RUN yarn build

RUN rm -rf app/

# Prune off the dev dependencies after build step
RUN yarn install --production

CMD [ "yarn", "start" ]