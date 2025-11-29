/**
 * Simple demo script that exercises login, view, update, delete and rate limiting.
 *
 * Run with: ts-node src/demo.ts   (server must be running)
 *
 * This script is for demonstration; in grading or CI we recommend using real test runners.
 */

import axios from "axios";

const BASE = process.env.BASE || "http://localhost:3000/api";

type Creds = { username: string; password: string };

const users: Creds[] = [
  { username: "john_customer", password: "password123" },
  { username: "jane_manager", password: "password123" },
  { username: "admin_user", password: "password123" }
];

async function login(c: Creds) {
  const r = await axios.post(`${BASE}/auth/login`, c);
  return r.data.data.token as string;
}

async function view(token: string) {
  const r = await axios.get(`${BASE}/orders/view`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return r.data;
}

async function update(token: string) {
  const r = await axios.put(
    `${BASE}/orders/update`,
    { orderId: 1, status: "shipped" },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return r.data;
}

async function deleteOrder(token: string) {
  const r = await axios.delete(`${BASE}/orders/delete`, {
    headers: { Authorization: `Bearer ${token}` },
    data: { orderId: 2 }
  });
  return r.data;
}

(async () => {
  try {
    console.log("Logging in all users and testing endpoints...\n");

    for (const u of users) {
      const token = await login(u);
      console.log(`${u.username} token: ${token.substring(0, 20)}...`);

      // view
      const viewResp = await view(token);
      console.log(`${u.username} view -> status: ${viewResp.success}`);

      // try update
      try {
        const upd = await update(token);
        console.log(`${u.username} update -> success: ${upd.success}`);
      } catch (err: any) {
        console.log(`${u.username} update -> failed: ${err?.response?.status} ${err?.response?.data?.message}`);
      }

      // try delete
      try {
        const del = await deleteOrder(token);
        console.log(`${u.username} delete -> success: ${del.success}`);
      } catch (err: any) {
        console.log(`${u.username} delete -> failed: ${err?.response?.status} ${err?.response?.data?.message}`);
      }

      console.log("----");
    }

    // Test rate limiting: make 5 quick view requests with customer token (max 4)
    const customerToken = await login({ username: "john_customer", password: "password123" });
    console.log("\nTesting rate limiting (5 quick requests) with john_customer:");
    for (let i = 1; i <= 5; i++) {
      try {
        const r = await view(customerToken);
        console.log(`Request ${i}: OK - remaining header: ${r}`);
      } catch (err: any) {
        console.log(`Request ${i}: Failed - ${err?.response?.status} ${err?.response?.data?.message}`);
      }
    }
  } catch (err) {
    console.error("Demo error:", err);
  }
})();
