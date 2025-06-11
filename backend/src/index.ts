import express from 'express';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();
app.use(express.json());

app.get('/users', async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

app.post('/users', async (req, res) => {
  const { name, email } = req.body;
  const user = await prisma.user.create({ data: { name, email } });
  res.json(user);
});

async function startServer() {
  try {
    await prisma.$runCommandRaw({ ping: 1 }); // ✅ New MongoDB ping method
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
