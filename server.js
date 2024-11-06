const express = require("express");
const bodyParser = require("body-parser");
const {
  createCache,
  getCache,
  putCache,
  getCacheAll,
} = require("./controllers/cacheController");

const app = express();

const PORT = 3000;
app.use(bodyParser.json());

// Endpoints

app.post("/api/cache/create", createCache);
app.get("/api/cache", getCache);
app.post("/api/cache", putCache);
app.get("/api/cache/all", getCacheAll);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
