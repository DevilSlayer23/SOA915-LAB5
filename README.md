# Orders JWT RBAC RateLimit (TypeScript + Express)

Steps:

1. copy `.env.example` to `.env` and edit if needed.
2. npm install
3. npm run dev   # development (auto-reload)
4. npm run build
5. npm start     # production

Test:
- POST /api/auth/login -> get token
- GET /api/orders/view (requires Authorization: Bearer <token>)
- PUT /api/orders/update (manager/admin)
- DELETE /api/orders/delete (admin)

Rate limiting: 4 requests per minute per user (configurable in config).
