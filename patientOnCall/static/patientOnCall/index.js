document.getElementById("patient-search-submit").addEventListener("click", (e) => {
  e.preventDefault();
  
  let patientId = document.getElementById("patient-id").value;
  let patientName = document.getElementById("patient-name").value;

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
        // Wait for patient approval
        wait_for_patient_approval();

        // sessionStorage.setItem("sessionID", returned_value["sessionId"])
        // sessionStorage.setItem("patientID", patientId)
        // sessionStorage.setItem("patientFirstName", returned_value["patient-first-name"])
        // sessionStorage.setItem("patientLastName", returned_value["patient-last-name"])
        // sessionStorage.setItem("patientDob", returned_value["patient-dob"])
        // sessionStorage.setItem("patientAddress", returned_value["patient-address"])
        // sessionStorage.setItem("labHistory", JSON.stringify(returned_value["lab-history"]))
        // sessionStorage.setItem("medicalHistory", JSON.stringify(returned_value["medical-history"]))
        // sessionStorage.setItem("prescription", JSON.stringify(returned_value["prescription"]))
        // window.location.href = "main/"
      }
    },
    error: function () { }
  });
})

function wait_for_patient_approval() {
  $("#patient-search-form").addClass("invisible");
  $("#waiting-for-confirmation-box").removeClass("invisible");
}