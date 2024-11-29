# Use the official Node.js 18 Alpine image
FROM node:18-alpine

ARG HOST
ARG PORT
ARG APP_KEYS
ARG API_TOKEN_SALT
ARG ADMIN_JWT_SECRET
ARG TRANSFER_TOKEN_SALT
ARG DATABASE_CLIENT
ARG DATABASE_FILENAME
ARG JWT_SECRET

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json
COPY package*.json /app

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . /app

# Build the Next.js application
RUN npm run build

# Expose port 1337
EXPOSE 1337

# Add a debug step to check the contents of /app
RUN ls -la /app

# Command to start the Next.js application
CMD ["npm", "run", "start"]