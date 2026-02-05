'use client'

const partners = [
  { name: 'TechCorp', placeholder: true },
  { name: 'Innovate Inc', placeholder: true },
  { name: 'Design Studio', placeholder: true },
  { name: 'MakerLab', placeholder: true },
  { name: 'Proto Works', placeholder: true },
  { name: 'FutureBuild', placeholder: true },
]

export default function Partners() {
  return (
    <section className="py-16 border-y border-border bg-surface/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm text-muted mb-8">
          Empresas innovadoras confían en nosotros
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-items-center">
          {partners.map((partner) => (
            <div
              key={partner.name}
              className="flex items-center justify-center h-12 px-6 text-muted/50 font-semibold text-lg hover:text-muted transition-colors"
            >
              {partner.name}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
