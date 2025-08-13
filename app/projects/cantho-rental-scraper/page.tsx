import ProjectDetailLayout from "@/components/project-detail-layout"

export default function CanThoRentalProject() {
  return (
    <ProjectDetailLayout
      title="Can Tho Rental Listings Scraper"
      subtitle="Web Scraping & Data Collection"
      description="Extracted rental listings from a website about Can Tho motel, collecting key details such as title, price, area, phone number, and detail page link. This project demonstrates efficient web scraping techniques and data extraction methods for real estate information. The scraper automatically processes multiple listings and organizes the data in a structured format for analysis."
      duration="1 month"
      timeline="2024"
      role={["Data Engineer", "Python Developer"]}
      tags={["Python", "Web Scraping", "Data Collection", "FPT University"]}
      technologies={[
        "Python",
        "BeautifulSoup",
        "Requests",
        "Pandas",
        "CSV",
        "JSON",
        "Web Scraping",
        "Data Processing",
        "Regular Expressions",
        "Data Cleaning",
      ]}
      challenges={[
        "Handling dynamic content and JavaScript-rendered elements",
        "Managing rate limiting and anti-scraping measures",
        "Extracting structured data from unstructured HTML",
        "Ensuring data quality and consistency across listings",
      ]}
      learnings={[
        "Mastered web scraping techniques and best practices",
        "Gained experience in data extraction and processing",
        "Learned efficient data cleaning and validation methods",
        "Developed skills in handling large datasets",
      ]}
      images={[
        {
          src: "/images/demo/CanThoMotel_demo.png",
          alt: "Can Tho Rental Scraper Results",
          caption: "Structured data extraction showing rental listings with details",
        },
      ]}
      gradientFrom="#0f172a"
      gradientTo="#6d28d9"
      githubUrl="https://github.com/callmefao/DemoCrawlData"
    />
  )
}
