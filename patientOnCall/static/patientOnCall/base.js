var base_url = window.location.origin;

document.getElementById("profile").onclick = function() {
  window.location.href = base_url + "/main"  
}

document.getElementById("patient-summary").addEventListener("click", (e) => {
  e.preventDefault();
  window.location.href = base_url + "/main"  
})

document.getElementById("medication").addEventListener("click", (e) => {
    e.preventDefault();
    window.location.href = base_url + "/medication"
  })

document.getElementById("visit-history").addEventListener("click", (e) => {
    e.preventDefault();
    window.location.href = base_url + "/visit"
  })

document.getElementById("imaging-history").addEventListener("click", (e) => {
    e.preventDefault();
    window.location.href = base_url + "/imaging"
  })

document.getElementById("patient-diary").addEventListener("click", (e) => {
  e.preventDefault();
  window.location.href = base_url + "/patient-diary"
})



if (sessionStorage.getItem("displayDisclaimer") != null && sessionStorage.getItem("displayDisclaimer") == "true") {
  $("#disclaimer-note").removeClass("invisible");
} else {
  $("#disclaimer-note").addClass("invisible");
}
var websocket = null;

function connect_to_websocket() {
  console.log("Called function")
  websocket = create_websocket(
    () => {
      console.log('Connected to websocket.');
    },
    (response) => {
      let data = JSON.parse(response.data);
      let event = data["event"]
      console.log("Has response from websocket.")
      if (event == "REVOKE_PATIENT_DATA_ACCESS") {
        console.log("NOO I GOT KICKED");
        sessionStorage.clear();
        window.location.href = base_url;
      }
      if (websocket != null) {
        websocket.close();
        websocket = null;
      }
    }
  )
}

(function() {
  console.log("Ran apon load in base.js")
  
  connect_to_websocket();
})();