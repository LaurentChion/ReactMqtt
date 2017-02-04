FROM node:6.9
LABEL maintainer Laurent

# Emplacement de l'application
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Récupération des fichiers sources
COPY . /usr/src/app

# Installation des dépendances
RUN npm i
# Notre application va tourner sur le port 8090 (on l'indique à docker)
EXPOSE 8090


# On démare l'application
CMD ["npm", "start"]
