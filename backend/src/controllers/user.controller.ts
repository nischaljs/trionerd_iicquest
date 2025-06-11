import { Request, Response, NextFunction } from 'express';
import prisma from '../utils/prisma';
import bcrypt from "bcrypt";
import { AppError } from '../middlewares/errorHandler';

const client = prisma;

import { generateToken } from '../utils/jwt.util';
//register user
export const registerUser = async (req: Request, res: Response) => {
  const { email, password, name, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
      role,
    },
  });

  // const token = generateToken({ id: user.id, role: user.role });

  res.status(201).json({ user });
};
//login user
export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return res.status(404).json({ error: 'User not found' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

  const token = generateToken({ id: user.id, role: user.role });
  res.status(200).json({ token, user });
};
//get user profile 
export const getProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ error: 'Unauthorized' });

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        badges: { include: { badge: true } },
        reviews: { include: { reviewer: true } },
      },
    });

    if (!user) return res.status(404).json({ error: 'User not found' });

    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};



export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await client.user.findMany();
    res.status(200).json({
      status: 'success',
      data: users,
    });
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await client.user.findUnique({
      where: { id: req.params.id },
    });

    if (!user) {
      throw new AppError('User not found', 404);
    }

    res.status(200).json({
      status: 'success',
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await client.user.create({
      data: req.body,
    });

    res.status(201).json({
      status: 'success',
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await client.user.update({
      where: { id: req.params.id },
      data: req.body,
    });

    res.status(200).json({
      status: 'success',
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await client.user.delete({
      where: { id: req.params.id },
    });

    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (error) {
    next(error);
  }
};

export const getUserHostedWorkshops = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const workshops = await client.workshop.findMany({
      where: { hostId: req.params.id },
    });

    res.status(200).json({
      status: 'success',
      data: workshops,
    });
  } catch (error) {
    next(error);
  }
};

export const getUserAttendedWorkshops = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userWorkshops = await client.userWorkshop.findMany({
      where: { userId: req.params.id },
      include: { workshop: true },
    });

    res.status(200).json({
      status: 'success',
      data: userWorkshops.map((uw: any) => uw.workshop),
    });
  } catch (error) {
    next(error);
  }
};

export const getUserBadges = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const badges = await client.userBadge.findMany({
      where: { userId: req.params.id },
      include: { badge: true },
    });

    res.status(200).json({
      status: 'success',
      data: badges,
    });
  } catch (error) {
    next(error);
  }
};

export const getUserJobReviews = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const reviews = await client.review.findMany({
      where: { 
        targetId: req.params.id,
        type: 'JOB'
      },
      include: {
        reviewer: {
          select: {
            id: true,
            name: true,
            profilePic: true
          }
        }
      }
    });

    res.status(200).json({
      status: 'success',
      data: reviews,
    });
  } catch (error) {
    next(error);
  }
};

export const getUserWorkshopReviews = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const reviews = await client.review.findMany({
      where: { 
        targetId: req.params.id,
        type: 'WORKSHOP'
      },
      include: {
        reviewer: {
          select: {
            id: true,
            name: true,
            profilePic: true
          }
        }
      }
    });

    res.status(200).json({
      status: 'success',
      data: reviews,
    });
  } catch (error) {
    next(error);
  }
}; 