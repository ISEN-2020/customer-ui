# Customer UI Service

Cette application est une interface web pour un système de bibliothèque. Elle permet aux utilisateurs de s'inscrire, de se connecter, de rechercher des livres, de louer un livre, de voir quels livres ils ont empruntés et quand ils doivent le rendre

## Prérequis

- Avoir Docker installé sur votre machine
- Avoir activer Kubernetes

## Déployer le Microservice

Récupérer l'image Docker depuis Docker Hub :

Version avant modification année 2025 : `docker pull maxenceabrt/customer-ui-service:latest`

Version après modification année 2025 : `docker pull flb2725/customer-ui-service:latest`

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

## Lire les logs

Lister vos pods en cours : `kubectl get pods`

Vous pouvez lire les journaux des pods en utilisant la commande : `kubectl logs <pod-name>`

## Activation de l'environnement python pour utiliser les API

Pour activer un environnement python il faut faire : 
`python3 -m venv venv` pour créer l'environnement 
`source venv/bin/activate` (Sur linux/mac) pour enregistrer et activer l'environnement
`venv\Scripts\Activate.ps1` (Sur Windows PowerShell)
`venv\Scripts\activate.bat` (Sur Windows classique)


## L'API est géré par flask
Vous pouvez ajouter des livres uniquement via terminal avec la requête post_books et en insérant un json représentant les datas de votre livre.
Via l'interface vous pouvez recherchez un livre parmi votre liste et le réserver et voir qui l'a réservé.
Lorsque vous réservez il vous faut refresh la page `http://localhost:3000/` pour pouvoir voir l'état changer dans la liste affichée.

Il vous faut installer les requirements pour le book-service (API) : `pip install -r requirements.txt`
Puis démarrer celui-ci : `python main.py runserver` et vous rendre sur `http://localhost:5000`

## Ajout de livres à la DataBase si vide 
Exécuter la commande suivante dans votre terminal : 
`curl -X POST http://127.0.0.1:5000/post_books \ -H "Content-Type: application/json" \ -d '{
      "title": "XXXXXXXXXX",
      "description": "XXXXXXX",
      "author": "XXXXXX",
      "Year": "YYYY",
      "quantity": N,
      "status": "AVAILABLE"
    }'
"
