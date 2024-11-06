const LRUCache = require("../LRUCache");

let lruCache = null;

// API to create a new Cache with Dyanmic Capacity

// POST /api/cache/create
const createCache = (req, res) => {
  const { capacity } = req.body;

  if (!capacity || isNaN(capacity) || capacity <= 0) {
    return res.status(400).json({
      message: `Invalid Capacity,Please Provide a valid number`,
    });
  }

  lruCache = new LRUCache(Number(capacity));
  res
    .status(200)
    .json({ message: `LRU Cache created with a capacity of ${capacity}` });
};

// GET /api/cache/:key
const getCache = (req, res) => {
  if (!lruCache) {
    return res
      .status(400)
      .json({ message: "Cache is not intialized, Please intiliaze it!" });
  }
  const { key } = req.body;

  const value = lruCache.get(key);
  if (value != null) {
    res.json({ key, value });
  } else {
    res.status(400).json({ message: "key not found!" });
  }
};

// POST /api/cache - Insert a key-value pair
const putCache = (req, res) => {
  if (!lruCache) {
    return res
      .status(400)
      .json({ message: "Cache is not intialized, Please intiliaze it!" });
  }
  const { key, value } = req.body;

  if (key === undefined || value === undefined) {
    return res.status(400).json({ message: "Key and value are required" });
  }
  lruCache.put(key, value);
  res.json({ message: "Key-Value pair added successfully" });
};

const getCacheAll = (req, res) => {
  if (!lruCache) {
    return res
      .status(400)
      .json({ message: "Cache is not intialized, Please intiliaze it!" });
  }

  res.json({ cache: lruCache.getCache() });
};
module.exports = { putCache, getCache, getCacheAll, createCache };
