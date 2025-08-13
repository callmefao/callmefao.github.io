import ProjectDetailLayout from "@/components/project-detail-layout"

export default function GenAIChatProject() {
  return (
    <ProjectDetailLayout
      title="Django Chatbot using google.openapi"
      subtitle="AI-Powered Web Application"
      description="Developed a Django web app that integrates with Google's OpenAPI to provide intelligent conversational AI capabilities. This rapid development project was completed in just 2 days, demonstrating efficient development practices and modern web technologies. The chatbot provides intelligent responses, maintains conversation context, and offers a seamless user experience through a modern web interface."
      duration="2 days"
      timeline="03/2025 (2 days)"
      role={["Full-stack Developer"]}
      tags={["Django", "AI", "LLM", "Web Development", "FPT University"]}
      technologies={[
        "Django",
        "Python",
        "Google OpenAPI",
        "JavaScript",
        "HTML/CSS",
        "Bootstrap",
        "SQLite",
        "AJAX",
        "REST API",
        "Git",
      ]}
      challenges={[
        "Integrating with Google OpenAPI for intelligent responses",
        "Implementing real-time chat functionality with AJAX",
        "Managing conversation context and chat history",
        "Rapid development within 2-day timeframe",
      ]}
      learnings={[
        "Mastered rapid prototyping and development techniques",
        "Gained experience with conversational AI integration",
        "Learned efficient Django development patterns",
        "Developed skills in API integration and real-time web applications",
      ]}
      images={[
        {
          src: "/images/demo/chat.png",
          alt: "Django Chatbot Interface",
          caption: "Clean and intuitive chat interface with AI responses",
        },
      ]}
      gradientFrom="#111827"
      gradientTo="#2563eb"
      githubUrl="https://github.com/callmefao/GenAIChat-Web"
    />
  )
}
