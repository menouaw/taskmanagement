# Task Management – Application de gestion de tâches

Application full‑stack (React + Node.js/Express) permettant de gérer des tâches avec authentification, priorités et colonne Kanban (À faire / En cours / Terminé).

---

## 1. Stack technique

- **Frontend** : React 18, React Router, Vite
- **Backend** : Node.js, Express, JWT, bcrypt
- **Tests frontend** : Vitest, React Testing Library, jsdom
- **Tests backend** : Jest, Supertest
- **Qualité / CI** :
  - ESLint (frontend et backend)
  - GitHub Actions (pipeline CI)

---

## 2. Lancer le projet en local

### Backend (API)

```bash
cd backend
npm install
npm run dev      # démarrage avec nodemon
```

API disponible par défaut sur `http://localhost:3001`.

### Frontend (React)

```bash
cd frontend
npm install
npm run dev
```

Interface accessible sur `http://localhost:3000` (le frontend proxy les requêtes `/api` vers le backend).

---

## 3. Tests et couverture de code

Au départ, il n’y avait **aucun test automatisé**, donc une couverture de code de **0 %** côté backend et frontend.

J’ai ensuite ajouté :

- **Backend** : un test Jest avec Supertest sur l’endpoint `/health` pour vérifier que l’API répond correctement.
- **Frontend** : un test Vitest qui rend le composant `App` et vérifie que la page de connexion s’affiche bien lorsqu’un utilisateur n’est pas authentifié.

### Commandes de tests

- **Backend** :

```bash
cd backend
npm test           # tests Jest
npm run test:coverage
```

- **Frontend** :

```bash
cd frontend
npm test           # tests Vitest
npm run test:coverage
```

### Résultats de couverture

- **Backend** :
  - Statements ≈ **28,7 %**
  - Branches ≈ **12,2 %**
  - Functions ≈ **5,3 %**
  - Lines ≈ **30,7 %**

- **Frontend** :
  - Statements ≈ **27,4 %**
  - Branches = **50 %**
  - Functions = **25 %**
  - Lines ≈ **27,4 %**

### Exemple de test backend (`backend/__tests__/server.test.js`)

```javascript
const request = require('supertest');
const app = require('../server');

describe('API health check', () => {
  it('GET /health should return status OK', async () => {
    const res = await request(app).get('/health');

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('status', 'OK');
    expect(res.body).toHaveProperty('timestamp');
  });
});
```

---

## 4. Pipeline CI/CD (GitHub Actions)

Un workflow GitHub Actions (`.github/workflows/ci.yml`) est configuré pour se lancer :

- à chaque **push** sur `main`
- à chaque **pull request** vers `main`

Il exécute :

- **Backend** :
  - `npm ci`
  - `npm run lint`
  - `npm run test:coverage`
- **Frontend** :
  - `npm ci`
  - `npm run lint`
  - `npm run test:coverage`

Cela garantit :

- des **tests automatiques** sur chaque PR
- une **analyse de code** (ESLint)
- une **vérification de la couverture de code** en continu

