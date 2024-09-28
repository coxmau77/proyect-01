// // Ejercicio clase 12 Objetos
// // Formulario E Input
// // 1. En tu login.html vincula un nuevo documento js login.js
// console.log("<-- se ejecuta login.js -->");
// // 2. A través de JavaScript, creá un formulario que contenga los siguientes elementos:
// const form = document.createElement("form");
// // - Un input donde el usuario escriba su nombre (con su respectivo label).
// const labelName = document.createElement("label");
// labelName.setAttribute("for", "userName");
// labelName.textContent = "Nombre";
// form.appendChild(labelName);
// const inputName = document.createElement("input");
// inputName.type = "text";
// inputName.name = "nombre";
// inputName.required = true;
// inputName.placeholder = "Ingresá tu nombre";
// form.appendChild(inputName);
// // - Un input donde el usuario escriba su e-mail, con un placeholder.
// const labelEmail = document.createElement("label");
// labelEmail.setAttribute("for", "userEmail");
// labelEmail.textContent = "Correo electrónico";
// form.appendChild(labelEmail);
// const inputEmail = document.createElement("input");
// inputEmail.type = "email";
// inputEmail.name = "correo";
// inputEmail.required = true;
// inputEmail.placeholder = "Ingresá tu correo electrónico";
// form.appendChild(inputEmail);
// // - Un radio button donde el usuario indique si su género es "Femenino", "Masculino", "No binario", "Prefiero no decirlo".
// const labelFemenino = document.createElement("label");
// labelFemenino.textContent = "Femenino";
// form.appendChild(labelFemenino);
// const inputFem = document.createElement("input");
// inputFem.type = "radio";
// inputFem.name = "genero";
// inputFem.value = "Femenino";
// labelFemenino.appendChild(inputFem);

// const labelMasculino = document.createElement("label");
// labelMasculino.textContent = "Masculino";
// form.appendChild(labelMasculino);
// const inputMas = document.createElement("input");
// inputMas.type = "radio";
// inputMas.name = "genero";
// inputMas.value = "Masculino";
// labelMasculino.appendChild(inputMas);

// const labelNoBinario = document.createElement("label");
// labelNoBinario.textContent = "No binario";
// form.appendChild(labelNoBinario);
// const inputNoBin = document.createElement("input");
// inputNoBin.type = "radio";
// inputNoBin.name = "genero";
// inputNoBin.value = "No binario";
// labelNoBinario.appendChild(inputNoBin);

// const labelNoPref = document.createElement("label");
// labelNoPref.textContent = "Prefiero no decirlo";
// form.appendChild(labelNoPref);
// const inputNoPref = document.createElement("input");
// inputNoPref.type = "radio";
// inputNoPref.name = "genero";
// inputNoPref.value = "Prefiero no decirlo";
// labelNoPref.appendChild(inputNoPref);
// // 🛎 Recordá: Si tenemos cuatro opciones o menos, es mejor usar radio button. Si ya son más de cinco, recomendamos usar dropdown.
// // - Un dropdown para que el usuario indique su rango de edad: si es menor a 18 años; 19-30; 31-45; 46-55 o mayor a 56.
// const labelAge = document.createElement("label");
// const selectAge = document.createElement("select");
// selectAge.name = "rangoEdad";
// labelAge.appendChild(selectAge);

// const optionMenor18 = document.createElement("option");
// optionMenor18.value = "menor a 18 años";
// optionMenor18.textContent = "Menor a 18 años";
// selectAge.appendChild(optionMenor18);

// const option19_30 = document.createElement("option");
// option19_30.value = "19-30";
// option19_30.textContent = "19-30 años";
// selectAge.appendChild(option19_30);

// const option46_55 = document.createElement("option");
// option46_55.value = "46-55";
// option46_55.textContent = "46-55 años";
// selectAge.appendChild(option46_55);

// const optionMay56 = document.createElement("option");
// optionMay56.value = "mayor a 56";
// optionMay56.textContent = "mayor a 56";
// selectAge.appendChild(optionMay56);

// form.appendChild(labelAge);
// // - Un checkbox para señalar si el usuario es argentino o no.
// const inputCheck = document.createElement("input");

// const labelCheck = document.createElement("label");
// labelCheck.textContent = "Eres de nacionalidad Argentina?";
// inputCheck.name = "nacionalidad";
// inputCheck.type = "checkbox";
// inputCheck.value = "nacionalidad";

// form.appendChild(labelCheck);
// form.appendChild(inputCheck);

// const buttonForm = document.createElement("button");
// buttonForm.textContent = "Enviar formulario";
// buttonForm.type = "submit";
// form.appendChild(buttonForm);

// document.querySelector("main").appendChild(form);
// // 3. Una vez terminado el formulario, completalo con tus datos.
// // 4. Luego, abrí la consola y obtené:
// //     - El nombre y apellido ingresado.
// //     - El e-mail ingresado.
// //     - La palabra seleccionada por género identificado.
// //      Capturamos el género seleccionado (radio button);
// //     - El rango de edad seleccionado.
// //      Capturamos el valor seleccionado del select de rango de edad
// //     - El valor true o false en base a si la persona seleccionó ser argentino/a o no.
// // Capturamos si el checkbox de nacionalidad está marcado

// // Capturamos los valores del formulario
// const nombre = document.querySelector('input[name="nombre"]').value;
// const correo = document.querySelector('input[name="correo"]').value;

// // Mostramos la información en la consola
// console.log("Nombre:", nombre);
// console.log("Correo:", correo);

// Escuchamos el evento 'submit' del formulario
document
  .getElementById("miFormulario")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Evitamos que se recargue la página

    // Capturamos los valores del formulario
    const nombre = document.querySelector('input[name="nombre"]').value;
    const correo = document.querySelector('input[name="correo"]').value;

    // Capturamos el género seleccionado (radio button)
    const genero = document.querySelector('input[name="genero"]:checked');
    const generoSeleccionado = genero ? genero.value : "No seleccionado";

    // Capturamos el valor seleccionado del select de rango de edad
    const rangoEdad = document.querySelector('select[name="rangoEdad"]').value;

    // Capturamos si el checkbox de nacionalidad está marcado
    const esArgentino = document.querySelector('input[name="nacionalidad"]')
      .checked
      ? "Sí"
      : "No";

    // Mostramos la información en la consola
    console.log("Nombre:", nombre);
    console.log("Correo:", correo);
    console.log("Género:", generoSeleccionado);
    console.log("Rango de edad:", rangoEdad);
    console.log("Es de nacionalidad Argentina:", esArgentino);
  });
