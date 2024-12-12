FROM node:20
WORKDIR /app

COPY package.json package-lock.json ./

# Clear npm cache and set registry
RUN npm cache clean --force && npm config set registry https://registry.npmjs.org/

# Update npm and install dependencies
RUN npm install -g npm@latest && npm install

COPY . .

EXPOSE 5000

CMD ["npm", "start"]


