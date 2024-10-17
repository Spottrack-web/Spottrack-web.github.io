function closePopup() {
  const popupBanner = document.getElementById("popupBanner");
  popupBanner.style.animation = "slideOut 0.8s forwards"; // Animación de salida
  setTimeout(() => {
    popupBanner.style.display = "none"; // Oculta el mensaje después de la animación
  }, 800);
}
