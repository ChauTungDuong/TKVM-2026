FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies (use --production if you don't need dev dependencies)
RUN npm install

# Copy the rest of the application
COPY . .

# Ensure the uploads directory exists
RUN mkdir -p uploads

# Expose the API port
EXPOSE 3030

# Start the server
CMD ["npm", "start"]
