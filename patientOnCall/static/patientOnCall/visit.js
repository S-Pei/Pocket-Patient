var base_url = window.location.origin;

(function() {
  
    const firstName = sessionStorage.getItem("patientFirstName")
    const lastName = sessionStorage.getItem("patientLastName")
    const id = sessionStorage.getItem("patientID")
    const medicalHistory = JSON.parse(sessionStorage.getItem("medicalHistory"))

    document.getElementById("patient-name").innerHTML = firstName + ' ' + lastName
    document.getElementById("patient-id").innerHTML = id

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
    var tableBody = document.getElementById("main-current-visit-box-table");

    const entryAdmissionDate = document.createElement("div");
    entryAdmissionDate.classList.add("info-table-item");
    entryAdmissionDate.textContent = admissionDate;

    const entryDischargeDate = document.createElement("div");
    entryDischargeDate.classList.add("info-table-item");
    entryDischargeDate.textContent = dischargeDate;

    const entrySummary = document.createElement("div");
    entrySummary.classList.add("info-table-item");
    entrySummary.textContent = summary;

    const entryConsultant = document.createElement("div");
    entryConsultant.classList.add("info-table-item");
    entryConsultant.textContent = consultant;

    const entryVisitType = document.createElement("div");
    entryVisitType.classList.add("info-table-item");
    entryVisitType.textContent = visitType;

    const entryLetter = document.createElement("a");
    entryLetter.classList.add("info-table-item");
    entryLetter.href = base_url + letter;
    if (visitType == "GP Consultation") {
        entryLetter.textContent = "GP Letter";
    }
    else {
        entryLetter.textContent = "Discharge Letter";
    }

    tableBody.appendChild(entryAdmissionDate);
    tableBody.appendChild(entryDischargeDate);
    tableBody.appendChild(entrySummary);
    tableBody.appendChild(entryConsultant);
    tableBody.appendChild(entryVisitType);
    tableBody.appendChild(entryLetter);
}

document.getElementById("add-visit").addEventListener("click", (e) => {
    e.preventDefault();
    window.location.href = base_url + "/add-visit"
  })