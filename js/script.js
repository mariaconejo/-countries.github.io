//
// JS2 Project template.
//

// funcion que me crea los li con la info del api, tambien esta el codigo del modal
function addCountries(values) {
  const lista = document.getElementById('lista');
  lista.innerHTML = '';
  for (let i = 0; i < values.length; i += 1) {
    const item = document.createElement('li');
    lista.appendChild(item);
    const html = `
        <div id="opacidad"></div>
          <div id="${values[i].name}">
          <p id="paises">${values[i].name}</p>
          </div>
          <div id="${values[i].name}modal" class="modal">
            <div class="box">
              <div class="title">
                <img id="logo" src="./img/Logo.png">
                <p class="title">${values[i].name}</p>
                <button id="${values[i].name}boton">X</button>
                <button>?</button>
              </div>
              <img id="imagen" src="${values[i].flag}" alt="${values[i].name}">
              <div id="detalles">
                <p><b>País: </b>${values[i].name}</p>
                <p><b>Capital: </b>${values[i].capital}</p>
                <p><b>Región: </b>${values[i].region}</p>
                <p><b>Subregión: </b>${values[i].subregion}</p>
                <p><b>Población: </b>${values[i].population}</p>
                <p><b>Área: </b>${values[i].area} Km<sup>2</sup></p>
                <p id="${values[i].name}idioma"></p>
                <p id="${values[i].name}divisa"></p>
              </div>
            </div>
          </div>
        `;
    item.innerHTML = html;
    // codigo para recorrer los subarray de languages y currencies
    let lenguaje = '';
    for (let j = 0; j < values[i].languages.length; j += 1) {
      const idioma = `
      ${values[i].languages[j].name}
      `;
      lenguaje = lenguaje.concat(idioma);
    }
    const paisIdioma = document.getElementById(`${values[i].name}idioma`);
    paisIdioma.innerHTML = `<b>Lenguajes</b>:${lenguaje}`;

    let divisa = '';
    for (let j = 0; j < values[i].currencies.length; j += 1) {
      const dinero = `
      ${values[i].currencies[j].name}
      `;
      divisa = divisa.concat(dinero);
    }
    const paisMoneda = document.getElementById(`${values[i].name}divisa`);
    paisMoneda.innerHTML = `<b>Divisas:</b> ${divisa}`;

    // Funcionamiento del modal llama las variables
    const opacidad = document.getElementById('opacidad');
    const nombre = document.getElementById(`${values[i].name}`);
    const modal = document.getElementById(`${values[i].name}modal`);
    const boton = document.getElementById(`${values[i].name}boton`);

    // Abre el modal con el nombre y muestra una opacidad detras que impide
    // seleccionar otros paises
    nombre.addEventListener('click', () => {
      modal.style.display = 'block';
      opacidad.style.display = 'block';
    });
    // Cierra el modal con el boton y quita la opacidad
    boton.addEventListener('click', () => {
      modal.style.display = 'none';
      opacidad.style.display = 'none';
    });
  }
}

// Fetch que llama al api con un link
const form = document.getElementById('form');
fetch('https://restcountries.eu/rest/v2/all')
  .then((response) => response.json())
  .then((data) => {
    // llama la funcion
    addCountries(data);
    // form donde se realiza el filtro
    form.addEventListener('input', (event) => {
      event.preventDefault();
      const input = form.elements[0].value;
      // se utiliza includes para determinar si el un elemento se encuentra dentro del array
      // y se usa junto con filter para que filtre por cada caracter que escriba el usuario
      // se usa toLowerCase() para que no sea no tenga "case sensitive"
      const filtro = data.filter((element) => element.name.toLowerCase().includes(`${input.toLowerCase()}`));
      if (!filtro) {
        addCountries(data);
      } else {
        addCountries(filtro);
      }
    });
  });
