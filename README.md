# projet de git

projet avec youssef el diba, mathis et ménoua. on a mis les captures d'écrans en bas!!!! 
---

## 1. couche technique

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
<img width="1920" height="883" alt="image" src="https://github.com/user-attachments/assets/ff9b1a03-775b-4b12-9009-1cb109cc1db7" />
<img width="1919" height="946" alt="image" src="https://github.com/user-attachments/assets/cd547282-9f96-4ac7-9ed6-41d95b6f65f3" />
<img width="1062" height="549" alt="image" src="https://github.com/user-attachments/assets/9f0d46ed-acf3-4582-ba46-3bd5d0a6199e" />
<img width="1913" height="946" alt="image" src="https://github.com/user-attachments/assets/68e82807-f32b-4bd7-8c96-f9608113fe98" />
<img width="1558" height="552" alt="image" src="https://github.com/user-attachments/assets/413c62d6-373b-4c35-a2a4-5628e7d5516b" />
<img width="1913" height="946" alt="image" src="https://github.com/user-attachments/assets/5bd9d448-0fff-4ce3-94f2-630d02ca992b" />
<img width="899" height="289" alt="image" src="https://github.com/user-attachments/assets/c4ffdd22-eb76-45f6-b361-c0a219eb6f66" />
<img width="905" height="156" alt="image" src="https://github.com/user-attachments/assets/4e9ee651-5b34-4dd3-9e38-a8322f6aefa8" />
<img width="1868" height="674" alt="image" src="https://github.com/user-attachments/assets/f37c88a7-901f-4229-a85e-216dcce3c41a" />

