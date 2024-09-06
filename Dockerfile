# Stage 1: Build the React app
FROM node:lts as builder
WORKDIR /app

RUN addgroup --system appgroup && adduser --system appuser --ingroup appgroup
USER appuser

COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Create the production image
FROM nginx:latest

RUN addgroup --system appgroup && adduser --system appuser --ingroup appgroup
USER appuser
COPY --from=builder /app/build /usr/share/nginx/html
RUN chown -R appuser:appgroup /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]