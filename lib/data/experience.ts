export type Role = {
  period:  string
  company: string
  role:    string
  scope:   string
  note:    string
  wins?:   string[]
  stack?:  string[]
  current: boolean
}

export const experience: Role[] = [
  {
    period:  '2025 — Present',
    company: 'TwilightCore.AI',
    role:    'Lead Software Engineer',
    scope:   'AI applications · intelligent search · automation',
    note:    'Leading development of AI-powered applications focused on intelligent search and operational automation.',
    wins: [
      'Designed backend services for model orchestration and retrieval pipelines, improving application efficiency.',
      'Integrated AI capabilities into web applications with usability and maintainability as first-class concerns.',
      'Drove deployment and iterative refinement across application and infrastructure layers.',
    ],
    stack: ['Python', 'FastAPI', 'LangChain', 'LangGraph', 'PostgreSQL', 'Docker', 'AWS'],
    current: true,
  },
  {
    period:  '2023 — 2025',
    company: 'Red Canary (Zscaler)',
    role:    'Senior AI Engineer',
    scope:   'RAG pipelines · knowledge assistants · semantic search',
    note:    'Designed and delivered AI-powered systems for knowledge assistants and semantic search on the security platform.',
    wins: [
      'Built retrieval-augmented generation pipelines including document ingestion and vector search.',
      'Developed backend services in Python and FastAPI for API workflows and system integration.',
      'Deployed containerised services on Docker, Kubernetes, AWS, and Azure.',
    ],
    stack: ['Python', 'FastAPI', 'LangChain', 'PostgreSQL', 'Redis', 'Docker', 'Kubernetes', 'AWS', 'Azure'],
    current: false,
  },
  {
    period:  '2021 — 2023',
    company: 'PointClickCare',
    role:    'Full-Stack Engineer',
    scope:   'Full-stack · auth · reporting · semantic search',
    note:    'Built full-stack applications on React, Next.js, Node.js, and PostgreSQL for healthcare operations software.',
    wins: [
      'Developed backend APIs for authentication, reporting, and workflow management.',
      'Introduced AI-assisted features like semantic search to improve application capabilities.',
      'Contributed to CI/CD and cloud delivery on Docker, GitHub Actions, and AWS.',
    ],
    stack: ['React', 'Next.js', 'Node.js', 'Express', 'PostgreSQL', 'Docker', 'GitHub Actions', 'AWS'],
    current: false,
  },
  {
    period:  '2019 — 2020',
    company: 'Productboard',
    role:    'Software Engineer',
    scope:   'Backend · NLP · dashboards',
    note:    'Backend functionality in Python, Flask, and Django for internal applications and automation services, with NLP capabilities.',
    wins: [
      'Built React-based dashboards for operational visibility and internal workflows.',
      'Supported NLP functionality with Scikit-learn, TensorFlow, and Hugging Face Transformers.',
      'Delivered in Agile with active testing, debugging, and cross-functional collaboration.',
    ],
    stack: ['Python', 'Flask', 'Django', 'React', 'Scikit-learn', 'TensorFlow', 'Hugging Face'],
    current: false,
  },
]

export type Education = {
  period: string
  school: string
  degree: string
}

export const education: Education[] = [
  {
    period: '2014 — 2018',
    school: 'The Hong Kong Polytechnic University',
    degree: 'BSc, Computer Science',
  },
]
