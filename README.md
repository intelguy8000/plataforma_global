# Dashboard Analytics - Estudiar en el Exterior

Dashboard analytics completo para gestión de estudiantes, conversiones y métricas de negocio para una empresa EdTech que ayuda a estudiantes colombianos a estudiar en el extranjero.

## Características Implementadas

### Core Features
- **Dashboard Overview**: Página principal con KPIs, gráficos de tendencia de revenue, pipeline funnel, top asesores y actividad reciente
- **Sales Dashboard**: Pipeline kanban con estudiantes organizados por etapas, métricas de conversión y tareas urgentes
- **Chat Widget**: Asistente de IA inteligente en esquina inferior derecha con respuestas contextuales
- **Sidebar Navigation**: Navegación lateral con rutas a diferentes secciones del dashboard
- **Dark/Light Mode**: Toggle de tema con modo oscuro por defecto

### Datos
- **500 leads generados** con diferentes estados (new, contacted, qualified, converted)
- **132 estudiantes** en pipeline distribuidos en 5 etapas
- **8 asesores** con métricas de performance
- **90 días** de datos históricos de métricas
- **6 canales de marketing** (referral, podcast, search, event, linkedin, instagram)

### Stack Técnico
- **Framework**: Next.js 14 con App Router
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS + Shadcn/ui
- **Gráficos**: Recharts
- **Iconos**: Lucide React
- **Utilidades**: date-fns, class-variance-authority, clsx, tailwind-merge

## Estructura del Proyecto

```
plataforma-global/
├── app/
│   ├── dashboard/
│   │   ├── overview/          # Dashboard principal
│   │   │   └── page.tsx
│   │   ├── sales/             # Pipeline de ventas
│   │   │   └── page.tsx
│   │   ├── marketing/         # (placeholder para futura implementación)
│   │   ├── students/          # (placeholder)
│   │   ├── analytics/         # (placeholder)
│   │   └── layout.tsx         # Layout del dashboard
│   ├── api/                   # (estructura para futuras APIs)
│   ├── layout.tsx             # Root layout
│   ├── page.tsx               # Redirect a dashboard
│   └── globals.css            # Estilos globales
├── components/
│   ├── dashboard/
│   │   ├── sidebar.tsx        # Navegación lateral
│   │   ├── chat-widget.tsx    # Widget de chat IA
│   │   └── kpi-card.tsx       # Tarjetas de KPIs
│   └── ui/                    # Componentes de Shadcn/ui
├── lib/
│   ├── data/
│   │   └── mock-data.ts       # 500 leads y datos dummy
│   └── utils.ts               # Utilidades (cn helper)
└── types/
    └── index.ts               # TypeScript types
```

## Instalación y Uso

### Requisitos Previos
- Node.js 18+
- npm o yarn

### Instalación

1. Navegar al directorio del proyecto:
```bash
cd plataforma-global
```

2. Las dependencias ya están instaladas. Si necesitas reinstalarlas:
```bash
npm install
```

3. Iniciar el servidor de desarrollo:
```bash
npm run dev
```

4. Abrir en el navegador:
```
http://localhost:3000
```

La aplicación automáticamente redirige a `/dashboard/overview`

### Scripts Disponibles

```bash
npm run dev      # Servidor de desarrollo
npm run build    # Build para producción
npm run start    # Servidor de producción
npm run lint     # Ejecutar ESLint
```

## Páginas Implementadas

### 1. Dashboard Overview (`/dashboard/overview`)

**Componentes:**
- 4 tarjetas KPI:
  - Revenue MTD (Month-To-Date)
  - Nuevos Leads
  - Tasa de Conversión
  - Estudiantes Activos
- Gráfico de línea: Tendencia de revenue últimos 30 días
- Gráfico de barras: Pipeline de estudiantes por etapa
- Tabla: Top 5 asesores por performance
- Feed: Actividad reciente (conversiones, pagos, cambios de etapa)

**Métricas Clave:**
- Revenue actual y cambio porcentual vs mes anterior
- Leads nuevos del mes
- Tasa de conversión promedio
- Distribución de estudiantes por etapa del pipeline

### 2. Sales Dashboard (`/dashboard/sales`)

**Componentes:**
- 4 métricas de resumen:
  - Total Pipeline (valor y cantidad)
  - Proyección de cierre del mes
  - Tasa de conversión
  - Tareas urgentes
- Métricas de conversión por etapa con tasas y tiempo promedio
- Pipeline Kanban: 5 columnas organizadas por etapa
  - Documentación
  - Aplicación
  - Visa
  - Pago
  - Activo
- Tarjetas de tareas urgentes con alertas

**Etapas del Pipeline:**
1. **Documentación**: Recopilación de documentos
2. **Aplicación**: Aplicación a universidades
3. **Visa**: Proceso de visa
4. **Pago**: Procesamiento de pagos
5. **Activo**: Estudiante ya en programa

### 3. Chat Widget

**Funcionalidades:**
- Botón flotante en esquina inferior derecha
- Ventana de chat expandible
- Respuestas inteligentes sobre métricas:
  - Revenue y canales
  - Leads y conversiones
  - Asesores y performance
  - Pipeline de estudiantes
- Botón para limpiar historial
- Timestamps en mensajes

**Preguntas Soportadas:**
- "¿Cuál es el revenue?"
- "¿Cuántos leads tenemos?"
- "¿Cuál es la tasa de conversión?"
- "¿Quiénes son los mejores asesores?"
- "¿Cuántos estudiantes hay?"

## Características de Diseño

### Tema y Colores
- **Color primario**: Verde (#10B981)
- **Modo oscuro**: Habilitado por defecto
- **Paleta**: Grises neutros con acentos verdes
- **Diseño**: Limpio tipo SaaS B2B

### Responsive Design
- Mobile-first approach
- Breakpoints adaptables
- Grid responsive para KPIs y gráficos
- Sidebar colapsable (preparado para implementación)

### Animaciones
- Hover effects en tarjetas y botones
- Transiciones suaves entre estados
- Loading states con skeletons (preparados)
- Scale animations en botones

## Datos Mock Generados

### Leads (500 total)
- **Estados**: new, contacted, qualified, converted
- **Canales**: referral, podcast, search, event, linkedin, instagram
- **Programas**: inglés, pregrado, maestría, PhD
- **Países destino**: USA, Canada, UK, Australia, Ireland, New Zealand
- **Ciudades origen**: Bogotá, Medellín, Cali, Barranquilla, Cartagena, etc.

### Estudiantes (132 convertidos)
- **Etapas**: documentation, application, visa, payment, active
- **Revenue**: $8,000 - $25,000 USD por estudiante
- **Universidades**: Harvard, MIT, Stanford, Toronto, Oxford, etc.

### Asesores (8 activos)
- **Métricas por asesor**:
  - Cantidad de leads
  - Conversiones
  - Tasa de conversión
  - Revenue generado
  - Estudiantes activos

### Datos Históricos
- **90 días** de métricas diarias
- **Revenue**: $15,000 - $45,000 diarios
- **Leads**: 3-12 por día
- **Conversiones**: 0-3 por día

## Próximas Implementaciones Sugeridas

### Páginas Pendientes
1. **Marketing Dashboard** (`/dashboard/marketing`)
   - Leads por canal con gráficos
   - ROI por canal
   - Mapa de calor de leads por ciudad
   - Tendencia CAC vs LTV

2. **Students Dashboard** (`/dashboard/students`)
   - Lista completa de estudiantes
   - Filtros avanzados
   - Vista detallada de estudiante
   - Historial de actividad

3. **Analytics Dashboard** (`/dashboard/analytics`)
   - Análisis profundo de métricas
   - Comparativas temporales
   - Proyecciones
   - Reportes customizables

### Features Adicionales
- [ ] Filtros globales (fecha, país, asesor, programa)
- [ ] Exportación a PDF/Excel
- [ ] Notificaciones en tiempo real
- [ ] Sistema de autenticación
- [ ] Integración con Supabase
- [ ] APIs funcionales
- [ ] Drag & drop en kanban
- [ ] Búsqueda avanzada
- [ ] Gráficos adicionales

## Comandos Útiles

### Agregar nuevos componentes de Shadcn/ui
```bash
npx shadcn@latest add [component-name]
```

### Ver estructura de archivos
```bash
tree -L 3 -I 'node_modules|.next'
```

### Build para producción
```bash
npm run build
npm start
```

## Consideraciones Técnicas

### Performance
- Componentes client-side solo cuando necesario ('use client')
- Lazy loading preparado para imágenes
- Optimización de re-renders con React.memo (pendiente)

### TypeScript
- Types estrictos para todos los datos
- Interfaces bien definidas en `/types`
- Type safety en componentes

### State Management
- useState para estado local
- Sin localStorage (incompatible con artifacts)
- Preparado para Context API o Zustand

## Soporte

Este es un proyecto demo con datos mockeados. Para implementación en producción:
1. Conectar con Supabase u otro backend
2. Implementar autenticación
3. Agregar validaciones
4. Implementar APIs reales
5. Testing (unit + e2e)
6. CI/CD pipeline

## Autor

Dashboard creado para **Estudiar en el Exterior** - Empresa EdTech especializada en ayudar a estudiantes colombianos a estudiar en el extranjero.

---

**Versión**: 1.0.0
**Última actualización**: Octubre 2025
**Stack**: Next.js 14 + TypeScript + Tailwind + Shadcn/ui
