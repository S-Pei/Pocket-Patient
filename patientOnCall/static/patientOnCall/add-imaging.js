var base_url = window.location.origin;
(function() {
  
  const firstName = sessionStorage.getItem("patientFirstName")
  const lastName = sessionStorage.getItem("patientLastName")
  const id = sessionStorage.getItem("patientID")
  let imagingHistory = JSON.parse(sessionStorage.getItem("imagingHistory"))
  // console.log(imagingHistory)
  document.getElementById("patient-name").innerHTML = firstName + ' ' + lastName
  document.getElementById("patient-id").innerHTML = 'NHS Number:' + id

  // const admissionDate = document.getElementById('#id_admissionDate')
  // const dischargeDate = document.getElementById('#id_dischargeDate')

  $(document).ready(function() {
    $('#id_date').datepicker({dateFormat: "yy-mm-dd"});
  });

  let inputs = $("p input, p textarea, p select")

  $("#patient-imaging-history-add-entry").submit(function(eventObj) {
    let newImagingHistory = {}
    // console.log(inputs)
    inputs.each(function () {
      // console.log($(this))
      let attr = $(this).attr("name");
      // console.log(attr)
      let value = $(this).val();
      let valid_attrs = ["date", "scanType", "region", "indication", "report"]
      // console.log(valid_attrs.includes(attr))
      if (valid_attrs.includes(attr)) {
        if (attr === "report") {
          newImagingHistory[attr] = value.replace(/C:\\fakepath\\/, '/media/imagingreports/');
          // console.log(base_url)
          // console.log(newMedicalHistory[attr])
        } else {
          newImagingHistory[attr] = value;
        }
      }
        console.log(newImagingHistory)
      
    })
    // valid_attrs.forEach
    let patientId = sessionStorage.getItem("patientID");
    let patientName = sessionStorage.getItem("patientName");
    $(this).append(`<input type="hidden" name="patientId" value=${patientId} /> `);
    $(this).append(`<input type="hidden" name="patientName" value=${patientName} /> `);
    // console.log(newMedicalHistory.addToMedicalHistory)
    // medicalHistory.push(newMedicalHistory)
    imagingHistory.unshift(newImagingHistory)
    // console.log(medicalHistory)
    imagingHistory.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    // console.log(medicalHistory)
    sessionStorage.setItem("imagingHistory",JSON.stringify(imagingHistory))
    return true;
});
})();