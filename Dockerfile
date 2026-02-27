FROM node:20.15.1-alpine

# Set the working directory
WORKDIR /app

# Copy the project directory contents
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the project
RUN npm run build

# Install a lightweight static file server
RUN npm install -g serve

EXPOSE 8080

CMD ["serve", "-s", "dist", "-l", "8081"]
