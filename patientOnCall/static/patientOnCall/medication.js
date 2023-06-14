var base_url = window.location.origin;
let websocket;

(function() {
  
    const firstName = sessionStorage.getItem("patientFirstName")
    const lastName = sessionStorage.getItem("patientLastName")
    const patientID = sessionStorage.getItem("patientID")
    const currentMedication = JSON.parse(sessionStorage.getItem("currentMedication"))
    const previousMedication = JSON.parse(sessionStorage.getItem("previousMedication"))

    document.getElementById("patient-name").innerHTML = firstName + ' ' + lastName
    document.getElementById("patient-id").innerHTML = 'NHS Number:' + patientID

    insertMedication(currentMedication, true);
    insertMedication(previousMedication, false);
})();


function insertMedication(medication, isCurrent) {
  var i = 0
  while (i < medication.length) {

    console.log(medication[i])
    
      addMedication(isCurrent, medication[i]["drug"], 
                        medication[i]["dosage"], 
                        medication[i]["startDate"], 
                        medication[i]["endDate"], 
                        medication[i]["duration"], 
                        medication[i]["route"],
                        medication[i]["comments"],
                        medication[i]["byPatient"])
      i++;
  }
}

function addMedication(isCurrent, drug, dosage, startDate, endDate, duration, route, comments, byPatient) {
    // Create a new entry for the table
    let tableBody;
    if (isCurrent) {
      tableBody = document.getElementById("main-current-medication-box-table");
    }
    else {
      tableBody = document.getElementById("main-previous-medication-box-table");    
    }

    const medicationDrug = document.createElement("div");
    medicationDrug.classList.add("info-table-item");
    medicationDrug.textContent = drug;

    const medicationDosage = document.createElement("div");
    medicationDosage.classList.add("info-table-item");
    medicationDosage.textContent = dosage;

    const medicationStartDate = document.createElement("div");
    medicationStartDate.classList.add("info-table-item");
    medicationStartDate.textContent = startDate;

    const medicationEndDate = document.createElement("div");
    medicationEndDate.classList.add("info-table-item");
    medicationEndDate.textContent = endDate;

    const medicationDuration = document.createElement("div");
    medicationDuration.classList.add("info-table-item");
    medicationDuration.textContent = duration;

    const medicationRoute = document.createElement("div");
    medicationRoute.classList.add("info-table-item");
    medicationRoute.textContent = route;

    const medicationComments = document.createElement("div");
    medicationComments.classList.add("info-table-item");
    medicationComments.textContent = comments;

    const medicationByPatient = document.createElement("div");
    medicationByPatient.classList.add("info-table-item");
    const medicationByPatientChild = document.createElement("div");
    if (byPatient == true) {
      medicationByPatientChild.textContent = "Patient";
      medicationByPatientChild.classList.add("by-patient")
    } else {
      medicationByPatientChild.textContent = "Doctor";
      medicationByPatientChild.classList.add("by-doctor")
    }
    medicationByPatient.appendChild(medicationByPatientChild);

    tableBody.appendChild(medicationDrug);
    tableBody.appendChild(medicationDosage);
    tableBody.appendChild(medicationStartDate);
    tableBody.appendChild(medicationEndDate);
    tableBody.appendChild(medicationDuration);
    tableBody.appendChild(medicationRoute);
    tableBody.appendChild(medicationComments);
    tableBody.appendChild(medicationByPatient);
}

document.getElementById("edit-medication").addEventListener("click", (e) => {
    e.preventDefault();
    window.location.href = base_url + "/edit-medication"
  })


function connect_to_websocket() {
  websocket = create_websocket(
    () => {
      console.log("Connected to websocket");
    },
    (response) => {
      let data = JSON.parse(response.data)
      let event = data["event"]
    }
  )
}

// document.getElementById("medication-submit").addEventListener("click", (e) => {
//     e.preventDefault();

//     let drug = document.getElementById("medication-drug").value;
//     let dosage = document.getElementById("medication-dosage").value;
//     let startDate = document.getElementById("medication-start-date").value;
//     let endDate = document.getElementById("medication-end-date").value;
//     let duration = document.getElementById("medication-duration").value;
//     let route = document.getElementById("medication-route").value;

//     const firstName = sessionStorage.getItem("patientFirstName")
//     const lastName = sessionStorage.getItem("patientLastName")
  
//     //compare to database
//     $.ajax({
//       type: "POST",
//       url: base_url + "/api/doctor/patient-data/medication/",
//       data: {
//         'patientID': sessionStorage.getItem("patientID"),
//         'patientName': firstName + ' ' + lastName,
//         'medicationDrug': drug, 
//         'medicationDosage': dosage, 
//         'medicationStartDate': startDate, 
//         'medicationEndDate': endDate, 
//         'medicationDuration': duration, 
//         'medicationRoute': route
//       },
//       success: function (returned_value) {
//         if (returned_value.ok == true) { 
//           addMedication(drug, dosage, startDate, endDate, duration, route)
//           sessionStorage.setItem("medication", JSON.stringify(returned_value["medication"]))
//         }
//       },
//       error: function () { }
//     });
//   })