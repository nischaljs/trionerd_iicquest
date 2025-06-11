// working but less accuracy
// import { NextFunction, Request, Response } from 'express';
// import aiMatchingService from '../services/aiMatchingService';
// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

// class AIController {
//   async getJobRecommendations(req: Request, res: Response) {
//     try {
//       const userId = req.user.id;
//       const limit = parseInt(req.query.limit as string) || 5;

//       const jobs = await aiMatchingService.getRecommendedJobsForFreelancer(
//         userId,
//         limit
//       );
//       res.json(jobs);
//     } catch (error: any) {
//       res.status(500).json({ error: error.message });
//     }
//   }

//   async getTopFreelancersForJob(req: Request, res: Response) {
//     try {
//       const jobId = req.params.jobId;
//       const limit = parseInt(req.query.limit as string) || 5;

//       if (!req.user.roles.includes('EMPLOYER')) {
//         return res
//           .status(403)
//           .json({ error: 'Only employers can access this feature' });
//       }

//       const freelancers = await aiMatchingService.getTopFreelancersForJob(
//         jobId,
//         limit
//       );
//       res.json(freelancers);
//     } catch (error: any) {
//       res.status(500).json({ error: error.message });
//     }
//   }

//   async autoMatchJob(req: Request, res: Response) {
//     try {
//       const jobId = req.params.jobId;

//       if (!req.user.roles.includes('EMPLOYER')) {
//         return res
//           .status(403)
//           .json({ error: 'Only employers can access this feature' });
//       }

//       // Get top 3 matches
//       const topFreelancers = await aiMatchingService.getTopFreelancersForJob(
//         jobId,
//         3
//       );

//       // Create applications for top matches (simulating them applying)
//       await Promise.all(
//         topFreelancers.map(async (freelancer) => {
//           const existingApplication = await prisma.application.findFirst({
//             where: { jobId, studentId: freelancer.id },
//           });

//           if (!existingApplication) {
//             await prisma.application.create({
//               data: {
//                 jobId,
//                 studentId: freelancer.id,
//                 proposal: `AI-generated application based on your profile matching (Score: ${freelancer.score.toFixed(
//                   2
//                 )})`,
//                 status: 'PENDING',
//               },
//             });
//           }
//         })
//       );

//       res.json({
//         message:
//           'Top freelancers have been automatically matched and applications created',
//         matchedFreelancers: topFreelancers.length,
//       });
//     } catch (error: any) {
//       res.status(500).json({ error: error.message });
//     }
//   }

//   async getRecommendedWorkshops(
//     req: Request,
//     res: Response,
//     next: NextFunction
//   ) {
//     try {
//       const userId = req.params.id;
//       const user = await prisma.user.findUnique({
//         where: { id: userId },
//         select: { skills: true },
//       });

//       if (!user) return res.status(404).json({ error: 'User not found' });

//       const allWorkshops = await prisma.workshop.findMany({
//         select: { id: true, skillsTaught: true, title: true },
//       });

//       const recommended = allWorkshops.filter((workshop) =>
//         workshop.skillsTaught.some((skill) => !user.skills.includes(skill))
//       );

//       res.status(200).json({ status: 'success', data: recommended });
//     } catch (error) {
//       next(error);
//     }
//   }
// }

// export default new AIController();
