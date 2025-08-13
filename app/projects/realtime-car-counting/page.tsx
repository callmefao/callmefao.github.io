import ProjectDetailLayout from "@/components/project-detail-layout"

export default function VehicleDensityProject() {
  return (
    <ProjectDetailLayout
      title="Real-Time Vehicle Density Monitoring"
      subtitle="Computer Vision & Traffic Analysis"
      description="Developed a Flask web application that monitors traffic density by displaying a fixed road on a map and using the YOLO model for real-time vehicle counting. The road color changes based on vehicle density, reflecting traffic conditions. The system provides real-time vehicle counting on a road, displayed in 4 interactive frames with map visualization, vehicle counts, pie charts, and time series data."
      duration="4 months"
      timeline="11/2024 - 02/2025"
      role={["Backend Developer", "Computer Vision Engineer"]}
      tags={["Flask", "YOLO", "Computer Vision", "Real-time", "FPT University"]}
      technologies={[
        "Flask",
        "YOLO",
        "OpenCV",
        "Python",
        "Computer Vision",
        "Real-time Processing",
        "JavaScript",
        "HTML/CSS",
        "Chart.js",
        "Maps API",
        "Video Processing",
        "Machine Learning",
      ]}
      challenges={[
        "Implementing real-time vehicle detection with YOLO model",
        "Creating interactive map visualization with traffic data",
        "Processing live video streams efficiently",
        "Synchronizing multiple data visualization frames",
      ]}
      learnings={[
        "Mastered computer vision techniques for traffic analysis",
        "Gained experience in real-time data processing and visualization",
        "Learned YOLO object detection implementation",
        "Developed skills in Flask web application development",
      ]}
      images={[
        {
          src: "/images/demo/Car_counting_demo.png",
          alt: "Vehicle Density Monitoring System",
          caption: "Real-time traffic monitoring with multiple visualization frames",
        },
        {
          src: "/images/demo/realtime-car-counting/map_frame.png",
          alt: "Interactive Map Frame",
          caption: "Map visualization showing traffic density by road color",
        },
        {
          src: "/images/demo/realtime-car-counting/counting_frame.png",
          alt: "Vehicle Counting Frame",
          caption: "Real-time vehicle detection and counting interface",
        },
      ]}
      heroVideo="/images/demo/realtime-car-counting/Youtube_video.mp4"
      gradientFrom="#0b132b"
      gradientTo="#5bc0be"
      githubUrl="https://github.com/callmefao/Realtime---Car-Counting"
    />
  )
}
