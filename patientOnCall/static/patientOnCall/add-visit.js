var base_url = window.location.origin;
(function() {
  
  const firstName = sessionStorage.getItem("patientFirstName")
  const lastName = sessionStorage.getItem("patientLastName")
  const id = sessionStorage.getItem("patientID")
  let medicalHistory = JSON.parse(sessionStorage.getItem("medicalHistory"))

  document.getElementById("patient-name").innerHTML = firstName + ' ' + lastName
  document.getElementById("patient-id").innerHTML = 'NHS Number:' + id

  const admissionDate = document.getElementById('#id_admissionDate')
  const dischargeDate = document.getElementById('#id_dischargeDate')

  $(document).ready(function() {
    $('#id_admissionDate').datepicker({dateFormat: "yy-mm-dd", onSelect: function(dateText, inst){
      $('#id_dischargeDate').datepicker('option', 'minDate', new Date(dateText))}});
  });
  $(document).ready(function() {
    $('#id_dischargeDate').datepicker({dateFormat: "yy-mm-dd", onSelect: function(dateText, inst){
      $('#id_admissionDate').datepicker('option', 'maxDate', new Date(dateText))}});
  });
  let inputs = $("p input, p textarea, p select")

  $("#patient-medical-history-add-entry").submit(function(eventObj) {
    let newMedicalHistory = {}
    // console.log(inputs)
    inputs.each(function () {
      // console.log($(this))
      let attr = $(this).attr("name");
      // console.log(attr)
      let value = $(this).val();
      let valid_attrs = ["admissionDate", "dischargeDate", "summary", "consultant", "visitType","letter", "addToMedicalHistory"]
      // console.log(valid_attrs.includes(attr))
      if (valid_attrs.includes(attr)) {
        if (attr === "letter") {
          newMedicalHistory[attr] = value.replace(/C:\\fakepath\\/, '/media/letterattachments/');
          console.log(base_url)
          console.log(newMedicalHistory[attr])
        } else {
          newMedicalHistory[attr] = value;
        }
        // console.log(newMedicalHistory)
      }
    })
    // valid_attrs.forEach
    let patientId = sessionStorage.getItem("patientID");
    let patientName = sessionStorage.getItem("patientName");
    $(this).append(`<input type="hidden" name="patientId" value=${patientId} /> `);
    $(this).append(`<input type="hidden" name="patientName" value=${patientName} /> `);
    console.log(newMedicalHistory)
    medicalHistory.push(newMedicalHistory)
    console.log(medicalHistory)
    sessionStorage.setItem("medicalHistory",JSON.stringify(medicalHistory))
    return true;
});
})();

// function storeFileInSession () {
//   var file = document.getElementById('#id_letter').files[0];
//   sessionStorage.input = JSON.stringify(file)
// }

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
