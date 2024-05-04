# Stage 1: Build the application
FROM node:14-alpine AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the application (if needed)
# RUN npm run build

# Stage 2: Create the production image with NGINX
FROM nginx:1.21.0-alpine AS production

# Copy the NGINX configuration file
COPY nginx.conf /etc/nginx/nginx.conf

# Copy the built application from the builder stage to the NGINX web root
COPY --from=builder /app/build /usr/share/nginx/html

# Expose the port on which NGINX will listen (default is 80)
EXPOSE 80

ARG VERSION
ENV VERSION=production.${VERSION:-v1.0}
# Define the command to start NGINX
CMD ["nginx", "-g", "daemon off;"]

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 CMD wget --quiet --tries=1 --spider http://localhost || exit 1




