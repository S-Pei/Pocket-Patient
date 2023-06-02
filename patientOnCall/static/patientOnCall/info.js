var base_url = window.location.origin;

(function() {
    const firstName = sessionStorage.getItem("patientFirstName")
    const lastName = sessionStorage.getItem("patientLastName")
    const age = sessionStorage.getItem("patientAge")
    const address = sessionStorage.getItem("patientAddress")
    const labHistory = JSON.parse(sessionStorage.getItem("labHistory"))
    const medicalHistory = JSON.parse(sessionStorage.getItem("medicalHistory"))

    document.getElementById("patient-name").innerHTML = firstName + ' ' + lastName
    document.getElementById("patient-age").innerHTML = age
    document.getElementById("patient-address").innerHTML = address

    var i = 0
    while (i < medicalHistory.length) {
        addEntry(medicalHistory[i]["date"], medicalHistory[i]["summary"])
        i++;
    }
})();
function addEntry(date, summary) {
    // Create a new row for the table
    var tableBody = document.getElementById("tableBody");
    var newRow = tableBody.insertRow();

    // Insert cells with the entry data
    var dateCell = newRow.insertCell();
    dateCell.textContent = date;

    var summaryCell = newRow.insertCell();
    summaryCell.textContent = summary;
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