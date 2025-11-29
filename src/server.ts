import app from "./app";
import config from "./config";

const port = config.port;

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port} (env: ${process.env.NODE_ENV || "development"})`);
});
