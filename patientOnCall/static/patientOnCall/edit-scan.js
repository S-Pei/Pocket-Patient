(function() {
    const firstName = sessionStorage.getItem("patientFirstName")
    const lastName = sessionStorage.getItem("patientLastName")
    const id = sessionStorage.getItem("patientID")
    
    document.getElementById("patient-name").innerHTML = firstName + ' ' + lastName
    document.getElementById("patient-id").innerHTML = 'NHS Number:' + id

    rowNum = window.location.href.split('/')[5]
    getScanEntry(rowNum-1)
})();

function getScanEntry(entryNum) {
    const imagingHistory = JSON.parse(sessionStorage.getItem("imagingHistory"))
    const date = imagingHistory[entryNum]["date"]
    const scanType = imagingHistory[entryNum]["scanType"]
    const region = imagingHistory[entryNum]["region"]
    const indication = imagingHistory[entryNum]["indication"]
    const report = imagingHistory[entryNum]["report"]

    $(".section-header").html(scanType + " Scan: " + date)
    // document.getElementById("visit-title").innerHTML = "Visit Entry:" + admissionDate  
    document.getElementById("entry-date").innerHTML = date
    document.getElementById("entry-scan-type").innerHTML = scanType
    document.getElementById("entry-region").innerHTML = region
    document.getElementById("entry-indication").innerHTML = indication
    document.getElementById("entry-report").innerHTML = report 
    
    const entryReport = document.getElementById("entry-report")

    if  (report === '' || report === '/media/False') {
       entryReport.textContent = ""
    } else {
        entryReport.textContent = scanType + " Report"
        entryReport.href = base_url + report;
    } 
}