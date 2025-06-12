import { PrismaClient, BadgeTier, WorkshopStatus, ProjectDifficulty, ProjectStatus, JobStatus, JobType, DisputeStatus } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
};

// Constants for reusability
const USER_CREDENTIALS = {
  admin: 'admin@chalkbox.com',
  employer: 'employer@chalkbox.com',
  startup: 'startup@chalkbox.com',
  students: [
    'ram@chalkbox.com',
    'sita@chalkbox.com',
    'hari@chalkbox.com',
    'gita@chalkbox.com',
    'sanjay@chalkbox.com',
  ],
};
const PASSWORD = 'password123';

async function main() {
  // Clear existing dataeyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4NDllYWY4Zjg5NTk0Y2E1NmFmYzU5ZSIsInJvbGUiOiJTVFVERU5UIiwiaWF0IjoxNzQ5Njc0NzgzLCJleHAiOjE3NDk5MzM5ODN9.Wrv9v1kuP7gl_2f5qNcCYNRWti9tRbDTkGnOJPa1jC8
  await prisma.$transaction([
    prisma.review.deleteMany(),
    prisma.userWorkshop.deleteMany(),
    prisma.contract.deleteMany(),
    prisma.application.deleteMany(),
    prisma.job.deleteMany(),
    prisma.openSourceProject.deleteMany(),
    prisma.userBadge.deleteMany(),
    prisma.badge.deleteMany(),
    prisma.workshop.deleteMany(),
    prisma.user.deleteMany(),
  ]);

  const hashedPassword = await bcrypt.hash(PASSWORD, 10);

  // Create badges
  const badgeData = [
    { name: 'GURU', description: 'Master of teaching with excellent reviews', tier: BadgeTier.GURU },
    { name: 'SIKSHA_SEVI', description: 'Dedicated to learning and teaching', tier: BadgeTier.SIKSHA_SEVI },
    { name: 'SHIKSHARTHI', description: 'Active learner in the community', tier: BadgeTier.SHIKSHARTHI },
    { name: 'ACHARYA', description: 'Expert in their field with proven track record', tier: BadgeTier.ACHARYA },
    { name: 'UTSAAHI_INTERN', description: 'Enthusiastic intern ready to learn', tier: BadgeTier.UTSAAHI_INTERN }
  ];

  const badges = await Promise.all(
    badgeData.map((badge) =>
      prisma.badge.create({
        data: {
          ...badge,
          iconUrl: `/badges/${badge.name.toLowerCase().replace('_', '-')}.png`,
        },
      })
    )
  );

  // Create admin
  const admin = await prisma.user.create({
    data: {
      email: USER_CREDENTIALS.admin,
      password: hashedPassword,
      name: 'Admin User',
      role: 'ADMIN',
      bio: 'Platform administrator',
      skills: ['JavaScript', 'TypeScript', 'Node.js', 'React', 'MongoDB'],
      tokens: 1000,
      profilePic: '/profiles/admin.png'
    }
  });

  // Create employers
  const employerData = [
    {
      email: USER_CREDENTIALS.employer,
      name: 'Tech Employer',
      bio: 'Senior tech lead with 10+ years experience',
      skills: ['System Design', 'Architecture', 'Team Leadership'],
      tokens: 500,
      profilePic: '/profiles/employer.png'
    },
    {
      email: USER_CREDENTIALS.startup,
      name: 'Startup Founder',
      bio: 'Entrepreneur passionate about tech education',
      skills: ['Product Management', 'Agile', 'Startup'],
      tokens: 300,
      profilePic: '/profiles/startup.png'
    }
  ];

  const employers = await Promise.all(
    employerData.map((emp) =>
      prisma.user.create({
        data: {
          ...emp,
          password: hashedPassword,
          role: 'EMPLOYER',
          badges: {
            create: {
              badgeId: badges[0].id
            }
          }
        }
      })
    )
  );

  // Create students
  const studentData = [
    {
      email: USER_CREDENTIALS.students[0],
      name: 'Ram Sharma',
      bio: 'Passionate about web development',
      skills: ['JavaScript', 'React', 'Node.js'],
      tokens: 100,
      profilePic: '/profiles/ram.png'
    },
    {
      email: USER_CREDENTIALS.students[1],
      name: 'Sita Thapa',
      bio: 'Frontend developer in training',
      skills: ['HTML', 'CSS', 'JavaScript', 'React'],
      tokens: 50,
      profilePic: '/profiles/sita.png'
    },
    {
      email: USER_CREDENTIALS.students[2],
      name: 'Hari Karki',
      bio: 'Python enthusiast',
      skills: ['Python', 'Django', 'SQL'],
      tokens: 75,
      profilePic: '/profiles/hari.png'
    },
    {
      email: USER_CREDENTIALS.students[3],
      name: 'Gita Tamang',
      bio: 'Java developer in training',
      skills: ['Java', 'Spring Boot', 'MySQL'],
      tokens: 60,
      profilePic: '/profiles/gita.png'
    },
    {
      email: USER_CREDENTIALS.students[4],
      name: 'Sanjay Gurung',
      bio: 'Full stack developer with multiple workshop experiences',
      skills: ['JavaScript', 'React', 'MongoDB', 'Express'],
      tokens: 150,
      profilePic: '/profiles/sanjay.png'
    }
  ];

  const students = await Promise.all(
    studentData.map((stu, i) =>
      prisma.user.create({
        data: {
          ...stu,
          password: hashedPassword,
          role: 'STUDENT',
          badges: {
            create: {
              badgeId: i === 4 ? badges[1].id : badges[4].id
            }
          }
        }
      })
    )
  );

  // Create workshops
  const workshopData = [
    {
      title: 'React Fundamentals',
      description: 'Learn the basics of React development...',
      zoomLink: 'https://zoom.us/j/123456789', 
      price: 29.99,
      tokensEarned: 30,
      skillsTaught: ['React', 'JavaScript'],
      status: WorkshopStatus.COMPLETED,
      startDate: new Date(Date.now() - 45 * 86400000),
      endDate: new Date(Date.now() - 38 * 86400000),
      totalSeats: 30,
      outcomes: [
        'Understand React fundamentals',
        'Build your first React app',
        'Learn component-based architecture'
      ],
      rules: [
        'Bring your own laptop',
        'Basic JavaScript knowledge required',
        'Be on time'
      ],
      zoomStatus: 'Link will be active 30 minutes before event'
    },
    {
      title: 'Node.js Basics',
      description: 'Introduction to Node.js and Express...',
      zoomLink: 'https://zoom.us/j/987654321', 
      price: 29.99,
      tokensEarned: 30,
      skillsTaught: ['Node.js', 'Express', 'MongoDB'],
      status: WorkshopStatus.ONGOING,
      startDate: new Date(Date.now() - 2 * 86400000),
      endDate: new Date(Date.now() + 5 * 86400000),
      totalSeats: 25,
      outcomes: [
        'Understand Node.js basics',
        'Build REST APIs with Express',
        'Connect to MongoDB'
      ],
      rules: [
        'Install Node.js before the workshop',
        'Bring your own laptop',
        'Participate actively'
      ],
      zoomStatus: 'Link will be active before event'
    }
  ];

  const workshops = await Promise.all(
    workshopData.map((ws, i) =>
      prisma.workshop.create({
        data: {
          ...ws,
          hostId: employers[0].id,
          attendees: {
            create: i === 0 ? [
              { userId: students[4].id },
              { userId: students[1].id },
              { userId: students[0].id }
            ] : []
          }
        }
      })
    )
  );

  // Create jobs
  const jobData = [
    {
      title: 'Frontend Developer Intern',
      subtitle: 'Exciting opportunity for MERN learners!',
      description: 'Looking for a frontend developer intern with passion for creating beautiful user interfaces...',
      requiredSkills: ['HTML', 'CSS', 'JavaScript', 'React'],
      tags: ['Internship', 'Frontend', 'React'],
      type: 'INTERNSHIP',
      location: 'Kathmandu',
      locationType: 'Hybrid',
      budget: 'NPR 25,000',
      status: JobStatus.OPEN,
      isVerified: true,
      postedTime: '3 hours ago',
      proposals: 12,
      aiMatch: 0.92
    },
    {
      title: 'Senior Full Stack Developer',
      subtitle: 'Join our growing tech team!',
      description: 'Experienced full stack developer needed for building scalable applications...',
      requiredSkills: ['React', 'Node.js', 'MongoDB', 'TypeScript'],
      tags: ['Full-time', 'Full Stack', 'Senior'],
      type: 'FULL_TIME',
      location: 'Remote',
      locationType: 'Remote',
      budget: 'NPR 150,000',
      status: JobStatus.OPEN,
      isVerified: true,
      postedTime: '1 day ago',
      proposals: 8,
      aiMatch: 0.88
    },
    {
      title: 'UI/UX Designer',
      subtitle: 'Create beautiful digital experiences',
      description: 'Looking for a creative UI/UX designer to join our design team...',
      requiredSkills: ['Figma', 'UI Design', 'UX Research', 'Prototyping'],
      tags: ['Design', 'UI/UX', 'Creative'],
      type: 'FREELANCE',
      location: 'Remote',
      locationType: 'Remote',
      budget: 'Negotiable',
      status: JobStatus.OPEN,
      isVerified: true,
      postedTime: '5 hours ago',
      proposals: 15,
      aiMatch: 0.85
    },
    {
      title: 'Backend Developer',
      subtitle: 'Build scalable backend systems',
      description: 'Looking for a backend developer to work on our microservices architecture...',
      requiredSkills: ['Node.js', 'Python', 'Docker', 'AWS'],
      tags: ['Backend', 'Full-time', 'Senior'],
      type: 'FULL_TIME',
      location: 'Kathmandu',
      locationType: 'Onsite',
      budget: 'NPR 120,000',
      status: JobStatus.OPEN,
      isVerified: true,
      postedTime: '2 days ago',
      proposals: 6,
      aiMatch: 0.90
    },
    {
      title: 'DevOps Engineer',
      subtitle: 'Join our infrastructure team',
      description: 'Help us build and maintain our cloud infrastructure...',
      requiredSkills: ['Docker', 'Kubernetes', 'AWS', 'CI/CD'],
      tags: ['DevOps', 'Infrastructure', 'Cloud'],
      type: 'CONTRACT',
      location: 'Remote',
      locationType: 'Remote',
      budget: 'NPR 180,000',
      status: JobStatus.OPEN,
      isVerified: true,
      postedTime: '1 week ago',
      proposals: 10,
      aiMatch: 0.87
    }
  ];

  const jobs = await Promise.all(
    jobData.map((job) =>
      prisma.job.create({
        data: {
          title: job.title,
          subtitle: job.subtitle,
          description: job.description,
          requiredSkills: job.requiredSkills,
          tags: job.tags,
          type: job.type as unknown as JobType,
          location: job.location,
          locationType: job.locationType,
          budget: job.budget,
          status: job.status,
          isVerified: job.isVerified,
          employerId: employers[0].id,
          postedTime: job.postedTime,
          proposals: job.proposals,
          aiMatch: job.aiMatch
        }
      })
    )
  );

  // Create applications
  await prisma.application.create({
    data: {
      jobId: jobs[0].id,
      studentId: students[0].id,
      proposal: 'I have experience with Node.js and Express...',
      status: 'ACCEPTED'
    }
  });

  // Create contracts
  await prisma.contract.create({
    data: {
      studentId: students[0].id,
      employerId: employers[0].id,
      jobId: jobs[0].id,
      agreementHash: 'sample-hash-123',
      status: 'ACTIVE'
    }
  });

  // Create open source projects
  const projectData = [
    {
      title: 'React Component Library',
      description: 'A modern component library built with React and TypeScript',
      fullDescription: 'A comprehensive component library that follows modern React best practices...',
      techStack: ['React', 'TypeScript', 'Storybook', 'Jest'],
      difficulty: ProjectDifficulty.INTERMEDIATE,
      goals: ['Create reusable components', 'Implement testing', 'Write documentation'],
      githubUrl: 'https://github.com/example/react-components', 
      hiringLabel: 'good first issue',
      contributionGuidelines: 'Please read contributing guidelines...',
      goodFirstIssues: ['Add unit tests', 'Improve docs', 'Fix accessibility']
    },
    {
      title: 'Node.js API Framework',
      description: 'A lightweight and fast API framework for Node.js',
      fullDescription: 'A modern API framework that makes building RESTful APIs easy...',
      techStack: ['Node.js', 'Express', 'TypeScript', 'MongoDB'],
      difficulty: ProjectDifficulty.ADVANCED,
      goals: ['Flexible routing', 'Middleware support', 'Database integration'],
      githubUrl: 'https://github.com/example/node-api-framework', 
      hiringLabel: 'help wanted',
      contributionGuidelines: 'Please read contributing guidelines...',
      goodFirstIssues: ['Add validation', 'Rate limiting', 'Migration support']
    }
  ];

  await Promise.all(
    projectData.map((project) =>
      prisma.openSourceProject.create({
        data: {
          ...project,
          employerId: employers[0].id,
          status: ProjectStatus.OPEN
        }
      })
    )
  );

  // Create workshop reviews
  await prisma.review.create({
    data: {
      rating: 5,
      comment: 'Great introduction to React!',
      reviewerId: students[0].id,
      workshopId: workshops[0].id
    }
  });

  // Create sample disputes
  const disputeData = [
    {
      // Open dispute
      reason: 'Work quality not meeting expectations',
      evidence: 'Screenshots of incomplete work and communication logs',
      status: DisputeStatus.OPEN,
      raisedById: students[0].id,
      contractId: (await prisma.contract.findFirst())?.id || '',
      blockchainHash: 'hash-open-dispute-123'
    },
    {
      // Responded dispute
      reason: 'Payment not received for completed work',
      evidence: 'Payment proof and contract terms',
      response: 'Payment was delayed due to bank processing issues. Will be processed within 24 hours.',
      status: DisputeStatus.RESPONDED,
      raisedById: students[1].id,
      respondedById: employers[0].id,
      contractId: (await prisma.contract.findFirst())?.id || '',
      blockchainHash: 'hash-responded-dispute-456'
    },
    {
      // Resolved dispute
      reason: 'Contract terms violation',
      evidence: 'Contract document and violation proof',
      response: 'The terms were unclear. We have updated our contract template.',
      status: DisputeStatus.RESOLVED,
      raisedById: students[2].id,
      respondedById: employers[1].id,
      contractId: (await prisma.contract.findFirst())?.id || '',
      blockchainHash: 'hash-resolved-dispute-789'
    }
  ];

  // Create disputes
  const disputes = await Promise.all(
    disputeData.map(dispute =>
      prisma.dispute.create({
        data: dispute
      })
    )
  );

  // Add votes to the responded dispute
  await Promise.all([
    prisma.vote.create({
      data: {
        disputeId: disputes[1].id,
        voterId: admin.id,
        votedForId: employers[0].id
      }
    }),
    prisma.vote.create({
      data: {
        disputeId: disputes[1].id,
        voterId: students[3].id,
        votedForId: employers[0].id
      }
    }),
    prisma.vote.create({
      data: {
        disputeId: disputes[1].id,
        voterId: students[4].id,
        votedForId: students[1].id
      }
    })
  ]);

  // Add resolution to the resolved dispute
  await prisma.disputeResolution.create({
    data: {
      disputeId: disputes[2].id,
      winnerId: employers[1].id,
      resolverId: admin.id
    }
  });

  // Add token rewards for the resolved dispute
  await Promise.all([
    // Reward for winner
    prisma.tokenReward.create({
      data: {
        userId: employers[1].id,
        amount: 100,
        reason: 'Won dispute',
        disputeId: disputes[2].id
      }
    }),
    // Rewards for matching voters
    prisma.tokenReward.create({
      data: {
        userId: admin.id,
        amount: 10,
        reason: 'Correct vote in dispute',
        disputeId: disputes[2].id
      }
    })
  ]);

  console.log('✅ Database seeded successfully!');
  console.log('\n🔐 Login Credentials:');
  console.log(`Admin: ${USER_CREDENTIALS.admin} / ${PASSWORD}`);
  console.log(`Employer: ${USER_CREDENTIALS.employer} / ${PASSWORD}`);
  console.log(`Student: ${USER_CREDENTIALS.students[0]} / ${PASSWORD}`);
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });