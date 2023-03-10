import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  let params = new URLSearchParams(search);
  //console.log(params.get('adventure'));
  
  // Place holder for functionality to work in the Stubs
  return params.get('adventure');
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  try {
    let adventureDetail = await fetch(`${config.backendEndpoint}/adventures/detail?adventure=${adventureId}`);
    //console.log(adventureDetail.json());
    let data = await adventureDetail.json();
    //console.log(data);
    return data;
  } catch (error) {
      return null;
  }
  // Place holder for functionality to work in the Stubs
  //return adventureDetails.json();
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  let adventureName = document.getElementById("adventure-name");
  adventureName.innerHTML = adventure.name;

  let adventureSubtitle = document.getElementById("adventure-subtitle");
  adventureSubtitle.innerHTML = adventure.subtitle;

  let adventureImages = document.getElementById("photo-gallery");
  adventure.images.forEach(image => {
    let adventureImg = document.createElement("div");
    
    adventureImg.innerHTML = `
      <img src = ${image} alt = ${adventure.name} class = "activity-card-image">
    `;

    adventureImages.append(adventureImg);
    });

    let adventureContent = document.getElementById("adventure-content");
    adventureContent.innerHTML = adventure.content;
  
}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  let adventureImages = document.getElementById("photo-gallery");
  adventureImages.innerHTML = `
    <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
      <div class="carousel-indicators"></div>
      <div class="carousel-inner"></div>
      <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  `;

  let carouselButtonElement = document.querySelector(".carousel-indicators");
  let carouselInnerElement = document.querySelector(".carousel-inner");
  let count = 1;
  let adventureImg;
  images.forEach(image => {
    carouselButtonElement.innerHTML += ` 
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to= "${count - 1}"  aria-label="Slide ${count}" id="button${count}"></button>
    `;
    /* if(count == 1) {
      document.getElementsByTagName("button")[0].setAttribute("class","active");
      document.getElementsByTagName("button")[0].setAttribute("aria-current","true");
    } */
    adventureImg = document.createElement("div");
    adventureImg.className = "carousel-item";
    adventureImg.setAttribute("id",`adImage${count}`);
    adventureImg.innerHTML = `
      <img src = ${image}  class="d-block w-100 activity-card-image">
    `;
    count++;
    //console.log(image);
    /* let activeImage = document.getElementById(adImage1);
    activeImage.setAttribute("class","active"); */
    carouselInnerElement.append(adventureImg);
    });

    let activeImage = document.getElementById("adImage1");
    activeImage.className = "carousel-item active";
    document.getElementById("button1").setAttribute("class","active");
    document.getElementById("button1").setAttribute("aria-current","true");
    //console.log(activeImage);
}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.

}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field

}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't

}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
