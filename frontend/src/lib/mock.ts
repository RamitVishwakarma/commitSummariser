export const repos = [
  { id: '1', name: 'gitpulse', language: 'TypeScript', langColor: '#3178C6', description: 'GitHub commit summariser & dev activity tracker', commits: 342, lastCommit: '2 hours ago', status: 'active' },
  { id: '2', name: 'api-gateway', language: 'Go', langColor: '#00ADD8', description: 'Microservice API gateway with rate limiting and auth', commits: 189, lastCommit: '1 day ago', status: 'active' },
  { id: '3', name: 'design-system', language: 'TypeScript', langColor: '#3178C6', description: 'Shared component library and design tokens', commits: 256, lastCommit: '3 days ago', status: 'active' },
  { id: '4', name: 'ml-pipeline', language: 'Python', langColor: '#3572A5', description: 'Data processing and ML model training pipeline', commits: 128, lastCommit: '1 week ago', status: 'active' },
  { id: '5', name: 'infra-terraform', language: 'HCL', langColor: '#844FBA', description: 'Infrastructure as code for AWS cloud resources', commits: 94, lastCommit: '2 weeks ago', status: 'inactive' },
  { id: '6', name: 'blog-engine', language: 'Rust', langColor: '#DEA584', description: 'Static site generator with markdown support', commits: 67, lastCommit: '3 weeks ago', status: 'inactive' },
];

export const todayCommits = [
  { id: 'c1', repo: 'gitpulse', repoId: '1', hash: 'a3f7b2c', message: 'feat: add glassmorphism design system and theme tokens', author: 'Ramit', time: '2 hours ago', status: 'clean' },
  { id: 'c2', repo: 'gitpulse', repoId: '1', hash: 'e9d1f4a', message: 'fix: correct sidebar collapse animation timing', author: 'Ramit', time: '3 hours ago', status: 'clean' },
  { id: 'c3', repo: 'gitpulse', repoId: '1', hash: 'b8c3e7f', message: 'refactor: extract GlassCard into shared component', author: 'Ramit', time: '4 hours ago', status: 'clean' },
  { id: 'c4', repo: 'api-gateway', repoId: '2', hash: '7f2a9c1', message: 'feat: implement JWT refresh token rotation', author: 'Ramit', time: '5 hours ago', status: 'clean' },
  { id: 'c5', repo: 'api-gateway', repoId: '2', hash: 'd4e8b3a', message: 'test: add integration tests for rate limiter middleware', author: 'Ramit', time: '6 hours ago', status: 'flagged' },
  { id: 'c6', repo: 'design-system', repoId: '3', hash: '1c5f9d2', message: 'feat: add new Button variants with glass effect', author: 'Ramit', time: '7 hours ago', status: 'clean' },
];

export const allCommits = [
  ...todayCommits,
  { id: 'c7', repo: 'ml-pipeline', repoId: '4', hash: 'f3a8c2e', message: 'feat: add BERT model fine-tuning script', author: 'Ramit', time: '1 day ago', status: 'clean' },
  { id: 'c8', repo: 'gitpulse', repoId: '1', hash: '2d7e9b4', message: 'docs: update README with installation steps', author: 'Ramit', time: '1 day ago', status: 'clean' },
  { id: 'c9', repo: 'infra-terraform', repoId: '5', hash: '9a1c4f7', message: 'feat: add RDS instance with read replica', author: 'Ramit', time: '2 days ago', status: 'clean' },
  { id: 'c10', repo: 'api-gateway', repoId: '2', hash: '5b8d3e1', message: 'fix: resolve memory leak in connection pool', author: 'Ramit', time: '2 days ago', status: 'flagged' },
  { id: 'c11', repo: 'design-system', repoId: '3', hash: 'c2f7a9d', message: 'chore: bump dependencies and fix peer warnings', author: 'Ramit', time: '3 days ago', status: 'clean' },
  { id: 'c12', repo: 'blog-engine', repoId: '6', hash: '8e4b1c6', message: 'feat: implement syntax highlighting for code blocks', author: 'Ramit', time: '3 days ago', status: 'clean' },
  { id: 'c13', repo: 'gitpulse', repoId: '1', hash: 'a1d9f3b', message: 'fix: typo in config file', author: 'Ramit', time: '4 days ago', status: 'deleted' },
  { id: 'c14', repo: 'ml-pipeline', repoId: '4', hash: '6c2e8a4', message: 'refactor: optimize data loader batch processing', author: 'Ramit', time: '5 days ago', status: 'clean' },
];

export const weeklySummaries = [
  {
    id: 'ws1',
    dateRange: 'March 31 – April 4, 2026',
    generated: 'April 4, 2026',
    accomplishments: [
      'Implemented glassmorphism design system for GitPulse frontend',
      'Added JWT refresh token rotation to API gateway',
      'Created shared Button component with glass effect variants',
      'Set up RDS instance with read replica for production database',
    ],
    reposActive: ['gitpulse', 'api-gateway', 'design-system', 'infra-terraform'],
    commitsProcessed: 24,
    notable: 'This week saw significant progress on both the frontend design system and backend security. The glassmorphism theme is now fully integrated, giving GitPulse a premium, modern feel. The API gateway is now more secure with rotating refresh tokens.',
  },
  {
    id: 'ws2',
    dateRange: 'March 24 – March 30, 2026',
    generated: 'March 30, 2026',
    accomplishments: [
      'Completed ML pipeline BERT fine-tuning integration',
      'Fixed critical memory leak in API gateway connection pool',
      'Added syntax highlighting to blog engine',
      'Updated design system dependencies',
    ],
    reposActive: ['ml-pipeline', 'api-gateway', 'blog-engine', 'design-system'],
    commitsProcessed: 31,
    notable: 'A productive week focused on the ML pipeline and stability improvements. The BERT integration opens up new NLP capabilities. The connection pool fix resolved a production issue that had been causing intermittent timeouts.',
  },
];

export const monthlySummaries = [
  {
    id: 'ms1',
    month: 'March 2026',
    overview: 'March was a month of deep infrastructure and frontend work. Major milestones included launching the glassmorphism design system, completing the ML pipeline\'s NLP capabilities, and hardening the API gateway security layer. Four repositories saw active development with a strong focus on TypeScript and Go.',
    projects: ['gitpulse', 'api-gateway', 'design-system', 'ml-pipeline', 'infra-terraform'],
    themes: ['Frontend Architecture', 'Security', 'Machine Learning', 'Infrastructure', 'Design Systems'],
    totalCommits: 112,
    reposActive: 5,
    busiestWeek: 'March 17–23',
  },
];

export const yearlySummary = {
  year: '2026',
  totalCommits: 1247,
  reposActive: 6,
  weeksSummarised: 14,
  longestStreak: 23,
  narrative: 'The first quarter of 2026 has been marked by a significant shift towards full-stack development with an emphasis on developer tooling and infrastructure automation. The creation of GitPulse represents a personal milestone in building productivity tools. Work on the API gateway demonstrates growing expertise in distributed systems, while the ML pipeline shows expanding capabilities in data science and NLP.\n\nNotable growth areas include TypeScript/React for frontend work, Go for backend services, and Terraform for infrastructure. The design system project reflects an increasing attention to UI/UX craft and component architecture.',
  skills: {
    Backend: 85,
    Frontend: 90,
    DevOps: 60,
    Database: 55,
    'API Design': 80,
    Testing: 45,
    Infrastructure: 65,
    Documentation: 40,
  },
};
