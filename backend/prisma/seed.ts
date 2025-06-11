import { PrismaClient, UserRole, BadgeTier, JobStatus, AppStatus, ContractStatus } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.$transaction([
    prisma.review.deleteMany(),
    prisma.userWorkshop.deleteMany(),
    prisma.workshop.deleteMany(),
    prisma.application.deleteMany(),
    prisma.contract.deleteMany(),
    prisma.job.deleteMany(),
    prisma.userBadge.deleteMany(),
    prisma.badge.deleteMany(),
    prisma.user.deleteMany(),
  ]);

  // Create badges with all tiers
  const badges = await Promise.all([
    prisma.badge.create({
      data: {
        name: 'GURU',
        description: 'Master of teaching with excellent reviews',
        tier: BadgeTier.GURU,
        iconUrl: '/badges/guru.png'
      }
    }),
    prisma.badge.create({
      data: {
        name: 'SIKSHA_SEVI',
        description: 'Dedicated to learning and teaching',
        tier: BadgeTier.SIKSHA_SEVI,
        iconUrl: '/badges/siksha-sevi.png'
      }
    }),
    prisma.badge.create({
      data: {
        name: 'SHIKSHARTHI',
        description: 'Active learner in the community',
        tier: BadgeTier.SHIKSHARTHI,
        iconUrl: '/badges/shiksharthi.png'
      }
    }),
    prisma.badge.create({
      data: {
        name: 'ACHARYA',
        description: 'Expert in their field with proven track record',
        tier: BadgeTier.ACHARYA,
        iconUrl: '/badges/acharya.png'
      }
    }),
    prisma.badge.create({
      data: {
        name: 'UTSAAHI_INTERN',
        description: 'Enthusiastic intern ready to learn',
        tier: BadgeTier.UTSAAHI_INTERN,
        iconUrl: '/badges/utsaahi-intern.png'
      }
    })
  ]);

  // Create users with hashed passwords
  const hashedPassword = await bcrypt.hash('password123', 10);
  
  // Create admin
  const admin = await prisma.user.create({
    data: {
      email: 'admin@chalkbox.com',
      password: hashedPassword,
      name: 'Admin User',
      role: UserRole.ADMIN,
      bio: 'Platform administrator',
      skills: ['JavaScript', 'TypeScript', 'Node.js', 'React', 'MongoDB'],
      tokens: 1000,
      profilePic: '/profiles/admin.png'
    }
  });

  // Create experienced employers
  const employers = await Promise.all([
    prisma.user.create({
      data: {
        email: 'employer@chalkbox.com',
        password: hashedPassword,
        name: 'Tech Employer',
        role: UserRole.EMPLOYER,
        bio: 'Senior tech lead with 10+ years experience',
        skills: ['System Design', 'Architecture', 'Team Leadership'],
        tokens: 500,
        profilePic: '/profiles/employer.png',
        badges: {
          create: {
            badgeId: badges[0].id // GURU badge
          }
        }
      }
    }),
    prisma.user.create({
      data: {
        email: 'startup@chalkbox.com',
        password: hashedPassword,
        name: 'Startup Founder',
        role: UserRole.EMPLOYER,
        bio: 'Entrepreneur passionate about tech education',
        skills: ['Product Management', 'Agile', 'Startup'],
        tokens: 300,
        profilePic: '/profiles/startup.png',
        badges: {
          create: {
            badgeId: badges[1].id // SIKSHA_SEVI badge
          }
        }
      }
    })
  ]);

  // Create students with varying experience levels
  const students = await Promise.all([
    prisma.user.create({
      data: {
        email: 'ram@chalkbox.com',
        password: hashedPassword,
        name: 'Ram Sharma',
        role: UserRole.STUDENT,
        bio: 'Passionate about web development',
        skills: ['JavaScript', 'React', 'Node.js'],
        tokens: 100,
        profilePic: '/profiles/ram.png',
        badges: {
          create: {
            badgeId: badges[4].id // UTSAAHI_INTERN badge
          }
        }
      }
    }),
    prisma.user.create({
      data: {
        email: 'sita@chalkbox.com',
        password: hashedPassword,
        name: 'Sita Thapa',
        role: UserRole.STUDENT,
        bio: 'Frontend developer in training',
        skills: ['HTML', 'CSS', 'JavaScript', 'React'],
        tokens: 50,
        profilePic: '/profiles/sita.png',
        badges: {
          create: {
            badgeId: badges[4].id // UTSAAHI_INTERN badge
          }
        }
      }
    }),
    prisma.user.create({
      data: {
        email: 'hari@chalkbox.com',
        password: hashedPassword,
        name: 'Hari Karki',
        role: UserRole.STUDENT,
        bio: 'Python enthusiast',
        skills: ['Python', 'Django', 'SQL'],
        tokens: 75,
        profilePic: '/profiles/hari.png',
        badges: {
          create: {
            badgeId: badges[2].id // SHIKSHARTHI badge
          }
        }
      }
    }),
    prisma.user.create({
      data: {
        email: 'gita@chalkbox.com',
        password: hashedPassword,
        name: 'Gita Tamang',
        role: UserRole.STUDENT,
        bio: 'Java developer in training',
        skills: ['Java', 'Spring Boot', 'MySQL'],
        tokens: 60,
        profilePic: '/profiles/gita.png',
        badges: {
          create: {
            badgeId: badges[2].id // SHIKSHARTHI badge
          }
        }
      }
    }),
    prisma.user.create({
      data: {
        email: 'sanjay@chalkbox.com',
        password: hashedPassword,
        name: 'Sanjay Gurung',
        role: UserRole.STUDENT,
        bio: 'Full stack developer with multiple workshop experiences',
        skills: ['JavaScript', 'React', 'MongoDB', 'Express'],
        tokens: 150,
        profilePic: '/profiles/sanjay.png',
        badges: {
          create: [
            { badgeId: badges[1].id }, // SIKSHA_SEVI badge
            { badgeId: badges[3].id }  // ACHARYA badge
          ]
        }
      }
    })
  ]);

  // Create workshops
  const workshops = await Promise.all([
    // React Fundamentals - COMPLETED (has reviews)
    prisma.workshop.create({
      data: {
        title: 'React Fundamentals',
        description: 'Learn the basics of React development...',
        zoomLink: 'https://zoom.us/j/123456789',
        price: 29.99,
        hostId: employers[0].id,
        tokensEarned: 30,
        skillsTaught: ['React', 'JavaScript'],
        status: 'COMPLETED',
        startDate: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000), // 45 days ago
        endDate: new Date(Date.now() - 38 * 24 * 60 * 60 * 1000), // 38 days ago
        attendees: {
          create: [
            { userId: students[4].id }, // Sanjay
            { userId: students[1].id }, // Sita
            { userId: students[0].id }  // Ram
          ]
        },
        reviews: {
          create: [
            {
              rating: 5,
              comment: 'Great introduction to React!',
              reviewerId: students[0].id,
              createdAt: new Date(Date.now() - 37 * 24 * 60 * 60 * 1000) // 37 days ago
            },
            {
              rating: 4,
              comment: 'Very helpful for beginners',
              reviewerId: students[1].id,
              createdAt: new Date(Date.now() - 36 * 24 * 60 * 60 * 1000) // 36 days ago
            }
          ]
        }
      }
    }),
    // Node.js Basics - ONGOING (can have reviews)
    prisma.workshop.create({
      data: {
        title: 'Node.js Basics',
        description: 'Introduction to Node.js and Express...',
        zoomLink: 'https://zoom.us/j/987654321',
        price: 29.99,
        hostId: employers[0].id,
        tokensEarned: 30,
        skillsTaught: ['Node.js', 'Express', 'MongoDB'],
        status: 'ONGOING',
        startDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
        endDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
        attendees: {
          create: [
            { userId: students[4].id } // Sanjay
          ]
        },
        reviews: {
          create: [
            {
              rating: 5,
              comment: 'Excellent Node.js workshop! The instructor explains concepts clearly.',
              reviewerId: students[4].id, // Sanjay
              createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000) // 1 day ago
            }
          ]
        }
      }
    }),
    // Python for Beginners - COMPLETED (can have reviews)
    prisma.workshop.create({
      data: {
        title: 'Python for Beginners',
        description: 'Learn Python programming fundamentals...',
        zoomLink: 'https://zoom.us/j/456789123',
        price: 29.99,
        hostId: employers[1].id,
        tokensEarned: 30,
        skillsTaught: ['Python', 'Programming'],
        status: 'COMPLETED',
        startDate: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000), // 14 days ago
        endDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
        attendees: {
          create: [
            { userId: students[2].id }, // Hari
            { userId: students[3].id }  // Gita
          ]
        },
        reviews: {
          create: [
            {
              rating: 4,
              comment: 'Great introduction to Python!',
              reviewerId: students[2].id, // Hari
              createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000) // 6 days ago
            },
            {
              rating: 5,
              comment: 'Perfect for beginners, very well structured!',
              reviewerId: students[3].id, // Gita
              createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000) // 6 days ago
            }
          ]
        }
      }
    }),
    // Next.js 14 Masterclass - UPCOMING (no reviews)
    prisma.workshop.create({
      data: {
        title: 'Next.js 14 Masterclass',
        description: 'Learn the latest features of Next.js 14...',
        zoomLink: 'https://zoom.us/j/nextjs14',
        price: 45.99,
        hostId: employers[0].id,
        tokensEarned: 45,
        skillsTaught: ['Next.js', 'React', 'TypeScript'],
        status: 'UPCOMING',
        startDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
        endDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
        attendees: {
          create: [] // No attendees yet
        }
      }
    }),
    // GraphQL API Design - UPCOMING (no reviews)
    prisma.workshop.create({
      data: {
        title: 'GraphQL API Design',
        description: 'Learn to design and implement GraphQL APIs...',
        zoomLink: 'https://zoom.us/j/123789456',
        price: 39.99,
        hostId: employers[0].id,
        tokensEarned: 40,
        skillsTaught: ['GraphQL', 'API Design', 'TypeScript'],
        status: 'UPCOMING',
        startDate: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000), // 21 days from now
        endDate: new Date(Date.now() + 28 * 24 * 60 * 60 * 1000), // 28 days from now
        attendees: {
          create: [] // No attendees yet
        }
      }
    }),
    // Advanced TypeScript - ONGOING (can have reviews)
    prisma.workshop.create({
      data: {
        title: 'Advanced TypeScript',
        description: 'Deep dive into TypeScript advanced features...',
        zoomLink: 'https://zoom.us/j/typescript',
        price: 42.99,
        skillsTaught: ['TypeScript', 'JavaScript', 'Programming'],
        hostId: employers[0].id,
        tokensEarned: 43,
        status: 'ONGOING',
        startDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
        endDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
        attendees: {
          create: [
            { userId: students[0].id }, // Ram
            { userId: students[1].id }  // Sita
          ]
        },
        reviews: {
          create: [
            {
              rating: 5,
              comment: 'Great TypeScript workshop, very informative!',
              reviewerId: students[0].id,
              createdAt: new Date(Date.now() - 0.5 * 24 * 60 * 60 * 1000) // 12 hours ago
            }
          ]
        }
      }
    }),
    // UI/UX Design Principles - ONGOING (can have reviews)
    prisma.workshop.create({
      data: {
        title: 'UI/UX Design Principles',
        description: 'Learn modern UI/UX design principles...',
        zoomLink: 'https://zoom.us/j/uiux',
        price: 37.99,
        skillsTaught: ['UI Design', 'UX Design', 'Figma'],
        hostId: employers[1].id,
        tokensEarned: 38,
        status: 'ONGOING',
        startDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
        endDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), // 1 day from now
        attendees: {
          create: [
            { userId: students[2].id } // Hari
          ]
        },
        reviews: {
          create: [
            {
              rating: 4,
              comment: 'Good UI/UX workshop, learned a lot about design principles',
              reviewerId: students[2].id,
              createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000) // 1 day ago
            }
          ]
        }
      }
    }),
    // Additional upcoming workshops
    prisma.workshop.create({
      data: {
        title: 'Flutter Mobile Development',
        description: 'Build cross-platform mobile apps with Flutter...',
        zoomLink: 'https://zoom.us/j/flutter',
        price: 39.99,
        skillsTaught: ['Flutter', 'Dart', 'Mobile Development'],
        hostId: employers[1].id,
        tokensEarned: 40,
        status: 'UPCOMING',
        startDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
        endDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000) // 4 days from now
      }
    }),
    prisma.workshop.create({
      data: {
        title: 'Machine Learning Basics',
        description: 'Introduction to machine learning concepts...',
        zoomLink: 'https://zoom.us/j/mlbasics',
        price: 49.99,
        skillsTaught: ['Python', 'Machine Learning', 'Data Science'],
        hostId: employers[0].id,
        tokensEarned: 50,
        status: 'UPCOMING',
        startDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000), // 4 days from now
        endDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000) // 5 days from now
      }
    }),
    prisma.workshop.create({
      data: {
        title: 'Blockchain Development',
        description: 'Introduction to blockchain and smart contracts...',
        zoomLink: 'https://zoom.us/j/blockchain',
        price: 54.99,
        skillsTaught: ['Blockchain', 'Solidity', 'Web3'],
        hostId: employers[0].id,
        tokensEarned: 55,
        status: 'UPCOMING',
        startDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
        endDate: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000) // 8 days from now
      }
    }),
    prisma.workshop.create({
      data: {
        title: 'Cybersecurity Fundamentals',
        description: 'Learn essential cybersecurity concepts...',
        zoomLink: 'https://zoom.us/j/cybersecurity',
        price: 47.99,
        skillsTaught: ['Security', 'Networking', 'Ethical Hacking'],
        hostId: employers[1].id,
        tokensEarned: 48,
        status: 'UPCOMING',
        startDate: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000), // 8 days from now
        endDate: new Date(Date.now() + 9 * 24 * 60 * 60 * 1000) // 9 days from now
      }
    }),
    prisma.workshop.create({
      data: {
        title: 'Data Structures & Algorithms',
        description: 'Master common data structures and algorithms...',
        zoomLink: 'https://zoom.us/j/dsa',
        price: 44.99,
        skillsTaught: ['Algorithms', 'Data Structures', 'Problem Solving'],
        hostId: employers[0].id,
        tokensEarned: 45,
        status: 'UPCOMING',
        startDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days from now
        endDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000) // 15 days from now
      }
    }),
    prisma.workshop.create({
      data: {
        title: 'Cloud Architecture',
        description: 'Design scalable cloud architectures...',
        zoomLink: 'https://zoom.us/j/cloudarch',
        price: 52.99,
        skillsTaught: ['Cloud Computing', 'Architecture', 'AWS'],
        hostId: employers[1].id,
        tokensEarned: 53,
        status: 'UPCOMING',
        startDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000), // 15 days from now
        endDate: new Date(Date.now() + 16 * 24 * 60 * 60 * 1000) // 16 days from now
      }
    })
  ]);

  // Create jobs
  const jobs = await Promise.all([
    // Internship positions
    prisma.job.create({
      data: {
        title: 'Frontend Developer Intern',
        description: 'Looking for a frontend developer intern...',
        requiredSkills: ['HTML', 'CSS', 'JavaScript', 'React'],
        tags: ['Internship', 'Frontend', 'React'],
        type: 'INTERNSHIP',
        location: 'Hybrid',
        status: JobStatus.OPEN,
        isVerified: true,
        employerId: employers[0].id
      }
    }),
    prisma.job.create({
      data: {
        title: 'Backend Developer Intern',
        description: 'Internship opportunity for backend developers...',
        requiredSkills: ['Node.js', 'Express', 'MongoDB'],
        tags: ['Internship', 'Backend', 'Node.js'],
        type: 'INTERNSHIP',
        location: 'Remote',
        status: JobStatus.OPEN,
        isVerified: true,
        employerId: employers[0].id
      }
    }),
    prisma.job.create({
      data: {
        title: 'Python Developer Intern',
        description: 'Looking for a Python developer intern...',
        requiredSkills: ['Python', 'Django', 'SQL'],
        tags: ['Internship', 'Python', 'Backend'],
        type: 'INTERNSHIP',
        location: 'On-site',
        status: JobStatus.OPEN,
        isVerified: true,
        employerId: employers[1].id
      }
    }),
    prisma.job.create({
      data: {
        title: 'Java Developer Intern',
        description: 'Java developer intern position...',
        requiredSkills: ['Java', 'Spring Boot', 'MySQL'],
        tags: ['Internship', 'Java', 'Backend'],
        type: 'INTERNSHIP',
        location: 'Hybrid',
        status: JobStatus.OPEN,
        isVerified: true,
        employerId: employers[1].id
      }
    }),
    // Full-time positions
    prisma.job.create({
      data: {
        title: 'Senior Full Stack Developer',
        description: 'Looking for an experienced full stack developer to join our team...',
        requiredSkills: ['React', 'Node.js', 'MongoDB', 'TypeScript'],
        tags: ['Full-time', 'Full Stack', 'Senior'],
        type: 'FULL_TIME',
        location: 'Remote',
        status: JobStatus.OPEN,
        isVerified: true,
        employerId: employers[0].id,
        createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000) // 5 days ago
      }
    }),
    prisma.job.create({
      data: {
        title: 'DevOps Engineer',
        description: 'Join our DevOps team to improve our infrastructure...',
        requiredSkills: ['AWS', 'Docker', 'Kubernetes', 'CI/CD'],
        tags: ['Full-time', 'DevOps', 'Cloud'],
        type: 'FULL_TIME',
        location: 'Hybrid',
        status: JobStatus.OPEN,
        isVerified: true,
        employerId: employers[1].id,
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000) // 3 days ago
      }
    }),
    // Part-time positions
    prisma.job.create({
      data: {
        title: 'Part-time React Developer',
        description: 'Looking for a React developer for part-time work...',
        requiredSkills: ['React', 'JavaScript', 'HTML/CSS'],
        tags: ['Part-time', 'Frontend', 'React'],
        type: 'PART_TIME',
        location: 'Remote',
        status: JobStatus.OPEN,
        isVerified: true,
        employerId: employers[0].id,
        createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000) // 4 days ago
      }
    }),
    // Contract positions
    prisma.job.create({
      data: {
        title: 'Contract Mobile Developer',
        description: '6-month contract for Flutter mobile development...',
        requiredSkills: ['Flutter', 'Dart', 'Mobile Development'],
        tags: ['Contract', 'Mobile', 'Flutter'],
        type: 'CONTRACT',
        location: 'Hybrid',
        status: JobStatus.OPEN,
        isVerified: true,
        employerId: employers[0].id,
        createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) // 7 days ago
      }
    }),
    // Freelance positions
    prisma.job.create({
      data: {
        title: 'Freelance Content Writer',
        description: 'Looking for technical content writers...',
        requiredSkills: ['Technical Writing', 'Content Creation', 'SEO'],
        tags: ['Freelance', 'Content', 'Writing'],
        type: 'FREELANCE',
        location: 'Remote',
        status: JobStatus.OPEN,
        isVerified: true,
        employerId: employers[1].id,
        createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000) // 6 days ago
      }
    })
  ]);

  // Create applications
  await Promise.all([
    // Applications for internships
    prisma.application.create({
      data: {
        jobId: jobs[0].id, // Frontend Developer Intern
        studentId: students[1].id, // Sita
        proposal: 'I have basic knowledge of React and eager to learn more...',
        status: AppStatus.PENDING
      }
    }),
    prisma.application.create({
      data: {
        jobId: jobs[1].id, // Backend Developer Intern
        studentId: students[0].id, // Ram
        proposal: 'I have experience with Node.js and Express...',
        status: AppStatus.ACCEPTED
      }
    }),
    prisma.application.create({
      data: {
        jobId: jobs[2].id, // Python Developer Intern
        studentId: students[2].id, // Hari
        proposal: 'I am learning Python and Django...',
        status: AppStatus.PENDING
      }
    }),
    prisma.application.create({
      data: {
        jobId: jobs[3].id, // Java Developer Intern
        studentId: students[3].id, // Gita
        proposal: 'I have basic Java knowledge...',
        status: AppStatus.PENDING
      }
    }),
    // Applications for full-time positions
    prisma.application.create({
      data: {
        jobId: jobs[4].id, // Senior Full Stack Developer
        studentId: students[4].id, // Sanjay
        proposal: 'I have 3 years of experience with React and Node.js...',
        status: AppStatus.PENDING,
        createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000) // 4 days ago
      }
    }),
    prisma.application.create({
      data: {
        jobId: jobs[5].id, // DevOps Engineer
        studentId: students[2].id, // Hari
        proposal: 'I have experience with Docker and AWS...',
        status: AppStatus.PENDING,
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) // 2 days ago
      }
    }),
    // Applications for part-time positions
    prisma.application.create({
      data: {
        jobId: jobs[6].id, // Part-time React Developer
        studentId: students[0].id, // Ram
        proposal: 'I have strong React skills and can work part-time...',
        status: AppStatus.PENDING,
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000) // 3 days ago
      }
    })
  ]);

  // Create contracts
  await Promise.all([
    // Active contract
    prisma.contract.create({
      data: {
        studentId: students[0].id, // Ram
        employerId: employers[0].id,
        jobId: jobs[1].id, // Backend Developer Intern
        agreementHash: 'sample-hash-123',
        status: ContractStatus.ACTIVE,
        createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000) // 10 days ago
      }
    }),
    // Completed contracts
    prisma.contract.create({
      data: {
        studentId: students[4].id, // Sanjay
        employerId: employers[0].id,
        jobId: jobs[4].id, // Senior Full Stack Developer
        agreementHash: 'sample-hash-456',
        status: ContractStatus.COMPLETED,
        createdAt: new Date(Date.now() - 110 * 24 * 60 * 60 * 1000), // 110 days ago
        completedAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000) // 20 days ago
      }
    }),
    prisma.contract.create({
      data: {
        studentId: students[1].id, // Sita
        employerId: employers[0].id,
        jobId: jobs[0].id, // Frontend Developer Intern
        agreementHash: 'sample-hash-101',
        status: ContractStatus.COMPLETED,
        createdAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000), // 45 days ago
        completedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000) // 10 days ago
      }
    }),
    prisma.contract.create({
      data: {
        studentId: students[3].id, // Gita
        employerId: employers[1].id,
        jobId: jobs[3].id, // Java Developer Intern
        agreementHash: 'sample-hash-202',
        status: ContractStatus.COMPLETED,
        createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
        completedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000) // 3 days ago
      }
    })
  ]);

  // Create employer reviews
  await Promise.all([
    // Reviews for Sanjay (completed Senior Full Stack Developer position)
    prisma.review.create({
      data: {
        rating: 5,
        comment: 'Excellent developer with strong React and TypeScript skills. Delivered high-quality work consistently.',
        reviewerId: employers[0].id,
        targetId: students[4].id, // Sanjay
        jobId: jobs[4].id, // Senior Full Stack Developer
        createdAt: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000) // 21 days ago
      }
    }),
    // Reviews for Ram (completed Backend Developer Intern position)
    prisma.review.create({
      data: {
        rating: 4,
        comment: 'Great Node.js developer. Shows good understanding of backend concepts and eager to learn.',
        reviewerId: employers[0].id,
        targetId: students[0].id, // Ram
        jobId: jobs[1].id, // Backend Developer Intern
        createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000) // 5 days ago
      }
    }),
    // Reviews for Hari (rejected DevOps Engineer application)
    prisma.review.create({
      data: {
        rating: 3,
        comment: 'Good potential but needs more experience with cloud technologies. Would consider for future positions.',
        reviewerId: employers[1].id,
        targetId: students[2].id, // Hari
        jobId: jobs[5].id, // DevOps Engineer
        createdAt: new Date(Date.now() - 84 * 24 * 60 * 60 * 1000) // 84 days ago
      }
    }),
    // Reviews for Sita (completed Frontend position)
    prisma.review.create({
      data: {
        rating: 4,
        comment: 'Shows great potential in frontend development. Good understanding of React concepts.',
        reviewerId: employers[0].id,
        targetId: students[1].id, // Sita
        jobId: jobs[0].id, // Frontend Developer Intern
        createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000) // 10 days ago
      }
    }),
    // Reviews for Gita (completed Java position)
    prisma.review.create({
      data: {
        rating: 4,
        comment: 'Solid Java fundamentals. Good problem-solving skills and attention to detail.',
        reviewerId: employers[1].id,
        targetId: students[3].id, // Gita
        jobId: jobs[3].id, // Java Developer Intern
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000) // 3 days ago
      }
    })
  ]);

  console.log('Database seeded successfully!');
  console.log('\nLogin Credentials:');
  console.log('Admin: admin@chalkbox.com / password123');
  console.log('Tech Employer: employer@chalkbox.com / password123');
  console.log('Startup: startup@chalkbox.com / password123');
  console.log('\nStudents:');
  console.log('Ram Sharma: ram@chalkbox.com / password123');
  console.log('Sita Thapa: sita@chalkbox.com / password123');
  console.log('Hari Karki: hari@chalkbox.com / password123');
  console.log('Gita Tamang: gita@chalkbox.com / password123');
  console.log('Sanjay Gurung: sanjay@chalkbox.com / password123');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 