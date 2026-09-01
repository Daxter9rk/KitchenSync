# Firebase DEV setup

## 1. Create or select the Firebase project
Use a dedicated project for the online laboratory. Do not reuse a production project.

## 2. Configure the CLI

```bash
firebase login
cp .firebaserc.example .firebaserc
firebase use --add
```

Register the selected project with the alias `dev`.

## 3. Configure the web application
Create a Firebase Web App and copy its public configuration into `.env.local` using `.env.example` as the template.

## 4. Enable services
- Authentication
- Cloud Firestore
- Cloud Functions
- Firebase Hosting
- Storage only when product images are implemented

## 5. Local verification

```bash
npm install
npm --prefix functions install
npm run lint
npm test
npm run build
npm run functions:build
npm run emulators
```

## 6. DEV deployment

```bash
firebase use dev
npm run deploy:dev
```

The DEV environment must contain only fictional, disposable data. A separate Firebase project will be created for PROD after stabilization.
