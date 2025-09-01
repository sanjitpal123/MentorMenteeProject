# Use Node.js image
FROM node:18

# Set working directory
WORKDIR /app

# Copy dependency files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Expose the app port
EXPOSE 5000

# Start command
CMD ["npm", "start"]
