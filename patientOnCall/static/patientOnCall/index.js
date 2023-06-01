document.getElementById("patient-search-form").addEventListener("click", (e) => {
  e.preventDefault();
  
  let patientId = document.getElementById("patient-id").value;
  let patientName = document.getElementById("patient-name").value;

  console.log(patientId)
  console.log(patientName)
  //compare to database
  $.ajax({
    type: "POST",
    url: "api/doctor/patient-data/",
    data: {
        'patientId': patientId,
        'patientName': patientName
    },
    success: function (returned_value) {
      if (returned_value.ok == true) { 
        window.location.href = "main/"
        console.log(returned_value);
      }
    },
    error: function () { }
  });
})