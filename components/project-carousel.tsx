"use client"

import Image from "next/image"
import Link from "next/link"
import { Github, Info, Calendar, Building } from "lucide-react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import RevealOnView from "@/components/reveal-on-view"
import type { Project } from "@/lib/portfolio-data"
import { getCategoryInfo, getTagLogo } from "@/lib/portfolio-data"

type Props = {
  projects: Project[]
  className?: string
}

export default function ProjectCarousel({ projects, className }: Props) {
  return (
    <div className={cn("space-y-6", className)}>
      {projects.map((project, idx) => {
        const categoryInfo = getCategoryInfo(project.category)
        
        return (
        <RevealOnView key={project.id} delay={idx * 0.1}>
          <div className="group relative h-[350px] sm:h-[400px] lg:h-[450px] rounded-3xl overflow-hidden border border-white/10 shadow-[0_10px_60px_-10px_rgba(0,0,0,0.6)] hover:shadow-[0_20px_80px_-10px_rgba(0,0,0,0.8)] transition-shadow duration-500">
            {/* Background with gradient border */}
            <div
              className="absolute inset-0 p-1"
              style={{
                backgroundImage: `linear-gradient(135deg, ${project.gradientFrom}, ${project.gradientTo})`,
              }}
            >
              <div className="relative w-full h-full rounded-[1.35rem] overflow-hidden bg-black">
                {/* Project Image */}
                <div className="relative w-full h-full">
                  <Image
                    src={project.imageSrc}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                    priority={idx === 0}
                  />
                  
                  {/* Subtle vignette */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/30" />
                </div>

                {/* Tags và Category - Always visible */}
                <div className="absolute top-4 left-4 flex flex-col gap-2 z-20">
                  {/* Category Badge */}
                  <Badge
                    variant="outline"
                    className={cn("backdrop-blur-sm text-xs font-medium", categoryInfo.color)}
                  >
                    {categoryInfo.logo ? (
                      <Image
                        src={categoryInfo.logo}
                        alt="Logo"
                        width={16}
                        height={16}
                        className="mr-1 rounded-sm object-contain"
                      />
                    ) : (
                      <span className="mr-1">{categoryInfo.icon}</span>
                    )}
                    {categoryInfo.label}
                  </Badge>
                  
                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-1">
                    {project.tags.slice(0, 3).map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="bg-black/60 text-white border-white/20 backdrop-blur-sm text-xs"
                      >
                        {tag}
                      </Badge>
                    ))}
                    {project.tags.length > 3 && (
                      <Badge
                        variant="secondary"
                        className="bg-black/60 text-white/60 border-white/10 backdrop-blur-sm text-xs"
                      >
                        +{project.tags.length - 3}
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Organization Badge */}
                <div className="absolute top-4 right-4 z-20">
                  {project.organization && (
                    <Badge
                      variant="outline"
                      className="bg-black/60 text-white/90 border-white/30 backdrop-blur-sm text-xs flex items-center gap-1"
                    >
                      {(() => {
                        // Check if any tag has a logo
                        const tagWithLogo = project.tags.find(tag => getTagLogo(tag))
                        const logoSrc = tagWithLogo ? getTagLogo(tagWithLogo) : null
                        
                        return logoSrc ? (
                          <Image
                            src={logoSrc}
                            alt={`${tagWithLogo} logo`}
                            width={12}
                            height={12}
                            className="rounded-sm object-contain"
                          />
                        ) : (
                          <Building className="w-3 h-3" />
                        )
                      })()}
                      {project.organization}
                    </Badge>
                  )}
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/85 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out flex flex-col justify-center items-center p-4 sm:p-6 text-center z-10 transform translate-y-2 group-hover:translate-y-0">
                  {/* Project Info */}
                  <div className="mb-4 sm:mb-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-100">
                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                      {project.title}
                    </h3>
                    <p className="text-white/80 text-sm mb-2">
                      {project.subtitle}
                    </p>
                    <div className="flex items-center justify-center gap-2 text-white/60 text-xs mb-3 sm:mb-4">
                      <Calendar className="w-3 h-3" />
                      <span>{project.timeline}</span>
                    </div>
                    <p className="text-white/70 text-xs sm:text-sm leading-relaxed max-w-sm sm:max-w-md hidden sm:block">
                      {project.description}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-200">
                    {/* Details Button */}
                    {project.detailUrl && (
                      <Link
                        href={project.detailUrl}
                        className="inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-white/20 hover:bg-white/30 text-white rounded-full transition-all duration-300 backdrop-blur-sm border border-white/20 hover:border-white/40 hover:scale-105 text-sm"
                      >
                        <Info className="w-4 h-4" />
                        <span className="hidden sm:inline">View Details</span>
                        <span className="sm:hidden">Details</span>
                      </Link>
                    )}
                    
                    {/* GitHub Button */}
                    {project.githubUrl && (
                      <Link
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all duration-300 backdrop-blur-sm border border-white/10 hover:border-white/30 hover:scale-105 text-sm"
                      >
                        <Github className="w-4 h-4" />
                        <span className="hidden sm:inline">View on GitHub</span>
                        <span className="sm:hidden">GitHub</span>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </RevealOnView>
        )
      })}
    </div>
  )
}
