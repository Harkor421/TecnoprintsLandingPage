export function CuantoCuestaContent() {
  return (
    <>
      <p>
        Si estás buscando un servicio de impresión 3D en Barranquilla, una de las primeras
        preguntas que surge es: ¿cuánto va a costar? El precio de una impresión 3D depende de
        varios factores que explicamos en esta guía para que puedas planificar tu proyecto con
        un presupuesto claro.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">
        Factores que Determinan el <span className="text-primary">Precio</span>
      </h2>
      <p>
        El costo de una impresión 3D en Barranquilla se calcula principalmente por la cantidad
        de material utilizado (gramos de PLA), el tiempo de impresión y la calidad seleccionada.
        A continuación desglosamos cada factor:
      </p>
      <ul className="list-disc list-inside space-y-2 mt-4">
        <li><strong className="text-white">Volumen del modelo:</strong> Piezas más grandes
        requieren más material. Un cubo de 5cm usa aproximadamente 30g de PLA, mientras que uno
        de 10cm puede superar los 200g.</li>
        <li><strong className="text-white">Porcentaje de relleno:</strong> La calidad baja (15%
        relleno) usa menos material que la calidad alta (50% relleno). Para prototipos rápidos,
        la calidad baja es suficiente. Para piezas funcionales, recomendamos media o alta.</li>
        <li><strong className="text-white">Complejidad del diseño:</strong> Modelos con voladizos
        o geometrías complejas necesitan material de soporte adicional, lo que incrementa el costo.</li>
        <li><strong className="text-white">Cantidad:</strong> Pedidos en lote tienen un menor
        costo por unidad, ya que las impresoras pueden trabajar en simultáneo produciendo múltiples
        piezas.</li>
      </ul>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">
        Rangos de <span className="text-primary">Precio</span> Típicos en Barranquilla
      </h2>
      <p>
        Como referencia general, estos son los rangos de precios que puedes esperar para impresión
        3D en PLA en Barranquilla:
      </p>
      <ul className="list-disc list-inside space-y-2 mt-4">
        <li><strong className="text-white">Piezas pequeñas (1-50g):</strong> Llaveros, piezas
        mecánicas pequeñas, figuras decorativas. Rango típico: $5,000 - $25,000 COP.</li>
        <li><strong className="text-white">Prototipos medianos (50-200g):</strong> Carcasas, modelos
        arquitectónicos, componentes de proyectos. Rango: $25,000 - $80,000 COP.</li>
        <li><strong className="text-white">Piezas grandes (200g+):</strong> Prototipos a escala,
        piezas industriales, proyectos de tesis. El precio varía según complejidad.</li>
      </ul>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">
        Cómo Obtener la Mejor <span className="text-primary">Cotización</span>
      </h2>
      <p>
        Para obtener el mejor precio en tu impresión 3D en Barranquilla, te recomendamos:
      </p>
      <ul className="list-disc list-inside space-y-2 mt-4">
        <li>Optimiza el relleno según el uso de la pieza — no siempre necesitas calidad alta.</li>
        <li>Reduce el grosor de las paredes si la resistencia no es crítica.</li>
        <li>Agrupa varios diseños en un solo pedido para aprovechar descuentos por volumen.</li>
        <li>Usa nuestro estimador en línea para calcular el material antes de cotizar.</li>
      </ul>
    </>
  )
}

export function ComoPreparartSTLContent() {
  return (
    <>
      <p>
        Un archivo STL bien preparado es la base de una impresión 3D exitosa. En esta guía
        te explicamos qué es un archivo STL, cómo exportarlo correctamente y los errores
        más comunes que debes evitar.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">
        ¿Qué es un Archivo <span className="text-primary">STL</span>?
      </h2>
      <p>
        STL (Standard Tessellation Language) es el formato más utilizado en impresión 3D.
        Representa la superficie de un modelo 3D como una malla de triángulos. Prácticamente
        todos los software de diseño 3D pueden exportar en este formato, y es el que utilizamos
        en Tecnoprints para calcular volumen, material y generar el código de impresión.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">
        Cómo Exportar STL desde tu <span className="text-primary">Software</span>
      </h2>
      <ul className="list-disc list-inside space-y-3 mt-4">
        <li><strong className="text-white">Fusion 360:</strong> File → Export → selecciona STL
        como formato. Usa la opción &quot;Binary&quot; para archivos más pequeños.</li>
        <li><strong className="text-white">SolidWorks:</strong> File → Save As → selecciona STL.
        En opciones, ajusta la resolución a &quot;Fine&quot; para mejor calidad de malla.</li>
        <li><strong className="text-white">Tinkercad:</strong> Haz clic en Export → selecciona
        .STL. Tinkercad siempre exporta en formato binario optimizado.</li>
        <li><strong className="text-white">Blender:</strong> File → Export → STL. Asegúrate de
        aplicar todas las transformaciones (Ctrl+A) antes de exportar.</li>
        <li><strong className="text-white">FreeCAD:</strong> File → Export → selecciona STL Mesh.
        Ajusta la desviación de malla a 0.1mm para un buen balance.</li>
      </ul>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">
        Errores Comunes y Cómo <span className="text-primary">Evitarlos</span>
      </h2>
      <ul className="list-disc list-inside space-y-3 mt-4">
        <li><strong className="text-white">Paredes muy delgadas:</strong> Las paredes deben tener
        al menos 1mm de grosor. Paredes más finas pueden no imprimirse correctamente o ser muy
        frágiles.</li>
        <li><strong className="text-white">Mallas no manifold:</strong> Tu modelo debe ser una
        malla cerrada (sin agujeros). Software como Meshmixer o Netfabb pueden reparar estos
        errores automáticamente.</li>
        <li><strong className="text-white">Escala incorrecta:</strong> Verifica que las unidades
        de tu modelo sean milímetros. Un error común es exportar en pulgadas, resultando en una
        pieza 25 veces más grande o pequeña de lo esperado.</li>
        <li><strong className="text-white">Resolución de malla baja:</strong> Una malla con muy
        pocos triángulos genera superficies facetadas. Usa resolución media o alta al exportar.</li>
      </ul>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">
        Formatos <span className="text-primary">Alternativos</span>
      </h2>
      <p>
        Además de STL, en Tecnoprints también aceptamos archivos OBJ, STEP y STP. Si tienes tu
        diseño en otro formato como IGES, 3MF o Parasolid, contáctanos por WhatsApp y te ayudamos
        a convertirlo sin costo adicional.
      </p>
    </>
  )
}

export function MejoresMaterialesContent() {
  return (
    <>
      <p>
        Elegir el material correcto es clave para el éxito de tu impresión 3D en Barranquilla.
        Cada filamento tiene propiedades diferentes que lo hacen ideal para ciertos usos. En esta
        guía comparamos los materiales más populares disponibles en nuestro servicio de impresión 3D.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">
        <span className="text-primary">PLA</span> — El Material Más Popular
      </h2>
      <p>
        El PLA (Ácido Poliláctico) es el material estándar en impresión 3D FDM y el que más
        utilizamos en Tecnoprints Barranquilla. Es biodegradable, fácil de imprimir y produce
        piezas con excelente detalle superficial.
      </p>
      <ul className="list-disc list-inside space-y-2 mt-4">
        <li><strong className="text-white">Ideal para:</strong> Prototipos, maquetas, figuras decorativas, piezas de presentación, tesis universitarias.</li>
        <li><strong className="text-white">Temperatura de impresión:</strong> 190-220°C</li>
        <li><strong className="text-white">Resistencia:</strong> Buena rigidez, baja flexibilidad. No apto para piezas que reciban impactos fuertes.</li>
        <li><strong className="text-white">Acabado:</strong> Superficie lisa, disponible en múltiples colores incluyendo PLA Silk con acabado metalizado.</li>
      </ul>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">
        <span className="text-primary">PETG</span> — Resistencia y Durabilidad
      </h2>
      <p>
        El PETG combina la facilidad de impresión del PLA con mayor resistencia mecánica y
        térmica. Es el material que recomendamos para piezas funcionales en Barranquilla.
      </p>
      <ul className="list-disc list-inside space-y-2 mt-4">
        <li><strong className="text-white">Ideal para:</strong> Piezas mecánicas, componentes que reciban esfuerzo, carcasas de dispositivos, piezas para exteriores.</li>
        <li><strong className="text-white">Temperatura de impresión:</strong> 230-250°C</li>
        <li><strong className="text-white">Resistencia:</strong> Mayor resistencia al impacto y flexibilidad que PLA. Resistente a químicos.</li>
        <li><strong className="text-white">Acabado:</strong> Ligeramente más brillante que PLA, semi-transparente en colores naturales.</li>
      </ul>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">
        <span className="text-primary">TPU</span> — Material Flexible
      </h2>
      <p>
        El TPU es un filamento flexible similar al caucho. Perfecto para juntas, fundas, amortiguadores
        y cualquier pieza que necesite deformarse sin romperse.
      </p>
      <ul className="list-disc list-inside space-y-2 mt-4">
        <li><strong className="text-white">Ideal para:</strong> Fundas de celular, sellos, amortiguadores, ruedas flexibles, wearables.</li>
        <li><strong className="text-white">Dureza Shore:</strong> 95A (semi-flexible)</li>
        <li><strong className="text-white">Ventaja:</strong> Extrema resistencia al desgaste y a la fatiga mecánica.</li>
      </ul>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">
        ¿Cuál <span className="text-primary">Elegir</span>?
      </h2>
      <p>
        Si no estás seguro qué material necesitas para tu proyecto en Barranquilla, contáctanos
        por WhatsApp. Te asesoramos gratis según tu aplicación, presupuesto y requisitos mecánicos.
        En Tecnoprints trabajamos con filamentos de alta calidad para garantizar los mejores resultados.
      </p>
    </>
  )
}

export function PrototipadoRapidoContent() {
  return (
    <>
      <p>
        En el mundo empresarial de Barranquilla, la velocidad de ejecución marca la diferencia.
        El prototipado rápido con impresión 3D permite transformar una idea en un producto físico
        en menos de 24 horas, sin moldes, sin herramientas y sin pedidos mínimos.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">
        ¿Qué es el <span className="text-primary">Prototipado Rápido</span>?
      </h2>
      <p>
        El prototipado rápido es el proceso de fabricar un modelo físico de un diseño digital
        en el menor tiempo posible. La impresión 3D FDM es la tecnología más accesible para
        prototipado en Barranquilla: sin necesidad de moldes costosos, puedes tener tu pieza
        lista para evaluar en horas, no en semanas.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">
        Ventajas del Prototipado 3D en <span className="text-primary">Barranquilla</span>
      </h2>
      <ul className="list-disc list-inside space-y-3 mt-4">
        <li><strong className="text-white">Velocidad:</strong> De archivo digital a pieza física en el mismo día hasta 48 horas. Ideal para iteraciones rápidas donde cada día cuenta.</li>
        <li><strong className="text-white">Costo bajo:</strong> Sin moldes ni herramientas. Un prototipo en PLA puede costar desde $5,000 COP, permitiéndote probar múltiples versiones.</li>
        <li><strong className="text-white">Iteración rápida:</strong> Detecta errores de diseño en la pieza real, corrige el archivo y vuelve a imprimir el mismo día.</li>
        <li><strong className="text-white">Sin pedido mínimo:</strong> Imprime una sola pieza o cien. La impresión 3D es económica desde la primera unidad.</li>
        <li><strong className="text-white">Confidencialidad:</strong> Tu diseño nunca sale de Barranquilla. Servicio local, atención directa.</li>
      </ul>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">
        Casos de Uso en <span className="text-primary">Barranquilla</span>
      </h2>
      <ul className="list-disc list-inside space-y-3 mt-4">
        <li><strong className="text-white">Startups:</strong> Valida tu producto con un prototipo real antes de invertir en producción masiva.</li>
        <li><strong className="text-white">Ingenieros:</strong> Prueba ensamblajes, ajustes y tolerancias antes de mecanizar.</li>
        <li><strong className="text-white">Diseñadores:</strong> Presenta modelos tangibles a tus clientes en lugar de renders.</li>
        <li><strong className="text-white">Estudiantes:</strong> Materializa tus proyectos de clase y tesis con un servicio rápido y asequible.</li>
        <li><strong className="text-white">Empresas:</strong> Desarrolla jigs, fixtures y herramientas personalizadas para tu línea de producción.</li>
      </ul>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">
        Nuestro <span className="text-primary">Proceso</span>
      </h2>
      <ol className="list-decimal list-inside space-y-2 mt-4">
        <li>Envíanos tu archivo STL o STEP por WhatsApp.</li>
        <li>Te cotizamos en minutos con precio exacto.</li>
        <li>Imprimimos con impresoras Bambu Lab de alta velocidad.</li>
        <li>Tu prototipo listo en el mismo día hasta 48 horas en Barranquilla.</li>
      </ol>
    </>
  )
}

export function ArquitecturaMaquetasContent() {
  return (
    <>
      <p>
        Las maquetas arquitectónicas impresas en 3D han revolucionado la forma en que los
        arquitectos y estudiantes de arquitectura en Barranquilla presentan sus proyectos.
        Más precisas, más rápidas y más económicas que las maquetas hechas a mano.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">
        Ventajas de las Maquetas <span className="text-primary">Impresas en 3D</span>
      </h2>
      <ul className="list-disc list-inside space-y-3 mt-4">
        <li><strong className="text-white">Precisión milimétrica:</strong> Cada detalle de tu diseño se reproduce fielmente. Escaleras, ventanas, columnas — todo con la proporción exacta.</li>
        <li><strong className="text-white">Rapidez:</strong> Una maqueta que tomaría días cortar a mano se imprime en horas. Ideal para entregas ajustadas en la universidad.</li>
        <li><strong className="text-white">Modificaciones fáciles:</strong> Si el jurado pide cambios, modifica el archivo y reimprime. Sin empezar de cero.</li>
        <li><strong className="text-white">Acabado profesional:</strong> Las impresoras Bambu Lab producen superficies limpias que se pueden lijar y pintar fácilmente.</li>
        <li><strong className="text-white">Costo predecible:</strong> Sabes exactamente cuánto costará antes de imprimir, sin sorpresas de material sobrante.</li>
      </ul>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">
        Cómo Preparar tu <span className="text-primary">Maqueta</span> para Impresión
      </h2>
      <p>
        La clave para una buena maqueta impresa en 3D es el modelado. Estos son nuestros consejos
        para arquitectos en Barranquilla:
      </p>
      <ul className="list-disc list-inside space-y-3 mt-4">
        <li><strong className="text-white">Software recomendado:</strong> SketchUp, Revit, ArchiCAD o Rhino. Todos exportan a STL.</li>
        <li><strong className="text-white">Escala:</strong> Las escalas más comunes son 1:100 y 1:200. Asegúrate de que las paredes tengan al menos 1mm de grosor real después de escalar.</li>
        <li><strong className="text-white">Seccionar el modelo:</strong> Para maquetas grandes, divide el edificio en secciones que quepan en la impresora y ensámblalas después.</li>
        <li><strong className="text-white">Terreno y entorno:</strong> El terreno se imprime por separado en una base plana. Árboles y vegetación pueden imprimirse aparte.</li>
        <li><strong className="text-white">Color:</strong> Recomendamos PLA blanco o gris para maquetas de presentación. Puedes pintar después con acrílico.</li>
      </ul>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">
        Tipos de Proyectos que <span className="text-primary">Imprimimos</span>
      </h2>
      <ul className="list-disc list-inside space-y-2 mt-4">
        <li>Maquetas de edificios residenciales y comerciales</li>
        <li>Proyectos urbanísticos y de planificación</li>
        <li>Maquetas de interiores y espacios</li>
        <li>Detalles constructivos a escala</li>
        <li>Maquetas topográficas con curvas de nivel</li>
        <li>Proyectos de tesis y trabajos finales de arquitectura</li>
      </ul>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">
        Precio de Maquetas en <span className="text-primary">Barranquilla</span>
      </h2>
      <p>
        El costo depende del tamaño y la complejidad. Una maqueta sencilla de una casa a escala
        1:100 puede costar entre $30,000 y $80,000 COP. Proyectos más grandes como edificios
        o conjuntos se cotizan según volumen de material. Usa nuestro estimador en línea o
        contáctanos por WhatsApp para un precio exacto.
      </p>
    </>
  )
}

export function DondeImprimirContent() {
  return (
    <>
      <p>
        Si estás buscando dónde imprimir en 3D en Barranquilla, has llegado al lugar correcto.
        En esta guía te explicamos qué debes buscar en un servicio de impresión 3D, cómo comparar
        opciones y por qué Tecnoprints es la mejor alternativa en la ciudad.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">
        Qué Buscar en un Servicio de <span className="text-primary">Impresión 3D</span>
      </h2>
      <p>
        No todos los servicios de impresión 3D en Barranquilla son iguales. Estos son los factores
        clave para elegir el mejor:
      </p>
      <ul className="list-disc list-inside space-y-3 mt-4">
        <li><strong className="text-white">Calidad de las impresoras:</strong> Las impresoras profesionales como Bambu Lab producen piezas con capas de 0.08-0.20mm, mucho más finas que impresoras caseras. Esto se traduce en mejor acabado y precisión dimensional.</li>
        <li><strong className="text-white">Tiempo de entrega:</strong> Un buen servicio entrega en el mismo día hasta 48 horas para piezas estándar. Desconfía de tiempos de una semana o más para piezas simples.</li>
        <li><strong className="text-white">Asesoría técnica:</strong> El proveedor debe poder aconsejarte sobre orientación de impresión, relleno óptimo y material adecuado. No solo imprimir lo que le envíes.</li>
        <li><strong className="text-white">Precio transparente:</strong> Deberías poder estimar el costo antes de ordenar. Los precios ocultos o cotizaciones que tardan días son señales de alerta.</li>
        <li><strong className="text-white">Atención directa:</strong> Poder comunicarte por WhatsApp o en persona facilita resolver dudas y hacer ajustes rápidos.</li>
      </ul>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">
        Por Qué Elegir <span className="text-primary">Tecnoprints</span> en Barranquilla
      </h2>
      <ul className="list-disc list-inside space-y-3 mt-4">
        <li><strong className="text-white">Impresoras Bambu Lab:</strong> Utilizamos impresoras de última generación con velocidades hasta 500mm/s y precisión de 0.05mm.</li>
        <li><strong className="text-white">Cotización instantánea:</strong> Nuestro estimador en línea te calcula los gramos de material y el costo aproximado en segundos.</li>
        <li><strong className="text-white">Entrega en mismo día a 48h:</strong> Para la mayoría de proyectos, tu pieza estará lista al día siguiente.</li>
        <li><strong className="text-white">Asesoría gratuita:</strong> Te ayudamos a optimizar tu diseño para mejor resultado y menor costo.</li>
        <li><strong className="text-white">Ubicación en Barranquilla:</strong> Estamos en Cra. 53 #Calle 96 - 24. Recoge en persona o te lo enviamos.</li>
        <li><strong className="text-white">Precios competitivos:</strong> Sin intermediarios ni costos ocultos. Precio justo por gramo de material.</li>
      </ul>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">
        Cómo <span className="text-primary">Ordenar</span> tu Impresión
      </h2>
      <ol className="list-decimal list-inside space-y-2 mt-4">
        <li>Prepara tu archivo en formato STL (también aceptamos OBJ, STEP, STP).</li>
        <li>Usa nuestro estimador en línea para ver los gramos de material y elegir calidad.</li>
        <li>Envía tu archivo por WhatsApp al +57 323 926 7656 para cotización final.</li>
        <li>Aprueba el precio y comenzamos a imprimir inmediatamente.</li>
        <li>Recoge en nuestra ubicación en Barranquilla o te lo enviamos a domicilio.</li>
      </ol>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">
        Servicios <span className="text-primary">Disponibles</span>
      </h2>
      <ul className="list-disc list-inside space-y-2 mt-4">
        <li>Impresión 3D FDM en PLA, PETG y TPU</li>
        <li>Prototipado rápido para empresas y emprendedores</li>
        <li>Maquetas arquitectónicas a escala</li>
        <li>Prototipos para tesis universitarias</li>
        <li>Producción en lotes pequeños y medianos</li>
        <li>Asesoría en diseño 3D y preparación de archivos</li>
      </ul>
    </>
  )
}

export function TesisUniversitariasContent() {
  return (
    <>
      <p>
        Cada vez más universidades en Barranquilla están incluyendo prototipos físicos como
        requisito en las tesis de grado. La impresión 3D es la forma más rápida, económica y
        accesible de fabricar estos prototipos. En esta guía te explicamos todo lo que necesitas
        saber.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">
        Por Qué Usar <span className="text-primary">Impresión 3D</span> en tu Tesis
      </h2>
      <p>
        Un prototipo físico impreso en 3D le da a tu tesis una dimensión tangible que los
        renders y diagramas no pueden igualar. Los jurados pueden tocar, manipular y evaluar
        tu diseño de forma directa. Además, demuestra competencia técnica en fabricación digital,
        una habilidad cada vez más valorada en el mercado laboral.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">
        Tipos de <span className="text-primary">Proyectos</span> Universitarios
      </h2>
      <ul className="list-disc list-inside space-y-3 mt-4">
        <li><strong className="text-white">Ingeniería Mecánica:</strong> Prototipos de mecanismos,
        engranajes, carcasas de dispositivos, piezas de ensamblaje. La impresión 3D permite validar
        el diseño antes de fabricar en metal o inyección.</li>
        <li><strong className="text-white">Arquitectura:</strong> Maquetas a escala de edificios,
        urbanismo y espacios interiores. PLA blanco o gris es ideal para presentaciones.</li>
        <li><strong className="text-white">Diseño Industrial:</strong> Modelos de productos,
        empaques, ergonomía. Con PLA Silk puedes lograr acabados muy atractivos para
        presentaciones.</li>
        <li><strong className="text-white">Biomédica:</strong> Modelos anatómicos, prótesis,
        dispositivos médicos. La precisión de 0.05mm es suficiente para la mayoría de aplicaciones
        educativas.</li>
        <li><strong className="text-white">Electrónica:</strong> Carcasas para PCBs, cajas de
        control, soportes para sensores. Diseña con las medidas exactas de tus componentes.</li>
      </ul>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">
        Proceso para <span className="text-primary">Estudiantes</span> en Barranquilla
      </h2>
      <p>
        El proceso es simple y rápido para que no pierdas tiempo en la recta final de tu tesis:
      </p>
      <ol className="list-decimal list-inside space-y-2 mt-4">
        <li>Diseña tu modelo en el software de tu preferencia (Fusion 360, SolidWorks, Tinkercad,
        Blender) y expórtalo como STL.</li>
        <li>Usa nuestro estimador en línea para calcular cuántos gramos de material necesitarás
        y elegir la calidad de impresión.</li>
        <li>Contáctanos por WhatsApp con tu archivo y te damos el precio final. Podemos asesorarte
        sobre orientación de impresión y calidad ideal para tu caso.</li>
        <li>Recoge tu pieza en Barranquilla o te la enviamos. Para prototipos simples, la entrega
        es en el mismo día hasta 48 horas.</li>
      </ol>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">
        Consejos para <span className="text-primary">Ahorrar</span>
      </h2>
      <p>
        Como estudiante, cada peso cuenta. Aquí algunos consejos para reducir el costo de tu
        prototipo:
      </p>
      <ul className="list-disc list-inside space-y-2 mt-4">
        <li>Usa calidad baja o media para prototipos de prueba. Reserva la calidad alta para la
        versión final.</li>
        <li>Diseña paredes de 1.2-2mm de grosor — suficiente para ser resistente sin desperdiciar
        material.</li>
        <li>Agrupa tus piezas: si tu proyecto tiene múltiples componentes, cotiza todo junto para
        mejor precio.</li>
        <li>Planifica con tiempo. Los pedidos urgentes pueden tener recargos.</li>
      </ul>
    </>
  )
}

export function ImpresionEconomicaContent() {
  return (
    <>
      <p>
        ¿Buscas un servicio de <strong className="text-white">impresión 3D económica en Barranquilla</strong>?
        En Tecnoprints ofrecemos precios accesibles sin sacrificar calidad. Sabemos que el precio de
        una impresión 3D puede ser una barrera, por eso hemos optimizado nuestros procesos para darte
        la mejor relación costo-beneficio de la ciudad.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">
        ¿Cuánto Cuesta Realmente una <span className="text-primary">Impresión 3D</span> en Barranquilla?
      </h2>
      <p>
        El precio de una impresión 3D depende principalmente del peso en gramos del modelo y la calidad
        seleccionada. En Tecnoprints Barranquilla manejamos tarifas competitivas por gramo de material,
        lo que significa que solo pagas por lo que realmente se imprime. Aquí algunos ejemplos de precios
        reales:
      </p>
      <ul className="list-disc list-inside space-y-2 mt-4">
        <li><strong className="text-white">Llavero personalizado (5-15g):</strong> Desde $3,000 COP.
        Perfecto para detalles, regalos o pruebas rápidas.</li>
        <li><strong className="text-white">Pieza mecánica pequeña (20-50g):</strong> Entre $8,000 y
        $20,000 COP. Ideal para repuestos o prototipos iniciales.</li>
        <li><strong className="text-white">Prototipo mediano (80-150g):</strong> Entre $30,000 y
        $60,000 COP. Para carcasas, modelos funcionales o maquetas.</li>
        <li><strong className="text-white">Proyecto grande (200g+):</strong> Cotización personalizada.
        Pedidos en lote tienen descuento por volumen.</li>
      </ul>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">
        Consejos para una <span className="text-primary">Impresión 3D Barata</span> sin Perder Calidad
      </h2>
      <p>
        Conseguir una impresión 3D barata en Barranquilla no significa conformarte con mala calidad.
        Con estos consejos puedes reducir significativamente el costo de tu proyecto:
      </p>
      <ul className="list-disc list-inside space-y-2 mt-4">
        <li><strong className="text-white">Elige el relleno adecuado:</strong> Para piezas decorativas,
        un 15% de relleno es suficiente y reduce el precio considerablemente.</li>
        <li><strong className="text-white">Optimiza el diseño:</strong> Reduce paredes innecesariamente
        gruesas. Un grosor de 1.2mm es resistente y económico.</li>
        <li><strong className="text-white">Agrupa pedidos:</strong> Si necesitas varias piezas,
        cotiza todo junto. Ofrecemos mejores precios por volumen.</li>
        <li><strong className="text-white">Usa PLA estándar:</strong> Es el material más económico y
        funciona perfectamente para la mayoría de aplicaciones.</li>
      </ul>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">
        ¿Por Qué Nuestro <span className="text-primary">Precio</span> es Competitivo?
      </h2>
      <p>
        En Tecnoprints Barranquilla mantenemos precios bajos gracias a impresoras Bambu Lab de alta
        velocidad que reducen tiempos de producción, compra de filamento al por mayor y un proceso
        digital sin intermediarios. No cobramos por cotizar ni por asesoría — solo pagas por tu pieza.
      </p>
      <p className="mt-4">
        ¿Quieres saber exactamente cuánto cuesta tu proyecto? Usa nuestro{' '}
        <a href="/cotizar-impresion-3d" className="text-primary underline">estimador en línea</a> para
        un cálculo instantáneo, o envíanos tu archivo por WhatsApp para una cotización personalizada
        con el mejor precio de impresión 3D en Barranquilla.
      </p>
    </>
  )
}

export function ImpresionEmprendedoresContent() {
  return (
    <>
      <p>
        La <strong className="text-white">impresión 3D para emprendedores</strong> en Barranquilla
        se ha convertido en una herramienta esencial para quienes quieren lanzar productos al mercado
        sin grandes inversiones iniciales. Desde prototipos hasta productos finales, la tecnología 3D
        permite crear productos personalizados con costos mínimos y tiempos de entrega de horas.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">
        Cómo los Emprendedores Usan la <span className="text-primary">Impresión 3D</span> en Barranquilla
      </h2>
      <p>
        Cada vez más emprendedores en Barranquilla están integrando la impresión 3D en sus negocios.
        Estos son los usos más comunes que vemos en Tecnoprints:
      </p>
      <ul className="list-disc list-inside space-y-2 mt-4">
        <li><strong className="text-white">Prototipos de producto:</strong> Antes de invertir en moldes
        o producción masiva, imprime un prototipo funcional en Barranquilla por una fracción del costo.
        Valida tu idea con clientes reales antes de escalar.</li>
        <li><strong className="text-white">Productos personalizados:</strong> Crea productos únicos
        como joyería, accesorios, decoración o artículos de marca. Cada pieza puede ser diferente sin
        costo adicional de setup.</li>
        <li><strong className="text-white">Empaques y exhibidores:</strong> Diseña displays, soportes
        y empaques especiales para diferenciarte en ferias y puntos de venta en Barranquilla.</li>
        <li><strong className="text-white">Repuestos y herramientas:</strong> Fabrica piezas de repuesto
        para tus máquinas o herramientas especializadas que no se consiguen fácilmente en el mercado local.</li>
      </ul>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">
        Ventajas de <span className="text-primary">Crear Productos 3D</span> para tu Emprendimiento
      </h2>
      <ul className="list-disc list-inside space-y-2 mt-4">
        <li><strong className="text-white">Sin pedido mínimo:</strong> Produce desde una sola unidad.
        Perfecto para emprendedores que están validando su mercado.</li>
        <li><strong className="text-white">Iteración rápida:</strong> Modifica tu diseño hoy y ten la
        nueva versión mañana. El ciclo de desarrollo se reduce de meses a días.</li>
        <li><strong className="text-white">Bajo riesgo financiero:</strong> No necesitas invertir en
        moldes de $2,000,000+ COP. Un prototipo en Barranquilla puede costar desde $5,000 COP.</li>
        <li><strong className="text-white">Personalización masiva:</strong> Ofrece productos personalizados
        a tus clientes sin complicaciones logísticas.</li>
      </ul>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">
        De la Idea al <span className="text-primary">Prototipo</span> en Barranquilla
      </h2>
      <p>
        El proceso para emprendedores es directo y sin complicaciones. Si ya tienes un diseño 3D
        (STL, OBJ o STEP), simplemente envíalo a nuestro WhatsApp y te cotizamos en minutos. Si
        solo tienes una idea o un boceto, podemos recomendarte diseñadores 3D en Barranquilla que
        trabajan con emprendedores.
      </p>
      <p className="mt-4">
        Usa nuestro{' '}
        <a href="/cotizar-impresion-3d" className="text-primary underline">cotizador en línea</a> para
        estimar el costo de tus prototipos al instante. En Tecnoprints Barranquilla ayudamos a
        emprendedores cada día a materializar sus ideas con impresión 3D rápida, económica y de calidad.
      </p>
    </>
  )
}

export function RegalosPersonalizadosContent() {
  return (
    <>
      <p>
        Los <strong className="text-white">regalos personalizados con impresión 3D</strong> son la
        tendencia que está creciendo en Barranquilla. Olvídate de los regalos genéricos — con la
        impresión 3D puedes crear piezas únicas con nombres, fechas, formas especiales y diseños
        que no encontrarás en ninguna tienda.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">
        Ideas de <span className="text-primary">Regalos Personalizados 3D</span>
      </h2>
      <p>
        En Tecnoprints Barranquilla hemos impreso cientos de regalos personalizados. Estas son las
        ideas más populares entre nuestros clientes:
      </p>
      <ul className="list-disc list-inside space-y-2 mt-4">
        <li><strong className="text-white">Llaveros personalizados:</strong> Con nombres, iniciales,
        logos o formas especiales. Los llaveros personalizados son el regalo 3D más solicitado en
        Barranquilla — económicos, prácticos y únicos.</li>
        <li><strong className="text-white">Figuras 3D personalizadas:</strong> Desde figuras de
        personajes favoritos hasta réplicas en miniatura de mascotas, carros o edificios. Las figuras
        3D son perfectas para coleccionistas y fans.</li>
        <li><strong className="text-white">Letreros y placas con nombre:</strong> Para escritorios,
        puertas o decoración del hogar. Disponibles en múltiples colores y estilos.</li>
        <li><strong className="text-white">Cajas y organizadores:</strong> Diseñados a medida con
        compartimentos específicos para joyas, herramientas o colecciones.</li>
        <li><strong className="text-white">Decoración temática:</strong> Porta velas, macetas
        geométricas, figuras decorativas para eventos, souvenirs para fiestas en Barranquilla.</li>
      </ul>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">
        ¿Cuánto Cuestan los <span className="text-primary">Regalos 3D</span>?
      </h2>
      <p>
        Los regalos personalizados en 3D son más accesibles de lo que piensas. En Barranquilla,
        estos son los rangos de precio típicos:
      </p>
      <ul className="list-disc list-inside space-y-2 mt-4">
        <li><strong className="text-white">Llaveros y piezas pequeñas:</strong> Desde $3,000 COP
        por unidad. Ideales para detalles en cantidad.</li>
        <li><strong className="text-white">Figuras medianas (5-10cm):</strong> Entre $15,000 y
        $40,000 COP. Perfectas como regalo individual.</li>
        <li><strong className="text-white">Piezas decorativas grandes:</strong> Desde $40,000 COP.
        Para regalos premium con acabado especial.</li>
        <li><strong className="text-white">Pedidos por lote:</strong> Descuentos especiales para
        souvenirs de eventos, matrimonios o fiestas empresariales.</li>
      </ul>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">
        Cómo Pedir tu <span className="text-primary">Regalo Personalizado</span>
      </h2>
      <p>
        Pedir un regalo personalizado en Tecnoprints Barranquilla es fácil. Si ya tienes un modelo
        3D, sube tu archivo en nuestro{' '}
        <a href="/cotizar-impresion-3d" className="text-primary underline">cotizador en línea</a> y
        obtén un precio instantáneo. Si tienes una idea pero no un diseño, escríbenos por WhatsApp
        con una descripción o imagen de referencia y te asesoramos sobre cómo hacerlo realidad.
      </p>
      <p className="mt-4">
        Ofrecemos múltiples colores de PLA, incluyendo acabados metalizados (PLA Silk) para regalos
        con un toque premium. Los tiempos de entrega en Barranquilla son de el mismo día hasta 48 horas para la
        mayoría de regalos personalizados en 3D.
      </p>
    </>
  )
}

export function ImpresionIngenieriaContent() {
  return (
    <>
      <p>
        La <strong className="text-white">impresión 3D para ingeniería</strong> se ha convertido en
        una herramienta indispensable para profesionales y empresas en Barranquilla. Desde prototipos
        funcionales hasta piezas de reemplazo y herramientas personalizadas, la manufactura aditiva
        resuelve problemas reales de ingeniería con rapidez y bajo costo.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">
        <span className="text-primary">Prototipos Funcionales</span> para Ingenieros
      </h2>
      <p>
        Un prototipo funcional va más allá de lo visual — necesita resistir esfuerzos, encajar con
        otras piezas y simular el comportamiento del producto final. En Tecnoprints Barranquilla
        ofrecemos materiales y calidades diseñados para aplicaciones de ingeniería:
      </p>
      <ul className="list-disc list-inside space-y-2 mt-4">
        <li><strong className="text-white">PLA de alta densidad:</strong> Con relleno del 50-80%,
        ideal para validar geometrías y ajustes mecánicos. Buena rigidez y precisión dimensional.</li>
        <li><strong className="text-white">PETG para resistencia:</strong> Mayor resistencia al
        impacto y a la temperatura que el PLA. Perfecto para piezas que trabajarán bajo estrés
        mecánico o en ambientes cálidos de Barranquilla.</li>
        <li><strong className="text-white">TPU flexible:</strong> Para juntas, sellos, amortiguadores
        y cualquier componente que necesite absorber vibraciones o deformarse sin romperse.</li>
      </ul>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">
        <span className="text-primary">Piezas 3D Industriales</span> y de Reemplazo
      </h2>
      <p>
        Uno de los usos más prácticos de la impresión 3D en ingeniería es la fabricación de piezas
        de reemplazo. En Barranquilla, muchas empresas pierden tiempo y dinero esperando repuestos
        importados. Con impresión 3D, puedes fabricar la pieza localmente en horas:
      </p>
      <ul className="list-disc list-inside space-y-2 mt-4">
        <li><strong className="text-white">Engranajes y poleas:</strong> En PLA o PETG con la
        precisión necesaria para aplicaciones de baja y media carga.</li>
        <li><strong className="text-white">Carcasas y cubiertas:</strong> Protege componentes
        electrónicos con carcasas diseñadas a medida exacta.</li>
        <li><strong className="text-white">Soportes y brackets:</strong> Fija sensores, cámaras,
        cables o cualquier componente con montajes personalizados.</li>
        <li><strong className="text-white">Jigs y fixtures:</strong> Herramientas de alineación,
        posicionamiento y ensamblaje específicas para tu línea de producción.</li>
      </ul>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">
        Especificaciones <span className="text-primary">Técnicas</span> de Nuestro Servicio
      </h2>
      <p>
        En Tecnoprints Barranquilla trabajamos con impresoras Bambu Lab que ofrecen tolerancias de
        ±0.1mm en ejes X/Y y capas desde 0.08mm. Para proyectos de ingeniería, recomendamos calidad
        alta con relleno del 40% o superior para piezas que requieran resistencia mecánica.
      </p>
      <p className="mt-4">
        ¿Necesitas una pieza para un proyecto de ingeniería en Barranquilla? Envía tu archivo STL
        o STEP a través de nuestro{' '}
        <a href="/cotizar-impresion-3d" className="text-primary underline">formulario de cotización</a> o
        por WhatsApp. Te asesoramos sobre el material y la configuración óptima para tu aplicación
        de impresión 3D en ingeniería.
      </p>
    </>
  )
}

export function ServicioDomicilioContent() {
  return (
    <>
      <p>
        En Tecnoprints ofrecemos <strong className="text-white">impresión 3D a domicilio en
        Barranquilla</strong>. Olvídate de desplazarte — sube tu archivo, recibe tu cotización y te
        entregamos la pieza terminada directamente en tu puerta. Nuestro servicio de impresión 3D en
        Barranquilla está diseñado para que el proceso sea 100% digital, rápido y sin complicaciones.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">
        ¿Cómo Funciona el <span className="text-primary">Servicio a Domicilio</span>?
      </h2>
      <p>
        Nuestro proceso es completamente digital. No necesitas visitar un local ni hacer filas.
        Así funciona paso a paso:
      </p>
      <ol className="list-decimal list-inside space-y-2 mt-4">
        <li><strong className="text-white">Sube tu archivo:</strong> Envía tu modelo 3D (STL, OBJ
        o STEP) a través de nuestro{' '}
        <a href="/cotizar-impresion-3d" className="text-primary underline">cotizador en línea</a> o
        por WhatsApp. Aceptamos archivos de cualquier software de diseño.</li>
        <li><strong className="text-white">Recibe tu cotización:</strong> En minutos tendrás el
        precio exacto basado en los gramos de material, calidad seleccionada y cantidad. Sin costos
        ocultos ni sorpresas.</li>
        <li><strong className="text-white">Aprueba y producimos:</strong> Una vez confirmado el
        pedido, comenzamos a imprimir inmediatamente en nuestras impresoras Bambu Lab de alta
        velocidad.</li>
        <li><strong className="text-white">Entrega en tu puerta:</strong> Te llevamos la pieza
        terminada a cualquier dirección en Barranquilla. También puedes recoger en nuestro punto
        si lo prefieres.</li>
      </ol>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">
        <span className="text-primary">Entrega Rápida</span> en Barranquilla
      </h2>
      <p>
        Sabemos que el tiempo es importante. Por eso nuestro servicio de impresión 3D en Barranquilla
        está optimizado para entrega rápida:
      </p>
      <ul className="list-disc list-inside space-y-2 mt-4">
        <li><strong className="text-white">Piezas pequeñas y medianas:</strong> Entrega en 24-48
        horas en Barranquilla. La mayoría de pedidos se completan al día siguiente.</li>
        <li><strong className="text-white">Proyectos grandes:</strong> Entrega en 2-4 días según
        la complejidad. Te informamos la fecha exacta al confirmar el pedido.</li>
        <li><strong className="text-white">Pedidos urgentes:</strong> ¿Lo necesitas para hoy?
        Contáctanos por WhatsApp y evaluamos la posibilidad de entrega express en Barranquilla.</li>
      </ul>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">
        Cobertura del <span className="text-primary">Servicio</span> en Barranquilla
      </h2>
      <p>
        Nuestro servicio de impresión 3D a domicilio cubre toda Barranquilla y su área metropolitana.
        Realizamos entregas en todos los barrios de la ciudad, desde el norte hasta el sur. Para
        ubicaciones fuera de Barranquilla en el Atlántico, también hacemos envíos con empresas de
        mensajería.
      </p>
      <p className="mt-4">
        ¿Listo para recibir tu impresión 3D a domicilio en Barranquilla? Comienza ahora subiendo tu
        archivo en nuestro{' '}
        <a href="/cotizar-impresion-3d" className="text-primary underline">cotizador en línea</a> o
        escríbenos por WhatsApp para asesoría personalizada. En Tecnoprints hacemos que el servicio
        de impresión 3D en Barranquilla sea fácil, rápido y accesible para todos.
      </p>
    </>
  )
}
