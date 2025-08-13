import ProjectDetailLayout from "@/components/project-detail-layout"

export default function FPTAIResearchPage() {
  return (
    <ProjectDetailLayout
      title="AI Research Project"
      subtitle="Machine Learning & Research"
      description="Research project in artificial intelligence and machine learning, exploring cutting-edge techniques and applications in modern AI systems at FPT University. This project focuses on advancing the understanding of AI algorithms and their practical implementations in solving complex real-world problems."
      duration="4 months"
      timeline="2025"
      role={["AI Researcher", "Machine Learning Engineer"]}
      technologies={[
        "Python",
        "TensorFlow", 
        "PyTorch",
        "Scikit-learn",
        "Pandas",
        "NumPy",
        "Jupyter Notebook",
        "OpenCV",
        "Natural Language Processing",
        "Deep Learning",
        "Research Methodology"
      ]}
      challenges={[
        "Implementing state-of-the-art AI algorithms from research papers",
        "Handling large-scale datasets for training and validation",
        "Optimizing model performance and computational efficiency",
        "Bridging theoretical concepts with practical applications",
      ]}
      learnings={[
        "Advanced understanding of machine learning algorithms and architectures",
        "Experience in conducting systematic research and literature review",
        "Skills in experimental design and statistical analysis",
        "Knowledge of AI ethics and responsible AI development",
      ]}
      images={[
        {
          src: "/images/fu-logo.png",
          alt: "FPT University AI Research Project",
          caption: "AI Research Project conducted at FPT University",
        },
      ]}
      gradientFrom="#f97316"
      gradientTo="#dc2626"
      githubUrl="https://github.com/callmefao/fpt-ai-research"
    />
  )
}
