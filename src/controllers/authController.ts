import { Request, Response } from "express";
import { validateCredentials, users } from "../data/users";
import { signToken } from "../services/jwtServices";

export const login = (req: Request, res: Response) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ success: false, message: "Missing username or password" });
  }
  const ok = validateCredentials(username, password);
  if (!ok) {
    return res.status(401).json({ success: false, message: "Invalid credentials" });
  }
  const user = users[username];
  const token = signToken({ username: user.username, role: user.role });
  return res.json({
    success: true,
    message: "Login successful",
    data: { token, user: { username: user.username, role: user.role } }
  });
};
