# 🌸 Pomodoro Focus - Aplicación de Productividad

Una hermosa aplicación de temporizador Pomodoro con diseño estético y calmado para mejorar tu concentración y gestión del tiempo.

## ✨ Características Nuevas y Mejoradas

- **Temporizador Totalmente Personalizable** ⚙️
  - ¡Tú tienes el control! Olvídate de los tiempos fijos.
  - Configura la duración exacta para Enfoque, Descanso Corto y Descanso Largo.
  - Los cambios se guardan automáticamente para tus próximas sesiones.

- **Panel de Estadísticas** 📊
  - Visualiza tu productividad con métricas detalladas.
  - Tiempo total trabajado, racha de días consecutivos y sesiones diarias.
  - Mantén la motivación viendo tu progreso.

- **Temas Claro y Oscuro** 🌓
  - Cambia entre modo día y noche con un solo clic.
  - Diseño adaptativo que cuida tu vista en cualquier entorno.

- **Notificaciones de Sonido** 🔔
  - Alertas auditivas suaves al terminar cada sesión.
  - Opción para activar o desactivar el sonido según prefieras.

## ✨ Características Principales

- **Diseño Estético y Calmado**
  - Paleta de colores suaves (lavanda, verde menta, tonos pastel)
  - Animaciones fluidas y micro-interacciones
  - Efectos glassmorphism
  - Partículas de fondo animadas

- **Gestión de Tareas**
  - Añadir tareas del día
  - Marcar tareas como completadas
  - Eliminar tareas
  - Persistencia de datos en localStorage

- **Seguimiento de Progreso**
  - Círculo de progreso animado
  - Efectos de celebración al completar sesiones

## 🚀 Cómo Usar

### Opción 1: Abrir Directamente

Simplemente abre el archivo `index.html` en tu navegador web favorito.

### Opción 2: Servidor Local (Recomendado)

Si tienes Python instalado:

```bash
# Python 3
python -m http.server 8000
# Luego abre http://localhost:8000 en tu navegador
```

## 📖 Instrucciones de Uso

1. **Personaliza tu Tiempo (Opcional)**: Haz clic en el ⚙️ para configurar la duración de tus sesiones.
2. **Selecciona un Modo**: Elige entre Enfoque, Descanso o Descanso Largo.
3. **Inicia el Temporizador**: Haz clic en "Iniciar" para comenzar.
4. **Trabaja con Concentración**: Enfócate en tu tarea.
5. **Gestiona tus Tareas**: Añade las tareas en las que trabajarás hoy.

## 🎨 Tecnologías Utilizadas

- **HTML5**: Estructura semántica
- **CSS3**: Diseño moderno con variables CSS, animaciones y gradientes
- **JavaScript Vanilla**: Lógica completa sin frameworks externos
- **LocalStorage**: Persistencia de datos

## 💾 Persistencia de Datos

La aplicación guarda automáticamente:
- **Tiempos personalizados del temporizador**
- **Preferencia de tema (claro/oscuro) y sonido**
- **Estadísticas de productividad**
- Tareas creadas y estado actual

Los datos persisten incluso si cierras el navegador.

## 🎯 Técnica Pomodoro Adaptable

Aunque la técnica tradicional sugiere 25 minutos, esta aplicación te permite adaptar los intervalos a tu propio ritmo de trabajo. ¡Encuentra lo que funciona mejor para ti!

## 📄 Estructura de Archivos

```
azure-opportunity/
├── index.html      # Estructura HTML
├── style.css       # Estilos y animaciones
├── main.js         # Lógica de la aplicación
└── README.md       # Este archivo
```

## 📜 Historial de Cambios (Changelog)

### Versión Actual
- ✅ **Nuevo**: Configuración de tiempos personalizada por el usuario.
- ✅ **Nuevo**: Panel de estadísticas y rachas.
- ✅ **Nuevo**: Toggle de tema claro/oscuro.
- ✅ **Nuevo**: Notificaciones de sonido opcionales. 