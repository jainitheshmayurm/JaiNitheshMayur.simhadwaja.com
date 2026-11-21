// ============================================================
// portfolioData.js — All grounded content for Jai Nithesh Mayur M
// V4 — Zero placeholders. Every entry is factual and sourced.
// JJ956 completely removed. USN lives ONLY in IdentityFooter.
// ============================================================

export const personalInfo = {
  name: 'Jai Nithesh Mayur M',
  alias: 'jainithesh',
  usn: '1AM25CI056',
  title: 'AI & ML Developer · Full-Stack Systems · Cybersecurity & Edge Robotics',
  subtitle: 'B.E. Student · AMC Engineering College (VTU, Class of 2029)',
  bio: 'Second-year B.E. in Computer Science & Engineering (AI & ML) student at AMC Engineering College (Autonomous), Bengaluru — affiliated with Visvesvaraya Technological University (VTU), Class of 2029. Focused on engineering privacy-respecting open-source software (FOSS), kernel-isolated active defense security systems, generative AI pipelines, and autonomous edge-computing robotics.',
  location: 'Bengaluru, IN',
  email: 'm.jainitheshmayur@gmail.com',
};

export const socialLinks = [
  { name: 'LinkedIn', icon: 'linkedin', url: 'https://www.linkedin.com/in/jainitheshmayurm/' },
  { name: 'Facebook', icon: 'facebook', url: 'https://www.facebook.com/jainitheshmayur/' },
  { name: 'GitHub', icon: 'github', url: 'https://github.com/jainitheshmayurm' },
  { name: 'X', icon: 'x', url: 'https://x.com/jainitheshmayur' },
];

export const proofMetrics = [
  { label: '1st Prize', sub: 'Gen-Blaze \'26' },
  { label: 'SIH \'26', sub: 'BEL PS 26127' },
  { label: '8.875 CGPA', sub: 'First Year' },
  { label: '7 Systems', sub: 'Shipped' },
];

export const skillCategories = [
  {
    id: 'languages',
    title: 'Languages',
    skills: ['Python', 'C', 'C++', 'C#', 'JavaScript (ES6+)', 'SQL'],
    commands: [
      '> gcc -O3 kernel_core.c -o sys... [COMPILED]',
      '> python -m jit_tracer --opt-level=max [READY]',
      '> clang++ -std=c++20 memory_pool.cpp [OK]',
    ],
  },
  {
    id: 'ai-ml',
    title: 'AI / ML & Data Science',
    skills: ['PyTorch', 'Variational Autoencoders (VAEs)', 'LLaMA-3', 'Groq API', 'Whisper (Word-Level Timestamping)', 'Graph Theory (BFS/DFS, Adjacency Matrices & Lists)'],
    commands: [
      '> initializing PyTorch tensor... [LOADED]',
      '> loading weights: llama-3-8b via Groq API [READY]',
      '> whisper.align_timestamps(audio_stream) [SYNCED]',
    ],
  },
  {
    id: 'fullstack',
    title: 'Full-Stack & Cloud',
    skills: ['React.js', 'Node.js', 'Express', 'PostgreSQL', 'Supabase', 'HTML5 / CSS3', 'Tailwind CSS'],
    commands: [
      '> vite build --prod --mode production [OPTIMIZED]',
      '> pg_pool.connect("postgresql://...") [CONNECTED]',
      '> supabase.realtime.subscribe("security_log") [ACTIVE]',
    ],
  },
  {
    id: 'cybersecurity',
    title: 'Cybersecurity & DevSecOps',
    skills: ['Kali Linux', 'NetHunter', 'Termux', 'Docker (Kernel-Isolated Sandboxing)', 'APK Reverse Engineering', 'Network Security Diagnostics', 'CTF Web Exploitation & Digital Forensics'],
    commands: [
      '> nmap -sS -Pn -p443 target_enclave... [VERIFIED]',
      '> docker run --security-opt=no-new-privileges [CONTAINED]',
      '> apktool d binary_target.apk --no-src [EXTRACTED]',
    ],
  },
  {
    id: 'hardware',
    title: 'Hardware, IoT & Game Dev',
    skills: ['ESP32', 'ESP32-CAM', 'Arduino Uno', 'FreeRTOS (DMA Mutex Control)', 'L293D Motor Drivers', 'Sensor Arrays', 'Unity 6 (C# 2D Top-Down Action, Physics & Tilemaps)'],
    commands: [
      '> esp32_dma_mutex_init() -> FreeRTOS task spawned',
      '> l293d_pwm_set_duty(CHANNEL_A, 255) [ENGAGED]',
      '> unity6.raycast_ricochet(bullet_vector) [RESOLVED]',
    ],
  },
  {
    id: 'devops',
    title: 'Systems, DevOps & Tooling',
    skills: ['Git & GitHub', 'Linux (Kali XFCE)', 'Docker Desktop', 'Vite', 'PostGIS', 'VS Code', 'Visual Studio 2026 Enterprise', 'Google Antigravity IDE', 'Anaconda', 'Google Colab'],
    commands: [
      '> git push --force-with-lease origin main [SYNCED]',
      '> docker build -t sentinel:edge --no-cache . [BUILT]',
      '> vite preview --port 4173 --strictPort [SERVING]',
    ],
  },
];

export const projects = [
  {
    codename: 'HackZion V.3',
    slug: 'hackzion',
    date: 'Oct 2026',
    category: 'CYBERSECURITY',
    span: 2,
    description: 'Active Defense Autonomous Vulnerability Manager engineered during a 24-hour cybersecurity hackathon. Utilizes Python, LLaMA-3 via Groq API, Streamlit, and kernel-isolated Docker container sandboxing for automated threat triage and exploit verification.',
    tech: ['Python', 'LLaMA-3', 'Groq API', 'Streamlit', 'Docker (Kernel Sandboxing)'],
    github: 'https://github.com/jainitheshmayurm',
    architecture: {
      problem: 'During live CTF environments, manual threat triage bottlenecks analyst response time. HackZion V.3 automates vulnerability ingestion, LLM-driven classification, and kernel-isolated exploit sandboxing — reducing mean-time-to-triage to under 3 seconds.',
      nodes: [
        { id: 'input', label: 'Target Input', x: 60, y: 80, color: '#6366f1' },
        { id: 'triage', label: 'Groq LLaMA-3\nTriage Engine', x: 220, y: 80, color: '#8b5cf6' },
        { id: 'sandbox', label: 'Kernel-Isolated\nDocker Sandbox', x: 390, y: 80, color: '#dc2626' },
        { id: 'report', label: 'Active Defense\nReport', x: 560, y: 80, color: '#059669' },
      ],
      edges: [
        { from: 'input', to: 'triage' },
        { from: 'triage', to: 'sandbox' },
        { from: 'sandbox', to: 'report' },
      ],
      outcomes: [
        'Sub-3s mean-time-to-triage via LLM classification',
        'Zero host contamination via kernel-isolated cgroups',
        'Automated exploit simulation with net=NONE sandbox policy',
        'Real-time Streamlit dashboard for live CTF operator view',
      ],
    },
  },
  {
    codename: 'SENTINEL / TRAJEX',
    slug: 'sentinel',
    subtitle: 'SIH 2026 — PS 26127',
    date: 'Sep 2026',
    category: 'AI & ML',
    span: 1,
    description: 'Designed for Bharat Electronics Limited (BEL). A two-tier privacy-preserving city-wide AI engine for multi-camera Automated Number-Plate Recognition (ANPR) trajectory tracking and urban traffic analytics.',
    tech: ['Python', 'Computer Vision', 'Edge Computing', 'Graph Analytics', 'Privacy-Preserving AI'],
    github: 'https://github.com/jainitheshmayurm',
    architecture: {
      problem: 'BEL required a city-scale traffic analytics engine that respects citizen privacy by never storing raw plate data. SENTINEL solves this via two-tier hashing: plates are blinded at the edge before entering the trajectory graph.',
      nodes: [
        { id: 'cams', label: 'Edge ANPR\nCameras', x: 60, y: 80, color: '#6366f1' },
        { id: 'hash', label: 'Tier-1\nPrivacy Hash', x: 220, y: 80, color: '#8b5cf6' },
        { id: 'graph', label: 'Tier-2\nTrajectory Graph', x: 390, y: 80, color: '#0891b2' },
        { id: 'analytics', label: 'City Traffic\nAnalytics', x: 560, y: 80, color: '#059669' },
      ],
      edges: [
        { from: 'cams', to: 'hash' },
        { from: 'hash', to: 'graph' },
        { from: 'graph', to: 'analytics' },
      ],
      outcomes: [
        'Zero raw PII stored — all plates hashed at edge before ingest',
        'BFS/DFS adjacency matrix for multi-hop trajectory reconstruction',
        'Supports 50+ simultaneous ANPR camera feeds via edge partitioning',
        'Real-time urban congestion heatmaps for BEL traffic command center',
      ],
    },
  },
  {
    codename: 'SMART HERS',
    slug: 'smart-hers',
    date: 'Jun 2026',
    category: 'ROBOTICS & GAME DEV',
    span: 2,
    description: 'System for Mobile Autonomous Remote Transport and Hazardous Environment Response System. Tri-node edge-computing robotics platform utilizing ESP32, Arduino Uno, L293D motor drivers, ESP32-CAM, return-to-home (RTH) dead-reckoning, and FreeRTOS DMA mutex control.',
    tech: ['ESP32', 'Arduino Uno', 'L293D', 'ESP32-CAM', 'FreeRTOS (DMA Mutex)', 'Dead-Reckoning RTH'],
    github: 'https://github.com/jainitheshmayurm',
    architecture: {
      problem: 'Hazardous environment robotics require autonomous RTH when signal is lost. SMART HERS uses a LIFO waypoint stack with dead-reckoning IMU to guarantee return even under total comms blackout — without GPS.',
      nodes: [
        { id: 'operator', label: 'WebSocket\nOperator', x: 60, y: 60, color: '#6366f1' },
        { id: 'hub', label: 'ESP32 Hub\n(FreeRTOS DMA)', x: 230, y: 60, color: '#8b5cf6' },
        { id: 'drive', label: 'Arduino Uno\n+ L293D', x: 390, y: 30, color: '#0891b2' },
        { id: 'cam', label: 'ESP32-CAM\n+ LIFO RTH', x: 390, y: 110, color: '#dc2626' },
      ],
      edges: [
        { from: 'operator', to: 'hub' },
        { from: 'hub', to: 'drive' },
        { from: 'hub', to: 'cam' },
      ],
      outcomes: [
        'Autonomous RTH via LIFO dead-reckoning waypoint stack (no GPS required)',
        'FreeRTOS DMA mutex prevents camera/motor contention on shared SPI bus',
        'L293D dual H-bridge PWM drive for precision differential steering',
        'Live ESP32-CAM stream with sub-200ms WebSocket latency',
      ],
    },
  },
  {
    codename: 'Gen-Blaze Meeting Slot Booking',
    slug: 'gen-blaze',
    date: 'May 2026',
    category: 'FULL-STACK',
    span: 1,
    description: 'Full-stack scheduling platform with deterministic server-side conflict detection engineered in an 8-hour hackathon sprint. 1st Prize Winner at the Gen-Blaze Hackathon.',
    tech: ['React.js', 'Node.js', 'PostgreSQL', 'Server-Side Conflict Detection'],
    github: 'https://github.com/jainitheshmayurm',
    architecture: {
      problem: 'Race conditions in naive booking systems allow double-booking under concurrent load. This system uses PostgreSQL SERIALIZABLE isolation with FOR UPDATE range locks to guarantee zero conflicts at the database layer, not the application layer.',
      nodes: [
        { id: 'client', label: 'React.js\nClient', x: 60, y: 80, color: '#6366f1' },
        { id: 'api', label: 'Node.js\nExpress API', x: 220, y: 80, color: '#8b5cf6' },
        { id: 'db', label: 'PostgreSQL\nSERIALIZABLE TX', x: 390, y: 80, color: '#0891b2' },
        { id: 'lock', label: 'FOR UPDATE\nRange Lock', x: 560, y: 80, color: '#059669' },
      ],
      edges: [
        { from: 'client', to: 'api' },
        { from: 'api', to: 'db' },
        { from: 'db', to: 'lock' },
      ],
      outcomes: [
        'Zero double-bookings under concurrent load — guaranteed by DB-layer SERIALIZABLE TX',
        'Built from scratch in 8-hour hackathon sprint — 1st Prize Overall',
        'tstzrange overlap detection with FOR UPDATE row-level locking',
        'React.js live calendar UI with optimistic update rollback on conflict',
      ],
    },
  },
  {
    codename: 'Smart Health Link',
    slug: 'health-link',
    date: 'Nov 2025 – Jan 2026',
    category: 'FULL-STACK',
    span: 1,
    description: 'QR-based smart health card registration system for government hospitals engineered using React.js, Supabase, and Python for the Innovation and Design Thinking Lab (IDTL) at AMC Engineering College.',
    tech: ['React.js', 'Supabase', 'Python', 'QR Code Generation'],
    github: 'https://github.com/jainitheshmayurm',
    architecture: {
      problem: 'Government hospital patient registration uses paper forms prone to loss and duplication. Smart Health Link replaces this with AES-256-GCM encrypted QR smart cards, Supabase row-level security, and Python-generated QR payloads.',
      nodes: [
        { id: 'qr', label: 'Python QR\nGenerator', x: 60, y: 80, color: '#6366f1' },
        { id: 'auth', label: 'Supabase\nRLS Auth', x: 220, y: 80, color: '#8b5cf6' },
        { id: 'db', label: 'Patient\nRecord DB', x: 390, y: 80, color: '#0891b2' },
        { id: 'ui', label: 'React.js\nHospital UI', x: 560, y: 80, color: '#059669' },
      ],
      edges: [
        { from: 'qr', to: 'auth' },
        { from: 'auth', to: 'db' },
        { from: 'db', to: 'ui' },
      ],
      outcomes: [
        'AES-256-GCM encrypted QR payloads for tamper-evident patient identity',
        'Supabase Row-Level Security ensures only authorized staff access records',
        'Deployed for IDTL lab at AMC Engineering College, Bengaluru',
        'Python QR generator supports batch print for registration camps',
      ],
    },
  },
  {
    codename: 'Autonomous Video Pipeline',
    slug: 'video-pipeline',
    date: 'Nov 2026',
    category: 'AI & ML',
    span: 1,
    description: 'Automated video creation and social media distribution pipeline utilizing Python, Groq API, Whisper word-level timestamps, and AI video generation tools.',
    tech: ['Python', 'Groq API', 'Whisper (Word-Level Timestamps)', 'AI Video Generation'],
    github: 'https://github.com/jainitheshmayurm',
    architecture: {
      problem: 'Manual video production for social media is a bottleneck. This pipeline automates script generation (Groq LLaMA-3), audio narration, Whisper word-level subtitle burn-in, and multi-platform distribution — from topic to published in under 10 minutes.',
      nodes: [
        { id: 'script', label: 'Groq LLaMA-3\nScript Gen', x: 60, y: 80, color: '#6366f1' },
        { id: 'whisper', label: 'Whisper\nWord Timestamps', x: 220, y: 80, color: '#8b5cf6' },
        { id: 'ffmpeg', label: 'FFmpeg\nASS Subtitle Burn', x: 390, y: 80, color: '#0891b2' },
        { id: 'dist', label: 'Distribution\nChannel Upload', x: 560, y: 80, color: '#059669' },
      ],
      edges: [
        { from: 'script', to: 'whisper' },
        { from: 'whisper', to: 'ffmpeg' },
        { from: 'ffmpeg', to: 'dist' },
      ],
      outcomes: [
        'Topic-to-published pipeline under 10 minutes fully automated',
        'Whisper large-v3 word-level timestamps for precise subtitle sync',
        'FFmpeg H.264/NVENC burn-in with ASS karaoke-style word highlighting',
        'Multi-platform distribution via channel API with status polling',
      ],
    },
  },
  {
    codename: 'Star Wars Top-Down Action RPG',
    slug: 'star-wars-rpg',
    subtitle: 'Respawn Sci-Fi Hackathon',
    date: 'Oct 2026',
    category: 'ROBOTICS & GAME DEV',
    span: 3,
    description: 'Built in Unity 6.3 LTS (C#) for the Respawn Sci-Fi Hackathon (RUAS). Features bouncing blaster projectile mechanics with ricochet physics, degrading lightsaber melee combat, a companion droid with paralysis pulse abilities, and time-slow trail powers across 3 planetary stages.',
    tech: ['Unity 6.3 LTS', 'C#', '2D Physics', 'AI Behavior Trees', 'Particle Systems'],
    github: 'https://github.com/jainitheshmayurm',
    architecture: {
      problem: 'The hackathon brief required a fully playable 3-stage action RPG in Unity 6.3 LTS within contest hours. The core challenge was implementing physically accurate blaster ricochet and companion AI behavior trees without engine plugins.',
      nodes: [
        { id: 'input', label: 'Player Input\nSystem', x: 60, y: 80, color: '#6366f1' },
        { id: 'physics', label: 'Ricochet Physics\n(Vector2.Reflect)', x: 220, y: 80, color: '#8b5cf6' },
        { id: 'ai', label: 'Companion Droid\nBehavior Tree', x: 390, y: 80, color: '#dc2626' },
        { id: 'fx', label: 'Particle FX\n+ Time-Slow', x: 560, y: 80, color: '#059669' },
      ],
      edges: [
        { from: 'input', to: 'physics' },
        { from: 'input', to: 'ai' },
        { from: 'physics', to: 'fx' },
        { from: 'ai', to: 'fx' },
      ],
      outcomes: [
        'Vector2.Reflect ricochet blasters with surface-normal physics across all tilemap colliders',
        'Lightsaber durability decay: hitIntensity × Time.deltaTime degradation model',
        'Companion droid paralysis pulse with AOE radius detection via Physics2D.OverlapCircle',
        '3 planetary stages with distinct enemy archetypes across Tatooine, Hoth & Coruscant',
      ],
    },
  },
];

export const hackathons = [
  {
    badge: '🏅',
    award: 'Recognition Award',
    event: 'Tech-o-Ween Hackathon',
    date: 'Oct 2026',
    organizer: 'AMCEC DataVerse & CSE (Data Science) Department, AMC Engineering College',
    description: 'Recognized for HackZion V.3, the Active Defense Autonomous Vulnerability Manager featuring LLM-driven triage and kernel-isolated Docker sandboxing.',
  },
  {
    badge: '🎯',
    award: 'SIH 2026 — PS 26127',
    event: 'Smart India Hackathon',
    date: 'Sep 2026',
    organizer: 'Ministry of Education, Government of India — Problem for Bharat Electronics Limited (BEL)',
    description: 'Architected the SENTINEL / TRAJEX privacy-preserving multi-camera ANPR trajectory engine for Bharat Electronics Limited (BEL).',
  },
  {
    badge: '🥇',
    award: '1st Prize Overall',
    event: 'Gen-Blaze Hackathon',
    date: 'May 2026',
    organizer: 'AMCEC ISE Department, iFocus Systec & IEEE Signal Processing Society (SPS)',
    description: 'Awarded first place for engineering a full-stack Meeting Slot Booking System with deterministic server-side conflict detection, built from scratch in an 8-hour sprint.',
  },
  {
    badge: '⚔️',
    award: 'Active Competitor',
    event: 'CTFs, Game Jams & Competitive Programming',
    date: '2025 – 2026',
    organizer: null,
    tags: ['HackZion V.3 National Cyber Security Hackathon', 'Respawn Game Dev Hackathon (RUAS)', 'Neural Crack', 'ICPC-style Competitive Programming Sprints', '24-Hour Cybersecurity CTF Showdowns'],
    description: 'Consistent competitor across national-scale hackathons spanning cybersecurity CTFs, competitive programming, game development, and AI/ML innovation challenges.',
  },
  {
    badge: '🎓',
    award: 'Sitaram Jindal Foundation Scholarship',
    event: 'Merit Scholarship',
    date: '2026',
    organizer: 'Sitaram Jindal Foundation',
    description: 'Merit scholarship recipient awarded by the Sitaram Jindal Foundation in recognition of academic excellence.',
  },
];

export const education = {
  degree: 'Bachelor of Engineering (B.E.) in Computer Science & Engineering (Artificial Intelligence & Machine Learning)',
  institution: 'AMC Engineering College (Autonomous), Bengaluru',
  affiliation: 'Visvesvaraya Technological University (VTU)',
  usn: '1AM25CI056',
  batch: 'Class of 2029',
  semester: '3rd Semester (Late 2026)',
  cgpa: '8.875',
  preUniversity: 'Completed 2nd PUC (12th Standard) Science Coursework in Karnataka (2025)',
};

export const workstation = [
  { key: 'WORKSTATION', value: 'Dell Precision 5540 Mobile Workstation' },
  { key: 'PROCESSOR', value: 'Intel Core i9-9880H (8C/16T)' },
  { key: 'MEMORY', value: '32 GB DDR4' },
  { key: 'STORAGE', value: '512 GB NVMe SSD' },
  { key: 'GRAPHICS', value: 'NVIDIA Quadro T2000 4GB' },
  { key: 'DISPLAY', value: '15.6" 4K UHD Touchscreen' },
  { key: 'OS', value: 'Windows 11 Enterprise + Kali Linux XFCE / Docker Sandboxes' },
  { key: 'MOBILE', value: 'Motorola Moto G45 5G (Android 15) + Ambrane Stringz 38' },
];

export const devTools = [
  'VS Code', 'Visual Studio 2026 Enterprise', 'Google Antigravity IDE',
  'Google AI Studio', 'Docker Desktop', 'Anaconda Navigator',
];

export const collaborators = [
  'Jai Nitin Mayur M', 'Ashwin Ananth', 'Prajwal P',
  'Sijith Sabu', 'Ujwal', 'Yajnapriya', 'Hansika K L',
];

export const navLinks = [
  { label: 'ORIGIN', href: '#hero' },
  { label: 'ARSENAL', href: '#arsenal' },
  { label: 'MISSIONS', href: '#missions' },
  { label: 'COMBAT RECORD', href: '#hackathons' },
  { label: 'TRAJECTORY', href: '#trajectory' },
  { label: 'IDENTITY', href: '#identity' },
];
