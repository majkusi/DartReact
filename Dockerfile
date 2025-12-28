FROM node:20-alpine

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source
COPY . .

# Vite / CRA dev server
EXPOSE 5173

# IMPORTANT: --host allows access from Docker network
CMD ["npm", "run", "dev", "--", "--host"]
