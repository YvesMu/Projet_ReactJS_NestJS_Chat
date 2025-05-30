# 🟢 Chat App - Fullstack (NestJS + React + PostgreSQL)

Ce projet est une application de chat en temps réel utilisant un backend **NestJS**, un frontend **React** et une base de données **PostgreSQL**.

---

## 📦 Installation

### 1. Cloner le dépôt

```bash
git clone <url-du-repo>
cd <nom-du-dossier>
```

### 2. Installer les dépendances

#### Backend

```bash
cd backend
npm install
```

#### Frontend

```bash
cd ../frontend
npm install
```

---

## 💠 Configuration PostgreSQL

### 1. Créer une base de données

Assure-toi que PostgreSQL est installé et en cours d'exécution sur ta machine.

Connecte-toi avec `psql` ou via un outil graphique comme pgAdmin et exécute :

```sql
CREATE DATABASE chat_app;
```

### 2. Modifier la configuration dans `backend/src/app.module.ts`

Ouvre le fichier `backend/src/app.module.ts` et adapte cette partie selon ta configuration PostgreSQL locale :

```ts
TypeOrmModule.forRoot({
  type: 'postgres',         // ✅ Adapter si nécessaire
  host: 'localhost',
  port: 5432,
  username: 'postgres',     // ✅ Remplacer si besoin
  password: 'root',         // ✅ Remplacer si besoin
  database: 'chat_app',
  autoLoadEntities: true,
  synchronize: true,
}),
```

> ⚠️ **Attention** : `synchronize: true` est utile en développement, mais **à désactiver en production** pour éviter toute perte de données.

---

## 🚀 Lancer l'application

### 1. Backend (NestJS)

```bash
cd backend
npm run start:dev
```

### 2. Frontend (React)

```bash
cd ../frontend
npm run dev
```

---

## ✅ Fonctionnalités prévues

* Authentification (inscription / connexion)
* Chat en temps réel via WebSocket
* Personnalisation du profil (couleur)
* Indicateur de présence (connecté / déconnecté)

---

## 🌐 Routes principales du frontend

* `/register` → Page d'inscription
* `/login` → Page de connexion
* `/chat` → Interface de chat en temps réel
* `/profile` → Modification de la couleur du texte de chat (visible par les autres utilisateurs)

---

## 📌 Prérequis

* Node.js (version recommandée : 18+)
* PostgreSQL
* npm

---

## 🧑‍💻 Développé avec

* [NestJS](https://nestjs.com/)
* [React](https://react.dev/)
* [PostgreSQL](https://www.postgresql.org/)
* [Socket.IO](https://socket.io/)

---

## 📂 Structure du projet

```
/
├── backend/      → API NestJS
│   └── src/
├── frontend/     → Interface React
│   └── src/
└── README.md
```
