# 🛍️ Refashion eShop Platform

**Refashion** is a modern full-stack eCommerce marketplace platform built with:

- 🛒 **b2c-marketplace-storefront** – Next.js customer storefront
- 🧑‍💼 **vendor-panel** – Vendor admin dashboard
- 🔧 **mercur** – Medusa.js backend API

---

## 📦 Project Structure

```
Refashion/
├── mercur/                     # Medusa backend
├── vendor-panel/               # Vendor admin panel
├── b2c-marketplace-storefront/ # Customer-facing frontend
```

---

## 🚀 Quick Setup

### 1. Clone and Install

```bash
git clone https://github.com/EmmanuelPintelas/Refashion.git
cd Refashion\mercur
yarn install
yarn build
```

---

### 2. Start Backend (Medusa.js)

```bash
cd apps/backend
```

Create `.env` and add:

```
DATABASE_URL=postgres://postgres:postgres@localhost:5432/mercur_db
```

Start PostgreSQL via Docker:

```bash
docker run --name mercur-postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_DB=mercur_db \
  -p 5432:5432 -d postgres:15
```

Run migrations:

```bash
yarn medusa db:migrate
```

Create admin user:

```bash
npx medusa user --email manolis_pintelas@hotmail.com --password 123
```

Start backend:

```bash
yarn dev
```

> Backend runs at: `http://localhost:9000`

---

### 3. Start Frontend Modules

#### b2c-marketplace-storefront

```bash
cd b2c-marketplace-storefront
yarn dev
```

#### vendor-panel

```bash
cd vendor-panel
yarn dev
```

---

## 📬 Maintainer

**Manolis Pintelas**  
📧 manolis_pintelas@hotmail.com  
🔗 [https://github.com/EmmanuelPintelas](https://github.com/EmmanuelPintelas)
