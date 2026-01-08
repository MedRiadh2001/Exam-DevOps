FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build -- --configuration production --project voitures

FROM nginx:alpine
# Copy nginx configuration for SPA routing
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Copy built Angular app (Angular 17+ uses browser folder)
COPY --from=build /app/dist/voitures/browser /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]