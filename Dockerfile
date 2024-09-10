# Stage 1: Build the React app
FROM node:lts as builder
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install --ignore-scripts

# Copy the rest of the application code and build the app
COPY . .
RUN npm run build

# Stage 2: Create the production image
FROM nginx:latest

# Create a non-root user
RUN useradd -m nonroot

# Set the appropriate permissions for Nginx directories
RUN mkdir -p /var/cache/nginx/client_temp \
    && chown -R nonroot:nonroot /var/cache/nginx \
    && chown -R nonroot:nonroot /var/log/nginx \
    && chown -R nonroot:nonroot /var/run/nginx

# Switch to the non-root user
USER nonroot

# Copy build artifacts from the builder stage
COPY --from=builder /app/build /usr/share/nginx/html

# Expose the default Nginx port
EXPOSE 80

# Run Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
