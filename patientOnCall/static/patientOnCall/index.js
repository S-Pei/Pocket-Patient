document.getElementById("patient-search-submit").addEventListener("click", (e) => {
  e.preventDefault();
  
  let patientId = document.getElementById("patient-id").value;
  let patientName = document.getElementById("patient-name").value;

  //api_verify_valid_patient_credentials(patientId, patientName);
  sessionStorage.setItem("patientID", patientId)
  sessionStorage.setItem("patientName", patientName)
  api_fetch_patient_full_data()
})

var websocket = null;

function wait_for_patient_approval() {
  $("#patient-search-form").addClass("invisible");
  $("#waiting-for-confirmation-box").removeClass("invisible");
  $(".status-notification-box").removeClass("fade-out-animation");

  // Add cancel to wait event listener
  $("#waiting-for-confirmation-cancel-btn").on("click", function() {
    disconnect_websocket();
    show_patient_search_ui();
  })

  connect_to_websocket();
}

function show_patient_search_ui() {
  $("#waiting-for-confirmation-box").addClass("invisible");
  $("#patient-search-form").removeClass("invisible");
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

function connect_to_websocket() {
  if (websocket == null) {
    create_websocket();
  }
}

function disconnect_websocket() {
  if (websocket != null) {
    websocket.close();
    websocket = null;    
  }
}

function create_websocket() {
  let connectionString = ''
  if (window.location.protocol == "https:") {
    connectionString += 'wss://';
  } else {
    connectionString += 'ws://';
  }
  connectionString += window.location.host + '/ws/patientoncall/'
                      + sessionStorage.getItem("patientID") + '/'
                      + sessionStorage.getItem("patientName") + '/'

  websocket = new WebSocket(connectionString);

  websocket.onopen = function (event) {
    websocket.send(JSON.stringify({
        "event": "REQUEST_PATIENT_DATA_ACCESS"
      }))
  }

  websocket.onmessage = function (response) {
    let data = JSON.parse(response.data)
    let event = data["event"]

    if (event == "GRANT_PATIENT_DATA_ACCESS") {
      api_fetch_patient_full_data();
    }
  }
}


// API Functions

function api_verify_valid_patient_credentials(patientId, patientName) {
  $.ajax({
    type: "POST",
    url: "api/doctor/patient-verify/",
    data: {
        'patientId': patientId,
        'patientName': patientName
    },
    success: function (returned_value) {
      if (returned_value.ok == true) {
        sessionStorage.setItem("patientID", patientId)
        sessionStorage.setItem("patientName", patientName)

        // Wait for patient approval
        wait_for_patient_approval();
      }
    },
    error: function (xhr) { 
      clear_input();
      show_patient_search_ui();
      status_error("Error retrieving patient data!");
    }
  });
}

function api_fetch_patient_full_data() {
  console.log('Trying to get patient full data...')
  $.ajax({
    type: "POST",
    url: "api/doctor/patient-data/",
    data: {
        'patientId': sessionStorage.getItem("patientID"),
        'patientName': sessionStorage.getItem("patientName")
    },
    success: function (returned_value) {
      if (returned_value.ok == true) {
        console.log('Got patient data');
        sessionStorage.setItem("sessionID", returned_value["sessionId"])
        sessionStorage.setItem("patientFirstName", returned_value["patient-first-name"])
        sessionStorage.setItem("patientLastName", returned_value["patient-last-name"])
        sessionStorage.setItem("patientDob", returned_value["patient-dob"])
        sessionStorage.setItem("patientAddress", returned_value["patient-address"])
        sessionStorage.setItem("labHistory", JSON.stringify(returned_value["lab-history"]))
        sessionStorage.setItem("medicalHistory", JSON.stringify(returned_value["medical-history"]))
        sessionStorage.setItem("prescription", JSON.stringify(returned_value["prescription"]))
        window.location.href = "main/"
      }
    },
    error: function (xhr) { 
      clear_input();
      show_patient_search_ui();
      status_error("Error retrieving patient data!");
    }
  });
}