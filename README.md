# Customer UI

Bienvenue dans le projet *Customer UI*. Ce projet est une application front-end conçue pour gérer l'interface utilisateur de la bibliothèque.

## Deploiement du microservice

Afin de déployer le microservice, il faudra :

Récupérer le dernier tag image disponible sur : https://hub.docker.com/

### `docker pull maxenceabrt/customer-ui-service:latest`

Ensuite lancer le

### `docker run -p 3000:80 maxenceabrt/customer-ui-service:latest`

L'UI utilisateur sera ensuite disponible en local sur le port 3000 : http://localhost:3000/ ou http://127.0.0.1:3000/

## Utilisateur de Connexion
Pour vous connecter au dashboard il y a deux utilisateurs liés à des livres :
### user: maubert2002@gmail.com | pwd : "toto"
### user: enzo10villa@gmail.com | pwd : "toto"
