export interface TechCategory {
  name: string
  color: string
  dotColor: string
  technologies: string[]
}

export const techCategories: Record<string, TechCategory> = {
  'backend-ai': {
    name: 'Backend & AI',
    color: 'blue',
    dotColor: 'bg-blue-400',
    technologies: [
      'Python',
      'Flask',
      'Django',
      'FastAPI',
      'Spring Boot',
      'Java',
      'AI',
      'AI/ML',
      'Deep Learning',
      'Machine Learning',
      'TensorFlow',
      'PyTorch',
      'Computer Vision',
      'YOLO',
      'LLM',
      'PostgreSQL',
      'SQL',
      'Qdrant',
      'RAG',
      'Retrieval-Augmented Generation'
    ]
  },
  'frontend-ui': {
    name: 'Frontend & UI',
    color: 'green',
    dotColor: 'bg-green-400',
    technologies: [
      'React.js',
      'JavaScript',
      'TypeScript',
      'HTML',
      'CSS',
      'Web Development',
      'Next.js'
    ]
  },
  'tools-libraries': {
    name: 'Tools & Libraries',
    color: 'purple',
    dotColor: 'bg-purple-400',
    technologies: [
      'Docker',
      'GitLab',
      'Git',
      'GitHub',
      'Jira',
      'Web Scraping',
      'Data Collection',
      'Agile',
      'Real-time'
    ]
  }
}

// Helper function to categorize a technology
export function categorizeTechnology(tech: string): string | null {
  for (const [categoryId, category] of Object.entries(techCategories)) {
    if (category.technologies.some(t => 
      t.toLowerCase() === tech.toLowerCase() || 
      tech.toLowerCase().includes(t.toLowerCase()) ||
      t.toLowerCase().includes(tech.toLowerCase())
    )) {
      return categoryId
    }
  }
  return null
}

// Helper function to get categorized technologies from a list
export function categorizeTechnologies(technologies: string[]): Record<string, string[]> {
  const categorized: Record<string, string[]> = {
    'backend-ai': [],
    'frontend-ui': [],
    'tools-libraries': [],
    'other': []
  }

  technologies.forEach(tech => {
    const category = categorizeTechnology(tech)
    if (category) {
      categorized[category].push(tech)
    } else {
      categorized.other.push(tech)
    }
  })

  // Remove empty categories
  Object.keys(categorized).forEach(key => {
    if (categorized[key].length === 0) {
      delete categorized[key]
    }
  })

  return categorized
}

// Helper function to get category display info
export function getCategoryInfo(categoryId: string): TechCategory | null {
  return techCategories[categoryId] || null
}

// Helper function to get technology color based on category
export function getTechColor(tech: string): string {
  const categoryId = categorizeTechnology(tech)
  if (!categoryId) return 'white'
  
  const category = techCategories[categoryId]
  return category.color
}
