// FORMULARIO DE CONTACTO
const $form = document.querySelector("#form");
const $buttonMailto = document.querySelector("#mail");

$form.addEventListener("submit", handleSubmit);

function handleSubmit(event) {
  event.preventDefault();
  const form = new FormData(this);
  $buttonMailto.setAttribute(
    "href",
    `mailto:slinvestments30gmail.com?subject=nombre ${form.get(
      "nombre"
    )}  correo ${form.get("email")}&body=${form.get("consulta")}`
  );
  $buttonMailto.click();
}
