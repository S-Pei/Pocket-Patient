var base_url = window.location.origin;


(function() {
  
    const firstName = sessionStorage.getItem("patientFirstName")
    const lastName = sessionStorage.getItem("patientLastName")
    const patientID = sessionStorage.getItem("patientID")
    const dob = sessionStorage.getItem("patientDob")
    const address = sessionStorage.getItem("patientAddress")
    const labHistory = JSON.parse(sessionStorage.getItem("labHistory"))
    const medicalHistory = JSON.parse(sessionStorage.getItem("medicalHistory"))

    document.getElementById("patient-name").innerHTML = firstName + ' ' + lastName
    document.getElementById("patient-id").innerHTML = 'NHS Number: ' + patientID
    // document.getElementById("patient-age").innerHTML 
    //   = "Date of Birth: " + dob
    // document.getElementById("patient-address").innerHTML 
    //   = "Address: " + address

    insertMedHistoryEntries(medicalHistory);
})();

function insertMedHistoryEntries(medicalHistory) {
  var i = 0
  while (i < medicalHistory.length) {
      addMedHistoryEntry(medicalHistory[i]["admissionDate"],
      medicalHistory[i]["dischargeDate"],
       medicalHistory[i]["summary"],
       medicalHistory[i]["consultant"],
       medicalHistory[i]["visitType"],
       medicalHistory[i]["letter"])
      i++;
  }
}

function addMedHistoryEntry(admissionDate, dischargeDate, summary, consultant, visitType, letter) {
    // Create a new entry for the table
    var tableBody = document.getElementById("past-medical-history-entries");
    const newEntry = document.createElement("li");
    newEntry.classList.add("past-medical-history-entry", "p-1", "d-flex", 
        "flex-row", "w-100", "mb-2", "rounded-3", "border", "text-black-50")

    // const entryAdmissionDate = document.createElement("div");
    // entryAdmissionDate.classList.add("past-medical-history-admission-date");
    // entryAdmissionDate.textContent = admissionDate;

    const entryDischargeDate = document.createElement("div");
    entryDischargeDate.classList.add("past-medical-history-discharge-date");
    entryDischargeDate.textContent = dischargeDate;

    const entrySummary = document.createElement("div");
    entrySummary.classList.add("past-medical-history-summary", "flex-grow-1");
    entrySummary.textContent = summary;

    // const entryConsultant = document.createElement("div");
    // entryConsultant.classList.add("past-medical-history-consultant");
    // entryConsultant.textContent = consultant;

    // const entryVisitType = document.createElement("div");
    // entryVisitType.classList.add("past-medical-history-visit-type");
    // entryVisitType.textContent = visitType;

    // newEntry.appendChild(entryAdmissionDate);
    newEntry.appendChild(entryDischargeDate);
    newEntry.appendChild(entrySummary);
    // newEntry.appendChild(entryConsultant);
    // newEntry.appendChild(entryVisitType);
    tableBody.appendChild(newEntry);
}

// document.getElementById("entry-submit").addEventListener("click", (e) => {
//     e.preventDefault();
    
//     let admissionDate = document.getElementById("entry-admission-date").value;
//     let dischargeDate = document.getElementById("entry-discharge-date").value;
//     let summary = document.getElementById("entry-summary").value;
//     let consultant = document.getElementById("entry-consultant").value;
//     let visitType = document.getElementById("entry-visit-type").value;

//     const firstName = sessionStorage.getItem("patientFirstName")
//     const lastName = sessionStorage.getItem("patientLastName")
  
//     //compare to database
//     $.ajax({
//       type: "POST",
//       url: base_url + "/api/doctor/patient-data/medical-history/",
//       data: {
//         'patientID': sessionStorage.getItem("patientID"),
//         'patientName': firstName + ' ' + lastName,
//         'entryAdmissionDate': admissionDate,
//         'entryDischargeDate': dischargeDate,
//         'entrySummary': summary,
//         'entryConsultant': consultant,
//         'entryVisitType': visitType
//       },
//       success: function (returned_value) {
//         if (returned_value.ok == true) { 
//           addMedHistoryEntry(admissionDate, dischargeDate, summary, consultant, visitType)
//           sessionStorage.setItem("medicalHistory", JSON.stringify(returned_value["medical-history"]))
//         }
//       },
//       error: function () { }
//     });
//   })