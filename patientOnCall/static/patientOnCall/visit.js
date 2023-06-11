var base_url = window.location.origin;

(function() {
  
    const firstName = sessionStorage.getItem("patientFirstName")
    const lastName = sessionStorage.getItem("patientLastName")
    const id = sessionStorage.getItem("patientID")
    const medicalHistory = JSON.parse(sessionStorage.getItem("medicalHistory"))

    document.getElementById("patient-name").innerHTML = firstName + ' ' + lastName
    document.getElementById("patient-id").innerHTML = 'NHS Number:' + id


    console.log(medicalHistory)
    insertMedHistoryEntries(medicalHistory);
})();

function insertMedHistoryEntries(medicalHistory) {
  var i = 0
  while (i < medicalHistory.length) {
      addMedHistoryEntry(medicalHistory[i]["admissionDate"],
      medicalHistory[i]["dischargeDate"],
       medicalHistory[i]["summary"],
       medicalHistory[i]["visitType"],
       medicalHistory[i]["letter"])
      i++;
  }
}
function addMedHistoryEntry(admissionDate, dischargeDate, summary, visitType, letter) {
    // Create a new entry for the table
    var tableBody = document.getElementById("main-current-visit-box-table");

    const entryAdmissionDate = document.createElement("div");
    entryAdmissionDate.classList.add("info-table-item");
    entryAdmissionDate.classList.add("date-of-admission");
    entryAdmissionDate.textContent = admissionDate;

    const entryDischargeDate = document.createElement("div");
    entryDischargeDate.classList.add("info-table-item");
    entryDischargeDate.classList.add("date-of-discharge");
    entryDischargeDate.textContent = dischargeDate;

    const entrySummary = document.createElement("div");
    entrySummary.classList.add("info-table-item");
    entrySummary.classList.add("discharge-summary");
    entrySummary.textContent = summary;

    // const entryConsultant = document.createElement("div");
    // entryConsultant.classList.add("info-table-item");
    // entryConsultant.textContent = consultant;

    const entryVisitType = document.createElement("div");
    entryVisitType.classList.add("info-table-item");
    entryVisitType.classList.add("type-of-visit");
    entryVisitType.textContent = visitType;
    if (visitType == "GP Consultation") {
        entryVisitType.style.backgroundColor = "#C55252";
    }
    else {
        entryVisitType.style.backgroundColor = "#6BC4EB";
    }
    
    const entryLetter = document.createElement("a");
    entryLetter.classList.add("info-table-item");
    entryLetter.classList.add("entry-letter");
    console.log(letter)
    if (letter !== '/media/False' ||  letter !== '') {
        console.log("NOOOOO")
        entryLetter.href = base_url + letter;
        if (visitType == "GP Consultation") {
            entryLetter.textContent = "GP Letter";
        }
        else {
            entryLetter.textContent = "Discharge Letter";
        }
    }  
    // console.log(entryLetter)

    const entryLabandImaging = document.createElement("div");
    entryLabandImaging.classList.add("info-table-item");
    entryLabandImaging.classList.add("lab-and-imaging");

    tableBody.appendChild(entryAdmissionDate);
    tableBody.appendChild(entryDischargeDate);
    tableBody.appendChild(entrySummary);
    tableBody.appendChild(entryVisitType);
    tableBody.appendChild(entryLetter);
    tableBody.appendChild(entryLabandImaging);
}

document.getElementById("add-visit").addEventListener("click", (e) => {
    e.preventDefault();
    window.location.href = base_url + "/add-visit"
  })