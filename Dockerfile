# Use an official Node.js runtime as a base image
FROM node:18
ENV AWS_REGION=us-east-1
ENV AWS_SECRET=ue-staging

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install application dependencies

RUN npm install
RUN npm install aws-sdk
# Bundle app source
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Define the command to run your app
CMD ["sh", "-c", "node secret.cjs && npm start"]
