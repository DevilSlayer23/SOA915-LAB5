import express from "express";
import routes from "./routes";
import config from "./config";

const app = express();

app.use(express.json());
app.use((req, res, next) => {
  // Simple request logging
  console.log(`${new Date().toISOString()} ${req.method} ${req.url}`);
  next();
});

app.use("/api", routes);

app.get("/", (req, res) => {
  res.json({ success: true, message: "Order Service API. See /api/auth and /api/orders" });
});

app.use('/info', (req , res) =>{
  res.json({

  })
  
});

app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ success: false, message: "Internal Server Error" });
});

export default app;
