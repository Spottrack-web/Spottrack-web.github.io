function closePopup() {
  const popupBanner = document.getElementById("popupBanner");
  popupBanner.style.animation = "slideOut 0.8s forwards"; // Animación de salida
  setTimeout(() => {
    popupBanner.style.display = "none"; // Oculta el mensaje después de la animación
  }, 800);
}
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.faq-item').forEach(item => {
    item.addEventListener('click', () => {
      item.classList.toggle('active');
    });
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.querySelector(".navbar");
  setTimeout(() => {
    navbar.classList.remove("hidden");
    navbar.classList.add("visible");
  }, 300); // Retraso de 300ms para el efecto
});
// Lista de imágenes
const leftImages = ["images/left1.png", "images/left2.png", "images/left3.png"];
const rightImages = ["images/right1.png", "images/right2.png", "images/right3.png"];

let currentLeftIndex = 0;
let currentRightIndex = 0;

// Referencias a las imágenes
const leftImageElement = document.getElementById("left-image");
const rightImageElement = document.getElementById("right-image");

function changeImage() {
  // Ocultar imágenes con animación
  leftImageElement.classList.add("hidden");
  rightImageElement.classList.add("hidden");

  // Cambiar imágenes después de la animación
  setTimeout(() => {
    currentLeftIndex = (currentLeftIndex + 1) % leftImages.length;
    currentRightIndex = (currentRightIndex + 1) % rightImages.length;

    leftImageElement.src = leftImages[currentLeftIndex];
    rightImageElement.src = rightImages[currentRightIndex];

    // Mostrar imágenes nuevamente
    leftImageElement.classList.remove("hidden");
    rightImageElement.classList.remove("hidden");
  }, 1000); // Tiempo igual al de la animación CSS
}

// Cambiar imágenes cada 10 segundos
setInterval(changeImage, 10000);
