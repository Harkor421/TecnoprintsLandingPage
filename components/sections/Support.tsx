'use client'

import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import { MessageSquare, FileText, HelpCircle, ArrowRight } from 'lucide-react'

const supportOptions = [
  {
    icon: MessageSquare,
    title: 'Live Chat',
    description: 'Get instant answers from our support team during business hours.',
  },
  {
    icon: FileText,
    title: 'Design Review',
    description: 'Submit your design for a free manufacturability review.',
  },
  {
    icon: HelpCircle,
    title: 'Knowledge Base',
    description: 'Browse our extensive library of guides and tutorials.',
  },
]

export default function Support() {
  return (
    <section id="about" className="py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Design &{' '}
              <span className="text-primary">
                Engineering
              </span>{' '}
              Support
            </h2>
            <p className="text-muted mb-6">
              Not sure if your design is printable? Our team of experts is here to help.
              We offer free design consultations and can help optimize your models
              for 3D printing.
            </p>
            <p className="text-muted mb-8">
              Whether you need help with file preparation, material selection, or
              design for manufacturability, we have got the expertise to guide you
              through the process.
            </p>
            <Button variant="outline" className="group">
              Contact Our Team
              <ArrowRight
                size={18}
                className="ml-2 group-hover:translate-x-1 transition-transform"
              />
            </Button>
          </div>

          {/* Support Options */}
          <div className="space-y-4">
            {supportOptions.map((option) => (
              <Card key={option.title} className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center flex-shrink-0">
                  <option.icon size={20} className="text-black" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{option.title}</h3>
                  <p className="text-sm text-muted">{option.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
