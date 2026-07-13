const testButton = document.querySelector("#testButton");
const message = document.querySelector("#message");

if (testButton && message) {
  testButton.addEventListener("click", () => {
    const currentTime = new Date().toLocaleTimeString("es-ES");

    message.textContent = `JavaScript funciona correctamente. Hora: ${currentTime}`;
  });
}
