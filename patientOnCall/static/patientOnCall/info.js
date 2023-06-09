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
  var maxLines = 6
  while (i < maxLines && i < medicalHistory.length) {
    console.log(medicalHistory[i])
      addMedHistoryEntry(
      medicalHistory[i]["dischargeDate"],
       medicalHistory[i]["summary"],
       medicalHistory[i]["addToMedicalHistory"])
      i++;
  }
}

function addMedHistoryEntry(dischargeDate, summary, addToMedicalHistory) {
    // Create a new entry for the table
    var tableBody = document.getElementById("past-medical-history-entries");
    if (addToMedicalHistory == true){
        const newEntry = document.createElement("li");
        newEntry.classList.add("past-medical-history-entry", "p-1", "d-flex", 
            "flex-row", "w-100", "mb-2", "rounded-3", "border", "text-black-50")
    
        const entryDischargeDate = document.createElement("div");
        entryDischargeDate.classList.add("past-medical-history-discharge-date");
        entryDischargeDate.textContent = dischargeDate;
    
        const entrySummary = document.createElement("div");
        entrySummary.classList.add("past-medical-history-summary", "flex-grow-1");
        entrySummary.textContent = summary;
    
        newEntry.appendChild(entryDischargeDate);
        newEntry.appendChild(entrySummary);
        
        tableBody.appendChild(newEntry);

        console.log(tableBody);
    }
}