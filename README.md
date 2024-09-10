# Customer UI

Bienvenue dans le projet *Customer UI*. Ce projet est une application front-end conçue pour gérer l'interface utilisateur de la bibliothèque.

## Déployer le Microservice

Assurez-vous d'avoir Docker installé sur votre machine.

Récupérer l'image Docker depuis Docker Hub :

### `docker pull maxenceabrt/customer-ui-service:latest`

Lancer le conteneur Docker avec l'image que vous venez de récupérer :

### `docker run -p 3000:80 maxenceabrt/customer-ui-service:latest`

Une fois le conteneur en cours d'exécution, vous pouvez accéder à l'UI Utilisateur localement en vous rendant à l'adresse suivante : http://localhost:3000/ ou http://127.0.0.1:3000/

## Utilisateur de Connexion
Pour vous connecter au dashboard il y a deux utilisateurs liés à des livres :
### user: maubert2002@gmail.com | pwd : "toto"
### user: enzo10villa@gmail.com | pwd : "toto"
