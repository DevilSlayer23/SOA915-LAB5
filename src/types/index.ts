export enum UserRole {
  CUSTOMER = "customer",
  MANAGER = "manager",
  ADMIN = "admin"
}

export interface User {
  username: string;
  passwordHash: string; // bcrypt hash
  role: UserRole;
}

export interface JwtPayload {
  username: string;
  role: UserRole;
}
