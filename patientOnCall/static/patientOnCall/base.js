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
      } else if (event == "NEW_MEDICATION_ENTRY") {
        let newMedicationData = data["newMedicationData"]
        let updatedCurrMedication = JSON.parse(data["currentMedication"])
        sessionStorage.setItem("currentMedication", JSON.stringify(updatedCurrMedication))

        if (window.location.href == base_url + "/medication/") {
          console.log("In medication page")
          let nextMedId = getNextMedicationId(newMedicationData["id"], updatedCurrMedication);
        if (nextMedId == null) {
          addMedication(
            true,
            newMedicationData["id"],
            newMedicationData["drug"],
            newMedicationData["dosage"],
            newMedicationData["startDate"],
            newMedicationData["endDate"],
            newMedicationData["duration"],
            newMedicationData["route"],
            newMedicationData["comments"],
            newMedicationData["byPatient"]
          )
        } else {
          insertNewMedBeforeMedWithId(
            nextMedId, 
            true,
            newMedicationData["id"],
            newMedicationData["drug"],
            newMedicationData["dosage"],
            newMedicationData["startDate"],
            newMedicationData["endDate"],
            newMedicationData["duration"],
            newMedicationData["route"],
            newMedicationData["comments"],
            newMedicationData["byPatient"]
          );
        }
        }

      } else if (event == "REMOVE_MEDICATION_ENTRY") {
        if (window.location.href == base_url + "/medication/") {
          let removedID = data["removedID"];
          document.getElementById(removedID + '-drug').remove();
          document.getElementById(removedID + '-dosage').remove();
          document.getElementById(removedID + '-start-date').remove();
          document.getElementById(removedID + '-end-date').remove();
          document.getElementById(removedID + '-duration').remove();
          document.getElementById(removedID + '-route').remove();
          document.getElementById(removedID + '-comments').remove();
          document.getElementById(removedID + '-owner').remove();
        }
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