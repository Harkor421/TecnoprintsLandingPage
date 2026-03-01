'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import ScrollFadeIn from '@/components/ui/ScrollFadeIn'
import { FAQ_DATA } from '@/lib/constants'

interface FAQItemProps {
  question: string
  answer: string
  isOpen: boolean
  onToggle: () => void
  index: number
}

function FAQItem({ question, answer, isOpen, onToggle, index }: FAQItemProps) {
  return (
    <ScrollFadeIn direction="up" delay={index * 0.05}>
      <div className="border border-border overflow-hidden bg-surface/50 hover:border-primary/50 transition-colors">
        <button
          onClick={onToggle}
          className="w-full px-5 py-4 flex items-center justify-between text-left touch-manipulation"
        >
          <span className="font-medium pr-4">{question}</span>
          <ChevronDown
            size={20}
            className={cn(
              'text-primary flex-shrink-0 transition-transform duration-300',
              isOpen && 'rotate-180'
            )}
          />
        </button>
        <div
          className={cn(
            'grid transition-all duration-300 ease-in-out',
            isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
          )}
        >
          <div className="overflow-hidden">
            <p className="px-5 pb-4 text-sm text-muted leading-relaxed">
              {answer}
            </p>
          </div>
        </div>
      </div>
    </ScrollFadeIn>
  )
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="faq" className="py-20 md:py-32">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollFadeIn direction="up">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Preguntas{' '}
              <span className="text-primary">Frecuentes</span>
            </h2>
            <p className="text-muted">
              Resolvemos tus dudas sobre nuestros servicios de impresión 3D.
            </p>
          </div>
        </ScrollFadeIn>

        <div className="space-y-3">
          {FAQ_DATA.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onToggle={() => handleToggle(index)}
              index={index}
            />
          ))}
        </div>

        <ScrollFadeIn direction="up" delay={0.3}>
          <div className="text-center mt-10">
            <p className="text-muted text-sm">
              ¿Tienes más preguntas?{' '}
              <a href="#quote" className="text-primary hover:underline">
                Contáctanos
              </a>
            </p>
          </div>
        </ScrollFadeIn>
      </div>
    </section>
  )
}
