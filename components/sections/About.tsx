import ScrollFadeIn from '@/components/ui/ScrollFadeIn'

export default function About() {
  return (
    <section id="about" className="py-16 sm:py-20 md:py-32">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollFadeIn direction="up">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 text-center">
            Sobre <span className="text-primary">Tecnoprints</span>
          </h2>
        </ScrollFadeIn>
        <ScrollFadeIn direction="up" delay={0.1}>
          <div className="space-y-4 text-sm sm:text-base text-muted leading-relaxed text-center max-w-3xl mx-auto">
            <p>
              Tecnoprints es un servicio de impresión 3D profesional ubicado en Barranquilla, Colombia.
              Contamos con más de 20 impresoras Bambu Lab de última generación operando simultáneamente,
              lo que nos permite ofrecer prototipado rápido, piezas personalizadas y producción en serie
              con entregas desde el mismo día.
            </p>
            <p>
              Nos especializamos en impresión FDM con PLA de alta calidad para todo tipo de proyectos:
              desde tesis universitarias y prototipos para emprendedores, hasta producción en volumen
              para empresas. Con velocidades de hasta 500mm/s y precisión de 0.05mm, hacemos realidad
              tus ideas con la mejor tecnología disponible en la costa caribe colombiana.
            </p>
          </div>
        </ScrollFadeIn>
      </div>
    </section>
  )
}
