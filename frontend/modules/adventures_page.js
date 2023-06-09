
import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  const params = new URLSearchParams(search);
  return params.get('city');
}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
    try {
      let cityAdventure = await fetch(`${config.backendEndpoint}/adventures?city=${city}`);
      return cityAdventure.json();
    } catch (error) {
        return null;
    }
}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
    //console.log(`inside ${adventures.length}`);
    let adventureBody = document.getElementById("data");
    adventures.forEach((adventure) => {
    let adventureCard = document.createElement("div");
    adventureCard.className = "col-6 col-lg-3 mb-4";
    adventureCard.innerHTML = `
      <a href="detail/?adventure=${adventure.id}" id=${adventure.id}>
        <div class="activity-card">
          <div class= "category-banner">${adventure.category}</div>
          <img src= ${adventure.image} class="card-img-top" alt="${adventure.name}">
          <div class="card-body w-100 d-flex flex-column flex-lg-row justify-content-between align-items-center">
            <h6 class="mb-0">${adventure.name}</h5>
            <p class="mb-0">₹${adventure.costPerHead}</h6>
          </div>
          <div class="card-body w-100 d-flex flex-column flex-lg-row justify-content-between align-items-center">
            <h6 class="mb-0">Duration</h5>
            <p class="mb-0 duration">${adventure.duration} Hours</h6>
          </div>
        </div>
      </a>
  `;
  adventureBody.append(adventureCard);
  });
  
  
}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  let duration;
  duration = list.filter(adventure => {
    if(adventure.duration >= low && adventure.duration <= high) {
       return adventure;
    }
  })
  //console.log(duration);
  return duration;
}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  let categories = [];  
  categoryList.forEach(category => {
        list.filter(adventure => {
        if(adventure.category === category)
          categories.push(adventure); 
      })
    })

    return categories;
}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
  
  
  if(filters.category.length !== 0) {
    list = filterByCategory(list,filters.category);
  }

  if(filters.duration !== "") {
    let durationArray = filters.duration.split("-");
    list = filterByDuration(list,durationArray[0],durationArray[1]);
  }

  // Place holder for functionality to work in the Stubs
  return list;

}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS  
  // 1. Store the filters as a String to localStorage  
  window.localStorage.setItem('filters', JSON.stringify(filters)); 
  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS  
  // 1. Get the filters from localStorage and return String read as an object  
   let filterData = JSON.parse(window.localStorage.getItem('filters'));
   // Place holder for functionality to work in the Stubs  
   return filterData;
  }


//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
    //console.log(filters.category);
  let filterPills = document.getElementById("category-list");
  filters.category.forEach(category => {
    let categoryPill = document.createElement("div");
    categoryPill.className = "category-filter";
    categoryPill.innerHTML = `${category}`;
    filterPills.append(categoryPill);
  })

  let durationFilter = document.getElementById("duration-select");
  durationFilter.value = filters.duration;
  
}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
