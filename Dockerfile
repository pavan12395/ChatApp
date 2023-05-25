# Use the Alpine Linux base image
FROM node:alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY client/package*.json ./client/

# Change directory to the client folder
WORKDIR /app/client

# Install dependencies
RUN npm install

# Copy the rest of the client application files
COPY client/. .

# Build the client application
RUN npm run build

# Change directory to the build folder
WORKDIR /app/client/build

# Install a simple HTTP server to serve the static files
RUN npm install -g http-server

# Expose port 8080 (change this if your app uses a different port)
EXPOSE 8080

# Start the HTTP server to host the built HTML file
CMD ["http-server", "-p", "8080"]
