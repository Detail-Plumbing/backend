FROM node:20.16.0 AS builder

ENV NODE_ENV build

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY  ./ ./

RUN npm install -g prisma@5.17.0
COPY prisma ./prisma

RUN npm run build


FROM node:20.16.0
ENV NODE_ENV production

WORKDIR /app

COPY --from=builder  /app/package.json /app/prisma ./
COPY --from=builder  /app/node_modules/ ./node_modules/
COPY --from=builder  /app/dist/ ./dist/

CMD ["npm", "run", "start:prod"]