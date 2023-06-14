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
    const imagingUploads = JSON.parse(sessionStorage.getItem("imagingUploads"))
    const date = imagingHistory[entryNum]["date"]
    const scanType = imagingHistory[entryNum]["scanType"]
    const region = imagingHistory[entryNum]["region"]
    const indication = imagingHistory[entryNum]["indication"]
    const report = imagingHistory[entryNum]["report"]

    if (scanType === "Medical Photography") {
        $(".section-header").html(scanType + ": " + date)
    } else {
        $(".section-header").html(scanType + " Scan: " + date)
    }
    // document.getElementById("visit-title").innerHTML = "Visit Entry:" + admissionDate  
    document.getElementById("entry-date").innerHTML = date
    document.getElementById("entry-scan-type").innerHTML = scanType
    document.getElementById("entry-region").innerHTML = region
    document.getElementById("entry-indication").innerHTML = indication
    // document.getElementById("entry-report").innerHTML = report 
    
    const entryReport = document.getElementById("entry-report")

    if  (report === '' || report === (base_url + '/media/False')) {
    //    entryReport.textContent = ""
       const entryReportUpload = document.createElement("input")
       entryReportUpload.classList.add("add-option")
       entryReportUpload.setAttribute('type','submit')
       entryReportUpload.setAttribute('value','Upload Report')
       entryReport.append(entryReportUpload)
    } else {
        const entryReportLink = document.createElement("a");
        entryReportLink.textContent = scanType + " Report"
        entryReportLink.href = base_url + report
        entryReport.append(entryReportLink)
    } 

    const entryImages = document.getElementById("entry-images")
    const entryID = imagingHistory[entryNum]["id"]
      // console.log(entryID === undefined)
      var images = []
      if (entryID === undefined) {
          images = imagingHistory[entryNum]['image']
        } else {
            imagesEntries = imagingUploads.filter(function(item){
                return item.imagingEntry == entryID;         
            });
            imagesEntries.forEach(f => images.push(f['image']))
        }
    
    for(var i = 0; i < images.length; i ++) {
        var entryImage = "entryImage-" + i 
        entryImage = document.createElement("a");
        entryImage.classList.add("add-lab-button");
        entryImage.textContent = region + "-img-" + (i+1) + "\n"
        entryImage.href = images[i]
        entryImages.appendChild(entryImage)
    }
    
    console.log(images)
}