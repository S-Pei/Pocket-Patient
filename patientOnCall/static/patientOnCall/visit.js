var base_url = window.location.origin;

(function() {
  
    const firstName = sessionStorage.getItem("patientFirstName")
    const lastName = sessionStorage.getItem("patientLastName")
    const id = sessionStorage.getItem("patientID")
    const medicalHistory = JSON.parse(sessionStorage.getItem("medicalHistory"))

    document.getElementById("patient-name").innerHTML = firstName + ' ' + lastName
    document.getElementById("patient-id").innerHTML = 'NHS Number:' + id

    console.log(medicalHistory);
    insertMedHistoryEntries(medicalHistory);
    for(var i = 1; i <= medicalHistory.length; i ++) {
        row_hover(i, medicalHistory[i-1]["visitType"]);
        row_click(i);
    }

})();

function insertMedHistoryEntries(medicalHistory) {
  var i = 0
  while (i < medicalHistory.length) {
      addMedHistoryEntry(i+1, medicalHistory[i]["admissionDate"],
      medicalHistory[i]["dischargeDate"],
       medicalHistory[i]["summary"],
       medicalHistory[i]["visitType"],
       medicalHistory[i]["letter"])
      i++;
  }
}
function addMedHistoryEntry(rowNum, admissionDate, dischargeDate, summary, visitType, letter) {
    // Create a new entry for the table
    var tableBody = document.getElementById("main-current-visit-box-table");
    var row = "row-" + rowNum
    console.log(row)
    const entryAdmissionDate = document.createElement("div");
    entryAdmissionDate.classList.add("info-table-item");
    entryAdmissionDate.classList.add(row);
    entryAdmissionDate.textContent = admissionDate;

    const entryDischargeDate = document.createElement("div");
    entryDischargeDate.classList.add("info-table-item");
    entryDischargeDate.classList.add(row);
    entryDischargeDate.textContent = dischargeDate;

    const entrySummary = document.createElement("div");
    entrySummary.classList.add("info-table-item");
    entrySummary.classList.add(row);
    entrySummary.textContent = summary;

    // const entryConsultant = document.createElement("div");
    // entryConsultant.classList.add("info-table-item");
    // entryConsultant.textContent = consultant;

    const entryVisitType = document.createElement("div");
    entryVisitType.classList.add("info-table-item");
    entryVisitType.classList.add(row);
    entryVisitType.classList.add("visit-type");
    entryVisitType.textContent = visitType;
    if (visitType == "GP Consultation") {
        entryVisitType.style.backgroundColor = "#C55252";
    }
    else {
        entryVisitType.style.backgroundColor = "#6BC4EB";
    }
    
    const entryLetter = document.createElement("a");
    entryLetter.classList.add("info-table-item");
    entryLetter.classList.add(row);
    // console.log(letter)
    if  (letter === '' || letter === '/media/False') {
        console.log("NOOOOO")
    } else {
        entryLetter.href = base_url + letter;
        if (visitType == "GP Consultation") {
            entryLetter.textContent = "GP Letter";
        }
        else {
            entryLetter.textContent = "Discharge Letter";
        }
    } 

    const entryLabandImaging = document.createElement("div");
    const entryLabAdd = document.createElement("button")
    entryLabAdd.innerText = "Lab"
    entryLabAdd.classList.add("add-lab-button")
    entryLabandImaging.appendChild(entryLabAdd)

    const entryImagingAdd = document.createElement("button")
    entryImagingAdd.innerText = "Imaging"
    entryImagingAdd.classList.add("add-lab-button")
    entryLabandImaging.appendChild(entryImagingAdd)

    entryLabandImaging.classList.add("info-table-item");
    entryLabandImaging.classList.add(row);

    tableBody.appendChild(entryAdmissionDate);
    tableBody.appendChild(entryDischargeDate);
    tableBody.appendChild(entrySummary);
    tableBody.appendChild(entryVisitType);
    tableBody.appendChild(entryLetter);
    tableBody.appendChild(entryLabandImaging);
}

function row_hover(rowNum, visitType){
    var rowClass = 'row-' + rowNum 
    var row = document.getElementsByClassName(rowClass);
    var n = row.length;
    function changeColor(color){
        for(var i = 0; i < n; i++) {
            row[i].style.backgroundColor = color; 
        }
    }
    for(var i = 0; i < n; i ++) {
        row[i].onmouseover = function() {
            changeColor("#73C1D2");
        };
        row[i].onmouseout = function() {
            changeColor("");
            if (visitType== "GP Consultation"){
                row[3].style.backgroundColor = "#C55252";
            } else {
                row[3].style.backgroundColor = "#6BC4EB";
            }
        };   
    }
}

function row_click(rowNum){
    var rowClass = 'row-' + rowNum 
    var row = document.getElementsByClassName(rowClass);
    var n = row.length;
    for(var i = 0; i < n; i ++) {
        row[i].onclick = function() {
            window.location.href = base_url + "/edit-visit/" + rowNum
        };
    }
}

document.getElementById("add-visit").addEventListener("click", (e) => {
    e.preventDefault();
    window.location.href = base_url + "/add-visit"
  })
