import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import budgetRoutes from './routes/budgetRoutes.js';
import transactionRoutes from './routes/transactionRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js';
import "./db.js";  
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors({ origin: process.env.FRONTEND_URL || '*' }));
app.use(express.json());

// API routes
app.use('/api/budgets', budgetRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/dashboard', dashboardRoutes);

// Serve static files first
app.use(express.static(path.join(__dirname, '../dist')));

// SPA catch-all route using regex
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

// Health check
app.get('/healthz', (req, res) => res.send('OK'));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
