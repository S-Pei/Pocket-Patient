document.getElementById("medication-submit").addEventListener("click", (e) => {
    e.preventDefault();

    let drug = document.getElementById("medication-drug").value;
    let dosage = document.getElementById("medication-dosage").value;
    let startDate = document.getElementById("medication-start-date").value;
    // let endDate = document.getElementById("medication-end-date").value;
    let durationNum = document.getElementById("medication-duration-num").value;
    let durationUnit = document.getElementById("medication-duration-unit").value;
    let route = document.getElementById("medication-route").value;
    let comment = document.getElementById("medication-comment").value;

    const firstName = sessionStorage.getItem("patientFirstName")
    const lastName = sessionStorage.getItem("patientLastName")
  
    console.log("hello")

    //compare to database
    $.ajax({
      type: "POST",
      url: base_url + "/api/doctor/patient-data/medication/",
      data: {
        'patientID': sessionStorage.getItem("patientID"),
        'patientName': firstName + ' ' + lastName,
        'medicationDrug': drug, 
        'medicationDosage': dosage, 
        'medicationStartDate': startDate, 
        'medicationEndDate': addTime(startDate, parseInt(durationNum), durationUnit), 
        'medicationDuration': `${durationNum} ${durationUnit}`, 
        'medicationRoute': route,
        'medicationComment': comment
      },
      success: function (returned_value) {
        if (returned_value.ok == true) {
          sessionStorage.setItem("currentMedication", JSON.stringify(returned_value["medication"]))
          window.location.href = "/medication"
        }
      },
      error: function () { }
    });
  })

  
function addTime(dateStr, num, unit) {
    const dateParts = dateStr.split('-');
    var day = parseInt(dateParts[2], 10);
    var month = parseInt(dateParts[1], 10) - 1;
    var year = parseInt(dateParts[0], 10);

    const date = new Date(year, month, day);

    if (unit === 'day') {
        date.setDate(date.getDate() + num);
    } else if (unit === 'week') {
        date.setDate(date.getDate() + (num * 7));
    } else if (unit === 'month') {
        date.setMonth(date.getMonth() + num);
    } else if (unit === 'year') {
        date.setFullYear(date.getFullYear() + num);
    }

    day = date.getDate().toString().padStart(2, '0');
    month = (date.getMonth() + 1).toString().padStart(2, '0');
    year = date.getFullYear();

    return `${year}-${month}-${day}`;
}
