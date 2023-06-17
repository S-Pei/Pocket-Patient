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
    const id =  medicalHistory[entryNum]["id"]
    const admissionDate = medicalHistory[entryNum]["admissionDate"]
    const dischargeDate = medicalHistory[entryNum]["dischargeDate"]
    const visitType = medicalHistory[entryNum]["visitType"]
    const summary = medicalHistory[entryNum]["summary"]
    const letter = medicalHistory[entryNum]["letter"]
    const addToMedicalHistory = medicalHistory[entryNum]["addToMedicalHistory"]

    $(".section-header").html("Visit Entry: " + admissionDate)
    // document.getElementById("visit-title").innerHTML = "Visit Entry:" + admissionDate  
    document.getElementById("entry-visit-type").innerHTML = visitType
    // document.getElementById("entry-admission-date").innerHTML = admissionDate
    // document.getElementById("entry-discharge-date").innerHTML = dischargeDate
    
    if (visitType == "GP Consultation" || visitType == "Hospital Clinic"){
      document.getElementById("admission-date-label").innerHTML = 'Date:'; 
      document.getElementById("entry-admission-date").innerHTML = admissionDate
      document.getElementById("discharge-date-wrapper").style.display = 'none'; 
    } else { 
        document.getElementById("entry-admission-date").innerHTML = admissionDate
        document.getElementById("discharge-date-wrapper").style.display = 'block'; 
        document.getElementById("entry-discharge-date").innerHTML = dischargeDate
    }
  
    document.getElementById("entry-summary").innerHTML = summary
    
    
    const uploadURL = 'upload-letter/' + id
    console.log(uploadURL)
    const letterForm = document.getElementById("upload-letter-form")
    letterForm.setAttribute('action',uploadURL)
    const entryLetter = document.getElementById("entry-letter")
    
    console.log(letter)
    if  (letter === "False" || letter === '/media/False') {
        $("#upload-letter-form").submit(function(eventObj) {
            var letterUpload = $('#letter-upload').val().replace(/C:\\fakepath\\/, '/media/letterattachments/');
            console.log(letterUpload)
            medicalHistory[entryNum]["letter"] = letterUpload
            console.log(medicalHistory[entryNum]["letter"])
            sessionStorage.setItem("medicalHistory",JSON.stringify(medicalHistory))
            return true; 
        });       
    } else {
        letterForm.remove()
        const entryLetterLink = document.createElement("a");
        if (visitType == "GP Consultation") {
            entryLetterLink.textContent = "GP Letter";
        }
        else {
            entryLetterLink.textContent = "Discharge Letter";
        }
        entryLetterLink.href = base_url + letter
        entryLetter.append(entryLetterLink)
    } 
    const addLabURL = 'add-lab/' + id
    console.log(addLabURL)
    
    // document.getElementById("add-lab").onclick = function() {
        //     window.location.href = base_url + "/add-lab/" + id
    // };

    console.log(addToMedicalHistory)
    document.getElementById("entry-add-to-medical-history").checked = addToMedicalHistory
    
    
}


document.getElementById("add-imaging").onclick = function() {
    window.location.href = base_url + "/add-imaging"
};

