export interface Project {
  id: string;
  title: string;
  tagline: string;
  category: string;
  description: string;
  highlights: string[];
  techStack: string[];
  liveUrl: string;
  githubUrl?: string;
  image: string;
  accentColor: string;
  accentHex: string;
  featured: boolean;
}

export interface Experiment {
  id: string;
  title: string;
  category: string;
  description: string;
  status: string;
  tags: string[];
}

export const PERSONAL_INFO = {
  name: 'Prosper Ndubuizu',
  role: 'Student Developer • AI & Web Development • Product Builder',
  positioning: '“I turn ideas into things you can actually use.”',
  avatarImage: '/src/assets/images/prosper_avatar_stylized_1790705512701.jpg',
  about: `I’m a student developer and builder who enjoys taking ideas and turning them into real things. I build web applications, AI-powered products, interactive experiences and experiments, while constantly learning and exploring new technology.

I’m currently studying Electrical & Electronics Engineering at the University of Ibadan while also pursuing Computer Science online at the University of the People.

I started building before having the ideal setup and learned by building with what I had—starting from coding directly on a mobile phone with Termux in Iba, Lagos, to full-stack web and AI systems.`,
  education: [
    {
      institution: 'University of Ibadan',
      degree: 'B.Eng. Electrical & Electronics Engineering',
      period: '2026 – Present',
      highlight: 'Engineering foundations, digital circuits & systems'
    },
    {
      institution: 'University of the People',
      degree: 'B.Sc. Computer Science',
      period: '2026 – Present',
      highlight: 'Algorithms, data structures & software engineering'
    },
    {
      institution: 'Lagos State University International School',
      degree: 'Secondary School Education',
      period: 'Graduated 2025',
      highlight: 'Science & technology focus'
    }
  ],
  experience: [
    {
      role: 'Personal Assistant — Case Management Assistant',
      company: 'Ackah Law',
      type: 'Remote',
      period: 'Nov 2025 – Sep 2026',
      description: 'Supported legal and case management operations in a high-tempo remote team. Managed documentation, detailed client record synthesis, independent scheduling across time zones, legal research, and structured communications.'
    }
  ],
  skills: {
    development: ['HTML', 'CSS', 'JavaScript', 'React', 'React Native'],
    ai: ['Google AI Studio', 'Gemini API', 'AI-Assisted App Development', 'Prompt Architecture', 'Multimodal Vision'],
    tools: ['Git', 'GitHub', 'Vercel', 'Ubuntu/Linux', 'Termux'],
    focus: ['Web Development', 'AI Applications', 'UI/UX Design', 'Product Prototyping']
  },
  contact: {
    email: 'ndubuizuprosper09@gmail.com',
    phone: '+234 911 898 0906',
    linkedin: 'https://www.linkedin.com/in/prosper-ndubuizu-6b6843417',
    x: 'https://x.com/ProsperN56974',
    github: 'https://github.com/Prosper099',
    formspreeEndpoint: 'https://formspree.io/f/mljdozll'
  }
};

export const PROJECTS: Project[] = [
  {
    id: 'studyos',
    title: 'StudyOS',
    tagline: 'Intelligent Academic Exam Preparation Platform',
    category: 'EdTech • Full-Stack Web',
    description: 'An interactive examination and study platform designed specifically for Nigerian students preparing for JAMB, WAEC, NECO, and Post-UTME examinations. Features subject syllabi, authentic timed test simulations, and progress analytics.',
    highlights: [
      'Multi-exam subject selection for JAMB, WAEC, NECO, and Post-UTME curricula',
      'Realistic timed test simulator with visual countdown alerts and pause guards',
      'Topic mastery breakdown highlighting student weak points before exam day',
      'Ultra-lightweight, mobile-first design tuned for seamless performance on low-bandwidth networks'
    ],
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'Vercel'],
    liveUrl: 'https://studyos-academic.vercel.app/',
    githubUrl: 'https://github.com/Prosper099/studyos',
    image: '/src/assets/images/studyos_mockup_preview_1790705526472.jpg',
    accentColor: 'from-blue-500/20 to-indigo-500/20',
    accentHex: '#3b82f6',
    featured: true
  },
  {
    id: 'billa-ai',
    title: 'BILLA AI',
    tagline: 'AI Business Billing Platform — Built for Reality',
    category: 'Fintech • Multimodal AI',
    description: 'An AI-powered billing product built for everyday small-business workflows. Enables micro-merchants and freelancers to snap photos of handwritten receipts or paper invoices and instantly convert them into structured, trackable bills shareable via WhatsApp.',
    highlights: [
      'Multimodal AI vision extracting merchant items, totals, and dates from handwritten paper receipts',
      'WhatsApp-friendly digital receipt cards with one-tap payment confirmation links',
      'Zero-complexity mobile dashboard for tracking daily gross revenue and outstanding customer debts',
      'Designed around the physical realities of everyday African SME commerce'
    ],
    techStack: ['React', 'Gemini AI Vision', 'TypeScript', 'Tailwind CSS', 'Vercel'],
    liveUrl: 'https://billaai-ten.vercel.app/',
    image: '/src/assets/images/billa_ai_mockup_preview_1790705537959.jpg',
    accentColor: 'from-emerald-500/20 to-teal-500/20',
    accentHex: '#10b981',
    featured: true
  },
  {
    id: 'atomic-lab',
    title: 'Atomic & Molecular Visualizer',
    tagline: 'Interactive 3D Science & Molecular Architecture',
    category: 'Interactive 3D • Education • WebGL',
    description: 'An interactive science education visualizer bringing chemistry to life. Features all 118 periodic table elements, 3D electron orbital probabilities, Hydrogen structure exploration, and water molecule polar covalent bond simulations.',
    highlights: [
      'Interactive Periodic Table Registry covering all 118 chemical elements with electronic configurations',
      'Hydrogen Structure Lab with orbital radius visualization and electron density spheres',
      'Water Bonds Lab demonstrating real-time polar covalent bond angles (104.5°) in 3D',
      'Full orbit, pan, and zoom spatial inspection built for desktop and touchscreens'
    ],
    techStack: ['Three.js', 'WebGL', 'React', 'TypeScript', 'Tailwind CSS'],
    liveUrl: 'https://molecular-structure-visualizer.vercel.app/',
    image: '/src/assets/images/atomic_lab_preview_1790705551702.jpg',
    accentColor: 'from-cyan-500/20 to-blue-500/20',
    accentHex: '#06b6d4',
    featured: true
  },
  {
    id: 'lumina-connect',
    title: 'Lumina Connect',
    tagline: 'Collaborative Video Communication Product Concept',
    category: 'Product Concept • Real-Time UI',
    description: 'A browser-based video communication concept focused on modern collaborative meeting experiences, spatial participant presence, and expressive minimal UI that gets out of the user’s way.',
    highlights: [
      'Spatial participant video grids with dynamic speaker spotlight and custom audio nodes',
      'Integrated whiteboard canvas for rapid real-time sketching during live calls',
      'Ambient focus mode removing UI clutter during long collaborative design sessions',
      'Contextual AI-assisted meeting summaries and instant action-item capture'
    ],
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'WebRTC Concept'],
    liveUrl: 'https://studyos-academic.vercel.app/',
    image: '/src/assets/images/lumina_connect_preview_1790705564092.jpg',
    accentColor: 'from-violet-500/20 to-purple-500/20',
    accentHex: '#8b5cf6',
    featured: true
  }
];

export const EXPERIMENTS: Experiment[] = [
  {
    id: 'lumina-os',
    title: 'Lumina OS',
    category: 'Experimental OS Interface',
    description: 'An exploration of what an AI-first web operating system could feel like, where natural language acts as the core shell and files are living, proactive agent workspaces.',
    status: 'Prototype Concept',
    tags: ['AI Kernel', 'Spatial Windows', 'Prompt Shell']
  },
  {
    id: 'nebula-os',
    title: 'Nebula OS',
    category: 'Futuristic Computing',
    description: 'Researching how window management and multi-tasking evolve when computing interfaces gain dimensional depth, persistent holographic memory, and adaptive context.',
    status: 'Exploratory UI',
    tags: ['Depth Computing', 'Fluid Workflows']
  },
  {
    id: 'creative-labs',
    title: 'Lumina Labs Sandbox',
    category: 'Creative Technology Playground',
    description: 'A sandbox for generative audio experiments, WebGL particle shaders, responsive physics canvases, and micro-tools built to test emerging browser capabilities.',
    status: 'Active Playground',
    tags: ['WebGL Shaders', 'Audio API', 'Micro-Tools']
  }
];
