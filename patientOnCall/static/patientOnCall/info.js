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
    for(var i = 1; i <= medicalHistory.length; i ++) {
        row_hover(i, medicalHistory[i-1]["visitType"]);
        row_click(i);
    }
})();

function insertMedHistoryEntries(medicalHistory) {
  var i = 0
  while (i < medicalHistory.length) {
    console.log(medicalHistory[i])
      addMedHistoryEntry(i+1, 
      medicalHistory[i]["dischargeDate"],
       medicalHistory[i]["summary"],
       medicalHistory[i]["addToMedicalHistory"])
      i++;
  }
}

function addMedHistoryEntry(rowNum, dischargeDate, summary, addToMedicalHistory) {
    // Create a new entry for the table
    var tableBody = document.getElementById("past-medical-history-entries");
    var row = "row-" + rowNum
    if (addToMedicalHistory === true && summary !== ""){
        const newEntry = document.createElement("li");
        newEntry.classList.add("past-medical-history-entry", "p-1", "d-flex", 
            "flex-row", "w-100", "mb-2", "rounded-3", "border", "text-black-50")
        newEntry.classList.add(row)
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
            changeColor("#A1DADE");
        };
        row[i].onmouseout = function() {
            changeColor("");
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