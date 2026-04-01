# 🛍️ LOCAL - Refashion eShop Platform

**Refashion** is a modern full-stack eCommerce marketplace platform built with:

- 🛒 **b2c-marketplace-storefront** – Next.js customer storefront
- 🧑‍💼 **vendor-panel** – Vendor admin dashboard
- 🔧 **mercur** – Medusa.js backend API

---

## 📦 Project Structure

```
Refashion/
├── mercur/                     # Refashion backend
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

Copy the backend `.env` from your existing local setup/template.

Optional: create an admin user only if your seed does not include one:

```bash
npx medusa user --email .... --password ...
```

Run the backend:

```bash
cd mercur/apps/backend
yarn db:migrate
yarn seed
yarn dev
```

> Backend runs at: ` http://localhost:9000/app`

### Seeding Data

From `mercur/apps/backend`:

```bash
# Base marketplace seed (regions, seller, collections, starter products)
yarn seed

# Create 100 targeted products (Jeans, Shoes, Hoodies, T-Shirts, etc.)
npm run seed:100-products

# Rollback only auto-seeded products (handle starts with seed-)
npm run seed:rollback-products
```

Custom options:

```bash
# Custom count
npx medusa exec ./src/scripts/seed-100-products.ts 200

# Custom count + specific seller
npx medusa exec ./src/scripts/seed-100-products.ts 100 sel_XXXXXXXXXXXX
```

---

### 4. Start Frontend Modules

#### b2c-marketplace-storefront

```bash
cd b2c-marketplace-storefront
npm install
```
Then, create .env.local. From admin settings, you paste a publishable key // one working sample already exist in Refashion init folder. 

```bash
npm run dev
```

> Frontend runs at: `http://localhost:3000`


#### vendor-panel

```bash
cd vendor-panel
npm install
```

Make a .env.local file and fill in:

```
VITE_MEDUSA_BASE='/'
VITE_MEDUSA_STOREFRONT_URL=http://localhost:3000
VITE_MEDUSA_BACKEND_URL=http://localhost:9000
VITE_TALK_JS_APP_ID=demo
VITE_DISABLE_SELLERS_REGISTRATION=false
```

```bash
npm run dev
```

> Vendor runs at: `http://localhost:5173`
