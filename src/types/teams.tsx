export interface Team {
  id: string
  name: string
  description: string
  techStack?: string[]
  icon: string
  projectsCount?: number
  category: 'technical' | 'non-technical'
}

export interface TeamSpotlightCard {
  id: string
  name: string
  lead: string
  description: string
  image: string
  socialLinks?: {
    linkedin?: string
    github?: string
    twitter?: string
    instagram?: string
    discord?: string
  }
}

export interface TeamsPageProps {
  title?: string
  subtitle?: string
  description?: string
  technicalTeams?: Team[]
  nonTechnicalTeams?: Team[]
  spotlightTeams?: TeamSpotlightCard[]
  className?: string
}
