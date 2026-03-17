import Image from 'next/image'

export function CuantoCuestaContent() {
  return (
    <>
      <p>
        Si estás buscando un servicio de impresión 3D en Barranquilla, una de las primeras
        preguntas que surge es: ¿cuánto va a costar? El precio de una impresión 3D depende de
        varios factores que explicamos en esta guía completa para que puedas planificar tu proyecto
        con un presupuesto claro y realista.
      </p>

      <div className="my-8 relative aspect-video w-full">
        <Image
          src="https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=1200&h=675&fit=crop"
          alt="Impresora 3D en funcionamiento"
          fill
          className="object-cover rounded-lg"
          unoptimized
        />
      </div>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">
        Factores que Determinan el <span className="text-primary">Precio</span>
      </h2>
      <p>
        El costo de una impresión 3D en Barranquilla se calcula principalmente por la cantidad
        de material utilizado (gramos de PLA), el tiempo de impresión, la complejidad del diseño
        y la calidad seleccionada. Entender estos factores te ayudará a negociar mejores precios
        y tomar decisiones informadas sobre tu proyecto.
      </p>

      <p className="mt-4">
        En Tecnoprints, utilizamos un sistema de cotización transparente basado en el peso del modelo
        en gramos multiplicado por nuestro costo unitario de material (60 COP/gramo), más el costo
        de electricidad (4 COP por minuto de impresión) y un margen de ganancia estándar. Esto significa
        que puedes calcular aproximadamente cuánto costará tu pieza antes de enviarla.
      </p>

      <ul className="list-disc list-inside space-y-3 mt-6">
        <li><strong className="text-white">Volumen del modelo:</strong> Piezas más grandes
        requieren más material. Un cubo de 5cm usa aproximadamente 30g de PLA, mientras que uno
        de 10cm puede superar los 200g. El volumen es el factor más crítico en el costo final.
        Por eso, optimizar el relleno interno es tan importante.</li>
        
        <li><strong className="text-white">Porcentaje de relleno:</strong> La calidad baja (15%
        relleno) usa menos material que la calidad alta (50% relleno). Para prototipos rápidos,
        la calidad baja es suficiente y cuesta 30-40% menos. Para piezas funcionales que necesitan
        resistencia estructural, recomendamos media (30%) o alta (50%).</li>
        
        <li><strong className="text-white">Complejidad del diseño:</strong> Modelos con voladizos,
        ángulos pronunciados o geometrías complejas necesitan material de soporte adicional, lo que
        incrementa el costo de 15-30%. Un cubo hueco es más económico que una escultura detallada.</li>
        
        <li><strong className="text-white">Tiempo de impresión:</strong> Mientras más tiempo se
        imprima, más electricidad se consume. Una pieza pequeña puede tomar 30 minutos, mientras que
        un modelo grande puede tomar 20+ horas. El tiempo de impresión también afecta la disponibilidad
        de la máquina para otros proyectos.</li>
        
        <li><strong className="text-white">Cantidad:</strong> Pedidos en lote tienen un menor
        costo por unidad, ya que las impresoras pueden trabajar en simultáneo produciendo múltiples
        piezas. Si necesitas 10 llaveros, el costo individual es mucho menor que hacer uno solo.</li>
        
        <li><strong className="text-white">Tipo de material:</strong> PLA es el más económico.
        PETG cuesta 15-20% más. TPU flexible cuesta 40-50% más. ABS y nylon son aún más caros.
        En Barranquilla, PLA y PETG son los más accesibles.</li>
      </ul>

      <div className="my-8 relative aspect-video w-full">
        <Image
          src="https://images.unsplash.com/photo-1637373886313-a9bb5dbd11af?w=1200&h=675&fit=crop"
          alt="Modelos 3D impresos en diferentes colores"
          fill
          className="object-cover rounded-lg"
          unoptimized
        />
      </div>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">
        Rangos de <span className="text-primary">Precio</span> Típicos en Barranquilla 2026
      </h2>
      <p>
        Basándonos en nuestros precios actuales en Tecnoprints Barranquilla, estos son los rangos
        realistas que puedes esperar para impresión 3D en PLA. Estos precios incluyen material,
        electricidad y mano de obra:
      </p>
      
      <ul className="list-disc list-inside space-y-3 mt-6">
        <li><strong className="text-white">Piezas muy pequeñas (5-20g):</strong> Llaveros simples,
        botones personalizados, piezas de juguetes. Costo: $12,500 - $25,000 COP. Estas piezas generalmente
        se imprimen en 30-60 minutos.</li>
        
        <li><strong className="text-white">Piezas pequeñas (20-50g):</strong> Figuras decorativas,
        piezas mecánicas pequeñas, sellos personalizados. Costo: $25,000 - $45,000 COP. Tiempo: 1-2 horas.</li>
        
        <li><strong className="text-white">Prototipos medianos (50-150g):</strong> Carcasas de dispositivos,
        modelos arquitectónicos pequeños, componentes de proyectos universitarios. Rango: $45,000 - $100,000 COP.
        Tiempo: 2-6 horas.</li>
        
        <li><strong className="text-white">Piezas grandes (150-300g):</strong> Maquetas detalladas,
        prototipos industriales, piezas funcionales complejas. Rango: $100,000 - $200,000 COP.
        Tiempo: 6-12 horas.</li>
        
        <li><strong className="text-white">Piezas muy grandes (300g+):</strong> Prototipos a escala,
        piezas de tesis o proyectos especiales. El precio varía según complejidad. Desde $200,000 COP.
        Tiempo: 12-48+ horas.</li>
      </ul>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">
        Cómo Obtener la Mejor <span className="text-primary">Cotización</span>
      </h2>
      <p>
        Para obtener el mejor precio en tu impresión 3D en Barranquilla, te recomendamos seguir
        estas estrategias probadas que usamos con nuestros clientes:
      </p>
      
      <ul className="list-disc list-inside space-y-3 mt-6">
        <li><strong className="text-white">Optimiza el relleno:</strong> Usa 15-20% para prototipos,
        30% para piezas de presentación, 50% solo si necesita resistencia estructural.</li>
        
        <li><strong className="text-white">Reduce soportes:</strong> Diseña el modelo de forma que
        necesite menos material de soporte. Inclina las piezas 45° para reducir soportes.</li>
        
        <li><strong className="text-white">Agrupa pedidos:</strong> Si necesitas 5 modelos, imprime
        los 5 juntos. El precio total es menor que imprimirlos por separado.</li>
        
        <li><strong className="text-white">Usa nuestro cotizador en línea:</strong> Estima el peso
        de tu modelo antes de enviarlo. Puedes usar Fusion 360 o el estimador de Cura.</li>
        
        <li><strong className="text-white">Negocia descuentos por volumen:</strong> Para pedidos
        de 10+ unidades, podemos ofrecer 10-15% de descuento.</li>
      </ul>

      <div className="my-8 relative aspect-video w-full">
        <Image
          src="https://images.unsplash.com/photo-1618788385297-9b0b474e0a05?w=1200&h=675&fit=crop"
          alt="Diseño 3D en computadora"
          fill
          className="object-cover rounded-lg"
          unoptimized
        />
      </div>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">
        Preguntas <span className="text-primary">Frecuentes</span> sobre Precios
      </h2>
      
      <p><strong className="text-white">¿El precio incluye ensamblaje o acabado?</strong></p>
      <p className="ml-4 mt-2">No. El precio es solo por la impresión. Ensamblaje, pintura o acabados
      especiales tienen costo adicional. Un llavero básico no necesita acabado, pero una maqueta arquitectónica
      podría beneficiarse de pintura y pegamento.</p>

      <p className="mt-4"><strong className="text-white">¿Hay costo mínimo?</strong></p>
      <p className="ml-4 mt-2">Sí. El costo mínimo es $12,500 COP para cualquier pieza, incluso si el
      material cuesta menos. Esto cubre el tiempo de configuración de la máquina y mano de obra.</p>

      <p className="mt-4"><strong className="text-white">¿Puedo pagar en cuotas?</strong></p>
      <p className="ml-4 mt-2">Para proyectos menores a $50,000, pagos en efectivo o transferencia.
      Para proyectos mayores, podemos negociar términos especiales.</p>
    </>
  )
}

export function ComoPreparartSTLContent() {
  return (
    <>
      <p>
        Un archivo STL bien preparado es la base de una impresión 3D exitosa. Si tu archivo tiene
        errores, la impresión fallará o quedará deformada. En esta guía completa te explicamos qué es
        un archivo STL, cómo exportarlo correctamente desde los software más populares, y los errores
        más comunes que debes evitar para garantizar una impresión perfecta.
      </p>

      <div className="my-8 relative aspect-video w-full">
        <Image
          src="https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=1200&h=675&fit=crop"
          alt="Archivo STL siendo preparado"
          fill
          className="object-cover rounded-lg"
          unoptimized
        />
      </div>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">
        ¿Qué es un Archivo <span className="text-primary">STL</span>?
      </h2>
      <p>
        STL (Standard Tessellation Language o Stereolithography) es el formato de archivo más utilizado
        en impresión 3D. Representa la superficie de un modelo 3D como una malla de triángulos. Cada triángulo
        define una pequeña sección de la superficie, y cuando se combinan todos, crean la forma completa.
      </p>

      <p className="mt-4">
        Prácticamente todos los software de diseño 3D pueden exportar en formato STL: Fusion 360, SolidWorks,
        Blender, Tinkercad, FreeCAD y muchos otros. Los archivos STL pueden ser binarios (más pequeños) o ASCII
        (más legibles pero más grandes). En Tecnoprints aceptamos ambos, pero preferimos binarios para faster uploads.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">
        Cómo Exportar STL desde tu <span className="text-primary">Software</span> Favorito
      </h2>
      
      <ul className="list-disc list-inside space-y-4 mt-6">
        <li><strong className="text-white">Fusion 360:</strong> File → Export → selecciona STL
        como formato. En "Export Type" elige "Binary" para archivos más pequeños y rápidos de cargar.
        Asegúrate de que todas las transformaciones estén aplicadas (selecciona todo el cuerpo).</li>
        
        <li><strong className="text-white">SolidWorks:</strong> File → Save As → selecciona STL (.stl).
        En las opciones de exportación, ajusta la "Resolution" a "Fine" para mejor calidad de malla.
        Resolution "Coarse" puede dejar aristas visibles en la pieza impresa.</li>
        
        <li><strong className="text-white">Tinkercad:</strong> Haz clic en Export → selecciona .STL.
        Tinkercad siempre exporta en formato binario optimizado automáticamente. El archivo estará listo
        para imprimir sin ajustes adicionales.</li>
        
        <li><strong className="text-white">Blender:</strong> File → Export → STL. Asegúrate de
        aplicar todas las transformaciones (Ctrl+A → Apply All Transforms) antes de exportar. Desmarca
        "Apply Modifiers" si aún estás iterando el diseño.</li>
        
        <li><strong className="text-white">FreeCAD:</strong> File → Export → selecciona STL Mesh.
        Ajusta la "Deviation" (desviación de malla) a 0.1mm para un buen balance entre calidad y tamaño
        de archivo. Valores menores generan archivos más pesados pero mejor detalle.</li>

        <li><strong className="text-white">OnShape (Cloud-based):</strong> Right-click en tu modelo →
        Export → STL. OnShape maneja la escala automáticamente, por lo que es muy confiable para principiantes.</li>
      </ul>

      <div className="my-8 relative aspect-video w-full">
        <Image
          src="https://images.unsplash.com/photo-1629624716712-4da00a876d5d?w=1200&h=675&fit=crop"
          alt="Software de diseño 3D"
          fill
          className="object-cover rounded-lg"
          unoptimized
        />
      </div>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">
        Errores Comunes y Cómo <span className="text-primary">Evitarlos</span>
      </h2>
      
      <ul className="list-disc list-inside space-y-4 mt-6">
        <li><strong className="text-white">Paredes muy delgadas:</strong> Las paredes deben tener
        al menos 1mm de grosor (idealmente 1.5-2mm para resistencia). Paredes más finas pueden no imprimirse
        correctamente, pueden ser muy frágiles, o causar que la impresora se atore. Usa las herramientas
        de verificación de grosor en tu software antes de exportar.</li>
        
        <li><strong className="text-white">Mallas no manifold (no cerradas):</strong> Tu modelo debe ser una
        malla completamente cerrada sin agujeros, orificios o aristas sueltas. Si tiene huecos internos, la
        impresora no sabrá cómo rellenarlos. Software como Meshmixer o Netfabb pueden reparar estos errores
        automáticamente. En línea, usa MeshLab (gratuito) para validar tu archivo.</li>
        
        <li><strong className="text-white">Escala incorrecta (¡el error más común!):</strong> Verifica que las
        unidades de tu modelo sean milímetros. Un error muy común es exportar en pulgadas o centímetros, resultando
        en una pieza 10 veces más grande o 25 veces más pequeña de lo esperado. En Cura, siempre valida las dimensiones
        antes de imprimir.</li>
        
        <li><strong className="text-white">Resolución de malla baja:</strong> Una malla con muy pocos triángulos
        genera superficies facetadas y poco detalladas. Usa resolución media o alta al exportar. Si tu archivo STL
        pesa menos de 100KB, probablemente tenga baja resolución.</li>

        <li><strong className="text-white">Orientación incorrecta:</strong> La orientación del modelo afecta el
        tiempo de impresión y la necesidad de soportes. Orienta el modelo de forma que minimice soportes y maximize
        la resistencia en la dirección crítica.</li>
      </ul>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">
        Formatos <span className="text-primary">Alternativos</span> que Aceptamos
      </h2>
      <p>
        Además de STL, en Tecnoprints también aceptamos archivos en formatos: OBJ, STEP (.stp), 3MF, IGES y STP.
        Si tienes tu diseño en otro formato como IGES, 3MF o Parasolid, contáctanos por WhatsApp y te ayudamos
        a convertirlo sin costo adicional. También ofrecemos servicio de reparación de archivos STL dañados.
      </p>

      <div className="my-8 relative aspect-[4/3] w-full">
        <Image
          src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=1200&h=900&fit=crop"
          alt="Validación de archivo 3D"
          fill
          className="object-cover rounded-lg"
          unoptimized
        />
      </div>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">
        <span className="text-primary">Herramientas Gratuitas</span> para Validar tu STL
      </h2>
      <ul className="list-disc list-inside space-y-2 mt-4">
        <li><strong>Cura (Ultimaker):</strong> Software gratuito que muestra errores en tu modelo</li>
        <li><strong>Meshmixer (Autodesk):</strong> Repara y valida archivos STL</li>
        <li><strong>MeshLab:</strong> Inspecciona y corrige mallas 3D</li>
        <li><strong>3DViewer.net:</strong> Visualiza online sin descargar nada</li>
      </ul>
    </>
  )
}

export function TesisUniversitariasContent() {
  return (
    <>
      <p>
        Si eres estudiante de universidad en Barranquilla, la impresión 3D puede ser el diferenciador
        que haga que tu tesis destaque. Desde ingeniería hasta arquitectura, muchos campos pueden beneficiarse
        enormemente de prototipos físicos impresos en 3D. En esta guía completa te explicamos todo lo que
        necesitas saber para incluir modelos 3D en tu tesis de grado.
      </p>

      <div className="my-8 relative aspect-video w-full">
        <Image
          src="https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=1200&h=675&fit=crop"
          alt="Modelo 3D para proyecto universitario"
          fill
          className="object-cover rounded-lg"
          unoptimized
        />
      </div>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">
        ¿Por Qué Incluir <span className="text-primary">Impresión 3D</span> en tu Tesis?
      </h2>
      <p>
        Un prototipo físico impreso en 3D demuestra que tu idea no es solo teórica, sino que funciona en
        la práctica. Los jurados universitarios valoran enormemente la capacidad de materializar conceptos.
        Esto aplica especialmente a carreras como Ingeniería Mecánica, Electrónica, Diseño Industrial,
        Arquitectura y Productos.
      </p>

      <p className="mt-4">
        En Barranquilla, las universidades como Uninorte, Tecnológica, Carlos III y otras valoran mucho
        los proyectos con prototipos físicos. Un prototipo bien impreso puede ser la diferencia entre
        una tesis de 3.5/5 y una de 4.8/5 según el jurado.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">
        Qué Estudios Pueden Usar <span className="text-primary">Impresión 3D</span>
      </h2>
      
      <ul className="list-disc list-inside space-y-3 mt-6">
        <li><strong className="text-white">Ingeniería Mecánica:</strong> Prototipos funcionales, componentes
        de máquinas, estructuras. Puedes imprimir partes de tu máquina y demostrar su funcionamiento.</li>
        
        <li><strong className="text-white">Ingeniería Electrónica:</strong> Carcasas para circuitos, cajas
        de control, brackets personalizados. La carcasa es lo visible del proyecto.</li>
        
        <li><strong className="text-white">Diseño Industrial:</strong> Modelos de presentación, maquetas
        a escala, prototipos para usuario testing. Esto es perfectamente ajustado a impresión 3D.</li>
        
        <li><strong className="text-white">Arquitectura:</strong> Maquetas detalladas de edificios, layouts
        de proyectos urbanos, modelos topográficos. Los jurados aman las maquetas arquitectónicas.</li>
        
        <li><strong className="text-white">Ingeniería Civil:</strong> Modelos estructurales, puentes a escala,
        proyectos hidráulicos. Demuestra tu comprensión de cargas y estructuras.</li>
        
        <li><strong className="text-white">Biología/Medicina:</strong> Modelos anatómicos, prótesis, dispositivos
        médicos. La impresión 3D es revolucionaria en medicina.</li>
      </ul>

      <div className="my-8 relative aspect-video w-full">
        <Image
          src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=1200&h=675&fit=crop"
          alt="Prototipo de tesis"
          fill
          className="object-cover rounded-lg"
          unoptimized
        />
      </div>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">
        Pasos para Incluir Modelos <span className="text-primary">3D</span> en tu Tesis
      </h2>
      
      <ol className="list-decimal list-inside space-y-3 mt-6">
        <li><strong className="text-white">Diseña tu modelo en CAD:</strong> Usa Fusion 360 (gratuito para
        estudiantes), SolidWorks (muchas universidades lo ofrecen) o Blender (completamente gratuito).</li>
        
        <li><strong className="text-white">Valida el diseño:</strong> Simula si es posible, verifica
        dimensiones, asegura que sea imprimible (paredes >1mm, sin ángulos imposibles).</li>
        
        <li><strong className="text-white">Exporta a STL:</strong> Sigue los pasos en nuestra guía anterior
        para exportar correctamente. Verifica escala (mm) y que la malla esté cerrada.</li>
        
        <li><strong className="text-white">Cotiza en Tecnoprints:</strong> Envía tu archivo STL y te damos
        presupuesto, tiempo de impresión y estimado de peso. Generalmente en 24 horas.</li>
        
        <li><strong className="text-white">Imprime:</strong> Entramos el modelo. Tiempo depende del tamaño:
        pequeño (2 horas), mediano (4-8 horas), grande (24+ horas).</li>
        
        <li><strong className="text-white">Opcional: Acabado:</strong> Puedes pintar, lijar, barnizar o
        ensamblar piezas. Esto requiere tiempo adicional pero mejora muchísimo la presentación.</li>
      </ol>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">
        Consejos para que tu Prototipo <span className="text-primary">Impresione</span> al Jurado
      </h2>
      
      <ul className="list-disc list-inside space-y-3 mt-6">
        <li>Imprime en color si es relevante para tu proyecto. El PLA Silk (acabado metalizado) se ve profesional.</li>
        <li>Mantén el modelo limpio y protegido hasta la defensa.</li>
        <li>Documenta el proceso de fabricación con fotos. Muestra la evolución en tu presentación.</li>
        <li>Si el modelo es funcional, demuéstralo durante la defensa (¡esto impacta!).</li>
        <li>Incluye el modelo físico como anexo en la presentación oral.</li>
      </ul>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">
        Presupuesto Típico para Tesis
      </h2>
      <p>
        La mayoría de nuestros clientes universitarios gastan entre $50,000 - $150,000 COP en impresión
        para su tesis. Esto generalmente cubre 1-3 modelos. Como estudiante, podemos ofrecer descuento
        especial. Pregunta por nuestro programa "Tecnoprints para Estudiantes".
      </p>
    </>
  )
}

export function MejoresMaterialesContent() {
  return (
    <>
      <p>
        Elegir el material correcto es clave para el éxito de tu impresión 3D. Cada filamento tiene
        propiedades diferentes que lo hacen ideal para ciertos usos: flexibilidad, resistencia, temperatura,
        rigidez. En esta guía comparamos detalladamente los materiales más populares disponibles en Barranquilla.
      </p>

      <div className="my-8 relative aspect-video w-full">
        <Image
          src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=1200&h=675&fit=crop"
          alt="Filamentos 3D en diferentes colores"
          fill
          className="object-cover rounded-lg"
          unoptimized
        />
      </div>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">
        <span className="text-primary">PLA</span> — El Material Más Popular
      </h2>
      <p>
        El PLA (Ácido Poliláctico) es el material estándar en impresión 3D FDM y el que más utilizamos en
        Tecnoprints Barranquilla porque es biodegradable, fácil de imprimir, económico y produce piezas con
        excelente detalle superficial.
      </p>
      
      <ul className="list-disc list-inside space-y-2 mt-4">
        <li><strong className="text-white">Ideal para:</strong> Prototipos, maquetas, figuras decorativas, piezas de presentación, tesis universitarias, piezas de corta duración.</li>
        <li><strong className="text-white">Temperatura de impresión:</strong> 190-220°C</li>
        <li><strong className="text-white">Resistencia:</strong> Buena rigidez, muy baja flexibilidad. No apto para piezas que reciban impactos fuertes o estrés repetido.</li>
        <li><strong className="text-white">Acabado:</strong> Superficie lisa y suave, disponible en +30 colores incluyendo PLA Silk con acabado metalizado muy profesional.</li>
        <li><strong className="text-white">Precio:</strong> $150-200 COP por gramo (el más económico).</li>
        <li><strong className="text-white">Limitaciones:</strong> No es resistente al calor, se degrada con temperatura >50°C, no es flexible.</li>
      </ul>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">
        <span className="text-primary">PETG</span> — El Material Profesional
      </h2>
      <p>
        PETG (Polietileno Tereftalato Glicol) es más resistente que PLA pero más fácil de imprimir que ABS.
        Es el material preferido para piezas funcionales que necesitan durar y resistir.
      </p>

      <ul className="list-disc list-inside space-y-2 mt-4">
        <li><strong className="text-white">Ideal para:</strong> Piezas funcionales, carcasas de dispositivos, herramientas, piezas con estrés mecánico, prototipos que serán manipulados frecuentemente.</li>
        <li><strong className="text-white">Resistencia:</strong> 40-50% más resistente que PLA. Mejor resistencia al impacto y a la flexión.</li>
        <li><strong className="text-white">Temperatura:</strong> Soporta hasta 80°C. Más resistente al calor que PLA.</li>
        <li><strong className="text-white">Acabado:</strong> Superficie menos suave que PLA, pero más profesional. Disponible en colores estándar.</li>
        <li><strong className="text-white">Precio:</strong> $180-250 COP por gramo (15-25% más caro que PLA).</li>
      </ul>

      <div className="my-8 relative aspect-video w-full">
        <Image
          src="https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=1200&h=675&fit=crop"
          alt="Material PETG impreso"
          fill
          className="object-cover rounded-lg"
          unoptimized
        />
      </div>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">
        <span className="text-primary">TPU</span> — El Material Flexible
      </h2>
      <p>
        TPU (Termoplástico Poliuretano) es un filamento elástico que permite crear piezas flexibles y blandas.
        Perfecto para zapatos, sellos, juguetes y cualquier cosa que necesite deformarse sin romperse.
      </p>

      <ul className="list-disc list-inside space-y-2 mt-4">
        <li><strong className="text-white">Ideal para:</strong> Zapatos personalizados, sellos, juntas, juguetes, piezas elásticas, amortiguadores.</li>
        <li><strong className="text-white">Flexibilidad:</strong> Extremadamente flexible, puede estirarse y comprimirse repetidamente sin daño.</li>
        <li><strong className="text-white">Resistencia:</strong> Muy durable para aplicaciones que requieren flexibilidad. Mejor que caucho para muchas aplicaciones.</li>
        <li><strong className="text-white">Precio:</strong> $300-400 COP por gramo (mucho más caro).</li>
        <li><strong className="text-white">Limitaciones:</strong> Más difícil de imprimir, requiere máquinas con capacidad especial, tiempo de impresión más lento.</li>
      </ul>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">
        Otros Materiales <span className="text-primary">Disponibles</span>
      </h2>
      
      <ul className="list-disc list-inside space-y-2 mt-4">
        <li><strong className="text-white">ABS:</strong> Similar a PETG pero más difícil de imprimir, más resistente al calor (hasta 100°C). $250-350 COP/g.</li>
        <li><strong className="text-white">Nylon:</strong> Extremadamente duradero y flexible, muy resistente. Caro ($400-500 COP/g) pero indestructible.</li>
        <li><strong className="text-white">Resina (SLA):</strong> No es FDM, usa impresoras especiales. Mejor detalle pero más caro. Empieza en $50,000 por pieza.</li>
      </ul>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">
        Cómo Elegir el Material Correcto
      </h2>
      
      <ol className="list-decimal list-inside space-y-2 mt-4">
        <li>¿Necesita flexibilidad? → TPU</li>
        <li>¿Será sometida a estrés mecánico? → PETG o Nylon</li>
        <li>¿Solo presentación y prototipo rápido? → PLA</li>
        <li>¿Usará calor? → PETG o ABS</li>
        <li>¿Presupuesto limitado? → PLA</li>
        <li>¿Máxima durabilidad? → Nylon</li>
      </ol>
    </>
  )
}

export function PrototipadoRapidoContent() {
  return (
    <>
      <p>
        El prototipado rápido con impresión 3D es una de las tecnologías más revolucionarias para
        emprendedores, diseñadores e innovadores. En Barranquilla, muchas empresas están usando esta
        capacidad para reducir tiempos de desarrollo de meses a semanas. En esta guía te explicamos
        cómo aprovechar el prototipado rápido para acelerar tus proyectos.
      </p>

      <div className="my-8 relative aspect-video w-full">
        <Image
          src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=1200&h=675&fit=crop"
          alt="Prototipado rápido en acción"
          fill
          className="object-cover rounded-lg"
          unoptimized
        />
      </div>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">
        ¿Qué es el <span className="text-primary">Prototipado Rápido</span>?
      </h2>
      <p>
        El prototipado rápido es el proceso de diseñar, fabricar y probar un prototipo funcional en
        el menor tiempo posible. Con impresión 3D, puedes ir de un diseño CAD a una pieza física en
        24-48 horas. Esto permite iterar rápidamente, probar con usuarios y mejorar antes de invertir
        en herramientas de manufactura caras.
      </p>

      <p className="mt-4">
        La velocidad es el superpoder del prototipado rápido. Mientras que un molde de inyección toma
        4-8 semanas y $50,000+, una impresión 3D toma un día y cuesta $1,000-5,000. Esto significa que
        puedes fallar rápido, aprender, y iterar sin quebrar el banco.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">
        Ciclo de <span className="text-primary">Iteración Rápida</span>
      </h2>
      
      <ol className="list-decimal list-inside space-y-3 mt-6">
        <li><strong className="text-white">Día 1 - Diseño:</strong> Finaliza tu CAD con las especificaciones más recientes.</li>
        <li><strong className="text-white">Día 1 (noche):</strong> Envía el archivo STL a Tecnoprints. Recibes cotización y timeline en 1-2 horas.</li>
        <li><strong className="text-white">Día 2 (mañana):</strong> Impresión comienza en la máquina.</li>
        <li><strong className="text-white">Día 2 (tarde/noche):</strong> Prototipo listo. Recepción en Barranquilla.</li>
        <li><strong className="text-white">Día 3:</strong> Testing con equipo o usuarios. Recopila feedback.</li>
        <li><strong className="text-white">Día 4:</strong> Realiza cambios al CAD basado en feedback.</li>
        <li><strong className="text-white">Día 4 (noche):</strong> Vuelve al paso 2. Segunda iteración comienza.</li>
      </ol>

      <p className="mt-6">
        En 2 semanas puedes hacer 5-7 iteraciones. En 2 meses, 20+ iteraciones. Esto es imposible con
        métodos tradicionales de manufacturing.
      </p>

      <div className="my-8 relative aspect-video w-full">
        <Image
          src="https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=1200&h=675&fit=crop"
          alt="Iteraciones de prototipo"
          fill
          className="object-cover rounded-lg"
          unoptimized
        />
      </div>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">
        Ventajas para <span className="text-primary">Empresas</span> y Emprendedores
      </h2>
      
      <ul className="list-disc list-inside space-y-3 mt-6">
        <li><strong className="text-white">Reducir time-to-market:</strong> Lanza tu producto en meses, no años. Gana ventaja competitiva.</li>
        <li><strong className="text-white">Bajar costos de desarrollo:</strong> Elimina errores costosos antes de manufactura a escala.</li>
        <li><strong className="text-white">Validar con usuarios reales:</strong> Prueba conceptos con clientes antes de invertir millones en moldes.</li>
        <li><strong className="text-white">Diseñar mejor:</strong> Prueba múltiples variantes. El usuario puede sentir y tocar el producto.</li>
        <li><strong className="text-white">Presentar a inversores:</strong> Un prototipo físico es mucho más persuasivo que un render.</li>
        <li><strong className="text-white">Customización sin costo:</strong> Cada prototipo puede ser ligeramente diferente sin costo extra.</li>
      </ul>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">
        Casos de Uso en <span className="text-primary">Barranquilla</span>
      </h2>
      
      <p>
        En Tecnoprints hemos visto empresas locales usar impresión 3D para:
      </p>
      
      <ul className="list-disc list-inside space-y-2 mt-4">
        <li>Una empresa de IoT que diseñó 8 versiones de una carcasa en 4 semanas antes de producción masiva</li>
        <li>Un startup médico que validó un dispositivo con 15 hospitales en Barranquilla antes de licencia</li>
        <li>Diseñadores de muebles que crean maquetas a escala para clientes corporativos</li>
        <li>Ingenieros que prueban mecanismos complejos antes de soldar acero (caro)</li>
      </ul>
    </>
  )
}

export function ArquitecturaMaquetasContent() {
  return (
    <>
      <p>
        Las maquetas de arquitectura impresas en 3D son una herramienta revolucionaria para presentar
        proyectos a clientes, gobiernos e inversores. En lugar de render en pantalla, puedes entregar
        una maqueta física detallada que el cliente puede tocar, rotar y visualizar en 3D real. En esta
        guía te explicamos cómo usar impresión 3D para maquetas de arquitectura en Barranquilla.
      </p>

      <div className="my-8 relative aspect-video w-full">
        <Image
          src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=1200&h=675&fit=crop"
          alt="Maqueta arquitectónica en 3D"
          fill
          className="object-cover rounded-lg"
          unoptimized
        />
      </div>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">
        Ventajas de <span className="text-primary">Maquetas Impresas</span> vs Tradicionales
      </h2>
      
      <table className="w-full mt-4 border-collapse border border-border">
        <thead>
          <tr className="bg-primary/20">
            <th className="border border-border p-3 text-left">Aspecto</th>
            <th className="border border-border p-3 text-left">Tradicional (Cartón, Madera)</th>
            <th className="border border-border p-3 text-left">Impresión 3D</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-border p-3"><strong>Tiempo</strong></td>
            <td className="border border-border p-3">2-4 semanas</td>
            <td className="border border-border p-3">2-7 días</td>
          </tr>
          <tr>
            <td className="border border-border p-3"><strong>Detalle</strong></td>
            <td className="border border-border p-3">Limitado por herramientas manuales</td>
            <td className="border border-border p-3">Detalles hasta 0.2mm</td>
          </tr>
          <tr>
            <td className="border border-border p-3"><strong>Precisión</strong></td>
            <td className="border border-border p-3">±2-5mm</td>
            <td className="border border-border p-3">±0.5mm</td>
          </tr>
          <tr>
            <td className="border border-border p-3"><strong>Escalabilidad</strong></td>
            <td className="border border-border p-3">Cada escala requiere nuevo molde manual</td>
            <td className="border border-border p-3">Ajusta en CAD, imprime cualquier escala</td>
          </tr>
          <tr>
            <td className="border border-border p-3"><strong>Costo</strong></td>
            <td className="border border-border p-3">$80,000-200,000 COP</td>
            <td className="border border-border p-3">$30,000-100,000 COP</td>
          </tr>
        </tbody>
      </table>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">
        Cómo Preparar tu Proyecto para <span className="text-primary">Impresión</span>
      </h2>
      
      <ol className="list-decimal list-inside space-y-4 mt-6">
        <li><strong className="text-white">Exporta desde Revit o SketchUp:</strong> La mayoría de arquitectos usan Revit o SketchUp. Ambos pueden exportar a formato STL. En Revit: File → Export → IFC, luego convierte a STL con software libre.</li>
        
        <li><strong className="text-white">Elige escala apropiada:</strong> Para edificios grandes, 1:500 o 1:200 son estándares. Pequeños proyectos, 1:100 o 1:50. Valida que encaje en la máquina (máximo 30cm en cualquier dimensión).</li>
        
        <li><strong className="text-white">Divide en secciones si es necesario:</strong> Un edificio de 10 pisos puede imprimirse como 2-3 bloques que se ensamblan con pegamento.</li>
        
        <li><strong className="text-white">Especifica detalles:</strong> ¿Quieres árboles? ¿Gente? ¿Carros? ¿Iluminación LED? Indicalo en la cotización.</li>
      </ol>

      <div className="my-8 relative aspect-video w-full">
        <Image
          src="https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=1200&h=675&fit=crop"
          alt="Detalles de maqueta arquitectónica"
          fill
          className="object-cover rounded-lg"
          unoptimized
        />
      </div>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">
        Opciones de <span className="text-primary">Acabado</span> y Presentación
      </h2>
      
      <ul className="list-disc list-inside space-y-3 mt-6">
        <li><strong className="text-white">Pintura profesional:</strong> Transformamos la maqueta blanca en una presentación a todo color. Fachadas, vegetación, base. Costo adicional: $30,000-80,000 COP.</li>
        
        <li><strong className="text-white">Base de presentación:</strong> Montamos la maqueta en una base de madera o acrílico con identificación del proyecto. Profesional y durable.</li>
        
        <li><strong className="text-white">Iluminación LED:</strong> Agregamos luces internas para destacar áreas clave. Requiere costo de instalación pero muy impactante para presentaciones.</li>
        
        <li><strong className="text-white">Integración con entorno:</strong> Agregamos árboles, personas, carros y vegetación. Esto eleva la presentación a nivel profesional.</li>
      </ul>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">
        Presupuesto Típico para <span className="text-primary">Arquitectos</span>
      </h2>
      
      <p className="mt-4">
        Un proyecto típico de arquitectura cuesta $50,000-150,000 COP en impresión, más $30,000-80,000 COP
        en acabados opcionales. Esto es significativamente menos que una maqueta tradicional hecha a mano.
      </p>

      <p className="mt-4">
        Muchos estudios de arquitectura en Barranquilla ahora presupuestan maquetas 3D en cada proyecto.
        Es una inversión que se recupera rápido porque mejora la probabilidad de ganar licitaciones.
      </p>
    </>
  )
}

export function DondeImprimirContent() {
  return (
    <>
      <p>
        Si vives en Barranquilla y necesitas imprimir en 3D, tienes varias opciones disponibles. En esta
        guía te ayudamos a entender las diferencias entre los servicios de impresión 3D en la ciudad, qué
        buscar, y cómo elegir el proveedor correcto para tu proyecto específico.
      </p>

      <div className="my-8 relative aspect-video w-full">
        <Image
          src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=1200&h=675&fit=crop"
          alt="Servicio de impresión 3D"
          fill
          className="object-cover rounded-lg"
          unoptimized
        />
      </div>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">
        Opciones de <span className="text-primary">Impresión 3D</span> en Barranquilla
      </h2>
      
      <ul className="list-disc list-inside space-y-4 mt-6">
        <li><strong className="text-white">Servicios de impresión (Tecnoprints):</strong> Enviamos tu archivo, nosotros imprimimos y entregamos. Rápido, confiable, precios transparentes. Lo más popular para profesionales.</li>
        
        <li><strong className="text-white">Makerspaces y FabLabs:</strong> Espacios compartidos donde puedes usar máquinas. Requiere aprender a usar la impresora. Bueno si vas a hacer muchos proyectos.</li>
        
        <li><strong className="text-white">Servicios en línea (Shapeways, Sculpteo):</strong> Cargas archivo online, ellos imprimen. Envío desde el extranjero, lento y caro para Barranquilla.</li>
        
        <li><strong className="text-white">Comprar tu propia máquina:</strong> Inversor $3-8 millones COP. Solo si vas a imprimir regularmente. Requiere espacio y mantenimiento.</li>
      </ul>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">
        Qué Buscar en un Servicio de <span className="text-primary">Impresión</span>
      </h2>
      
      <ol className="list-decimal list-inside space-y-3 mt-6">
        <li><strong className="text-white">Variedad de materiales:</strong> Al menos PLA, PETG, TPU. Idealmente más opciones.</li>
        <li><strong className="text-white">Velocidad de entrega:</strong> 24-48 horas es estándar. Menos es mejor.</li>
        <li><strong className="text-white">Precios transparentes:</strong> Cotización clara sin sorpresas. Calculadora en línea es bonus.</li>
        <li><strong className="text-white">Calidad consistente:</strong> Pregunta referencias, ve ejemplos anteriores.</li>
        <li><strong className="text-white">Servicio técnico:</strong> ¿Pueden ayudarte si tu archivo tiene problemas? Importante.</li>
        <li><strong className="text-white">Opciones de acabado:</strong> Pintura, lijado, pulido. Agrega valor.</li>
        <li><strong className="text-white">Flexibilidad:</strong> ¿Aceptan cambios de último minuto? ¿Qué pasa si necesitas urgente?</li>
      </ol>

      <div className="my-8 relative aspect-video w-full">
        <Image
          src="https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=1200&h=675&fit=crop"
          alt="Proceso de impresión 3D"
          fill
          className="object-cover rounded-lg"
          unoptimized
        />
      </div>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">
        Por Qué Elegir <span className="text-primary">Tecnoprints</span>
      </h2>
      
      <ul className="list-disc list-inside space-y-3 mt-6">
        <li>📍 Ubicados en Barranquilla. Entrega en 24-48 horas.</li>
        <li>💰 Precios transparentes, cotización inmediata por WhatsApp.</li>
        <li>🎨 Múltiples materiales: PLA, PETG, TPU, ABS, Nylon.</li>
        <li>✅ Validación gratis de archivos STL antes de imprimir.</li>
        <li>🖼️ Servicios de acabado: pintura, lijado, montaje en base.</li>
        <li>👥 Equipo técnico que ayuda a optimizar tu diseño.</li>
        <li>⚡ Capacidad de entrega urgente si lo necesitas.</li>
      </ul>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">
        Proceso Típico con <span className="text-primary">Tecnoprints</span>
      </h2>
      
      <ol className="list-decimal list-inside space-y-2 mt-4">
        <li>Envías archivo STL por WhatsApp al +57 323 926 7656</li>
        <li>En 1-2 horas recibir cotización con precio, material, tiempo</li>
        <li>Confirmas y realizas pago (transf. bancaria o efectivo)</li>
        <li>24-48 horas: tu modelo está listo</li>
        <li>Retiras en Barranquilla o coordinamos envío</li>
      </ol>
    </>
  )
}

export function ImpresionEconomicaContent() {
  return (
    <>
      <p>
        La impresión 3D no tiene que ser cara. Si conoces los trucos correctos, puedes imprimir modelos
        de alta calidad gastando mucho menos. En esta guía te compartimos las estrategias que usamos con
        clientes para ahorrar dinero sin sacrificar calidad en Barranquilla.
      </p>

      <div className="my-8 relative aspect-video w-full">
        <Image
          src="https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=1200&h=675&fit=crop"
          alt="Impresión 3D económica"
          fill
          className="object-cover rounded-lg"
          unoptimized
        />
      </div>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">
        Estrategias para <span className="text-primary">Ahorrar Dinero</span>
      </h2>
      
      <ul className="list-disc list-inside space-y-4 mt-6">
        <li><strong className="text-white">Usa 15% relleno en vez de 50%:</strong> Si la pieza no necesita resistencia estructural,
        15% relleno es suficiente. Ahorras 60-70% en material. PLA es barato, el relleno es lo que cuesta.</li>
        
        <li><strong className="text-white">Reduce grosor de paredes:</strong> 1.5mm es suficiente para casi cualquier cosa.
        0.8mm si es decorativo. Esto ahorra material directamente.</li>
        
        <li><strong className="text-white">Elimina soportes con diseño inteligente:</strong> Los soportes son material desperdiciado.
        Diseña con ángulos que no necesiten soporte (idealmente <45°).</li>
        
        <li><strong className="text-white">Agrupa en un solo pedido:</strong> Si necesitas 5 piezas, imprimelas juntas.
        Mismo tiempo de máquina, distribuyes costo de electricidad.</li>
        
        <li><strong className="text-white">Pide descuento por volumen:</strong> 10+ unidades iguales = 10-15% descuento en Tecnoprints.</li>
        
        <li><strong className="text-white">Usa PLA en vez de PETG:</strong> Si funcionalidad lo permite, PLA es 20-30% más barato.</li>
        
        <li><strong className="text-white">Evita acabados caros si no son necesarios:</strong> Impresión básica cuesta menos que pintura.</li>
      </ul>

      <div className="my-8 relative aspect-video w-full">
        <Image
          src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=1200&h=675&fit=crop"
          alt="Optimización de diseño 3D"
          fill
          className="object-cover rounded-lg"
          unoptimized
        />
      </div>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">
        Ejemplo Práctico: Ahorrar <span className="text-primary">50%</span>
      </h2>
      
      <p className="mt-4">
        Digamos que necesitas una carcasa de 200g. Precio normal: $90,000 COP (50% relleno, PLA estándar).
      </p>
      
      <ul className="list-disc list-inside space-y-2 mt-4">
        <li>Reduce a 20% relleno: $54,000 COP (40% ahorro)</li>
        <li>Delgada las paredes de 2mm a 1.5mm: $48,000 COP (15% ahorro más)</li>
        <li>Elimina soportes con diseño: $42,000 COP (12% ahorro)</li>
        <li><strong>Total: 53% ahorro</strong></li>
      </ul>

      <p className="mt-4">
        Y la carcasa sigue funcionando perfecto porque la resistencia no es crítica.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">
        Presupuesto Típico por Proyecto
      </h2>
      
      <ul className="list-disc list-inside space-y-2 mt-4">
        <li>Llavero simple: $12,500 - $20,000 COP</li>
        <li>Prototipo pequeño (50g): $25,000 - $40,000 COP</li>
        <li>Proyecto mediano (150g): $50,000 - $100,000 COP</li>
        <li>Proyecto grande (300g): $100,000 - $200,000 COP</li>
      </ul>
    </>
  )
}

export function ImpresionEmprendedoresContent() {
  return (
    <>
      <p>
        Si eres emprendedor en Barranquilla con una idea de producto, la impresión 3D es tu mejor aliado.
        Puedes validar tu concepto, fabricar primeras unidades y vender sin invertir millones en herramientas.
        En esta guía te explicamos cómo los emprendedores locales usan impresión 3D para crear y escalar
        sus negocios.
      </p>

      <div className="my-8 relative aspect-video w-full">
        <Image
          src="https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=1200&h=675&fit=crop"
          alt="Emprendedor con producto 3D"
          fill
          className="object-cover rounded-lg"
          unoptimized
        />
      </div>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">
        Modelo de Negocio: De Idea a <span className="text-primary">Producto en Venta</span>
      </h2>
      
      <ol className="list-decimal list-inside space-y-4 mt-6">
        <li><strong className="text-white">Semana 1-2: Validación rápida</strong> - Imprime prototipo. Costo: $30-50K COP. Tiempo: 2 días.</li>
        <li><strong className="text-white">Semana 2-3: Feedback de usuarios</strong> - Prueba con 10-20 potenciales clientes. Ajusta diseño.</li>
        <li><strong className="text-white">Semana 3-4: Producción piloto</strong> - Imprime 50-100 unidades para vender. Costo: $1-2M COP. Margen: 200-300%.</li>
        <li><strong className="text-white">Mes 2-3: Escalado (si tiene demanda)</strong> - Imprime 1000+ unidades. O busca moldeo si volumen es alto.</li>
      </ol>

      <p className="mt-6">
        Con este modelo, validaste mercado en 1 mes, con inversión <$5M. Métodos tradicionales: 6 meses,
        >$50M. ¡Esa es la ventaja de los emprendedores con impresión 3D!
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">
        Ideas de Productos que <span className="text-primary">Funcionan</span>
      </h2>
      
      <ul className="list-disc list-inside space-y-3 mt-6">
        <li><strong className="text-white">Organización + Storage:</strong> Organizadores de escritorio, cajas de cable, racks. Margen: 250-400%.</li>
        <li><strong className="text-white">Accesorios tech:</strong> Holders para celular, soportes para laptop, docks. Margen: 300-500%.</li>
        <li><strong className="text-white">Juguetes educativos:</strong> Puzzles, fidget toys, construcciones. Margen: 250-350%.</li>
        <li><strong className="text-white">Regalos personalizados:</strong> Llaveros, figuras customizadas, nombres decorativos. Margen: 400-600%.</li>
        <li><strong className="text-white">Piezas de repuesto:</strong> Para electrodomésticos, muebles, equipos. Margen: 200-300%.</li>
        <li><strong className="text-white">Accesorios de mascotas:</strong> Juguetes, comederos, camas. Margen: 250-350%.</li>
      </ul>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">
        Plan Financiero Básico (Ejemplo Real)
      </h2>
      
      <table className="w-full mt-4 border-collapse border border-border">
        <thead>
          <tr className="bg-primary/20">
            <th className="border border-border p-3 text-left">Concepto</th>
            <th className="border border-border p-3 text-right">Costo</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-border p-3">Prototipo (10 unidades)</td>
            <td className="border border-border p-3 text-right">$50,000</td>
          </tr>
          <tr>
            <td className="border border-border p-3">Testing & feedback (2 semanas)</td>
            <td className="border border-border p-3 text-right">$0 (tu tiempo)</td>
          </tr>
          <tr>
            <td className="border border-border p-3">Producción piloto (100 unidades)</td>
            <td className="border border-border p-3 text-right">$1,500,000</td>
          </tr>
          <tr>
            <td className="border border-border p-3">Packaging + branding</td>
            <td className="border border-border p-3 text-right">$200,000</td>
          </tr>
          <tr className="bg-primary/10">
            <td className="border border-border p-3"><strong>INVERSIÓN TOTAL</strong></td>
            <td className="border border-border p-3 text-right"><strong>$1,750,000</strong></td>
          </tr>
          <tr>
            <td className="border border-border p-3">Precio venta por unidad</td>
            <td className="border border-border p-3 text-right">$50,000</td>
          </tr>
          <tr>
            <td className="border border-border p-3">Costo de fabricación</td>
            <td className="border border-border p-3 text-right">$15,000</td>
          </tr>
          <tr>
            <td className="border border-border p-3">Ganancia neta por unidad</td>
            <td className="border border-border p-3 text-right">$35,000</td>
          </tr>
          <tr className="bg-primary/10">
            <td className="border border-border p-3"><strong>Ventas necesarias para ROI</strong></td>
            <td className="border border-border p-3 text-right"><strong>50 unidades</strong></td>
          </tr>
        </tbody>
      </table>

      <p className="mt-6">
        ¡Con solo 50 ventas recuperas la inversión! ¡El resto es ganancia!
      </p>
    </>
  )
}

export function RegalosPersonalizadosContent() {
  return (
    <>
      <p>
        Los regalos personalizados impresos en 3D son únicos, memorables y relativamente económicos de
        producir. En Barranquilla, hay creciente demanda por regalos customizados para bodas, graduaciones,
        eventos corporativos. En esta guía te mostramos las mejores ideas y cómo producirlas con impresión 3D.
      </p>

      <div className="my-8 relative aspect-video w-full">
        <Image
          src="https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=1200&h=675&fit=crop"
          alt="Regalos personalizados 3D"
          fill
          className="object-cover rounded-lg"
          unoptimized
        />
      </div>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">
        Mejores Ideas de <span className="text-primary">Regalos</span>
      </h2>
      
      <ul className="list-disc list-inside space-y-4 mt-6">
        <li><strong className="text-white">Llaveros personalizados:</strong> Nombre, logo, símbolo especial. $15,000-25,000 COP.
        Margen: 300-400%. Perfectos para eventos corporativos (dale un regalo a cada asistente).</li>
        
        <li><strong className="text-white">Figuras/bustos personalizados:</strong> Caricatura de la persona, foto3D. $50,000-100,000 COP.
        Para aniversarios, retiros, regalos VIP.</li>
        
        <li><strong className="text-white">Porta-nombres decorativos:</strong> Para escritorio, puerta o vitrina. $25,000-40,000 COP.
        Corporativo y profesional.</li>
        
        <li><strong className="text-white">Plantadores personalizados:</strong> Macetas con forma de cara, animal, logo. $30,000-60,000 COP.
        Ecológico y decorativo.</li>
        
        <li><strong className="text-white">Juguetes customizados:</strong> Muñecos de la mascota, figuras de acción personalizadas. $40,000-80,000 COP.
        Para niños y coleccionistas.</li>
        
        <li><strong className="text-white">Accesorios de escritorio:</strong> Soportes de teléfono, organizadores, portaplumas personalizados. $20,000-50,000 COP.
        Regalos corporativos premium.</li>
      </ul>

      <div className="my-8 relative aspect-video w-full">
        <Image
          src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=1200&h=675&fit=crop"
          alt="Proceso de personalización"
          fill
          className="object-cover rounded-lg"
          unoptimized
        />
      </div>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">
        Cómo Personalizar un <span className="text-primary">Regalo</span>
      </h2>
      
      <ol className="list-decimal list-inside space-y-3 mt-6">
        <li>Describe qué quieres: nombre, foto, logo, mensaje.</li>
        <li>Nosotros diseñamos en CAD (incluido en servicio).</li>
        <li>Te mostramos preview antes de imprimir (sin costo).</li>
        <li>Imprimes en color o pintura especial.</li>
        <li>Empaque elegante tipo regalo listo para dar.</li>
      </ol>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">
        Casos de Uso Populares en <span className="text-primary">Barranquilla</span>
      </h2>
      
      <ul className="list-disc list-inside space-y-2 mt-4">
        <li>Bodas: souvenirs personalizados para invitados (100-200 unidades)</li>
        <li>Graduaciones: regalos para amigos, familia. Generalmente 5-20 unidades.</li>
        <li>Eventos corporativos: regalos con logo para empleados o clientes.</li>
        <li>Cumpleaños: regalos temáticos customizados. Muy popular para niños.</li>
        <li>Despedidas: bustos personalizados o regalos nostálgicos para personas que se van.</li>
      </ul>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">
        Presupuesto para <span className="text-primary">Eventos</span>
      </h2>
      
      <p className="mt-4">
        Si necesitas 100 llaveros personalizados para una boda: $15,000 cada uno = $1,500,000 total.
        Si quieres pintura especial o acabado premium: +$3,000-5,000 por pieza.
      </p>

      <p className="mt-4">
        Comparado con regalos tradicionales, esto es muy económico. Un regalo corporativo normal cuesta
        $20,000-50,000. El nuestro es único, memorable, personalizado, y en el mismo rango de precio.
      </p>
    </>
  )
}

export function ImpresionIngenieriaContent() {
  return (
    <>
      <p>
        Los ingenieros en Barranquilla usan impresión 3D para prototipado funcional, piezas de repuesto
        personalizadas, herramientas especiales y verificación de conceptos. En esta guía explicamos cómo
        maximizar la impresión 3D para aplicaciones de ingeniería industrial, mecánica y electrónica.
      </p>

      <div className="my-8 relative aspect-video w-full">
        <Image
          src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=1200&h=675&fit=crop"
          alt="Pieza de ingeniería impresa"
          fill
          className="object-cover rounded-lg"
          unoptimized
        />
      </div>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">
        Aplicaciones Reales en <span className="text-primary">Ingeniería</span>
      </h2>
      
      <ul className="list-disc list-inside space-y-4 mt-6">
        <li><strong className="text-white">Prototipos funcionales:</strong> Prueba tu mecanismo antes de soldar acero o aluminio.
        Detecta problemas de movimiento, encaje, tolerancias. Costo: fracción de herramientas metálicas.</li>
        
        <li><strong className="text-white">Piezas de repuesto personalizadas:</strong> Máquina vieja que ya no fabrica piezas?
        Imprime el reemplazo. Exactitud ±0.5mm, material resistente (PETG, Nylon).</li>
        
        <li><strong className="text-white">Herramientas especiales:</strong> Jigs, fixtures, plantillas para manufactura. Personalizado
        para tu proceso específico, sin costo de molde.</li>
        
        <li><strong className="text-white">Carcasas y brackets:</strong> Para circuitos, sensores, cámaras. Exacto y personalizado.
        PETG o Nylon para durabilidad.</li>
        
        <li><strong className="text-white">Componentes de ensamblaje:</strong> Partes que se casan con piezas existentes. Ajustes
        precisos sin crear nuevos moldes.</li>
      </ul>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">
        Materiales Recomendados por <span className="text-primary">Aplicación</span>
      </h2>
      
      <table className="w-full mt-4 border-collapse border border-border">
        <thead>
          <tr className="bg-primary/20">
            <th className="border border-border p-3 text-left">Aplicación</th>
            <th className="border border-border p-3 text-left">Material Ideal</th>
            <th className="border border-border p-3 text-left">Razón</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-border p-3">Prototipo de bajo estrés</td>
            <td className="border border-border p-3">PLA</td>
            <td className="border border-border p-3">Económico, rápido, detalle</td>
          </tr>
          <tr>
            <td className="border border-border p-3">Pieza funcional</td>
            <td className="border border-border p-3">PETG o Nylon</td>
            <td className="border border-border p-3">Resistencia, durabilidad</td>
          </tr>
          <tr>
            <td className="border border-border p-3">Carcasa exposición al calor</td>
            <td className="border border-border p-3">PETG o ABS</td>
            <td className="border border-border p-3">Resiste >80°C</td>
          </tr>
          <tr>
            <td className="border border-border p-3">Jig/Fixture de producción</td>
            <td className="border border-border p-3">Nylon reforzado</td>
            <td className="border border-border p-3">Dureza, repetibilidad</td>
          </tr>
          <tr>
            <td className="border border-border p-3">Componente flexible</td>
            <td className="border border-border p-3">TPU</td>
            <td className="border border-border p-3">Elasticidad controlada</td>
          </tr>
        </tbody>
      </table>

      <div className="my-8 relative aspect-video w-full">
        <Image
          src="https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=1200&h=675&fit=crop"
          alt="Diseño técnico 3D"
          fill
          className="object-cover rounded-lg"
          unoptimized
        />
      </div>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">
        Proceso de Diseño para <span className="text-primary">Ingeniería</span>
      </h2>
      
      <ol className="list-decimal list-inside space-y-3 mt-6">
        <li>Diseña en CAD con tolerancias específicas (generalmente ±0.5-1mm).</li>
        <li>Simula si es crítico (FEA, cinemática). Valida factibilidad.</li>
        <li>Exporta STL. Verifica que malla sea limpia (sin errores manifold).</li>
        <li>Cotiza con nosotros especificando material y tolerancias.</li>
        <li>Imprimimos. Entrega 24-48 horas según tamaño.</li>
        <li>Verifica tolerancias con calibrador. Ajusta CAD si necesario.</li>
        <li>Segunda impresión si hay cambios (generalmente no hay).</li>
      </ol>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">
        Tolerancias y <span className="text-primary">Precisión</span>
      </h2>
      
      <p className="mt-4">
        Impresión 3D FDM típicamente logra ±0.5mm en piezas medianas. Tolerancias más apretadas
        (±0.2mm) son posibles pero requieren ajustes de máquina. Paredes gruesas (>2mm) mantienen
        tolerancias mejor que paredes delgadas.
      </p>

      <p className="mt-4">
        Para comparar: moldeo de plástico logra ±0.2-0.5mm pero requiere molde ($50K+).
        CNC mecanizado es ±0.1mm pero es caro para prototipos ($500-2000 la pieza).
        Impresión 3D es punto medio: ±0.5mm, $15-50 la pieza, sin molde.
      </p>
    </>
  )
}

export function ServicioDomicilioContent() {
  return (
    <>
      <p>
        Además de nuestro servicio principal de impresión 3D, en Tecnoprints ofrecemos servicio a domicilio
        en Barranquilla para facilidad de nuestros clientes corporativos. En esta guía te explicamos cómo
        funciona, quién es elegible, y cómo coordinar el servicio.
      </p>

      <div className="my-8 relative aspect-video w-full">
        <Image
          src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=1200&h=675&fit=crop"
          alt="Servicio de domicilio"
          fill
          className="object-cover rounded-lg"
          unoptimized
        />
      </div>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">
        Cómo Funciona el <span className="text-primary">Servicio a Domicilio</span>
      </h2>
      
      <ol className="list-decimal list-inside space-y-3 mt-6">
        <li>Envías archivo por WhatsApp al +57 323 926 7656</li>
        <li>Te cotizamos (incluye costo de impresión + domicilio)</li>
        <li>Confirmas y realizas pago</li>
        <li>Imprimimos en nuestro taller</li>
        <li>Entregamos a tu domicilio en Barranquilla en 24-48 horas</li>
        <li>Entrega con firma de confirmación</li>
      </ol>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">
        Costo del <span className="text-primary">Domicilio</span>
      </h2>
      
      <ul className="list-disc list-inside space-y-2 mt-4">
        <li>Hasta Barranquilla centro: $5,000-10,000 COP</li>
        <li>Barranquilla norte/sur: $10,000-15,000 COP</li>
        <li>Zona metropolitana: $15,000-25,000 COP</li>
        <li>Retiro en taller: GRATIS</li>
      </ul>

      <p className="mt-4">
        Para empresas con múltiples pedidos mensuales, ofrecemos descuento en domicilio.
        Contacta directamente por WhatsApp para negociar.
      </p>
    </>
  )
}
