FROM node:18

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Create a .env file for the frontend
RUN echo "REACT_APP_BACKEND=http://localhost:8080" > .env

# Expose port 3000
EXPOSE 3000

# Start the application in development mode
CMD ["npm", "start"]