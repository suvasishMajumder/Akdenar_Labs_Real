
export const servicesInfo = [
  {
    slug: "web-development",
    title: "Web Development",
    img: "/services/webdevimg.png",
    description:
      "We build fast, scalable, and secure web applications tailored to meet business goals. Our team specializes in modern full-stack development, delivering responsive interfaces, robust backend systems, and seamless digital experiences. From MVPs to enterprise-grade platforms, we design and develop solutions that are reliable, high-performing, and optimized for long-term growth.",
    techStack: [
      "React.js",
      "Next.js",
      "Tailwind CSS",
      "Angular",
      "Vue.js",
      "Node.js",
      "Express.js",
      "NestJS",
      "Django",
      "Flask",
      "Java",
      "Spring Boot"
    ],
    packages: [
      {
        packageName: "Ignite",
        packageDesc: "Early-stage MVPs",
        price: "₹10K - ₹50K",
        toolTip: {
          desc: "Ignite is designed for entrepreneurs and early-stage founders who want to validate their product idea quickly and affordably. This tier focuses on delivering prototypes, landing pages, and MVPs to attract initial users.",
          l1: "Rapid development cycles (1-3 weeks)",
          l2: "Lightweight UI/UX and clean front-end builds",
          l3: "Ideal for POCs, hackathon demos, and small MVPs"
        }
      },
      {
        packageName: "Launch",
        packageDesc: "Launch-stage startups",
        price: "₹50K - ₹2.1L",
        toolTip: {
          desc: "Launch empowers early-stage startups to bring their ideas to life with production-ready applications. It includes a complete full-stack setup, scalable architecture, and initial cloud hosting support — perfect for those entering the market.",
          l1: "Frontend + backend integration",
          l2: "Admin dashboard and APIs",
          l3: "Ideal for startups launching their first product"
        }
      },
      {
        packageName: "Accelerate",
        packageDesc: "Scaling startups",
        price: "₹2.1L - ₹10L",
        toolTip: {
          desc: "Accelerate is built for startups that have validated their product and are now scaling users, features, and performance. It delivers robust infrastructure, automated deployment, and optimized performance for smooth scaling.",
          l1: "Optimized architecture and caching",
          l2: "Multi-device support (web & mobile)",
          l3: "Perfect for growth-stage SaaS or B2C platforms"
        }
      },
      {
        packageName: "Momentum",
        packageDesc: "SME growth",
        price: "₹10L - ₹50L",
        toolTip: {
          desc: "Momentum is tailored for small and medium enterprises that need digital modernization and multi-platform operations. It combines scalability, data security, and strong analytics to streamline operations and boost growth.",
          l1: "Secure dashboards and cloud integration",
          l2: "Multi-platform support and CI/CD pipelines",
          l3: "Great for education, real-estate, or healthcare systems"
        }
      },
      {
        packageName: "Synergy",
        packageDesc: "Enterprise automation & AI",
        price: "₹50L - ₹1Cr",
        toolTip: {
          desc: "Synergy transforms established enterprises through intelligent automation, AI integration, and microservice-based systems. It focuses on productivity, performance, and smart automation workflows.",
          l1: "AI model integration and predictive tools",
          l2: "Workflow automation & analytics dashboards",
          l3: "Ideal for corporate CRMs, ERP automation, or FinTech"
        }
      },
      {
        packageName: "Nexus",
        packageDesc: "Digital transformation",
        price: "₹1Cr - ₹5Cr",
        toolTip: {
          desc: "Nexus offers complete digital transformation for enterprises modernizing their technology ecosystem. It integrates data engineering, cloud-native systems, and DevOps automation for scalable innovation.",
          l1: "Infrastructure-as-Code (Terraform, Kubernetes)",
          l2: "Multi-cloud and data pipeline architecture",
          l3: "Perfect for banks, trading firms, and telecom companies"
        }
      },
      {
        packageName: "Quantum",
        packageDesc: "Global AI & analytics",
        price: "₹5Cr - ₹8.4Cr",
        toolTip: {
          desc: "Quantum is for global enterprises seeking cutting-edge AI and big data analytics solutions. It brings together machine learning, predictive modeling, and large-scale data processing for next-gen intelligence.",
          l1: "AI-driven predictive systems",
          l2: "Stream and batch analytics pipelines",
          l3: "Ideal for financial, logistics, and research sectors"
        }
      },
      {
        packageName: "Zenith",
        packageDesc: "Strategic co-innovation",
        price: "₹8.4Cr - ₹10Cr+",
        toolTip: {
          desc: "Zenith represents Akdenar Labs’ highest tier of collaboration, partnering with national and global enterprises on strategic innovation. It focuses on co-developing next-generation digital ecosystems with AI, security, and governance at scale.",
          l1: "Multi-cloud & AI-driven architecture",
          l2: "Long-term R&D partnerships",
          l3: "Perfect for governments, banks, and Fortune 500 enterprises"
        }
      }
    ]
  },

  // ------- UI/UX Branding ---------

  {
    slug: "ui-ux",
    title: "UI/UX Branding",
    img: "/services/uiuximg.png",
    description:
      "We craft intuitive, visually compelling, and user-centered digital experiences. Our UI/UX process combines research, user psychology, and modern design systems to create interfaces that enhance engagement and improve usability. From wireframes to high-fidelity prototypes, we build designs that reflect your brand identity and deliver meaningful interactions across all devices.",
    techStack: [
      "Figma",
      "Adobe XD",
      "Photoshop",
      "Adobe Illustrator",
      "Framer",
      "Sketch"
    ],
    packages: [
      {
        packageName: "Small",
        packageDesc: "1-50 Screens",
        price: "₹10K - ₹50K",
        toolTip: {
          desc: "Ideal for startups and small businesses needing essential UI/UX design for web or mobile applications. This package includes wireframes, user flows, and high-fidelity designs for up to 50 screens.",
          l1: "User research and personas",
          l2: "Wireframing and prototyping"
        }
      },
      {
        packageName: "Medium",
        packageDesc: "50-200 Screens",
        price: "₹50K - ₹2.1L",
        toolTip: {
          desc: "Perfect for growing businesses requiring comprehensive UI/UX design across multiple platforms. This package covers detailed user journeys, interactive prototypes, and design systems for 50-200 screens.",
          l1: "Detailed user journey mapping",
          l2: "SaaS dashboards, multi-module apps",
          l3: "Design system creation for both web & mobile"
        }
      },
      {
        packageName: "Large",
        packageDesc: "200-500 Screens",
        price: "₹2.1L - ₹10L",
        toolTip: {
          desc: "Designed for large applications with complex user journeys and products that require advanced workflows, multi-platform consistency, and scalable design systems. We streamline architecture, optimize user patterns, and ensure visually cohesive experiences across hundreds of screens.",
          l1: "Comprehensive usability testing",
          l2: "e-commerce ecosystems, multi-role platforms, end-to-end product design (200–500 screens).",
          l3: "Cross-platform consistency (web, mobile, desktop)"
        }
      },
      {
        packageName: "Enterprise",
        packageDesc: "500-1000+ Screens",
        price: "₹10L - ₹50L",
        toolTip: {
          desc: "A full-scale UI/UX and product design solution for enterprises. This package delivers robust design foundations for mission-critical systems with large screen counts. UX strategy, component libraries, scalable design systems, user journey optimization, and collaboration with development teams.",
          l1: "Enterprise-level usability audits",
          l2: "Complex SaaS suites, and large-scale e-commerce (500–1000+ screens).",
          l3: "Advanced accessibility compliance and performance optimization"
        }
      }
    ]
  },

  // ------- Cloud & DevOps ---------

  {
    slug: "cloud-devops",
    title: "Cloud & DevOps",
    img: "/services/cloudimg.png",
    description:
      "We help businesses adopt modern cloud architectures and streamline operations through automated DevOps pipelines. Our cloud and DevOps solutions improve deployment speed, system reliability, scalability, and cost efficiency. We design secure cloud infrastructure, implement CI/CD workflows, and enable teams to deliver software faster and with higher resilience using industry-leading tools and platforms.",
    techStack: [
      "Kubernetes",
      "Docker",
      "Jenkins",
      "GitHub",
      "GitLab",
      "AWS",
      "Google Cloud",
      "Azure"
    ],
    packages: [
      {
        packageName: "Basic",
        packageDesc: "Startups",
        price: "₹10K - ₹50K",
        toolTip: {
          desc: "Perfect for early-stage teams adopting cloud infrastructure for the first time. We set up secure hosting, automate basic deployments, and ensure your application is scalable and easy to maintain.",
          l1: "Basic CI/CD pipelines",
          l2: "Containerization with Docker",
          l3: "Monitoring essentials (logs & alerts)"
        }
      },
      {
        packageName: "Standard",
        packageDesc: "SMEs",
        price: "₹50K - ₹2.1L",
        toolTip: {
          desc: "Designed for growing businesses that need reliable automation, improved performance, and stronger scalability.",
          l1: "Multi-stage CI/CD automation",
          l2: "Scalable container orchestration (Docker/K8s)",
          l3: "Auto-scaling & load balancing setup"
        }
      },
      {
        packageName: "Premium",
        packageDesc: "Enterprises",
        price: "₹2.1L - ₹10L",
        toolTip: {
          desc: "Built for enterprises requiring advanced automation, multi-cloud resilience, and high-performance infrastructure. We redesign cloud architecture, implement enterprise-grade CI/CD, and enforce top-tier security and compliance.",
          l1: "Enterprise CI/CD with zero-downtime deploys",
          l2: "Multi-cloud deployment strategies",
          l3: "Advanced performance tuning & IaC (Terraform)"
        }
      }
    ]
  },

  // ------- AI & Automation ---------

  {
    slug: "ai-automation",
    title: "AI & Automation",
    img: "/services/aiimg.png",
    description:
      "We build intelligent automation systems powered by modern AI models, enabling businesses to automate repetitive processes, reduce operational costs, and make smarter, data-driven decisions. Our AI solutions include predictive analytics, NLP automation, workflow bots, and autonomous AI agents that improve accuracy, speed, and workflow efficiency.",
    techStack: [
      "Python",
      "TensorFlow",
      "PyTorch",
      "LangChain",
      "OpenAI GPT Models",
      "HuggingFace Models",
      "FastAPI",
      "RPA Tools (UiPath, Automation Anywhere)",
      "NLP / LLM Fine-tuning",
      "Vector Databases (Pinecone, ChromaDB)",
      "Docker",
      "Kubernetes"
    ],
    packages: [
      {
        packageName: "Starter AI",
        packageDesc: "Entry-level automation & AI-based workflows",
        price: "₹20K - ₹80K",
        toolTip: {
          desc: "Perfect for businesses taking their first step into AI adoption. This package focuses on eliminating repetitive work and boosting efficiency using lightweight automation.",
          l1: "Basic RPA scripts for repetitive tasks",
          l2: "Simple data analysis and reporting"
        }
      },
      {
        packageName: "Growth AI",
        packageDesc: "Advanced automation with NLP, analytics & smart pipelines",
        price: "₹80K - ₹3L",
        toolTip: {
          desc: "Ideal for growing businesses looking to leverage AI for smarter workflows and data insights. This package includes NLP-powered automation, predictive analytics, and intelligent data processing.",
          l1: "NLP-based document processing",
          l2: "Predictive analytics dashboards",
          l3: "Automated data pipelines"
        }
      },
      {
        packageName: "Intelligent Suite",
        packageDesc:
          "Custom AI automation, LLM workflows, agents & integrations",
        price: "₹3L - ₹12L",
        toolTip: {
          desc: "Built for enterprises seeking to transform operations with cutting-edge AI. This package delivers custom AI agents, LLM-powered workflows, and deep integrations to automate complex processes and enhance decision-making.",
          l1: "Custom AI agent development",
          l2: "LLM integration with business systems",
          l3: "End-to-end intelligent automation",
        }
      },
      {
        packageName: "AI Enterprise Pro",
        packageDesc:
          "Full-scale intelligent automation with RPA + AI agent ecosystems",
        price: "₹12L - ₹1Cr+",
        toolTip: {
          desc: "Full-scale intelligent automation with RPA + AI agent ecosystems made for enterprises seeking complete digital transformation with AI ecosystems combining RPA + Advanced LLM Agents with predictive analytics and forecasting models built with TensorFlow/PyTorch.",
          l1: "Enterprise-grade RPA with AI enhancements",
          l2: "Private/Hybrid deployments with strong security (VPC, role-based access)",
          l3: "Suitable for finance, healthcare, operations, large HR teams, logistics, and global enterprises"
        }
      }
    ]
  },

  // ------- Digital Marketing & SEO ---------

  {
    slug: "digital-marketing-seo",
    title: "Digital Marketing & SEO",
    img: "/services/marketingimg.png",
    description:
      "We help brands grow through data-driven digital marketing strategies and advanced SEO techniques. Our team improves online visibility, increases organic traffic, and boosts conversions by combining analytics, content strategy, performance marketing, and search optimization. From social media to full-funnel campaigns, we deliver measurable and scalable marketing results.",
    techStack: [
      "Google Analytics",
      "Google Search Console",
      "Ahrefs",
      "SEMrush",
      "Moz",
      "Meta Ads Manager",
      "Google Ads",
      "HubSpot",
      "Canva / Figma",
      "Content Management Systems",
      "Keyword Research Tools",
      "Marketing Automation Tools"
    ],
    packages: [
      {
        packageName: "Starter Boost",
        packageDesc: "Basic SEO setup + essential digital presence",
        price: "₹15K - ₹40K",
        toolTip: {
          desc: "Essential SEO setup to establish your online presence. This package includes basic keyword research, on-page SEO, and initial content optimization to get your website noticed by search engines.",
          l1: "On-page SEO optimization",
          l2: "Basic content recommendations"
        }
      },
      {
        packageName: "Growth Engine",
        packageDesc: "SEO + content strategy + social media optimization",
        price: "₹40K - ₹1.5L",
        toolTip: {
          desc: "A strategy-focused package combining SEO, content planning, and social media optimization. Ideal for businesses looking to rank faster, build authority, and improve engagement. Supported by tools like HubSpot, Canva/Figma, CMS optimizers, and marketing automation platforms",
          l1: "Comprehensive keyword strategy",
          l2: "Social media profile optimization"
        }

      },
      {
        packageName: "Performance Pro",
        packageDesc: "SEO + ads + high-conversion marketing funnels",
        price: "₹1.5L - ₹6L",
        toolTip: {
          desc: "An advanced marketing package focused on performance and conversions. This tier includes full SEO audits, paid ad campaigns, and optimized marketing funnels to drive traffic and maximize ROI.",
          l1: "Full SEO audit and technical fixes",
          l2: "Targeted ad campaigns (Google, Meta)",
          l3: "Conversion rate optimization"
        }
      },
      {
        packageName: "Enterprise Scale",
        packageDesc:
          "Full digital marketing suite with multi-channel optimization",
        price: "₹6L - ₹50L+",
        toolTip: {
          desc: "A comprehensive digital marketing solution for enterprises seeking multi-channel growth. This package delivers end-to-end marketing strategies, advanced SEO, content marketing, social media management, and performance analytics to scale your brand globally.",
          l1: "Multi-channel marketing strategy",
          l2: "Advanced content marketing",
          l3: " Ideal for large companies needing long-term growth and omnichannel optimization."
        }
      }
    ]
  },

  // ------- Video Editing & Animation ---------

  {
    slug: "video-editing-animation",
    title: "Video Editing & Animation",
    img: "/services/editingimg.png",
    description:
      "We create captivating video content and high-production animations that empower brands to communicate visually with clarity and impact. Our services cover professional editing, motion graphics, product animation, explainer videos, ad commercials, and 2D/3D animation. We focus on storytelling, aesthetics, and cinematic quality to deliver content that boosts engagement and drives results.",
    techStack: [
      "Adobe Premiere Pro",
      "Final Cut Pro",
      "DaVinci Resolve",
      "After Effects",
      "Blender",
      "Cinema 4D",
      "Adobe Illustrator",
      "Maya",
      "Audition",
      "Mocha Pro",
      "Red Giant Tools"
    ],
    packages: [
      {
        packageName: "Starter Edit",
        packageDesc: "Basic editing, trimming, color correction, audio cleanup",
        price: "₹10K - ₹40K",
        toolTip: {
          desc: "Best for simple, clean video edits ideal for individuals and small businesses needing quick content.",
          l1: "Basic cuts and transitions",
          l2: "Basic graphics & social media posts"
        }

      },
      {
        packageName: "Social Media Pack",
        packageDesc: "Reels, shorts, ads, branded social content",
        price: "₹40K - ₹1L",
        toolTip: {
          desc: "Perfect package for optimized video content for social media platforms to boost engagement and reach.",
          l1: "Platform-specific edits (Instagram, YouTube)",
          l2: "Branded graphics and motion elements"
        }
      },
      {
        packageName: "Motion Graphics",
        packageDesc: "Animated text, transitions, infographics, visual overlays",
        price: "₹1L - ₹3L",
        toolTip: {
          desc: "Engaging motion graphics to enhance storytelling and visual appeal for marketing campaigns and presentations.",
          l1: "Motion graphics for campaigns",
          l2: "Best for: Marketing teams, product launches, social ads, and digital ad campaigns.",
          l3: "Includes animated infographics, and branded visual overlays."
          

        }
      },
      {
        packageName: "2D Animation Suite",
        packageDesc: "Explainer videos, product demos, animated characters",
        price: "₹3L - ₹8L",
        toolTip: {
          desc: "Engaging 2D animations for storytelling, product demos, and explainer videos. Ideal for startups and educational content.",
          l1: "Character animation and storytelling",
          l2: "Ideal for startups, educational content, and marketing videos.",

        }
      },
      {
        packageName: "3D Animation Pro",
        packageDesc:
          "3D product visualizations, environments, character animation",
        price: "₹8L - ₹25L",
        toolTip: {
          desc: "Advanced video production with cinematic edits and premium animation work advanced motion graphics & 3D animation. ",
          l1: "Photorealistic 3D modeling and animation",
          l2: "Perfect for product launches, architectural visualizations, and immersive storytelling.",
          l3: "Includes high-end rendering, VFX integration, and cinematic post-production."
        }
      },
      {
        packageName: "Cinematic Production",
        packageDesc:
          "End-to-end production: scripting, shooting, VFX, sound design",
        price: "₹25L - ₹1Cr+",
        toolTip: {
          desc: "Full-scale video & animation support functioning like an in-house production team. From concept to final cut, we handle everything for high-impact cinematic content.",
          l1: "Complete production services",
          l2: "Best for brands, agencies, and enterprises seeking top-tier video content.",
          l3: "Includes concept development, storyboarding, filming, post-production, and VFX."
        }
      }
    ]
  },

  // ------- QA & Testing ---------

  {
    slug: "qa-testing",
    title: "QA & Testing",
    img: "/services/testingimg.png",
    description:
      "We ensure software reliability, performance, and security through comprehensive QA and testing solutions. Our team combines manual and automated testing methods to detect issues early, improve user experience, and guarantee bug-free product launches. From functional testing to full enterprise QA automation, we deliver quality at every stage of the development lifecycle.",
    techStack: [
      "Selenium",
      "Cypress",
      "Playwright",
      "Postman",
      "JMeter",
      "K6 Load Testing",
      "JUnit",
      "Mocha / Chai",
      "Appium",
      "BrowserStack",
      "TestRail",
      "GitHub CI/CD Pipelines"
    ],
    packages: [
      {
        packageName: "Basic QA",
        packageDesc: "Manual testing for small apps, bug reporting, UI/UX checks",
        price: "₹8K - ₹40K",
        toolTip: {
          desc: "Basic manual testing to identify bugs and ensure UI/UX quality for small applications.",
          l1: "Manual test case execution",
          l2: "Bug reporting and tracking",
          l3: "UI/UX consistency checks"
        }
      },
      {
        packageName: "Functional Assurance",
        packageDesc: "End-to-end functional testing across all core features",
        price: "₹40K - ₹1.5L",
        toolTip: {
          desc: "Comprehensive functional testing to validate all core features and workflows of your application.",
          l1: "Detailed test case development",
          l2: "Ideal for growing products needing stability",
          l3: "End-to-end functional + regression testing"
        }
      },
      {
        packageName: "Automation Suite",
        packageDesc: "Automated test scripts, regression testing, CI integration",
        price: "₹1.5L - ₹5L",
        toolTip: {
          desc: "Automated testing solutions to improve efficiency and coverage, integrated with your CI/CD pipelines.",
          l1: "Selenium/Cypress automated scripts",
          l2: "A/B test setup + experiment QA",
          l3: "Ideal for scaling products with frequent releases"
        }
      },
      {
        packageName: "Performance & Security",
        packageDesc: "Load testing, stress testing, vulnerability checks",
        price: "₹5L - ₹15L",
        toolTip: {
          desc: "Advanced manual + automation testing with performance evaluation designed for scaling products needing deep technical, functional & automation coverage.",
          l1: "Load and stress testing (JMeter, K6)",
          l2: "Security vulnerability assessments",
          l3: "Detailed bug lifecycle tracking + test analysis"
        }
      },
      {
        packageName: "Enterprise QA",
        packageDesc:
          "Full QA department setup: automation + performance + manual",
        price: "₹15L - ₹1Cr+",
        toolTip: {
          desc: "For enterprises requiring continuous testing, large modules, and long-term quality ownership. This package includes a full QA strategy, team collaboration, and integration with DevOps pipelines to ensure top-tier quality at scale.",
          l1: "Full QA ownership: functional, regression, and automation",
          l2: "CI/CD test pipelines integrated with DevOps workflows",
          l3: "Ideal for large enterprises requiring robust quality assurance"
        }
      }
    ]
  },

  // ------- Graphic Designing ---------

  {
    slug: "graphic-designing",
    title: "Graphic Designing",
    img: "/services/designingimg.png",
    description:
      "We create visually engaging and brand-focused graphic designs that help businesses stand out. Our design process blends creativity, storytelling, and brand psychology to deliver banners, social media graphics, brand assets, product designs, and marketing creatives that elevate your visual identity across platforms.",
    techStack: [
      "Adobe Photoshop",
      "Adobe Illustrator",
      "Figma",
      "CorelDRAW",
      "Canva Pro",
      "Procreate",
      "Adobe InDesign",
      "Lightroom",
      "Brand Style Guides",
      "Typography Systems"
    ],
    packages: [
      {
        packageName: "Starter Pack",
        packageDesc: "Basic graphics, social media posts, simple brand assets",
        price: "₹5K - ₹25K",
        toolTip: {
          desc: "Ideal for individuals, small businesses, or startups needing quick, essential designs. Provides polished visuals to maintain a consistent brand presence.",
          l1: "Basic brand visuals and templates",
          l2: "Perfect for early-stage or low-volume design requirements",
        }
      },
      {
        packageName: "Brand Essentials",
        packageDesc: "Logo, color palette, typography, business branding kit",
        price: "₹25K - ₹1L",
        toolTip: {
          desc: "A complete branding foundation for companies building or refreshing their identity. Includes all core brand elements for cohesive visual communication.",
          l1: "Complete brand identity setup",
          l2: "Great for new brands looking for a strong visual identity"
        }
      },
      {
        packageName: "Marketing Creatives",
        packageDesc: "Ads, posters, product graphics, campaign designs",
        price: "₹1L - ₹3L",
        toolTip: {
          desc: "High-impact marketing designs tailored for campaigns, ads, and promotions. Helps brands engage audiences and improve conversion through visual storytelling.",
          l1: "Campaign-focused graphic design",
          l2:"Ad creatives (Google, Meta, LinkedIn)",
          l3: "Ideal for businesses running regular marketing initiatives"
        }
      },
      {
        packageName: "Premium Visual Suite",
        packageDesc: "High-end branding + creative direction + UI kits",
        price: "₹3L - ₹10L",
        toolTip: {
          desc: "A premium design package for brands seeking top-tier visual identity and creative direction. Delivers sophisticated designs that elevate brand perception and market positioning.",
          l1: "Advanced brand strategy and visuals",
          l2: "UI/UX visual assets for websites & apps",
          l3: "Perfect for established brands aiming for market leadership"
        }
      },
      {
        packageName: "Enterprise Design Partner",
        packageDesc: "Full design department: branding + marketing + assets",
        price: "₹10L - ₹50L+",
        toolTip: {
          desc: "A comprehensive design partnership for enterprises needing ongoing design support across branding, marketing, and product visuals. Functions as an in-house design team to maintain consistent quality and innovation.",
          l1: "Unlimited design requests with prioritization",
          l2: "Full design department support (branding + marketing + product)",
          l3: "Best for corporates, large teams, and multi-brand ecosystems"
        }
      }
    ]
  },

  // ------- Content Writing ---------

  {
    slug: "content-writing",
    title: "Content Writing",
    img: "/services/contentimg.png",
    description:
      "We create high-quality, SEO-optimized, and brand-aligned content that helps businesses communicate effectively and grow their digital presence. From blogs and website copy to product descriptions and long-form articles, our content combines strong storytelling, research, and keyword strategy to maximize engagement and conversions.",
    techStack: [
      "Grammarly Premium",
      "Hemingway",
      "SEO Writing Tools",
      "Surfer SEO",
      "Google Keyword Planner",
      "Ahrefs",
      "SEMrush",
      "Content Strategy Frameworks",
      "Brand Tone Guides"
    ],
    packages: [
      {
        packageName: "Starter Content",
        packageDesc: "Short blogs, website copy, basic SEO writing",
        price: "₹5K - ₹30K",
        toolTip: {
          desc: "Beginner-friendly content package designed for small businesses or individuals needing essential writing support.",
          l1: "Short-form blogs (300-500 words)",
          l2: "Basic website copywriting",
          l3: "Simple website content"
        }
      },
      {
        packageName: "SEO Content Pack",
        packageDesc: "SEO blogs, keyword research, landing page content",
        price: "₹30K - ₹60K",
        toolTip: {
          desc: "A content package focused on SEO optimization to improve search rankings and organic traffic.",
          l1: "SEO-optimized blog posts (500-1000 words)",
          l2: "Keyword research and integration",
          l3: "Ideal for brands building a clear identity and consistent tone across platforms."
        }
      },
      {
        packageName: "Authority Builder",
        packageDesc:
          "Long-form articles, technical content, research-driven writing",
        price: "₹60K - ₹1L",
        toolTip: {
          desc: "A premium content package with deeper storytelling, SEO strategy, and monthly planning. Solutions for businesses aiming to establish authority in their industry through in-depth, research-backed writing.",
          l1: "Long-form blogs (1,500–3,000 words)",
          l2: "SEO pillar content + topic clusters",
          l3: "Perfect for thought leadership and industry expertise"
        }
      },
      {
        packageName: "Enterprise Content Suite",
        packageDesc:
          "Full-scale content operations: blogs, web copy, content strategy",
        price: "₹1L - ₹2L+",
        toolTip: {
          desc: "Designed for growing companies needing continuous, large-scale content production. Full content department: strategy, execution & multi-channel writing support.",
          l1: "Dedicated content team (writers + editor)",
          l2: "360° content strategy & analytics",
          l3: "Best for large companies, agencies, and multi-brand ecosystems"
        }
      }
    ]
  }
];
// ...existing code...