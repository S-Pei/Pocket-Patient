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
    error: function (xhr) { 
      if (xhr.status == 400) {
        clear_input();
        status_error("Patient information entered is not valid!");
      }
    }
  });
})

function wait_for_patient_approval() {
  $("#patient-search-form").addClass("invisible");
  $("#waiting-for-confirmation-box").removeClass("invisible");
  $(".status-notification-box").removeClass("fade-out-animation");

  $("#waiting-for-confirmation-cancel-btn").on("click", function() {
    $("#waiting-for-confirmation-box").addClass("invisible");
    $("#patient-search-form").removeClass("invisible");
  })
}

function clear_input() {
  $("#patient-id").val('');
  $("#patient-name").val('');
}

let statusTimeout = null;

function status_error(message) {
  $(".status-notification-box .status-text").text(message);

  let statusNotiBox = $(".status-notification-box")
  if (!statusNotiBox.hasClass("fade-out-animation")) {
    statusNotiBox.addClass("fade-out-animation");
    statusTimeout = setTimeout(() => {
      $(".status-notification-box").removeClass("fade-out-animation")
    }, 6500);
  }
}