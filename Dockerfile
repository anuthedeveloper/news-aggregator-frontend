FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json yarn.lock ./
RUN yarn install

# Copy project files
COPY . .

# Expose port
EXPOSE 3000

# Start the application
CMD ["yarn", "start"]
