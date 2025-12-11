# ---- Étape 1 : Build Vite ----
FROM node:20 AS build
WORKDIR /app

# Copier les fichiers nécessaires et installer les dépendances
COPY package*.json ./
RUN npm install

# Copier le reste du code et construire le projet
COPY . .
RUN npm run build


# ---- Étape 2 : Serveur NGINX ----
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html

# Configuration Nginx React-friendly
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]