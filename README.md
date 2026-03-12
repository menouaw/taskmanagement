# taskmanagement
Application de gestion de tâches

3- Partie tests et couverture de code

Au Début
Backend – Couverture de code : 0 %
Aucun test automatisé n’a été implémenté sur l’API (Jest indique “No tests found”). Cela signifie que la totalité du code backend n’est pas couverte par des tests.

J’ai ajouté un premier test automatisé côté backend et un côté frontend pour  l’usage des tests et mesurer la couverture de code.
Sur le backend, j’ai créé un test Jest avec Supertest qui vérifie que l’endpoint /health répond bien avec un statut 200
Sur le frontend, j’ai ajouté un test Vitest qui rend le composant App et vérifie que la page de connexion s’affiche correctement quand l’utilisateur n’est pas authentifié.

