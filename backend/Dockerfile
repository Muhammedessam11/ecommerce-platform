FROM node:20
WORKDIR /app

COPY package.json package-lock.json ./

# Update npm and install dependencies
RUN npm cache clean --force && npm config set registry https://registry.npmjs.org/ && \
    npm install -g npm@latest && npm install --legacy-peer-deps


COPY . .

EXPOSE 5000

CMD ["npm", "start"]


