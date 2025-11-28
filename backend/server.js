import express from 'express';
import cors from 'cors';
import pool from './db.js'; // default export

// Import routes
import budgetRoutes from './routes/budgetRoutes.js';
import transactionRoutes from './routes/transactionRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js';

const app = express();

// Middleware
app.use(cors({ origin: '*' })); // allow all origins, or restrict to Vercel domain
app.use(express.json());

// API routes
app.use('/api/budgets', budgetRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/dashboard', dashboardRoutes);

// Health check
app.get('/healthz', (req, res) => res.send('OK'));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
