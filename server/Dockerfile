FROM node:18-bullseye-slim

WORKDIR /app

RUN apt-get update
RUN apt-get install -y python3
RUN ln -s /usr/bin/python3 /usr/bin/python
RUN apt-get clean

COPY . .

RUN npm install

EXPOSE 5000
CMD ["node", "server.js"]