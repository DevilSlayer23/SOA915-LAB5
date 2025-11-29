import { Request, Response } from "express";

/**
 * Dummy orders store (in-memory)
 */
let orders = [
  { id: 1, item: "Widget A", status: "processing", customer: "john_customer" },
  { id: 2, item: "Widget B", status: "processing", customer: "john_customer" }
];

export const viewOrders = (req: Request, res: Response) => {
  const username = req.user?.username ?? "anonymous";
  const role = req.user?.role ?? "unknown";
  return res.json({
    success: true,
    message: "Orders retrieved successfully",
    data: { orders, accessedBy: username, role }
  });
};

export const updateOrder = (req: Request, res: Response) => {
  const { orderId, status } = req.body;
  if (!orderId || !status) {
    return res.status(400).json({ success: false, message: "orderId and status required" });
  }
  const idx = orders.findIndex((o) => o.id === Number(orderId));
  if (idx === -1) return res.status(404).json({ success: false, message: "Order not found" });
  orders[idx].status = status;
  return res.json({ success: true, message: "Order updated", data: orders[idx] });
};

export const deleteOrder = (req: Request, res: Response) => {
  const { orderId } = req.body;
  if (!orderId) {
    return res.status(400).json({ success: false, message: "orderId required" });
  }
  const idx = orders.findIndex((o) => o.id === Number(orderId));
  if (idx === -1) return res.status(404).json({ success: false, message: "Order not found" });
  const removed = orders.splice(idx, 1)[0];
  return res.json({ success: true, message: "Order deleted", data: removed });
};
