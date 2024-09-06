# Stage 1: Build the React app
FROM node:lts as builder
WORKDIR /app

# Add a non-root user and switch to that user
RUN addgroup --system appgroup && adduser --system appuser --ingroup appgroup
USER appuser

# Install dependencies without running scripts
COPY package*.json ./
RUN npm install --ignore-scripts
COPY . .
RUN npm run build

# Stage 2: Create the production image
FROM nginx:latest

# Add a non-root user in the production stage
RUN addgroup --system appgroup && adduser --system appuser --ingroup appgroup
USER appuser

# Copy build artifacts to Nginx HTML directory
COPY --from=builder /app/build /usr/share/nginx/html

# Ensure Nginx uses non-root user
RUN chown -R appuser:appgroup /usr/share/nginx/html

# Expose the default Nginx port
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]