export interface PersonalInfo {
  name: string
  title: string
  introduction?: string // Made optional since we'll remove it
  avatar: string
  aboutImage: string
  email: string
  phone: string
  address: string
  githubUrl?: string
  linkedinUrl?: string
  facebookUrl?: string
  portfolioUrl?: string
}

export interface Service {
  id: string
  title: string
  description: string
  icon: string
}

export interface Project {
  id: string
  title: string
  subtitle: string
  type: string
  category: 'personal' | 'group' | 'internship' 
  organization?: string 
  description: string
  imageSrc: string
  tags: string[]
  timeline: string 
  timelineSort: Date 
  githubUrl?: string
  detailUrl?: string
  priority?: boolean
  gradientFrom?: string
  gradientTo?: string
}

export interface CategoryInfo {
  label: string
  icon?: string
  logo?: string
  color: string
}

// Personal Information
export const personalInfo: PersonalInfo = {
  name: "fao",
  title: "AI Engineer/Web Developer",
  avatar: "/images/figure-face-swapped.png",
  aboutImage: "/images/img1.jpg",
  email: "phuongha27404@gmail.com",
  phone: "+84943848459",
  address: "Can Tho, Viet Nam",
  githubUrl: "https://github.com/callmefao",
  linkedinUrl: "https://linkedin.com/in/phương-huỳnh-51019b312/",
  facebookUrl: "https://www.facebook.com/hap2704/",
  portfolioUrl: "https://callmefao.github.io" 
}

// Services
export const services: Service[] = [
  {
    id: "ai-engineer",
    title: "AI Engineer",
    description: "Developing and implementing AI models and solutions for real-world applications.",
    icon: "fas fa-code"
  },
  {
    id: "web-developer", 
    title: "Web Developer",
    description: "Building robust web applications using modern frameworks like Flask, Django, and Next.js.",
    icon: "fas fa-globe"
  }
]

// Projects (unsorted array)
const projectsData: Project[] = [
  // TODO: Uncomment and customize this template when adding FPT Software internship project
  /*
  {
    id: "fpt-software-internship",
    title: "AI/ML Project at FPT Software", 
    subtitle: "Student Internship Project",
    type: "Internship Project",
    category: "internship",
    organization: "FPT Software",
    description: "Your project description here...",
    imageSrc: "/images/demo/fpt-project.png",
    tags: ["AI/ML", "Python", "TensorFlow", "FSoft"],
    timeline: "06/2025 - 08/2025",
    timelineSort: new Date(2025, 7), // August 2025
    githubUrl: "https://github.com/callmefao/fpt-internship-project",
    detailUrl: "/projects/fpt-internship",
    priority: false,
    gradientFrom: "#ff6b6b",
    gradientTo: "#4ecdc4"
  },
  */
  {
    id: "fpt-software-cinema-management",
    title: "Cinema Management System",
    subtitle: "Full-Stack Web Application with AI Chatbot",
    type: "Internship Project",
    category: "internship",
    organization: "FPT Software",
    description: "Mock project for Student Internship at FPT Software. A comprehensive cinema management system featuring ticket booking, movie management, booking administration, and AI-powered chatbot assistance. This project demonstrates modern software development practices using microservices architecture and agile methodologies.",
    imageSrc: "/images/fsoft-logo.png",
    tags: ["Spring Boot", "FastAPI", "React.js", "PostgreSQL", "Qdrant", "Docker", "GitLab", "Jira", "Agile", "FSoft"],
    timeline: "05/2025 - 08/2025",
    timelineSort: new Date(2025, 7), // August 2025
    githubUrl: "https://github.com/callmefao/fpt-cinema-management",
    detailUrl: "/projects/fpt-cinema-management",
    priority: true,
    gradientFrom: "#ff6b6b",
    gradientTo: "#4ecdc4"
  },
  {
    id: "cantho-rental-scraper",
    title: "Can Tho Rental Listings Scraper",
    subtitle: "Web Scraping & Data Collection",
    type: "Personal Project",
    category: "personal",
    organization: "FPT University",
    description: "Extracted rental listings from a website about Can Tho motel, collecting key details such as title, price, area, phone number, and detail page link.",
    imageSrc: "/images/demo/CanThoMotel_demo.png",
    tags: ["Python", "Web Scraping", "Data Collection", "FPT University"],
    timeline: "12/2024",
    timelineSort: new Date(2024, 11), // December 2024
    githubUrl: "https://github.com/callmefao/DemoCrawlData",
    detailUrl: "/projects/cantho-rental-scraper",
    priority: true,
    gradientFrom: "#0f172a",
    gradientTo: "#6d28d9"
  },
  {
    id: "django-chatbot",
    title: "Django Chatbot using google.openapi",
    subtitle: "AI-Powered Web Application",
    type: "Personal Project",
    category: "personal",
    organization: "FPT University",
    description: "Developed a Django web app, call API from google.openapi to chat with LLM models",
    imageSrc: "/images/demo/chat.png",
    tags: ["Django", "AI", "LLM", "Web Development", "FPT University"],
    timeline: "03/2025",
    timelineSort: new Date(2025, 2), // March 2025
    githubUrl: "https://github.com/callmefao/GenAIChat-Web",
    detailUrl: "/projects/genaichat",
    priority: false,
    gradientFrom: "#111827",
    gradientTo: "#2563eb"
  },
  {
    id: "vehicle-density-monitoring",
    title: "Real-Time Vehicle Density Monitoring",
    subtitle: "Computer Vision & Traffic Analysis",
    type: "Group Project",
    category: "group",
    organization: "FPT University",
    description: "Develop a Flask web application that monitors traffic density by displaying a fixed road on a map and using the YOLO model for real-time vehicle counting. The road color changes based on vehicle density, reflecting traffic conditions.",
    imageSrc: "/images/demo/Car_counting_demo.png",
    tags: ["Flask", "YOLO", "Computer Vision", "Real-time", "FPT University"],
    timeline: "11/2024 - 02/2025",
    timelineSort: new Date(2025, 1), // February 2025 (end date for sorting)
    githubUrl: "https://github.com/callmefao/Realtime---Car-Counting",
    detailUrl: "/projects/realtime-car-counting",
    priority: false,
    gradientFrom: "#0b132b",
    gradientTo: "#5bc0be"
  },
  {
    id: "deepfake-studio",
    title: "Deepfake Studio",
    subtitle: "AI Detection & Generation Platform",
    type: "Group Project",
    category: "group",
    organization: "FPT University",
    description: "DeepfakeStudio is a web application built with Flask that offers both deepfake detection and generation capabilities. The project focuses primarily on research and implementation of various deepfake detection models, while also providing a face-swapping generation feature.",
    imageSrc: "/images/demo/deepfake_demo.png",
    tags: ["Flask", "Deep Learning", "Computer Vision", "AI", "FPT University"],
    timeline: "01/2025 - 04/2025",
    timelineSort: new Date(2025, 3), // April 2025 (end date for sorting)
    githubUrl: "https://github.com/callmefao/DeepfakeStudio",
    detailUrl: "/projects/deepfake-studio",
    priority: false,
    gradientFrom: "#0f172a",
    gradientTo: "#10b981"
  }
]

// Sort projects by timeline (most recent first)
export const projects: Project[] = [...projectsData].sort((a, b) => 
  b.timelineSort.getTime() - a.timelineSort.getTime()
)

// Helper function to get category display info
export const getCategoryInfo = (category: Project['category']): CategoryInfo => {
  switch (category) {
    case 'personal':
      return { label: 'Personal Project', icon: '👤', color: 'bg-blue-500/20 text-blue-300 border-blue-400/30' }
    case 'group':
      return { label: 'Group Project', icon: '👥', color: 'bg-green-500/20 text-green-300 border-green-400/30' }
    case 'internship':
      return { label: 'Internship Project', icon: '🎓', color: 'bg-purple-500/20 text-purple-300 border-purple-400/30' }
    default:
      return { label: 'Other', icon: '📁', color: 'bg-gray-500/20 text-gray-300 border-gray-400/30' }
  }
}

// Helper function to get logo for specific tags
export const getTagLogo = (tag: string): string | null => {
  switch (tag.toLowerCase()) {
    case 'fpt university':
      return '/images/fu-logo.png'
    case 'fsoft':
    case 'fpt software':
      return '/images/fsoft-logo.png'
    default:
      return null
  }
}

// Companies worked with (if any)
export const companies: string[] = [
  // Add companies here if available
]
