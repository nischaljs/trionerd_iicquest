import cors from 'cors';
import express from 'express';
import { errorHandler } from './middlewares/errorHandler';
import routes from './routes';
import prisma from './utils/prisma';
import cookieParser from 'cookie-parser'
const app = express();

// Middleware
app.use(cors());
app.use(cookieParser() as any);
app.use(express.json());
app.use(
  express.json({
    verify: (req, res, buf) => {
      if (
        buf.length === 0 &&
        req.headers['content-type']?.includes('application/json')
      ) {
        throw new Error('Empty JSON body');
      }
    },
  })
);

// Routes
app.use('/api', routes);

// Error handling middleware (should be last)
app.use(errorHandler);

async function startServer() {
  try {
    await prisma.$runCommandRaw({ ping: 1 });
    console.log('✅ [INFO] Prisma connected to MongoDB');

    app.listen(3000, () => {
      console.log('🚀 [INFO] Server running on http://localhost:3000');
    });
  } catch (error) {
    console.error('❌ [ERROR] Could not connect to the database:', error);
    process.exit(1);
  }
}

startServer();
