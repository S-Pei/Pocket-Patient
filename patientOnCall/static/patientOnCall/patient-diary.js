(function() {
  
  const firstName = sessionStorage.getItem("patientFirstName")
  const lastName = sessionStorage.getItem("patientLastName")
  const id = sessionStorage.getItem("patientID")
  // const medicalHistory = JSON.parse(sessionStorage.getItem("medicalHistory"))

  document.getElementById("patient-name").innerHTML = firstName + ' ' + lastName
  document.getElementById("patient-id").innerHTML = 'NHS Number:' + id

  // insertMedHistoryEntries(medicalHistory);
  // for(var i = 1; i <= medicalHistory.length; i ++) {
  //     row_hover(i, medicalHistory[i-1]["visitType"]);
  //     row_click(i);
  // }
})();