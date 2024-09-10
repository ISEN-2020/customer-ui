# Customer UI Service

Cette application est une interface web pour un système de bibliothèque. Elle permet aux utilisateurs de s'inscrire, de se connecter, de rechercher des livres, de louer un livre, de voir quels livres ils ont empruntés et quand ils doivent le rendre

## Prérequis

- Avoir Docker installé sur votre machine
- Avoir activer Kubernetes

## Déployer le Microservice

Récupérer l'image Docker depuis Docker Hub :

`docker pull maxenceabrt/customer-ui-service:latest`

Cloner le repository en local :

`git clone https://github.com/ISEN-2020/customer-ui.git`

Déployer les configurations dans votre cluster Kubernetes :

`kubectl apply -f deployment.yaml`

`kubectl apply -f service.yaml`

Une fois le cluster en cours d'exécution, vous pouvez accéder à l'UI Utilisateur localement en vous rendant à l'adresse suivante : http://localhost:3000/ ou http://127.0.0.1:3000/

## Utilisateur de Connexion
Pour vous connecter au dashboard il y a deux utilisateurs liés à des livres :
- user: maubert2002@gmail.com | pwd : "toto"
- user: enzo10villa@gmail.com | pwd : "toto"
