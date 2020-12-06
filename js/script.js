//
// JS2 Project template.
//

const form = document.getElementById('form');
const input = document.getElementById('search');
const lista = document.getElementById('list');
const info = document.getElementById('info');

function addCountries(values) {
  for (let i = 0; i < values.length; i += 1) {
    const item = document.createElement('li');
    info.appendChild(item);
    fetch('https://restcountries.eu/rest/v2/all')
      .then((response) => response.json())
      .then((data) => {
        const contenedor = `
            <div id="modal">
              <div id="info">
                <img src="${data.flag}" alt="${data.name}">
                <div id="detalles">
                  <p>País: ${data.name} </p>
                  <p>Capital: ${data.capital} </p>
                  <p>Región: ${data.region} </p>
                  <p>Subregión: ${data.subregion} </p>
                  <p>Población  ${data.region} </p>
                  <p>Área: ${data.area}  </p>
                  <p>Idiomas: ${data.languages} </p>
                  <p>Monedas: ${data.currencies} </p>
                </div>
              </div>
            </div>
          `;
        item.innerHTML = contenedor;
      });
  }
}
