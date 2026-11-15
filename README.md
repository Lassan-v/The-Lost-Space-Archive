# El Archivo Espacial Perdido · The Lost Space Archive

Experiencia web educativa en 2D para niñas y niños de 8 a 10 años, creada para el
**NASA Space Apps Challenge 2026**, reto *Abandoned but Not Forgotten*.

Desde la **Estación de la Memoria**, Spark (la guardiana ficticia del archivo) acompaña a
quien juega en dos expediciones —**Marte** y la **Luna**— para conocer a Spirit, Opportunity,
Sojourner, Ingenuity, Surveyor 3 y el vehículo lunar del Apollo 17. Cada expediente cuenta su
historia con datos verificados de NASA/JPL/NSSDCA, termina en un pequeño reto de aprendizaje y
recompensa con un fragmento de memoria para completar la constelación.

> Proyecto original del equipo. No es un producto oficial de NASA ni implica su respaldo.

## Cómo abrirlo

### Sin instalar nada
Abre **`dist/index.html`** con doble clic. Todo funciona sin servidor: la navegación usa
rutas con `#`, el código va incrustado en el HTML y las imágenes son archivos relativos.
(Las tipografías se cargan de Google Fonts si hay internet; sin conexión se usan las del sistema.)


## Datos científicos y fuentes
Los datos de las misiones vienen de fuentes primarias de NASA, JPL y NSSDCA. Cada tarjeta
muestra su fuente; el catálogo completo está en [`docs/NASA_SOURCES.md`](docs/NASA_SOURCES.md)
y la revisión en [`docs/FACT_CHECK_REPORT.md`](docs/FACT_CHECK_REPORT.md). Las personalidades y
los diálogos en primera persona de los personajes son ficción; los datos que mencionan provienen
de esas tarjetas.

## Accesibilidad
Navegación con teclado y foco visible, textos alternativos, modo de alto contraste,
respeto de *movimiento reducido*, estados que no dependen solo del color y textos en dos idiomas.
No se recogen datos personales: el progreso se guarda solo en el navegador (`localStorage`).

## Uso de IA
El uso de herramientas de IA en código, documentación e ilustraciones está declarado en
[`docs/AI_DISCLOSURE.md`](docs/AI_DISCLOSURE.md), como exige el reto.

## Equipo
Grupo Épico · NASA Space Apps Challenge 2026
