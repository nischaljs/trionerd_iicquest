import { Request, Response } from 'express';
import prisma from '../utils/prisma';

// Get all workshops with optional filters
export const getAllWorkshops = async (req: Request, res: Response) => {
  try {
    const { skill, hostId, priceRange, minRating } = req.query;
    
    const where: any = {};
    if (skill) where.skillsTaught = { has: skill as string };
    if (hostId) where.hostId = hostId as string;
    if (priceRange) {
      const [min, max] = (priceRange as string).split('-');
      where.price = {
        gte: parseFloat(min),
        lte: parseFloat(max)
      };
    }

    const workshops = await prisma.workshop.findMany({
      where,
      include: {
        host: {
          select: {
            id: true,
            name: true,
            profilePic: true,
            badges: {
              include: {
                badge: true
              }
            }
          }
        },
        attendees: {
          select: {
            user: {
              select: {
                id: true,
                name: true,
                profilePic: true
              }
            }
          }
        },
        reviews: true
      }
    });

    // Filter by minimum rating if provided
    let filteredWorkshops = workshops;
    if (minRating) {
      filteredWorkshops = workshops.filter(workshop => {
        const avgRating = workshop.reviews.reduce((sum, review) => sum + review.rating, 0) / workshop.reviews.length;
        return avgRating >= parseInt(minRating as string);
      });
    }

    res.json(filteredWorkshops);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching workshops', error });
  }
};

// Get workshop by ID
export const getWorkshopById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const workshop = await prisma.workshop.findUnique({
      where: { id },
      include: {
        host: {
          select: {
            id: true,
            name: true,
            profilePic: true,
            bio: true,
            badges: {
              include: {
                badge: true
              }
            }
          }
        },
        attendees: {
          select: {
            user: {
              select: {
                id: true,
                name: true,
                profilePic: true
              }
            }
          }
        },
        reviews: {
          include: {
            reviewer: {
              select: {
                id: true,
                name: true,
                profilePic: true
              }
            }
          }
        }
      }
    });

    if (!workshop) {
      return res.status(404).json({ message: 'Workshop not found' });
    }

    // Calculate average rating
    const avgRating = workshop.reviews.length > 0 
      ? workshop.reviews.reduce((sum, review) => sum + review.rating, 0) / workshop.reviews.length
      : 0;

    res.json({ ...workshop, avgRating });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching workshop', error });
  }
};

// Create new workshop
export const createWorkshop = async (req: Request, res: Response) => {
  try {
    const { title, description, zoomLink, price, skillsTaught } = req.body;
    const hostId = (req as any).user.id; // From auth middleware

    const workshop = await prisma.workshop.create({
      data: {
        title,
        description,
        zoomLink,
        price: parseFloat(price),
        skillsTaught,
        hostId
      }
    });

    res.status(201).json(workshop);
  } catch (error) {
    res.status(500).json({ message: 'Error creating workshop', error });
  }
};

// Update workshop
export const updateWorkshop = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, description, zoomLink, price, skillsTaught } = req.body;
    const userId = (req as any).user.id;

    // Check if user is the host
    const workshop = await prisma.workshop.findUnique({
      where: { id },
      select: { hostId: true }
    });

    if (!workshop) {
      return res.status(404).json({ message: 'Workshop not found' });
    }

    if (workshop.hostId !== userId) {
      return res.status(403).json({ message: 'Not authorized to update this workshop' });
    }

    const updatedWorkshop = await prisma.workshop.update({
      where: { id },
      data: {
        title,
        description,
        zoomLink,
        price: price ? parseFloat(price) : undefined,
        skillsTaught
      }
    });

    res.json(updatedWorkshop);
  } catch (error) {
    res.status(500).json({ message: 'Error updating workshop', error });
  }
};

// Delete workshop
export const deleteWorkshop = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = (req as any).user.id;

    // Check if user is the host
    const workshop = await prisma.workshop.findUnique({
      where: { id },
      select: { hostId: true }
    });

    if (!workshop) {
      return res.status(404).json({ message: 'Workshop not found' });
    }

    if (workshop.hostId !== userId) {
      return res.status(403).json({ message: 'Not authorized to delete this workshop' });
    }

    // Use transaction to delete related records
    await prisma.$transaction([
      prisma.review.deleteMany({ where: { workshopId: id } }),
      prisma.userWorkshop.deleteMany({ where: { workshopId: id } }),
      prisma.workshop.delete({ where: { id } })
    ]);

    res.json({ message: 'Workshop deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting workshop', error });
  }
};

// Register for workshop
export const registerForWorkshop = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = (req as any).user.id;

    // Check if workshop exists
    const workshop = await prisma.workshop.findUnique({
      where: { id }
    });

    if (!workshop) {
      return res.status(404).json({ message: 'Workshop not found' });
    }

    // Check if already registered
    const existingRegistration = await prisma.userWorkshop.findFirst({
      where: {
        userId,
        workshopId: id
      }
    });

    if (existingRegistration) {
      return res.status(400).json({ message: 'Already registered for this workshop' });
    }

    // Register user
    await prisma.userWorkshop.create({
      data: {
        userId,
        workshopId: id
      }
    });

    res.json({ message: 'Successfully registered for workshop' });
  } catch (error) {
    res.status(500).json({ message: 'Error registering for workshop', error });
  }
};

// Get workshop attendees
export const getWorkshopAttendees = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = (req as any).user.id;

    // Check if user is the host or admin
    const workshop = await prisma.workshop.findUnique({
      where: { id },
      select: { hostId: true }
    });

    if (!workshop) {
      return res.status(404).json({ message: 'Workshop not found' });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { role: true }
    });

    if (workshop.hostId !== userId && user?.role !== 'ADMIN') {
      return res.status(403).json({ message: 'Not authorized to view attendees' });
    }

    const attendees = await prisma.userWorkshop.findMany({
      where: { workshopId: id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            profilePic: true,
            email: true,
            skills: true
          }
        }
      }
    });

    res.json(attendees);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching attendees', error });
  }
};

// Get workshop reviews
export const getWorkshopReviews = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const reviews = await prisma.review.findMany({
      where: { 
        workshopId: id
      },
      include: {
        reviewer: {
          select: {
            id: true,
            name: true,
            profilePic: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching reviews', error });
  }
};

// Add workshop review
export const addWorkshopReview = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { rating, comment } = req.body;
    const userId = (req as any).user.id;

    // Check if user has attended the workshop
    const attendance = await prisma.userWorkshop.findFirst({
      where: {
        userId,
        workshopId: id
      }
    });

    if (!attendance) {
      return res.status(403).json({ message: 'Must attend workshop to review' });
    }

    // Check if already reviewed
    const existingReview = await prisma.review.findFirst({
      where: {
        workshopId: id,
        reviewerId: userId
      }
    });

    if (existingReview) {
      return res.status(400).json({ message: 'Already reviewed this workshop' });
    }

    const review = await prisma.review.create({
      data: {
        rating: parseInt(rating),
        comment,
        workshopId: id,
        reviewerId: userId
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

    // Check if host qualifies for a badge
    const workshop = await prisma.workshop.findUnique({
      where: { id },
      select: { hostId: true }
    });

    if (workshop) {
      const hostReviews = await prisma.review.count({
        where: {
          workshop: {
            hostId: workshop.hostId
          },
          rating: 5
        }
      });

      if (hostReviews >= 10) {
        const guruBadge = await prisma.badge.findFirst({
          where: { name: 'GURU' }
        });

        if (guruBadge) {
          await prisma.userBadge.upsert({
            where: {
              userId_badgeId: {
                userId: workshop.hostId,
                badgeId: guruBadge.id
              }
            },
            create: {
              userId: workshop.hostId,
              badgeId: guruBadge.id
            },
            update: {}
          });
        }
      }
    }

    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ message: 'Error adding review', error });
  }
};

// Get personalized workshop suggestions
export const getWorkshopSuggestions = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;

    // Get user's skills and attended workshops
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        skills: true,
        workshopsAttended: {
          select: {
            workshopId: true
          }
        }
      }
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Find workshops matching user's skills that they haven't attended
    const suggestedWorkshops = await prisma.workshop.findMany({
      where: {
        skillsTaught: {
          hasSome: user.skills
        },
        id: {
          notIn: user.workshopsAttended.map(w => w.workshopId)
        }
      },
      include: {
        host: {
          select: {
            id: true,
            name: true,
            profilePic: true,
            badges: {
              include: {
                badge: true
              }
            }
          }
        },
        reviews: true,
        _count: {
          select: {
            attendees: true
          }
        }
      },
      orderBy: {
        attendees: {
          _count: 'desc'
        }
      },
      take: 5
    });

    // Calculate average ratings
    const workshopsWithRatings = suggestedWorkshops.map(workshop => {
      const avgRating = workshop.reviews.length > 0
        ? workshop.reviews.reduce((sum, review) => sum + review.rating, 0) / workshop.reviews.length
        : 0;
      return {
        ...workshop,
        avgRating,
        attendeesCount: workshop._count.attendees
      };
    });

    res.json(workshopsWithRatings);
  } catch (error) {
    res.status(500).json({ message: 'Error getting suggestions', error });
  }
};