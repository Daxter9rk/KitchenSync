# KitchenSync agent instructions

## Purpose
KitchenSync is a modular restaurant order-management laboratory focused on the flow between dining room, ordering, kitchen preparation, fulfillment and reporting.

## Required workflow
- Inspect existing code and documentation before editing.
- Keep the product focused on order and kitchen coordination; do not turn it into a full ERP.
- Prefer small, reversible changes inside the active reconstruction branch.
- Keep business rules outside React components and Firebase adapters.
- Use Cloud Functions for privileged or transactional operations.
- Treat Firestore and Storage rules as production code and test them.
- Do not add a dependency without recording why it is needed.
- Do not claim a feature works without build, test or emulator evidence.
- Keep DEV data fictional and disposable.
- Update architecture and study documentation when behavior changes.

## Validation before reporting completion
Run, when applicable:

```bash
npm run lint
npm test
npm run build
npm run functions:build
firebase emulators:exec "npm test"
```

Report modified files, validations, known limitations and the next safe step.
