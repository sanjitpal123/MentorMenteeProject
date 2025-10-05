# --------- Builder Stage ---------
FROM node:20-alpine AS builder
WORKDIR /usr/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# --------- Production Stage ---------
FROM nginx:alpine AS production
COPY --from=builder /usr/app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
