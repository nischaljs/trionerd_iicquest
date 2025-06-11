import { PrismaClient, BadgeTier, WorkshopStatus, ProjectDifficulty, ProjectStatus, JobStatus } from '@prisma/client';
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
  // Clear existing data
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
      endDate: new Date(Date.now() - 38 * 86400000)
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
      endDate: new Date(Date.now() + 5 * 86400000)
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
      description: 'Looking for a frontend developer intern...',
      requiredSkills: ['HTML', 'CSS', 'JavaScript', 'React'],
      tags: ['Internship', 'Frontend', 'React'],
      type: 'INTERNSHIP',
      location: 'Hybrid',
      status: JobStatus.OPEN,
      isVerified: true
    },
    {
      title: 'Senior Full Stack Developer',
      description: 'Experienced full stack developer needed...',
      requiredSkills: ['React', 'Node.js', 'MongoDB', 'TypeScript'],
      tags: ['Full-time', 'Full Stack', 'Senior'],
      type: 'FULL_TIME',
      location: 'Remote',
      status: JobStatus.OPEN,
      isVerified: true
    }
  ];

  const jobs = await Promise.all(
    jobData.map((job) =>
      prisma.job.create({
        data: {
          ...job,
          employerId: employers[0].id
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