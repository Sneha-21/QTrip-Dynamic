import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();
  
  //Updates the DOM with the cities
  cities.forEach((key) => {
    addCityToDOM(key.id, key.city, key.description, key.image);
  });
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  try {
    let cities = await fetch(`${config.backendEndpoint}/cities`);
    return cities.json();
  } catch (error) {
    return null;
  }
    
}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
    let cityBody = document.getElementById("data");
    let cityCard = document.createElement("div");
    cityCard.className = "col-6 col-lg-3 mb-4";
    cityCard.innerHTML = `
      <div class="tile">
        <a href = pages/adventures/?city=${id} id = ${id}>
          <div class="tile-text">
            <h5>${city}</h5>
            <p>${description}</p>
          </div>
          <img src = ${image} alt = ${id}>
        </a>
      </div>
    `;
    cityBody.append(cityCard);
}

export { init, fetchCities, addCityToDOM };
