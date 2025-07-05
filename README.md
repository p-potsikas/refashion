# 🛍️ LOCAL - Refashion eShop Platform

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

### 1. Clone 
```bash
git clone https://github.com/EmmanuelPintelas/Refashion.git
```

### 2. Install Backend

```bash
cd Refashion\mercur
yarn install
yarn build
```

### 3. Start Backend (Medusa.js)

```bash
cd apps/backend
```

Create `.env` and add:

```
DATABASE_URL=postgres://postgres:postgres@localhost:5432/mercur_db
```
Also, `.env` file is in Refashion init folder, and you can just copy paste in mercur/apps/backend - just check ips and DATABASE etc codes...


Start PostgreSQL via Docker:

```bash
docker run --name mercur-postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_DB=mercur_db \
  -p 5432:5432 -d postgres:15
```
of via PowerShell for Windows:
```bash
docker run --name mercur-postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_USER=postgres -e POSTGRES_DB=mercur_db -p 5432:5432 -d postgres:15
```
If the container already exists (from a previous setup), just start it again:
```bash
docker start mercur-postgres
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

### 4. Start Frontend Modules

#### b2c-marketplace-storefront

```bash
cd b2c-marketplace-storefront
npm install
npm run dev
```

> Frontend runs at: `http://localhost:3000`


#### vendor-panel

```bash
cd vendor-panel
npm install
npm run dev
```

---

## 📬 Maintainer

**Manolis Pintelas**  
📧 manolis_pintelas@hotmail.com  
🔗 [https://github.com/EmmanuelPintelas](https://github.com/EmmanuelPintelas)
