import ProjectDetailLayout from "@/components/project-detail-layout"

export default function DeepfakeStudioProject() {
  return (
    <ProjectDetailLayout
      title="Deepfake Studio"
      subtitle="AI Detection & Generation Platform"
      description="DeepfakeStudio is a web application built with Flask that offers both deepfake detection and generation capabilities. The project focuses primarily on research and implementation of various deepfake detection models, while also providing a face-swapping generation feature. I served as Full-stack Developer & AI Specialist, responsible for deploying detection models to web application, developing face swapping functionality, and creating Shallow Neural Network model with ~82% accuracy."
      duration="4 months"
      timeline="01/2025 - 04/2025"
      role={["Full-stack Developer", "AI Specialist", "Research Engineer"]}
      tags={["Flask", "Deep Learning", "Computer Vision", "AI", "FPT University"]}
      technologies={[
        "Flask",
        "PyTorch",
        "ResNet50",
        "OpenCV",
        "ONNX",
        "MediaPipe",
        "InsightFace",
        "VidGear",
        "JavaScript",
        "HTML/CSS",
        "Deep Learning",
        "Computer Vision",
      ]}
      challenges={[
        "Implementing real-time deepfake detection with high accuracy",
        "Optimizing model performance for web deployment",
        "Creating intuitive interface for complex AI functionalities",
        "Balancing detection accuracy with processing speed",
      ]}
      learnings={[
        "Mastered deepfake detection algorithms and neural network architectures",
        "Gained experience in deploying AI models to web applications",
        "Learned advanced computer vision techniques for face manipulation",
        "Developed skills in research-oriented software development",
      ]}
      images={[
        {
          src: "/images/demo/deepfake_demo.png",
          alt: "Deepfake Studio Interface",
          caption: "Main interface showing detection and generation features",
        },
        {
          src: "/images/demo/deepfake-studio/demo_real.png",
          alt: "Real face detection",
          caption: "Real face detection with confidence score",
        },
        {
          src: "/images/demo/deepfake-studio/demo_fake.png",
          alt: "Fake face detection",
          caption: "Deepfake detection showing manipulation indicators",
        },
      ]}
      heroVideo="/images/demo/deepfake-studio/full-demo.mp4"
      gradientFrom="#0f172a"
      gradientTo="#10b981"
      githubUrl="https://github.com/callmefao/DeepfakeStudio"
    />
  )
}
