FROM node:16

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=3000
ENV PGUSER=ubuntu
ENV PGPASSWORD=ubuntu
ENV PGHOST=18.237.80.35
ENV PGDATABASE=postgres
ENV PGPORT=5432

EXPOSE 3000

CMD [ "npm", "start" ]