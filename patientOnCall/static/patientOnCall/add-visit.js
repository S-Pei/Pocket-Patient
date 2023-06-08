var base_url = window.location.origin;
(function() {
  
  const firstName = sessionStorage.getItem("patientFirstName")
  const lastName = sessionStorage.getItem("patientLastName")
  const id = sessionStorage.getItem("patientID")
  const medicalHistory = JSON.parse(sessionStorage.getItem("medicalHistory"))

  document.getElementById("patient-name").innerHTML = firstName + ' ' + lastName
  document.getElementById("patient-id").innerHTML = 'NHS Number:' + id  

  $("#patient-medical-history-add-entry").submit(function(eventObj) {
    let patientId = sessionStorage.getItem("patientID");
    let patientName = sessionStorage.getItem("patientName");
    $(this).append(`<input type="hidden" name="patientId" value=${patientId} /> `);
    $(this).append(`<input type="hidden" name="patientName" value=${patientName} /> `);
    return true;
});
})();

// function enterVisitEntry() {
//   document.getElementById("add-visit").addEventListener("click", (e) => {
//       e.preventDefault();
      
//       let admissionDate = document.getElementById("entry-admission-date").value;
//       let dischargeDate = document.getElementById("entry-discharge-date").value;
//       let summary = document.getElementById("entry-summary").value;
//       let consultant = document.getElementById("entry-consultant").value;
//       let visitType = document.getElementById("entry-visit-type").value;
//       let letter = document.getElementById("entry-letter").value;
  
//       const firstName = sessionStorage.getItem("patientFirstName")
//       const lastName = sessionStorage.getItem("patientLastName")
    
//       //compare to database
//       $.ajax({
//         type: "POST",
//         url: base_url + "/api/doctor/patient-data/add-visit/",
//         data: {
//           'patientID': sessionStorage.getItem("patientID"),
//           'patientName': firstName + ' ' + lastName,
//           'entryAdmissionDate': admissionDate,
//           'entryDischargeDate': dischargeDate,
//           'entrySummary': summary,
//           'entryConsultant': consultant,
//           'entryVisitType': visitType,
//         },
//         file_data: {
//           'entryLetter': letter
//         }, 
//         success: function (returned_value) {
//           if (returned_value.ok == true) { 
//             window.location.replace('/visit')
//           }
//         },
//         error: function () { }
//       });
//     })
// }