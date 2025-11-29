import bcrypt from "bcryptjs";
import { User, UserRole } from "../types";

// NOTE: in production we'd use a DB. This is in-memory demo data.
// Passwords: "password123" hashed.
const password = "password123";
const salt = bcrypt.genSaltSync(10);
const passwordHash = bcrypt.hashSync(password, salt);

export const users: Record<string, User> = {
  john_customer: {
    username: "john_customer",
    passwordHash,
    role: UserRole.CUSTOMER
  },
  jane_manager: {
    username: "jane_manager",
    passwordHash,
    role: UserRole.MANAGER
  },
  admin_user: {
    username: "admin_user",
    passwordHash,
    role: UserRole.ADMIN
  }
};

export function validateCredentials(username: string, passwordPlain: string): boolean {
  const user = users[username];
  if (!user) return false;
  return bcrypt.compareSync(passwordPlain, user.passwordHash);
}
