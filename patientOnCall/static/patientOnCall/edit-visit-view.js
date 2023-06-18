var base_url = window.location.origin;

(function() {
  
  const firstName = sessionStorage.getItem("patientFirstName")
  const lastName = sessionStorage.getItem("patientLastName")
  const id = sessionStorage.getItem("patientID")
  let medicalHistory = JSON.parse(sessionStorage.getItem("medicalHistory"))

  document.getElementById("patient-name").innerHTML = firstName + ' ' + lastName
  document.getElementById("patient-id").innerHTML = 'NHS Number:' + id
  
  document.getElementById("back-button").href = document.referrer
  
  rowNum = window.location.href.split('/')[4]
  getVisitEntry(rowNum-1)

  // let inputs = $("p input, p textarea, p select")
  
  $("#patient-medical-history-add-entry").submit(function(eventObj) {
    let patientId = sessionStorage.getItem("patientID");
    let patientName = sessionStorage.getItem("patientName");
    $(this).append(`<input type="hidden" name="patientId" value=${patientId} /> `);
    $(this).append(`<input type="hidden" name="patientName" value=${patientName} /> `);
    // console.log(newMedicalHistory.addToMedicalHistory)
    // medicalHistory.push(newMedicalHistory)
    // medicalHistory.unshift(newMedicalHistory)
    // // console.log(medicalHistory)
    medicalHistory.sort((a, b) => new Date(b.admissionDate).getTime() - new Date(a.admissionDate).getTime())
    // // console.log(medicalHistory)
    sessionStorage.setItem("medicalHistory",JSON.stringify(medicalHistory))
    return true;
});
})();

function getVisitEntry(entryNum) {
    const medicalHistory = JSON.parse(sessionStorage.getItem("medicalHistory"))
    const labHistory = JSON.parse(sessionStorage.getItem("labHistory"))
    const imagingHistory = JSON.parse(sessionStorage.getItem("imagingHistory"))
    const id =  medicalHistory[entryNum]["id"]
    const admissionDate = medicalHistory[entryNum]["admissionDate"]
    const dischargeDate = medicalHistory[entryNum]["dischargeDate"]
    const visitType = medicalHistory[entryNum]["visitType"]
    const summary = medicalHistory[entryNum]["summary"]
    const letter = medicalHistory[entryNum]["letter"]
    const addToMedicalHistory = medicalHistory[entryNum]["addToMedicalHistory"]

    $(".section-header").html("Visit Entry: " + admissionDate)
    
    $("#id_visitType").val(visitType) 
    const visitDropDown = document.getElementById("id_visitType")
    // console.log(visitDropDown)
    date_toggle(visitType)
    visitDropDown.addEventListener("change", e => {
    var visitChosen = e.target.value;
    date_toggle(visitChosen)
    })
    $("#id_admissionDate").val(admissionDate)
    $("#id_dischargeDate").val(dischargeDate)

    $(document).ready(function() {
        $('#id_admissionDate').datepicker({dateFormat: "yy-mm-dd", onSelect: function(dateText, inst){
          $('#id_dischargeDate').datepicker('option', 'minDate', new Date(dateText))}});
      });
    $(document).ready(function() {
        $('#id_dischargeDate').datepicker({dateFormat: "yy-mm-dd", onSelect: function(dateText, inst){
        $('#id_admissionDate').datepicker('option', 'maxDate', new Date(dateText))}});
      });
    
    $("#id_summary").val(summary)

    if  (letter === "False" || letter === '/media/False') {  
      document.getElementById("entry-letter-link").remove()     
    } else {
      const entryLetter = document.getElementById("entry-letter-link")  
      if (visitType == "GP Consultation") {
          entryLetter.textContent = "GP Letter";
      }
      else {
          entryLetter.textContent = "Discharge Letter";
      }
      entryLetter.href = base_url + letter
    } 

    const addLabURL = 'add-lab/' + id
    console.log(addLabURL)
    document.getElementById("add-lab").onclick = function() {
        window.location.href = base_url + "/add-lab/" + id
    };

    for(var i = 0; i < labHistory.length; i ++) {
        if (labHistory[i]["visitEntry"] === id) {
            const labType = labHistory[i]["labType"]
            var labEntry = labType + "-" + (i+1)  
            console.log(labEntry)
            const labName = document.createElement("p");
            labName.innerHTML = labType + ':'
            labEntry = document.createElement("a"); 
            labEntry.href = labHistory[i]["report"]
            const labLink = labHistory[i]["report"].replace(base_url+'/media/labattachments/', '') + '\n'
            labEntry.innerText = labLink.replace('/media/labattachments/', '') + '\n'
            document.getElementById("entry-lab-histories").appendChild(labName)
            document.getElementById("entry-lab-histories").appendChild(labEntry) 
        }
    }

    document.getElementById("add-imaging").onclick = function() {
        window.location.href = base_url + "/add-imaging/" + id
    };

    for(var i = 0; i < imagingHistory.length; i ++) {
        if (imagingHistory[i]["visitEntry"] === id) {
            const scanType = imagingHistory[i]["scanType"]
            const region = imagingHistory[i]["region"]
            var imagingEntry = scanType + "-" + (i+1)  
            const scanName = document.createElement("p");
            scanName.innerHTML = scanType + '(' + region + '):'
            imagingEntry = document.createElement("a"); 
            imagingEntry.href = imagingHistory[i]["report"]
            const scanLink = imagingHistory[i]["report"].replace(base_url+'/media/imagingreports/', '') + '\n'
            imagingEntry.innerText = scanLink.replace('/media/imagingreports/', '') + '\n'
            document.getElementById("entry-imaging-histories").appendChild(scanName)
            document.getElementById("entry-imaging-histories").appendChild(imagingEntry) 
        }
    }

    $("#id_addToMedicalHistory").val(addToMedicalHistory)

    
}

function date_toggle(visitChosen) {
  if (visitChosen == "GP Consultation" || visitChosen == "Hospital Clinic"){
    document.getElementById("admission-date-label").innerHTML = 'Date:'; 
    document.getElementById("discharge-date-wrapper").style.display = 'none'; 
  } else {
    document.getElementById("admission-date-label").innerHTML = 'Admission Date:'; 
    document.getElementById("discharge-date-wrapper").style.display = 'block'; 
  }
}