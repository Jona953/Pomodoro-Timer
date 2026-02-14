# 🌸 Pomodoro Focus - Aplicación de Productividad

Una hermosa aplicación de temporizador Pomodoro con diseño estético y calmado para mejorar tu concentración y gestión del tiempo.

## ✨ Características

- **Temporizador Pomodoro Completo**
  - 25 minutos de enfoque
  - 5 minutos de descanso corto
  - 15 minutos de descanso largo
  - Cambio automático entre modos

- **Diseño Estético y Calmado**
  - Paleta de colores suaves (lavanda, verde menta, tonos pastel)
  - Animaciones fluidas y micro-interacciones
  - Efectos glassmorphism
  - Partículas de fondo animadas
  - Diseño responsivo para todos los dispositivos

- **Gestión de Tareas**
  - Añadir tareas del día
  - Marcar tareas como completadas
  - Eliminar tareas
  - Persistencia de datos en localStorage

- **Seguimiento de Progreso**
  - Contador de sesiones completadas
  - Indicadores visuales de progreso
  - Círculo de progreso animado
  - Efectos de celebración al completar sesiones

- **Notificaciones**
  - Alertas visuales al completar sesiones
  - Mensajes motivacionales aleatorios
  - Efectos de partículas de celebración

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

Si tienes Node.js instalado:

```bash
# Instalar servidor simple
npm install -g http-server

# Ejecutar servidor
http-server

# Luego abre http://localhost:8080 en tu navegador
```

## 📖 Instrucciones de Uso

1. **Selecciona un Modo**: Elige entre Enfoque, Descanso o Descanso Largo
2. **Inicia el Temporizador**: Haz clic en "Iniciar" para comenzar
3. **Trabaja con Concentración**: Enfócate en tu tarea durante el tiempo establecido
4. **Toma Descansos**: El temporizador cambiará automáticamente al modo de descanso
5. **Gestiona tus Tareas**: Añade las tareas en las que trabajarás hoy

## 🎨 Tecnologías Utilizadas

- **HTML5**: Estructura semántica
- **CSS3**: Diseño moderno con variables CSS, animaciones y gradientes
- **JavaScript Vanilla**: Lógica del temporizador y gestión de estado
- **LocalStorage**: Persistencia de datos

## 💾 Persistencia de Datos

La aplicación guarda automáticamente:
- Tareas creadas
- Número de sesiones completadas
- Estado actual (se guarda cada 30 segundos)

Los datos persisten incluso si cierras el navegador.

## 🎯 Técnica Pomodoro

La Técnica Pomodoro es un método de gestión del tiempo que utiliza intervalos de trabajo de 25 minutos separados por breves descansos:

1. Trabaja durante 25 minutos (1 Pomodoro)
2. Toma un descanso de 5 minutos
3. Después de 4 Pomodoros, toma un descanso largo de 15 minutos

## 🌟 Características de Diseño

- **Paleta de Colores Calmada**: Tonos suaves que no cansan la vista
- **Animaciones Suaves**: Transiciones fluidas en todos los elementos
- **Efectos Glassmorphism**: Profundidad visual moderna
- **Tipografía Moderna**: Google Fonts (Poppins)
- **Responsive Design**: Funciona perfectamente en móvil, tablet y escritorio

## 📱 Compatibilidad

- ✅ Chrome/Edge (Chromium)
- ✅ Firefox
- ✅ Safari
- ✅ Opera
- ✅ Dispositivos móviles (iOS/Android)

## 🔧 Personalización

Puedes personalizar fácilmente los tiempos del temporizador editando las constantes en `main.js`:

```javascript
const TIMER_MODES = {
    pomodoro: { duration: 25 * 60, label: 'Enfoque', color: '#a78bfa' },
    'short-break': { duration: 5 * 60, label: 'Descanso Corto', color: '#6ee7b7' },
    'long-break': { duration: 15 * 60, label: 'Descanso Largo', color: '#fbbf24' }
};
```

## 📄 Estructura de Archivos

```
azure-opportunity/
├── index.html      # Estructura HTML
├── style.css       # Estilos y animaciones
├── main.js         # Lógica de la aplicación
└── README.md       # Este archivo
```

## 🎉 ¡Disfruta de tu Productividad!

Esperamos que esta aplicación te ayude a mejorar tu concentración y productividad. ¡Feliz Pomodoro! 🍅
