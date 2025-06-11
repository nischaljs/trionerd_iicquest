import { Request, Response, NextFunction } from 'express';
import prisma from '../utils/prisma';
import { AppError } from '../middlewares/errorHandler';

const client = prisma;

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