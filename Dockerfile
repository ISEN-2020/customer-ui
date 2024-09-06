# Stage 1: Build the React app
FROM node:lts as builder
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code and build the app
COPY . .
RUN npm run build

# Stage 2: Create the production image
FROM nginx:latest

# Copy build artifacts from the builder stage
COPY --from=builder /app/build /usr/share/nginx/html

# Create a non-root user and group
RUN addgroup --system appgroup && adduser --system --ingroup appgroup appuser

# Change ownership of the files to the non-root user
RUN chown -R appuser:appgroup /usr/share/nginx/html

# Switch to the non-root user
USER appuser

# Expose the default Nginx port
EXPOSE 80

# Run Nginx in the foreground as a non-root user
CMD ["nginx", "-g", "daemon off;"]