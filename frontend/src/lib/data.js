export const siteMeta = {
  name: 'Sakib Ahamed Shahon',
  monogram: 'SA',
  tagline: 'The "CAN DO" Software Artisan',
  role: 'Software Engineer · Full-Stack & AI',
  description:
    'Software engineer shipping AI-powered WordPress and SaaS products. Built a unified AI backend powering 20k+ plugin installs and cut AI integration cost by ~35%.',
  url: 'https://sakibshahon.netlify.app',
  email: 'sakib3201@gmail.com',
  location: 'Gazipur, Bangladesh',
  resumeUrl: '/assets/sakib_shahon_resume.pdf'
};

export const socialLinks = [
  { name: 'GitHub', href: 'https://github.com/sakib3201', color: 'gray', label: 'GitHub profile' },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/in/sakib-shahon/', color: 'blue', label: 'LinkedIn profile' },
  { name: 'YouTube', href: 'https://www.youtube.com/@sakibshahon', color: 'red', label: 'YouTube channel' },
  { name: 'Blog', href: 'https://dev.to/sakib3201', color: 'gray', label: 'Dev.to blog' },
  { name: 'Email', href: 'mailto:sakib3201@gmail.com', color: 'gray', label: 'Send email' }
];

export const impactStats = [
  { value: '20k+', label: 'Plugin installs powered (Aisentic)' },
  { value: '~35%', label: 'Lower AI integration cost' },
  { value: '~2×', label: 'Faster feature delivery (harness eng.)' },
  { value: '4+', label: 'Years professional experience' }
];

export const productsShipped = [
  {
    name: 'Timetics AI',
    tag: 'SaaS',
    image: null,
    description: 'Appointment and booking management SaaS with AI-assisted scheduling workflows.',
    role: 'Software engineer on the SaaS product (timetics.ai)',
    metrics: ['SaaS booking platform', 'AI scheduling features'],
    productContext: null,
    links: { product: 'https://timetics.ai/' }
  },
  {
    name: 'Aisentic',
    tag: 'WordPress',
    image: null,
    description:
      'AI plugin that quietly powers WordPress products — chat-driven admin assistance across the Arraytics ecosystem.',
    role: 'Built unified AI backend infrastructure shared across company products',
    metrics: ['20k+ active installations', '~35% lower AI integration cost'],
    productContext: null,
    links: { product: 'https://themewinter.com/aisentic/' }
  },
  {
    name: 'Booktics',
    tag: 'WordPress',
    image: null,
    description: 'WordPress booking plugin for service businesses — services, teams, payments, and automation.',
    role: 'Product engineering on Booktics (including greenfield work)',
    metrics: ['Service booking workflows', 'Calendar & payment integrations'],
    productContext: null,
    links: { product: 'https://arraytics.com/booktics/' }
  },
  {
    name: 'WP Timetics',
    tag: 'WordPress',
    image: '/assets/arraytics-logo.webp',
    description: 'WordPress appointment scheduling plugin with calendar sync and booking workflows.',
    role: 'Feature work, integrations, and performance improvements',
    metrics: ['−0.45s page load (~50%)', 'Google / Outlook calendar integrations'],
    productContext: null,
    links: { product: 'https://arraytics.com/timetics/' }
  },
  {
    name: 'Eventin',
    tag: 'WordPress',
    image: null,
    description: 'WordPress event calendar and ticketing plugin for modern events.',
    role: 'Engineering on legacy Eventin codebase',
    metrics: ['Legacy platform contributions', 'AI-related product features'],
    productContext: null,
    links: { product: 'https://themewinter.com/eventin/' }
  },
  {
    name: 'WPCafe',
    tag: 'WordPress',
    image: null,
    description: 'Restaurant menu, online ordering, and table reservation plugin for WordPress.',
    role: 'Backend performance and analytics improvements',
    metrics: ['−0.24s analytics API (~14%)', 'Query caching & optimization'],
    productContext: null,
    links: { product: 'https://themewinter.com/wp-cafe/' }
  }
];

export const projects = [
  {
    imageSrc: null,
    altText: 'Find My Race Pace',
    title: 'Find My Race Pace',
    description:
      'Training plans and race analytics for long-distance runners. Built with React.js, Node.js, and Python machine learning.',
    highlights: ['−21% load time via caching and Web Workers', '+18% user retention with race data analytics', '~25% higher satisfaction'],
    liveLink: 'https://www.findracepace.com/',
    youtubeLink: '',
    githubLink: ''
  },
  {
    imageSrc: '/assets/ictbjhomepage.png',
    altText: 'ICTBJ-2023',
    title: 'ICTBJ-2023',
    description:
      "Official site for Jatiya Kabi Kazi Nazrul Islam University's research conference on Technology, Business, and Justice — paper submission and registration for hundreds of students, teachers, and researchers.",
    highlights: [],
    liveLink: 'https://ictbj.jkkniu.edu.bd/',
    youtubeLink: '',
    githubLink: ''
  }
];

export const archiveProjects = [
  {
    imageSrc: '/assets/evotingproject.png',
    altText: 'Decentralized Voting App',
    title: 'Decentralized Voting App',
    description: 'Blockchain voting with facial-recognition authentication (university experiment).',
    highlights: [],
    liveLink: '',
    youtubeLink: '',
    githubLink: ''
  },
  {
    imageSrc: '/assets/amarshopproject.png',
    altText: 'Amar Shop',
    title: 'Amar Shop',
    description: 'Shop management: inventory, financial reports, customer and sales tools (university project).',
    highlights: [],
    liveLink: '',
    youtubeLink: '',
    githubLink: ''
  }
];

export const skills = [
  {
    title: 'Web Development',
    icon: 'code',
    blurb: 'Full-stack products from API to polished UI — WordPress plugins to SaaS.',
    items: [
      'PHP, JavaScript, Python',
      'Laravel, React.js, Next.js, Node.js, Express.js, FastAPI',
      'WordPress plugin engineering (PHP + React)',
      'Postgres, MySQL, MongoDB',
      'GitHub Actions, Docker, Bitbucket'
    ]
  },
  {
    title: 'AI Engineering',
    icon: 'ai',
    blurb: 'Production AI features — harnesses, agents, and cost-aware systems.',
    items: [
      'Harness engineering for legacy projects (~2× delivery speed)',
      'Spec-driven development',
      'Small language model fine-tuning and evaluation',
      'Cost optimization for agentic features (~35% AI cost reduction)',
      'AI features across multi-product WordPress ecosystems'
    ]
  },
  {
    title: 'Data Analytics & Visualization',
    icon: 'chart',
    blurb: 'Pipelines, scrapers, and visuals that turn data into decisions.',
    items: [
      'SQL analytics on Postgres, MySQL, MongoDB',
      'Automated web scrapers and data pipelines',
      'Data visualization for products and research',
      'Multi-threaded pipelines — −34% server cost (Data Sapience)'
    ]
  },
  {
    title: 'Machine Learning',
    icon: 'brain',
    blurb: 'Applied ML inside shipped products — race analytics, training plans, and research software.',
    items: [
      'Python ML for training plans and race analytics (Find My Race Pace)',
      'Machine learning & data analytics software (Data Sapience Lab)',
      'ML-driven features for runners and researchers',
      'From model to product — shipped, not just trained'
    ]
  }
];

export const experience = [
  {
    company: 'Arraytics',
    logo: '/assets/arraytics-logo.webp',
    role: 'Software Engineer',
    period: 'April 2025 — Present',
    badge: 'Currently Working',
    highlight: true,
    description:
      'Worked on timetics.ai (SaaS appointment/booking), Aisentic (AI plugin powering 20k+ installs), and WordPress products Eventin, WP Timetics, Booktics, and WPCafe — powering thousands of active businesses.',
    metrics: [
      'Unified AI backend across products — ~35% lower AI integration cost',
      'Harness engineering on legacy setups — ~2× faster feature delivery',
      'WP Timetics page load improved by 0.45s (~50%)',
      'WPCafe analytics API improved by 0.24s (~14%) via cache + query optimization'
    ],
    tags: ['WordPress', 'PHP', 'React.js', 'MySQL', 'AI', 'SaaS']
  },
  {
    company: 'Incevio',
    logo: '/assets/incevio_logo.webp',
    role: 'Web Developer',
    period: 'November 2023 — February 2025',
    badge: null,
    highlight: false,
    description:
      'REST APIs, end-to-end features, and automated tests for zCart multivendor e-commerce — a top-rated product powering 1,000+ e-commerce platforms.',
    metrics: [
      'Plugins adding ~$500 value per sale (payments, shipping, Shopify, POS, affiliate, etc.)',
      'User-inputted translation system — +12% satisfaction; related code −80% via traits',
      'PhpUnit + Dusk automation — ~23% faster development',
      'Payment code −60% via strategy pattern',
      'View response time −16% (0.2s) with caching and chunking'
    ],
    tags: ['Laravel', 'PHP', 'MySQL', 'REST APIs', 'PhpUnit', 'Dusk']
  },
  {
    company: 'Data Sapience Lab',
    logo: '/assets/datasapiencelogo-nobg.png',
    role: 'Software Engineer',
    period: 'January 2022 — November 2023',
    badge: null,
    highlight: false,
    description:
      'Led teams building full-stack custom sites, machine learning and data analytics software, visualizations, and automated web scrapers.',
    metrics: [
      'Data pipeline efficiency up — server costs −34% via multi-threading',
      'Team tools streamlined — sprint cycles −9%, delivery +11%'
    ],
    tags: ['Python', 'ML', 'React.js', 'Node.js', 'MongoDB', 'Leadership']
  }
];

export const awards = [
  { title: 'ICPC 2023 Mymensingh Division Champion', year: '2023', description: 'Division champion; placed in the top 4% nationally.', icon: 'trophy', href: null },
  { title: 'NASA Space Apps Challenge', year: '2019–2020', description: '2019 Regional Champion; 2020 2nd Runner-up.', icon: 'rocket', href: null },
  { title: 'LightOJ Official Tutorials', year: '—', description: 'Authored 15+ official tutorials. Competitive programming profile on Codolio.', icon: 'book', href: null }
];

export const youtube = {
  channelUrl: 'https://www.youtube.com/@sakibshahon',
  handle: '@sakibshahon',
  blurb: 'Tutorials, engineering stories, and behind-the-scenes of shipping software — WordPress, AI, and full-stack development.',
  featured: []
};

export const aboutTimeline = [
  {
    align: 'start',
    time: '2003',
    title: 'That Magic Moment',
    description: 'When I first saw a computer, it was nothing short of magic for me. The fascination of how a machine could do so many things created an impression that lasted a lifetime. My passion for programming is like a raging fire today and this is when the spark was ignited.'
  },
  {
    align: 'end',
    time: '2014',
    title: 'Hello World!!',
    description: 'I wrote my first &quot;Hello World&quot; in python. It was the first time I wrote a program and saw the output. It was a magical moment for me. I was fascinated by the fact that I could write a few lines of code and make the computer do what I wanted it to do. That was the moment I fell in love with programming. This is where my journey of a lifetime began.'
  },
  {
    align: 'start',
    time: '2015',
    title: 'Out of the terminal',
    description: 'First time I wrote a program that had a graphical user interface. Well it was more of HTML page with some CSS and JavaScript. But it was a big deal for me. I was amazed by the fact that I could write code and see the output in a browser. It was a big leap for me. I was no longer confined to the terminal. I was out in the open world of the web. To see this visually and play around with css properties was really fun.'
  },
  {
    align: 'end',
    time: '2016',
    title: 'Is that programming I &apos;C&apos; ?',
    description: 'Although I had been writing code for a while, I had never written a program in C. But from the moment I wrote my first program in C, I decided I wanted to learn more about it. It was difficult for sure, But I wanted to not just learn it, but master it. I wanted to know the ins and out. From this point on programming was no longer just a hobby, it was a passion.'
  },
  {
    align: 'start',
    time: '2019',
    title: 'Algorithm for Passion',
    description: 'I enrolled in a CSE program in JKKNIU. And here began the true hard core programming journey. I was introduced to the world of algorithms and data structures. Long sleepless nights, countless hours of coding, and hundreds of problems to solve. Problems solving became my passion. I was no longer just writing code to show output, I was writing code to squeeze out every last bit of performance. In this part of my life I learned more debugging, sharpened my logical skills an became part of a community of competitive programmers.'
  },
  {
    align: 'end',
    time: '2021',
    title: 'It can Learn !!!',
    description: 'I stepped into the world of machine learning and artificial intelligence. I was fascinated how a computer can learn from data. I started learning about it on kaggle. I analyzed and visualized data, and built machine learning models. It opened up a whole new world for me. Where I could use my programming skills to solve real world problems. I was writing code that could learn, predict and make decisions.'
  },
  {
    align: 'start',
    time: '2023',
    title: 'Passion & Profession',
    description: 'At the beginning of the year, I started working as a part-time freelance software engineer focused on machine learning , data analytics and web development projects. I was no longer just writing code for fun, but as a profession. I was writing code that solved real world business and research problems for my clients. I learned to handle clients, manage deadlines, and work in a team. My technical skills grew in leaps and bounds. As I gained hands on experience in working with legacy code, version control, and deployment. <br /> Later in the year in late november, I joined the amazing team at &apos;Incevio&apos; as a full-time Web developer intern.'
  },
  {
    align: 'end',
    time: '2024',
    title: 'A year of growth',
    description: '2024 was a year of deep professional growth. At Incevio I shipped REST APIs, end-to-end features, and automated tests for zCart while sharpening my refactoring skills and code architecture. I deepened my knowledge of cloud computing and system design, and continued growing the Mymensingh programmers community — contributing to open source projects and mentoring young programmers.'
  },
  {
    align: 'start',
    time: '2025',
    title: 'Shipping AI Products',
    description: 'Joined Arraytics as a Software Engineer. Worked on timetics.ai, Aisentic (20k+ installs), Eventin, WP Timetics, Booktics, and WPCafe. Built unified AI backend infrastructure cutting AI integration cost by ~35%, improved delivery speed ~2× with harness engineering, and shipped measurable performance wins on Timetics and WPCafe.'
  }
];
