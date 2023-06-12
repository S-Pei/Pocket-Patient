var base_url = window.location.origin;

(function() {
  
    const firstName = sessionStorage.getItem("patientFirstName")
    const lastName = sessionStorage.getItem("patientLastName")
    const id = sessionStorage.getItem("patientID")
    // const medicalHistory = JSON.parse(sessionStorage.getItem("medicalHistory"))
    const imagingHistory = JSON.parse(sessionStorage.getItem("imagingHistory"))

    document.getElementById("patient-name").innerHTML = firstName + ' ' + lastName
    document.getElementById("patient-id").innerHTML = 'NHS Number:' + id
    // console.log(window.location.href.split('/')[4])
    const scanName = window.location.href.split('/')[4] 
    if (scanName === "Medical-Photography"){
        const medicalPhotography = scanName.replace(/-/g, " ");
        $(".section-header").html(medicalPhotography)
    } else {
        $(".section-header").html(scanName + ' Scans')
    }

    console.log(imagingHistory);
    insertImagingHistoryEntries(imagingHistory, scanName);
    for(var i = 1; i <= imagingHistory.length; i ++) {
        row_hover(i, imagingHistory[i-1]["visitType"]);
        row_click(i);
    }

})();

function insertImagingHistoryEntries(imagingHistory, scanName) {
  var i = 0
  while (i < imagingHistory.length) {
    if (imagingHistory[i]["scanType"] === scanName) {
        addImagingHistoryEntry(i+1, imagingHistory[i]["date"],
        imagingHistory[i]["region"],
         imagingHistory[i]["indication"],
         imagingHistory[i]["report"])
    }
    i++;
  }
}
function addImagingHistoryEntry(rowNum, date, region, indication, report) {
    // Create a new entry for the table
    var tableBody = document.getElementById("main-current-visit-box-table");
    var row = "row-" + rowNum
    console.log(row)

    const entryDate = document.createElement("div");
    entryDate.classList.add("info-table-item");
    entryDate.classList.add(row);
    entryDate.textContent = date;

    const entryRegion = document.createElement("div");
    entryRegion.classList.add("info-table-item");
    entryRegion.classList.add(row);
    entryRegion.textContent = region;

    const entryIndication = document.createElement("div");
    entryIndication.classList.add("info-table-item");
    entryIndication.classList.add(row);
    entryIndication.textContent = indication;
    
    const entryReport = document.createElement("a");
    entryReport.classList.add("info-table-item");
    entryReport.classList.add(row);
    // console.log(letter)
    if  (report === '' || report === (base_url + '/media/False')) {
        console.log("NOOOOO")
    } else {
        entryReport.href = report;
        console.log(entryReport.href)
        entryReport.textContent = "Imaging Report";
    } 

    const entryImages = document.createElement("div");
    entryImages.classList.add("info-table-item");
    entryImages.classList.add(row);

    tableBody.appendChild(entryDate);
    tableBody.appendChild(entryRegion);
    tableBody.appendChild(entryIndication);
    tableBody.appendChild(entryReport);
    tableBody.appendChild(entryImages);
}

function row_hover(rowNum){
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
        };   
    }
}

function row_click(rowNum){
    var rowClass = 'row-' + rowNum 
    var row = document.getElementsByClassName(rowClass);
    var n = row.length;
    for(var i = 0; i < n; i ++) {
        row[i].onclick = function() {
            // window.location.href = base_url + "/edit-visit/" + rowNum
        };
    }
}

document.getElementById("add-imaging").addEventListener("click", (e) => {
    e.preventDefault();
    window.location.href = base_url + "/add-imaging"
  })
  
// document.getElementsByClassName("add-lab-button").addEventListener("click", (e) => {
//     e.preventDefault();
//     window.location.href = base_url + "/add-imaging"
//   })

