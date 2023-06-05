var base_url = window.location.origin;

(function() {
  
    const firstName = sessionStorage.getItem("patientFirstName")
    const lastName = sessionStorage.getItem("patientLastName")
    const patientID = sessionStorage.getItem("patientID")
    const prescription = JSON.parse(sessionStorage.getItem("prescription"))

    document.getElementById("patient-name").innerHTML = firstName + ' ' + lastName
    document.getElementById("patient-id").innerHTML 
      = "Patient ID: " + patientID

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
    var tableBody = document.getElementById("prescription-entries");
    const newEntry = document.createElement("li");
    newEntry.classList.add("prescription-entry", "p-1", "d-flex", 
        "flex-row", "w-100", "mb-2", "rounded-3", "border", "text-black-50")

    const prescriptionDrug = document.createElement("div");
    prescriptionDrug.classList.add("prescription-drug");
    prescriptionDrug.textContent = drug;

    const prescriptionDosage = document.createElement("div");
    prescriptionDosage.classList.add("prescription-dosage", "flex-grow-1");
    prescriptionDosage.textContent = dosage;

    const prescriptionStartDate = document.createElement("div");
    prescriptionStartDate.classList.add("prescription-start-date", "flex-grow-1");
    prescriptionStartDate.textContent = startDate;

    const prescriptionEndDate = document.createElement("div");
    prescriptionEndDate.classList.add("prescription-end-date", "flex-grow-1");
    prescriptionEndDate.textContent = endDate;

    const prescriptionDuration = document.createElement("div");
    prescriptionDuration.classList.add("prescription-duration", "flex-grow-1");
    prescriptionDuration.textContent = duration;

    const prescriptionRoute = document.createElement("div");
    prescriptionRoute.classList.add("prescription-route", "flex-grow-1");
    prescriptionRoute.textContent = route;

    newEntry.appendChild(prescriptionDrug);
    newEntry.appendChild(prescriptionDosage);
    newEntry.appendChild(prescriptionStartDate);
    newEntry.appendChild(prescriptionEndDate);
    newEntry.appendChild(prescriptionDuration);
    newEntry.appendChild(prescriptionRoute);
    tableBody.appendChild(newEntry);
}

document.getElementById("prescription-submit").addEventListener("click", (e) => {
    e.preventDefault();

    let drug = document.getElementById("prescription-drug").value;
    let dosage = document.getElementById("prescription-dosage").value;
    let startDate = document.getElementById("prescription-start-date").value;
    let endDate = document.getElementById("prescription-end-date").value;
    let duration = document.getElementById("prescription-duration").value;
    let route = document.getElementById("prescription-route").value;

    const firstName = sessionStorage.getItem("patientFirstName")
    const lastName = sessionStorage.getItem("patientLastName")
  
    //compare to database
    $.ajax({
      type: "POST",
      url: base_url + "/api/doctor/patient-data/prescription/",
      data: {
        'patientID': sessionStorage.getItem("patientID"),
        'patientName': firstName + ' ' + lastName,
        'prescriptionDrug': drug, 
        'prescriptionDosage': dosage, 
        'prescriptionStartDate': startDate, 
        'prescriptionEndDate': endDate, 
        'prescriptionDuration': duration, 
        'prescriptionRoute': route
      },
      success: function (returned_value) {
        if (returned_value.ok == true) { 
          addPrescription(drug, dosage, startDate, endDate, duration, route)
          sessionStorage.setItem("prescription", JSON.stringify(returned_value["prescription"]))
        }
      },
      error: function () { }
    });
  })