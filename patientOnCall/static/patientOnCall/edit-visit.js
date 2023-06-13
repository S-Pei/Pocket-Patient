var base_url = window.location.origin;

(function() {
    const firstName = sessionStorage.getItem("patientFirstName")
    const lastName = sessionStorage.getItem("patientLastName")
    const id = sessionStorage.getItem("patientID")
    
    document.getElementById("patient-name").innerHTML = firstName + ' ' + lastName
    document.getElementById("patient-id").innerHTML = 'NHS Number:' + id

    rowNum = window.location.href.split('/')[4]
    getVisitEntry(rowNum-1)
})();

function getVisitEntry(entryNum) {
    const medicalHistory = JSON.parse(sessionStorage.getItem("medicalHistory"))
    const admissionDate = medicalHistory[entryNum]["admissionDate"]
    const dischargeDate = medicalHistory[entryNum]["dischargeDate"]
    const visitType = medicalHistory[entryNum]["visitType"]
    const summary = medicalHistory[entryNum]["summary"]
    const letter = medicalHistory[entryNum]["letter"]
    const addToMedicalHistory = medicalHistory[entryNum]["addToMedicalHistory"]

    $(".section-header").html("Visit Entry: " + admissionDate)
    // document.getElementById("visit-title").innerHTML = "Visit Entry:" + admissionDate  
    document.getElementById("entry-admission-date").innerHTML = admissionDate
    document.getElementById("entry-discharge-date").innerHTML = dischargeDate
    document.getElementById("entry-visit-type").innerHTML = visitType
    document.getElementById("entry-summary").innerHTML = summary
    
    const entryLetter = document.getElementById("entry-letter")

    if  (letter === '' || letter === '/media/False') {
       entryLetter.textContent = ""
    } else {
        entryLetter.href = base_url + letter;
        if (visitType == "GP Consultation") {
            entryLetter.textContent = "GP Letter";
        }
        else {
            entryLetter.textContent = "Discharge Letter";
        }
    } 
    console.log(addToMedicalHistory)
    document.getElementById("entry-add-to-medical-history").checked = addToMedicalHistory
}

document.getElementById("add-imaging").onclick = function() {
    window.location.href = base_url + "/add-imaging"
};