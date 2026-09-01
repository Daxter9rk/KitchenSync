# KitchenSync

KitchenSync is a modular web application for restaurant order management and real-time coordination between dining room and kitchen stations.

## Current branch objective
The `refactor/firebase-architecture` branch replaces the original single-file Vanilla JavaScript prototype with a React + TypeScript application prepared for Firebase.

## Product scope
- Tables and dining-room status
- Order creation and tracking
- Kitchen tickets by station
- Preparation, delivery, returns and cancellation flow
- Product catalog
- Basic operational reports
- Authentication, roles and auditability through Firebase

Inventory, payroll, purchasing, tax invoicing and full CRM are intentionally outside the initial scope.

## Stack
- React + TypeScript + Vite
- Firebase Authentication
- Cloud Firestore
- Cloud Functions Gen 2
- Firebase Storage
- Firebase Hosting
- Firebase Emulator Suite
- Vitest

## Local development

```bash
cp .env.example .env.local
npm install
npm --prefix functions install
npm run dev
```

For Firebase emulators:

```bash
npm run emulators
```

The UI can render with demonstration data before Firebase credentials are configured. Firebase services activate when the required `VITE_FIREBASE_*` variables exist.

## Environments
- Local: Firebase Emulator Suite
- DEV: shared online laboratory with fictional data
- PROD: future isolated Firebase project after stabilization

## Legacy prototype
The original `app.js` and `styles.css` remain temporarily in the repository as historical reference but are not loaded by the Vite application. They will be moved to a documented legacy snapshot after the new flow reaches functional parity.
