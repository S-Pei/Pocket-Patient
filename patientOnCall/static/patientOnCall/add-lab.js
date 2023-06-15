var base_url = window.location.origin;
(function() {
  
  const firstName = sessionStorage.getItem("patientFirstName")
  const lastName = sessionStorage.getItem("patientLastName")
  const id = sessionStorage.getItem("patientID")
  let labHistory = JSON.parse(sessionStorage.getItem("labHistory"))

  document.getElementById("patient-name").innerHTML = firstName + ' ' + lastName
  document.getElementById("patient-id").innerHTML = 'NHS Number:' + id
  
  // scanType = window.location.href.split('/')[4]
  console.log(document.referrer)
  document.getElementById("back-to-scan-type").href = document.referrer
  // const admissionDate = document.getElementById('#id_admissionDate')
  // const dischargeDate = document.getElementById('#id_dischargeDate')

  $(document).ready(function() {
    $('#id_date').datepicker({dateFormat: "yy-mm-dd"});
  });


  $("#patient-lab-history-add-entry").submit(function(eventObj) {
    let patientId = sessionStorage.getItem("patientID");
    let patientName = sessionStorage.getItem("patientName");
    $(this).append(`<input type="hidden" name="patientId" value=${patientId} /> `);
    $(this).append(`<input type="hidden" name="patientName" value=${patientName} /> `);

    labHistory.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    sessionStorage.setItem("labHistory",JSON.stringify(labHistory))
    return true;
});
})();