/import ProjectDetailLayout from "@/components/project-detail-layout"

export default function FPTCinemaManagementPage() {
  return (
    <ProjectDetailLayout
      title="Cinema Management System"
      subtitle="Full-Stack Web Application with AI Chatbot"
      description="Mock project for Student Internship at FPT Software. A comprehensive cinema management system featuring ticket booking, movie management, booking administration, and AI-powered chatbot assistance. This project demonstrates modern software development practices using microservices architecture and agile methodologies in a professional environment."
      duration="4 months"
      timeline="May 2025 - August 2025"
      role={["Student Intern", "Backend Developer", "Frontend Developer", "AI Engineer"]}
      technologies={[
        "Spring Boot",
        "FastAPI", 
        "React.js",
        "PostgreSQL",
        "Qdrant",
        "Docker",
        "GitLab",
        "Jira",
        "Agile Methodology",
        "Microservices Architecture",
        "RESTful API",
        "AI Chatbot",
        "Version Control",
        "CI/CD"
      ]}
      tags={["Spring Boot", "FastAPI", "React.js", "PostgreSQL", "Qdrant", "Docker", "GitLab", "Jira", "Agile", "FSoft"]}
      challenges={[
        "Implementing microservices architecture with Spring Boot and FastAPI",
        "Integrating vector database (Qdrant) for AI chatbot functionality",
        "Managing complex booking system with concurrent user access",
        "Coordinating between multiple development teams using Agile methodology",
        "Ensuring data consistency across multiple services and databases",
      ]}
      learnings={[
        "Gained hands-on experience with enterprise-level software development",
        "Mastered microservices architecture and inter-service communication",
        "Learned professional project management using Jira and Agile practices",
        "Developed skills in both backend and frontend development",
        "Understanding of AI integration in real-world applications",
        "Experience with Docker containerization and deployment strategies"
      ]}
      images={[
        {
          src: "/images/demo/MovieTheaterManagement.png",
          alt: "FPT Software Cinema Management System",
          caption: "Student Internship Project at FPT Software - Cinema Management System",
        },
      ]}
      gradientFrom="#ff6b6b"
      gradientTo="#4ecdc4"
      githubUrl="https://github.com/callmefao/fpt-cinema-management"
    />
  )
}
