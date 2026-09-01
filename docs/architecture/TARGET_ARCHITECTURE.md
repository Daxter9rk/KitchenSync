# Target architecture

KitchenSync uses a modular serverless monolith. React modules provide presentation and client orchestration. Firestore stores operational documents and supports real-time subscriptions. Cloud Functions own privileged and transactional use cases. Security Rules enforce the authorization boundary independently of the interface.

## Modules
- Identity: users, roles and sessions
- Catalog: categories, products, prices and station assignment
- Dining Room: tables and service sessions
- Ordering: orders, items, notes and totals
- Kitchen: station tickets and preparation progress
- Fulfillment: delivery, return, cancellation and closure
- Reporting: operational history and derived summaries

## Dependency rule
Presentation may call application services. Application services may use domain rules and repository interfaces. Firebase adapters implement repositories. Domain code must not import React or Firebase.

## Environment model
Local uses Emulator Suite. DEV is a disposable online laboratory. PROD will be a separate Firebase project and is not created until the release candidate is stable.
