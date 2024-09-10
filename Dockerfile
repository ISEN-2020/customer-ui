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

# Copy build artifacts from the builder stage
COPY --from=builder /app/build /usr/share/nginx/html

RUN chown -R nginx:nginx /app && chmod -R 755 /app && \
        chown -R nginx:nginx /var/cache/nginx && \
        chown -R nginx:nginx /var/log/nginx && \
        chown -R nginx:nginx /etc/nginx/conf.d

RUN touch /var/run/nginx.pid && \
        chown -R nginx:nginx /var/run/nginx.pid
USER nginx

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]