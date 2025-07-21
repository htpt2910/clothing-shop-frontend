FROM node:22.17.1

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all files
COPY . .

# Expose port
EXPOSE 4001

# Start the development server
CMD ["npm", "run", "dev"]