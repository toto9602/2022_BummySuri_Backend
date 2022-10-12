FROM node:16.14 as builder

ENV NODE_ENV=development

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install

COPY . . 

RUN npm run build

FROM node:16.14

WORKDIR /usr/src/app

COPY package.json ./
RUN npm install

COPY . .

COPY --from=builder /usr/src/app/dist ./dist

CMD ["node", "dist/main.js"]