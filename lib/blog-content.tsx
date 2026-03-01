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
        es en 24-48 horas.</li>
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
