# Mercur Backend

Marketplace backend for Mercur.

## Prerequisites

- Node.js v20+
- Git CLI

## Scripts

- `yarn build` - Build the backend
- `yarn seed` - Seed the database
- `npm run seed:100-products` - Seed 100 targeted products (Jeans, Shoes, Hoodies, T-Shirts, etc.)
- `npm run seed:rollback-products` - Remove only auto-seeded products (`handle` starts with `seed-`)
- `yarn start` - Start the backend
- `yarn dev` - Start the backend in development mode
- `yarn db:migrate` - Run migrations and module links
- `yarn test:integration:http` - Run API integration tests
- `yarn test:integration:modules` - Run module integration tests
- `yarn test:unit` - Run unit tests
- `yarn format` - Format the code
- `yarn lint` - Lint the code
- `yarn lint:fix` - Fix lint errors
- `yarn generate:oas` - Generate OpenAPI specification

## Seed Guide

Run from `mercur/apps/backend`:

```bash
# 1) Prepare DB schema
yarn db:migrate

# 2) Base marketplace seed
yarn seed

# 3) Add 100 targeted catalog products
npm run seed:100-products
```

Rollback and reseed catalog products:

```bash
npm run seed:rollback-products
npm run seed:100-products
```

Custom count / seller:

```bash
npx medusa exec ./src/scripts/seed-100-products.ts 200
npx medusa exec ./src/scripts/seed-100-products.ts 100 sel_XXXXXXXXXXXX
```
