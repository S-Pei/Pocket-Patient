var base_url = window.location.origin;

(function() {
    const firstName = sessionStorage.getItem("patientFirstName")
    const lastName = sessionStorage.getItem("patientLastName")
    const age = sessionStorage.getItem("patientAge")
    const address = sessionStorage.getItem("patientAddress")
    const labHistory = JSON.parse(sessionStorage.getItem("labHistory"))
    const medicalHistory = JSON.parse(sessionStorage.getItem("medicalHistory"))

    document.getElementById("patient-name").innerHTML = firstName + ' ' + lastName
    document.getElementById("patient-age").innerHTML 
      = "Age: " + age
    document.getElementById("patient-address").innerHTML 
      = "Address: " + address

    insertMedHistoryEntries(medicalHistory);
})();


function insertMedHistoryEntries(medicalHistory) {
  var i = 0
  while (i < medicalHistory.length) {
      addMedHistoryEntry(medicalHistory[i]["date"], medicalHistory[i]["summary"])
      i++;
  }
}

function addMedHistoryEntry(date, summary) {
    // Create a new entry for the table
    var tableBody = document.getElementById("past-medical-history-entries");
    const newEntry = document.createElement("li");
    newEntry.classList.add("past-medical-history-entry", "p-1", "d-flex", 
        "flex-row", "w-100", "mb-2", "rounded-3", "border", "text-black-50")

    const entryDate = document.createElement("div");
    entryDate.classList.add("past-medical-history-date");
    entryDate.textContent = date;

    const entrySummary = document.createElement("div");
    entrySummary.classList.add("past-medical-history-summary", "flex-grow-1");
    entrySummary.textContent = summary;

    newEntry.appendChild(entryDate);
    newEntry.appendChild(entrySummary);
    tableBody.appendChild(newEntry);
}


document.getElementById("entry-submit").addEventListener("click", (e) => {
    e.preventDefault();
    
    let date = document.getElementById("entry-date").value;
    let summary = document.getElementById("entry-summary").value;

    const firstName = sessionStorage.getItem("patientFirstName")
    const lastName = sessionStorage.getItem("patientLastName")
  
    //compare to database
    $.ajax({
      type: "POST",
      url: base_url + "/api/doctor/patient-data/medical-history/",
      data: {
        'patientID': sessionStorage.getItem("patientID"),
        'patientName': firstName + ' ' + lastName,
        'entryDate': date,
        'entrySummary': summary
      },
      success: function (returned_value) {
        if (returned_value.ok == true) { 
            addEntry(date, summary)
        }
      },
      error: function () { }
    });
  })