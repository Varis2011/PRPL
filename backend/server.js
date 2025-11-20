// backend/server.js
import express from 'express';
import cors from 'cors';
import path from 'path';
import budgetRoutes from './routes/budgetRoutes.js';
import transactionRoutes from './routes/transactionRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js';

const app = express();

// CORS (adjust FRONTEND_URL in production)
app.use(cors({ origin: process.env.FRONTEND_URL || '*' }));
app.use(express.json());

// API routes
app.use('/api/budgets', budgetRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/dashboard', dashboardRoutes);

// Serve Vite build front-end (dist is at project root)
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, '../dist')));

// Catch-all for SPA routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

// Health check
app.get('/healthz', (req, res) => res.send('OK'));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
