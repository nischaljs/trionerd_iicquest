import { Request, Response } from 'express';
import prisma from '../utils/prisma';
import { calculateSimilarityScore, sortBySimilarity } from '../utils/recommendation';

// Helper function to validate MongoDB ObjectId
const isValidObjectId = (id: string): boolean => {
  return /^[0-9a-fA-F]{24}$/.test(id);
};

// Helper function for user-friendly error messages
const createError = (res: Response, message: string, code: string, status: number = 400) => {
  return res.status(status).json({
    status: 'error',
    code,
    message,
    timestamp: new Date().toISOString()
  });
};

// Get all jobs with optional filters
export const getAllJobs = async (req: Request, res: Response) => {
  try {
    const { 
      skill, 
      employerId, 
      type,
      location,
      status = 'OPEN'
    } = req.query;
    
    const where: any = {
      status: status as string
    };
    
    if (skill) where.requiredSkills = { has: skill as string };
    if (employerId) where.employerId = employerId as string;
    if (type) where.type = type as string;
    if (location) where.location = location as string;

    const jobs = await prisma.job.findMany({
      where,
      include: {
        employer: {
          select: {
            id: true,
            name: true,
            profilePic: true
          }
        },
        applications: {
          select: {
            id: true,
            status: true
          }
        },
        contracts: {
          select: {
            id: true,
            status: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    res.json({
      status: 'success',
      data: jobs
    });
  } catch (error) {
    createError(res, 'Failed to fetch jobs', 'FETCH_JOBS_ERROR', 500);
  }
};

// Get job by ID
export const getJobById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    if (!isValidObjectId(id)) {
      return createError(res, 'Invalid job ID format', 'INVALID_JOB_ID');
    }

    const job = await prisma.job.findUnique({
      where: { id },
      include: {
        employer: {
          select: {
            id: true,
            name: true,
            profilePic: true,
            bio: true
          }
        },
        applications: {
          include: {
            student: {
              select: {
                id: true,
                name: true,
                profilePic: true,
                skills: true,
                badges: {
                  include: {
                    badge: true
                  }
                }
              }
            }
          }
        },
        contracts: {
          include: {
            student: {
              select: {
                id: true,
                name: true,
                profilePic: true,
                skills: true
              }
            }
          }
        }
      }
    });

    if (!job) {
      return createError(res, 'Job not found', 'JOB_NOT_FOUND', 404);
    }

    res.json({
      status: 'success',
      data: job
    });
  } catch (error) {
    createError(res, 'Failed to fetch job details', 'FETCH_JOB_ERROR', 500);
  }
};

// Create new job
export const createJob = async (req: Request, res: Response) => {
  try {
    const { 
      title, 
      subtitle,
      description, 
      requiredSkills, 
      tags, 
      type, 
      location,
      locationType,
      budget 
    } = req.body;
    const employerId = (req as any).user.id;

    // Input validation
    if (!title?.trim()) {
      return createError(res, 'Job title is required', 'MISSING_TITLE');
    }
    if (!description?.trim()) {
      return createError(res, 'Job description is required', 'MISSING_DESCRIPTION');
    }
    if (!requiredSkills?.length) {
      return createError(res, 'At least one required skill is needed', 'MISSING_SKILLS');
    }
    if (!tags?.length) {
      return createError(res, 'At least one tag is required', 'MISSING_TAGS');
    }
    if (!type) {
      return createError(res, 'Job type is required', 'MISSING_TYPE');
    }
    if (!location) {
      return createError(res, 'Job location is required', 'MISSING_LOCATION');
    }
    if (!locationType) {
      return createError(res, 'Location type is required', 'MISSING_LOCATION_TYPE');
    }

    const job = await prisma.job.create({
      data: {
        title,
        subtitle,
        description,
        requiredSkills,
        tags,
        type,
        location,
        locationType,
        budget,
        status: 'OPEN',
        employerId,
        postedTime: 'Just now',
        proposals: 0
      }
    });

    res.status(201).json({
      status: 'success',
      message: 'Job created successfully',
      data: job
    });
  } catch (error) {
    createError(res, 'Failed to create job', 'CREATE_JOB_ERROR', 500);
  }
};

// Update job
export const updateJob = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { 
      title, 
      subtitle,
      description, 
      requiredSkills, 
      tags, 
      type, 
      location,
      locationType,
      budget,
      status 
    } = req.body;
    const userId = (req as any).user.id;

    if (!isValidObjectId(id)) {
      return createError(res, 'Invalid job ID format', 'INVALID_JOB_ID');
    }

    // Check if user is the employer
    const job = await prisma.job.findUnique({
      where: { id },
      select: { employerId: true, status: true }
    });

    if (!job) {
      return createError(res, 'Job not found', 'JOB_NOT_FOUND', 404);
    }

    if (job.employerId !== userId) {
      return createError(res, 'You are not authorized to update this job', 'UNAUTHORIZED_EMPLOYER', 403);
    }

    // Validate status transition
    if (status && status !== job.status) {
      if (!['OPEN', 'CLOSED', 'DRAFT'].includes(status)) {
        return createError(res, 'Invalid job status', 'INVALID_STATUS');
      }
    }

    const updatedJob = await prisma.job.update({
      where: { id },
      data: {
        title,
        subtitle,
        description,
        requiredSkills,
        tags,
        type,
        location,
        locationType,
        budget,
        status
      }
    });

    res.json({
      status: 'success',
      message: 'Job updated successfully',
      data: updatedJob
    });
  } catch (error) {
    createError(res, 'Failed to update job', 'UPDATE_JOB_ERROR', 500);
  }
};

// Delete job
export const deleteJob = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = (req as any).user.id;

    if (!isValidObjectId(id)) {
      return createError(res, 'Invalid job ID format', 'INVALID_JOB_ID');
    }

    // Check if user is the employer
    const job = await prisma.job.findUnique({
      where: { id },
      select: { employerId: true }
    });

    if (!job) {
      return createError(res, 'Job not found', 'JOB_NOT_FOUND', 404);
    }

    if (job.employerId !== userId) {
      return createError(res, 'You are not authorized to delete this job', 'UNAUTHORIZED_EMPLOYER', 403);
    }

    // Use transaction to delete related records
    await prisma.$transaction([
      prisma.application.deleteMany({ where: { jobId: id } }),
      prisma.contract.deleteMany({ where: { jobId: id } }),
      prisma.job.delete({ where: { id } })
    ]);

    res.json({
      status: 'success',
      message: 'Job and related records deleted successfully'
    });
  } catch (error) {
    createError(res, 'Failed to delete job', 'DELETE_JOB_ERROR', 500);
  }
};

// Get job applications
export const getJobApplications = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.query;
    const userId = (req as any).user.id;

    if (!isValidObjectId(id)) {
      return createError(res, 'Invalid job ID format', 'INVALID_JOB_ID');
    }

    // Check if user is the employer
    const job = await prisma.job.findUnique({
      where: { id },
      select: { employerId: true }
    });

    if (!job) {
      return createError(res, 'Job not found', 'JOB_NOT_FOUND', 404);
    }

    if (job.employerId !== userId) {
      return createError(res, 'You are not authorized to view these applications', 'UNAUTHORIZED_EMPLOYER', 403);
    }

    const where: any = { jobId: id };
    if (status) where.status = status;

    const applications = await prisma.application.findMany({
      where,
      include: {
        student: {
          select: {
            id: true,
            name: true,
            profilePic: true,
            skills: true,
            bio: true,
            badges: {
              include: {
                badge: true
              }
            }
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    res.json({
      status: 'success',
      data: applications
    });
  } catch (error) {
    createError(res, 'Failed to fetch applications', 'FETCH_APPLICATIONS_ERROR', 500);
  }
};

// Get job contracts
export const getJobContracts = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.query;
    const userId = (req as any).user.id;

    if (!isValidObjectId(id)) {
      return createError(res, 'Invalid job ID format', 'INVALID_JOB_ID');
    }

    // Check if user is the employer
    const job = await prisma.job.findUnique({
      where: { id },
      select: { employerId: true }
    });

    if (!job) {
      return createError(res, 'Job not found', 'JOB_NOT_FOUND', 404);
    }

    if (job.employerId !== userId) {
      return createError(res, 'You are not authorized to view these contracts', 'UNAUTHORIZED_EMPLOYER', 403);
    }

    const where: any = { jobId: id };
    if (status) where.status = status;

    const contracts = await prisma.contract.findMany({
      where,
      include: {
        student: {
          select: {
            id: true,
            name: true,
            profilePic: true,
            skills: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    res.json({
      status: 'success',
      data: contracts
    });
  } catch (error) {
    createError(res, 'Failed to fetch contracts', 'FETCH_CONTRACTS_ERROR', 500);
  }
};

// Get personalized job suggestions
export const getJobSuggestions = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const limit = parseInt(req.query.limit as string) || 10;
    const minSimilarity = 0.01; // Lower threshold to 1% to ensure some recommendations

    // Get user with skills and badges
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        badges: {
          include: {
            badge: true
          }
        },
        applications: {
          select: {
            jobId: true,
            status: true
          }
        }
      }
    });

    if (!user) {
      return createError(res, 'User not found', 'USER_NOT_FOUND', 404);
    }

    // Get all open jobs that haven't been completed or are in progress
    const jobs = await prisma.job.findMany({
      where: {
        status: 'OPEN',
        NOT: {
          OR: [
            {
              contracts: {
                some: {
                  OR: [
                    { status: 'ACTIVE' },
                    { status: 'COMPLETED' }
                  ]
                }
              }
            },
            {
              applications: {
                some: {
                  studentId: userId,
                  status: 'ACCEPTED'
                }
              }
            }
          ]
        }
      },
      include: {
        employer: {
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
        applications: {
          select: {
            id: true,
            status: true
          }
        },
        contracts: {
          select: {
            id: true,
            status: true
          }
        }
      }
    });

    // Calculate similarity scores for each job
    const jobsWithScores = jobs.map(job => {
      const hasAppliedBefore = user.applications.some(app => app.jobId === job.id);
      const similarity = calculateSimilarityScore(
        user.skills,
        job.requiredSkills,
        user.badges,
        hasAppliedBefore
      );

      return {
        ...job,
        similarity,
        debug: {
          userSkills: user.skills,
          jobSkills: job.requiredSkills,
          hasAppliedBefore,
          badgeCount: user.badges.length,
          status: job.status,
          applications: job.applications.length,
          activeContracts: job.contracts.filter(c => c.status === 'ACTIVE').length
        }
      };
    });

    // Filter out jobs with zero similarity and sort by similarity score
    const filteredJobs = jobsWithScores
      .filter(job => job.similarity.score >= minSimilarity)
      .sort((a, b) => b.similarity.score - a.similarity.score)
      .slice(0, limit);

    res.json({
      status: 'success',
      data: filteredJobs,
      meta: {
        total: filteredJobs.length,
        minSimilarity,
        limit,
        totalJobs: jobs.length,
        userSkills: user.skills,
        userBadges: user.badges.map(b => b.badge.tier)
      }
    });
  } catch (error) {
    createError(res, 'Failed to get job suggestions', 'GET_SUGGESTIONS_ERROR', 500);
  }
};

// Apply for a job
export const applyForJob = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = (req as any).user.id;

    if (!isValidObjectId(id)) {
      return createError(res, 'Invalid job ID format', 'INVALID_JOB_ID');
    }

    // Check if job exists and is open
    const job = await prisma.job.findUnique({
      where: { id },
      select: { 
        id: true,
        status: true,
        employerId: true
      }
    });

    if (!job) {
      return createError(res, 'Job not found', 'JOB_NOT_FOUND', 404);
    }

    if (job.status !== 'OPEN') {
      return createError(res, 'This job is no longer accepting applications', 'JOB_CLOSED');
    }

    // Check if user has already applied
    const existingApplication = await prisma.application.findFirst({
      where: {
        jobId: id,
        studentId: userId
      }
    });

    if (existingApplication) {
      return createError(res, 'You have already applied for this job', 'DUPLICATE_APPLICATION');
    }

    // Create application
    const application = await prisma.application.create({
      data: {
        jobId: id,
        studentId: userId,
        status: 'PENDING',
        proposal: req.body.proposal || 'No proposal provided'
      },
      include: {
        job: {
          select: {
            title: true,
            employer: {
              select: {
                name: true
              }
            }
          }
        }
      }
    });

    res.status(201).json({
      status: 'success',
      message: 'Application submitted successfully',
      data: application
    });
  } catch (error) {
    createError(res, 'Failed to submit application', 'APPLICATION_ERROR', 500);
  }
}; 