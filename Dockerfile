# ---- Étape 1 : Build Vite ----
FROM node:20 AS build
WORKDIR /app

# Installer dépendances
COPY package*.json ./
RUN npm install

# Copier le code et build
COPY . .
RUN npm run build


# ---- Étape 2 : Serveur statique NGINX ----
FROM nginx:alpine

# Ajouter ta config nginx personnalisée
COPY nginx.conf /etc/nginx/conf.d/default.conf

WORKDIR /usr/share/nginx/html

# Copier le build de Vite
COPY --from=build /app/dist .

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
