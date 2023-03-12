import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them
  try {
    let reservationData = await fetch(`${config.backendEndpoint}/reservations/`);
    let data = await reservationData.json();
    //console.log(data)
    return data;
  } catch (error) {
    return null;
  }

  // Place holder for functionality to work in the Stubs
  //return null;
}

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  // TODO: MODULE_RESERVATIONS
  // 1. Add the Reservations to the HTML DOM so that they show up in the table
  console.log(reservations);
  //Conditionally render the no-reservation-banner and reservation-table-parent
  if(reservations.length) {
    document.getElementById("reservation-table-parent").style.display = "block";
    document.getElementById("no-reservation-banner").style.display = "none";
  }
  else {
    document.getElementById("reservation-table-parent").style.display = "none";
    document.getElementById("no-reservation-banner").style.display = "block";
    
  }
  /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page

    Note:
    1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
  */

    let reservationDetailsTable = document.querySelector("#reservation-table");
    reservations.forEach(reservation => {
      console.log(reservation)
      const date = new Date(reservation.date);
      const yyyy = date.getFullYear();
      let mm = date.getMonth() + 1; // Months start at 0!
      let dd = date.getDate();

      //if (dd < 10) dd = '0' + dd;
      //if (mm < 10) mm = '0' + mm;

      const formattedDate = dd + '/' + mm + '/' + yyyy;
      //console.log(formattedToday)
      const reservationDate = new Date(reservation.time);
      //console.log(reservationDate.toLocaleDateString('en-IN'))
      //const d = new Date();
      const options = { year: 'numeric', month: 'long', day: 'numeric'};
      let time = reservationDate.toLocaleString("en-IN",options);
      let bookingTime = `${time},${reservationDate.toLocaleString().split(",")[1].toLocaleLowerCase()}`;
      
      let reservationDetail = document.createElement("tr");
      reservationDetail.innerHTML = `
      <td>${reservation.id}</td>
      <td>${reservation.name}</td>
      <td>${reservation.adventureName}</td>
      <td>${reservation.person}</td>
      <td>${formattedDate}</td>
      <td>${reservation.price}</td>
      <td>${bookingTime}</td>
      <td id=${reservation.id} class="reservation-visit-button m-2"><a href="${config.frontendEndpoint}/frontend/pages/adventures/detail/?adventure=${reservation.adventure}">Visit Adventure</a></td>
      `;
      reservationDetailsTable.append(reservationDetail);
    });

}

export { fetchReservations, addReservationToTable };
