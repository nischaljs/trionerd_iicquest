// import { PrismaClient } from '@prisma/client';
// import * as tf from '@tensorflow/tfjs';
// import * as use from '@tensorflow-models/universal-sentence-encoder';
// import { WordTokenizer, PorterStemmer } from 'natural';

// const prisma = new PrismaClient();

// class AIMatchingService {
//   private model: any;
//   private tokenizer: WordTokenizer;

//   constructor() {
//     this.tokenizer = new WordTokenizer();
//   }

//   async initialize() {
//     this.model = await use.load();
//     await tf.ready();
//   }

//   // Preprocess text for matching
//   private preprocessText(text: string): string {
//     if (!text || typeof text !== 'string') return '';

//     // Remove special characters and normalize whitespace
//     const cleaned = text
//       .toLowerCase()
//       .replace(/[^\w\s]/g, ' ')
//       .replace(/\s+/g, ' ')
//       .trim();

//     const tokens = this.tokenizer.tokenize(cleaned);
//     if (!tokens) return '';

//     // Remove stop words and stem
//     const stopWords = [
//       'the',
//       'is',
//       'at',
//       'which',
//       'on',
//       'and',
//       'a',
//       'to',
//       'are',
//       'as',
//       'for',
//       'with',
//       'it',
//     ];
//     const filtered = tokens.filter(
//       (token) => token.length > 2 && !stopWords.includes(token)
//     );

//     const stemmed = filtered.map((token) => PorterStemmer.stem(token));
//     return stemmed.join(' ');
//   }

//   // Calculate similarity between job and freelancer profile
//   async calculateMatchScore(
//     jobDescription: string,
//     freelancerSkills: string[],
//     freelancerBio: string
//   ): Promise<number> {
//     try {
//       const processedJob = this.preprocessText(jobDescription);

//       // Give more weight to skills vs bio
//       const skillsText = freelancerSkills.join(' ');
//       const processedSkills = this.preprocessText(skillsText);
//       const processedBio = this.preprocessText(freelancerBio);

//       // Combine with weighted approach: skills get 70% weight, bio gets 30%
//       const processedProfile = `${processedSkills} ${processedSkills} ${processedBio}`;

//       if (!processedJob || !processedProfile) {
//         return 0;
//       }

//       console.log('Processed job:', processedJob);
//       console.log('Processed profile:', processedProfile);

//       const embeddings = await this.model.embed([
//         processedJob,
//         processedProfile,
//       ]);
//       const jobEmbedding = embeddings.slice([0, 0], [1]);
//       const profileEmbedding = embeddings.slice([1, 0], [1]);

//       const similarity = tf
//         .matMul(jobEmbedding, profileEmbedding, false, true)
//         .dataSync()[0];

//       // Normalize similarity to 0-1 range and add keyword matching bonus
//       const normalizedSimilarity = Math.max(
//         0,
//         Math.min(1, (similarity + 1) / 2)
//       );
//       const keywordBonus = this.calculateKeywordBonus(
//         jobDescription,
//         freelancerSkills
//       );

//       const finalScore = normalizedSimilarity * 0.7 + keywordBonus * 0.3;

//       console.log(
//         'Similarity:',
//         similarity,
//         'Normalized:',
//         normalizedSimilarity,
//         'Keyword bonus:',
//         keywordBonus,
//         'Final:',
//         finalScore
//       );

//       return finalScore;
//     } catch (error) {
//       console.error('Error calculating match score:', error);
//       return 0;
//     }
//   }

//   // Add keyword-based matching as a bonus
//   private calculateKeywordBonus(
//     jobDescription: string,
//     freelancerSkills: string[]
//   ): number {
//     const jobWords = this.preprocessText(jobDescription).split(' ');
//     const skillWords = freelancerSkills
//       .flatMap((skill) => this.preprocessText(skill).split(' '))
//       .filter((word) => word.length > 0);

//     if (jobWords.length === 0 || skillWords.length === 0) return 0;

//     const matches = jobWords.filter((word) => skillWords.includes(word));
//     return matches.length / Math.max(jobWords.length, skillWords.length);
//   }

//   // Get top matched freelancers for a job
//   async getTopFreelancersForJob(
//     jobId: string,
//     limit: number = 5
//   ): Promise<any[]> {
//     const job = await prisma.job.findUnique({
//       where: { id: jobId },
//       select: { description: true, requiredSkills: true, title: true },
//     });

//     if (!job) throw new Error('Job not found');

//     const allFreelancers = await prisma.user.findMany({
//       where: { role: 'STUDENT' },
//       select: { id: true, bio: true, skills: true, name: true },
//     });

//     console.log(
//       `Found ${allFreelancers.length} freelancers to match against job: ${job.title}`
//     );

//     const scoredFreelancers = await Promise.all(
//       allFreelancers.map(async (freelancer) => {
//         const score = await this.calculateMatchScore(
//           `${job.title} ${job.description} ${job.requiredSkills.join(' ')}`,
//           freelancer.skills,
//           freelancer.bio || ''
//         );

//         return {
//           ...freelancer,
//           score: Math.round(score * 100) / 100, // Round to 2 decimal places
//         };
//       })
//     );

//     const sortedFreelancers = scoredFreelancers
//       .sort((a, b) => b.score - a.score)
//       .slice(0, limit);

//     console.log(
//       'Top matches:',
//       sortedFreelancers.map((f) => ({ name: f.name, score: f.score }))
//     );

//     return sortedFreelancers;
//   }

//   // Get recommended jobs for a freelancer
//   async getRecommendedJobsForFreelancer(
//     userId: string,
//     limit: number = 5
//   ): Promise<any[]> {
//     console.log('Looking for user with ID:', userId);

//     const freelancer = await prisma.user.findUnique({
//       where: { id: userId },
//       select: {
//         bio: true,
//         skills: true,
//         role: true,
//         name: true,
//       },
//     });

//     if (!freelancer) {
//       throw new Error(`User with ID ${userId} not found`);
//     }

//     if (freelancer.role !== 'STUDENT') {
//       throw new Error(
//         `User ${userId} is not a student/freelancer (role: ${freelancer.role})`
//       );
//     }

//     const allJobs = await prisma.job.findMany({
//       where: { status: 'OPEN' },
//       select: {
//         id: true,
//         description: true,
//         requiredSkills: true,
//         title: true,
//       },
//     });

//     console.log(
//       `Found ${allJobs.length} open jobs to match for ${freelancer.name}`
//     );

//     const scoredJobs = await Promise.all(
//       allJobs.map(async (job) => {
//         const score = await this.calculateMatchScore(
//           `${job.title} ${job.description} ${job.requiredSkills.join(' ')}`,
//           freelancer.skills,
//           freelancer.bio || ''
//         );

//         return {
//           ...job,
//           score: Math.round(score * 100) / 100,
//         };
//       })
//     );

//     const sortedJobs = scoredJobs
//       .sort((a, b) => b.score - a.score)
//       .slice(0, limit);

//     console.log(
//       'Top job matches:',
//       sortedJobs.map((j) => ({ title: j.title, score: j.score }))
//     );

//     return sortedJobs;
//   }
// }

// // Initialize singleton instance
// const aiMatchingService = new AIMatchingService();
// aiMatchingService.initialize(); // Call this during app startup

// export default aiMatchingService;
