var base_url = window.location.origin;
(function() {
  
  const firstName = sessionStorage.getItem("patientFirstName")
  const lastName = sessionStorage.getItem("patientLastName")
  const id = sessionStorage.getItem("patientID")
  let medicalHistory = JSON.parse(sessionStorage.getItem("medicalHistory"))

  document.getElementById("patient-name").innerHTML = firstName + ' ' + lastName
  document.getElementById("patient-id").innerHTML = 'NHS Number:' + id

  // const admissionDate = document.getElementById('#id_admissionDate')
  // const dischargeDate = document.getElementById('#id_dischargeDate')

  $(document).ready(function() {
    $('#id_date').datepicker({dateFormat: "yy-mm-dd"});
  });

//   let inputs = $("p input, p textarea, p select")
  
//   $("#patient-medical-history-add-entry").submit(function(eventObj) {
//     let newMedicalHistory = {}
//     // console.log(inputs)
//     inputs.each(function () {
//       // console.log($(this))
//       let attr = $(this).attr("name");
//       // console.log(attr)
//       let value = $(this).val();
//       let valid_attrs = ["admissionDate", "dischargeDate", "summary", "consultant", "visitType","letter", "addToMedicalHistory"]
//       // console.log(valid_attrs.includes(attr))
//       if (valid_attrs.includes(attr)) {
//         if (attr === "letter") {
//           newMedicalHistory[attr] = value.replace(/C:\\fakepath\\/, '/media/letterattachments/');
//           // console.log(base_url)
//           // console.log(newMedicalHistory[attr])
//         } else if (attr === "addToMedicalHistory"){
//           let add = document.querySelector("#id_addToMedicalHistory").checked
//           // console.log(add)
//           newMedicalHistory[attr] = add 
//         } else {
//           newMedicalHistory[attr] = value;
//         }
//       }
//         // console.log(newMedicalHistory)
      
//     })
//     // valid_attrs.forEach
//     let patientId = sessionStorage.getItem("patientID");
//     let patientName = sessionStorage.getItem("patientName");
//     $(this).append(`<input type="hidden" name="patientId" value=${patientId} /> `);
//     $(this).append(`<input type="hidden" name="patientName" value=${patientName} /> `);
//     // console.log(newMedicalHistory.addToMedicalHistory)
//     // medicalHistory.push(newMedicalHistory)
//     medicalHistory.unshift(newMedicalHistory)
//     // console.log(medicalHistory)
//     medicalHistory.sort((a, b) => new Date(b.admissionDate).getTime() - new Date(a.admissionDate).getTime())
//     // console.log(medicalHistory)
//     sessionStorage.setItem("medicalHistory",JSON.stringify(medicalHistory))
//     return true;
// });
})();