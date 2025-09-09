

# 🎮 Tetris Web


<p align="center">
	<img src="Imagenes/PikaHi.jpg" alt="PikaHi Icon" width="96" height="96"/>
</p>

¡Bienvenido a <b>Tetris Web</b>! Este es un clon moderno de Tetris hecho en HTML, CSS y JavaScript puro, jugable directamente en tu navegador local.

---

## 🛠️ ¿Cómo está hecho?

Este proyecto utiliza únicamente tecnologías web modernas:

- <img src="https://img.icons8.com/color/24/000000/html-5--v1.png" width="20"/> **HTML5**: Estructura de la página y el canvas para el juego.
- <img src="https://img.icons8.com/color/24/000000/css3.png" width="20"/> **CSS3**: Estilos personalizados y adaptados, además de Bootstrap para un diseño moderno y responsivo.
- <img src="https://img.icons8.com/color/24/000000/javascript--v1.png" width="20"/> **JavaScript (ES6+)**: Toda la lógica del juego, controles, animaciones y fondo.
- <img src="https://img.icons8.com/color/24/000000/bootstrap.png" width="20"/> **Bootstrap 5**: Para la maquetación, botones y componentes visuales.
- <img src="https://img.icons8.com/color/24/000000/sweet.png" width="20"/> **SweetAlert2**: Para los mensajes y diálogos bonitos.

No requiere frameworks ni dependencias externas adicionales, solo un navegador moderno.



---


## ✨ Características

- 🎲 **Jugabilidad clásica de Tetris**: Usa las flechas para mover y rotar las piezas.
- 👀 **Vista previa de la siguiente pieza**: Siempre sabrás cuál será la próxima figura.
- 🟦 **Grilla visible**: El área de juego tiene líneas divisorias para facilitar la visualización.
- 🏆 **Puntaje en tiempo real**: El puntaje se actualiza automáticamente al eliminar líneas.
- ⏸️ **Botón de pausa/reanudar**: Puedes pausar y continuar la partida en cualquier momento.
- 💎 **Diseño moderno y responsivo**: Interfaz limpia y agradable, con Bootstrap y SweetAlert2.
- 🖼️ **Fondo animado tipo DVD screensaver**: Un Pikachu (PikaHi) rebota por el fondo del tablero, ¡al estilo DVD clásico!
- 🗃️ **Versión standalone portable**: El archivo `tetris-standalone.html` incluye la imagen de fondo embebida en Base64, por lo que funciona sin archivos externos. ¡Ideal para compartir o llevar en USB!
- 📁 **Versión modular**: Puedes usar la versión clásica con archivos separados (`index.html`, `tetris.js`, `style.css`, imagen en `Imagenes/`).


---


## 🏅 Instrucciones de records (highscores)

- Usa el botón <b>Exportar</b> para descargar tus records como archivo <code>JSON</code>.
- Usa el botón <b>Importar</b> para cargar records desde un archivo <code>JSON</code> (útil para transferir tus records entre navegadores o computadoras).
- <span style="color:orange;font-weight:bold">Los records NO se guardan automáticamente. ¡Recuerda exportar si quieres conservarlos!</span>




---

## 🎮 Controles

- ⬅️ / ➡️ — Mover pieza a la izquierda/derecha
- ⬇️ — Acelerar caída
- Q / W — Rotar pieza
- <img src="https://img.icons8.com/fluency/24/pause--v1.png" width="20"/> Botón "Pausar" — Pausa y reanuda el juego



---

## 📁 Estructura del proyecto

```
Tetris/
├── index.html              # Página principal (modular, requiere archivos externos)
├── style.css               # Estilos visuales
├── tetris.js               # Lógica del juego
├── Imagenes/
│   └── PikaHi.jpg          # Imagen de Pikachu para el fondo animado (solo modular)
├── tetris-standalone.html  # Versión TODO EN UNO (portable, sin dependencias externas)
└── README.md               # Este archivo
```


---

## ▶️ Cómo jugar

### 🗂️ Opción 1: Versión modular (archivos separados)
1. Abre el archivo `index.html` en tu navegador favorito.
2. Asegúrate de tener la imagen `Imagenes/PikaHi.jpg` en la ruta correcta.
3. ¡Disfruta jugando Tetris!

### 📦 Opción 2: Versión standalone (recomendada para compartir)
1. Abre el archivo `tetris-standalone.html` en cualquier navegador.
2. ¡No necesitas nada más! La imagen de fondo ya está embebida. Puedes enviar este archivo por correo, chat, USB, etc.


---

## 👾 Créditos

- Inspirado en el clásico Tetris.
- Fondo animado de Pikachu (PikaHi) por el usuario.
- Código base adaptado y mejorado por PandaAkiraNakai.

---
¡Diviértete y comparte!