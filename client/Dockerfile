FROM node:18-alpine

# Set the working directory
WORKDIR /client

# install dependencies
COPY package.json package-lock.json ./
RUN npm install


COPY . .

EXPOSE 5173

CMD ["npm", "start"]