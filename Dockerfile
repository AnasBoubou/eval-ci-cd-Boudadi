# Utilisation d'une image légère pour la production
FROM node:18-alpine

# Dossier de travail dans le conteneur
WORKDIR /usr/src/app

# Installation des dépendances
COPY package*.json ./
RUN npm ci --only=production

# Copie du code source
COPY . .

# Render injecte automatiquement la variable PORT, on l'expose
EXPOSE 10000

# Commande de démarrage
CMD [ "node", "src/app.js" ]