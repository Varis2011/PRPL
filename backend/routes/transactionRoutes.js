import express from "express";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Safer absolute path
const dataPath = path.resolve(__dirname, "../data/transaction.json");

// Ensure data folder + file exist
fs.mkdirSync(path.dirname(dataPath), { recursive: true });
if (!fs.existsSync(dataPath)) fs.writeFileSync(dataPath, "[]");

const readData = () => {
  try {
    const content = fs.readFileSync(dataPath, "utf8");
    return JSON.parse(content || "[]");
  } catch (err) {
    console.error("Error reading transaction data:", err);
    return [];
  }
};

const writeData = (data) => {
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
};

// Routes
router.get("/", (req, res) => {
  res.json(readData());
});

router.post("/", (req, res) => {
  const transactions = readData();
  const newTransaction = {
    id: Date.now(),
    title: req.body.title,
    amount: req.body.amount,
    type: req.body.type,
    category: req.body.category || "Uncategorized",
    description: req.body.description || "",
    attachment: req.body.attachment || null,
    date: req.body.date || new Date().toISOString(),
  };
  transactions.push(newTransaction);
  writeData(transactions);
  res.status(201).json(newTransaction);
});

// DELETE transaction by ID
router.delete("/:id", (req, res) => {
  const transactions = readData();
  const id = Number(req.params.id);
  const filtered = transactions.filter((t) => t.id !== id);

  if (filtered.length === transactions.length) {
    return res.status(404).json({ message: "Transaction not found" });
  }

  writeData(filtered);
  res.json({ message: "Transaction deleted successfully" });
});


export default router;
