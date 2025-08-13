import Link from "next/link"
import { ArrowRight, Code, Globe, Linkedin, Facebook, Github, ExternalLink } from 'lucide-react'

import { Button } from "@/components/ui/button"
import DotGridShader from "@/components/DotGridShader"

import ProjectCarousel from "@/components/project-carousel"
import AnimatedHeading from "@/components/animated-heading"
import RevealOnView from "@/components/reveal-on-view"
import { personalInfo, projects, services } from "@/lib/portfolio-data"
 

export default function Page() {
  // Function to get the appropriate icon for each service
  const getServiceIcon = (iconClass: string) => {
    switch (iconClass) {
      case 'fas fa-code':
        return <Code className="w-5 h-5" />
      case 'fas fa-globe':
        return <Globe className="w-5 h-5" />
      default:
        return <Code className="w-5 h-5" />
    }
  }

  return (
    <main className="bg-neutral-950 text-white">
      {/* HERO: full-viewport row. Left is sticky; right scrolls internally. */}
      <section className="px-4 pt-4 pb-16 lg:pb-4">
        <div className="grid h-full grid-cols-1 gap-4 lg:grid-cols-[420px_1fr]">
          {/* LEFT: sticky and full height, no cut off */}
          <aside className="lg:sticky lg:top-4 lg:h-[calc(100svh-2rem)]">
            <RevealOnView as="div" intensity="hero" className="relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-neutral-900/60 p-6 sm:p-8" staggerChildren>
              {/* Texture background */}
              <div className="pointer-events-none absolute inset-0 opacity-5 mix-blend-soft-light">
                <DotGridShader />
              </div>
              <div>
                {/* Wordmark */}
                <div className="mb-8 flex items-center gap-2">
                  <div className="text-2xl font-extrabold tracking-tight">{personalInfo.name.split(' ')[0].toLowerCase()}</div>
                  <div className="h-2 w-2 rounded-full bg-white/60" aria-hidden="true" />
                </div>

                {/* Headline with intro blur effect */}
                <AnimatedHeading
                  className="text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl"
                  lines={[`Hello, I'm ${personalInfo.name}`, `I'm an ${personalInfo.title}`]}
                />

                {/* CTAs */}
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <Button asChild size="lg" className="rounded-full">
                    <Link href={`mailto:${personalInfo.email}`}>
                      Contact Me
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>

                {/* Contact Info */}
                <div className="mt-10">
                  <p className="mb-3 text-xs font-semibold tracking-widest text-white/50">
                    CONTACT INFORMATION
                  </p>
                  <div className="space-y-2 text-sm text-white/70">
                    <div>📧 {personalInfo.email}</div>
                    <div>📱 {personalInfo.phone}</div>
                    <div>📍 {personalInfo.address}</div>
                  </div>
                </div>

                {/* Social Media */}
                <div className="mt-8">
                  <p className="mb-4 text-xs font-semibold tracking-widest text-white/50">
                    SOCIAL MEDIA
                  </p>
                  <div className="flex gap-4">
                    {personalInfo.linkedinUrl && (
                      <Link 
                        href={personalInfo.linkedinUrl} 
                        target="_blank"
                        className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center text-blue-400 hover:bg-blue-600/30 transition-colors"
                      >
                        <Linkedin className="w-5 h-5" />
                      </Link>
                    )}
                    {personalInfo.facebookUrl && (
                      <Link 
                        href={personalInfo.facebookUrl} 
                        target="_blank"
                        className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center text-blue-300 hover:bg-blue-500/30 transition-colors"
                      >
                        <Facebook className="w-5 h-5" />
                      </Link>
                    )}
                    {personalInfo.githubUrl && (
                      <Link 
                        href={personalInfo.githubUrl} 
                        target="_blank"
                        className="w-10 h-10 bg-gray-600/20 rounded-lg flex items-center justify-center text-gray-300 hover:bg-gray-600/30 transition-colors"
                      >
                        <Github className="w-5 h-5" />
                      </Link>
                    )}
                    {personalInfo.portfolioUrl && (
                      <Link 
                        href={personalInfo.portfolioUrl} 
                        target="_blank"
                        className="w-10 h-10 bg-green-600/20 rounded-lg flex items-center justify-center text-green-400 hover:bg-green-600/30 transition-colors"
                      >
                        <ExternalLink className="w-5 h-5" />
                      </Link>
                    )}
                  </div>
                </div>

                {/* Services */}
                <div className="mt-10">
                  <p className="mb-4 text-xs font-semibold tracking-widest text-white/50">
                    MY SERVICES
                  </p>
                  <div className="space-y-4">
                    {services.map((service) => (
                      <div key={service.id} className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-8 h-8 bg-blue-400/20 rounded-lg flex items-center justify-center text-blue-400 mt-0.5">
                          {getServiceIcon(service.icon)}
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold text-white mb-1">{service.title}</h4>
                          <p className="text-xs text-white/60 leading-relaxed">{service.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              
            </RevealOnView>
          </aside>

          {/* RIGHT: Project carousel with hover effects */}
          <div className="space-y-4">
            <ProjectCarousel projects={projects} />
          </div>
        </div>
      </section>
      
    </main>
  )
}
