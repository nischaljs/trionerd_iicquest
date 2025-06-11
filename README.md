# ChalkBox - Job and Workshop Platform

ChalkBox is a comprehensive platform that connects students with job opportunities and educational workshops. The platform uses AI-based recommendations to match users with relevant jobs and workshops based on their skills.

## Features

### User Management
- Multi-role system (Student, Employer, Admin)
- Skill-based profiles
- Badge system for achievements
- Token-based economy
- Profile pictures and bios

### Job Management
- Job posting and applications
- AI-powered job recommendations
- Skill matching with percentage scores
- Application tracking
- Contract management

### Workshop Management
- Workshop creation and hosting
- AI-powered workshop recommendations
- Skill-based matching
- Registration and attendance tracking
- Review and rating system

### AI Recommendation System
- Vector-based skill matching
- Cosine similarity scoring
- Badge-based boosts
- Previous interaction history consideration
- Match percentage calculation

### Badge System
- UTSAAHI_INTERN: Enthusiastic intern ready to learn
- SHIKSHARTHI: Active learner in the community
- SIKSHA_SEVI: Dedicated to learning and teaching
- ACHARYA: Expert in their field with proven track record
- GURU: Master of teaching with excellent reviews

## Tech Stack

### Backend
- Node.js with Express
- TypeScript
- Prisma ORM
- MongoDB
- JWT Authentication
- Bcrypt for password hashing

### Frontend
- React
- TypeScript
- React Router

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- pnpm (recommended) or npm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/nischaljs/iicquest.git
cd iicquest
```

2. Install dependencies:
```bash
# Backend
cd backend
pnpm install

# Frontend
cd ../frontend
pnpm install
```

3. Set up environment variables:
```bash
# Backend (.env)
DATABASE_URL="mongodb://localhost:27017/iicquest"
JWT_SECRET="your-jwt-secret"
PORT=5000

# Frontend (.env)
VITE_API_URL="http://localhost:5000"
```

4. Run database migrations:
```bash
cd backend
pnpm prisma generate
```

5. Seed the database:
```bash
pnpm prisma db seed
```

6. Start the development servers:
```bash
# Backend
cd backend
pnpm dev

# Frontend
cd frontend
pnpm dev
```

## Seeded Users

The database comes pre-seeded with multiple users for testing different scenarios:

### Admin
- Email: admin@chalkbox.com
- Password: password123
- Role: ADMIN
- Bio: Platform administrator
- Skills: JavaScript, TypeScript, Node.js, React, MongoDB
- Tokens: 1000
- Profile Picture: /profiles/admin.png

### Employers
1. Tech Employer
   - Email: employer@chalkbox.com
   - Password: password123
   - Role: EMPLOYER
   - Bio: Senior tech lead with 10+ years experience
   - Badge: GURU
   - Skills: System Design, Architecture, Team Leadership
   - Tokens: 500
   - Profile Picture: /profiles/employer.png

2. Startup Founder
   - Email: startup@chalkbox.com
   - Password: password123
   - Role: EMPLOYER
   - Bio: Entrepreneur passionate about tech education
   - Badge: SIKSHA_SEVI
   - Skills: Product Management, Agile, Startup
   - Tokens: 300
   - Profile Picture: /profiles/startup.png

### Students
1. Ram Sharma
   - Email: ram@chalkbox.com
   - Password: password123
   - Role: STUDENT
   - Bio: Passionate about web development
   - Badge: UTSAAHI_INTERN
   - Skills: JavaScript, React, Node.js
   - Tokens: 100
   - Profile Picture: /profiles/ram.png
   - History: React workshop attendance, Active contract for Backend Intern

2. Sita Thapa
   - Email: sita@chalkbox.com
   - Password: password123
   - Role: STUDENT
   - Bio: Frontend developer in training
   - Badge: UTSAAHI_INTERN
   - Skills: HTML, CSS, JavaScript, React
   - Tokens: 50
   - Profile Picture: /profiles/sita.png
   - History: React workshop attendance, Pending application for Frontend Intern

3. Hari Karki
   - Email: hari@chalkbox.com
   - Password: password123
   - Role: STUDENT
   - Bio: Python enthusiast
   - Badge: SHIKSHARTHI
   - Skills: Python, Django, SQL
   - Tokens: 75
   - Profile Picture: /profiles/hari.png
   - History: Python workshop attendance, Pending application for Python Intern

4. Gita Tamang
   - Email: gita@chalkbox.com
   - Password: password123
   - Role: STUDENT
   - Bio: Java developer in training
   - Badge: SHIKSHARTHI
   - Skills: Java, Spring Boot, MySQL
   - Tokens: 60
   - Profile Picture: /profiles/gita.png
   - History: Java workshop attendance, Pending application for Java Intern

5. Sanjay Gurung
   - Email: sanjay@chalkbox.com
   - Password: password123
   - Role: STUDENT
   - Bio: Full stack developer with multiple workshop experiences
   - Badges: SIKSHA_SEVI, ACHARYA
   - Skills: JavaScript, React, MongoDB, Express
   - Tokens: 150
   - Profile Picture: /profiles/sanjay.png
   - History: Multiple workshop attendances (React, Node.js)

## AI Recommendation System

The platform uses a sophisticated AI-based recommendation system that:

1. Vectorizes user skills and job/workshop requirements
2. Calculates cosine similarity between vectors
3. Applies boosts for:
   - GURU badge holders (20% boost)
   - ACHARYA badge holders (15% boost)
   - SIKSHA_SEVI badge holders (10% boost)
   - Previous applications/attendance (10% boost)
4. Returns match percentages for frontend display

### Testing Recommendations

The seed data includes various scenarios to test the recommendation system:

1. **New Interns (Ram & Sita)**
   - UTSAAHI_INTERN badge
   - Basic skills
   - Recent workshop attendance
   - Tests entry-level recommendations

2. **Active Learners (Hari & Gita)**
   - SHIKSHARTHI badge
   - Specific tech stack focus
   - Workshop attendance
   - Tests skill-specific recommendations

3. **Experienced Student (Sanjay)**
   - Multiple badges (SIKSHA_SEVI, ACHARYA)
   - Rich workshop history
   - Multiple skills
   - Tests badge influence and history-based recommendations
