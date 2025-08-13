import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Calendar, Clock, Users, Code, Lightbulb } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import RevealOnView from "@/components/reveal-on-view"
import { getTagLogo } from "@/lib/portfolio-data"
import { categorizeTechnologies, getCategoryInfo } from "@/lib/tech-stack"
import DotGridShader from "@/components/DotGridShader"

type ProjectDetailProps = {
  title: string
  subtitle: string
  description: string
  duration: string
  timeline: string
  role: string[]
  technologies: string[]
  challenges: string[]
  learnings: string[]
  images: Array<{
    src: string
    alt: string
    caption?: string
  }>
  heroVideo?: string // Add support for hero video
  gradientFrom: string
  gradientTo: string
  liveUrl?: string
  githubUrl?: string
  tags?: string[] // Add tags to support organization logos
}

export default function ProjectDetailLayout({
  title,
  subtitle,
  description,
  duration,
  timeline,
  role,
  technologies,
  challenges,
  learnings,
  images,
  heroVideo,
  gradientFrom,
  gradientTo,
  liveUrl,
  githubUrl,
  tags = [], // Default empty array
}: ProjectDetailProps) {
  return (
    <>
      {/* Fixed Animated Background */}
      <div className="fixed inset-0 w-full h-full z-0">
        <DotGridShader className="w-full h-full" />
      </div>
      
      <main className="bg-transparent text-white min-h-screen relative z-10">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-neutral-950/95 backdrop-blur-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button asChild variant="ghost" size="sm" className="text-white hover:bg-white/10">
              <Link href="/" className="flex items-center gap-2 text-white no-underline">
                <ArrowLeft className="h-4 w-4 text-white" />
                <span className="text-white">Back to Portfolio</span>
              </Link>
            </Button>
            <div className="flex items-center gap-3">
              {githubUrl && (
                <Button asChild variant="outline" size="sm" className="border-white/50 bg-white/10 text-white hover:bg-white/20 hover:border-white/70 transition-all duration-200 !opacity-100">
                  <Link href={githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-white no-underline">
                    <Code className="h-4 w-4 text-white" />
                    <span className="text-white font-medium">Code</span>
                  </Link>
                </Button>
              )}
              {liveUrl && (
                <Button asChild size="sm" className="bg-white text-black hover:bg-white/90 !opacity-100">
                  <Link href={liveUrl} target="_blank" rel="noopener noreferrer">
                    View Live
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16">
        <RevealOnView className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-black leading-tight mb-6">{title}</h1>
          <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">{subtitle}</p>
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {role.map((r) => (
              <Badge key={r} variant="secondary" className="bg-white/30 text-white border-white/50 font-medium hover:bg-white/40 transition-colors">
                {r}
              </Badge>
            ))}
          </div>
        </RevealOnView>

        {/* Hero Image/Video */}
        <RevealOnView
          delay={0.2}
          className="relative aspect-video rounded-3xl overflow-hidden border border-white/10 mb-16"
        >
          <div
            className="absolute inset-0 p-1"
            style={{
              backgroundImage: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})`,
            }}
          >
            <div className="relative w-full h-full rounded-[1.35rem] overflow-hidden bg-black">
              {heroVideo ? (
                <video
                  controls
                  className="w-full h-full object-cover"
                  poster={images[0]?.src}
                >
                  <source src={heroVideo} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <Image
                  src={images[0]?.src || "/placeholder.svg"}
                  alt={images[0]?.alt || title}
                  fill
                  className="object-cover"
                  priority
                />
              )}
              
              {/* Organization Logo Overlay */}
              {(() => {
                const tagWithLogo = tags.find(tag => getTagLogo(tag))
                const logoSrc = tagWithLogo ? getTagLogo(tagWithLogo) : null
                
                return logoSrc ? (
                  <div className="absolute top-4 right-4 z-20">
                    <Badge
                      variant="outline"
                      className="bg-black/80 text-white/90 border-white/30 backdrop-blur-sm text-xs flex items-center gap-1"
                    >
                      <Image
                        src={logoSrc}
                        alt={`${tagWithLogo} logo`}
                        width={16}
                        height={16}
                        className="rounded-sm object-contain"
                      />
                      {tagWithLogo}
                    </Badge>
                  </div>
                ) : null
              })()}
            </div>
          </div>
        </RevealOnView>
      </section>

      {/* Project Info Grid */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <RevealOnView delay={0.1} className="space-y-3">
            <div className="flex items-center gap-2 text-white/90">
              <Calendar className="h-5 w-5 text-white" />
              <span className="text-sm font-medium text-white">Timeline</span>
            </div>
            <p className="text-lg font-semibold">{timeline}</p>
          </RevealOnView>

          <RevealOnView delay={0.2} className="space-y-3">
            <div className="flex items-center gap-2 text-white/90">
              <Clock className="h-5 w-5 text-white" />
              <span className="text-sm font-medium text-white">Duration</span>
            </div>
            <p className="text-lg font-semibold">{duration}</p>
          </RevealOnView>

          <RevealOnView delay={0.3} className="space-y-3">
            <div className="flex items-center gap-2 text-white/90">
              <Users className="h-5 w-5 text-white" />
              <span className="text-sm font-medium text-white">Role</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {role.map((r) => (
                <Badge key={r} variant="outline" className="text-xs bg-white/20 text-white border-white/40">
                  {r}
                </Badge>
              ))}
            </div>
          </RevealOnView>

          <RevealOnView delay={0.4} className="space-y-3">
            <div className="flex items-center gap-2 text-white/90">
              <Code className="h-5 w-5 text-white" />
              <span className="text-sm font-medium text-white">Technologies</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {technologies.slice(0, 3).map((tech) => (
                <Badge key={tech} variant="outline" className="text-xs bg-white/20 text-white border-white/40">
                  {tech}
                </Badge>
              ))}
              {technologies.length > 3 && (
                <Badge variant="outline" className="text-xs bg-white/15 text-white/80 border-white/30">
                  +{technologies.length - 3}
                </Badge>
              )}
            </div>
          </RevealOnView>
        </div>

        {/* Description */}
        <RevealOnView delay={0.5} className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">Project Overview</h2>
          <p className="text-lg text-white/80 leading-relaxed">{description}</p>
        </RevealOnView>
      </section>

      {/* Technologies Section */}
      <section className="container mx-auto px-4 py-16">
        <RevealOnView className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-center">Technologies & Tools</h2>
          
          {/* Flexible Technology Grid */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {technologies.map((tech, index) => (
              <RevealOnView
                key={tech}
                delay={index * 0.05}
                className="px-4 py-2 rounded-full bg-gradient-to-r from-white/10 to-white/5 border border-white/20 hover:from-white/20 hover:to-white/10 hover:border-white/30 transition-all duration-300 backdrop-blur-sm"
              >
                <span className="font-medium text-white text-sm whitespace-nowrap">{tech}</span>
              </RevealOnView>
            ))}
          </div>

          {/* Technology Categories */}
          {(() => {
            const categorized = categorizeTechnologies(technologies)
            const hasCategories = Object.keys(categorized).length > 1 || 
              (Object.keys(categorized).length === 1 && !categorized.other)
            
            if (!hasCategories) return null
            
            return (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Object.entries(categorized).map(([categoryId, techs], index) => {
                  if (categoryId === 'other' || techs.length === 0) return null
                  
                  const categoryInfo = getCategoryInfo(categoryId)
                  if (!categoryInfo) return null
                  
                  const colorClasses = {
                    blue: { bg: 'bg-blue-500/20', text: 'text-blue-200' },
                    green: { bg: 'bg-green-500/20', text: 'text-green-200' },
                    purple: { bg: 'bg-purple-500/20', text: 'text-purple-200' },
                  }
                  
                  const colors = colorClasses[categoryInfo.color as keyof typeof colorClasses] || colorClasses.blue
                  
                  return (
                    <RevealOnView key={categoryId} delay={0.3 + index * 0.1} className="p-6 rounded-xl bg-white/5 border border-white/10">
                      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <div className={`w-2 h-2 ${categoryInfo.dotColor} rounded-full`}></div>
                        {categoryInfo.name}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {techs.map(tech => (
                          <span key={tech} className={`px-3 py-1 ${colors.bg} ${colors.text} rounded-full text-sm`}>
                            {tech}
                          </span>
                        ))}
                      </div>
                    </RevealOnView>
                  )
                })}
              </div>
            )
          })()}
        </RevealOnView>
      </section>

      {/* Challenges & Solutions */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12">
          <RevealOnView delay={0.1}>
            <h2 className="text-2xl font-bold mb-6">Challenges</h2>
            <div className="space-y-4">
              {challenges.map((challenge, index) => (
                <div key={index} className="p-4 rounded-xl bg-red-500/10 border border-red-500/20">
                  <p className="text-white/90">{challenge}</p>
                </div>
              ))}
            </div>
          </RevealOnView>

          <RevealOnView delay={0.2}>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Lightbulb className="h-6 w-6" />
              Key Learnings
            </h2>
            <div className="space-y-4">
              {learnings.map((learning, index) => (
                <div key={index} className="p-4 rounded-xl bg-green-500/10 border border-green-500/20">
                  <p className="text-white/90">{learning}</p>
                </div>
              ))}
            </div>
          </RevealOnView>
        </div>
      </section>

      {/* Additional Images */}
      {images.length > 1 && (
        <section className="container mx-auto px-4 py-16">
          <RevealOnView className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-8">Project Gallery</h2>
            <div className="grid gap-8">
              {images.slice(1).map((image, index) => (
                <RevealOnView
                  key={index}
                  delay={index * 0.1}
                  className="relative aspect-video rounded-2xl overflow-hidden border border-white/10"
                >
                  <Image src={image.src || "/placeholder.svg"} alt={image.alt} fill className="object-cover" />
                  {image.caption && (
                    <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm rounded-lg px-3 py-2">
                      <p className="text-sm text-white/90">{image.caption}</p>
                    </div>
                  )}
                </RevealOnView>
              ))}
            </div>
          </RevealOnView>
        </section>
      )}

      {/* Footer CTA */}
      <section className="container mx-auto px-4 py-16">
        <RevealOnView className="text-center">
          <h2 className="text-2xl font-bold mb-4">Interested in working together?</h2>
          <p className="text-white/70 mb-8 max-w-md mx-auto">
            Let's discuss your next project and how I can help bring your ideas to life.
          </p>
          <Button asChild size="lg" className="rounded-full">
            <Link href="mailto:brandon@portfolio.dev">Get in touch</Link>
          </Button>
        </RevealOnView>
      </section>
      </main>
    </>
  )
}
