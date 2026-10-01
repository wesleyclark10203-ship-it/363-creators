import { notFound } from 'next/navigation'
import Link from 'next/link'
import { db } from '@/lib/db'
import { CheckCircle2, ArrowRight, ExternalLink, Calendar, Building, Layers } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

export const revalidate = 60

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const project = await db.portfolioProject.findUnique({ where: { slug: params.slug } })
  if (!project) return {}
  return {
    title: `${project.title} Case Study | 363 Creators`,
    description: project.description,
  }
}

export default async function PortfolioProjectPage({ params }: { params: { slug: string } }) {
  const project = await db.portfolioProject.findUnique({ where: { slug: params.slug } })

  if (!project) notFound()

  const services = JSON.parse(project.servicesProvided || '[]')
  const tech = JSON.parse(project.technologies || '[]')
  const gallery = JSON.parse(project.gallery || '[]')
  const results = JSON.parse(project.results || '{}')

  return (
    <div className="py-16 space-y-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="space-y-6 pt-8 max-w-3xl">
        <div className="flex items-center gap-2">
          <Badge variant="cyan">{project.industry}</Badge>
          <span className="text-xs text-slate-500 flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5" /> {project.projectDate}
          </span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          {project.title}
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
          {project.description}
        </p>

        {project.url && (
          <a href={project.url} target="_blank" rel="noreferrer">
            <Button variant="gradient" size="sm">
              Visit Live Website <ExternalLink className="h-4 w-4 ml-1" />
            </Button>
          </a>
        )}
      </div>

      {/* Featured Banner Image */}
      <div className="rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-2xl h-[450px]">
        <img src={project.featuredImage} alt={project.title} className="w-full h-full object-cover" />
      </div>

      {/* Results Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {Object.entries(results).map(([key, val]: any) => (
          <Card key={key} className="p-6 text-center space-y-2 border-t-4 border-t-sky-500">
            <p className="text-xs text-slate-400 uppercase tracking-wider">{key}</p>
            <p className="text-3xl font-extrabold text-sky-600 dark:text-sky-400">{val}</p>
          </Card>
        ))}
      </div>

      {/* Challenge, Strategy, Execution */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="p-6 space-y-3">
          <h3 className="font-bold text-lg text-slate-900 dark:text-white text-rose-500">The Challenge</h3>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{project.challenge || project.description}</p>
        </Card>
        <Card className="p-6 space-y-3">
          <h3 className="font-bold text-lg text-slate-900 dark:text-white text-amber-500">The Strategy</h3>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{project.strategy || project.description}</p>
        </Card>
        <Card className="p-6 space-y-3">
          <h3 className="font-bold text-lg text-slate-900 dark:text-white text-emerald-500">The Execution</h3>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{project.execution || project.description}</p>
        </Card>
      </div>

      {/* Gallery */}
      {gallery.length > 0 && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Project Visuals & Gallery</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {gallery.map((img: string, i: number) => (
              <div key={i} className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 h-72">
                <img src={img} alt={`Gallery ${i}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      )}



      {/* CTA */}
      <div className="text-center p-12 rounded-3xl bg-slate-900 text-white space-y-4">
        <h2 className="text-3xl font-bold">Want similar results for your business?</h2>
        <Link href="/get-a-quote">
          <Button variant="gradient" size="lg">Start Your Project <ArrowRight className="h-4 w-4 ml-1" /></Button>
        </Link>
      </div>
    </div>
  )
}
