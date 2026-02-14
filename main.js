// ===== CONFIGURACIÓN Y ESTADO =====
const TIMER_MODES = {
    pomodoro: { duration: 25 * 60, label: 'Enfoque', color: '#a78bfa' },
    'short-break': { duration: 5 * 60, label: 'Descanso Corto', color: '#6ee7b7' },
    'long-break': { duration: 15 * 60, label: 'Descanso Largo', color: '#fbbf24' }
};

let currentMode = 'pomodoro';
let timeRemaining = TIMER_MODES[currentMode].duration;
let isRunning = false;
let timerInterval = null;
let sessionCount = 0;
let tasks = [];

// Nuevas variables para características adicionales
let soundEnabled = true;
let totalTimeWorked = 0; // en minutos
let currentStreak = 0;
let bestStreak = 0;
let todaySessions = 0;
let lastSessionDate = null;

// ===== ELEMENTOS DEL DOM =====
const timerDisplay = document.getElementById('timerDisplay');
const startPauseBtn = document.getElementById('startPauseBtn');
const resetBtn = document.getElementById('resetBtn');
const playPauseIcon = document.getElementById('playPauseIcon');
const startPauseText = document.getElementById('startPauseText');
const sessionCountDisplay = document.getElementById('sessionCount');
const sessionDotsContainer = document.getElementById('sessionDots');
const notification = document.getElementById('notification');
const notificationText = document.getElementById('notificationText');
const progressCircle = document.getElementById('progressCircle');
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

// Botones de modo
const pomodoroBtn = document.getElementById('pomodoroBtn');
const shortBreakBtn = document.getElementById('shortBreakBtn');
const longBreakBtn = document.getElementById('longBreakBtn');

// Nuevos elementos del DOM
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const settingsBtn = document.getElementById('settingsBtn');
const settingsModal = document.getElementById('settingsModal');
const closeSettings = document.getElementById('closeSettings');
const soundToggle = document.getElementById('soundToggle');
const pomodoroTimeInput = document.getElementById('pomodoroTime');
const shortBreakTimeInput = document.getElementById('shortBreakTime');
const longBreakTimeInput = document.getElementById('longBreakTime');
const saveSettingsBtn = document.getElementById('saveSettings');
const notificationSound = document.getElementById('notificationSound');

// Elementos de estadísticas
const totalTimeWorkedDisplay = document.getElementById('totalTimeWorked');
const currentStreakDisplay = document.getElementById('currentStreak');
const todaySessionsDisplay = document.getElementById('todaySessions');
const bestStreakDisplay = document.getElementById('bestStreak');

// ===== CONFIGURACIÓN DEL CÍRCULO DE PROGRESO =====
const radius = 140;
const circumference = 2 * Math.PI * radius;
progressCircle.style.strokeDasharray = `${circumference} ${circumference}`;
progressCircle.style.strokeDashoffset = 0;

// Añadir gradiente SVG dinámicamente
const svg = document.querySelector('.progress-ring');
const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
const gradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
gradient.setAttribute('id', 'gradient');
gradient.setAttribute('x1', '0%');
gradient.setAttribute('y1', '0%');
gradient.setAttribute('x2', '100%');
gradient.setAttribute('y2', '100%');

const stop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
stop1.setAttribute('offset', '0%');
stop1.setAttribute('stop-color', '#a78bfa');

const stop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
stop2.setAttribute('offset', '100%');
stop2.setAttribute('stop-color', '#6ee7b7');

gradient.appendChild(stop1);
gradient.appendChild(stop2);
defs.appendChild(gradient);
svg.insertBefore(defs, svg.firstChild);

// ===== FUNCIONES DEL TEMPORIZADOR =====
function updateTimerDisplay() {
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
    timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    // Actualizar círculo de progreso
    const totalDuration = TIMER_MODES[currentMode].duration;
    const progress = timeRemaining / totalDuration;
    const offset = circumference * (1 - progress);
    progressCircle.style.strokeDashoffset = offset;
}

function startTimer() {
    if (isRunning) return;

    isRunning = true;
    playPauseIcon.textContent = '⏸';
    startPauseText.textContent = 'Pausar';
    timerDisplay.classList.add('pulse');

    timerInterval = setInterval(() => {
        timeRemaining--;
        updateTimerDisplay();

        if (timeRemaining <= 0) {
            completeSession();
        }
    }, 1000);
}

function pauseTimer() {
    isRunning = false;
    clearInterval(timerInterval);
    playPauseIcon.textContent = '▶';
    startPauseText.textContent = 'Continuar';
    timerDisplay.classList.remove('pulse');
}

function resetTimer() {
    pauseTimer();
    timeRemaining = TIMER_MODES[currentMode].duration;
    updateTimerDisplay();
    playPauseIcon.textContent = '▶';
    startPauseText.textContent = 'Iniciar';
}

function completeSession() {
    pauseTimer();

    // Incrementar contador solo en modo pomodoro
    if (currentMode === 'pomodoro') {
        sessionCount++;
        todaySessions++;
        totalTimeWorked += 25; // 25 minutos por sesión
        updateSessionDisplay();
        updateStatistics();
        createCelebrationEffect();
    }

    // Mostrar notificación
    showNotification(getCompletionMessage());

    // Reproducir sonido si está habilitado
    if (soundEnabled) {
        playNotificationSound();
    }

    // Auto-cambiar al siguiente modo
    autoSwitchMode();
}

function autoSwitchMode() {
    if (currentMode === 'pomodoro') {
        // Después de 4 pomodoros, descanso largo
        if (sessionCount % 4 === 0) {
            switchMode('long-break');
        } else {
            switchMode('short-break');
        }
    } else {
        switchMode('pomodoro');
    }
}

function switchMode(mode) {
    currentMode = mode;
    timeRemaining = TIMER_MODES[mode].duration;
    updateTimerDisplay();
    updateModeButtons();
    updateGradientColors();
}

function updateModeButtons() {
    document.querySelectorAll('.mode-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    const activeBtn = document.querySelector(`[data-mode="${currentMode}"]`);
    if (activeBtn) {
        activeBtn.classList.add('active');
    }
}

function updateGradientColors() {
    const colors = {
        'pomodoro': ['#a78bfa', '#8b5cf6'],
        'short-break': ['#6ee7b7', '#34d399'],
        'long-break': ['#fbbf24', '#f59e0b']
    };

    const [color1, color2] = colors[currentMode];
    stop1.setAttribute('stop-color', color1);
    stop2.setAttribute('stop-color', color2);
}

function getCompletionMessage() {
    const messages = {
        'pomodoro': ['¡Sesión completada! 🎉', '¡Excelente trabajo! ✨', '¡Bien hecho! 🌟', '¡Sigue así! 💪'],
        'short-break': ['Descanso terminado 🍃', 'Hora de volver al trabajo 💼', 'Recargado y listo ⚡'],
        'long-break': ['Descanso largo completado 🌙', '¡Bien merecido! 🎊', 'Hora de continuar 🚀']
    };

    const modeMessages = messages[currentMode];
    return modeMessages[Math.floor(Math.random() * modeMessages.length)];
}

function showNotification(message) {
    notificationText.textContent = message;
    notification.classList.add('show');

    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

function updateSessionDisplay() {
    sessionCountDisplay.textContent = sessionCount;

    // Añadir punto visual
    const dot = document.createElement('div');
    dot.className = 'session-dot';
    sessionDotsContainer.appendChild(dot);

    // Limitar a 8 puntos visibles
    if (sessionDotsContainer.children.length > 8) {
        sessionDotsContainer.removeChild(sessionDotsContainer.firstChild);
    }
}

function createCelebrationEffect() {
    // Crear partículas de celebración
    const colors = ['#a78bfa', '#6ee7b7', '#fbbf24', '#f87171'];

    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const particle = document.createElement('div');
            particle.style.position = 'fixed';
            particle.style.left = '50%';
            particle.style.top = '50%';
            particle.style.width = '10px';
            particle.style.height = '10px';
            particle.style.borderRadius = '50%';
            particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            particle.style.pointerEvents = 'none';
            particle.style.zIndex = '9999';

            const angle = (Math.PI * 2 * i) / 20;
            const velocity = 100 + Math.random() * 100;
            const vx = Math.cos(angle) * velocity;
            const vy = Math.sin(angle) * velocity;

            document.body.appendChild(particle);

            let x = 0, y = 0, opacity = 1;
            const animation = setInterval(() => {
                x += vx * 0.016;
                y += vy * 0.016 + 50 * 0.016; // Gravedad
                opacity -= 0.02;

                particle.style.transform = `translate(${x}px, ${y}px)`;
                particle.style.opacity = opacity;

                if (opacity <= 0) {
                    clearInterval(animation);
                    document.body.removeChild(particle);
                }
            }, 16);
        }, i * 20);
    }
}

// ===== FUNCIONES DE TAREAS =====
function addTask() {
    const taskText = taskInput.value.trim();
    if (!taskText) return;

    const task = {
        id: Date.now(),
        text: taskText,
        completed: false
    };

    tasks.push(task);
    renderTasks();
    saveTasks();
    taskInput.value = '';
}

function toggleTask(id) {
    const task = tasks.find(t => t.id === id);
    if (task) {
        task.completed = !task.completed;
        renderTasks();
        saveTasks();
    }
}

function deleteTask(id) {
    tasks = tasks.filter(t => t.id !== id);
    renderTasks();
    saveTasks();
}

function renderTasks() {
    taskList.innerHTML = '';

    tasks.forEach(task => {
        const li = document.createElement('li');
        li.className = 'task-item';

        const checkbox = document.createElement('div');
        checkbox.className = `task-checkbox ${task.completed ? 'checked' : ''}`;
        checkbox.onclick = () => toggleTask(task.id);

        const text = document.createElement('span');
        text.className = `task-text ${task.completed ? 'completed' : ''}`;
        text.textContent = task.text;

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'task-delete';
        deleteBtn.textContent = '×';
        deleteBtn.onclick = () => deleteTask(task.id);

        li.appendChild(checkbox);
        li.appendChild(text);
        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    });
}

function saveTasks() {
    localStorage.setItem('pomodoro-tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const saved = localStorage.getItem('pomodoro-tasks');
    if (saved) {
        tasks = JSON.parse(saved);
        renderTasks();
    }
}

function saveSession() {
    localStorage.setItem('pomodoro-session-count', sessionCount.toString());
}

function loadSession() {
    const saved = localStorage.getItem('pomodoro-session-count');
    if (saved) {
        sessionCount = parseInt(saved, 10);
        sessionCountDisplay.textContent = sessionCount;

        // Recrear puntos visuales
        for (let i = 0; i < Math.min(sessionCount, 8); i++) {
            const dot = document.createElement('div');
            dot.className = 'session-dot';
            sessionDotsContainer.appendChild(dot);
        }
    }
}

// ===== CREAR PARTÍCULAS DE FONDO =====
function createBackgroundParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 30;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.animationDelay = `${Math.random() * 15}s`;
        particle.style.animationDuration = `${15 + Math.random() * 10}s`;
        particlesContainer.appendChild(particle);
    }
}

// ===== EVENT LISTENERS =====
startPauseBtn.addEventListener('click', () => {
    if (isRunning) {
        pauseTimer();
    } else {
        startTimer();
    }
});

resetBtn.addEventListener('click', resetTimer);

pomodoroBtn.addEventListener('click', () => {
    if (!isRunning) switchMode('pomodoro');
});

shortBreakBtn.addEventListener('click', () => {
    if (!isRunning) switchMode('short-break');
});

longBreakBtn.addEventListener('click', () => {
    if (!isRunning) switchMode('long-break');
});

addTaskBtn.addEventListener('click', addTask);

taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTask();
    }
});

// Guardar sesión periódicamente
setInterval(saveSession, 30000); // Cada 30 segundos

// ===== NUEVAS FUNCIONES PARA CARACTERÍSTICAS ADICIONALES =====

// ===== TEMA CLARO/OSCURO =====
function toggleTheme() {
    document.body.classList.toggle('light-theme');
    const isLight = document.body.classList.contains('light-theme');
    themeIcon.textContent = isLight ? '☀️' : '🌙';
    localStorage.setItem('pomodoro-theme', isLight ? 'light' : 'dark');
}

function loadTheme() {
    const savedTheme = localStorage.getItem('pomodoro-theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-theme');
        themeIcon.textContent = '☀️';
    }
}

// ===== MODAL DE CONFIGURACIÓN =====
function openSettings() {
    settingsModal.classList.add('show');
    // Cargar valores actuales
    pomodoroTimeInput.value = TIMER_MODES.pomodoro.duration / 60;
    shortBreakTimeInput.value = TIMER_MODES['short-break'].duration / 60;
    longBreakTimeInput.value = TIMER_MODES['long-break'].duration / 60;
    soundToggle.checked = soundEnabled;
}

function closeSettingsModal() {
    settingsModal.classList.remove('show');
}

function saveSettings() {
    // Guardar tiempos personalizados
    TIMER_MODES.pomodoro.duration = parseInt(pomodoroTimeInput.value) * 60;
    TIMER_MODES['short-break'].duration = parseInt(shortBreakTimeInput.value) * 60;
    TIMER_MODES['long-break'].duration = parseInt(longBreakTimeInput.value) * 60;

    // Guardar preferencia de sonido
    soundEnabled = soundToggle.checked;

    // Actualizar temporizador si no está corriendo
    if (!isRunning) {
        timeRemaining = TIMER_MODES[currentMode].duration;
        updateTimerDisplay();
    }

    // Guardar en localStorage
    localStorage.setItem('pomodoro-settings', JSON.stringify({
        pomodoroTime: TIMER_MODES.pomodoro.duration,
        shortBreakTime: TIMER_MODES['short-break'].duration,
        longBreakTime: TIMER_MODES['long-break'].duration,
        soundEnabled: soundEnabled
    }));

    showNotification('⚙️ Configuración guardada');
    closeSettingsModal();
}

function loadSettings() {
    const saved = localStorage.getItem('pomodoro-settings');
    if (saved) {
        const settings = JSON.parse(saved);
        TIMER_MODES.pomodoro.duration = settings.pomodoroTime;
        TIMER_MODES['short-break'].duration = settings.shortBreakTime;
        TIMER_MODES['long-break'].duration = settings.longBreakTime;
        soundEnabled = settings.soundEnabled;
        soundToggle.checked = soundEnabled;
    }
}

// ===== SONIDO DE NOTIFICACIÓN =====
function playNotificationSound() {
    notificationSound.currentTime = 0;
    notificationSound.play().catch(err => {
        console.log('No se pudo reproducir el sonido:', err);
    });
}

// ===== ESTADÍSTICAS =====
function updateStatistics() {
    // Actualizar racha
    const today = new Date().toDateString();
    if (lastSessionDate !== today) {
        if (lastSessionDate) {
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            if (lastSessionDate === yesterday.toDateString()) {
                currentStreak++;
            } else {
                currentStreak = 1;
            }
        } else {
            currentStreak = 1;
        }
        lastSessionDate = today;
        todaySessions = 1;
    }

    // Actualizar mejor racha
    if (currentStreak > bestStreak) {
        bestStreak = currentStreak;
    }

    updateStatisticsDisplay();
    saveStatistics();
}

function updateStatisticsDisplay() {
    const hours = Math.floor(totalTimeWorked / 60);
    const minutes = totalTimeWorked % 60;
    totalTimeWorkedDisplay.textContent = `${hours}h ${minutes}m`;
    currentStreakDisplay.textContent = currentStreak;
    todaySessionsDisplay.textContent = todaySessions;
    bestStreakDisplay.textContent = bestStreak;
}

function saveStatistics() {
    localStorage.setItem('pomodoro-stats', JSON.stringify({
        totalTimeWorked,
        currentStreak,
        bestStreak,
        todaySessions,
        lastSessionDate
    }));
}

function loadStatistics() {
    const saved = localStorage.getItem('pomodoro-stats');
    if (saved) {
        const stats = JSON.parse(saved);
        totalTimeWorked = stats.totalTimeWorked || 0;
        currentStreak = stats.currentStreak || 0;
        bestStreak = stats.bestStreak || 0;
        lastSessionDate = stats.lastSessionDate || null;

        // Verificar si es un nuevo día
        const today = new Date().toDateString();
        if (lastSessionDate !== today) {
            todaySessions = 0;
        } else {
            todaySessions = stats.todaySessions || 0;
        }

        updateStatisticsDisplay();
    }
}

// ===== EVENT LISTENERS PARA NUEVAS CARACTERÍSTICAS =====
themeToggle.addEventListener('click', toggleTheme);

settingsBtn.addEventListener('click', openSettings);

closeSettings.addEventListener('click', closeSettingsModal);

saveSettingsBtn.addEventListener('click', saveSettings);

// Cerrar modal al hacer clic fuera
settingsModal.addEventListener('click', (e) => {
    if (e.target === settingsModal) {
        closeSettingsModal();
    }
});

// ===== INICIALIZACIÓN =====
updateTimerDisplay();
createBackgroundParticles();
loadTasks();
loadSession();
loadTheme();
loadSettings();
loadStatistics();

// Prevenir que la página se cierre accidentalmente si el timer está corriendo
window.addEventListener('beforeunload', (e) => {
    if (isRunning) {
        e.preventDefault();
        e.returnValue = '';
        saveSession();
    }
});
