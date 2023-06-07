var base_url = window.location.origin;

(function() {
  
    const firstName = sessionStorage.getItem("patientFirstName")
    const lastName = sessionStorage.getItem("patientLastName")
    const patientID = sessionStorage.getItem("patientID")
    const prescription = JSON.parse(sessionStorage.getItem("prescription"))

    document.getElementById("patient-name").innerHTML = firstName + ' ' + lastName
    document.getElementById("patient-id").innerHTML = 'NHS Number:' + patientID

    insertPrescription(prescription);
})();


function insertPrescription(prescription) {
  var i = 0
  while (i < prescription.length) {
    
      addPrescription(prescription[i]["drug"], 
                        prescription[i]["dosage"], 
                        prescription[i]["startDate"], 
                        prescription[i]["endDate"], 
                        prescription[i]["duration"], 
                        prescription[i]["route"])
      i++;
  }
}

function addPrescription(drug, dosage, startDate, endDate, duration, route) {
    // Create a new entry for the table
    var tableBody = document.getElementById("main-current-prescription-box-table");

    const prescriptionDrug = document.createElement("div");
    prescriptionDrug.classList.add("info-table-item");
    prescriptionDrug.textContent = drug;

    const prescriptionDosage = document.createElement("div");
    prescriptionDosage.classList.add("info-table-item");
    prescriptionDosage.textContent = dosage;

    const prescriptionStartDate = document.createElement("div");
    prescriptionStartDate.classList.add("info-table-item");
    prescriptionStartDate.textContent = startDate;

    const prescriptionEndDate = document.createElement("div");
    prescriptionEndDate.classList.add("info-table-item");
    prescriptionEndDate.textContent = endDate;

    const prescriptionDuration = document.createElement("div");
    prescriptionDuration.classList.add("info-table-item");
    prescriptionDuration.textContent = duration;

    const prescriptionRoute = document.createElement("div");
    prescriptionRoute.classList.add("info-table-item");
    prescriptionRoute.textContent = route;

    tableBody.appendChild(prescriptionDrug);
    tableBody.appendChild(prescriptionDosage);
    tableBody.appendChild(prescriptionStartDate);
    tableBody.appendChild(prescriptionEndDate);
    tableBody.appendChild(prescriptionDuration);
    tableBody.appendChild(prescriptionRoute);
}

// document.getElementById("prescription-submit").addEventListener("click", (e) => {
//     e.preventDefault();

//     let drug = document.getElementById("prescription-drug").value;
//     let dosage = document.getElementById("prescription-dosage").value;
//     let startDate = document.getElementById("prescription-start-date").value;
//     let endDate = document.getElementById("prescription-end-date").value;
//     let duration = document.getElementById("prescription-duration").value;
//     let route = document.getElementById("prescription-route").value;

//     const firstName = sessionStorage.getItem("patientFirstName")
//     const lastName = sessionStorage.getItem("patientLastName")
  
//     //compare to database
//     $.ajax({
//       type: "POST",
//       url: base_url + "/api/doctor/patient-data/prescription/",
//       data: {
//         'patientID': sessionStorage.getItem("patientID"),
//         'patientName': firstName + ' ' + lastName,
//         'prescriptionDrug': drug, 
//         'prescriptionDosage': dosage, 
//         'prescriptionStartDate': startDate, 
//         'prescriptionEndDate': endDate, 
//         'prescriptionDuration': duration, 
//         'prescriptionRoute': route
//       },
//       success: function (returned_value) {
//         if (returned_value.ok == true) { 
//           addPrescription(drug, dosage, startDate, endDate, duration, route)
//           sessionStorage.setItem("prescription", JSON.stringify(returned_value["prescription"]))
//         }
//       },
//       error: function () { }
//     });
//   })