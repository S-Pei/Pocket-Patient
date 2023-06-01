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